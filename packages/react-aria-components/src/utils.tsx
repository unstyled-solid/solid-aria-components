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

import {AriaLabelingProps, DOMProps as SharedDOMProps} from '@react-types/shared';
import {mergeProps} from 'react-aria/mergeProps';
import type {Context, Accessor, Ref as ForwardedRef, Element as ReactNode, Element as ReactElement} from 'solid-js';
import type {JSX} from '@solidjs/web';
type AllHTMLAttributes<T> = JSX.HTMLAttributes<T> & {className?: string; ref?: ForwardedRef<T>};
type AnchorHTMLAttributes<T> = JSX.AnchorHTMLAttributes<T>;
type CSSProperties = JSX.CSSProperties;
type DetailedHTMLProps<P, T> = P & {ref?: ForwardedRef<T>};
type RefCallback<T> = (element: T) => void;
import {$PROXY, createEffect, createMemo, createSignal, For, isStatic, merge, omit, onCleanup, onSettled, untrack, useContext} from 'solid-js';
import {attachRef, useObjectRef, type ObjectRef} from 'react-aria/private/utils/useObjectRef';
import {dynamic, isServer} from '@solidjs/web';

export const DEFAULT_SLOT = Symbol('default');

interface SlottedValue<T> {
  slots?: Record<string | symbol, T>;
}

export type SlottedContextValue<T> = SlottedValue<T> | T | null | undefined;
export type ContextValue<T, E> = SlottedContextValue<WithRef<T, E>>;

type ProviderValue<T> = [Context<T>, T];
type ProviderValues<A, B, C, D, E, F, G, H, I, J, K, L, M> =
  | [ProviderValue<A>]
  | [ProviderValue<A>, ProviderValue<B>]
  | [ProviderValue<A>, ProviderValue<B>, ProviderValue<C>]
  | [ProviderValue<A>, ProviderValue<B>, ProviderValue<C>, ProviderValue<D>]
  | [ProviderValue<A>, ProviderValue<B>, ProviderValue<C>, ProviderValue<D>, ProviderValue<E>]
  | [
      ProviderValue<A>,
      ProviderValue<B>,
      ProviderValue<C>,
      ProviderValue<D>,
      ProviderValue<E>,
      ProviderValue<F>
    ]
  | [
      ProviderValue<A>,
      ProviderValue<B>,
      ProviderValue<C>,
      ProviderValue<D>,
      ProviderValue<E>,
      ProviderValue<F>,
      ProviderValue<G>
    ]
  | [
      ProviderValue<A>,
      ProviderValue<B>,
      ProviderValue<C>,
      ProviderValue<D>,
      ProviderValue<E>,
      ProviderValue<F>,
      ProviderValue<G>,
      ProviderValue<H>
    ]
  | [
      ProviderValue<A>,
      ProviderValue<B>,
      ProviderValue<C>,
      ProviderValue<D>,
      ProviderValue<E>,
      ProviderValue<F>,
      ProviderValue<G>,
      ProviderValue<H>,
      ProviderValue<I>
    ]
  | [
      ProviderValue<A>,
      ProviderValue<B>,
      ProviderValue<C>,
      ProviderValue<D>,
      ProviderValue<E>,
      ProviderValue<F>,
      ProviderValue<G>,
      ProviderValue<H>,
      ProviderValue<I>,
      ProviderValue<J>
    ]
  | [
      ProviderValue<A>,
      ProviderValue<B>,
      ProviderValue<C>,
      ProviderValue<D>,
      ProviderValue<E>,
      ProviderValue<F>,
      ProviderValue<G>,
      ProviderValue<H>,
      ProviderValue<I>,
      ProviderValue<J>,
      ProviderValue<K>
    ]
  | [
      ProviderValue<A>,
      ProviderValue<B>,
      ProviderValue<C>,
      ProviderValue<D>,
      ProviderValue<E>,
      ProviderValue<F>,
      ProviderValue<G>,
      ProviderValue<H>,
      ProviderValue<I>,
      ProviderValue<J>,
      ProviderValue<K>,
      ProviderValue<L>
    ]
  | [
      ProviderValue<A>,
      ProviderValue<B>,
      ProviderValue<C>,
      ProviderValue<D>,
      ProviderValue<E>,
      ProviderValue<F>,
      ProviderValue<G>,
      ProviderValue<H>,
      ProviderValue<I>,
      ProviderValue<J>,
      ProviderValue<K>,
      ProviderValue<L>,
      ProviderValue<M>
    ];

