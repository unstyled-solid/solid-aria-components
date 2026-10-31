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

import {clamp, snapValueToStep} from '../utils/number';

import {
  FocusableProps,
  HelpTextProps,
  InputBase,
  LabelableProps,
  RangeInputBase,
  TextInputBase,
  Validation,
  ValueBase
} from '@react-types/shared';
import {FormValidationState, useFormValidationState} from '../form/useFormValidationState';
import {NumberFormatter, NumberParser} from '@internationalized/number';
import {createEffect, createMemo, createSignal, merge, untrack} from 'solid-js';
import {useControlledState} from '../utils/useControlledState';

export interface NumberFieldProps
  extends
    InputBase,
    Validation<number>,
    FocusableProps,
    TextInputBase,
    ValueBase<number>,
    RangeInputBase<number>,
    LabelableProps,
    HelpTextProps {
  /**
   * Formatting options for the value displayed in the number field.
   * This also affects what characters are allowed to be typed by the user.
   */
  formatOptions?: Intl.NumberFormatOptions;
  /**
   * Controls the behavior of the number field when the user blurs the field after editing. 'snap'
   * will clamp the value to the min/max values, and snap to the nearest step value. 'validate' will
   * not clamp the value, and will validate that the value is within the min/max range and on a
   * valid step.
   *
   * @default 'snap'
   */
  commitBehavior?: 'snap' | 'validate';
}

export interface NumberFieldState extends FormValidationState {
  /**
   * The current text value of the input. Updated as the user types,
   * and formatted according to `formatOptions` on blur.
   */
  inputValue: string;
  /**
   * The currently parsed number value, or NaN if a valid number could not be parsed.
   * Updated based on the `inputValue` as the user types.
   */
  numberValue: number;
  /** The default value of the input. */
  defaultNumberValue: number;
  /** The minimum value of the number field. */
  minValue?: number;
  /** The maximum value of the number field. */
  maxValue?: number;
  /** Whether the current value can be incremented according to the maximum value and step. */
  canIncrement: boolean;
  /** Whether the current value can be decremented according to the minimum value and step. */
  canDecrement: boolean;
  /**
   * Validates a user input string according to the current locale and format options. Values can be
   * partially entered, and may be valid even if they cannot currently be parsed to a number. Can be
   * used to implement validation as a user types.
   */
  validate(value: string): boolean;
  /** Sets the current text value of the input. */
  setInputValue(val: string): void;
  /** Sets the number value. */
  setNumberValue(val: number): void;
  /**
   * Commits the current input value. The value is parsed to a number, clamped according to the
   * minimum and maximum values of the field, and snapped to the nearest step value. This will fire
   * the `onChange` prop with the new value, and if uncontrolled, update the `numberValue`.
   * Typically this is called when the field is blurred.
   *
   * @param value - The value to commit. If not provided, the current input value is used.
   */
  commit(value?: string): void;
  /** Increments the current input value to the next step boundary, and fires `onChange`. */
  increment(): void;
  /** Decrements the current input value to the next step boundary, and fires `onChange`. */
  decrement(): void;
  /** Sets the current value to the `maxValue` if any, and fires `onChange`. */
  incrementToMax(): void;
  /** Sets the current value to the `minValue` if any, and fires `onChange`. */
  decrementToMin(): void;
}

export interface NumberFieldStateOptions extends NumberFieldProps {
  /**
   * The locale that should be used for parsing.
   *
   * @default 'en-US'
   */
  locale: string;
}

/**
 * Provides state management for a number field component. Number fields allow users to enter a
 * number, and increment or decrement the value using stepper buttons.
 */
