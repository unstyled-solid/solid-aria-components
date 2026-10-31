/*
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {AriaToastProps, AriaToastRegionProps, useToast, useToastRegion} from 'react-aria/useToast';

import {ButtonContext} from './Button';
import {
  ClassNameOrFunction,
  ContextValue,
  DEFAULT_SLOT,
  dom,
  DOMRenderProps,
  Provider,
  RenderProps,
  SlotProps,
  StyleRenderProps,
  useContextProps,
  useRenderProps
} from './utils';
import {Portal, type JSX} from '@solidjs/web';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {GlobalDOMAttributes} from '@react-types/shared';
import {mergeProps} from 'react-aria/mergeProps';
import {QueuedToast, ToastQueue, ToastState, useToastQueue} from 'react-stately/useToastState';
import {createContext, For, merge, omit, Show, untrack, useContext, type Ref} from 'solid-js';
import {TextContext} from './Text';
import {useFocusRing} from 'react-aria/useFocusRing';
import {useHover} from 'react-aria/useHover';
import {useIsSSR} from 'react-aria/SSRProvider';
import {useLocale} from 'react-aria/I18nProvider';
import {useObjectRef, type Ref as ObjectRefInput} from 'react-aria/private/utils/useObjectRef';
import {useUNSAFE_PortalContext} from 'react-aria/PortalProvider';

const ToastStateContext = createContext<ToastState<any> | null>(null);

export interface ToastRegionRenderProps<T> {
  /** A list of all currently visible toasts. */
  visibleToasts: QueuedToast<T>[];
  /**
   * Whether the toast region is currently hovered with a mouse.
   *
   * @selector [data-hovered]
   */
  isHovered: boolean;
  /**
   * Whether the toast region is currently focused.
   *
   * @selector [data-focused]
   */
  isFocused: boolean;
  /**
   * Whether the toast region is keyboard focused.
   *
   * @selector [data-focus-visible]
   */
  isFocusVisible: boolean;
}

export interface ToastRegionProps<T>
  extends
    AriaToastRegionProps,
    StyleRenderProps<ToastRegionRenderProps<T>>,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-ToastRegion'
   */
  className?: ClassNameOrFunction<ToastRegionRenderProps<T>>;
  /** The queue of toasts to display. */
  queue: ToastQueue<T>;
  /** A function to render each toast, or children containing a `<ToastList>`. */
  children: JSX.Element | ((renderProps: {toast: QueuedToast<T>}) => JSX.Element);
}

/**
 * A ToastRegion displays one or more toast notifications.
 */
function ToastRegion<T>(
  props: ToastRegionProps<T> & {ref?: Ref<HTMLDivElement>}
): JSX.Element | null {
  let isSSR = useIsSSR();
  let state = useToastQueue(() => props.queue);
  let objectRef = useObjectRef(untrack(() => props.ref) as ObjectRefInput<HTMLDivElement>);
  let {regionProps} = useToastRegion(props, state, objectRef);

  let {focusProps, isFocused, isFocusVisible} = useFocusRing();
  let {hoverProps, isHovered} = useHover({});
  let renderProps = useRenderProps(merge(omit(props, 'children'), {
    children: undefined,
    defaultClassName: 'react-aria-ToastRegion',
    values: {
      get visibleToasts() { return state.visibleToasts; },
      get isHovered() { return isHovered(); },
      get isFocused() { return isFocused(); },
      get isFocusVisible() { return isFocusVisible(); }
    }
  }));

  let locale = useLocale();
  let portalContext = useUNSAFE_PortalContext();
  let portalContainer = () => {
    if (isSSR()) { return null; }
    return portalContext.getContainer ? portalContext.getContainer() : document.body;
  };

  let DOMProps = filterDOMProps(props, {global: true});

  return (
    <Show when={state.visibleToasts.length > 0 && portalContainer()}>
      <Portal mount={portalContainer()!}>
        <ToastStateContext value={state}>
          <dom.div
            {...mergeProps(DOMProps, renderProps, regionProps, focusProps, hoverProps)}
            dir={locale.direction}
            ref={objectRef}
            data-hovered={isHovered() || undefined}
            data-focused={isFocused() || undefined}
            data-focus-visible={isFocusVisible() || undefined}>
            {typeof props.children === 'function' && props.children.length > 0 ? (
              <ToastList
                {...omit(props, 'ref', 'queue', 'children', 'render')}
                render={undefined}
                className={undefined}
                style={{display: 'contents'}}>
                {props.children as (renderProps: {toast: QueuedToast<T>}) => JSX.Element}
              </ToastList>
            ) : (
              props.children as JSX.Element
            )}
          </dom.div>
        </ToastStateContext>
      </Portal>
    </Show>
  );
}

