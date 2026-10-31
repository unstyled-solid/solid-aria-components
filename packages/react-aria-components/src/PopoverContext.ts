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
import {createContext, type Context} from 'solid-js';
import type {AriaLabelingProps, GlobalDOMAttributes, RefObject} from '@react-types/shared';
import type {AriaPopoverProps} from 'react-aria/usePopover';
import type {PlacementAxis, PositionProps} from 'react-aria/useOverlayPosition';
import type {OverlayTriggerProps} from 'react-stately/private/overlays/useOverlayTriggerState';
import type {ClassNameOrFunction, ContextValue, RenderProps, SlotProps} from './utils';

export interface PopoverProps
  extends
    Omit<PositionProps, 'isOpen'>,
    Omit<AriaPopoverProps, 'popoverRef' | 'triggerRef' | 'groupRef' | 'offset' | 'arrowSize'>,
    OverlayTriggerProps,
    RenderProps<PopoverRenderProps>,
    SlotProps,
    AriaLabelingProps,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-Popover'
   */
  className?: ClassNameOrFunction<PopoverRenderProps>;
  /**
   * The name of the component that triggered the popover. This is reflected on the element
   * as the `data-trigger` attribute, and can be used to provide specific
   * styles for the popover depending on which element triggered it.
   */
  trigger?: string;
  /**
   * The ref for the element which the popover positions itself with respect to.
   *
   * When used within a trigger component such as DialogTrigger, MenuTrigger, Select, etc.,
   * this is set automatically. It is only required when used standalone.
   */
  triggerRef?: RefObject<Element | null>;
  /** Whether the popover is currently performing an entry animation. */
  isEntering?: boolean;
  /** Whether the popover is currently performing an exit animation. */
  isExiting?: boolean;
  /**
   * Whether the popover should appear and disappear without an entry or exit animation. This is
   * used by components such as PreviewTrigger to skip animations when quickly swapping between
   * overlays.
   */
  shouldSkipAnimation?: boolean;
  /**
   * The container element in which the overlay portal will be placed. This may have unknown
   * behavior depending on where it is portalled to.
   *
   * @deprecated - Use a parent UNSAFE_PortalProvider to set your portal container instead.
   * @default document.body
   */
  UNSTABLE_portalContainer?: Element;
  /**
   * The additional offset applied along the main axis between the element and its
   * anchor element.
   *
   * @default 8
   */
  offset?: number;
}

export interface PopoverRenderProps {
  /**
   * The name of the component that triggered the popover, e.g. "DialogTrigger" or "ComboBox".
   * @selector [data-trigger="..."]
   */
  trigger: string | null;
  /**
   * The placement of the popover relative to the trigger.
   * @selector [data-placement="left | right | top | bottom"]
   */
  placement: PlacementAxis | null;
  /**
   * Whether the popover is currently entering. Use this to apply animations.
   * @selector [data-entering]
   */
  isEntering: boolean;
  /**
   * Whether the popover is currently exiting. Use this to apply animations.
   * @selector [data-exiting]
   */
  isExiting: boolean;
}

export interface PopoverContextValue extends PopoverProps {
  id?: string;
  /** Contexts to clear. */
  clearContexts?: Context<any>[];
}

export const PopoverContext = createContext<ContextValue<PopoverContextValue, HTMLElement>>(null);
