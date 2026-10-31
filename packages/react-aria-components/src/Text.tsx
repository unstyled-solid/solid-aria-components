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
import {ContextValue, dom, DOMRenderProps, SlotProps, useContextProps} from './utils';
import {createHideableComponent} from 'react-aria/private/collections/Hidden';
import {createContext, omit, type Ref as ForwardedRef} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {dynamic} from '@solidjs/web';
type HTMLAttributes<T> = JSX.HTMLAttributes<T>;

export interface TextProps extends Omit<HTMLAttributes<HTMLElement>, 'slot'>, SlotProps, DOMRenderProps<any, any> {
  elementType?: keyof JSX.IntrinsicElements;
}

export const TextContext = createContext<ContextValue<TextProps, HTMLElement>>({});

export const Text = /*#__PURE__*/ createHideableComponent(function Text(
  props: TextProps,
  ref: ForwardedRef<HTMLElement>
) {
  [props, ref] = useContextProps(props, ref, TextContext);

  let domProps = omit(props, 'elementType');
  let ElementType = dynamic(() => dom[props.elementType ?? 'span']);
  // @ts-ignore
  return <ElementType className="react-aria-Text" {...domProps} ref={ref} />;
});
