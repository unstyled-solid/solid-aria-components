/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {ariaHideOutside, keepVisible} from './ariaHideOutside';
import {AriaPositionProps, PlacementAxis, useOverlayPosition} from './useOverlayPosition';
import {DOMAttributes, RefObject} from '@react-types/shared';
import {FocusWithinProps, useFocusWithin} from '../interactions/useFocusWithin';
import {mergeProps} from '../utils/mergeProps';
import {OverlayTriggerState} from 'react-stately/useOverlayTriggerState';
import {Accessor, createEffect, merge} from 'solid-js';
import {useOverlay} from './useOverlay';
import {usePreventScroll} from './usePreventScroll';

export interface AriaPopoverProps
  extends
    Omit<AriaPositionProps, 'isOpen' | 'onClose' | 'targetRef' | 'overlayRef'>,
    Omit<FocusWithinProps, 'isDisabled'> {
  /**
   * The ref for the element which the popover positions itself with respect to.
   */
  triggerRef: RefObject<Element | null>;
  /**
   * The ref for the popover element.
   */
  popoverRef: RefObject<Element | null>;
  /** A ref for the popover arrow element. */
  arrowRef?: RefObject<Element | null>;
  /**
   * An optional ref for a group of popovers, e.g. submenus.
   * When provided, this element is used to detect outside interactions
   * and hiding elements from assistive technologies instead of the popoverRef.
   */
  groupRef?: RefObject<Element | null>;
  /**
   * Whether the popover is non-modal, i.e. elements outside the popover may be
   * interacted with by assistive technologies.
   *
   * Most popovers should not use this option as it may negatively impact the screen
   * reader experience. Only use with components such as combobox, which are designed
   * to handle this situation carefully.
   */
  isNonModal?: boolean;
  /**
   * Whether pressing the escape key to close the popover should be disabled.
   *
   * Most popovers should not use this option. When set to true, an alternative
   * way to close the popover with a keyboard must be provided.
   *
   * @default false
   */
  isKeyboardDismissDisabled?: boolean;
  /**
   * When user interacts with the argument element outside of the popover ref,
   * return true if onClose should be called. This gives you a chance to filter
   * out interaction with elements that should not dismiss the popover.
   * By default, onClose will always be called on interaction outside the popover ref.
   */
  shouldCloseOnInteractOutside?: (element: Element) => boolean;
}

export interface PopoverAria {
  /** Props for the popover element. */
  popoverProps: DOMAttributes;
  /** Props for the popover tip arrow if any. */
  arrowProps: DOMAttributes;
  /** Props to apply to the underlay element, if any. */
  underlayProps: DOMAttributes;
  /** Placement of the popover with respect to the trigger. */
  placement: Accessor<PlacementAxis | null>;
  /** The origin of the target in the overlay's coordinate system. Useful for animations. */
  triggerAnchorPoint: Accessor<{x: number; y: number} | null>;
}

/**
 * Provides the behavior and accessibility implementation for a popover component.
 * A popover is an overlay element positioned relative to a trigger.
 */
export function usePopover(props: AriaPopoverProps, state: OverlayTriggerState): PopoverAria {
  let isSubmenu = () => (props as AriaPopoverProps & {trigger?: string}).trigger === 'SubmenuTrigger';

  let {overlayProps, underlayProps} = useOverlay(
    {
      get isOpen() { return state.isOpen; },
      onClose: state.close,
      shouldCloseOnBlur: true,
      get isDismissable() { return !props.isNonModal || isSubmenu(); },
      get isKeyboardDismissDisabled() { return props.isKeyboardDismissDisabled; },
      get shouldCloseOnInteractOutside() { return props.shouldCloseOnInteractOutside; }
    },
    {get current() { return (props.groupRef ?? props.popoverRef).current; }},
    () => props.groupRef ?? props.popoverRef
  );

  let {
    overlayProps: positionProps,
    arrowProps,
    placement,
    triggerAnchorPoint: origin
  } = useOverlayPosition(merge(props, {
    get targetRef() { return props.triggerRef; },
    get overlayRef() { return props.popoverRef; },
    get isOpen() { return state.isOpen; },
    get onClose() { return props.isNonModal && !isSubmenu() ? state.close : null; },
    get getTargetRect() {
      return props.getTargetRect ??
        (state.point ? () => new DOMRect(state.point!.x, state.point!.y, 0, 0) : undefined);
    }
  }));

  usePreventScroll({
    get isDisabled() { return props.isNonModal || !state.isOpen; }
  });

  createEffect(() => ({
    isOpen: state.isOpen,
    isNonModal: props.isNonModal,
    element: props.popoverRef.current ? props.groupRef?.current ?? props.popoverRef.current : null
  }), ({isOpen, isNonModal, element}) => {
    if (isOpen && element) {
      if (isNonModal) {
        return keepVisible(element);
      } else {
        return ariaHideOutside([element], {shouldUseInert: true});
      }
    }
  });

  let {focusWithinProps} = useFocusWithin(props);

  return {
    popoverProps: mergeProps(overlayProps, positionProps, focusWithinProps),
    arrowProps,
    underlayProps,
    placement,
    triggerAnchorPoint: origin
  };
}
