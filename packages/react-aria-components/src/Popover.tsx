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

import type {AriaLabelingProps, RefObject} from '@react-types/shared';
import {AriaPopoverProps, usePopover} from 'react-aria/usePopover';
import {
  dom,
  RenderProps,
  SlotProps,
  useContextProps,
  useRenderProps
} from './utils';
import {DismissButton, Overlay} from 'react-aria/Overlay';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {focusSafely} from 'react-aria/private/interactions/focusSafely';
import {getInteractionModality} from 'react-aria/private/interactions/useFocusVisible';
import {isFocusWithin} from 'react-aria/private/utils/shadowdom/DOMFunctions';
import {mergeProps} from 'react-aria/mergeProps';
import {mergeRefs} from 'react-aria/mergeRefs';
import {OverlayArrowContext} from './OverlayArrowContext';
import {
  OverlayTriggerState,
  useOverlayTriggerState
} from 'react-stately/useOverlayTriggerState';
import {OverlayTriggerStateContext} from './Dialog';
import {createContext, createEffect, createSignal, merge, omit, onSettled, untrack, useContext, type Context, type Ref as NativeRef} from 'solid-js';
import {Show, type JSX} from '@solidjs/web';
import {useObjectRef, type Ref} from 'react-aria/private/utils/useObjectRef';
import {runAfterKeyboard} from 'react-aria/private/utils/runAfterKeyboard';
import {useEnterAnimation, useExitAnimation} from 'react-aria/private/utils/animation';
import {useIsHidden} from 'react-aria/private/collections/Hidden';
import {useLocale} from 'react-aria/I18nProvider';
import {useResizeObserver} from 'react-aria/private/utils/useResizeObserver';

import {PopoverContext, type PopoverProps, type PopoverRenderProps, type PopoverContextValue} from './PopoverContext';
export {PopoverContext} from './PopoverContext';
export type {PopoverProps, PopoverRenderProps, PopoverContextValue} from './PopoverContext';

// Stores a ref for the portal container for a group of popovers (e.g. submenus).
const PopoverGroupContext = createContext<RefObject<Element | null> | null>(null);

/**
 * A popover is an overlay element positioned relative to a trigger.
 */
export function Popover(input: PopoverProps & {ref?: NativeRef<HTMLDivElement>}): JSX.Element {
  let [props, mergedRef] = useContextProps(input, undefined, PopoverContext);
  let ref = useObjectRef<HTMLDivElement>(mergedRef as Ref<HTMLDivElement>);
  createEffect(() => ({element: ref.current, forwarded: input.ref}), ({element, forwarded}) => {
    if (!element) { return; }
    let deliver = mergeRefs(forwarded);
    let cleanup = deliver(element);
    return typeof cleanup === 'function' ? cleanup : () => { deliver(null); };
  });
  let contextState = useContext(OverlayTriggerStateContext);
  let localState = useOverlayTriggerState(props);
  let currentState = () =>
    props.isOpen != null || props.defaultOpen != null || !contextState ? localState : contextState;
  let state: OverlayTriggerState = {
    get isOpen() { return currentState().isOpen; },
    get point() { return currentState().point; },
    setOpen(isOpen) { currentState().setOpen(isOpen); },
    setPoint(point) { currentState().setPoint(point); },
    open() { currentState().open(); },
    close() { currentState().close(); },
    toggle() { currentState().toggle(); }
  };
  // Skip the automatic exit animation when closing instantly (e.g. swapping between previews
  // during warmup). An explicitly provided isExiting prop still takes precedence.
  let exitAnimation = useExitAnimation(ref, () => state.isOpen);
  let isExiting = () => props.isExiting || (!props.shouldSkipAnimation && exitAnimation()) || false;
  let isHidden = useIsHidden();
  let locale = useLocale();

  // If we are in a hidden tree, we still need to preserve our children.
  if (isHidden) {
    let children = () => {
      let children = props.children;
      return typeof children === 'function' ? children({
        trigger: props.trigger || null,
        placement: 'bottom',
        isEntering: false,
        isExiting: false,
        defaultChildren: null
      }) : children;
    };

    return <>{children()}</>;
  }

  return (
    <Show when={state.isOpen || isExiting()}>
    <PopoverInner
      popoverProps={props}
      triggerRef={props.triggerRef!}
      state={state}
      popoverRef={ref}
      isExiting={isExiting()}
      dir={locale.direction}
    />
    </Show>
  );
}