interface ProviderProps<A, B, C, D, E, F, G, H, I, J, K, L, M> {
  values: ProviderValues<A, B, C, D, E, F, G, H, I, J, K, L, M>;
  children: ReactNode;
}

export function Provider<A, B, C, D, E, F, G, H, I, J, K, L, M>(
  props: ProviderProps<A, B, C, D, E, F, G, H, I, J, K, L, M>
): JSX.Element {
  // Tuple values may be reactive. Only a changed tuple count changes the
  // nesting topology; ordinary value updates retain every provider owner.
  let count = createMemo(() => props.values.length);
  function nest(index: number): JSX.Element {
    if (index < 0) return props.children;
    let Context = dynamic(() => props.values[index][0]);
    // Each tuple associates its own Context<T> and T; indexing a heterogeneous
    // tuple union loses that association in TypeScript (also present upstream).
    // @ts-expect-error correlated provider/value tuple
    return <Context value={props.values[index][1]}>{nest(index - 1)}</Context>;
  }
  return <>{nest(count() - 1)}</>;
}

export interface StyleProps {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element.
   */
  className?: string;
  /**
   * The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the
   * element.
   */
  style?: CSSProperties;
}

export interface DOMProps extends StyleProps, SharedDOMProps {
  /** The children of the component. */
  children?: ReactNode;
}

export type ClassNameOrFunction<T> =
  | string
  | ((values: T & {defaultClassName: string | undefined}) => string);
export type StyleOrFunction<T> =
  | CSSProperties
  | ((values: T & {defaultStyle: CSSProperties}) => CSSProperties | undefined);

export interface StyleRenderProps<
  T,
  E extends keyof JSX.IntrinsicElements = 'div'
> extends DOMRenderProps<E, T> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   */
  className?: ClassNameOrFunction<T>;
  /**
   * The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the
   * element. A function may be provided to compute the style based on component state.
   */
  style?: StyleOrFunction<T>;
}

export type ChildrenOrFunction<T> =
  | ReactNode
  | ((values: T & {defaultChildren: ReactNode | undefined}) => ReactNode);

export interface RenderProps<
  T,
  E extends keyof JSX.IntrinsicElements = 'div'
> extends StyleRenderProps<T, E> {
  /**
   * The children of the component. A function may be provided to alter the children based on
   * component state.
   */
  children?: ChildrenOrFunction<T>;
}

interface RenderPropsHookOptions<T, E extends keyof JSX.IntrinsicElements>
  extends RenderProps<T, E>, SharedDOMProps, AriaLabelingProps {
  values: T;
  defaultChildren?: ReactNode;
  defaultClassName?: string;
  defaultStyle?: CSSProperties;
}

interface RenderPropsHookRetVal<T, E extends keyof JSX.IntrinsicElements> {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  'data-rac': string;
  render?: DOMRenderFunction<E, T>;
}

export function useRenderProps<T, E extends keyof JSX.IntrinsicElements>(
  props: RenderPropsHookOptions<T, E>
): RenderPropsHookRetVal<T, E> {
  // Construct JSX under the consuming provider, not while preparing props.
  // The row identity is the actual children value/factory. Native For invokes
  // its row setup untracked: live state is read by the factory's JSX bindings,
  // never by the surrounding construction scope. A new factory disposes the
  // previous row normally; scalar class/style derivations remain tracked below.
  let content: ReactNode;
  let contentInitialized = false;
  let values = merge(() => props.values, {get defaultChildren() { return props.defaultChildren; }}) as T & {defaultChildren: ReactNode};
  let resolveContent = () => {
    if (!contentInitialized) {
      contentInitialized = true;
      content = For({
        get each() { return [props.children]; },
        children: value => {
          // Both lazy JSX and state render callbacks are live leaf bindings.
          // Calling a state callback in row setup snapshots scalar/conditional
          // results and leaves its reactive reads outside tracking.
          if (typeof value === 'function') {
            return <>{value(values) ?? props.defaultChildren}</>;
          }
          return <>{value ?? props.defaultChildren}</>;
        }
      });
    }
    return content;
  };
  return {
    get className() {
      let value = props.className;
      return (typeof value === 'function' ? value({...props.values, defaultClassName: props.defaultClassName}) : value) ?? props.defaultClassName;
    },
    get style() {
      let value = props.style;
      let computed = typeof value === 'function' ? value({...props.values, defaultStyle: props.defaultStyle || {}}) : value;
      return computed || props.defaultStyle ? {...props.defaultStyle, ...computed} : undefined;
    },
    get children() {
      return resolveContent();
    },
    'data-rac': '',
    get render() { return props.render ? (domProps: JSX.IntrinsicElements[E]) => props.render!(domProps, props.values) : undefined; }
  };
}

