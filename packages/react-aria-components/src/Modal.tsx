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

import {AriaModalOverlayProps, useModalOverlay} from 'react-aria/useModalOverlay';
import {
  ClassNameOrFunction,
  ContextValue,
  dom,
  Provider,
  RenderProps,
  SlotProps,
  useContextProps,
  useRenderProps
} from './utils';
import {DialogContext, DialogProps, OverlayTriggerStateContext} from './Dialog';
import {DismissButton, Overlay} from 'react-aria/Overlay';
import {DOMAttributes, GlobalDOMAttributes, RefObject} from '@react-types/shared';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {isScrollable} from 'react-aria/private/utils/isScrollable';
import {mergeProps} from 'react-aria/mergeProps';
import {mergeRefs} from 'react-aria/mergeRefs';
import {
  OverlayTriggerProps,
  OverlayTriggerState,
  useOverlayTriggerState
} from 'react-stately/useOverlayTriggerState';
import {createContext, createEffect, createMemo, createSignal, merge, omit, onSettled, Show, useContext} from 'solid-js';
import type {Ref as NativeRef} from 'solid-js';
import type {JSX} from '@solidjs/web';
import type {ObjectRef, Ref} from 'react-aria/private/utils/useObjectRef';
import {runAfterKeyboard} from 'react-aria/private/utils/runAfterKeyboard';
import {useEnterAnimation, useExitAnimation} from 'react-aria/private/utils/animation';
import {useIsSSR} from 'react-aria/SSRProvider';
import {useObjectRef} from 'react-aria/useObjectRef';
import {useViewportSize} from 'react-aria/private/utils/useViewportSize';

export interface ModalOverlayProps
  extends
    AriaModalOverlayProps,
    OverlayTriggerProps,
    RenderProps<ModalRenderProps>,
    SlotProps,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-ModalOverlay'
   */
  className?: ClassNameOrFunction<ModalRenderProps>;
  /**
   * Whether the modal is currently performing an entry animation.
   */
  isEntering?: boolean;
  /**
   * Whether the modal is currently performing an exit animation.
   */
  isExiting?: boolean;
  /**
   * Callback when the modal starts entering. Return a promise to indicate when the entry animation
   * has completed.
   */
  onEnter?: (element: HTMLElement) => void | Promise<void>;
  /**
   * Callback when the modal starts exiting. Return a promise to indicate when the exit animation
   * has completed.
   */
  onExit?: (element: HTMLElement) => void | Promise<void>;
  /**
   * The container element in which the overlay portal will be placed. This may have unknown
   * behavior depending on where it is portalled to.
   *
   * @deprecated - Use a parent UNSAFE_PortalProvider to set your portal container instead.
   * @default document.body
   */
  UNSTABLE_portalContainer?: Element;
  /**
   * Whether to wait until the entry animation completes before hiding content outside the modal
   * and moving focus into it.
   *
   * @private
   */
  UNSTABLE_deferUntilEntered?: boolean;
  ref?: NativeRef<HTMLDivElement>;
}

interface InternalModalContextValue {
  modalProps: DOMAttributes;
  modalRef: RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  isExiting: boolean;
  isDismissable?: boolean;
  onExitRef?: RefObject<ModalOverlayProps['onExit'] | null>;
}

export const ModalContext = createContext<ContextValue<ModalOverlayProps, HTMLDivElement>>(null);
export const InternalModalContext = createContext<InternalModalContextValue | null>(null);

export interface ModalRenderProps {
  /**
   * Whether the modal is currently entering. Use this to apply animations.
   *
   * @selector [data-entering]
   */
  isEntering: boolean;
  /**
   * Whether the modal is currently exiting. Use this to apply animations.
   *
   * @selector [data-exiting]
   */
  isExiting: boolean;
  /**
   * State of the modal.
   */
  state: OverlayTriggerState;
}

/**
 * A modal is an overlay element which blocks interaction with elements outside it.
 */
