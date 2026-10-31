/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {ClearSlots, useSlotProps} from '../utils/Slots';

import {ColorVersion, DOMProps, ViewStyleProps} from '@react-types/shared';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {omit, type Component} from 'solid-js';
import {dynamic, type JSX} from '@solidjs/web';
import {useDOMRef, type DOMRef} from '../utils/useDOMRef';
import {useStyleProps, viewStyleProps} from '../utils/styleProps';

export interface ViewProps<C extends ColorVersion> extends ViewStyleProps<C>, DOMProps {
  /**
   * The element to render as the node.
   */
  elementType?: string | Component<any>;
  /**
   * Children to be displayed in the View.
   */
  children?: JSX.Element;
  ref?: DOMRef;
}

/**
 * View is a general purpose container with no specific semantics that can be used for custom
 * styling purposes. It supports Spectrum style props to ensure consistency with other Spectrum
 * components.
 */
export function View<C extends ColorVersion = 5>(props: ViewProps<C>): JSX.Element {
  props = useSlotProps(props);
  let ElementType = dynamic(() => props.elementType ?? 'div');
  let otherProps = omit(props, 'elementType', 'children', 'ref');
  let {styleProps} = useStyleProps(props, viewStyleProps);
  let domRef = useDOMRef(props.ref);

  return (
    <ElementType {...filterDOMProps(otherProps)} {...styleProps} ref={domRef}>
      <ClearSlots>{props.children}</ClearSlots>
    </ElementType>
  );
}
