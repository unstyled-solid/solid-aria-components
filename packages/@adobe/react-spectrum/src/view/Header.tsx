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

import {DOMProps, StyleProps} from '@react-types/shared';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {omit} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {useDOMRef, type DOMRef} from '../utils/useDOMRef';
import {useStyleProps} from '../utils/styleProps';

export interface HeaderProps extends DOMProps, StyleProps {
  /**
   * Header content.
   */
  children?: JSX.Element;
  ref?: DOMRef;
}

/**
 * Header represents a header within a Spectrum container.
 */
export function Header(props: HeaderProps) {
  props = useSlotProps(props, 'header');
  let otherProps = omit(props, 'children', 'ref');
  let {styleProps} = useStyleProps(otherProps);
  let domRef = useDOMRef(props.ref);

  return (
    <header {...filterDOMProps(otherProps)} {...styleProps} ref={domRef}>
      <ClearSlots>{props.children}</ClearSlots>
    </header>
  );
}
