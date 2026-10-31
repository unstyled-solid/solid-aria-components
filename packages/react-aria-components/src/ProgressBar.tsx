/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {AriaProgressBarProps, useProgressBar} from 'react-aria/useProgressBar';
import {clamp} from 'react-stately/private/utils/number';
import {
  ClassNameOrFunction,
  ContextValue,
  dom,
  RenderProps,
  SlotProps,
  useContextProps,
  useRenderProps,
  useSlot
} from './utils';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {GlobalDOMAttributes} from '@react-types/shared';
import {LabelContext} from './Label';
import {mergeProps} from 'react-aria/mergeProps';
import {useObjectRef} from 'react-aria/useObjectRef';
import {mergeRefs} from 'react-aria/mergeRefs';
import {useSyncRef} from 'react-aria/private/utils/useSyncRef';
import {createContext, merge} from 'solid-js';
import type {Ref as ForwardedRef} from 'solid-js';

export interface ProgressBarProps
  extends
    Omit<AriaProgressBarProps, 'label'>,
    RenderProps<ProgressBarRenderProps>,
    SlotProps,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-ProgressBar'
   */
  className?: ClassNameOrFunction<ProgressBarRenderProps>;
  ref?: ForwardedRef<HTMLDivElement>;
}

export interface ProgressBarRenderProps {
  /**
   * The value as a percentage between the minimum and maximum.
   */
  percentage: number | undefined;
  /**
   * A formatted version of the value.
   *
   * @selector [aria-valuetext]
   */
  valueText: string | undefined;
  /**
   * Whether the progress bar is indeterminate.
   *
   * @selector :not([aria-valuenow])
   */
  isIndeterminate: boolean;
}

export const ProgressBarContext =
  createContext<ContextValue<ProgressBarProps, HTMLDivElement>>(null);

/**
 * Progress bars show either determinate or indeterminate progress of an operation
 * over time.
 */
export function ProgressBar(props: ProgressBarProps) {
  let localRef = useObjectRef<HTMLDivElement>();
  let originalProps = props;
  useSyncRef({get ref() { return mergeRefs(originalProps.ref); }}, localRef);
  let resolved = useContextProps(props, localRef, ProgressBarContext);
  props = resolved[0];
  let ref = resolved[1];
  const minValue = () => props.minValue ?? 0;
  const maxValue = () => props.maxValue ?? 100;
  const value = () => clamp(props.value ?? 0, minValue(), maxValue());
  const isIndeterminate = () => props.isIndeterminate ?? false;

  let [labelRef, label] = useSlot(() => !props['aria-label'] && !props['aria-labelledby']);
  let {progressBarProps, labelProps} = useProgressBar(merge(props, {get label() { return label(); }}));

  let range = () => maxValue() - minValue();
  // Calculate the width of the progress bar as a percentage
  let percentage = () => isIndeterminate() ? undefined : range() === 0 ? 0 : ((value() - minValue()) / range()) * 100;

  let renderProps = useRenderProps(merge(props, {
    defaultClassName: 'react-aria-ProgressBar',
    values: {
      get percentage() { return percentage(); },
      get valueText() { return progressBarProps['aria-valuetext']; },
      get isIndeterminate() { return isIndeterminate(); }
    }
  }));

  let DOMProps = filterDOMProps(props, {global: true});
  let hostProps = mergeProps(DOMProps, renderProps, progressBarProps);
  let labelContext = merge(labelProps, {ref: labelRef, elementType: 'span' as const});

  return (
    <dom.div
      {...hostProps}
      ref={ref}
      slot={props.slot || undefined}>
      <LabelContext value={labelContext}>
        {renderProps.children}
      </LabelContext>
    </dom.div>
  );
}
