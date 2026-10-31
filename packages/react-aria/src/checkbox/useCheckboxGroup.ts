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
  DOMProps,
  FocusEvents,
  InputDOMProps,
  ValidationResult
} from '@react-types/shared';
import {checkboxGroupData} from './utils';
import {CheckboxGroupProps, CheckboxGroupState} from 'react-stately/useCheckboxGroupState';
import {filterDOMProps} from '../utils/filterDOMProps';
import {mergeProps} from '../utils/mergeProps';
import {useField} from '../label/useField';
import {useFocusWithin} from '../interactions/useFocusWithin';
import {merge, type Accessor} from 'solid-js';

export interface AriaCheckboxGroupProps
  extends
    CheckboxGroupProps,
    InputDOMProps,
    DOMProps,
    AriaLabelingProps,
    AriaValidationProps,
    FocusEvents {}

export interface CheckboxGroupAria extends Omit<ValidationResult, 'isInvalid'> {
  isInvalid: Accessor<boolean>;
  /** Props for the checkbox group wrapper element. */
  groupProps: DOMAttributes;
  /** Props for the checkbox group's visible label (if any). */
  labelProps: DOMAttributes;
  /** Props for the checkbox group description element, if any. */
  descriptionProps: DOMAttributes<HTMLElement>;
  /** Props for the checkbox group error message element, if any. */
  errorMessageProps: DOMAttributes<HTMLElement>;
}

/**
 * Provides the behavior and accessibility implementation for a checkbox group component.
 * Checkbox groups allow users to select multiple items from a list of options.
 *
 * @param props - Props for the checkbox group.
 * @param state - State for the checkbox group, as returned by `useCheckboxGroupState`.
 */
export function useCheckboxGroup(
  props: AriaCheckboxGroupProps,
  state: CheckboxGroupState
): CheckboxGroupAria {
  let isInvalid = () => state.displayValidation.isInvalid;

  let {labelProps, fieldProps, descriptionProps, errorMessageProps} = useField(merge(props, {
    // Checkbox group is not an HTML input element so it
    // shouldn't be labeled by a <label> element.
    labelElementType: 'span',
    get isInvalid() {return isInvalid();},
    get errorMessage() {return props.errorMessage || state.displayValidation.validationErrors;}
  }));

  checkboxGroupData.set(state, {
    get name() {return props.name;},
    get form() {return props.form;},
    get descriptionId() {return descriptionProps.id;},
    get errorMessageId() {return errorMessageProps.id;},
    get validationBehavior() {return props.validationBehavior ?? 'aria';}
  });

  let domProps = filterDOMProps(props, {labelable: true});

  let {focusWithinProps} = useFocusWithin({
    get onBlurWithin() {return props.onBlur;},
    get onFocusWithin() {return props.onFocus;},
    get onFocusWithinChange() {return props.onFocusChange;}
  });

  return {
    groupProps: mergeProps(domProps, {
      role: 'group',
      get 'aria-disabled'() {return props.isDisabled ? 'true' : undefined;}
    }, fieldProps, focusWithinProps),
    labelProps,
    descriptionProps,
    errorMessageProps,
    isInvalid,
    get validationErrors() {return state.displayValidation.validationErrors;},
    get validationDetails() {return state.displayValidation.validationDetails;}
  };
}
