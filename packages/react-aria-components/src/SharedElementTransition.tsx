/*
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {dom, RenderProps, SlotProps, useRenderProps} from './utils';
import {createContext, createEffect, createSignal, omit, untrack, useContext, type Ref} from 'solid-js';
import {Show, type JSX} from '@solidjs/web';
import {useObjectRef, type Ref as ObjectRefInput} from 'react-aria/private/utils/useObjectRef';

interface Snapshot {
  rect: DOMRect;
  style: [string, string][];
}

const SharedElementContext = createContext<{current: {[name: string]: Snapshot}} | null>(null);

export interface SharedElementTransitionProps {
  children: JSX.Element;
}

/**
 * A scope for SharedElements, which animate between parents.
 */
export function SharedElementTransition(props: SharedElementTransitionProps) {
  let ref = {current: {} as {[name: string]: Snapshot}};
  return (
    <SharedElementContext value={ref}>{props.children}</SharedElementContext>
  );
}

export interface SharedElementRenderProps {
  /**
   * Whether the element is currently entering.
   *
   * @selector [data-entering]
   */
  isEntering: boolean;
  /**
   * Whether the element is currently exiting.
   *
   * @selector [data-exiting]
   */
  isExiting: boolean;
}

export interface SharedElementPropsBase
  extends
    Omit<JSX.HTMLAttributes<HTMLDivElement>, 'children' | 'className' | 'style' | 'ref' | 'slot'>,
    SlotProps,
    RenderProps<SharedElementRenderProps> {}

export interface SharedElementProps extends SharedElementPropsBase {
  name: string;
  isVisible?: boolean;
}

/**
 * An element that animates between its old and new position when moving between parents.
 */
export function SharedElement(props: SharedElementProps & {ref?: Ref<HTMLDivElement>}) {
  let divProps = omit(props, 'name', 'isVisible', 'children', 'className', 'style', 'render', 'ref', 'slot');
  let isVisible = () => props.isVisible ?? true;
  let [state, setState] = createSignal<'visible' | 'hidden' | 'entering' | 'exiting'>(untrack(() => isVisible() ? 'visible' : 'hidden'));
  let scopeRef = useContext(SharedElementContext);
  if (!scopeRef) {
    throw new Error('<SharedElement> must be rendered inside a <SharedElementTransition>');
  }

  // Source render-time hidden -> visible promotion is a direct projection,
  // not a signal relay: the host exists before the layout effect samples it.
  let renderedState = () => isVisible() && state() === 'hidden' ? 'visible' : state();
  let ref = useObjectRef<HTMLDivElement>(props.ref as ObjectRefInput<HTMLDivElement>);
  createEffect(() => ({element: ref.current, name: props.name, isVisible: isVisible()}), ({element, name, isVisible}) => {
    let scope = scopeRef.current;
    let prevSnapshot = scope[name];
    let frame: number | null = null;

    if (element && isVisible && prevSnapshot) {
      // Element is transitioning from a previous instance.
      setState('visible');
      let animations = element.getAnimations();

      // Set properties to animate from.
      let values = prevSnapshot.style.map(([property, prevValue]): [string, string] => {
        let value = (element.style as unknown as Record<string, string>)[property];
        if (property === 'translate') {
          let prevRect = prevSnapshot.rect;
          let currentItem = element.getBoundingClientRect();
          let deltaX = prevRect.left - currentItem?.left;
          let deltaY = prevRect.top - currentItem?.top;
          element.style.translate = `${deltaX}px ${deltaY}px`;
        } else {
          (element.style as unknown as Record<string, string>)[property] = prevValue;
        }
        return [property, value];
      });

      // Cancel any new animations triggered by these properties.
      for (let a of element.getAnimations()) {
        if (!animations.includes(a)) {
          a.cancel();
        }
      }

      // Remove overrides after one frame to animate to the current values.
      frame = requestAnimationFrame(() => {
        frame = null;
        for (let [property, value] of values) {
          (element.style as unknown as Record<string, string>)[property] = value;
        }
      });

      delete scope[name];
    } else if (element && isVisible && !prevSnapshot) {
      // No previous instance exists, apply the entering state.
      queueMicrotask(() => setState('entering'));
      frame = requestAnimationFrame(() => {
        frame = null;
        setState('visible');
      });
    } else if (element && !isVisible) {
      // Wait until layout effects finish, and check if a snapshot still exists.
      // If so, no new SharedElement consumed it, so enter the exiting state.
      queueMicrotask(() => {
        if (scope[name]) {
          delete scope[name];
          setState('exiting');
        } else {
          // Snapshot was consumed by another instance, unmount.
          setState('hidden');
        }
      });
    }

    return () => {
      if (frame != null) {
        cancelAnimationFrame(frame);
      }

      if (element && element.isConnected && !element.hasAttribute('data-exiting')) {
        // On unmount, store a snapshot of the rectangle and computed style for transitioning properties.
        let style = window.getComputedStyle(element);
        if (style.transitionProperty !== 'none') {
          let transitionProperty = style.transitionProperty.split(/\s*,\s*/);
          scope[name] = {
            rect: element.getBoundingClientRect(),
            style: transitionProperty.map(p => [p, (style as unknown as Record<string, string>)[p]])
          };
        }
      }
    };
  });

  // Collect animations only after the exiting attributes/render props have
  // committed, matching flushSync's original DOM-before-getAnimations order.
  createEffect(() => ({element: ref.current, state: renderedState()}), ({element, state}) => {
    if (element && state === 'exiting') {
      Promise.all(element.getAnimations().map(a => a.finished))
        .then(() => setState('hidden'))
        .catch(() => {});
    }
  });

  let renderProps = useRenderProps({
    get children() { return props.children; },
    get className() { return props.className; },
    get style() { return props.style; },
    get render() { return props.render; },
    values: {
      get isEntering() { return renderedState() === 'entering'; },
      get isExiting() { return renderedState() === 'exiting'; }
    }
  });

  return (
    <Show when={renderedState() !== 'hidden'}>
    <dom.div
      {...divProps}
      {...renderProps}
      ref={ref}
      slot={props.slot ?? undefined}
      data-entering={renderedState() === 'entering' || undefined}
      data-exiting={renderedState() === 'exiting' || undefined}
    />
    </Show>
  );
}
