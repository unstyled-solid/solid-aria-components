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

import {
  AriaLabelingProps,
  FocusableElement,
  GlobalDOMAttributes,
  RefObject
} from '@react-types/shared';
import {
  AriaPositionProps,
  Placement,
  PlacementAxis,
  PositionProps,
  useOverlayPosition
} from 'react-aria/useOverlayPosition';
import {
  ClassNameOrFunction,
  ContextValue,
  dom,
  RenderProps,
  useContextProps,
  useRenderProps
} from './utils';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {FocusableProvider} from 'react-aria/private/interactions/useFocusable';
import {mergeProps} from 'react-aria/mergeProps';
import {OverlayArrowContext} from './OverlayArrow';
import {OverlayContainer} from 'react-aria/private/overlays/useModal';
import {OverlayTriggerProps} from 'react-stately/useOverlayTriggerState';
import {createContext, merge, omit, Show, untrack, useContext, type Ref as NativeRef} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {useObjectRef, type ObjectRef, type Ref} from 'react-aria/private/utils/useObjectRef';
import {
  TooltipTriggerProps,
  TooltipTriggerState,
  useTooltipTriggerState
} from 'react-stately/useTooltipTriggerState';
import {useEnterAnimation, useExitAnimation} from 'react-aria/private/utils/animation';
import {useTooltip, useTooltipTrigger} from 'react-aria/useTooltipTrigger';

export interface TooltipTriggerComponentProps extends TooltipTriggerProps {
  children: JSX.Element;
}

export interface TooltipProps
  extends
    PositionProps,
    Pick<AriaPositionProps, 'arrowBoundaryOffset'>,
    OverlayTriggerProps,
    AriaLabelingProps,
    RenderProps<TooltipRenderProps>,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-Tooltip'
   */
  className?: ClassNameOrFunction<TooltipRenderProps>;
  /**
   * The ref for the element which the tooltip positions itself with respect to.
   *
   * When used within a TooltipTrigger this is set automatically. It is only required when used
   * standalone.
   */
  triggerRef?: RefObject<Element | null>;
  /**
   * Whether the tooltip is currently performing an entry animation.
   */
  isEntering?: boolean;
  /**
   * Whether the tooltip is currently performing an exit animation.
   */
  isExiting?: boolean;
  /**
   * The container element in which the overlay portal will be placed. This may have unknown
   * behavior depending on where it is portalled to.
   *
   * @deprecated - Use a parent UNSAFE_PortalProvider to set your portal container instead.
   * @default document.body
   */
  UNSTABLE_portalContainer?: Element;
  /**
   * The placement of the tooltip with respect to the trigger.
   *
   * @default 'top'
   */
  placement?: Placement;
  ref?: NativeRef<HTMLDivElement>;
}

export interface TooltipRenderProps {
  /**
   * The placement of the tooltip relative to the trigger.
   *
   * @selector [data-placement="left | right | top | bottom"]
   */
  placement: PlacementAxis | null;
  /**
   * Whether the tooltip is currently entering. Use this to apply animations.
   *
   * @selector [data-entering]
   */
  isEntering: boolean;
  /**
   * Whether the tooltip is currently exiting. Use this to apply animations.
   *
   * @selector [data-exiting]
   */
  isExiting: boolean;
  /**
   * State of the tooltip.
   */
  state: TooltipTriggerState;
}

export const TooltipTriggerStateContext = createContext<TooltipTriggerState | null>(null);
export const TooltipContext = createContext<ContextValue<TooltipProps, HTMLDivElement>>(null);

/**
 * TooltipTrigger wraps around a trigger element and a Tooltip. It handles opening and closing
 * the Tooltip when the user hovers over or focuses the trigger, and positioning the Tooltip
 * relative to the trigger.
 */
export function TooltipTrigger(props: TooltipTriggerComponentProps): JSX.Element {
  let state = useTooltipTriggerState(props);
  let ref = useObjectRef<FocusableElement>();
  let {triggerProps, tooltipProps} = useTooltipTrigger(props, state, ref);

  return (
    <TooltipTriggerStateContext value={state}>
      <TooltipContext value={merge({get id() { return tooltipProps.id; }}, {triggerRef: ref})}>
      <FocusableProvider {...triggerProps} ref={ref}>
        {props.children}
      </FocusableProvider>
      </TooltipContext>
    </TooltipTriggerStateContext>
  );
}