export function Modal(props: ModalOverlayProps): JSX.Element {
  let ctx = useContext(InternalModalContext);

  if (ctx) {
    createEffect(() => ({onOpenChange: props.onOpenChange, defaultOpen: props.defaultOpen, isOpen: props.isOpen, keys: Object.keys(props)}), ({onOpenChange, defaultOpen, isOpen, keys}) => {
    if (process.env.NODE_ENV !== 'production' && (onOpenChange || defaultOpen !== undefined || isOpen !== undefined)) {
      // create a list of props that are passed in but not allowed when using an external ModalOverlay
      const invalidSet = new Set([
        'isDismissable',
        'isKeyboardDismissDisabled',
        'isOpen',
        'defaultOpen',
        'onOpenChange',
        'isEntering',
        'isExiting',
        'UNSTABLE_portalContainer',
        'shouldCloseOnInteractOutside'
      ]);
      const invalidProps = keys.filter(key => invalidSet.has(key));
      console.warn(
        `This modal is already wrapped in a ModalOverlay, props [${invalidProps.join(', ')}] should be placed on the ModalOverlay instead.`
      );
    }
    });
    return (
      <ModalContent {...props} modalRef={props.ref}>
        {props.children}
      </ModalContent>
    );
  }

  let otherProps = omit(props, 'isDismissable', 'isKeyboardDismissDisabled', 'isOpen',
    'defaultOpen', 'onOpenChange', 'children', 'isEntering', 'isExiting',
    'UNSTABLE_portalContainer', 'shouldCloseOnInteractOutside', 'ref');

  return (
    <ModalOverlay
      isDismissable={props.isDismissable}
      isKeyboardDismissDisabled={props.isKeyboardDismissDisabled}
      isOpen={props.isOpen}
      defaultOpen={props.defaultOpen}
      onOpenChange={props.onOpenChange}
      isEntering={props.isEntering}
      isExiting={props.isExiting}
      UNSTABLE_portalContainer={props.UNSTABLE_portalContainer}
      shouldCloseOnInteractOutside={props.shouldCloseOnInteractOutside}>
      <ModalContent {...otherProps} modalRef={props.ref}>
        {props.children}
      </ModalContent>
    </ModalOverlay>
  );
}

interface ModalOverlayInnerProps {
  overlayProps: ModalOverlayProps;
  overlayRef: ObjectRef<HTMLDivElement>;
  modalRef: ObjectRef<HTMLDivElement>;
  state: OverlayTriggerState;
  isExiting: boolean;
  onExitRef?: RefObject<ModalOverlayProps['onExit'] | null>;
}

export function ModalOverlay(originalProps: ModalOverlayProps): JSX.Element {
  let [props, ref] = useContextProps(originalProps, undefined, ModalContext);
  let contextState = useContext(OverlayTriggerStateContext);
  let localState = useOverlayTriggerState(props);
  let selectedState = () =>
    props.isOpen != null || props.defaultOpen != null || !contextState ? localState : contextState;
  // The selection remains live without replacing the mounted overlay owner.
  let state: OverlayTriggerState = {
    get isOpen() { return selectedState().isOpen; },
    setOpen(isOpen) { selectedState().setOpen(isOpen); },
    open() { selectedState().open(); },
    close() { selectedState().close(); },
    toggle() { selectedState().toggle(); },
    get point() { return selectedState().point; },
    setPoint(point) { selectedState().setPoint(point); }
  };
  createEffect(() => ({isContext: selectedState() === contextState, onOpenChange: props.onOpenChange, defaultOpen: props.defaultOpen, isOpen: props.isOpen}), ({isContext, onOpenChange, defaultOpen, isOpen}) => {
  if (isContext) {
    if (
      process.env.NODE_ENV !== 'production' &&
      (onOpenChange || defaultOpen !== undefined || isOpen !== undefined)
    ) {
      console.warn(
        'This modals state is controlled by a trigger, place onOpenChange on the trigger instead.'
      );
    }
  }
  });

  let objectRef = useObjectRef<HTMLDivElement>(ref as Ref<HTMLDivElement>);
  // The public ref is a live input, not a setup snapshot. Context forwarding
  // stays owned by useContextProps; changing the public ref does not remount.
  createEffect(() => ({element: objectRef.current, forwarded: originalProps.ref}), ({element, forwarded}) => {
    if (!element) { return; }
    let deliver = mergeRefs(forwarded);
    let cleanup = deliver(element);
    return typeof cleanup === 'function' ? cleanup : () => { deliver(null); };
  });
  let modalRef = useObjectRef<HTMLDivElement>();
  let isOverlayExiting = useExitAnimation(objectRef, () => state.isOpen, element => props.onExit?.(element));
  let onExitRef: RefObject<ModalOverlayProps['onExit'] | null> = {current: null};
  let isModalExiting = useExitAnimation(modalRef, () => state.isOpen, element =>
    onExitRef.current?.(element)
  );
  let isExiting = () => isOverlayExiting() || isModalExiting() || props.isExiting || false;
  let isSSR = useIsSSR();

  return (
    <Show when={(state.isOpen || isExiting()) && !isSSR()}><ModalOverlayInner
      overlayProps={props}
      state={state}
      isExiting={isExiting()}
      overlayRef={objectRef}
      modalRef={modalRef}
      onExitRef={onExitRef}
    /></Show>
  );
}

