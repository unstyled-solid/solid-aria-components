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

import {classNames} from '../utils/classNames';

import {DOMProps, FlexStyleProps} from '@react-types/shared';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {
  passthroughStyle,
  responsiveDimensionValue,
  StyleHandlers,
  useStyleProps
} from '../utils/styleProps';
import {merge, omit} from 'solid-js';
import type {JSX} from '@solidjs/web';
import styles from './flex-gap.css';
import {useBreakpoint} from '../utils/BreakpointProvider';
import {useDOMRef, type DOMRef} from '../utils/useDOMRef';

export interface FlexProps extends DOMProps, FlexStyleProps {
  /** Children of the flex container. */
  children: JSX.Element;
}

const flexStyleProps: StyleHandlers = {
  direction: ['flex-direction', passthroughStyle],
  wrap: ['flex-wrap', flexWrapValue],
  justifyContent: ['justify-content', flexAlignValue],
  alignItems: ['align-items', flexAlignValue],
  alignContent: ['align-content', flexAlignValue]
};

/**
 * A layout container using flexbox. Provides Spectrum dimension values, and supports the gap
 * property to define consistent spacing between items.
 */
export function Flex(props: FlexProps & {ref?: DOMRef<HTMLDivElement>}) {
  let otherProps = omit(props, 'children', 'ref');
  let breakpointProvider = useBreakpoint();
  let matchedBreakpoints = () => breakpointProvider?.matchedBreakpoints || ['base'];
  let {styleProps} = useStyleProps(otherProps);
  let {styleProps: flexStyle} = useStyleProps(otherProps, flexStyleProps);
  let domRef = useDOMRef(props.ref);

  let style = merge(() => styleProps.style as JSX.CSSProperties, () => flexStyle.style as JSX.CSSProperties,
    () => props.gap != null ? {gap: responsiveDimensionValue(props.gap, matchedBreakpoints())} : {},
    () => props.columnGap != null ? {'column-gap': responsiveDimensionValue(props.columnGap, matchedBreakpoints())} : {},
    () => props.rowGap != null ? {'row-gap': responsiveDimensionValue(props.rowGap, matchedBreakpoints())} : {});

  return (
    <div
      {...filterDOMProps(otherProps)}
      class={classNames(styles, 'flex', styleProps.class as string | undefined)}
      style={style}
      ref={domRef}>
      {props.children}
    </div>
  );
}

/**
 * Normalize 'start' and 'end' alignment values to 'flex-start' and 'flex-end'
 * in flex containers for browser compatibility.
 */
function flexAlignValue(value: string) {
  if (value === 'start') {
    return 'flex-start';
  }

  if (value === 'end') {
    return 'flex-end';
  }

  return value;
}

/**
 * Takes a boolean and translates it to flex wrap or nowrap.
 */
function flexWrapValue(value: string | boolean) {
  if (typeof value === 'boolean') {
    return value ? 'wrap' : 'nowrap';
  }

  return value;
}