export function useNumberFieldState(props: NumberFieldStateOptions): NumberFieldState {
  let snapValue = (value: number) => props.step === undefined || isNaN(props.step)
    ? clamp(value, props.minValue, props.maxValue)
    : snapValueToStep(value, props.minValue, props.maxValue, props.step);
  let controlledValue = () => {
    let value = props.value === null ? NaN : props.value;
    return value !== undefined && !isNaN(value) && (props.commitBehavior ?? 'snap') === 'snap'
      ? snapValue(value) : value;
  };
  let defaultValue = () => {
    let value = props.defaultValue ?? NaN;
    return !isNaN(value) && (props.commitBehavior ?? 'snap') === 'snap' ? snapValue(value) : value;
  };
  let [numberValue, setControlledNumber] = useControlledState<number>(
    controlledValue,
    untrack(defaultValue),
    value => props.onChange?.(value)
  );
  let initialValue = untrack(numberValue);
  let numberParser = createMemo(() => new NumberParser(props.locale, props.formatOptions));
  type InputRequest = {text: string};
  let [inputRequest, setInputRequest] = createSignal<InputRequest | null>(null);
  // Native pure history replaces source render-time prevValue/prevLocale/options
  // updates. Equal option content retains edits without a signal-writing relay.
  type InputHistory = {
    text: string;
    value: number;
    locale: string;
    options: Intl.NumberFormatOptions | undefined;
    request: InputRequest | null;
  };
  let initialHistory = untrack((): InputHistory => ({
    text: isNaN(initialValue) ? '' : new NumberFormatter(props.locale, props.formatOptions).format(initialValue),
    value: initialValue,
    locale: props.locale,
    options: props.formatOptions,
    request: null
  }));
  let inputHistory = createMemo((previous: InputHistory = initialHistory): InputHistory => {
    let value = numberValue();
    let locale = props.locale;
    let options = props.formatOptions;
    let request = inputRequest();
    let boundaryChanged = !Object.is(value, previous.value) || locale !== previous.locale || !isEqualFormatOptions(options, previous.options);
    if (!boundaryChanged && request === previous.request) { return previous; }
    let text: string;
    if (boundaryChanged) {
      let numberingSystem = numberParser().getNumberingSystem(previous.text);
      text = isNaN(value) ? '' : new NumberFormatter(locale, {...options, numberingSystem}).format(value);
    } else if (request && request !== previous.request) {
      text = request.text;
    } else {
      text = previous.text;
    }
    return {text, value, locale, options, request};
  });
  let inputValue = () => inputHistory().text;
  let numberingSystem = createMemo(() => numberParser().getNumberingSystem(inputValue()));
  let formatter = createMemo(() => new NumberFormatter(props.locale, {...props.formatOptions, numberingSystem: numberingSystem()}));
  let intlOptions = createMemo(() => formatter().resolvedOptions());
  let format = (value: number) => isNaN(value) || value === null ? '' : formatter().format(value);
  let validation = useFormValidationState(merge(props, {
    get value() { return numberValue(); }
  }));
  let clampStep = () => props.step !== undefined && !isNaN(props.step)
    ? props.step : intlOptions().style === 'percent' ? 0.01 : 1;
  let parsedValue = createMemo(() => numberParser().parse(inputValue()));

  // Pending requests are imperative transaction data, not acknowledged state.
  // Only uncontrolled numeric requests can supply the next same-turn step.
  let pendingInput: {text: string; request: InputRequest | null; numeric?: number} | null = null;
  let setInputValue = (text: string) => {
    let request = {text};
    pendingInput = {text, request};
    setInputRequest(request);
  };
  let setNumberValue = (value: number) => {
    setControlledNumber(value);
    if (props.value === undefined) {
      pendingInput = {text: format(value), request: null, numeric: value};
    }
  };
  createEffect(() => ({request: inputRequest(), value: numberValue()}), ({request, value}) => {
    if (pendingInput && (pendingInput.request === request && request !== null || pendingInput.numeric !== undefined && Object.is(pendingInput.numeric, value))) {
      pendingInput = null;
    }
  });
  let currentInput = () => pendingInput?.text ?? inputValue();
  let commit = (overrideValue?: string) => {
    let newInputValue = overrideValue === undefined ? currentInput() : overrideValue;
    let newParsedValue = numberParser().parse(newInputValue);
    if (overrideValue !== undefined) {
      newParsedValue = numberParser().parse(newInputValue);
    }
    // Set to empty state if input value is empty
    if (!newInputValue.length) {
      setNumberValue(NaN);
      setInputValue(props.value === undefined ? '' : format(numberValue()));
      return;
    }

    // if it failed to parse, then reset input to formatted version of current number
    if (isNaN(newParsedValue)) {
      setInputValue(format(numberValue()));
      return;
    }

    // Clamp to min and max, round to the nearest step, and round to specified number of digits
    let clampedValue = (props.commitBehavior ?? 'snap') === 'snap' ? snapValue(newParsedValue) : newParsedValue;
    clampedValue = numberParser().parse(format(clampedValue));
    let shouldValidate = clampedValue !== numberValue();
    setNumberValue(clampedValue);

    // in a controlled state, the numberValue won't change, so we won't go back to our old input without help
    setInputValue(format(props.value === undefined ? clampedValue : numberValue()));
    if (shouldValidate) {
      validation.commitValidation();
    }
  };

  let safeNextStep = (operation: '+' | '-', minMax: number = 0) => {
    let prev = numberParser().parse(currentInput());

    if (isNaN(prev)) {
      // if the input is empty, start from the min/max value when incrementing/decrementing,
      // or zero if there is no min/max value defined.
      let newValue = isNaN(minMax) ? 0 : minMax;
      return snapValueToStep(newValue, props.minValue, props.maxValue, clampStep());
    } else {
      // otherwise, first snap the current value to the nearest step. if it moves in the direction
      // we're going, use that value, otherwise add the step and snap that value.
      let newValue = snapValueToStep(prev, props.minValue, props.maxValue, clampStep());
      if ((operation === '+' && newValue > prev) || (operation === '-' && newValue < prev)) {
        return newValue;
      }

      return snapValueToStep(
        handleDecimalOperation(operation, prev, clampStep()),
        props.minValue,
        props.maxValue,
        clampStep()
      );
    }
  };

  let increment = () => {
    let newValue = safeNextStep('+', props.minValue);

    // if we've arrived at the same value that was previously in the state, the
    // input value should be updated to match
    // ex type 4, press increment, highlight the number in the input, type 4 again, press increment
    // you'd be at 5, then incrementing to 5 again, so no re-render would happen and 4 would be left in the input
    if (newValue === numberValue()) {
      setInputValue(format(newValue));
    }

    setNumberValue(newValue);
    validation.commitValidation();
  };

  let decrement = () => {
    let newValue = safeNextStep('-', props.maxValue);

    if (newValue === numberValue()) {
      setInputValue(format(newValue));
    }

    setNumberValue(newValue);
    validation.commitValidation();
  };

  let incrementToMax = () => {
    if (props.maxValue != null) {
      setNumberValue(snapValueToStep(props.maxValue, props.minValue, props.maxValue, clampStep()));
      validation.commitValidation();
    }
  };

  let decrementToMin = () => {
    if (props.minValue != null) {
      setNumberValue(props.minValue);
      validation.commitValidation();
    }
  };

  let canIncrement = () =>
      !props.isDisabled &&
      !props.isReadOnly &&
      (isNaN(parsedValue()) ||
        props.maxValue === undefined ||
        isNaN(props.maxValue) ||
        snapValueToStep(parsedValue(), props.minValue, props.maxValue, clampStep()) > parsedValue() ||
        handleDecimalOperation('+', parsedValue(), clampStep()) <= props.maxValue);

  let canDecrement = () =>
      !props.isDisabled &&
      !props.isReadOnly &&
      (isNaN(parsedValue()) ||
        props.minValue === undefined ||
        isNaN(props.minValue) ||
        snapValueToStep(parsedValue(), props.minValue, props.maxValue, clampStep()) < parsedValue() ||
        handleDecimalOperation('-', parsedValue(), clampStep()) >= props.minValue);

  let validate = (value: string) => numberParser().isValidPartialNumber(value, props.minValue, props.maxValue);

  return {
    get realtimeValidation() { return validation.realtimeValidation; },
    get displayValidation() { return validation.displayValidation; },
    updateValidation: validation.updateValidation,
    resetValidation: validation.resetValidation,
    commitValidation: validation.commitValidation,
    validate,
    increment,
    incrementToMax,
    decrement,
    decrementToMin,
    get canIncrement() { return canIncrement(); },
    get canDecrement() { return canDecrement(); },
    get minValue() { return props.minValue; },
    get maxValue() { return props.maxValue; },
    get numberValue() { return parsedValue(); },
    get defaultNumberValue() { let value = defaultValue(); return isNaN(value) ? initialValue : value; },
    setNumberValue,
    setInputValue,
    get inputValue() { return inputValue(); },
    commit
  };
}

