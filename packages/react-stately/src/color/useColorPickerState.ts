import {Color} from './types';
import {parseColor} from './Color';
import {useColor} from './useColor';
import {useControlledState} from '../utils/useControlledState';
import {ValueBase} from '@react-types/shared';
import {createMemo, untrack} from 'solid-js';

export interface ColorPickerProps extends ValueBase<string | Color, Color> {}

export interface ColorPickerState {
  /** The current color value of the color picker. */
  color: Color;
  /** Sets the current color value of the color picker. */
  setColor(color: Color | null): void;
}

export function useColorPickerState(props: ColorPickerProps): ColorPickerState {
  let value = createMemo(() => useColor(props.value) || undefined);
  let defaultValue = untrack(() => useColor(props.defaultValue || '#000000')!);
  let [color, setColor] = useControlledState<Color>(value, defaultValue, color => props.onChange?.(color));

  return {
    get color() {return color();},
    setColor(color) {
      if (color != null) {
        setColor(color || parseColor('#000000'));
      }
    }
  };
}