interface PopoverInnerProps extends AriaPopoverProps, AriaLabelingProps, RenderProps<PopoverRenderProps>, SlotProps {
  popoverProps: PopoverProps;
  forwardedRef?: NativeRef<HTMLDivElement>;
  state: OverlayTriggerState;
  isEntering?: boolean;
  isExiting: boolean;
  shouldSkipAnimation?: boolean;
  UNSTABLE_portalContainer?: Element;
  trigger?: string;
  dir?: 'ltr' | 'rtl';
  clearContexts?: Context<any>[];
  id?: string;
}

function PopoverInner(originalInput: PopoverInnerProps): JSX.Element {
  let input = merge(originalInput.popoverProps, omit(originalInput, 'popoverProps'));
  let props = omit(input, 'state', 'isExiting', 'UNSTABLE_portalContainer', 'clearContexts');
  let state: OverlayTriggerState = {
    get isOpen() { return input.state.isOpen; },
    get point() { return input.state.point; },
    setOpen(isOpen) { input.state.setOpen(isOpen); },
    setPoint(point) { input.state.setPoint(point); },
    open() { input.state.open(); },
    close() { input.state.close(); },
    toggle() { input.state.toggle(); }
  };
  // Calculate the arrow size internally (and remove props.arrowSize from PopoverProps)
  // Referenced from: packages/@react-spectrum/tooltip/src/TooltipTrigger.tsx
  let arrowRef = useObjectRef<HTMLDivElement>();
  let containerRef = useObjectRef<HTMLDivElement>();
  let groupCtx = useContext(PopoverGroupContext);
  let isSubPopover = () => !!groupCtx && props.trigger === 'SubmenuTrigger';

  let [isOpen, setIsOpen] = createSignal(false);

  let {popoverProps, underlayProps, arrowProps, placement, triggerAnchorPoint} = usePopover(
    merge(props, {
      get offset() { return props.offset ?? 8; },
      arrowRef,
      // If this is a submenu/subdialog, use the root popover's container
      // to detect outside interaction and add aria-hidden.
      get groupRef() { return isSubPopover() ? groupCtx! : containerRef; }
    }),
    state
  );

  let ref = originalInput.popoverRef as ReturnType<typeof useObjectRef<HTMLDivElement>>;
  // Skip the automatic entry animation when opening instantly (e.g. swapping between previews
  // during warmup). An explicitly provided isEntering prop still takes precedence.
  let enterAnimation = useEnterAnimation(ref, () => !!placement() && isOpen());
  // oxlint-disable-next-line react/react-compiler
  let isEntering = () => props.isEntering || (!props.shouldSkipAnimation && enterAnimation()) || false;
  // oxlint-disable-next-line react/react-compiler
  let renderProps = useRenderProps(merge(props, {
    // oxlint-disable-next-line react/react-compiler
    defaultClassName: 'react-aria-Popover',
    // oxlint-disable-next-line react/react-compiler
    values: {
      // oxlint-disable-next-line react/react-compiler
      get trigger() { return props.trigger || null; },
      get placement() { return placement(); },
      // oxlint-disable-next-line react/react-compiler
      get isEntering() { return isEntering(); },
      get isExiting() { return input.isExiting; }
    }
  }));

  // Automatically render Popover with role=dialog except when isNonModal is true,
  // or a dialog is already nested inside the popover.
  let shouldBeDialog = () =>
    // oxlint-disable-next-line react/react-compiler
    !props.isNonModal || props.trigger === 'SubmenuTrigger' || props.trigger === 'PreviewTrigger';
  // oxlint-disable-next-line react/react-compiler
  let [isDialog, setDialog] = createSignal(untrack(() => props.trigger === 'PreviewTrigger'));
  createEffect(() => ({element: ref.current, shouldBeDialog: shouldBeDialog()}), ({element, shouldBeDialog}) => {
    if (element) {
      setDialog(shouldBeDialog && !element.querySelector('[role=dialog]'));
    }
  });

  // Focus the popover itself on mount, unless a child element is already focused.
  // Skip this for submenus since hovering a submenutrigger should keep focus on the trigger
  // oxlint-disable react/react-compiler
  createEffect(() => ({isDialog: isDialog(), trigger: props.trigger, element: ref.current}), ({isDialog, trigger, element}) => {
    if (
      isDialog &&
      trigger !== 'PreviewTrigger' &&
      (trigger !== 'SubmenuTrigger' || getInteractionModality() !== 'pointer') &&
      element &&
      !isFocusWithin(element)
    ) {
      focusSafely(element);
    }
  });
  // oxlint-enable react/react-compiler

  // Source wraps each successive context around the previous one. Keep the
  // same order and defer content creation until under the cleared providers.
  let children = () => {
    let contexts = [PopoverContext, ...(input.clearContexts ?? [])];
    function nest(index: number): JSX.Element {
      if (index < 0) return renderProps.children;
      let Context = contexts[index];
      return <Context value={null}>{nest(index - 1)}</Context>;
    }
    return nest(contexts.length - 1);
  };

  let [triggerWidth, setTriggerWidth] = createSignal<string | null>(null);
  // oxlint-disable-next-line react/react-compiler
  let onResize = () => {
    let trigger = untrack(() => props.triggerRef.current);
    if (trigger) {
      setTriggerWidth(trigger.getBoundingClientRect().width + 'px');
    }
  };

  createEffect(() => ({ref: props.triggerRef, element: props.triggerRef.current}), () => { onResize(); });
  // oxlint-disable-next-line react/react-compiler
  useResizeObserver({
    // oxlint-disable-next-line react/react-compiler
    get ref() { return renderProps.style?.['--trigger-width'] ? undefined : props.triggerRef; },
    onResize: onResize
  });

  let style = () => ({
    ...popoverProps.style,
    '--trigger-anchor-point': triggerAnchorPoint()
      ? `${triggerAnchorPoint()!.x}px ${triggerAnchorPoint()!.y}px`
      : undefined,
    ...renderProps.style,
    '--trigger-width': renderProps.style?.['--trigger-width'] || triggerWidth() || undefined
  });

  // Since our trigger may open the OSK, we defer the reveal, as a courtesy, to avoid layout shift.
  onSettled(() => runAfterKeyboard(() => setIsOpen(true)));

  // oxlint-disable react/react-compiler
  let DOMProps = mergeProps(filterDOMProps(props, {global: true}), popoverProps) as JSX.HTMLAttributes<HTMLDivElement>;
  // Construct the surface beneath an owned component, not inside the Portal's
  // disposable content computation. Attributes and render values stay live.
  let PopoverSurface = () => (
    <dom.div
      {...DOMProps}
      {...renderProps}
      id={isDialog() ? props.id : undefined}
      role={isDialog() ? 'dialog' : undefined}
      tabindex={isDialog() ? -1 : undefined}
      aria-label={props['aria-label']}
      aria-labelledby={props['aria-labelledby']}
       ref={ref}
      slot={props.slot || undefined}
      style={style()}
      dir={props.dir}
      data-trigger={props.trigger}
      data-placement={placement()}
      data-entering={isEntering() || undefined}
      data-exiting={input.isExiting || undefined}>
      {/* oxlint-disable-next-line react/react-compiler */}
      {!props.isNonModal && <DismissButton onDismiss={state.close} />}
      <OverlayArrowContext value={merge(arrowProps, {get placement() { return placement(); }, ref: arrowRef})}>
        {children()}
      </OverlayArrowContext>
      <DismissButton onDismiss={state.close} />
    </dom.div>
  );
  // oxlint-enable react/react-compiler

  // If this is a root popover, render an extra div to act as the portal container for submenus/subdialogs.
  return (
    <Show when={!isSubPopover()} fallback={
      <Overlay
        {...props}
        shouldContainFocus={isDialog() && props.trigger !== 'PreviewTrigger'}
        isExiting={input.isExiting}
        portalContainer={input.UNSTABLE_portalContainer ?? groupCtx?.current ?? undefined}>
         <PopoverSurface />
      </Overlay>
    }>
      <Overlay
        {...props}
        shouldContainFocus={isDialog() && props.trigger !== 'PreviewTrigger'}
        isExiting={input.isExiting}
        portalContainer={input.UNSTABLE_portalContainer}>
        {/* oxlint-disable-next-line react/react-compiler */}
        {!props.isNonModal && state.isOpen && (
          <div data-testid="underlay" {...underlayProps as JSX.HTMLAttributes<HTMLDivElement>} style={{position: 'fixed', inset: 0}} />
        )}
        <div ref={containerRef} style={{display: 'contents'}}>
          <PopoverGroupContext value={containerRef}>
             <PopoverSurface />
          </PopoverGroupContext>
        </div>
      </Overlay>
    </Show>
  );
  // oxlint-enable react/react-compiler
}