// Shallow equality is sufficient here because all values in Intl.NumberFormatOptions are primitives.
function isEqualFormatOptions(
  a: Intl.NumberFormatOptions | undefined,
  b: Intl.NumberFormatOptions | undefined
) {
  if (a === b) {
    return true;
  }
  if (!a || !b) {
    return false;
  }
  let aKeys = Object.keys(a);
  let bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false;
  }
  for (let key of aKeys) {
    if (b[key as keyof Intl.NumberFormatOptions] !== a[key as keyof Intl.NumberFormatOptions]) {
      return false;
    }
  }
  return true;
}

function handleDecimalOperation(operator: '-' | '+', value1: number, value2: number): number {
  let result = operator === '+' ? value1 + value2 : value1 - value2;

  // Check if we have decimals
  if (value1 % 1 !== 0 || value2 % 1 !== 0) {
    const value1Decimal = value1.toString().split('.');
    const value2Decimal = value2.toString().split('.');
    const value1DecimalLength = (value1Decimal[1] && value1Decimal[1].length) || 0;
    const value2DecimalLength = (value2Decimal[1] && value2Decimal[1].length) || 0;
    const multiplier = Math.pow(10, Math.max(value1DecimalLength, value2DecimalLength));

    // Transform the decimals to integers based on the precision
    value1 = Math.round(value1 * multiplier);
    value2 = Math.round(value2 * multiplier);

    // Perform the operation on integers values to make sure we don't get a fancy decimal value
    result = operator === '+' ? value1 + value2 : value1 - value2;

    // Transform the integer result back to decimal
    result /= multiplier;
  }

  return result;
}
