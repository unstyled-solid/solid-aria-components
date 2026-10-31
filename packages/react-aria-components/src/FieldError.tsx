/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {ClassNameOrFunction, RenderProps, useRenderProps} from './utils';
import {DOMProps, GlobalDOMAttributes, ValidationResult} from '@react-types/shared';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {createContext, createMemo, merge, omit, Show, useContext, type Ref} from 'solid-js';
import {Text} from './Text';
import type {JSX} from '@solidjs/web';

export const FieldErrorContext = createContext<ValidationResult | null>(null);

export interface FieldErrorRenderProps extends ValidationResult {}
export interface FieldErrorProps
  extends RenderProps<FieldErrorRenderProps>, DOMProps, GlobalDOMAttributes<HTMLElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-FieldError'
   */
  className?: ClassNameOrFunction<FieldErrorRenderProps>;
  /**
   * The HTML element type to render. Defaults to `'span'`.
   * Set to `'div'` when using block-level children (e.g. `<ul>`) to avoid invalid HTML.
   *
   * @default 'span'
   */
  elementType?: keyof JSX.IntrinsicElements;
}

/**
 * A FieldError displays validation errors for a form field.
 */
export function FieldError(props: FieldErrorProps & {ref?: Ref<HTMLElement>}) {
  let validation = useContext(FieldErrorContext);
  return <>{validation?.isInvalid ? <FieldErrorInner {...props} /> : null}</>;
}

function FieldErrorInner(props: FieldErrorProps & {ref?: Ref<HTMLElement>}) {
  let validation = useContext(FieldErrorContext)!;
  let restProps = omit(props, 'elementType');
  let domProps = filterDOMProps(restProps, {global: true})!;
  let defaultChildren = () => validation.validationErrors.length === 0
    ? undefined
    : validation.validationErrors.join(' ');
  let values = merge(validation, {get defaultChildren() { return defaultChildren(); }});
  // This component's source policy depends on the resolved content being
  // nullish, not on the existence of a native render wrapper. Evaluate the
  // callback in a tracking scope so conditional validation reads stay live.
  let children = createMemo(() => {
    let value = props.children;
    return (typeof value === 'function' ? value(values) : value) ?? defaultChildren();
  });
  let renderProps = useRenderProps(merge(omit(restProps, 'children'), {
    defaultClassName: 'react-aria-FieldError',
    get defaultChildren() { return defaultChildren(); },
    values: validation
  }));

  return (
    <Show when={children() != null}>{_present =>
      <Text slot="errorMessage" elementType={props.elementType} {...domProps} {...omit(renderProps, 'children')} ref={props.ref}>
        {children()}
      </Text>
    }</Show>
  );
}
