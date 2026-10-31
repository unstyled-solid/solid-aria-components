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
import {HeadingContext} from 'react-aria-components/Heading';
import {omit} from 'solid-js';
import {dynamic, type JSX} from '@solidjs/web';
import {useContextProps} from 'react-aria-components/slots';
import {useDOMRef, type DOMRef} from '../utils/useDOMRef';
import {useSlotProps} from '../utils/Slots';
import {useStyleProps} from '../utils/styleProps';

export interface HeadingProps extends DOMProps, StyleProps {
  /**
   * Heading content.
   */
  children?: JSX.Element;
  ref?: DOMRef<HTMLHeadingElement>;
  /**
   * A slot to place the heading in.
   *
   * @default 'heading'
   */
  slot?: string;
  /**
   * Sets heading level, h1 through h6.
   *
   * @default 3
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

/**
 * Heading is used to create various levels of typographic hierarchies.
 */
export function Heading(props: HeadingProps) {
  let spectrumRef = useDOMRef<HTMLHeadingElement>(props.ref);
  props = useSlotProps(props, 'heading');
  let [contextProps, domRef] = useContextProps(props, spectrumRef, HeadingContext);

  let otherProps = omit(contextProps, 'children', 'level', 'ref');
  let {styleProps} = useStyleProps(otherProps);
  let HeadingTag = dynamic(() => `h${contextProps.level ?? 3}` as 'h1');

  return (
    <HeadingTag {...filterDOMProps(otherProps)} {...styleProps} ref={domRef}>
      {contextProps.children}
    </HeadingTag>
  );
}
