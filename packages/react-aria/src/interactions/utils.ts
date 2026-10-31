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

import {FocusableElement} from '@react-types/shared';
import {focusWithoutScrolling} from '../utils/focusWithoutScrolling';
import {getActiveElement, getEventTarget, nodeContains} from '../utils/shadowdom/DOMFunctions';
import {getOwnerWindow, isNode, isShadowRoot} from '../utils/domHelpers';
import {isFocusable} from '../utils/isFocusable';
import {onCleanup} from 'solid-js';

export type FocusEvent<T extends Element = Element> = Omit<globalThis.FocusEvent, 'currentTarget'> & {readonly currentTarget: T};
type ReactFocusEvent<T extends Element = Element> = FocusEvent<T>;

// Turn a native event into a React synthetic event.
export function createSyntheticEvent<E extends Event>(nativeEvent: Event): E {
  // Source handlers expect enumerable event fields (the propagation helper
  // composes these). Keep the native event untouched outside this boundary.
  let event: any = {};
  for (let proto: object | null = nativeEvent; proto && proto !== Object.prototype; proto = Object.getPrototypeOf(proto)) {
    for (let key of Object.getOwnPropertyNames(proto)) {
      if (key === 'constructor' || key in event) { continue; }
      let value = (nativeEvent as any)[key];
      Object.defineProperty(event, key, {enumerable: true, configurable: true, writable: true,
        value: typeof value === 'function' ? value.bind(nativeEvent) : value});
    }
  }
  event.type = nativeEvent.type === 'focusin' ? 'focus' : nativeEvent.type === 'focusout' ? 'blur' : nativeEvent.type;
  if (nativeEvent.type === 'keydown' || nativeEvent.type === 'keyup' || nativeEvent.type === 'keypress') {
    let arrowKeys: Record<string, string> = {Left: 'ArrowLeft', Up: 'ArrowUp', Right: 'ArrowRight', Down: 'ArrowDown'};
    event.key = arrowKeys[event.key] ?? event.key;
  }
  event.nativeEvent = nativeEvent;
  event.isDefaultPrevented = () => nativeEvent.defaultPrevented;
  // cancelBubble is technically deprecated in the spec, but still supported in all browsers.
  event.isPropagationStopped = () => nativeEvent.cancelBubble;
  event.persist = () => {};
  return event;
}

export function setEventTarget(event: Event, target: Element): void {
  Object.defineProperty(event, 'target', {value: target});
  Object.defineProperty(event, 'currentTarget', {value: target});
}

export function useSyntheticBlurEvent<Target extends Element = Element>(
  onBlur: (e: ReactFocusEvent<Target>) => void
): (e: ReactFocusEvent<Target>) => void {
  let stateRef = {current: {
    isFocused: false,
    observer: null as MutationObserver | null
  }};
  let removeBlurListener: (() => void) | undefined;

  // Clean up MutationObserver on unmount. See below.

  onCleanup(() => {
    const state = stateRef.current;
    removeBlurListener?.();
      if (state.observer) {
        state.observer.disconnect();
        state.observer = null;
      }
  });

  // This function is called during a React onFocus event.
  return (e: ReactFocusEvent<Target>) => {
      // React does not fire onBlur when an element is disabled. https://github.com/facebook/react/issues/9142
      // Most browsers fire a native focusout event in this case, except for Firefox. In that case, we use a
      // MutationObserver to watch for the disabled attribute, and dispatch these events ourselves.
      // For browsers that do, focusout fires before the MutationObserver, so onBlur should not fire twice.
      let eventTarget = getEventTarget(e);
      if (
        eventTarget instanceof HTMLButtonElement ||
        eventTarget instanceof HTMLInputElement ||
        eventTarget instanceof HTMLTextAreaElement ||
        eventTarget instanceof HTMLSelectElement
      ) {
        removeBlurListener?.();
        stateRef.current.observer?.disconnect();
        stateRef.current.isFocused = true;

        let target = eventTarget;
        let onBlurHandler: EventListenerOrEventListenerObject | null = e => {
          stateRef.current.isFocused = false;

          if (target.disabled) {
            // For backward compatibility, dispatch a (fake) React synthetic event.
            let event = createSyntheticEvent<ReactFocusEvent<Target>>(e);
            onBlur?.(event);
          }

          // We no longer need the MutationObserver once the target is blurred.
          if (stateRef.current.observer) {
            stateRef.current.observer.disconnect();
            stateRef.current.observer = null;
          }
        };

        target.addEventListener('focusout', onBlurHandler, {once: true});
        removeBlurListener = () => target.removeEventListener('focusout', onBlurHandler);

        stateRef.current.observer = new MutationObserver(() => {
          if (stateRef.current.isFocused && target.disabled) {
            stateRef.current.observer?.disconnect();
            let relatedTargetEl = target === getActiveElement() ? null : getActiveElement();
             target.dispatchEvent(new globalThis.FocusEvent('blur', {relatedTarget: relatedTargetEl}));
            target.dispatchEvent(
               new globalThis.FocusEvent('focusout', {bubbles: true, relatedTarget: relatedTargetEl})
            );
          }
        });

        stateRef.current.observer.observe(target, {
          attributes: true,
          attributeFilter: ['disabled']
        });
      }
    };
}

