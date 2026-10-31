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

import {FocusableElement, Key, RefObject} from '@react-types/shared';
import {getEventTarget} from '../utils/shadowdom/DOMFunctions';
import type {JSX} from '@solidjs/web';
import {merge, omit, type Accessor} from 'solid-js';
import {useObjectRef} from '../utils/useObjectRef';
type ReactNode = JSX.Element;
type InputHTMLAttributes<T> = JSX.InputHTMLAttributes<T>;
import {selectData} from './useSelect';
import {SelectionMode, SelectState} from 'react-stately/useSelectState';
import {useFormReset} from '../utils/useFormReset';
import {useFormValidation} from '../form/useFormValidation';
import {useVisuallyHidden} from '../visually-hidden/VisuallyHidden';

export interface AriaHiddenSelectProps {
  /**
   * Describes the type of autocomplete functionality the input should provide if any. See
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautocomplete).
   */
  autoComplete?: string;

  /** The text label for the select. */
  label?: ReactNode;

  /** HTML form input name. */
  name?: string;

  /**
   * The `<form>` element to associate the input with.
   * The value of this attribute must be the id of a `<form>` in the same document.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#form).
   */
  form?: string;

  /** Sets the disabled state of the select and input. */
  isDisabled?: boolean;
}

export interface HiddenSelectProps<
  T,
  M extends SelectionMode = 'single'
> extends AriaHiddenSelectProps {
  /** State for the select. */
  state: SelectState<T, M>;

  /** A ref to the trigger element. */
  triggerRef: RefObject<FocusableElement | null>;
}

export interface AriaHiddenSelectOptions extends AriaHiddenSelectProps {
  /** A ref to the hidden `<select>` element. */
  selectRef?: RefObject<HTMLSelectElement | HTMLInputElement | null>;
}

export interface HiddenSelectAria {
  /** Props for the container element. */
  containerProps: JSX.HTMLAttributes<HTMLDivElement>;

  /** Props for the hidden input element. */
  inputProps: JSX.InputHTMLAttributes<HTMLInputElement>;

  /** Props for the hidden select element. */
  selectProps: Omit<JSX.SelectHTMLAttributes<HTMLSelectElement>, 'value'> & {value: string | string[]};
}

/**
 * Provides the behavior and accessibility implementation for a hidden `<select>` element, which
 * can be used in combination with `useSelect` to support browser form autofill, mobile form
 * navigation, and native HTML form submission.
 */
export function useHiddenSelect<T, M extends SelectionMode = 'single'>(
  props: AriaHiddenSelectOptions,
  stateSource: SelectState<T, M> | Accessor<SelectState<T, M>>,
  triggerRef: RefObject<FocusableElement | null>
): HiddenSelectAria {
  let state = () => typeof stateSource === 'function' ? stateSource() : stateSource;
  let data = () => selectData.get(state()) || {};
  let {visuallyHiddenProps} = useVisuallyHidden({
    style: {
      // Prevent page scrolling.
      position: 'fixed',
      top: 0,
      left: 0
    }
  });

  let validationRef = {get current() {return props.selectRef?.current ?? null;}};
  useFormReset(validationRef, () => state().defaultValue, value => state().setValue(value));
  let validationState = new Proxy({} as SelectState<T, M>, {
    get(_target, key) {return Reflect.get(state(), key);},
    ownKeys() {return Reflect.ownKeys(state());},
    getOwnPropertyDescriptor(_target, key) {return key in state() ? {enumerable: true, configurable: true} : undefined;}
  });
  useFormValidation(
    {
      get validationBehavior() {return data().validationBehavior;},
      focus: () => triggerRef.current?.focus()
    },
    validationState,
    validationRef
  );

  // Used for both onChange and onInput, so accept the common supertype of both event types.
  let onChange = (e: Event & {currentTarget: HTMLSelectElement}) => {
      let eventTarget = getEventTarget(e) as HTMLSelectElement;
      if (eventTarget.multiple) {
        state().setValue(Array.from(eventTarget.selectedOptions, option => option.value) as any);
      } else {
        state().setValue(e.currentTarget.value as any);
      }
    };

  // In Safari, the <select> cannot have `display: none` or `hidden` for autofill to work.
  // In Firefox, there must be a <label> to identify the <select> whereas other browsers
  // seem to identify it just by surrounding text.
  // The solution is to use <VisuallyHidden> to hide the elements, which clips the elements to a
  // 1px rectangle. In addition, we hide from screen readers with aria-hidden, and make the <select>
  // non tabbable with tabIndex={-1}.
  return {
    containerProps: merge(visuallyHiddenProps, {
      'aria-hidden': 'true' as const,
      // @ts-ignore
      ['data-react-aria-prevent-focus']: 'true',
      // @ts-ignore
      ['data-a11y-ignore']: 'aria-hidden-focus'
    }) as JSX.HTMLAttributes<HTMLDivElement>,
    inputProps: {
      style: {display: 'none'}
    },
    selectProps: {
      tabindex: -1,
      get autocomplete() {return props.autoComplete;},
      get disabled() {return props.isDisabled === undefined ? data().isDisabled : props.isDisabled;},
      get multiple() {return state().selectionManager.selectionMode === 'multiple';},
      get required() {return data().validationBehavior === 'native' && data().isRequired;},
      get name() {return props.name === undefined ? data().name : props.name;},
      get form() {return props.form === undefined ? data().form : props.form;},
      get value() {return (state().value as string | string[]) ?? '';},
      onChange,
      onInput: onChange
    }
  };
}

