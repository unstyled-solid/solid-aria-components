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
import {createContext} from 'solid-js';
import type {Ref} from 'solid-js';
import type {JSX} from '@solidjs/web';

export interface KeyboardProps
  extends Omit<JSX.HTMLAttributes<HTMLElement>, 'slot'>, SlotProps, DOMRenderProps<'kbd', undefined> {
  /** The CSS class name for the element. */
  className?: string;
}

export const KeyboardContext = createContext<ContextValue<KeyboardProps, HTMLElement>>({});

export function Keyboard(inputProps: KeyboardProps & {ref?: Ref<HTMLElement>}) {
  let [props, ref] = useContextProps(inputProps, inputProps.ref, KeyboardContext);
  return <dom.kbd dir="ltr" {...props} ref={ref} slot={props.slot ?? undefined} />;
}