/**
 * A helper function that accepts a user-provided render prop value (either a static value or a
 * function), and combines it with another value to create a final result.
 */
export function composeRenderProps<T, U, V extends T>(
  // https://stackoverflow.com/questions/60898079/typescript-type-t-or-function-t-usage
  value: T extends any ? T | ((renderProps: U) => V) : never,
  wrap: (prevValue: T, renderProps: U) => V
): (renderProps: U) => V {
  return renderProps => wrap(typeof value === 'function' ? value(renderProps) : value, renderProps);
}

export type WithRef<T, E> = T & {ref?: ForwardedRef<E>};
export interface SlotProps {
  /**
   * A slot name for the component. Slots allow the component to receive props from a parent
   * component. An explicit `null` value indicates that the local props completely override all
   * props received from a parent.
   */
  slot?: string | null;
}

export function useSlottedContext<T>(
  context: Context<SlottedContextValue<T>>,
  slot?: string | null | Accessor<string | null | undefined>
): T | null | undefined {
  let ctx = useContext(context);
  // Capture the provider in setup, but keep a live slot at its consumers'
  // tracking boundary. Native merge forwards the selected bag without taking
  // an eager snapshot of its properties or constructing provider children.
  if (typeof slot === 'function') {
    return merge(() => selectSlot(ctx, slot()) ?? {}) as T;
  }
  return selectSlot(ctx, slot);
}

function selectSlot<T>(ctx: SlottedContextValue<T>, slot?: string | null): T | null | undefined {
  if (slot === null) {
    // An explicit `null` slot means don't use context.
    return null;
  }
  if (ctx && typeof ctx === 'object' && 'slots' in ctx && ctx.slots) {
    let slotKey = slot || DEFAULT_SLOT;
    if (!ctx.slots[slotKey]) {
      let availableSlots = new Intl.ListFormat().format(Object.keys(ctx.slots).map(p => `"${p}"`));
      let errorMessage = slot ? `Invalid slot "${slot}".` : 'A slot prop is required.';

      throw new Error(`${errorMessage} Valid slot names are ${availableSlots}.`);
    }
    return ctx.slots[slotKey];
  }
  // @ts-ignore
  return ctx;
}

