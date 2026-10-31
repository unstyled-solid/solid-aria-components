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

import {AriaTokenFieldProps} from 'react-aria/useTokenField';
import {
  ClassNameOrFunction,
  ContextValue,
  dom,
  Provider,
  RenderProps,
  SlotProps,
  StyleRenderProps,
  useContextProps,
  useRenderProps,
  useSlot,
  useSlottedContext
} from './utils';
import {createHideableComponent} from 'react-aria/private/collections/Hidden';
import {FieldInputContext} from './FieldInputContext';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {GlobalDOMAttributes, RefObject} from '@react-types/shared';
import {HoverProps, useHover} from 'react-aria/useHover';
import {isDocument, isShadowRoot} from 'react-aria/private/utils/domHelpers';
import {LabelContext, type LabelProps} from './Label';
import {mergeProps} from 'react-aria/mergeProps';
import {mergeRefs} from 'react-aria/mergeRefs';
import {createContext, useContext, createMemo, createEffect, For, Show, merge, omit, type Ref} from 'solid-js';
import type {JSX} from '@solidjs/web';
type HTMLAttributes<T extends HTMLElement> = JSX.HTMLAttributes<T>;
import {TextContext, type TextProps} from './Text';
import {
  TokenFieldState,
  TokenFieldValue,
  TokenSegment,
  TokenFieldSegment,
  useTokenFieldState
} from 'react-stately/useTokenFieldState';
import {useFocusRing} from 'react-aria/useFocusRing';
import {useObjectRef} from 'react-aria/useObjectRef';
import {useToken, useTokenField} from 'react-aria/useTokenField';

export interface TokenFieldRenderProps {
  /**
   * Whether the token field is disabled.
   *
   * @selector [data-disabled]
   */
  isDisabled: boolean;
  /**
   * Whether the token field is read only.
   *
   * @selector [data-readonly]
   */
  isReadOnly: boolean;
}

export interface TokenFieldProps<T extends TokenFieldValue = TokenFieldValue>
  extends
    AriaTokenFieldProps<T>,
    RenderProps<TokenFieldRenderProps>,
    SlotProps,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-TokenField'
   */
  className?: ClassNameOrFunction<TokenFieldRenderProps>;
}

export interface TokenInputRenderProps {
  /**
   * Whether the token input is currently hovered with a mouse.
   *
   * @selector [data-hovered]
   */
  isHovered: boolean;
  /**
   * Whether the token input is focused, either via a mouse or keyboard.
   *
   * @selector [data-focused]
   */
  isFocused: boolean;
  /**
   * Whether the token input is keyboard focused.
   *
   * @selector [data-focus-visible]
   */
  isFocusVisible: boolean;
  /**
   * Whether the token input is disabled.
   *
   * @selector [data-disabled]
   */
  isDisabled: boolean;
  /**
   * Whether the token input is read only.
   *
   * @selector [data-readonly]
   */
  isReadOnly: boolean;
}

export interface TokenInputProps<T extends TokenFieldValue = TokenFieldValue>
  extends
    HoverProps,
    StyleRenderProps<TokenInputRenderProps>,
    SlotProps,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * A function that renders a token for each segment in the token field.
   */
  children: (
    segment: TokenSegment<T extends TokenFieldValue<infer V> ? V : never>
  ) => JSX.Element;
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-TokenInput'
   */
  className?: ClassNameOrFunction<TokenInputRenderProps>;
}

interface TokenInputContextValue<T extends TokenFieldValue = TokenFieldValue> {
  tokenFieldProps: HTMLAttributes<HTMLDivElement>;
  state: TokenFieldState<T>;
  isDisabled: boolean;
  isReadOnly: boolean;
  autocompleteProps?: HTMLAttributes<HTMLDivElement>;
  ref: RefObject<HTMLDivElement | null>;
}

export const TokenFieldContext = createContext<ContextValue<TokenFieldProps, HTMLDivElement>>(null);
const TokenInputContext = createContext<TokenInputContextValue | null>(null);

/**
 * A token field allows users to enter text with inline tokens. Use it to build AI prompt fields,
 * tag inputs, structured search fields, mention inputs, and multi-select comboboxes.
 */