/**
 * Renders a hidden native `<select>` element, which can be used to support browser
 * form autofill, mobile form navigation, and native form submission.
 */
export function HiddenSelect<T, M extends SelectionMode = 'single'>(
  props: HiddenSelectProps<T, M>
): JSX.Element | null {
  let state = () => props.state;
  let selectRef = useObjectRef<HTMLSelectElement>();
  let inputRef = useObjectRef<HTMLInputElement>();
  let {containerProps, selectProps} = useHiddenSelect(
    merge(props, {get selectRef() {return state().collection.size <= 300 ? selectRef : inputRef;}}),
    state,
    {get current() {return props.triggerRef.current;}}
  );

  let values = (): (Key | null)[] => {
    let value = state().value;
    return Array.isArray(value) ? value : [value as Key | null];
  };

  // If used in a <form>, use a hidden input so the value can be submitted to a server.
  // If the collection isn't too big, use a hidden <select> element for this so that browser
  // autofill will work. Otherwise, use an <input type="hidden">.
  return <>{state().collection.size <= 300 ? (
      <div {...containerProps} data-testid="hidden-select-container">
        <label>
          {props.label}
          <select {...merge(omit(selectProps, 'value'), () => {
            let value = state().value;
            // Native select.value is scalar, including when assigned undefined.
            // Multiple selection is owned by the live option.selected props.
            return Array.isArray(value) ? {} : {value: (value as string | null) ?? ''};
          })} ref={selectRef}>
            <option value="" label={'\u00A0'} selected={!selectProps.multiple && values().every(value => value == null || value === '')}>
              {'\u00A0'}
            </option>
            {[...state().collection.getKeys()].map(key => {
              let item = state().collection.getItem(key);
              if (item && item.type === 'item') {
                return (
                  <option value={String(item.key)} selected={values().some(value => value != null && String(value) === String(item.key))}>
                    {item.textValue}
                  </option>
                );
              }
            })}
            {/* The collection may be empty during the initial render. */}
            {/* Rendering options for the current values ensures the select has a value immediately, */}
            {/* making FormData reads consistent. */}
            {state().collection.size === 0 &&
              props.name &&
              values().map(value => <option value={String(value ?? '')} selected />)}
          </select>
        </label>
      </div>
    ) : props.name ? (() => {
    let data = selectData.get(state()) || {};
    let {validationBehavior} = data;

    // Always render at least one hidden input to ensure required form submission.
    let inputValues = values().length === 0 ? [null] : values();

    let res = inputValues.map((value, i) => {
      let inputProps: InputHTMLAttributes<HTMLInputElement> = {
        type: 'hidden',
        autocomplete: selectProps.autocomplete,
        name: props.name,
        form: props.form,
        disabled: props.isDisabled,
        value: String(value ?? '')
      };

      if (validationBehavior === 'native') {
        // Use a hidden <input type="text"> rather than <input type="hidden">
        // so that an empty value blocks HTML form submission when the field is required.
        return (
          <input
            {...inputProps}
            ref={i === 0 ? inputRef : undefined}
            style={{display: 'none'}}
            type="text"
            required={i === 0 ? selectProps.required : false}
            onChange={() => {
              /** Ignore react warning. */
            }}
          />
        );
      }

       return <input {...inputProps} ref={i === 0 ? inputRef : undefined} />;
    });

    return <>{res}</>;
  })() : null}</>;
}