export function useContextProps<T, U extends SlotProps, E extends Element>(
  props: T & SlotProps,
  ref: ForwardedRef<E> | undefined,
  context: Context<ContextValue<U, E>> | Context<ContextValue<U, E> | Accessor<ContextValue<U, E>>>
): [T, ObjectRef<E>] {
  // Capture the provider identity in setup, but select its live slot only when
  // a consumer reads a property. Do not resolve children while enumerating.
  // Context lookup captures a capability once; native accessor providers
  // resolve their actual nullable value only in the consumer's tracked reads.
  let provider = useContext<ContextValue<U, E> | Accessor<ContextValue<U, E>>>(context as Context<ContextValue<U, E> | Accessor<ContextValue<U, E>>>);
  let readProvider = () => typeof provider === 'function' ? provider() : provider;
  // Selecting a context slot depends on this scalar, not every change to a
  // native spread's source bag. Keep real slot transitions live without making
  // consumers of unrelated context properties subscribe to that whole bag.
  // RC13 descriptor classification can read a memo-backed spread's key table.
  // Its static/dynamic classification is setup metadata, not a slot-value read.
  let slot = untrack(() => isStatic(props, 'slot')) ? () => props.slot : createMemo(() => props.slot);
  let selected = () => {
    let value = readProvider();
    return value == null ? {} : selectSlot(value, slot()) || {};
  };
  let contextProps = new Proxy({} as any, {
    ownKeys: () => Reflect.ownKeys(selected()).filter(key => key !== 'ref' && key !== $PROXY),
    has: (_, key) => key !== 'ref' && key !== $PROXY && key in selected(),
    getOwnPropertyDescriptor: (_, key) => key !== 'ref' && key !== $PROXY && key in selected()
      ? {enumerable: true, configurable: true} : undefined,
    get: (_, key) => key === 'ref' || key === $PROXY ? undefined : (selected() as any)[key]
  });
  let deliveredContextRef: ForwardedRef<E> | undefined;
  let detachContextRef: (() => void) | undefined;
  let mergedRef = useObjectRef<E>(node => {
    deliveredContextRef = (selected() as any).ref;
    let detachRef = attachRef(ref as any, node);
    detachContextRef = attachRef(deliveredContextRef as any, node);
    return () => { detachRef(); detachContextRef?.(); detachContextRef = undefined; };
  });
  createEffect(() => (selected() as any).ref as ForwardedRef<E> | undefined, contextRef => {
    let node = untrack(() => mergedRef.current);
    if (node && contextRef !== deliveredContextRef) {
      detachContextRef?.();
      deliveredContextRef = contextRef;
      detachContextRef = attachRef(contextRef as any, node);
    }
  });
  let combinedProps = mergeProps(contextProps, props);
  // Ordinary properties use the last defined value. Resolve that winner before
  // reading a context fallback: reading an unused provider can otherwise make
  // an authored children getter depend on unrelated provider updates. The
  // source's composed handlers, class names and IDs still read both sources.
  let nativeMergedProps = new Proxy(combinedProps, {
    get(target, key) {
      if (typeof key !== 'string' || key === 'id' || key === 'className' || key === 'UNSAFE_className' || /^on[A-Z]/.test(key)) {
        return Reflect.get(target, key);
      }
      let local = Reflect.get(props, key);
      return local === undefined ? Reflect.get(contextProps, key) : local;
    },
    has(target, key) {
      return typeof key === 'string'
        ? Reflect.has(props, key) || Reflect.has(contextProps, key)
        : Reflect.has(target, key);
    },
    getOwnPropertyDescriptor(target, key) {
      let present = typeof key === 'string'
        ? Reflect.has(props, key) || Reflect.has(contextProps, key)
        : Reflect.has(target, key);
      return present ? {enumerable: true, configurable: true, get: () => Reflect.get(nativeMergedProps, key)} : undefined;
    }
  });
  let mergedProps = nativeMergedProps as unknown as T;
  let styleOverride: any = {get style() {
    let contextStyleValue = contextProps.style;
    let localStyle = (props as any).style;
    if (!contextStyleValue || !localStyle) return localStyle === undefined ? contextStyleValue : localStyle;
    if (typeof contextStyleValue === 'function' || typeof localStyle === 'function') {
      return (renderProps: any) => {
        let contextStyle = typeof contextStyleValue === 'function' ? contextStyleValue(renderProps) : contextStyleValue;
        let defaultStyle = {...renderProps.defaultStyle, ...contextStyle};
        let style = typeof localStyle === 'function' ? localStyle({...renderProps, defaultStyle}) : localStyle;
        return {...defaultStyle, ...style};
      };
    } else {
      return {...contextStyleValue, ...localStyle};
    }
  }};
  // Keep reactive key presence in the Adobe merge view. Native merge classifies
  // this unmarked proxy's keys as static and can miss props added after setup.
  let finalProps = mergeProps(mergedProps, styleOverride);
  return [finalProps, mergedRef];
}

