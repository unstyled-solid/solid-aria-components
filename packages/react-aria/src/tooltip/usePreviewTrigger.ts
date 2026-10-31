/*
 * Copyright 2026 Adobe. All rights reserved.
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
  KeyboardEvent as AriaKeyboardEvent,
  DOMAttributes,
  FocusableElement,
  RefObject
} from '@react-types/shared';
import {AriaPopoverProps} from '../overlays/usePopover';
import {focusWithoutScrolling} from '../utils/focusWithoutScrolling';
import {getActiveElement} from '../utils/shadowdom/DOMFunctions';
import {getFocusableTreeWalker} from '../focus/FocusScope';
import {
  getInteractionModality,
  useFocusVisibleListener,
  useInteractionModality
} from '../interactions/useFocusVisible';
import {getOwnerDocument} from '../utils/domHelpers';
import intlMessages from '../../intl/previewtrigger/*.json';
import {mergeProps} from '../utils/mergeProps';
import {nodeContains} from '../utils/shadowdom/DOMFunctions';
import {TooltipTriggerProps, TooltipTriggerState} from 'react-stately/useTooltipTriggerState';
import {createEffect, onSettled} from 'solid-js';
import {useEvent} from '../utils/useEvent';
import {useHover} from '../interactions/useHover';
import {useId} from '../utils/useId';
import {useLocalizedStringFormatter} from '../i18n/useLocalizedStringFormatter';
import {useLongPress} from '../interactions/useLongPress';
import {useSafeArea} from './useSafeArea';

export interface AriaPreviewTriggerProps extends Omit<
  TooltipTriggerProps,
  'trigger' | 'shouldCloseOnPress'
> {}

export interface AriaPreviewTriggerOptions extends AriaPreviewTriggerProps {
  /** A ref to the trigger element (e.g. a Link). */
  triggerRef: RefObject<FocusableElement | null>;
  /** A ref to the popover element. */
  popoverRef: RefObject<Element | null>;
}

export interface PreviewTriggerTriggerAria {
  /**
   * Props for the trigger element (e.g. a Link).
   */
  triggerProps: DOMAttributes;
  /**
   * Props for the popover overlay element.
   */
  popoverProps: Omit<AriaPopoverProps, 'triggerRef' | 'popoverRef'> & DOMAttributes;
}

/**
 * Provides the behavior and accessibility implementation for a preview trigger.
 * A preview trigger displays a popover on hover, focus, or long press. Unlike a
 * tooltip, the popover may contain interactive content.
 */
