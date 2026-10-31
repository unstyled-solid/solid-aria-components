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

import {createEffect, createSignal, onCleanup, Show, untrack} from 'solid-js';
import type {JSX} from '@solidjs/web';
import type {RefObject} from '@react-types/shared';

const OPEN_STATES = {
  entering: false,
  entered: true
};

type TransitionStatus = 'unmounted' | 'exited' | 'entering' | 'entered' | 'exiting';

export interface OpenTransitionRenderProps {
  readonly isOpen: boolean;
}

export interface OpenTransitionProps {
  in?: boolean;
  appear?: boolean;
  enter?: boolean;
  exit?: boolean;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
  timeout?: number | {enter?: number; exit?: number; appear?: number} | null;
  nodeRef: RefObject<HTMLElement | null>;
  addEndListener?: (done: () => void) => void;
  onEnter?: (isAppearing: boolean) => void;
  onEntering?: (isAppearing: boolean) => void;
  onEntered?: (isAppearing: boolean) => void;
  onExit?: () => void;
  onExiting?: () => void;
  onExited?: () => void;
  children: (props: OpenTransitionRenderProps) => JSX.Element;
}

/**
 * Timeout issues adding css animations to enter may be related to
 * https://github.com/reactjs/react-transition-group/issues/189 or
 * https://github.com/reactjs/react-transition-group/issues/22
 * my VM isn't good enough to debug accurately and get a better answer.
 *
 * As a result, use enter 0 so that is-open is applied once entered
 * it doesn't matter if we know when the css-animation is done on entering
 * for exiting though, give time for the css-animation to play
 * before removing from the DOM
 * **note** hitting esc bypasses exit animation for anyone testing.
 */

export function OpenTransition(props: OpenTransitionProps): JSX.Element {
  // Do not apply any transition if in chromatic.
  if (typeof process !== 'undefined' && process.env.CHROMATIC) {
    return <>{props.children({get isOpen() { return !!props.in; }})}</>;
  }

  // Retain Transition's status machine, callback ordering and cancellable end
  // callback. The imperative status carries pending writes through reversals.
  let current: TransitionStatus = untrack(() => props.in ? (props.appear ? 'exited' : 'entered') :
    props.mountOnEnter || props.unmountOnExit ? 'unmounted' : 'exited');
  let [status, setStatus] = createSignal<TransitionStatus>(current);
  let mounting = true;
  let appearing = false;
  let activeTransition = false;
  let nextCallback: (() => void) | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;

  let cancelNextCallback = () => {
    nextCallback = undefined;
    if (timer !== undefined) clearTimeout(timer);
    timer = undefined;
  };
  onCleanup(cancelNextCallback);

  let updateStatus = (next: TransitionStatus) => {
    current = next;
    setStatus(next);
  };
  let getTimeout = (phase: 'enter' | 'exit') => {
    let timeout = props.timeout === undefined ? {enter: 0, exit: 350} : props.timeout;
    if (typeof timeout === 'number' || timeout === null) return timeout;
    return phase === 'enter' && appearing ? timeout.appear ?? timeout.enter : timeout[phase];
  };
  let onTransitionEnd = (timeout: number | null | undefined, next: TransitionStatus) => {
    let done = () => {
      if (nextCallback !== done) return;
      cancelNextCallback();
      updateStatus(next);
    };
    nextCallback = done;
    // The end callback samples the node once, as Transition does; a later ref
    // replacement must not restart the transition's clock.
    if (!untrack(() => props.nodeRef.current) || (timeout == null && !props.addEndListener)) {
      timer = setTimeout(done, 0);
      return;
    }
    props.addEndListener?.(done);
    if (timeout != null && nextCallback === done) timer = setTimeout(done, timeout);
  };

  createEffect(() => !!props.in, isOpen => {
    let isMounting = mounting;
    mounting = false;
    if (isMounting && (!isOpen || !props.appear)) return;
    if (isOpen && current !== 'entering' && current !== 'entered') {
      cancelNextCallback();
      appearing = isMounting;
      activeTransition = true;
      if (props.mountOnEnter || props.unmountOnExit) {
        // Same forced reflow as Transition's mount-on-enter path.
        let node = untrack(() => props.nodeRef.current);
        if (node) void node.scrollTop;
      }
      if (!isMounting && props.enter === false) {
        updateStatus('entered');
      } else {
        props.onEnter?.(appearing);
        updateStatus('entering');
      }
    } else if (!isOpen && (current === 'entering' || current === 'entered')) {
      cancelNextCallback();
      activeTransition = true;
      if (props.exit === false) {
        updateStatus('exited');
      } else {
        props.onExit?.();
        updateStatus('exiting');
      }
    }
  });

  // Apply callbacks only after the native renderer has committed each status,
  // matching Transition's setState callbacks rather than sampling staged writes.
  createEffect(status, committed => {
    if (!activeTransition || committed !== current) return;
    if (committed === 'entering') {
      props.onEntering?.(appearing);
      onTransitionEnd(getTimeout('enter'), 'entered');
    } else if (committed === 'exiting') {
      props.onExiting?.();
      onTransitionEnd(getTimeout('exit'), 'exited');
    } else if (committed === 'entered') {
      activeTransition = false;
      props.onEntered?.(appearing);
    } else if (committed === 'exited') {
      activeTransition = false;
      props.onExited?.();
    }
  });

  let renderProps: OpenTransitionRenderProps = {
    get isOpen() { return !!OPEN_STATES[status() as keyof typeof OPEN_STATES]; }
  };
  return <Show when={status() !== 'unmounted' && !(props.unmountOnExit && status() === 'exited')}>
    {_visible => props.children(renderProps)}
  </Show>;
}
