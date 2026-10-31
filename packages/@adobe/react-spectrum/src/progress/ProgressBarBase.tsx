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

import {AriaProgressBarBaseProps, ProgressBarProps} from 'react-aria/useProgressBar';

import {clamp} from 'react-stately/private/utils/number';
import {classNames} from '../utils/classNames';
import {LabelPosition, StyleProps} from '@react-types/shared';
import {createEffect, merge, omit, untrack} from 'solid-js';
import type {JSX} from '@solidjs/web';
import styles from '@adobe/spectrum-css-temp/components/barloader/vars.css';
import {useDOMRef, type DOMRef} from '../utils/useDOMRef';
import {useStyleProps} from '../utils/styleProps';

export interface SpectrumProgressBarBaseProps extends AriaProgressBarBaseProps, StyleProps {
  /**
   * How thick the bar should be.
   *
   * @default 'L'
   */
  size?: 'S' | 'L';
  /**
   * The label's overall position relative to the element it is labeling.
   *
   * @default 'top'
   */
  labelPosition?: LabelPosition;
  /**
   * Whether the value's label is displayed. True by default if there's a label, false by default if
   * not.
   */
  showValueLabel?: boolean;
}

export interface SpectrumProgressBarProps extends SpectrumProgressBarBaseProps, ProgressBarProps {
  /** The static color style to apply. Useful when the button appears over a color background. */
  staticColor?: 'white' | 'black';
  /**
   * The [visual style](https://spectrum.adobe.com/page/progress-bar/#Over-background-variant) of
   * the ProgressBar.
   *
   * @deprecated - use staticColor instead.
   */
  variant?: 'overBackground';
}

interface ProgressBarBaseProps extends SpectrumProgressBarBaseProps, ProgressBarProps {
  barClassName?: string;
  // The source-owned DOM ref overrides any aria bag ref at the host.
  barProps?: Omit<JSX.HTMLAttributes<HTMLDivElement>, 'ref'>;
  labelProps?: JSX.HTMLAttributes<HTMLSpanElement>;
}

// Base ProgressBar component shared with Meter.
export function ProgressBarBase(props: ProgressBarBaseProps & {ref?: DOMRef<HTMLDivElement>}) {
  let minValue = () => props.minValue ?? 0;
  let maxValue = () => props.maxValue ?? 100;
  let value = () => clamp(props.value ?? 0, minValue(), maxValue());
  let showValueLabel = () => props.showValueLabel ?? !!props.label;
  let otherProps = omit(props, 'value', 'minValue', 'maxValue', 'size', 'label', 'barClassName', 'showValueLabel', 'labelPosition', 'isIndeterminate', 'barProps', 'labelProps', 'aria-label', 'aria-labelledby', 'ref');
  let domRef = useDOMRef(untrack(() => props.ref));
  let {styleProps} = useStyleProps(otherProps);

  let barStyle: JSX.CSSProperties = {
    get width() {
      if (props.isIndeterminate) return undefined;
      let range = maxValue() - minValue();
      let percentage = range === 0 ? 0 : (value() - minValue()) / range;
      return `${Math.round(percentage * 100)}%`;
    }
  };
  let style = merge({minWidth: '-moz-fit-content'}, () => styleProps.style as JSX.CSSProperties);

  // Ideally this should be in useProgressBar, but children
  // are not supported in ProgressCircle which shares that hook...
  createEffect(() => ({label: props.label, ariaLabel: props['aria-label'], ariaLabelledby: props['aria-labelledby']}), ({label, ariaLabel, ariaLabelledby}) => {
    if (!label && !ariaLabel && !ariaLabelledby && process.env.NODE_ENV !== 'production') {
      console.warn(
        'If you do not provide a visible label via children, you must specify an aria-label or aria-labelledby attribute for accessibility'
      );
    }
  });
  // use inline style for fit-content because cssnano is too smart for us and will strip out the -moz prefix in css files
  return (
    <div
      {...props.barProps}
      ref={domRef}
      class={classNames(
        styles,
        'spectrum-BarLoader',
        {
          'spectrum-BarLoader--small': (props.size ?? 'L') === 'S',
          'spectrum-BarLoader--large': (props.size ?? 'L') === 'L',
          'spectrum-BarLoader--indeterminate': props.isIndeterminate,
          'spectrum-BarLoader--sideLabel': (props.labelPosition ?? 'top') === 'side'
        },
        props.barClassName,
        styleProps.class as string | undefined
      )}
      style={style}>
      {props.label && (
        <span {...props.labelProps} class={classNames(styles, 'spectrum-BarLoader-label')}>
          {props.label}
        </span>
      )}
      {showValueLabel() && props.barProps && (
        <div class={classNames(styles, 'spectrum-BarLoader-percentage')}>
          {props.barProps['aria-valuetext']}
        </div>
      )}
      <div class={classNames(styles, 'spectrum-BarLoader-track')}>
        <div class={classNames(styles, 'spectrum-BarLoader-fill')} style={barStyle} />
      </div>
    </div>
  );
}
