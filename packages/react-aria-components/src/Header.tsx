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

import {dom, type ContextValue, type SlotProps, useContextProps, useRenderProps} from './utils';
import {createLeafComponent} from 'react-aria/CollectionBuilder';
import {HeaderNode} from 'react-aria/private/collections/BaseCollection';
import {omit, type Context, type Ref} from 'solid-js';

import {HeaderContext, type HeaderProps} from './HeaderContext';
export {HeaderContext} from './HeaderContext';
export type {HeaderProps} from './HeaderContext';
type CollectionHeaderProps = Omit<HeaderProps, 'slot'> & SlotProps;

export const Header = /*#__PURE__*/ createLeafComponent(
  HeaderNode,
  function Header(input: CollectionHeaderProps, forwardedRef: Ref<HTMLElement>) {
    let [props, ref] = useContextProps(input, forwardedRef, HeaderContext as Context<ContextValue<CollectionHeaderProps, HTMLElement>>);
    let renderProps = useRenderProps<undefined, 'header'>({
      get children() { return props.children; },
      values: undefined
    });
    return (
      <dom.header className="react-aria-Header" {...omit(props, 'ref', 'children')} ref={ref}>
        {renderProps.children}
      </dom.header>
    );
  }
);
