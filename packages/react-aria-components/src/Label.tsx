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
import {createContext, merge, omit} from 'solid-js';
import {dynamic} from '@solidjs/web';
import type {Ref as ForwardedRef} from 'solid-js';
import type {JSX} from '@solidjs/web';
type LabelHTMLAttributes<T> = JSX.LabelHTMLAttributes<T>;

export interface LabelProps
  extends Omit<LabelHTMLAttributes<HTMLLabelElement>, 'slot'>, SlotProps, DOMRenderProps<'label', undefined> {
  elementType?: keyof JSX.IntrinsicElements;
}

export const LabelContext = createContext<ContextValue<LabelProps, HTMLLabelElement>>({});

export const Label = /*#__PURE__*/ createHideableComponent(function Label(
  props: LabelProps,
  ref: ForwardedRef<HTMLLabelElement>
) {
  [props, ref] = useContextProps(props, ref, LabelContext);
  let labelProps = omit(props, 'elementType');
  let ElementType = dynamic(() => dom[props.elementType ?? 'label']);
  // Forward the attachment callback as a value. An authored JSX ref callback
  // is compiled through applyRef, whose return value does not carry our
  // replacement-aware teardown back to the DOM attachment bridge.
  let domProps = merge({className: 'react-aria-Label'}, labelProps, {ref});
  // @ts-ignore
  return <ElementType {...domProps} />;
});
