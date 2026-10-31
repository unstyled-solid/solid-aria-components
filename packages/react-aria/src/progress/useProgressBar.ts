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

import {AriaLabelingProps, DOMAttributes, DOMProps} from '@react-types/shared';
import {clamp} from 'react-stately/private/utils/number';
import {filterDOMProps} from '../utils/filterDOMProps';
import {mergeProps} from '../utils/mergeProps';
import type {Element as ReactNode} from 'solid-js';
import {useLabel} from '../label/useLabel';
import {useNumberFormatter} from '../i18n/useNumberFormatter';
import {merge} from 'solid-js';

export interface ProgressBarBaseProps {
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
  /** The content to display as the label. */
  label?: ReactNode;
  /**
   * The display format of the value label.
   *
   * @default { style: 'percent' }
   */
  formatOptions?: Intl.NumberFormatOptions;
  /** The content to display as the value's label (e.g. 1 of 4). */
  valueLabel?: ReactNode;
}

export interface AriaProgressBarBaseProps
  extends ProgressBarBaseProps, DOMProps, AriaLabelingProps {}

export interface ProgressBarProps extends ProgressBarBaseProps {
  /**
   * Whether presentation is indeterminate when progress isn't known.
   */
  isIndeterminate?: boolean;
}

export interface AriaProgressBarProps extends ProgressBarProps, DOMProps, AriaLabelingProps {}

export interface ProgressBarAria {
  /** Props for the progress bar container element. */
  progressBarProps: DOMAttributes;
  /** Props for the progress bar's visual label element (if any). */
  labelProps: ReturnType<typeof useLabel>['labelProps'];
}

/**
 * Provides the accessibility implementation for a progress bar component.
 * Progress bars show either determinate or indeterminate progress of an operation
 * over time.
 */
export function useProgressBar(props: AriaProgressBarProps): ProgressBarAria {
  const minValue = () => props.minValue ?? 0;
  const maxValue = () => props.maxValue ?? 100;
  const formatOptions = () => props.formatOptions ?? {style: 'percent' as const};

  let domProps = filterDOMProps(props, {labelable: true});
  let {labelProps, fieldProps} = useLabel(merge(props, {
    // Progress bar is not an HTML input element so it
    // shouldn't be labeled by a <label> element.
    labelElementType: 'span'
  }));

  let value = () => clamp(props.value ?? 0, minValue(), maxValue());
  let range = () => maxValue() - minValue();
  let percentage = () => range() === 0 ? 0 : (value() - minValue()) / range();
  let formatter = useNumberFormatter(formatOptions);
  let valueLabel = () => props.valueLabel || formatter().format(formatOptions().style === 'percent' ? percentage() : value());

  return {
    progressBarProps: mergeProps(domProps, {
      get id() { return fieldProps.id; },
      get 'aria-label'() { return fieldProps['aria-label']; },
      get 'aria-labelledby'() { return fieldProps['aria-labelledby']; },
      get 'aria-valuenow'() { return props.isIndeterminate ? undefined : value(); },
      get 'aria-valuemin'() { return minValue(); },
      get 'aria-valuemax'() { return maxValue(); },
      get 'aria-valuetext'() { return props.isIndeterminate ? undefined : valueLabel() as string; },
      role: 'progressbar' as const
    }),
    labelProps
  };
}