export function useSlot(
  initialState: boolean | (() => boolean) = true
): [RefCallback<Element>, Accessor<boolean>] {
  // Initial state is typically based on the parent having an aria-label or aria-labelledby.
  // If it does, this value should be false so that we don't update the state and cause a rerender when we go through the layoutEffect
  // Source useState evaluates this initializer once. Slot registration, not
  // subsequent changes to the initializer's props, owns the value thereafter.
  let [hasSlot, setHasSlot] = createSignal(typeof initialState === 'function' ? untrack(initialState) : initialState);
  let hasRun = false;
  let registration: {element: Element} | undefined;

  // A callback ref which will run when the slotted element mounts.
  // This should happen before the useLayoutEffect below.
  let ref = (el: Element) => {
    hasRun = true;
    let attached = el ? {element: el} : undefined;
    registration = attached;
    setHasSlot(!!el);
    // The attachment bridge owns this teardown. A replacement can attach before
    // the previous owner's cleanup runs, so that cleanup must not unregister it.
    return () => {
      if (registration === attached) {
        registration = undefined;
        setHasSlot(false);
      }
    };
  };

  // If the callback hasn't been called, then reset to false.
  onSettled(() => {
    if (!hasRun) {
      setHasSlot(false);
    }
  });

  return [ref, hasSlot];
}

/**
 * Filters out `data-*` attributes to keep them from being passed down and duplicated.
 *
 * @param props
 */
export function removeDataAttributes<T>(props: T): T {
  return omit(props as Record<PropertyKey, unknown>, key => key === $PROXY || typeof key === 'string' && key.startsWith('data-')) as T;
}

// Override base type to change the default.
export interface RACValidation {
  /**
   * Whether to use native HTML form validation to prevent form submission
   * when the value is missing or invalid, or mark the field as required
   * or invalid via ARIA.
   *
   * @default 'native'
   */
  validationBehavior?: 'native' | 'aria';
}

export type DOMRenderFunction<E extends keyof JSX.IntrinsicElements, T> = (
  props: JSX.IntrinsicElements[E],
  renderProps: T
) => ReactElement;
export interface DOMRenderProps<E extends keyof JSX.IntrinsicElements, T> {
  /**
   * Overrides the default DOM element with a custom render function.
   * This allows rendering existing components with built-in styles and behaviors
   * such as router links, animation libraries, and pre-styled components.
   *
   * Requirements:
   *
   * - You must render the expected element type (e.g. if `<button>` is expected, you cannot render an
   *   `<a>`).
   * - Only a single root DOM element can be rendered (no fragments).
   * - You must pass through props and ref to the underlying DOM element, merging with your own prop
   *   as appropriate.
   */
  render?: DOMRenderFunction<E, T>;
}

// Makes `href` required in AnchorHTMLAttributes
type LinkWithRequiredHref = Required<Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

// Same as DOMRenderProps but specific for the case where the element could be a 'a' or 'div' element.
export interface PossibleLinkDOMRenderProps<Fallback extends keyof JSX.IntrinsicElements, T> {
  /**
   * Overrides the default DOM element with a custom render function.
   * This allows rendering existing components with built-in styles and behaviors
   * such as router links, animation libraries, and pre-styled components.
   *
   * Note: You can check if `'href' in props` in order to tell whether to render an `<a>` element.
   *
   * Requirements:
   *
   * - You must render the expected element type (e.g. if `<a>` is expected, you cannot render a
   *   `<button>`).
   * - Only a single root DOM element can be rendered (no fragments).
   * - You must pass through props and ref to the underlying DOM element, merging with your own prop
   *   as appropriate.
   */
  render?: (
    props:
      | DetailedHTMLProps<LinkWithRequiredHref, HTMLAnchorElement>
      | JSX.IntrinsicElements[Fallback],
    renderProps: T
  ) => ReactElement;
}

