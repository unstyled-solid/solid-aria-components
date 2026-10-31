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
import {createContext, omit} from 'solid-js';
import type {Ref} from 'solid-js';
import {dynamic} from '@solidjs/web';
import type {JSX} from '@solidjs/web';

export interface HeadingProps extends Omit<JSX.HTMLAttributes<HTMLHeadingElement>, 'slot'>, SlotProps, DOMRenderProps<'h1', undefined> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element.
   *
   * @default 'react-aria-Heading'
   */
  className?: string;
  /**
   * The heading level.
   *
   * @default 3
   */
  level?: number;
}

export const HeadingContext = createContext<ContextValue<HeadingProps, HTMLHeadingElement>>({});

export function Heading(inputProps: HeadingProps & {ref?: Ref<HTMLHeadingElement>}) {
  let [props, ref] = useContextProps(inputProps, inputProps.ref, HeadingContext);
  let domProps = omit(props, 'children', 'level', 'className', 'ref');
  let Element = dynamic(() => dom[`h${props.level === undefined ? 3 : props.level}` as 'h1']);

  return (
    <Element {...domProps} ref={ref} slot={props.slot ?? undefined} className={props.className ?? 'react-aria-Heading'}>
      {props.children}
    </Element>
  );
}
