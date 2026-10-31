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

import {AriaCheckboxProps, CheckboxAria, useCheckbox} from './useCheckbox';
import {checkboxGroupData} from './utils';
import {CheckboxGroupState} from 'react-stately/useCheckboxGroupState';
import {
  DEFAULT_VALIDATION_RESULT,
  privateValidationStateProp,
  useFormValidationState
} from 'react-stately/private/form/useFormValidationState';
import {RefObject, ValidationResult} from '@react-types/shared';
import {createEffect, merge, untrack} from 'solid-js';
import {useToggleState} from 'react-stately/useToggleState';
import {useEffectEvent} from '../utils/useEffectEvent';

export interface AriaCheckboxGroupItemProps extends Omit<
  AriaCheckboxProps,
  'isSelected' | 'defaultSelected'
> {
  value: string;
}

/**
 * Provides the behavior and accessibility implementation for a checkbox component contained within
 * a checkbox group. Checkbox groups allow users to select multiple items from a list of options.
 *
 * @param props - Props for the checkbox.
 * @param state - State for the checkbox, as returned by `useCheckboxGroupState`.
 * @param inputRef - A ref for the HTML input element.
 */
export function useCheckboxGroupItem(
  props: AriaCheckboxGroupItemProps,
  state: CheckboxGroupState,
  inputRef: RefObject<HTMLInputElement | null>
): CheckboxAria {
  const toggleState = useToggleState({
    get isReadOnly() {return props.isReadOnly || state.isReadOnly;},
    get isSelected() {return state.isSelected(props.value);},
    get defaultSelected() {return state.defaultValue.includes(props.value);},
    onChange(isSelected) {
      if (isSelected) {
        state.addValue(props.value);
      } else {
        state.removeValue(props.value);
      }

      if (props.onChange) {
        props.onChange(isSelected);
      }
    }
  });

  let groupData = checkboxGroupData.get(state)!;
  let validationBehavior = () => props.validationBehavior ?? groupData.validationBehavior;

  // Local validation for this checkbox.
  let localValidation = useFormValidationState(merge(props, {
    get value() {return toggleState.isSelected;},
    // Server validation is handled at the group level.
    name: undefined,
    validationBehavior: 'aria' as const
  }));

  // Update the checkbox group state when realtime validation changes.
  let nativeValidation = DEFAULT_VALIDATION_RESULT;
  const setInvalid = useEffectEvent((value: string, validation: ValidationResult) => state.setInvalid(value, validation));
  let updateValidation = () => {
    // Native validity is delivered imperatively from useFormValidation's effect.
    // Sample the current item/local result without creating a second dependency owner.
    let {value, validation} = untrack(() => ({
      value: props.value,
      validation: localValidation.realtimeValidation
    }));
    setInvalid(
      value,
      validation.isInvalid ? validation : nativeValidation
    );
  };

  createEffect(() => ({value: props.value, validation: localValidation.realtimeValidation, mode: groupData.validationBehavior}), ({value, validation}) => {
    setInvalid(value, validation.isInvalid ? validation : nativeValidation);
  });

  // Combine group and checkbox level validation.
  let combinedRealtimeValidation = () => state.realtimeValidation.isInvalid
    ? state.realtimeValidation
    : localValidation.realtimeValidation;
  let displayValidation = () =>
    validationBehavior() === 'native' ? state.displayValidation : combinedRealtimeValidation();

  let res = useCheckbox(
    merge(props, {
      get isReadOnly() {return props.isReadOnly || state.isReadOnly;},
      get isDisabled() {return props.isDisabled || state.isDisabled;},
      get name() {return props.name || groupData.name;},
      get form() {return props.form || groupData.form;},
      get isRequired() {return props.isRequired ?? state.isRequired;},
      get validationBehavior() {return validationBehavior();},
      [privateValidationStateProp]: {
        get realtimeValidation() {return combinedRealtimeValidation();},
        get displayValidation() {return displayValidation();},
        resetValidation: state.resetValidation,
        commitValidation: state.commitValidation,
        updateValidation(v: ValidationResult) {
          nativeValidation = v;
          updateValidation();
        }
      }
    }) as AriaCheckboxProps,
    toggleState,
    inputRef
  );

  return merge(res, {
    inputProps: merge(res.inputProps, {
      get 'aria-describedby'() {return (
        [res.inputProps['aria-describedby'], state.isInvalid ? groupData.errorMessageId : null, groupData.descriptionId]
          .filter(Boolean)
          .join(' ') || undefined);}
    })
  });
}
