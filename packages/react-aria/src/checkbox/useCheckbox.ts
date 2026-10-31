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

import {AriaToggleProps, useToggle} from '../toggle/useToggle';
import {
  DOMAttributesWithRef,
  InputDOMProps,
  RefObject,
  ValidationResult
} from '@react-types/shared';
import {Accessor, createEffect} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {mergeProps} from '../utils/mergeProps';
import {ToggleProps, ToggleState} from 'react-stately/useToggleState';

export interface CheckboxProps extends ToggleProps {
  /**
   * Indeterminism is presentational only.
   * The indeterminate visual representation remains regardless of user interaction.
   */
  isIndeterminate?: boolean;
}

export interface AriaCheckboxProps extends CheckboxProps, InputDOMProps, AriaToggleProps {}

export interface CheckboxAria extends Omit<ValidationResult, 'isInvalid'> {
  isInvalid: Accessor<boolean>;
  /** Props for the label wrapper element. */
  labelProps: JSX.LabelHTMLAttributes<HTMLLabelElement>;
  /** Props for the input element. */
  inputProps: JSX.InputHTMLAttributes<HTMLInputElement>;
  /** Props for the checkbox description element, if any. */
  descriptionProps: DOMAttributesWithRef<HTMLElement>;
  /** Props for the checkbox error message element, if any. */
  errorMessageProps: DOMAttributesWithRef<HTMLElement>;
  /** Whether the checkbox is selected. */
  isSelected: Accessor<boolean>;
  /** Whether the checkbox is in a pressed state. */
  isPressed: Accessor<boolean>;
  /** Whether the checkbox is disabled. */
  isDisabled: Accessor<boolean>;
  /** Whether the checkbox is read only. */
  isReadOnly: Accessor<boolean>;
}

/**
 * Provides the behavior and accessibility implementation for a checkbox component.
 * Checkboxes allow users to select multiple items from a list of individual items, or
 * to mark one individual item as selected.
 *
 * @param props - Props for the checkbox.
 * @param state - State for the checkbox, as returned by `useToggleState`.
 * @param inputRef - A ref for the HTML input element.
 */
export function useCheckbox(
  props: AriaCheckboxProps,
  state: ToggleState,
  inputRef: RefObject<HTMLInputElement | null>
): CheckboxAria {
  let toggle = useToggle(props, state, inputRef);

  createEffect(() => ({
    input: inputRef.current,
    isIndeterminate: props.isIndeterminate,
    // The source effect runs after every render, including toggle selection
    // and press updates. Native checkbox activation clears indeterminate even
    // when its prop is unchanged, so retain those source invalidations.
    isSelected: toggle.isSelected(),
    isPressed: toggle.isPressed()
  }), ({input, isIndeterminate}) => {
    // indeterminate is a property, but it can only be set via javascript
    // https://css-tricks.com/indeterminate-checkboxes/
    if (input) {
      input.indeterminate = !!isIndeterminate;
    }
  });

  return {
    labelProps: mergeProps(
      toggle.labelProps,
      {
          // Prevent label from being focused when mouse down on it.
          // Note, this does not prevent the input from being focused in the `click` event.
          onMouseDown: (e: MouseEvent) => e.preventDefault()
      }
    ),
    inputProps: toggle.inputProps,
    descriptionProps: toggle.descriptionProps,
    errorMessageProps: toggle.errorMessageProps,
    isSelected: toggle.isSelected,
    isPressed: toggle.isPressed,
    isDisabled: toggle.isDisabled,
    isReadOnly: toggle.isReadOnly,
    isInvalid: toggle.isInvalid,
    get validationErrors() { return toggle.validationErrors; },
    get validationDetails() { return toggle.validationDetails; }
  };
}
