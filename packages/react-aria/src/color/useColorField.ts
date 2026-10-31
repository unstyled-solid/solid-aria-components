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
  AriaValidationProps,
  DOMAttributes,
  FocusableDOMProps,
  TextInputDOMProps,
  ValidationResult,
  RefObject,
  ScrollEvent
} from '@react-types/shared';
import {ColorFieldProps, ColorFieldState} from 'react-stately/useColorFieldState';
import {createSignal, merge, omit, onSettled, type Accessor} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {mergeProps} from '../utils/mergeProps';
import {privateValidationStateProp} from 'react-stately/private/form/useFormValidationState';
import {useFocusWithin} from '../interactions/useFocusWithin';
import {useFormattedTextField} from '../textfield/useFormattedTextField';
import {useFormReset} from '../utils/useFormReset';
import {useId} from '../utils/useId';
import {useKeyboard} from '../interactions/useKeyboard';
import {useScrollWheel} from '../interactions/useScrollWheel';
import {useSpinButton} from '../spinbutton/useSpinButton';
import type {AriaTextFieldProps} from '../textfield/useTextField';

export interface AriaColorFieldProps
  extends
    ColorFieldProps,
    AriaLabelingProps,
    FocusableDOMProps,
    Omit<
      TextInputDOMProps,
      | 'minLength'
      | 'maxLength'
      | 'pattern'
      | 'type'
      | 'inputMode'
      | 'autoComplete'
      | 'autoCorrect'
      | 'spellCheck'
    >,
    AriaValidationProps {
  /** Enables or disables changing the value with scroll. */
  isWheelDisabled?: boolean;
}

export interface ColorFieldAria {
  isInvalid: Accessor<boolean>;
  validationErrors: Accessor<ValidationResult['validationErrors']>;
  validationDetails: Accessor<ValidationResult['validationDetails']>;
  /** Props for the label element. */
  labelProps: JSX.LabelHTMLAttributes<HTMLLabelElement>;
  /** Props for the input element. */
  inputProps: JSX.InputHTMLAttributes<HTMLInputElement>;
  /** Props for the text field's description element, if any. */
  descriptionProps: DOMAttributes<HTMLElement>;
  /** Props for the text field's error message element, if any. */
  errorMessageProps: DOMAttributes<HTMLElement>;
}

/**
 * Provides the behavior and accessibility implementation for a color field component.
 * Color fields allow users to enter and adjust a hex color value.
 */
export function useColorField(
  props: AriaColorFieldProps,
  state: ColorFieldState,
  ref: RefObject<HTMLInputElement | null>
): ColorFieldAria {
  let inputId = useId();
  let {spinButtonProps} = useSpinButton({
    get isDisabled() { return props.isDisabled; },
    get isReadOnly() { return props.isReadOnly; },
    get isRequired() { return props.isRequired; },
    maxValue: 0xffffff,
    minValue: 0,
    onIncrement: () => state.increment(),
    onIncrementToMax: () => state.incrementToMax(),
    onDecrement: () => state.decrement(),
    onDecrementToMin: () => state.decrementToMin(),
    get value() { return state.colorValue ? state.colorValue.toHexInt() : undefined; },
    get textValue() { return state.colorValue ? state.colorValue.toString('hex') : undefined; }
  });

  let [focusWithin, setFocusWithin] = createSignal(false);
  let {focusWithinProps} = useFocusWithin({get isDisabled() { return props.isDisabled; }, onFocusWithinChange: setFocusWithin});

  let onWheel = (e: ScrollEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) {
        return;
      }
      if (e.deltaY > 0) {
        state.increment();
      } else if (e.deltaY < 0) {
        state.decrement();
      }
    };
  // If the input isn't supposed to receive input, disable scrolling.
  useScrollWheel({onScroll: onWheel, get isDisabled() { return props.isWheelDisabled || props.isDisabled || props.isReadOnly || !focusWithin(); }}, ref);

  let {keyboardProps} = useKeyboard({
    get isDisabled() { return props.isDisabled || props.isReadOnly; },
    shortcuts: {
      Enter: () => {
        state.commit();
        onSettled(() => state.commitValidation());
        return {shouldPreventDefault: false};
      }
    },
    get onKeyDown() { return props.onKeyDown; },
    get onKeyUp() { return props.onKeyUp; }
  });

  let onChange = (value: string) => {
    if (state.validate(value)) {
      state.setInputValue(value);
    }
  };

  let textField = useFormattedTextField(
    merge(omit(props, 'value', 'defaultValue', 'validate', 'onChange'), {
      get id() { return inputId(); },
      get value() { return state.inputValue; },
      // Intentionally invalid value that will be ignored by onChange during form reset
      // This is handled separately below.
      defaultValue: '!',
      validate: undefined,
      [privateValidationStateProp]: state,
      type: 'text',
      autoComplete: 'off',
      onChange,
      onKeyDown: undefined,
      onKeyUp: undefined
    }) as AriaTextFieldProps,
    state,
    ref
  );

  useFormReset(ref, () => state.defaultColorValue, value => state.setColorValue(value));

  let mergedInputProps = mergeProps(keyboardProps, textField.inputProps, spinButtonProps, focusWithinProps, {
    role: 'textbox',
    'aria-valuemax': null,
    'aria-valuemin': null,
    'aria-valuenow': null,
    'aria-valuetext': null,
    autoCorrect: 'off',
    spellCheck: 'false',
    onFocusOut: () => state.commit(),
    get 'aria-disabled'() { return props.isDisabled || undefined; },
    get 'aria-readonly'() { return props.isReadOnly || undefined; }
  });
  // Source assigns this property after merging. Native merge preserves that
  // explicit undefined mask without changing Adobe's event/undefined policy.
  let inputProps = merge(mergedInputProps, {
    get 'aria-required'() { return props.validationBehavior === 'native' ? undefined : props.isRequired || undefined; }
  });

  return {
    inputProps,
    labelProps: textField.labelProps as JSX.LabelHTMLAttributes<HTMLLabelElement>,
    descriptionProps: textField.descriptionProps,
    errorMessageProps: textField.errorMessageProps,
    isInvalid: () => textField.isInvalid,
    validationErrors: () => textField.validationErrors,
    validationDetails: () => textField.validationDetails
  };
}
