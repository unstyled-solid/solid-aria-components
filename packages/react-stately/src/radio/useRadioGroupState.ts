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
  FocusEvents,
  HelpTextProps,
  InputBase,
  InputDOMProps,
  LabelableProps,
  Orientation,
  Validation,
  ValidationState,
  ValueBase
} from '@react-types/shared';
import {FormValidationState, useFormValidationState} from '../form/useFormValidationState';
import {useControlledState} from '../utils/useControlledState';
import {createMemo, createSignal, merge, untrack} from 'solid-js';

export interface RadioGroupProps
  extends
    ValueBase<string | null, string>,
    InputBase,
    Pick<InputDOMProps, 'name'>,
    Validation<string>,
    LabelableProps,
    HelpTextProps,
    FocusEvents {
  /**
   * The axis the Radio Button(s) should align with.
   *
   * @default 'vertical'
   */
  orientation?: Orientation;
}

export interface RadioGroupState extends FormValidationState {
  /**
   * The name for the group, used for native form submission.
   *
   * @private
   * @deprecated
   */
  readonly name: string;

  /** Whether the radio group is disabled. */
  readonly isDisabled: boolean;

  /** Whether the radio group is read only. */
  readonly isReadOnly: boolean;

  /** Whether the radio group is required. */
  readonly isRequired: boolean;

  /**
   * Whether the radio group is valid or invalid.
   *
   * @deprecated Use `isInvalid` instead.
   */
  readonly validationState: ValidationState | null;

  /** Whether the radio group is invalid. */
  readonly isInvalid: boolean;

  /** The currently selected value. */
  readonly selectedValue: string | null;

  /** The default selected value. */
  readonly defaultSelectedValue: string | null;

  /** Sets the selected value. */
  setSelectedValue(value: string | null): void;

  /** The value of the last focused radio. */
  readonly lastFocusedValue: string | null;

  /** Sets the last focused value. */
  setLastFocusedValue(value: string | null): void;
}

let instance = Math.round(Math.random() * 10000000000);
let i = 0;

/**
 * Provides state management for a radio group component. Provides a name for the group,
 * and manages selection and focus state.
 */
export function useRadioGroupState(props: RadioGroupProps): RadioGroupState {
  // Preserved here for backward compatibility. React Aria now generates the name instead of stately.
  let name = createMemo(() => props.name || `radio-group-${instance}-${++i}`);
  let [selectedValue, setSelected] = useControlledState<string | null>(
    () => props.value,
    untrack(() => props.defaultValue ?? null),
    value => props.onChange?.(value as string)
  );
  let initialValue = untrack(selectedValue);
  let [lastFocusedValue, setLastFocusedValue] = createSignal<string | null>(null);

  let validation = useFormValidationState(merge(props, {get value() {return selectedValue();}}));

  let setSelectedValue = (value: string | null) => {
    if (!props.isReadOnly && !props.isDisabled) {
      setSelected(value);
      validation.commitValidation();
    }
  };

  let isInvalid = () => validation.displayValidation.isInvalid;

  return merge(validation, {
    get name() {return name();},
    get selectedValue() {return selectedValue();},
    get defaultSelectedValue() {return props.value !== undefined ? initialValue : (props.defaultValue ?? null);},
    setSelectedValue,
    get lastFocusedValue() {return lastFocusedValue();},
    setLastFocusedValue,
    get isDisabled() {return props.isDisabled || false;},
    get isReadOnly() {return props.isReadOnly || false;},
    get isRequired() {return props.isRequired || false;},
    get validationState() {return props.validationState || (isInvalid() ? 'invalid' : null);},
    get isInvalid() {return isInvalid();}
  });
}
