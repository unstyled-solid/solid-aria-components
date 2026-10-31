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

import {AriaTextFieldProps, useTextField} from 'react-aria/useTextField';
import {
  ClassNameOrFunction,
  ContextValue,
  dom,
  DOMProps,
  RACValidation,
  removeDataAttributes,
  RenderProps,
  SlotProps,
  useContextProps,
  useRenderProps,
  useSlot,
  useSlottedContext
} from './utils';
import {createHideableComponent} from 'react-aria/private/collections/Hidden';
import {FieldErrorContext} from './FieldError';
import {FieldInputContext} from './FieldInputContext';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {FormContext} from './Form';
import {GlobalDOMAttributes} from '@react-types/shared';
import {GroupContext} from './Group';
import {InputContext} from './Input';
import {LabelContext} from './Label';
import {createContext, createSignal, merge, omit, type Ref as ForwardedRef} from 'solid-js';
import {useObjectRef} from 'react-aria/useObjectRef';
import {attachRef, type ObjectRef} from 'react-aria/private/utils/useObjectRef';
import {mergeProps} from 'react-aria/mergeProps';
import type {FocusableElement} from '@react-types/shared';
import type {LabelProps} from './Label';
import type {TextProps} from './Text';
import {TextAreaContext} from './TextArea';
import {TextContext} from './Text';

export interface TextFieldRenderProps {
  /**
   * Whether the text field is disabled.
   *
   * @selector [data-disabled]
   */
  isDisabled: boolean;
  /**
   * Whether the value is invalid.
   *
   * @selector [data-invalid]
   */
  isInvalid: boolean;
  /**
   * Whether the text field is read only.
   *
   * @selector [data-readonly]
   */
  isReadOnly: boolean;
  /**
   * Whether the text field is required.
   *
   * @selector [data-required]
   */
  isRequired: boolean;
}

export interface TextFieldProps
  extends
    Omit<
      AriaTextFieldProps,
      | 'label'
      | 'placeholder'
      | 'description'
      | 'errorMessage'
      | 'validationState'
      | 'validationBehavior'
    >,
    RACValidation,
    Omit<DOMProps, 'style' | 'className' | 'render' | 'children'>,
    SlotProps,
    RenderProps<TextFieldRenderProps>,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-TextField'
   */
  className?: ClassNameOrFunction<TextFieldRenderProps>;
  /** Whether the value is invalid. */
  isInvalid?: boolean;
}

export const TextFieldContext = createContext<ContextValue<TextFieldProps, HTMLDivElement>>(null);

/**
 * A text field allows a user to enter a plain text value with a keyboard.
 */
export const TextField = /*#__PURE__*/ createHideableComponent(function TextField(
  props: TextFieldProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  [props, ref] = useContextProps(props, ref, TextFieldContext);
  let form = useSlottedContext(FormContext);
  let inputRef = useObjectRef<FocusableElement>();
  let fieldRef;
  [props, fieldRef] = useContextProps(props, inputRef, FieldInputContext);
  let [labelRef, label] = useSlot(() => !props['aria-label'] && !props['aria-labelledby']);
  let [inputElementType, setInputElementType] = createSignal<'input' | 'textarea'>('input');
  let validation =
    useTextField<any>(
      mergeProps(removeDataAttributes(omit(props, 'children')), {
        get inputElementType() {return inputElementType();},
        get label() {return label();},
        get validationBehavior() {return props.validationBehavior ?? form?.validationBehavior ?? 'native';}
      }),
      inputRef
    );

  // Intercept setting the input ref so we can determine what kind of element we have.
  // useTextField uses this to determine what props to include.
  let inputOrTextAreaRef = (el: HTMLInputElement | HTMLTextAreaElement | null) => {
      // useContextProps returns this callable native object-ref bridge.
      let cleanup = attachRef(fieldRef as ObjectRef<FocusableElement>, el);
      if (el) {
        setInputElementType(el instanceof HTMLTextAreaElement ? 'textarea' : 'input');
      }
      return cleanup;
    };

  let renderProps = useRenderProps(merge(props, {
    values: {
      get isDisabled() {return props.isDisabled || false;},
      get isInvalid() {return validation.isInvalid;},
      get isReadOnly() {return props.isReadOnly || false;},
      get isRequired() {return props.isRequired || false;}
    },
    defaultClassName: 'react-aria-TextField'
  }));

  let DOMProps = omit(filterDOMProps(props, {global: true}), 'id');
  let labelValue = mergeProps(validation.labelProps as LabelProps, {ref: labelRef});
  let inputValue = mergeProps(validation.inputProps, {ref: inputOrTextAreaRef});
  let groupValue = {
      role: 'presentation' as const,
      get isInvalid() {return validation.isInvalid;},
      get isDisabled() {return props.isDisabled || false;}
    };
  let textValue = {slots: {
      description: validation.descriptionProps as TextProps,
      errorMessage: validation.errorMessageProps as TextProps
    }};

  return (
    <dom.div
      {...DOMProps}
      {...omit(renderProps, 'children')}
      ref={ref}
      slot={props.slot || undefined}
      data-disabled={props.isDisabled || undefined}
      data-invalid={validation.isInvalid || undefined}
      data-readonly={props.isReadOnly || undefined}
      data-required={props.isRequired || undefined}>
      <FieldErrorContext value={validation}>
        <TextContext value={textValue}>
          <GroupContext value={groupValue}>
            <TextAreaContext value={inputValue}>
              <InputContext value={inputValue}>
                <LabelContext value={labelValue}>
                  {renderProps.children}
                </LabelContext>
              </InputContext>
            </TextAreaContext>
          </GroupContext>
        </TextContext>
      </FieldErrorContext>
    </dom.div>
  );
});
