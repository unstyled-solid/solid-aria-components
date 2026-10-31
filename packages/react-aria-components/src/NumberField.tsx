/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {AriaNumberFieldProps, useNumberField} from 'react-aria/useNumberField';

import {ButtonContext} from './Button';
import {
  ClassNameOrFunction,
  ContextValue,
  dom,
  Provider,
  RACValidation,
  removeDataAttributes,
  RenderProps,
  SlotProps,
  useContextProps,
  useRenderProps,
  useSlot,
  useSlottedContext
} from './utils';
import {FieldErrorContext} from './FieldError';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {FormContext} from './Form';
import {GlobalDOMAttributes, InputDOMProps} from '@react-types/shared';
import {GroupContext, type GroupProps} from './Group';
import {InputContext, type InputProps} from './Input';
import {LabelContext, type LabelProps} from './Label';
import {NumberFieldState, useNumberFieldState} from 'react-stately/useNumberFieldState';
import {createContext, omit} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {useObjectRef, type Ref} from 'react-aria/private/utils/useObjectRef';
import {useSyncRef} from 'react-aria/private/utils/useSyncRef';
import {mergeProps} from 'react-aria/mergeProps';
import {TextContext, type TextProps} from './Text';
import {useLocale} from 'react-aria/I18nProvider';

export interface NumberFieldRenderProps {
  /**
   * Whether the number field is disabled.
   *
   * @selector [data-disabled]
   */
  isDisabled: boolean;
  /**
   * Whether the number field is invalid.
   *
   * @selector [data-invalid]
   */
  isInvalid: boolean;
  /**
   * Whether the number field is read only.
   *
   * @selector [data-readonly]
   */
  isReadOnly: boolean;
  /**
   * Whether the number field is required.
   *
   * @selector [data-required]
   */
  isRequired: boolean;
  /**
   * State of the number field.
   */
  state: NumberFieldState;
}

export interface NumberFieldProps
  extends
    Omit<
      AriaNumberFieldProps,
      | 'label'
      | 'placeholder'
      | 'description'
      | 'errorMessage'
      | 'validationState'
      | 'validationBehavior'
    >,
    RACValidation,
    InputDOMProps,
    RenderProps<NumberFieldRenderProps>,
    SlotProps,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-NumberField'
   */
  className?: ClassNameOrFunction<NumberFieldRenderProps>;
  ref?: Ref<HTMLDivElement>;
}

export const NumberFieldContext =
  createContext<ContextValue<NumberFieldProps, HTMLDivElement>>(null);
export const NumberFieldStateContext = createContext<NumberFieldState | null>(null);

/**
 * A number field allows a user to enter a number, and increment or decrement the value using
 * stepper buttons.
 */
export function NumberField(originalProps: NumberFieldProps) {
  let localRef = useObjectRef<HTMLDivElement>();
  useSyncRef(originalProps, localRef);
  let [props, ref] = useContextProps(originalProps, localRef, NumberFieldContext);
  let form = useSlottedContext(FormContext);
  let validationBehavior = () => props.validationBehavior ?? form?.validationBehavior ?? 'native';
  let locale = useLocale();
  let state = useNumberFieldState(mergeProps(props, {
    get locale() { return locale.locale; },
    get validationBehavior() { return validationBehavior(); }
  }));

  let inputRef = useObjectRef<HTMLInputElement>();
  let [labelRef, label] = useSlot(() => !props['aria-label'] && !props['aria-labelledby']);
  let aria = useNumberField(
    mergeProps(removeDataAttributes(props), {
      get label() { return label(); },
      get validationBehavior() { return validationBehavior(); }
    }),
    state,
    inputRef
  );
  let {
    labelProps,
    groupProps,
    inputProps,
    incrementButtonProps,
    decrementButtonProps,
    descriptionProps,
    errorMessageProps
  } = aria;
  let validation = {
    get isInvalid() { return aria.isInvalid(); },
    get validationErrors() { return aria.validationErrors(); },
    get validationDetails() { return aria.validationDetails(); }
  };

  let renderProps = useRenderProps(mergeProps(props, {
    values: {
      state,
      get isDisabled() { return props.isDisabled || false; },
      get isInvalid() { return validation.isInvalid || false; },
      get isRequired() { return props.isRequired || false; },
      get isReadOnly() { return props.isReadOnly || false; }
    },
    defaultClassName: 'react-aria-NumberField'
  }));

  let DOMProps = omit(filterDOMProps(props, {global: true}), 'id');

  return (
    <Provider
      values={[
        [NumberFieldStateContext, state],
        [GroupContext, groupProps as GroupProps],
        [InputContext, mergeProps(inputProps as InputProps, {ref: inputRef})],
        [LabelContext, mergeProps(labelProps as LabelProps, {ref: labelRef})],
        [
          ButtonContext,
          {
            slots: {
              increment: incrementButtonProps,
              decrement: decrementButtonProps
            }
          }
        ],
        [
          TextContext,
          {
            slots: {
              description: descriptionProps as TextProps,
              errorMessage: errorMessageProps as TextProps
            }
          }
        ],
        [FieldErrorContext, validation]
      ]}>
      <dom.div
        {...DOMProps}
        {...renderProps}
        ref={ref}
        slot={props.slot || undefined}
        data-disabled={props.isDisabled ? 'true' : undefined}
        data-readonly={props.isReadOnly ? 'true' : undefined}
        data-required={props.isRequired ? 'true' : undefined}
        data-invalid={validation.isInvalid ? 'true' : undefined}
      />
      {props.name && (
        <input
          type="hidden"
          name={props.name}
          form={props.form}
          value={isNaN(state.numberValue) ? '' : state.numberValue}
          disabled={props.isDisabled || undefined}
        />
      )}
    </Provider>
  );
}