function DOMElement(
  ElementType: string,
  props: DOMRenderProps<any, any> & AllHTMLAttributes<HTMLElement>,
  forwardedRef: ForwardedRef<HTMLElement>
) {
  let deliveredRef: ForwardedRef<HTMLElement>;
  let ref = useObjectRef<HTMLElement>(node => {
    // Native attachment is synchronous: source slot refs must run before onSettled.
    // A's attachment bridge owns this callback's cleanup and isolates its reads.
    deliveredRef = props.ref;
    return attachRef([forwardedRef as any, deliveredRef as any], node);
  });
  createEffect(() => props.ref, targetRef => {
    let node = untrack(() => ref.current);
    if (node && targetRef !== deliveredRef) {
      ref(null);
      ref(node);
    }
  });
  // RC13 supports native listener options through addEventListener, not *Capture JSX props.
  createEffect(() => ({node: ref.current, captures: Object.keys(props).filter(key => /^on[A-Z].*Capture$/.test(key)).map(key => [key, (props as any)[key]] as const)}), ({node, captures}) => {
    if (!node) return;
    let cleanups = captures.map(([key, handler]) => {
      if (!handler) return () => {};
      let eventName = key.slice(2, -7).toLowerCase();
      const listener = (event: Event) => {
        if (Array.isArray(handler)) handler[0](handler[1], event);
        else handler(event);
      };
      node.addEventListener(eventName, listener, true);
      return () => node.removeEventListener(eventName, listener, true);
    });
    return () => { for (let cleanup of cleanups) cleanup(); };
  });

  onSettled(() => {
    // One-time custom-host conformance observation after attachment.
    let element = untrack(() => ref.current);
    if (process.env.NODE_ENV !== 'production' && untrack(() => props.render)) {
      if (!element) {
        console.warn(
          'Ref was not connected to DOM element returned by custom `render` function. Did you forget to pass through or merge the `ref`?'
        );
      } else if (element.localName !== ElementType) {
        console.warn(
          `Unexpected DOM element returned by custom \`render\` function. Expected <${ElementType}>, got <${element.localName}>. This may break the component behavior and accessibility.`
        );
      }
    }
  });

  let nativeProps = merge(omit(props as DOMRenderProps<any, any> & AllHTMLAttributes<HTMLElement> & {htmlFor?: string}, key => key === 'render' || key === 'ref' || key === 'className' || key === 'htmlFor' || /^on[A-Z].*Capture$/.test(String(key))), {
    ref, get class() { return props.className; },
    get for() { return (props as any).htmlFor ?? (props as any).for; }
  });
  // ARIA and data attributes serialize booleans as text rather than HTML
  // presence attributes. Preserve that source contract on native Solid hosts.
  let domProps = new Proxy(nativeProps, {
    get(target, key) {
      // Do not let native merge flatten past the serialization boundary.
      if (key === $PROXY) return undefined;
      let value = Reflect.get(target, key);
      return typeof key === 'string' && (key.startsWith('data-') || key.startsWith('aria-')) && typeof value === 'boolean'
        ? String(value) : value;
    },
    has: (target, key) => key !== $PROXY && Reflect.has(target, key)
  });
  // A native spread reapplies value when unrelated ARIA/focus props change.
  // Keep text-control projection independent so an unchanged value does not
  // disturb the browser's selection (or user-event's tracked selection).
  let projectsValue = () => !isServer && !props.render && (ElementType === 'input' || ElementType === 'textarea');
  let textControlProps = props as typeof props & {value?: string | number | readonly string[] | null};
  createEffect(() => ({node: ref.current, value: projectsValue() ? textControlProps.value : undefined}), ({node, value}) => {
    if (node && value !== undefined && (node as HTMLInputElement).value !== String(value ?? '')) {
      (node as HTMLInputElement).value = String(value ?? '');
    }
  });
  let hostProps = omit(merge(() => domProps), key => String(key) === 'value' && projectsValue());
  const CustomRender = (hostProps: typeof domProps) => props.render!(hostProps, undefined);
  // A host is constructed once in component setup. RC13's dynamic string
  // branch calls spread inside its selection memo, which otherwise makes live
  // attribute reads dependencies of DOM construction and replaces the host.
  const NativeHost = dynamic(() => ElementType, {static: true});
  const Host = dynamic(() => props.render ? CustomRender : NativeHost);
  return <Host {...hostProps} />;
}

type DOMComponents = {
  [E in keyof JSX.IntrinsicElements]: (
    props: DOMRenderProps<E, any> & JSX.IntrinsicElements[E] & {className?: string}
  ) => ReactElement;
};

const domComponentCache: Record<string, (props: AllHTMLAttributes<HTMLElement>) => JSX.Element> = {};

// Dynamically generates and caches components for each DOM element (e.g. `dom.button`).
export const dom = new Proxy(
  {},
  {
    get(target, elementType) {
      if (typeof elementType !== 'string') {
        return undefined;
      }

      let res = domComponentCache[elementType];
      if (!res) {
        res = props => DOMElement(elementType, props, undefined);
        domComponentCache[elementType] = res;
      }

      return res;
    }
  }
) as DOMComponents;