export const TokenField = /*#__PURE__*/ createHideableComponent(function TokenField<
  T extends TokenFieldValue = TokenFieldValue
>(props: TokenFieldProps<T> & {ref?: Ref<HTMLDivElement>}, ref?: Ref<HTMLDivElement>) {
  [props, ref] = useContextProps(props, ref, TokenFieldContext);
  let [labelRef, label] = useSlot(() => !props['aria-label'] && !props['aria-labelledby']);

  let fieldCtx = useSlottedContext(FieldInputContext, () => props.slot);
  let autocompleteProps = omit(fieldCtx ?? {}, 'value', 'onChange', 'ref') as HTMLAttributes<HTMLDivElement>;
  let inputRef = useObjectRef<HTMLDivElement | null>((element: HTMLDivElement | null) => {
    let contextRef = fieldCtx?.ref;
    if (contextRef) { mergeRefs(contextRef)(element); }
  });

  let isDisabled = () => props.isDisabled || false;
  let isReadOnly = () => props.isReadOnly || false;

  let state = useTokenFieldState<T>(merge(props, {
    onChange: (value: T) => {
      props.onChange?.(value);
      fieldCtx?.onChange?.(value.toString());
    }
  }));

  let {tokenFieldProps, labelProps, descriptionProps} = useTokenField(
    merge(props, {
      // @ts-ignore - not a public prop, used to determine if slot is present
      get label() { return label(); },
      get role() { return (props.role || autocompleteProps['role'] || 'textbox') as AriaTokenFieldProps<T>['role']; }
    }),
    state,
    inputRef
  );

  let renderProps = useRenderProps(merge(props, {
    values: {
      get isDisabled() { return isDisabled(); },
      get isReadOnly() { return isReadOnly(); }
    },
    defaultClassName: 'react-aria-TokenField'
  }));

  let DOMProps = filterDOMProps(props, {global: true});

  return (
    <dom.div
      {...DOMProps}
      {...renderProps}
      ref={ref}
      slot={props.slot || undefined}
       data-disabled={isDisabled() ? 'true' : undefined}
       data-readonly={isReadOnly() ? 'true' : undefined}>
      <Provider
        values={[
          [LabelContext, merge(labelProps as LabelProps, {elementType: 'span' as const, ref: labelRef})],
          [
            TextContext,
            {
              slots: {
                description: descriptionProps as TextProps
              }
            }
          ],
          [
            TokenInputContext,
            {
              tokenFieldProps: tokenFieldProps as HTMLAttributes<HTMLDivElement>,
              state: state as any,
               get isDisabled() { return isDisabled(); },
               get isReadOnly() { return isReadOnly(); },
              autocompleteProps: autocompleteProps as HTMLAttributes<HTMLDivElement>,
              ref: inputRef as RefObject<HTMLDivElement | null>
            }
          ]
        ]}>
        {renderProps.children}
      </Provider>
    </dom.div>
  );
});

/**
 * A token input represents the editable area within a token field.
 */
export function TokenInput<
  T extends TokenFieldValue = TokenFieldValue
