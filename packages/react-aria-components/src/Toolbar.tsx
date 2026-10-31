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

import {AriaToolbarProps, useToolbar} from 'react-aria/useToolbar';

import {
  ClassNameOrFunction,
  ContextValue,
  dom,
  RenderProps,
  SlotProps,
  useContextProps,
  useRenderProps
} from './utils';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {GlobalDOMAttributes, Orientation} from '@react-types/shared';
import {mergeProps} from 'react-aria/mergeProps';
import {createContext, merge, omit, type Ref} from 'solid-js';
import {useObjectRef, type Ref as ObjectRefInput} from 'react-aria/private/utils/useObjectRef';

export interface ToolbarRenderProps {
  /**
   * The current orientation of the toolbar.
   *
   * @selector [data-orientation]
   */
  orientation: Orientation;
}

export interface ToolbarProps
  extends
    AriaToolbarProps,
    SlotProps,
    RenderProps<ToolbarRenderProps>,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-Toolbar'
   */
  className?: ClassNameOrFunction<ToolbarRenderProps>;
  ref?: Ref<HTMLDivElement>;
}

export const ToolbarContext = createContext<ContextValue<ToolbarProps, HTMLDivElement>>({});

/**
 * A toolbar is a container for a set of interactive controls, such as buttons, dropdown menus, or
 * checkboxes, with arrow key navigation.
 */
export function Toolbar(originalProps: ToolbarProps) {
  let [props, mergedRef] = useContextProps(originalProps, originalProps.ref, ToolbarContext);
  let ref = useObjectRef<HTMLDivElement>(mergedRef as ObjectRefInput<HTMLDivElement>);
  let {toolbarProps} = useToolbar(props, ref);
  let renderProps = useRenderProps(merge(props, {
    values: {get orientation() { return props.orientation || 'horizontal'; }},
    defaultClassName: 'react-aria-Toolbar'
  }));
  let DOMProps = omit(filterDOMProps(props, {global: true}), 'id');

  return (
    <dom.div
      {...mergeProps(DOMProps, renderProps, toolbarProps)}
      ref={ref}
      slot={props.slot || undefined}
      data-orientation={props.orientation || 'horizontal'}>
      {renderProps.children}
    </dom.div>
  );
}
