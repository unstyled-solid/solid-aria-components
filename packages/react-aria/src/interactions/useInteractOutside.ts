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

// Portions of the code in this file are based on code from react.
// Original licensing for the following can be found in the
// NOTICE file in the root directory of this source tree.
// See https://github.com/facebook/react/tree/cc7c1aece46a6b69b41958d731e0fd27c94bfc6c/packages/react-interactions

import {getEventTarget, nodeContains} from '../utils/shadowdom/DOMFunctions';

import {getOwnerDocument} from '../utils/domHelpers';
import {RefObject} from '@react-types/shared';
import {createEffect} from 'solid-js';
import {useEffectEvent} from '../utils/useEffectEvent';

export interface InteractOutsideProps {
  ref: RefObject<Element | null>;
  onInteractOutside?: (e: PointerEvent) => void;
  onInteractOutsideStart?: (e: PointerEvent) => void;
  /** Whether the interact outside events should be disabled. */
  isDisabled?: boolean;
}

/**
 * Example, used in components like Dialogs and Popovers so they can close
 * when a user clicks outside them.
 */
export function useInteractOutside(props: InteractOutsideProps): void {
  let state = {
    isPointerDown: false,
    ignoreEmulatedMouseEvents: false
  };

  let onPointerDown = useEffectEvent((e: PointerEvent) => {
    if (props.onInteractOutside && isValidEvent(e, props.ref)) {
      if (props.onInteractOutsideStart) {
        props.onInteractOutsideStart(e);
      }
      state.isPointerDown = true;
    }
  });

  let triggerInteractOutside = useEffectEvent((e: PointerEvent) => {
    if (props.onInteractOutside) {
      props.onInteractOutside(e);
    }
  });

  createEffect(() => ({element: props.ref.current, isDisabled: props.isDisabled}), ({element, isDisabled}) => {
    if (isDisabled) {
      return;
    }

    const documentObject = getOwnerDocument(element);
    let ref = props.ref;

    // Use pointer events if available. Otherwise, fall back to mouse and touch events.
    if (typeof PointerEvent !== 'undefined') {
      let onClick = (e: PointerEvent) => {
        if (state.isPointerDown && isValidEvent(e, ref)) {
          triggerInteractOutside(e);
        }
        state.isPointerDown = false;
      };

      // changing these to capture phase fixed combobox
      // Use click instead of pointerup to avoid Android Chrome issue
      // https://issues.chromium.org/issues/40732224
      documentObject.addEventListener('pointerdown', onPointerDown, true);
      documentObject.addEventListener('click', onClick, true);

      return () => {
        documentObject.removeEventListener('pointerdown', onPointerDown, true);
        documentObject.removeEventListener('click', onClick, true);
      };
    } else if (process.env.NODE_ENV === 'test') {
      let onMouseUp = (e: MouseEvent) => {
        if (state.ignoreEmulatedMouseEvents) {
          state.ignoreEmulatedMouseEvents = false;
        } else if (state.isPointerDown && isValidEvent(e, ref)) {
          triggerInteractOutside(e as PointerEvent);
        }
        state.isPointerDown = false;
      };

      let onTouchEnd = (e: TouchEvent) => {
        state.ignoreEmulatedMouseEvents = true;
        if (state.isPointerDown && isValidEvent(e, ref)) {
          triggerInteractOutside(e as unknown as PointerEvent);
        }
        state.isPointerDown = false;
      };

      documentObject.addEventListener('mousedown', onPointerDown as EventListener, true);
      documentObject.addEventListener('mouseup', onMouseUp, true);
      documentObject.addEventListener('touchstart', onPointerDown as EventListener, true);
      documentObject.addEventListener('touchend', onTouchEnd, true);

      return () => {
        documentObject.removeEventListener('mousedown', onPointerDown as EventListener, true);
        documentObject.removeEventListener('mouseup', onMouseUp, true);
        documentObject.removeEventListener('touchstart', onPointerDown as EventListener, true);
        documentObject.removeEventListener('touchend', onTouchEnd, true);
      };
    }
  });
}

function isValidEvent(event: Event & {button?: number}, ref: RefObject<Element | null>) {
  if (event.button !== undefined && event.button > 0) {
    return false;
  }
  let target = getEventTarget(event) as Element;
  if (target) {
    // if the event target is no longer in the document, ignore
    const ownerDocument = target.ownerDocument;
    if (!ownerDocument || !nodeContains(ownerDocument.documentElement, target)) {
      return false;
    }
    // If the target is within a top layer element (e.g. toasts), ignore.
    if (target.closest('[data-react-aria-top-layer]')) {
      return false;
    }
  }

  if (!ref.current) {
    return false;
  }

  // When the event source is inside a Shadow DOM, event.target is just the shadow root.
  // Using event.composedPath instead means we can get the actual element inside the shadow root.
  // This only works if the shadow root is open, there is no way to detect if it is closed.
  // If the event composed path contains the ref, interaction is inside.
  return !event.composedPath().includes(ref.current);
}
