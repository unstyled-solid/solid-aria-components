/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {createMemo, type Context, type Ref as ForwardedRef} from 'solid-js';
import {ContextValue, SlotProps, useSlottedContext} from 'react-aria-components/slots';
import {mergeProps} from 'react-aria/mergeProps';
import {mergeRefs} from 'react-aria/mergeRefs';
import {mergeStyles} from '../style/runtime';
import {attachRef, useObjectRef, type ObjectRef} from 'react-aria/private/utils/useObjectRef';
import type {StyleString} from '../style/types';

export function useSpectrumContextProps<T, U extends SlotProps, E>(
  props: T & SlotProps,
  ref: ForwardedRef<E>,
  context: Context<ContextValue<U, E>>
): [T, ObjectRef<E>] {
  let ctx = createMemo(() => useSlottedContext(context, props.slot) || {});
  let contextProps = new Proxy({} as U, {
    ownKeys: () => Reflect.ownKeys(ctx()).filter(key => key !== 'ref'),
    has: (_, key) => key !== 'ref' && key in ctx(),
    getOwnPropertyDescriptor: (_, key) => key !== 'ref' && key in ctx() ? {enumerable: true, configurable: true} : undefined,
    get: (_, key) => key === 'ref' ? undefined : Reflect.get(ctx(), key)
  });
  let mergedRef = useObjectRef(mergeRefs(ref, (value: E | null) => {
    let contextRef = (ctx() as U & {ref?: ForwardedRef<E>}).ref;
    return attachRef(typeof contextRef === 'function' ? contextRef as (value: E | null) => unknown : undefined, value);
  }));
  let mergedProps = mergeProps(contextProps, props) as unknown as T;

  // mergeProps does not merge `UNSAFE_style`
  let result = new Proxy(mergedProps as T & object, {
    get(target, key) {
      if (key === 'UNSAFE_style' && 'UNSAFE_style' in contextProps && contextProps.UNSAFE_style &&
        'UNSAFE_style' in props && props.UNSAFE_style) {
        return {...contextProps.UNSAFE_style as object, ...props.UNSAFE_style as object};
      }
      if (key === 'styles' && 'styles' in contextProps && contextProps.styles && 'styles' in props && props.styles) {
        return mergeStyles(contextProps.styles as StyleString, props.styles as StyleString);
      }
      return Reflect.get(target, key);
    }
  });
  return [result, mergedRef];
}