export function usePreviewTrigger(
  props: AriaPreviewTriggerOptions,
  state: TooltipTriggerState
): PreviewTriggerTriggerAria {
  let triggerRef: RefObject<FocusableElement | null> = {get current() {return props.triggerRef.current;}};
  let popoverRef: RefObject<Element | null> = {get current() {return props.popoverRef.current;}};
  let stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-aria/link-preview');
  let popoverId = useId();

  // Suppresses the next focus from reopening the preview (e.g. when restoring focus on Escape).
  let ignoreFocus = false;
  // When opened via long press, move focus into the popover once it opens so touch screen readers
  // (e.g. VoiceOver) move their virtual cursor into the preview.
  let shouldFocusOnOpen = false;
  // Whether the pointer is currently within the safe area (the trigger, the popover, or the region
  // between them). Tracked by useSafeArea below so the preview stays open while the pointer travels
  // from the link to the popover, even with closeDelay of 0.
  let pointerInSafeArea = false;

  let isFocusVisible = false;
  useFocusVisibleListener(visible => {
    isFocusVisible = visible;
  }, []);

  // Cancel a pending close and keep the preview open.
  let keepOpen = () => state.open(true);

  // Close the preview unless something is still keeping it open: the pointer is within the safe
  // area, or focus is within the trigger or popover. During focus transitions the active element
  // may briefly be the body; the popover's focusin handler re-opens in that case (focus moving in).
  let checkClose = () => {
    if (pointerInSafeArea) {
      return;
    }
    let active = triggerRef.current ? getActiveElement(getOwnerDocument(triggerRef.current)) : null;
    if (
      isFocusVisible &&
      ((triggerRef.current && nodeContains(triggerRef.current, active)) ||
        (popoverRef.current && nodeContains(popoverRef.current, active)))
    ) {
      return;
    }
    state.close();
  };

  createEffect(() => ({isOpen: state.isOpen, popover: popoverRef.current}), ({isOpen, popover}) => {
    if (!isOpen || !popover || !shouldFocusOnOpen) {
      return;
    }

    // When opened via long press, move focus to the popover itself so touch screen readers move
    // their virtual cursor into the preview.
    let cancelled = false;
    onSettled(() => {
      if (cancelled || !state.isOpen || popoverRef.current !== popover || !shouldFocusOnOpen) {return;}
      shouldFocusOnOpen = false;
      focusWithoutScrolling(popover as FocusableElement);
    });
    return () => {cancelled = true;};
  });

  let onHoverStart = () => {
    // Match useTooltipTrigger: only treat as hovered when the modality is actually a pointer.
    if (getInteractionModality() === 'pointer') {
      pointerInSafeArea = true;
      state.open();
    }
  };

  let onHoverEnd = () => {
    // Before the preview opens, cancel a pending warmup if the pointer leaves the trigger. Once
    // open, the safe-area polygon (useSafeArea) governs closing as the pointer moves to the popover.
    if (!state.isOpen) {
      pointerInSafeArea = false;
      state.close();
    }
  };

  let onTriggerFocus = (e: FocusEvent) => {
    if (ignoreFocus) {
      ignoreFocus = false;
      return;
    }

    // Prevent browser focusing the link on long press when focus is already in the popover.
    if (state.isOpen && e.relatedTarget === popoverRef.current) {
      focusWithoutScrolling(popoverRef.current as FocusableElement);
      return;
    }

    if (isFocusVisible) {
      // Open after the warmup delay on keyboard focus, not immediately like a tooltip. This way
      // tabbing quickly through the page doesn't open previews (and add their tab stops); the
      // delay ensures the user is actually interested in the link's details.
      state.open();
    }
  };

  useEvent(triggerRef, 'react-aria-focus-scope-restore', e => {
    e.preventDefault();
    ignoreFocus = true;
    triggerRef.current?.focus();
  });

  // Move focus from the link into the preview when the user presses Tab while it is open.
  // Tabbing back out of the popover is handled by the popover's own FocusScope.
  let onTriggerKeyDown = (e: AriaKeyboardEvent) => {
    if (e.key === 'Tab' && !e.shiftKey && state.isOpen && popoverRef.current) {
      let walker = getFocusableTreeWalker(popoverRef.current, {tabbable: true});
      let first = walker.nextNode() as FocusableElement | null;
      if (first) {
        e.preventDefault();
        first.focus();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      state.close(true);
    }
  };

  let {hoverProps} = useHover({get isDisabled() {return props.isDisabled;}, onHoverStart, onHoverEnd});
  let focusableProps = {
    onFocus: onTriggerFocus,
    onBlur: checkClose,
    onKeyDown: onTriggerKeyDown
  };

  // Only describe the long press interaction when the user is actually using touch, otherwise it
  // is confusing (e.g. a screen reader announcing "long press" while navigating with a keyboard).
  // null is the default before the user has interacted with anything.
  let modality = useInteractionModality();
  let shouldLongPress = () =>
    (modality() === 'pointer' || modality() === 'virtual' || modality() == null) &&
    typeof window !== 'undefined' &&
    'ontouchstart' in window;

  // Open the preview on long press on touch devices, since there is no hover. Move focus into the
  // popover once it opens so touch screen readers (e.g. VoiceOver) move their virtual cursor in.
  let {longPressProps} = useLongPress({
    get isDisabled() {return props.isDisabled;},
    pointerType: 'touch',
    get accessibilityDescription() {return shouldLongPress()
      ? stringFormatter.format('longPressMessage')
      : undefined;},
    onLongPress() {
      shouldFocusOnOpen = true;
      state.open(true);
    }
  });

  // Keep the preview open while the pointer is anywhere within the safe area connecting the link
  // and the popover, so moving the pointer between them (even diagonally) doesn't close it. This
  // works for any popover placement and even when closeDelay is 0.
  useSafeArea({
    triggerRef,
    overlayRef: popoverRef,
    get isOpen() {return state.isOpen;},
    get isDisabled() {return props.isDisabled;},
    onSafeAreaChange: isInSafeArea => {
      if (isInSafeArea === pointerInSafeArea) {
        return;
      }
      pointerInSafeArea = isInSafeArea;
      if (isInSafeArea) {
        keepOpen();
      } else {
        checkClose();
      }
    }
  });

  // oxlint-disable-next-line react/react-compiler
  let triggerProps = mergeProps(focusableProps, hoverProps, longPressProps);
  let describedBy = () => [triggerProps['aria-describedby'], state.isOpen ? popoverId() : null]
    .filter(Boolean)
    .join(' ');

  return {
    triggerProps: mergeProps(triggerProps, {
      'aria-haspopup': 'dialog' as const,
      get 'aria-expanded'() {return state.isOpen ? 'true' as const : 'false' as const;},
      get 'aria-controls'() {return state.isOpen ? popoverId() : undefined;},
      get 'aria-describedby'() {return describedBy() || undefined;},
      style: {
        '-webkit-touch-callout': 'none',
        '-webkit-user-drag': 'none'
      }
    }),
    popoverProps: {
      get id() {return popoverId();},
      onFocusWithin: keepOpen,
      onBlurWithin: checkClose
    }
  };
}
