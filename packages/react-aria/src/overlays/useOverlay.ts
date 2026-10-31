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

import {DOMAttributes, RefObject} from '@react-types/shared';
import {getEventTarget} from '../utils/shadowdom/DOMFunctions';
import {isElementInChildOfActiveScope} from '../focus/FocusScope';
import {createEffect, createMemo, type Accessor} from 'solid-js';
import {mergeProps} from '../utils/mergeProps';
import {useFocusWithin} from '../interactions/useFocusWithin';
import {useInteractOutside} from '../interactions/useInteractOutside';
import {useKeyboard} from '../interactions/useKeyboard';

export interface AriaOverlayProps {
  /** Whether the overlay is currently open. */
  isOpen?: boolean;

  /** Handler that is called when the overlay should close. */
  onClose?: () => void;

  /**
   * Whether to close the overlay when the user interacts outside it.
   *
   * @default false
   */
  isDismissable?: boolean;

  /** Whether the overlay should close when focus is lost or moves outside it. */
  shouldCloseOnBlur?: boolean;

  /**
   * Whether pressing the escape key to close the overlay should be disabled.
   *
   * @default false
   */
  isKeyboardDismissDisabled?: boolean;

  /**
   * When user interacts with the argument element outside of the overlay ref,
   * return true if onClose should be called.  This gives you a chance to filter
   * out interaction with elements that should not dismiss the overlay.
   * By default, onClose will always be called on interaction outside the overlay ref.
   */
  shouldCloseOnInteractOutside?: (element: Element) => boolean;
}

export interface OverlayAria {
  /** Props to apply to the overlay container element. */
  overlayProps: DOMAttributes;
  /** Props to apply to the underlay element, if any. */
  underlayProps: DOMAttributes;
}

const visibleOverlays: RefObject<Element | null>[] = [];

/**
 * Provides the behavior for overlays such as dialogs, popovers, and menus.
 * Hides the overlay when the user interacts outside it, when the Escape key is pressed,
 * or optionally, on blur. Only the top-most overlay will close at once.
 */
export function useOverlay(
  props: AriaOverlayProps,
  ref: RefObject<Element | null>,
  getRef?: Accessor<RefObject<Element | null>>
): OverlayAria {
  // A native live DOM-ref view may be a distinct object. Stack membership must
  // retain the source's actual selected ref identity, including shared groups.
  let selectedRef = createMemo(() => getRef ? getRef() : ref);
  let isOpen = createMemo(() => !!props.isOpen);
  let lastVisibleOverlay: RefObject<Element | null> | undefined;

  // Add the overlay ref to the stack of visible overlays on mount, and remove on unmount.
  createEffect(() => ({isOpen: isOpen(), ref: selectedRef()}), ({isOpen, ref}) => {
    if (isOpen && !visibleOverlays.includes(ref)) {
      visibleOverlays.push(ref);
      return () => {
        let index = visibleOverlays.indexOf(ref);
        if (index >= 0) {
          visibleOverlays.splice(index, 1);
        }
      };
    }
  });

  // Only hide the overlay when it is the topmost visible overlay in the stack
  let onHide = () => {
    if (visibleOverlays[visibleOverlays.length - 1] === selectedRef() && props.onClose) {
      props.onClose();
    }
  };

  let onInteractOutsideStart = (e: PointerEvent) => {
    const topMostOverlay = visibleOverlays[visibleOverlays.length - 1];
    lastVisibleOverlay = topMostOverlay;
    if (
      !props.shouldCloseOnInteractOutside ||
      props.shouldCloseOnInteractOutside(getEventTarget(e) as Element)
    ) {
      if (topMostOverlay === selectedRef()) {
        e.stopPropagation();
      }
    }
  };

  let onInteractOutside = (e: PointerEvent) => {
    if (
      !props.shouldCloseOnInteractOutside ||
      props.shouldCloseOnInteractOutside(getEventTarget(e) as Element)
    ) {
      if (visibleOverlays[visibleOverlays.length - 1] === selectedRef()) {
        e.stopPropagation();
      }
      if (lastVisibleOverlay === selectedRef()) {
        onHide();
      }
    }
    lastVisibleOverlay = undefined;
  };

  // Handle the escape key
  let {keyboardProps} = useKeyboard({
    shortcuts: {
      Escape: () => {
        if (!props.isKeyboardDismissDisabled) {
          onHide();
          return;
        }
        return false;
      }
    }
  });

  // Handle clicking outside the overlay to close it
  useInteractOutside({
    ref,
    get onInteractOutside() { return props.isDismissable && props.isOpen ? onInteractOutside : undefined; },
    onInteractOutsideStart
  });

  let {focusWithinProps} = useFocusWithin({
    get isDisabled() { return !props.shouldCloseOnBlur; },
    onBlurWithin: e => {
      // Do not close if relatedTarget is null, which means focus is lost to the body.
      // That can happen when switching tabs, or due to a VoiceOver/Chrome bug with Control+Option+Arrow navigation.
      // Clicking on the body to close the overlay should already be handled by useInteractOutside.
      // https://github.com/adobe/react-spectrum/issues/4130
      // https://github.com/adobe/react-spectrum/issues/4922
      //
      // If focus is moving into a child focus scope (e.g. menu inside a dialog),
      // do not close the outer overlay. At this point, the active scope should
      // still be the outer overlay, since blur events run before focus.
      if (!e.relatedTarget || isElementInChildOfActiveScope(e.relatedTarget as Element)) {
        return;
      }

      if (
        !props.shouldCloseOnInteractOutside ||
        props.shouldCloseOnInteractOutside(e.relatedTarget as Element)
      ) {
        props.onClose?.();
      }
    }
  });

  return {
    overlayProps: mergeProps(keyboardProps, focusWithinProps),
    underlayProps: {}
  };
}
