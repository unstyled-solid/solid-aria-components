/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {chain} from './chain';
import type {RefObject} from '@react-types/shared';
import {createEffect, createMemo, createSignal, flush, type Accessor} from 'solid-js';
import {setStyle} from './domHelpers';
import {useEffectEvent} from './useEffectEvent';

export function useEnterAnimation(
  ref: RefObject<HTMLElement | null>,
  isReady: boolean | Accessor<boolean> = true,
  onEnter?: (element: HTMLElement) => void | Promise<void>
): Accessor<boolean> {
  let ready = () => typeof isReady === 'function' ? isReady() : isReady;
  let [isEntering, setEntering] = createSignal(true);
  let isAnimationReady = () => isEntering() && ready();

  // Hide the element while it prepares for entry, using only non-layout-thrashing attributes.
  // This prevents accidental flashes of content in scenarios where no hidden styling is applied
  // while the enter animation is not yet ready (e.g. popovers prior to placement calculation).
  createEffect(() => ({element: ref.current, ready: ready()}), ({element, ready}) => {
    if (!ready && element) {
      return chain(
        setStyle(element, 'opacity', '0'),
        setStyle(element, 'clip', 'rect(0 0 0 0)'),
        setStyle(element, 'clip-path', 'inset(50%)'),
        setStyle(element, 'mask-image', 'linear-gradient(#0000, #0000)')
      );
    }
  });

  // There are two cases for entry animations:
  // 1. CSS @keyframes. The `animation` property is set during the isEntering state, and it is removed after the animation finishes.
  // 2. CSS transitions. The initial styles are applied during the isEntering state, and removed immediately, causing the transition to occur.
  //
  // In the second case, cancel any transitions that were triggered prior to the isEntering = false state (when the transition is supposed to start).
  // This can happen when isReady starts as false (e.g. popovers prior to placement calculation).
  createEffect(() => ({element: ref.current, active: isAnimationReady()}), ({element, active}) => {
    if (active && element && 'getAnimations' in element) {
      for (let animation of element.getAnimations()) {
        if (typeof CSSTransition !== 'undefined' && animation instanceof CSSTransition) {
          animation.cancel();
        }
      }
    }
  });

  useAnimation(
    ref,
    ready,
    onEnter,
    () => () => { setEntering(false); },
    isAnimationReady
  );
  return isAnimationReady;
}

export function useExitAnimation(
  ref: RefObject<HTMLElement | null>,
  isOpen: boolean | Accessor<boolean>,
  onExit?: (element: HTMLElement) => void | Promise<void>
): Accessor<boolean> {
  let open = () => typeof isOpen === 'function' ? isOpen() : isOpen;
  // Source open/closed/exiting history, with a separate completion acknowledgement.
  // Each hook owns its own generation, including overlay and modal exit lifetimes.
  let lifecycle = createMemo<{open: boolean; generation: number; hasOpened: boolean}>(previous => {
    let isOpen = open();
    if (previous?.open === isOpen) return previous;
    return {open: isOpen, generation: (previous?.generation ?? 0) + (previous?.open && !isOpen ? 1 : 0),
      hasOpened: isOpen || previous?.hasOpened || false};
  });
  let [completed, setCompleted] = createSignal(0);
  let isExiting = () => {
    let current = lifecycle();
    return !current.open && current.hasOpened && completed() !== current.generation;
  };
  useAnimation(
    ref,
    () => { let current = lifecycle(); return !current.open && current.hasOpened; },
    onExit,
    () => {
      // Bind completion to the lifetime being animated in the tracking phase.
      // An interrupted animation must not acknowledge a later closing lifetime.
      let generation = lifecycle().generation;
      return () => { setCompleted(generation); };
    },
    isExiting
  );

  return isExiting;
}

function useAnimation(
  ref: RefObject<HTMLElement | null>,
  isActive: Accessor<boolean>,
  onStart: ((element: HTMLElement) => void | Promise<void>) | undefined,
  onEnd: Accessor<() => void>,
  isPending: Accessor<boolean>
): void {
  let start = useEffectEvent(onStart);
  // Read completion only when an external element/readiness/lifetime request
  // starts an animation. Completion acknowledges that request; it is not a
  // new animation request or a reason to dispose its own running transaction.
  let pending = useEffectEvent(isPending);
  createEffect(() => ({element: ref.current, active: isActive(), end: onEnd()}), ({element, active, end}) => {
    if (active && element && pending()) {
      let cancelled = false;
      if (!('getAnimations' in element)) {
        // JSDOM
        end();
        return;
      }

      let startPromise = start?.(element);

      let animations = element
        .getAnimations()
        .filter(
          a =>
            (typeof DocumentTimeline === 'undefined' || a.timeline instanceof DocumentTimeline) &&
            a.playState === 'running'
        );
      if (animations.length === 0 && !startPromise) {
        end();
        return;
      }

      Promise.all([startPromise, ...animations.map(a => a.finished)])
        .then(() => {
          if (!cancelled) {
            // Frozen source commits this external completion with flushSync.
            // Commit only the genuinely settled animation acknowledgement.
            end();
            flush();
          }
        })
        .catch(() => {});
      // Promise completion from an interrupted/replaced/disposed animation cannot
      // close a later generation. Do not cancel consumer-owned WAAPI animations.
      return () => { cancelled = true; };
    }

  });
}