export let ignoreFocusEvent = false;

/**
 * This function prevents the next focus event fired on `target`, without using
 * `event.preventDefault()`. It works by waiting for the series of focus events to occur, and
 * reverts focus back to where it was before. It also makes these events mostly non-observable by
 * using a capturing listener on the window and stopping propagation.
 */
export function preventFocus(target: FocusableElement | null): (() => void) | undefined {
  // The browser will focus the nearest focusable ancestor of our target.
  while (target && !isFocusable(target, {skipVisibilityCheck: true})) {
    target = target.parentElement;
  }

  let ownerWindow = getOwnerWindow(target);
  let activeElement = getActiveElement(ownerWindow.document) as FocusableElement | null;
  if (!activeElement || activeElement === target) {
    return;
  }

  // Listen on the target's root (document or shadow root) so we catch focus events inside
  // shadow DOM; they do not reach the main window.
  let targetRoot = target?.getRootNode();
  let root = targetRoot != null && isShadowRoot(targetRoot) ? targetRoot : getOwnerWindow(target);

  // Focus is "moving to target" when it moves to the button or to a descendant of the button
  // (e.g. SVG icon)
  let isFocusMovingToTarget = (focusTarget: Element | null) =>
    focusTarget === target || (isNode(focusTarget) && nodeContains(target, focusTarget));
  // Blur/focusout events have their target as the element losing focus. Stop propagation when
  // that is the previously focused element (activeElement) or a descendant (e.g. in shadow DOM).
  let isBlurFromActiveElement = (eventTarget: Element | null) =>
    eventTarget === activeElement ||
    (activeElement != null && isNode(eventTarget) && nodeContains(activeElement, eventTarget));

  ignoreFocusEvent = true;
  let isRefocusing = false;
  let onBlur: EventListener = e => {
    if (isBlurFromActiveElement(getEventTarget(e) as Element) || isRefocusing) {
      e.stopImmediatePropagation();
    }
  };

  let onFocusOut: EventListener = e => {
    if (isBlurFromActiveElement(getEventTarget(e) as Element) || isRefocusing) {
      e.stopImmediatePropagation();

      // If there was no focusable ancestor, we don't expect a focus event.
      // Re-focus the original active element here.
      if (!target && !isRefocusing) {
        isRefocusing = true;
        focusWithoutScrolling(activeElement);
        cleanup();
      }
    }
  };

  let onFocus: EventListener = e => {
    if (isFocusMovingToTarget(getEventTarget(e) as Element) || isRefocusing) {
      e.stopImmediatePropagation();
    }
  };

  let onFocusIn: EventListener = e => {
    if (isFocusMovingToTarget(getEventTarget(e) as Element) || isRefocusing) {
      e.stopImmediatePropagation();

      if (!isRefocusing) {
        isRefocusing = true;
        focusWithoutScrolling(activeElement);
        cleanup();
      }
    }
  };

  root.addEventListener('blur', onBlur, true);
  root.addEventListener('focusout', onFocusOut, true);
  root.addEventListener('focusin', onFocusIn, true);
  root.addEventListener('focus', onFocus, true);

  let cleanup = () => {
    cancelAnimationFrame(raf);
    root.removeEventListener('blur', onBlur, true);
    root.removeEventListener('focusout', onFocusOut, true);
    root.removeEventListener('focusin', onFocusIn, true);
    root.removeEventListener('focus', onFocus, true);
    ignoreFocusEvent = false;
    isRefocusing = false;
  };

  let raf = requestAnimationFrame(cleanup);
  return cleanup;
}
