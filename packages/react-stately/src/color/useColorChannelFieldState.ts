import {Color, ColorChannel, ColorSpace} from './types';
import {ColorFieldProps} from './useColorFieldState';
import {NumberFieldState, useNumberFieldState} from '../numberfield/useNumberFieldState';
import {useColor} from './useColor';
import {useControlledState} from '../utils/useControlledState';
import {createMemo, merge, untrack} from 'solid-js';

export interface ColorChannelFieldProps extends ColorFieldProps {
  colorSpace?: ColorSpace;
  channel: ColorChannel;
}

export interface ColorChannelFieldStateOptions extends ColorChannelFieldProps {
  locale: string;
}

export interface ColorChannelFieldState extends NumberFieldState {
  /** The current value of the field. */
  colorValue: Color;
  /** The default value of the field. */
  defaultColorValue: Color | null;
  /** Sets the color value of the field. */
  setColorValue(value: Color | null): void;
}

/**
 * Provides state management for a color channel field, allowing users to edit the
 * value of an individual color channel.
 */
export function useColorChannelFieldState(
  props: ColorChannelFieldStateOptions
): ColorChannelFieldState {
  let initialValue = createMemo(() => useColor(props.value));
  let initialDefaultValue = untrack(() => useColor(props.defaultValue));
  let [colorValue, setColor] = useControlledState<Color | null>(
    initialValue,
    initialDefaultValue ?? null,
    value => props.onChange?.(value)
  );
  let color = createMemo(() => convertColor(colorValue(), props.colorSpace));
  let initialColorValue = untrack(colorValue);
  let defaultColorValue = initialDefaultValue ?? initialColorValue;
  let defaultColor = createMemo(() => convertColor(defaultColorValue, props.colorSpace));
  let range = createMemo(() => color().getChannelRange(props.channel));
  let formatOptions = createMemo(() => color().getChannelFormatOptions(props.channel));
  let multiplier = () => formatOptions().style === 'percent' && range().maxValue === 100 ? 100 : 1;

  let numberFieldState = useNumberFieldState({
    get locale() {return props.locale;},
    get value() {return colorValue() === null ? NaN : color().getChannelValue(props.channel) / multiplier();},
    get defaultValue() {
      return defaultColorValue === null ? NaN : defaultColor().getChannelValue(props.channel) / multiplier();
    },
    onChange: v => {
      if (!Number.isNaN(v)) {
        setColor(color().withChannelValue(props.channel, v * multiplier()));
      } else {
        setColor(null);
      }
    },
    get minValue() {return range().minValue / multiplier();},
    get maxValue() {return range().maxValue / multiplier();},
    get step() {return range().step / multiplier();},
    get formatOptions() {return formatOptions();}
  });

  return merge(numberFieldState, {
    get colorValue() {return color();},
    defaultColorValue,
    setColorValue: setColor
  });
}

function convertColor(colorValue: Color | null, colorSpace: ColorSpace | null | undefined) {
  let black = useColor('#000')!;
  let nonNullColorValue = colorValue || black;
  return colorSpace && nonNullColorValue
    ? nonNullColorValue.toFormat(colorSpace)
    : nonNullColorValue;
}
