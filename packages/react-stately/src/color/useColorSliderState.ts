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

import {Color, ColorChannel, ColorSpace} from './types';
import {normalizeColor, parseColor} from './Color';
import {SliderProps, SliderState, useSliderState} from '../slider/useSliderState';
import {useControlledState} from '../utils/useControlledState';
import {createMemo, merge, omit, untrack} from 'solid-js';

export interface ColorSliderProps extends Omit<
  SliderProps<string | Color>,
  'minValue' | 'maxValue' | 'step' | 'pageSize' | 'onChange' | 'onChangeEnd'
> {
  /**
   * The color space that the slider operates in. The `channel` must be in this color space.
   * If not provided, this defaults to the color space of the `color` or `defaultColor` value.
   */
  colorSpace?: ColorSpace;
  /** The color channel that the slider manipulates. */
  channel: ColorChannel;
  /** Handler that is called when the value changes, as the user drags. */
  onChange?: (value: Color) => void;
  /** Handler that is called when the user stops dragging. */
  onChangeEnd?: (value: Color) => void;
}

export interface ColorSliderState extends SliderState {
  /** The current color value represented by the color slider. */
  readonly value: Color;
  /** Sets the current color value. If a string is passed, it will be parsed to a Color. */
  setValue(value: string | Color): void;
  /**
   * Returns the color that should be displayed in the slider instead of `value` or the optional
   * parameter.
   */
  getDisplayColor(): Color;
  /** Whether the color slider is currently being dragged. */
  readonly isDragging: boolean;
}

export interface ColorSliderStateOptions extends ColorSliderProps {
  /** The locale to use for formatting the color channel value. */
  locale: string;
}

/**
 * Provides state management for a color slider component.
 * Color sliders allow users to adjust an individual channel of a color value.
 */
export function useColorSliderState(props: ColorSliderStateOptions): ColorSliderState {
  if (untrack(() => props.value == null && props.defaultValue == null)) {
    throw new Error('useColorSliderState requires a value or defaultValue');
  }

  let value = createMemo(() => props.value ? normalizeColor(props.value) : undefined);
  let defaultValue = createMemo(() => props.defaultValue ? normalizeColor(props.defaultValue) : undefined);
  // safe to cast value and defaultValue to Color, one of them will always be defined because if neither are, we throw an error
  let [colorValue, setColor] = useControlledState<Color>(
    value,
    untrack(defaultValue) as Color,
    value => props.onChange?.(value)
  );
  let color = createMemo(() => {
    let current = colorValue();
    return props.colorSpace && current ? current.toFormat(props.colorSpace) : current;
  });
  let initialValue = untrack(colorValue);
  let defaultColor = createMemo(() => {
    let current = defaultValue() ?? initialValue;
    return props.colorSpace && current ? current.toFormat(props.colorSpace) : current;
  });
  let range = createMemo(() => color().getChannelRange(props.channel));
  let numberFormatter = new Intl.NumberFormat();
  let otherProps = untrack(() => omit(props, 'channel', 'colorSpace', 'value', 'defaultValue', 'onChange', 'locale'));
  let sliderState = useSliderState(merge({
    get minValue() {return range().minValue;},
    get maxValue() {return range().maxValue;},
    get step() {return range().step;},
    get pageSize() {return range().pageSize;}
  }, otherProps, {
    numberFormatter,
    get value() {return color().getChannelValue(props.channel);},
    get defaultValue() {return defaultColor().getChannelValue(props.channel);},
    onChange(v: number) {
      setColor(color().withChannelValue(props.channel, v));
    },
    onChangeEnd(v: number) {
      // onChange will have already been called with the right value, this is just to trigger onChangeEnd
      if (props.onChangeEnd) {
        props.onChangeEnd(color().withChannelValue(props.channel, v));
      }
    }
  }));

  return merge(sliderState, {
    get value() {return color();},
    setValue(value: string | Color) {
      setColor(normalizeColor(value));
    },
    getDisplayColor() {
      let current = color();
      switch (props.channel) {
        case 'hue':
          return parseColor(`hsl(${current.getChannelValue('hue')}, 100%, 50%)`);
        case 'lightness':
        case 'brightness':
        case 'saturation':
        case 'red':
        case 'green':
        case 'blue':
          return current.withChannelValue('alpha', 1);
        case 'alpha': {
          return current;
        }
        default:
          throw new Error('Unknown color channel: ' + props.channel);
      }
    },
    getThumbValueLabel() {
      return color().formatChannelValue(props.channel, props.locale);
    },
    getFormattedValue() {
      return color().formatChannelValue(props.channel, props.locale);
    },
    get step() {return range().step;},
    get pageSize() {return range().pageSize;},
    get isDragging() {return sliderState.isThumbDragging(0);}
  });
}
