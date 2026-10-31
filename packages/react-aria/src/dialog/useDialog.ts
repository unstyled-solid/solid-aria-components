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

import {
  AriaLabelingProps,
  DOMAttributes,
  DOMProps,
  FocusableElement,
  RefObject
} from '@react-types/shared';
import {filterDOMProps} from '../utils/filterDOMProps';
import {focusSafely} from '../interactions/focusSafely';
import {getActiveElement, isFocusWithin} from '../utils/shadowdom/DOMFunctions';
import {createEffect, merge, onSettled, untrack} from 'solid-js';
import {useOverlayFocusContain} from '../overlays/Overlay';
import {useSlotId} from '../utils/useId';

export interface AriaDialogProps extends DOMProps, AriaLabelingProps {
  /**
   * The accessibility role for the dialog.
   *
   * @default 'dialog'
   */
  role?: 'dialog' | 'alertdialog';
  /**
   * Whether the dialog is currently performing an entry animation. Focus is not moved into the
   * dialog until the animation completes, since moving the screen reader cursor may cause scrolling
   * that interrupts the animation.
   */
  isEntering?: boolean;
}

export interface DialogAria {
  /** Props for the dialog container element. */
  dialogProps: DOMAttributes;

  /** Props for the dialog title element. */
  titleProps: DOMAttributes;

  /** Props for the dialog content/description element. Used for aria-describedby on alertdialogs. */
  contentProps: DOMAttributes;
}

/**
 * Provides the behavior and accessibility implementation for a dialog component.
 * A dialog is an overlay shown above other content in an application.
 */
export function useDialog(
  props: AriaDialogProps,
  ref: RefObject<FocusableElement | null>
): DialogAria {
  let role = () => props.role ?? 'dialog';
  let generatedTitleId = useSlotId();
  let titleId = () => props['aria-label'] ? undefined : generatedTitleId();

  let generatedContentId = useSlotId();
  let contentId = () => role() === 'alertdialog' && !props['aria-describedby'] ? generatedContentId() : undefined;

  let isRefocusing = false;

  // Focus the dialog itself on mount (or once it has entered), unless a child element is already focused.
  createEffect(() => ({isEntering: props.isEntering, element: ref.current}), ({isEntering, element}) => {
    if (!isEntering && element && !isFocusWithin(element)) {
      focusSafely(element);

      // Safari on iOS does not move the VoiceOver cursor to the dialog
      // or announce that it has opened until it has rendered. A workaround
      // is to wait for half a second, then blur and re-focus the dialog.
      let timeout = setTimeout(() => {
        // Check that the dialog is still focused, or focused was lost to the body.
        if (getActiveElement() === element || getActiveElement() === document.body) {
          isRefocusing = true;
          element.blur();
          focusSafely(element);
          isRefocusing = false;
        }
      }, 500);

      return () => {
        clearTimeout(timeout);
      };
    }
  });

  useOverlayFocusContain();

  // Warn in dev mode if the dialog has no accessible title.
  // This catches a common mistake where useDialog and useOverlayTriggerState
  // are used in the same component, causing the title element to not be
  // in the DOM when useSlotId queries for it.
  // Check the DOM element directly since aria-labelledby may be added by
  // wrapper components (e.g. RAC Dialog uses trigger ID as a fallback).
  let hasWarned = false;
  let checkTitle = (el: FocusableElement | null) => {
    if (process.env.NODE_ENV !== 'production' && !hasWarned && el) {
      let hasAriaLabel = el.hasAttribute('aria-label');
      let hasAriaLabelledby = el.hasAttribute('aria-labelledby');
      if (!hasAriaLabel && !hasAriaLabelledby) {
        console.warn(
          'A dialog must have a title for accessibility. ' +
            'Either provide an aria-label or aria-labelledby prop, or render a heading element inside the dialog.'
        );
        hasWarned = true;
      }
    }
  };
  onSettled(() => checkTitle(untrack(() => ref.current)));
  createEffect(() => {
    props['aria-label'];
    props['aria-labelledby'];
    titleId();
    return ref.current;
  }, checkTitle);

  // We do not use aria-modal due to a Safari bug which forces the first focusable element to be focused
  // on mount when inside an iframe, no matter which element we programmatically focus.
  // See https://bugs.webkit.org/show_bug.cgi?id=211934.
  // useModal sets aria-hidden on all elements outside the dialog, so the dialog will behave as a modal
  // even without aria-modal on the dialog itself.
  return {
    dialogProps: merge(filterDOMProps(props, {labelable: true}), {
      get role() { return role(); },
      tabIndex: -1,
      get 'aria-labelledby'() { return props['aria-labelledby'] ?? titleId(); },
      get 'aria-describedby'() { return props['aria-describedby'] ?? contentId(); },
      // Prevent blur events from reaching useOverlay, which may cause
      // popovers to close. Since focus is contained within the dialog,
      // we don't want this to occur due to the above useEffect.
      onFocusOut: (e: FocusEvent) => {
        if (isRefocusing) {
          e.stopPropagation();
        }
      }
    }),
    titleProps: {
      get id() { return titleId(); }
    },
    contentProps: {
      get id() { return contentId(); }
    }
  };
}