/**
 * A ModalOverlay is a wrapper for a Modal which allows customizing the backdrop element.
 */
function ModalOverlayInner(originalProps: ModalOverlayInnerProps): JSX.Element {
  let overlayProps = originalProps.overlayProps;
  let props = merge(omit(overlayProps, 'UNSTABLE_portalContainer', 'UNSTABLE_deferUntilEntered'), {
    overlayRef: originalProps.overlayRef,
    modalRef: originalProps.modalRef,
    state: originalProps.state,
    get isExiting() { return originalProps.isExiting; },
    onExitRef: originalProps.onExitRef
  });
  let modalRef = originalProps.modalRef;
  let state = originalProps.state;

  let [isOpen, setIsOpen] = createSignal(false);
  let isAnimating = useEnterAnimation(props.overlayRef, isOpen, element => props.onEnter?.(element));
  let entering = () => isAnimating() || props.isEntering || false;
  let isDeferred = () => !!overlayProps.UNSTABLE_deferUntilEntered && (!isOpen() || entering());
  let {modalProps, underlayProps} = useModalOverlay(
    merge(props, {get isEntering() { return isDeferred(); }}),
    state,
    modalRef
  );

  // Pass the entering state to the dialog so it waits to move focus until the modal has entered.
  let dialogContext = useContext(DialogContext);
  let inheritedDialogContext = () => typeof dialogContext === 'function' ? dialogContext() : dialogContext;
  // Keep provider and host owners stable. Policy/parent identity changes select
  // the actual inherited value (including null), while entering stays live.
  let mergedDialogContext = createMemo(() => overlayProps.UNSTABLE_deferUntilEntered
    ? mergeDialogContext(inheritedDialogContext(), {get isEntering() { return isDeferred(); }})
    : inheritedDialogContext());

  let renderProps = useRenderProps(merge(props, {
    defaultClassName: 'react-aria-ModalOverlay',
    values: {
      get isEntering() { return entering(); },
      get isExiting() { return props.isExiting; },
      state
    }
  }));

  let viewport = useViewportSize();
  let style = () => {
    let pageWidth: number | undefined = undefined;
    let pageHeight: number | undefined = undefined;
    if (typeof document !== 'undefined') {
      let scrollingElement = isScrollable(document.body)
        ? document.body
        : document.scrollingElement || document.documentElement;
      // Prevent Firefox from adding scrollbars when the page has a fractional width/height.
      let fractionalWidthDifference = scrollingElement.getBoundingClientRect().width % 1;
      let fractionalHeightDifference = scrollingElement.getBoundingClientRect().height % 1;
      pageWidth = scrollingElement.scrollWidth - fractionalWidthDifference;
      pageHeight = scrollingElement.scrollHeight - fractionalHeightDifference;
    }

    return {
      ...renderProps.style,
      '--visual-viewport-width': viewport.width + 'px',
      '--visual-viewport-height': viewport.height + 'px',
      '--page-width': pageWidth !== undefined ? pageWidth + 'px' : undefined,
      '--page-height': pageHeight !== undefined ? pageHeight + 'px' : undefined
    };
  };

  // Since an auto-focused input may open the OSK, we defer the reveal, as a courtesy, to avoid layout shift.
  onSettled(() => runAfterKeyboard(() => setIsOpen(true)));

  // oxlint-disable react/react-compiler
  return (
    <Overlay isExiting={props.isExiting} portalContainer={overlayProps.UNSTABLE_portalContainer}>
      <dom.div
        {...mergeProps(filterDOMProps(props, {global: true}), underlayProps)}
        {...renderProps}
        style={style()}
        ref={props.overlayRef}
        data-entering={entering() ? 'true' : undefined}
        data-exiting={props.isExiting ? 'true' : undefined}>
        <Provider
          values={[
            [
              InternalModalContext,
              {
                modalProps,
                modalRef,
                get isExiting() { return props.isExiting; },
                get onExitRef() { return props.onExitRef; },
                get isOpen() { return isOpen(); },
                get isDismissable() { return props.isDismissable; }
              }
            ],
            [OverlayTriggerStateContext, state],
            [DialogContext, mergedDialogContext]
          ]}>
          {renderProps.children}
        </Provider>
      </dom.div>
    </Overlay>
  );
  // oxlint-enable react/react-compiler
}

