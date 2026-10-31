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

import {AriaLabelingProps, DOMProps, StyleProps} from '@react-types/shared';
import {clamp} from 'react-stately/private/utils/number';
import {classNames} from '../utils/classNames';
import {createEffect, createMemo, merge, omit, untrack} from 'solid-js';
import type {JSX} from '@solidjs/web';
import styles from '@adobe/spectrum-css-temp/components/circleloader/vars.css';
import {useDOMRef, type DOMRef} from '../utils/useDOMRef';
import {useProgressBar} from 'react-aria/useProgressBar';
import {useStyleProps} from '../utils/styleProps';

export interface ProgressCircleProps {
  /**
   * The current value (controlled).
   *
   * @default 0
   */
  value?: number;
  /**
   * The smallest value allowed for the input.
   *
   * @default 0
   */
  minValue?: number;
  /**
   * The largest value allowed for the input.
   *
   * @default 100
   */
  maxValue?: number;
  /**
   * Whether presentation is indeterminate when progress isn't known.
   */
  isIndeterminate?: boolean;
}

export interface AriaProgressCircleProps extends ProgressCircleProps, DOMProps, AriaLabelingProps {}
export interface SpectrumProgressCircleProps extends AriaProgressCircleProps, StyleProps {
  /**
   * What the ProgressCircle's diameter should be.
   *
   * @default 'M'
   */
  size?: 'S' | 'M' | 'L';
  /** The static color style to apply. Useful when the button appears over a color background. */
  staticColor?: 'white' | 'black';
  /**
   * The [visual style](https://spectrum.adobe.com/page/progress-circle/#Over-background-variant) of
   * the ProgressCircle.
   *
   * @deprecated - use staticColor instead.
   */
  variant?: 'overBackground';
  ref?: DOMRef<HTMLDivElement>;
}

/**
 * ProgressCircles show the progression of a system operation such as downloading, uploading, or
 * processing, in a visual way. They can represent determinate or indeterminate progress.
 */
export function ProgressCircle(props: SpectrumProgressCircleProps) {
  let minValue = () => props.minValue ?? 0;
  let maxValue = () => props.maxValue ?? 100;
  let value = () => clamp(props.value ?? 0, minValue(), maxValue());
  let otherProps = omit(props, 'value', 'minValue', 'maxValue', 'size', 'staticColor', 'variant', 'isIndeterminate', 'aria-label', 'aria-labelledby', 'ref');
  let domRef = useDOMRef(untrack(() => props.ref));
  let {styleProps} = useStyleProps(otherProps);

  let {progressBarProps} = useProgressBar(merge(props, {get value() {return value();}}));

  let masks = createMemo(() => {
    let subMask1Style: JSX.CSSProperties = {};
    let subMask2Style: JSX.CSSProperties = {};
    if (!props.isIndeterminate) {
      let range = maxValue() - minValue();
      let percentage = range === 0 ? 0 : ((value() - minValue()) / range) * 100;
      let angle;
      if (percentage > 0 && percentage <= 50) {
        angle = -180 + (percentage / 50) * 180;
        subMask1Style.transform = `rotate(${angle}deg)`;
        subMask2Style.transform = 'rotate(-180deg)';
      } else if (percentage > 50) {
        angle = -180 + ((percentage - 50) / 50) * 180;
        subMask1Style.transform = 'rotate(0deg)';
        subMask2Style.transform = `rotate(${angle}deg)`;
      }
    }
    return {subMask1Style, subMask2Style};
  });

  createEffect(() => ({ariaLabel: props['aria-label'], ariaLabelledby: props['aria-labelledby']}), ({ariaLabel, ariaLabelledby}) => {
    if (!ariaLabel && !ariaLabelledby && process.env.NODE_ENV !== 'production') {
      console.warn(
        'ProgressCircle requires an aria-label or aria-labelledby attribute for accessibility'
      );
    }
  });

  return (
    <div
      {...styleProps}
      {...progressBarProps}
      ref={domRef}
      class={classNames(
        styles,
        'spectrum-CircleLoader',
        {
          'spectrum-CircleLoader--indeterminate': props.isIndeterminate,
          'spectrum-CircleLoader--small': (props.size ?? 'M') === 'S',
          'spectrum-CircleLoader--large': (props.size ?? 'M') === 'L',
          'spectrum-CircleLoader--overBackground': props.variant === 'overBackground',
          'spectrum-CircleLoader--staticWhite': props.staticColor === 'white',
          'spectrum-CircleLoader--staticBlack': props.staticColor === 'black'
        },
        styleProps.class as string | undefined
      )}>
      <div class={classNames(styles, 'spectrum-CircleLoader-track')} />
      <div class={classNames(styles, 'spectrum-CircleLoader-fills')}>
        <div class={classNames(styles, 'spectrum-CircleLoader-fillMask1')}>
          <div
            class={classNames(styles, 'spectrum-CircleLoader-fillSubMask1')}
            data-testid="fillSubMask1"
            style={masks().subMask1Style}>
            <div class={classNames(styles, 'spectrum-CircleLoader-fill')} />
          </div>
        </div>
        <div class={classNames(styles, 'spectrum-CircleLoader-fillMask2')}>
          <div
            class={classNames(styles, 'spectrum-CircleLoader-fillSubMask2')}
            data-testid="fillSubMask2"
            style={masks().subMask2Style}>
            <div class={classNames(styles, 'spectrum-CircleLoader-fill')} />
          </div>
        </div>
      </div>
    </div>
  );
}