/**
 * A tooltip displays a description of an element on hover or focus.
 */
export function Tooltip(input: TooltipProps) {
  let props = omit(input, 'UNSTABLE_portalContainer');
  let ref = untrack(() => props.ref);
  [props, ref] = useContextProps(props, ref, TooltipContext);
  let domRef = useObjectRef<HTMLDivElement>(ref as Ref<HTMLDivElement>);
  let contextState = useContext(TooltipTriggerStateContext);
  let localState = useTooltipTriggerState(props);
  let currentState = () =>
    props.isOpen != null || props.defaultOpen != null || !contextState ? localState : contextState;
  let state: TooltipTriggerState = {
    get isOpen() { return currentState().isOpen; },
    get shouldSkipAnimation() { return currentState().shouldSkipAnimation; },
    open(immediate) { currentState().open(immediate); },
    close(immediate) { currentState().close(immediate); }
  };
  // Skip the automatic exit animation when closing instantly (e.g. swapping between tooltips
  // during warmup). An explicitly provided isExiting prop still takes precedence.
  let exitAnimation = useExitAnimation(domRef, () => state.isOpen);
  let isExiting = () => props.isExiting || (!state.shouldSkipAnimation && exitAnimation()) || false;

  return (
    <Show when={state.isOpen || isExiting()}>
      <OverlayContainer portalContainer={input.UNSTABLE_portalContainer}>
        <TooltipInner {...props} tooltipRef={domRef} isExiting={isExiting()} />
      </OverlayContainer>
    </Show>
  );
}

function TooltipInner(
  props: TooltipProps & {isExiting: boolean; tooltipRef: ObjectRef<HTMLDivElement>}
) {
  let state = useContext(TooltipTriggerStateContext)!;
  let arrowRef = useObjectRef<HTMLDivElement>();

  let {overlayProps, arrowProps, placement, triggerAnchorPoint} = useOverlayPosition({
    get placement() { return props.placement || 'top'; },
    get targetRef() { return props.triggerRef!; },
    get overlayRef() { return props.tooltipRef; },
    arrowRef,
    get offset() { return props.offset; },
    get crossOffset() { return props.crossOffset; },
    get isOpen() { return state.isOpen; },
    get arrowBoundaryOffset() { return props.arrowBoundaryOffset; },
    get shouldFlip() { return props.shouldFlip; },
    get containerPadding() { return props.containerPadding; },
    onClose: () => state.close(true)
  });

  // Skip the automatic entry animation when opening instantly (e.g. swapping between tooltips
  // during warmup). An explicitly provided isEntering prop still takes precedence.
  let enterAnimation = useEnterAnimation(props.tooltipRef, () => !!placement());
  let isEntering = () => props.isEntering || (!state.shouldSkipAnimation && enterAnimation()) || false;
  let renderProps = useRenderProps(merge(props, {
    defaultClassName: 'react-aria-Tooltip',
    values: {
      get placement() { return placement(); },
      get isEntering() { return isEntering(); },
      get isExiting() { return props.isExiting; },
      state
    }
  }));

  props = mergeProps(props, overlayProps);
  let {tooltipProps} = useTooltip(props, state);

  let DOMProps = filterDOMProps(props, {global: true});

  // oxlint-disable react/react-compiler
  return (
    <dom.div
      {...mergeProps(DOMProps, renderProps, tooltipProps)}
      ref={props.tooltipRef}
      style={
        {
          ...overlayProps.style,
          '--trigger-anchor-point': triggerAnchorPoint()
            ? `${triggerAnchorPoint()!.x}px ${triggerAnchorPoint()!.y}px`
            : undefined,
          ...renderProps.style
        } as JSX.CSSProperties
      }
      data-placement={placement() ?? undefined}
      data-entering={isEntering() ? 'true' : undefined}
      data-exiting={props.isExiting ? 'true' : undefined}>
      <OverlayArrowContext value={merge(arrowProps, {get placement() { return placement(); }, ref: arrowRef})}>
        {renderProps.children}
      </OverlayArrowContext>
    </dom.div>
  );
  // oxlint-enable react/react-compiler
}
