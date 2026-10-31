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

import {DOMProps, StyleProps} from '@react-types/shared';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {omit} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {useDOMRef, type DOMRef} from '../utils/useDOMRef';
import {useSlotProps} from '../utils/Slots';
import {useStyleProps} from '../utils/styleProps';

export interface KeyboardProps extends DOMProps, StyleProps {
  /**
   * Keyboard shortcut text.
   */
  children?: JSX.Element;
  ref?: DOMRef;
  /**
   * A slot to place the keyboard shortcut in.
   *
   * @default 'keyboard'
   */
  slot?: string;
}

/**
 * Keyboard represents text that specifies a keyboard command.
 */
export function Keyboard(props: KeyboardProps) {
  props = useSlotProps(props, 'keyboard');
  let otherProps = omit(props, 'children', 'ref');
  let {styleProps} = useStyleProps(otherProps);
  let domRef = useDOMRef(props.ref);

  return (
    <kbd {...filterDOMProps(otherProps)} {...styleProps} ref={domRef}>
      {props.children}
    </kbd>
  );
}