export interface ToastListProps<T>
  extends
    Omit<ToastRegionProps<T>, 'queue' | 'children' | 'render'>,
    DOMRenderProps<'ol', ToastRegionRenderProps<T>> {
  /** A function to render each toast. */
  children: (renderProps: {toast: QueuedToast<T>}) => JSX.Element;
}

function ToastList<T>(
  props: ToastListProps<T> & {ref?: Ref<HTMLOListElement>}
) {
  let state = useContext(ToastStateContext)!;
  let {hoverProps, isHovered} = useHover({});
  let renderProps = useRenderProps(merge(omit(props, 'children'), {
    children: undefined,
    defaultClassName: 'react-aria-ToastList',
    values: {
      get visibleToasts() { return state.visibleToasts; },
      isFocused: false,
      isFocusVisible: false,
      get isHovered() { return isHovered(); }
    }
  }));

  return (
    <dom.ol {...hoverProps} {...renderProps} ref={props.ref}>
      <For each={state.visibleToasts} keyed={toast => toast.key}>{toast => (
        <li style={{display: 'contents'}}>
          {props.children({get toast() { return toast(); }})}
        </li>
      )}</For>
    </dom.ol>
  );
}

export interface ToastRenderProps<T> {
  /**
   * The toast object to display.
   */
  toast: QueuedToast<T>;
  /**
   * Whether the toast is currently focused.
   *
   * @selector [data-focused]
   */
  isFocused: boolean;
  /**
   * Whether the toast is keyboard focused.
   *
   * @selector [data-focus-visible]
   */
  isFocusVisible: boolean;
}

export interface ToastProps<T>
  extends AriaToastProps<T>, RenderProps<ToastRenderProps<T>>, GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-Toast'
   */
  className?: ClassNameOrFunction<ToastRenderProps<T>>;
}

/**
 * A Toast displays a brief, temporary notification of actions, errors, or other events in an
 * application.
 */
function Toast<T>(
  props: ToastProps<T> & {ref?: Ref<HTMLDivElement>}
) {
  let state = useContext(ToastStateContext)!;
  let objectRef = useObjectRef(untrack(() => props.ref) as ObjectRefInput<HTMLDivElement>);
  let {toastProps, contentProps, titleProps, descriptionProps, closeButtonProps} = useToast(
    props,
    state,
    objectRef
  );

  let {focusProps, isFocused, isFocusVisible} = useFocusRing();
  let renderProps = useRenderProps(merge(props, {
    defaultClassName: 'react-aria-Toast',
    values: {
      get toast() { return props.toast; },
      get isFocused() { return isFocused(); },
      get isFocusVisible() { return isFocusVisible(); }
    }
  }));

  let DOMProps = filterDOMProps(props, {global: true});

  return (
    <dom.div
      {...mergeProps(DOMProps, renderProps, toastProps, focusProps)}
      ref={objectRef}
      data-focused={isFocused() || undefined}
      data-focus-visible={isFocusVisible() || undefined}>
      <Provider
        values={[
           [ToastContentContext, omit(contentProps, 'ref', 'slot')],
          [
            TextContext,
            {
              slots: {
                [DEFAULT_SLOT]: {},
                title: omit(titleProps, 'ref', 'slot'),
                description: omit(descriptionProps, 'ref', 'slot')
              }
            }
          ],
          [
            ButtonContext,
            {
              slots: {
                [DEFAULT_SLOT]: {},
                close: closeButtonProps
              }
            }
          ]
        ]}>
        {renderProps.children}
      </Provider>
    </dom.div>
  );
}

export interface ToastContentProps
  extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'slot'>, SlotProps, DOMRenderProps<'div', undefined> {}

export const ToastContentContext = createContext<
  ContextValue<ToastContentProps, HTMLDivElement>
>({});

/**
 * ToastContent wraps the main content of a toast notification.
 */
export function ToastContent(
  inputProps: ToastContentProps & {ref?: Ref<HTMLDivElement>}
) {
  let [props, ref] = useContextProps(inputProps, untrack(() => inputProps.ref), ToastContentContext);
  return (
    <dom.div render={props.render} className="react-aria-ToastContent" {...omit(props, 'slot')} slot={props.slot ?? undefined} ref={ref}>
      {props.children}
    </dom.div>
  );
}

export {
  Toast as UNSTABLE_Toast,
  ToastList as UNSTABLE_ToastList,
  ToastRegion as UNSTABLE_ToastRegion,
  ToastContent as UNSTABLE_ToastContent,
  ToastStateContext as UNSTABLE_ToastStateContext
};
