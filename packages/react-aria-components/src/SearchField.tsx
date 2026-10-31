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

import {AriaSearchFieldProps, useSearchField} from 'react-aria/useSearchField';
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
import {createHideableComponent} from 'react-aria/private/collections/Hidden';
import {FieldErrorContext} from './FieldError';
import {FieldInputContext} from './FieldInputContext';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {FormContext} from './Form';
import {GlobalDOMAttributes} from '@react-types/shared';
import {GroupContext} from './Group';
import {InputContext, type InputProps} from './Input';
import {LabelContext, type LabelProps} from './Label';
import {createContext, merge, omit, type Ref as ForwardedRef} from 'solid-js';
import {mergeProps} from 'react-aria/mergeProps';
import {useObjectRef, type Ref as ObjectRefInput} from 'react-aria/private/utils/useObjectRef';
import {SearchFieldState, useSearchFieldState} from 'react-stately/useSearchFieldState';
import {TextContext, type TextProps} from './Text';

export interface SearchFieldRenderProps {
  /**
   * Whether the search field is empty.
   *
   * @selector [data-empty]
   */
  isEmpty: boolean;
  /**
   * Whether the search field is disabled.
   *
   * @selector [data-disabled]
   */
  isDisabled: boolean;
  /**
   * Whether the search field is invalid.
   *
   * @selector [data-invalid]
   */
  isInvalid: boolean;
  /**
   * Whether the search field is read only.
   *
   * @selector [data-readonly]
   */
  isReadOnly: boolean;
  /**
   * Whether the search field is required.
   *
   * @selector [data-required]
   */
  isRequired: boolean;
  /**
   * State of the search field.
   */
  state: SearchFieldState;
}

export interface SearchFieldProps
  extends
    Omit<
      AriaSearchFieldProps,
      | 'label'
      | 'placeholder'
      | 'description'
      | 'errorMessage'
      | 'validationState'
      | 'validationBehavior'
    >,
    RACValidation,
    RenderProps<SearchFieldRenderProps>,
    SlotProps,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-SearchField'
   */
  className?: ClassNameOrFunction<SearchFieldRenderProps>;
}

export const SearchFieldContext =
  createContext<ContextValue<SearchFieldProps, HTMLDivElement>>(null);

/**
 * A search field allows a user to enter and clear a search query.
 */
export const SearchField = /*#__PURE__*/ createHideableComponent(function SearchField(
  props: SearchFieldProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  [props, ref] = useContextProps(props, ref, SearchFieldContext);
  let formContext = useSlottedContext(FormContext);
  let validationBehavior = () => props.validationBehavior ?? formContext?.validationBehavior ?? 'native';
  let defaultInputRef = useObjectRef<HTMLInputElement>();
  let [fieldProps, fieldRef] = useContextProps(props, element => defaultInputRef(element as HTMLInputElement), FieldInputContext);
  props = fieldProps;
  let inputRef = useObjectRef<HTMLInputElement>(fieldRef as ObjectRefInput<HTMLInputElement>);
  let [labelRef, label] = useSlot(() => !props['aria-label'] && !props['aria-labelledby']);
  let state = useSearchFieldState(merge(props, {
    get validationBehavior() { return validationBehavior(); }
  }));

  let aria = useSearchField(
    merge(() => removeDataAttributes(props), {
      get label() { return label(); },
      get validationBehavior() { return validationBehavior(); }
    }),
    state,
    inputRef
  );
  let {
    labelProps,
    inputProps,
    clearButtonProps,
    descriptionProps,
    errorMessageProps
  } = aria;
  let validation = {
    get isInvalid() { return aria.isInvalid(); },
    get validationErrors() { return aria.validationErrors(); },
    get validationDetails() { return aria.validationDetails(); }
  };

  let renderProps = useRenderProps(merge(props, {
    values: {
      get isEmpty() { return state.value === ''; },
      get isDisabled() { return props.isDisabled || false; },
      get isInvalid() { return validation.isInvalid || false; },
      get isReadOnly() { return props.isReadOnly || false; },
      get isRequired() { return props.isRequired || false; },
      state
    },
    defaultClassName: 'react-aria-SearchField'
  }));

  // FieldInputContext can add pointer handlers once its collection mounts.
  // Keep the root's filtered key membership live, just like the aria source.
  let DOMProps = omit(merge(() => filterDOMProps(props, {global: true})), 'id');

  return (
    <dom.div
      {...DOMProps}
      {...renderProps}
      ref={ref}
      slot={props.slot || undefined}
      data-empty={state.value === '' || undefined}
      data-disabled={props.isDisabled || undefined}
      data-invalid={validation.isInvalid || undefined}
      data-readonly={props.isReadOnly || undefined}
      data-required={props.isRequired || undefined}>
      <Provider
        values={[
          [LabelContext, mergeProps(labelProps as LabelProps, {ref: labelRef})],
          [InputContext, mergeProps(inputProps as InputProps, {ref: inputRef})],
          [ButtonContext, clearButtonProps],
          [
            TextContext,
            {
              slots: {
                description: descriptionProps as TextProps,
                errorMessage: errorMessageProps as TextProps
              }
            }
          ],
          [GroupContext, {get isInvalid() { return validation.isInvalid; }, get isDisabled() { return props.isDisabled || false; }}],
          [FieldErrorContext, validation]
        ]}>
        {renderProps.children}
      </Provider>
    </dom.div>
  );
});
