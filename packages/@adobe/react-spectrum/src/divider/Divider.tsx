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

import {AriaLabelingProps, DOMProps, Orientation, StyleProps} from '@react-types/shared';
import {classNames} from '../utils/classNames';
import {merge, omit, untrack} from 'solid-js';
import {dynamic} from '@solidjs/web';
import styles from '@adobe/spectrum-css-temp/components/rule/vars.css';
import {useDOMRef, type DOMRef} from '../utils/useDOMRef';
import {useSeparator} from 'react-aria/useSeparator';
import {useSlotProps} from '../utils/Slots';
import {useStyleProps} from '../utils/styleProps';

export interface SpectrumDividerProps extends DOMProps, AriaLabelingProps, StyleProps {
  /**
   * How thick the Divider should be.
   *
   * @default 'L'
   */
  size?: 'S' | 'M' | 'L';

  /**
   * The axis the Divider should align with.
   *
   * @default 'horizontal'
   */
  orientation?: Orientation;

  /**
   * A slot to place the divider in.
   *
   * @default 'divider'
   */
  slot?: string;
}

let sizeMap = {
  S: 'small',
  M: 'medium',
  L: 'large'
};

/**
 * Dividers bring clarity to a layout by grouping and dividing content in close proximity.
 * They can also be used to establish rhythm and hierarchy.
 */
export function Divider(inputProps: SpectrumDividerProps & {ref?: DOMRef}) {
  let props = useSlotProps(inputProps, 'divider');
  let orientation = () => props.orientation ?? 'horizontal';
  let otherProps = omit(props, 'size', 'orientation', 'ref');
  let domRef = useDOMRef(untrack(() => inputProps.ref));
  let {styleProps} = useStyleProps(otherProps);
  let weight = () => sizeMap[props.size ?? 'L'];

  let elementType = () => orientation() === 'vertical' ? 'div' : 'hr';
  let Element = dynamic(elementType);

  let {separatorProps} = useSeparator(merge(props, {
    get elementType() { return elementType(); }
  }));

  return (
    <Element
      {...styleProps}
      class={classNames(
        styles,
        'spectrum-Rule',
        `spectrum-Rule--${weight()}`,
        {
          'spectrum-Rule--vertical': orientation() === 'vertical',
          'spectrum-Rule--horizontal': orientation() === 'horizontal'
        },
        otherProps.UNSAFE_className
      )}
      ref={domRef}
      {...omit(separatorProps, 'ref')}
    />
  );
}