function mergeDialogContext(
  context: ContextValue<DialogProps, HTMLElement>,
  props: Partial<DialogProps>
): ContextValue<DialogProps, HTMLElement> {
  if (context && 'slots' in context && context.slots) {
    let slots: Record<string, Partial<DialogProps>> = {};
    for (let key in context.slots) {
      slots[key] = merge(context.slots[key], props);
    }
    return merge(context, {slots});
  }
  return merge(context ?? {}, props);
}

interface ModalContentProps
  extends RenderProps<ModalRenderProps>, GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-ModalContent'
   */
  className?: ClassNameOrFunction<ModalRenderProps>;
  modalRef?: NativeRef<HTMLDivElement>;
  onEnter?: (element: HTMLElement) => void;
  onExit?: (element: HTMLElement) => void;
}

function ModalContent(props: ModalContentProps) {
  let context = useContext(InternalModalContext)!;
  let {modalProps, modalRef} = context;
  let state = useContext(OverlayTriggerStateContext)!;
  let ref = useObjectRef<HTMLDivElement>();
  createEffect(() => ({element: ref.current, forwarded: props.modalRef}), ({element, forwarded}) => {
    if (!element) { return; }
    let deliver = mergeRefs(forwarded, modalRef);
    let cleanup = deliver(element);
    return typeof cleanup === 'function' ? cleanup : () => { deliver(null); };
  });
  let entering = useEnterAnimation(ref, () => context.isOpen, element => props.onEnter?.(element));
  let renderProps = useRenderProps(merge(props, {
    defaultClassName: 'react-aria-Modal',
    values: {
      get isEntering() { return entering(); },
      get isExiting() { return context.isExiting; },
      state
    }
  }));

  createEffect(() => ({onExitRef: context.onExitRef, onExit: props.onExit}), ({onExitRef, onExit}) => {
    if (onExitRef) {
      onExitRef.current = onExit;
    }
  });

  return (
    <dom.div
      {...mergeProps(filterDOMProps(props, {global: true}), modalProps)}
      {...renderProps}
      ref={ref}
      data-entering={entering() ? 'true' : undefined}
      data-exiting={context.isExiting ? 'true' : undefined}>
      {context.isDismissable && <DismissButton onDismiss={state.close} />}
      {renderProps.children}
    </dom.div>
  );
}
