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
  FormValidationState,
  mergeValidation,
  useFormValidationState
} from '../form/useFormValidationState';
import {
  HelpTextProps,
  InputBase,
  InputDOMProps,
  LabelableProps,
  Validation,
  ValidationResult,
  ValidationState,
  ValueBase
} from '@react-types/shared';
import {useControlledState} from '../utils/useControlledState';
import {merge, untrack} from 'solid-js';

export interface CheckboxGroupProps
  extends
    ValueBase<string[]>,
    Pick<InputDOMProps, 'name'>,
    InputBase,
    LabelableProps,
    HelpTextProps,
    Validation<string[]> {}

export interface CheckboxGroupState extends FormValidationState {
  /** Current selected values. */
  readonly value: readonly string[];
  /** Default selected values. */
  readonly defaultValue: readonly string[];

  /** Whether the checkbox group is disabled. */
  readonly isDisabled: boolean;

  /** Whether the checkbox group is read only. */
  readonly isReadOnly: boolean;

  /**
   * The current validation state of the checkbox group.
   *
   * @deprecated Use `isInvalid` instead.
   */
  readonly validationState: ValidationState | null;

  /** Whether the checkbox group is invalid. */
  readonly isInvalid: boolean;

  /**
   * Whether the checkboxes in the group are required.
   * This changes to false once at least one item is selected.
   */
  readonly isRequired: boolean;

  /** Returns whether the given value is selected. */
  isSelected(value: string): boolean;

  /** Sets the selected values. */
  setValue(value: string[]): void;

  /** Adds a value to the set of selected values. */
  addValue(value: string): void;

  /** Removes a value from the set of selected values. */
  removeValue(value: string): void;

  /** Toggles a value in the set of selected values. */
  toggleValue(value: string): void;

  /** Sets whether one of the checkboxes is invalid. */
  setInvalid(value: string, validation: ValidationResult): void;
}

/**
 * Provides state management for a checkbox group component. Provides a name for the group,
 * and manages selection and focus state.
 */
export function useCheckboxGroupState(props: CheckboxGroupProps = {}): CheckboxGroupState {
  let [selectedValues, setValue] = useControlledState<string[]>(
    () => props.value,
    untrack(() => props.defaultValue || []),
    value => props.onChange?.(value)
  );
  let initialValues = untrack(selectedValues);
  let isRequired = () => !!props.isRequired && selectedValues().length === 0;

  let invalidValues = new Map<string, ValidationResult>();
  let validation = useFormValidationState(merge(props, {
    get value() {return selectedValues();}
  }));

  let isInvalid = () => validation.displayValidation.isInvalid;
  const state: CheckboxGroupState = {
    get realtimeValidation() {return validation.realtimeValidation;},
    get displayValidation() {return validation.displayValidation;},
    updateValidation: validation.updateValidation,
    resetValidation: validation.resetValidation,
    commitValidation: validation.commitValidation,
    get value() {return selectedValues();},
    get defaultValue() {return props.defaultValue ?? initialValues;},
    setValue(value) {
      if (props.isReadOnly || props.isDisabled) {
        return;
      }

      setValue(value);
    },
    get isDisabled() {return props.isDisabled || false;},
    get isReadOnly() {return props.isReadOnly || false;},
    isSelected(value) {
      return selectedValues().includes(value);
    },
    addValue(value) {
      if (props.isReadOnly || props.isDisabled) {
        return;
      }
      setValue(selectedValues => {
        if (!selectedValues.includes(value)) {
          return selectedValues.concat(value);
        }
        return selectedValues;
      });
    },
    removeValue(value) {
      if (props.isReadOnly || props.isDisabled) {
        return;
      }
      let values = selectedValues();
      if (values.includes(value)) {
        setValue(values.filter(existingValue => existingValue !== value));
      }
    },
    toggleValue(value) {
      if (props.isReadOnly || props.isDisabled) {
        return;
      }
      // The source toggle/removal commands use the committed selection snapshot,
      // unlike addValue's functional transaction. Preserve synchronous repeat behavior.
      let values = selectedValues();
      if (values.includes(value)) {
        setValue(values.filter(existingValue => existingValue !== value));
      } else {
        setValue(values.concat(value));
      }
    },
    setInvalid(value, v) {
      let s = new Map(invalidValues);
      if (v.isInvalid) {
        s.set(value, v);
      } else {
        s.delete(value);
      }

      invalidValues = s;
      validation.updateValidation(mergeValidation(...s.values()));
    },
    get validationState() {return props.validationState ?? (isInvalid() ? 'invalid' : null);},
    get isInvalid() {return isInvalid();},
    get isRequired() {return isRequired();}
  };

  return state;
}