>(props: TokenInputProps<T> & {ref?: Ref<HTMLDivElement>}) {
  let context = useContext(TokenInputContext)!;
  let {state, tokenFieldProps, autocompleteProps} = context;
  let ref = mergeRefs(context.ref, props.ref);
  let domProps = omit(props, 'children');

  let {isHovered, hoverProps} = useHover(domProps);
  let {isFocused, isFocusVisible, focusProps} = useFocusRing();

  let renderProps = useRenderProps(merge(domProps, {
    defaultClassName: 'react-aria-TokenInput',
    values: {
      get isHovered() { return isHovered(); },
      get isFocused() { return isFocused(); },
      get isFocusVisible() { return isFocusVisible(); },
      get isDisabled() { return context.isDisabled; },
      get isReadOnly() { return context.isReadOnly; }
    }
  }));

  let DOMProps = filterDOMProps(domProps, {global: true});
  let objectRef = useObjectRef(ref);
  createEffect(() => objectRef.current, element => insertSelectionStyle({current: element}));
  // Hold the editable model during composition. Browser-owned text nodes stay
  // mounted; ending composition publishes the latest accepted model.
  let renderedSegments = createMemo<readonly TokenFieldSegment[]>(previous =>
    state.isComposing && previous ? previous : state.value.segments,
    {name: 'TokenInput.renderedSegments'});

  return (
    <dom.div
      {...mergeProps(
        DOMProps,
        renderProps,
        focusProps,
        hoverProps,
        tokenFieldProps,
        autocompleteProps
      )}
      ref={objectRef}
       data-focused={isFocused() ? 'true' : undefined}
       data-focus-visible={isFocusVisible() ? 'true' : undefined}
       data-disabled={context.isDisabled ? 'true' : undefined}
       data-readonly={context.isReadOnly ? 'true' : undefined}
       style={mergeProps(renderProps, tokenFieldProps).style}>
        <For each={renderedSegments()} keyed={false}>{segment =>
          <Show when={segment().type === 'token'} fallback={segment().text}>
            <span data-react-aria-token>
              {'\u200b'}
              {props.children(merge(() => segment()) as TokenSegment<T extends TokenFieldValue<infer V> ? V : never>)}
              {'\u200b'}
            </span>
          </Show>
        }</For>
        {/* Force cursor to the next line if the last segment ends with a newline. */}
        {renderedSegments().at(-1)?.text.endsWith('\n') && <br />}
    </dom.div>
  );
}

export interface TokenRenderProps {
  /**
   * Whether the token is selected.
   *
   * @selector [data-selected]
   */
  isSelected: boolean;
  /**
   * Whether the token is disabled.
   *
   * @selector [data-disabled]
   */
  isDisabled: boolean;
}

export interface TokenProps
  extends RenderProps<TokenRenderProps, 'span'>, GlobalDOMAttributes<HTMLSpanElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-Token'
   */
  className?: ClassNameOrFunction<TokenRenderProps>;
}

/**
 * A token represents an inline segment within a token field.
 */
export function Token(props: TokenProps & {ref?: Ref<HTMLSpanElement>}) {
  let context = useContext(TokenInputContext)!;
  let objectRef = useObjectRef<HTMLSpanElement | null>(mergeRefs(props.ref));
  let tokenAria = useToken(props, {}, objectRef);
  let {tokenProps} = tokenAria;

  let renderProps = useRenderProps(merge(props, {
    defaultClassName: 'react-aria-Token',
    values: {
      get isSelected() { return tokenAria.isSelected; },
      get isDisabled() { return context.isDisabled; }
    }
  }));

  let DOMProps = filterDOMProps(props, {global: true});

  return (
    <dom.span
      ref={objectRef}
      {...mergeProps(DOMProps, renderProps, tokenProps)}
        data-selected={tokenAria.isSelected ? 'true' : undefined}
        data-disabled={context.isDisabled ? 'true' : undefined}
       style={mergeProps(renderProps, tokenProps).style}>
      {renderProps.children}
    </dom.span>
  );
}

// Inserts a stylesheet into the document / shadow root that hides the native text selection on tokens.
function insertSelectionStyle(ref: RefObject<HTMLDivElement | null> | null) {
  if (typeof CSSStyleSheet !== 'function' || !ref || !ref.current) {
    return;
  }

  let root = ref.current.getRootNode();
  if (!isDocument(root) && !isShadowRoot(root)) {
    return;
  }

  if (!root.adoptedStyleSheets) {
    return;
  }

  // Skip if we already inserted it.
  let sym = Symbol.for('react-aria-token-style');
  if (root.adoptedStyleSheets.some(s => (s as CSSStyleSheet & {[key: symbol]: boolean})[sym])) {
    return;
  }

  let style = new CSSStyleSheet();
  (style as CSSStyleSheet & {[key: symbol]: boolean})[sym] = true;
  // Firefox ignores completely transparent selection colors, so use a nearly transparent color instead.
  style.replaceSync(
    '[data-react-aria-token]::selection,[data-react-aria-token]>*::selection{background:#ffffff01}'
  );
  root.adoptedStyleSheets.push(style);

  return () => {
    let index = root.adoptedStyleSheets.indexOf(style);
    if (index >= 0) {
      root.adoptedStyleSheets.splice(index, 1);
    }
  };
}
