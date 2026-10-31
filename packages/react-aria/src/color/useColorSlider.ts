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

import {
  AriaLabelingProps,
  DOMAttributes,
  DOMProps,
  InputDOMProps,
  RefObject
} from '@react-types/shared';
import {ColorSliderProps, ColorSliderState} from 'react-stately/useColorSliderState';
import {merge, omit} from 'solid-js';
import {mergeProps} from '../utils/mergeProps';
import {useLocale} from '../i18n/I18nProvider';
import {SliderAria, useSlider} from '../slider/useSlider';
import {SliderThumbAria, useSliderThumb} from '../slider/useSliderThumb';
import {useVisuallyHidden} from '../visually-hidden/VisuallyHidden';

export interface AriaColorSliderProps
  extends ColorSliderProps, InputDOMProps, DOMProps, AriaLabelingProps {}

export interface AriaColorSliderOptions extends AriaColorSliderProps {
  /** A ref for the track element. */
  trackRef: RefObject<Element | null>;
  /** A ref for the input element. */
  inputRef: RefObject<HTMLInputElement | null>;
}

export interface ColorSliderAria {
  /** Props for the label element. */
  labelProps: SliderAria['labelProps'];
  /** Props for the track element. */
  trackProps: DOMAttributes;
  /** Props for the thumb element. */
  thumbProps: DOMAttributes;
  /** Props for the visually hidden range input element. */
  inputProps: SliderThumbAria['inputProps'];
  /** Props for the output element, displaying the value of the color slider. */
  outputProps: SliderAria['outputProps'];
}

/**
 * Provides the behavior and accessibility implementation for a color slider component.
 * Color sliders allow users to adjust an individual channel of a color value.
 */
export function useColorSlider(
  props: AriaColorSliderOptions,
  state: ColorSliderState
): ColorSliderAria {
  let trackRef = {get current() { return props.trackRef.current; }};
  let inputRef = {get current() { return props.inputRef.current; }};

  let locale = useLocale();

  // Provide a default aria-label if there is no other label provided.
  let ariaLabel = () => !props.label && !props['aria-label'] && !props['aria-labelledby']
    ? state.value.getChannelName(props.channel, locale.locale)
    : props['aria-label'];

  let {groupProps, trackProps, labelProps, outputProps} = useSlider(
    // These color-valued state/callback props are unused by the numeric aria
    // slider; the real ColorSliderState supplies its numeric thumb operations.
    merge(omit(props, 'value', 'defaultValue', 'onChange', 'onChangeEnd'), {
      get 'aria-label'() { return ariaLabel(); }
    }),
    state,
    trackRef
  );
  let {inputProps, thumbProps} = useSliderThumb(
    {
      index: 0,
      get orientation() { return props.orientation; },
      get isDisabled() { return props.isDisabled; },
      get name() { return props.name; },
      get form() { return props.form; },
      trackRef,
      inputRef
    },
    state
  );

  let generateBackground = () => {
    let value = state.getDisplayColor();
    let channel = props.channel;
    let orientation = props.orientation;
    let direction = locale.direction;
    let to: string;
    if (orientation === 'vertical') {
      to = 'top';
    } else if (direction === 'ltr') {
      to = 'right';
    } else {
      to = 'left';
    }
    switch (channel) {
      case 'hue': {
        let stops = [0, 60, 120, 180, 240, 300, 360]
          .map(hue => value.withChannelValue('hue', hue).toString('css'))
          .join(', ');
        return `linear-gradient(to ${to}, ${stops})`;
      }
      case 'lightness': {
        // We have to add an extra color stop in the middle so that the hue shows up at all.
        // Otherwise it will always just be black to white.
        let min = state.getThumbMinValue(0);
        let max = state.getThumbMaxValue(0);
        let start = value.withChannelValue(channel, min).toString('css');
        let middle = value.withChannelValue(channel, (max - min) / 2).toString('css');
        let end = value.withChannelValue(channel, max).toString('css');
        return `linear-gradient(to ${to}, ${start}, ${middle}, ${end})`;
      }
      case 'saturation':
      case 'brightness':
      case 'red':
      case 'green':
      case 'blue':
      case 'alpha': {
        let start = value.withChannelValue(channel, state.getThumbMinValue(0)).toString('css');
        let end = value.withChannelValue(channel, state.getThumbMaxValue(0)).toString('css');
        return `linear-gradient(to ${to}, ${start}, ${end})`;
      }
      default:
        throw new Error('Unknown color channel: ' + channel);
    }
  };

  let forcedColorAdjustNoneStyle = {'forced-color-adjust': 'none'} as const;
  let valueText = () => {
    let value = state.getDisplayColor();
    if (props.channel === 'hue') {
      return `${inputProps['aria-valuetext']}, ${value.getHueName(locale.locale)}`;
    } else if (props.channel !== 'alpha') {
      return `${inputProps['aria-valuetext']}, ${value.getColorName(locale.locale)}`;
    }
    return inputProps['aria-valuetext'];
  };

  let {visuallyHiddenProps} = useVisuallyHidden({
    style: {
      opacity: '0.0001',
      width: '100%',
      height: '100%',
      'pointer-events': 'none'
    }
  });

  return {
    trackProps: merge(mergeProps(groupProps, trackProps), {
      get style() { return {
        ...trackProps.style,
        ...forcedColorAdjustNoneStyle,
        background: generateBackground()
      }; }
    }),
    inputProps: merge(inputProps, {
      get 'aria-valuetext'() { return valueText(); },
      get style() {
        // Native input attributes also allow a CSS text string. The actual
        // slider hook supplies an object bag, which is the source merge here.
        let style = inputProps.style;
        return {
        ...(typeof style === 'object' ? style : undefined),
        ...visuallyHiddenProps.style
      }; }
    }),
    thumbProps: merge(thumbProps, {
      get style() { return {
        ...thumbProps.style,
        ...forcedColorAdjustNoneStyle
      }; }
    }),
    labelProps,
    outputProps
  };
}
