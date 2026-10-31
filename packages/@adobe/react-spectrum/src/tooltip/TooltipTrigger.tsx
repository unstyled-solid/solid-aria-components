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

import {FocusableProvider} from 'react-aria/private/interactions/useFocusable';
import {Overlay} from '../overlays/Overlay';
import {Placement, PositionProps, useOverlayPosition} from 'react-aria/useOverlayPosition';
import {createEffect, createSignal, merge, omit} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {useObjectRef} from 'react-aria/private/utils/useObjectRef';
import {TooltipContext} from './context';
import {TooltipTriggerProps, useTooltipTriggerState} from 'react-stately/useTooltipTriggerState';
import {useTooltipTrigger} from 'react-aria/useTooltipTrigger';

export interface SpectrumTooltipTriggerProps
  extends Omit<TooltipTriggerProps, 'closeDelay'>, PositionProps {
  children: [JSX.Element, JSX.Element];

  /**
   * The additional offset applied along the main axis between the element and its
   * anchor element.
   *
   * @default 7
   */
  offset?: number;
  /**
   * The placement of the tooltip with respect to the trigger.
   *
   * @default 'top'
   */
  placement?: Placement;
}

const DEFAULT_OFFSET = -1; // Offset needed to reach 4px/5px (med/large) distance between tooltip and trigger button
const DEFAULT_CROSS_OFFSET = 0;
const DEFAULT_SHOULD_CLOSE_ON_PRESS = true; // Whether the tooltip should close when the trigger is pressed

function TooltipTrigger(props: SpectrumTooltipTriggerProps) {
  // Inspect only the tuple. Native lazy JSX children resolve beneath the
  // FocusableProvider / TooltipContext that consumes each child.
  let parts = () => props.children;
  let state = useTooltipTriggerState(props);

  let tooltipTriggerRef = useObjectRef<HTMLElement>();
  let overlayRef = useObjectRef<HTMLDivElement>();

  let {triggerProps, tooltipProps} = useTooltipTrigger(
    {
      get isDisabled() { return props.isDisabled; },
      get trigger() { return props.trigger; },
      get shouldCloseOnPress() { return props.shouldCloseOnPress ?? DEFAULT_SHOULD_CLOSE_ON_PRESS; }
    },
    state,
    tooltipTriggerRef
  );

  let [borderRadius, setBorderRadius] = createSignal(0);
  createEffect(() => ({node: overlayRef.current, isOpen: state.isOpen}), ({node, isOpen}) => {
    if (node && isOpen) {
      let spectrumBorderRadius = node.ownerDocument.defaultView!.getComputedStyle(node).borderRadius;
      if (spectrumBorderRadius !== '') {
        setBorderRadius(parseInt(spectrumBorderRadius, 10));
      }
    }
  });
  let arrowRef = useObjectRef<HTMLElement>();
  let [arrowWidth, setArrowWidth] = createSignal(0);
  createEffect(() => ({node: arrowRef.current, isOpen: state.isOpen}), ({node, isOpen}) => {
    if (node && isOpen) {
      setArrowWidth(node.getBoundingClientRect().width);
    }
  });

  let position = useOverlayPosition({
    get placement() { return props.placement || 'top'; },
    targetRef: tooltipTriggerRef,
    overlayRef,
    get offset() { return props.offset ?? DEFAULT_OFFSET; },
    get crossOffset() { return props.crossOffset ?? DEFAULT_CROSS_OFFSET; },
    get isOpen() { return state.isOpen; },
    get shouldFlip() { return props.shouldFlip; },
    get containerPadding() { return props.containerPadding; },
    get arrowSize() { return arrowWidth(); },
    get arrowBoundaryOffset() { return borderRadius(); },
    onClose: () => state.close(true)
  });
  let context = merge({
    state,
    get placement() { return position.placement(); },
    ref: overlayRef,
    get UNSAFE_style() { return position.overlayProps.style; },
    arrowProps: omit(position.arrowProps, 'ref'),
    arrowRef
  }, omit(tooltipProps, 'ref'));

  return (
    <FocusableProvider {...triggerProps} ref={tooltipTriggerRef}>
      {parts()[0]}
      <Overlay isOpen={state.isOpen} nodeRef={overlayRef}>
        {transition => (
          <TooltipContext value={merge(context, transition)}>
            {parts()[1]}
          </TooltipContext>
        )}
      </Overlay>
    </FocusableProvider>
  );
}

// Support TooltipTrigger inside components using CollectionBuilder.
TooltipTrigger.getCollectionNode = function* (props: SpectrumTooltipTriggerProps) {
  // CollectionBuilder receives the same lazy native children; inspecting them
  // must not instantiate the trigger or overlay outside their providers.
  let [trigger, tooltip] = props.children;
  yield {
    element: trigger,
    wrapper: (element: JSX.Element) => (
      <TooltipTrigger {...props} children={[element, tooltip]} />
    )
  };
};

/**
 * TooltipTrigger wraps around a trigger element and a Tooltip. It handles opening and closing
 * the Tooltip when the user hovers over or focuses the trigger, and positioning the Tooltip
 * relative to the trigger.
 */
// We don't want getCollectionNode to show up in the type definition
let _TooltipTrigger = TooltipTrigger as (props: SpectrumTooltipTriggerProps) => JSX.Element;
export {_TooltipTrigger as TooltipTrigger};
