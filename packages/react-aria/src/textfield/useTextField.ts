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
  FocusableDOMProps,
  FocusableProps,
  HelpTextProps,
  InputBase,
  LabelableProps,
  TextInputBase,
  TextInputDOMProps,
  Validation,
  ValidationResult,
  ValueBase
} from '@react-types/shared';
import {filterDOMProps} from '../utils/filterDOMProps';
import {getEventTarget} from '../utils/shadowdom/DOMFunctions';
import {mergeProps} from '../utils/mergeProps';
import type {JSX} from '@solidjs/web';
import type {RefObject} from '@react-types/shared';
import {createEffect, merge, untrack} from 'solid-js';
type LabelHTMLAttributes<T> = JSX.LabelHTMLAttributes<T>;
import {useControlledState} from 'react-stately/useControlledState';
import {useField} from '../label/useField';
import {useFocusable} from '../interactions/useFocusable';
import {useFormReset} from '../utils/useFormReset';
import {useFormValidation} from '../form/useFormValidation';
import {useFormValidationState} from 'react-stately/private/form/useFormValidationState';

/**
 * A map of HTML element names and their interface types.
 * For example `'a'` -> `HTMLAnchorElement`.
 */
type IntrinsicHTMLElements = {input: HTMLInputElement; textarea: HTMLTextAreaElement};

/**
 * A map of HTML element names and their attribute interface types.
 * For example `'a'` -> `AnchorHTMLAttributes<HTMLAnchorElement>`.
 */
type IntrinsicHTMLAttributes = JSX.IntrinsicElements;

type DefaultElementType = 'input';

/**
 * The intrinsic HTML element names that `useTextField` supports; e.g. `input`,
 * `textarea`.
 */
type TextFieldIntrinsicElements = keyof Pick<IntrinsicHTMLElements, 'input' | 'textarea'>;

/**
 * The HTML element interfaces that `useTextField` supports based on what is
 * defined for `TextFieldIntrinsicElements`; e.g. `HTMLInputElement`,
 * `HTMLTextAreaElement`.
 */
type TextFieldHTMLElementType = Pick<IntrinsicHTMLElements, TextFieldIntrinsicElements>;

/**
 * The HTML attributes interfaces that `useTextField` supports based on what
 * is defined for `TextFieldIntrinsicElements`; e.g. `InputHTMLAttributes`,
 * `TextareaHTMLAttributes`.
 */
type TextFieldHTMLAttributesType = Pick<IntrinsicHTMLAttributes, TextFieldIntrinsicElements>;

/**
 * The type of `inputProps` returned by `useTextField`; e.g. `InputHTMLAttributes`,
 * `TextareaHTMLAttributes`.
 */
type TextFieldInputProps<T extends TextFieldIntrinsicElements> = TextFieldHTMLAttributesType[T];

export interface TextFieldProps<T = HTMLInputElement>
  extends
    InputBase,
    Validation<string>,
    HelpTextProps,
    FocusableProps<T>,
    TextInputBase,
    ValueBase<string>,
    LabelableProps {}

export interface AriaTextFieldProps<T = HTMLInputElement>
  extends
    TextFieldProps<T>,
    AriaLabelingProps,
    FocusableDOMProps,
    TextInputDOMProps<T>,
    AriaValidationProps {
  // https://www.w3.org/TR/wai-aria-1.2/#textbox
  /**
   * Identifies the currently active element when DOM focus is on a composite widget, textbox,
   * group, or application.
   */
  'aria-activedescendant'?: string;
  /**
   * Indicates whether inputting text could trigger display of one or more predictions of the user's
   * intended value for an input and specifies how predictions would be presented if they are made.
   */
  'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both';
  /**
   * Indicates the availability and type of interactive popup element, such as menu or dialog, that
   * can be triggered by an element.
   */
  'aria-haspopup'?: boolean | 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  /**
   * Identifies the element (or elements) whose contents or presence are controlled by the current
   * element.
   */
  'aria-controls'?: string;
  /**
   * An enumerated attribute that defines what action label or icon to preset for the enter key on
   * virtual keyboards. See
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/enterkeyhint).
   */
  enterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
}

export interface AriaTextFieldOptions<
  T extends TextFieldIntrinsicElements
> extends AriaTextFieldProps<TextFieldHTMLElementType[T]> {
  /**
   * The HTML element used to render the input, e.g. 'input', or 'textarea'. It determines whether
   * certain HTML attributes will be included in `inputProps`. For example,
   * [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-type).
   *
   * @default 'input'
   */
  inputElementType?: T;
  /**
   * Controls whether inputted text is automatically capitalized and, if so, in what manner.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autocapitalize).
   */
  autoCapitalize?: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';
  /**
   * An enumerated attribute that defines what action label or icon to preset for the enter key on
   * virtual keyboards. See
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/enterkeyhint).
   */
  enterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
}

/**
 * The type of `ref` object that can be passed to `useTextField` based on the given
 * intrinsic HTML element name; e.g.`RefObject<HTMLInputElement>`,
 * `RefObject<HTMLTextAreaElement>`.
 */
type TextFieldRefObject<T extends TextFieldIntrinsicElements> = RefObject<
  TextFieldHTMLElementType[T] | null
>;

export interface TextFieldAria<
  T extends TextFieldIntrinsicElements = DefaultElementType
> extends ValidationResult {
  /** Props for the input element. */
  inputProps: TextFieldInputProps<T>;
  /** Props for the text field's visible label element, if any. */
  labelProps: DOMAttributes | LabelHTMLAttributes<HTMLLabelElement>;
  /** Props for the text field's description element, if any. */
  descriptionProps: DOMAttributes<HTMLElement>;
  /** Props for the text field's error message element, if any. */
  errorMessageProps: DOMAttributes<HTMLElement>;
}

/**
 * Provides the behavior and accessibility implementation for a text field.
 *
 * @param props - Props for the text field.
 * @param ref - Ref to the HTML input or textarea element.
 */
export function useTextField<T extends TextFieldIntrinsicElements = DefaultElementType>(
  props: AriaTextFieldOptions<T>,
  ref: TextFieldRefObject<T>
): TextFieldAria<T> {
  let [value, setValue] = useControlledState<string>(
    () => props.value,
    untrack(() => props.defaultValue || ''),
    next => props.onChange?.(next)
  );
  let {focusableProps} = useFocusable<TextFieldHTMLElementType[T]>(props, ref);
  let validationState = useFormValidationState(merge(props, {get value() {return value();}}));
  let {labelProps, fieldProps, descriptionProps, errorMessageProps} = useField(merge(props, {
    get isInvalid() {return validationState.displayValidation.isInvalid;},
    get errorMessage() {return props.errorMessage || validationState.displayValidation.validationErrors;}
  }));
  let domProps = filterDOMProps(props, {labelable: true});

  const inputOnlyProps = {
    get type() {return (props.inputElementType ?? 'input') === 'input' ? props.type ?? 'text' : undefined;},
    get pattern() {return (props.inputElementType ?? 'input') === 'input' ? props.pattern : undefined;}
  };

  let initialValue = untrack(value);
  useFormReset(ref, () => props.defaultValue ?? initialValue, setValue);
  // React projects the controlled value into the default value as well. Native
  // Solid writes the live property; keep the source's form/reset projection,
  // avoiding identical live-value writes that would disturb text selection.
  createEffect(() => ({input: ref.current, value: value()}), ({input, value}) => {
    if (input && input.defaultValue !== value) {
      // On a pristine native input, defaultValue also changes the live value.
      // Project the live property first, as React does, so that the browser
      // establishes the caret at the end rather than leaving it at zero. Do
      // not rewrite an already edited value or an identical live value.
      if (input.value === input.defaultValue && input.value !== value) input.value = value;
      input.defaultValue = value;
    }
  });
  useFormValidation(merge(props, {get value() {return value();}}), validationState, ref);

  return {
    labelProps,
    inputProps: mergeProps(domProps, inputOnlyProps, {
      get disabled() {return props.isDisabled ?? false;},
      get readOnly() {return props.isReadOnly ?? false;},
      get required() {return !!props.isRequired && props.validationBehavior === 'native';},
      get 'aria-required'() {return (props.isRequired && (props.validationBehavior ?? 'aria') === 'aria') || undefined;},
      get 'aria-invalid'() {return validationState.displayValidation.isInvalid ? 'true' : undefined;},
      get 'aria-errormessage'() {return props['aria-errormessage'];},
      get 'aria-activedescendant'() {return props['aria-activedescendant'];},
      get 'aria-autocomplete'() {return props['aria-autocomplete'];},
      get 'aria-haspopup'() {return props['aria-haspopup'];},
      get 'aria-controls'() {return props['aria-controls'];},
      get value() {return value();},
      onInput: (e: Event & {currentTarget: TextFieldHTMLElementType[T]; target: Element}) => {
        let input = getEventTarget(e) as TextFieldHTMLElementType[T];
        setValue(input.value);
        let handler = props.onInput;
        if (typeof handler === 'function') handler(e as Parameters<typeof handler>[0]);
        else if (handler) handler[0](handler[1], e as Parameters<typeof handler[0]>[1]);
        // Native value bindings do not rerun when a controlled parent refuses
        // an edit. Restore only after its staged acceptance/formatting commits.
        queueMicrotask(() => {
          let accepted = untrack(() => props.value === undefined || ref.current !== input ? undefined : value());
          if (accepted !== undefined && input.value !== accepted) input.value = accepted;
        });
      },
      get autoComplete() {return props.autoComplete;},
      get autoCapitalize() {return props.autoCapitalize;},
      get maxLength() {return props.maxLength;},
      get minLength() {return props.minLength;},
      get name() {return props.name;},
      get form() {return props.form;},
      get placeholder() {return props.placeholder;},
      get inputMode() {return props.inputMode;},
      get autoCorrect() {return props.autoCorrect;},
      get spellCheck() {return props.spellCheck;},
      get enterKeyHint() {return props.enterKeyHint;},

      // Clipboard events
      get onCopy() {return props.onCopy;},
      get onCut() {return props.onCut;},
      get onPaste() {return props.onPaste;},

      // Composition events
      get onCompositionEnd() {return props.onCompositionEnd;},
      get onCompositionStart() {return props.onCompositionStart;},
      get onCompositionUpdate() {return props.onCompositionUpdate;},

      // Selection events
      get onSelect() {return props.onSelect;},

      // Input events
      get onBeforeInput() {return props.onBeforeInput;},
    }, focusableProps, fieldProps) as TextFieldInputProps<T>,
    descriptionProps,
    errorMessageProps,
    get isInvalid() {return validationState.displayValidation.isInvalid;},
    get validationErrors() {return validationState.displayValidation.validationErrors;},
    get validationDetails() {return validationState.displayValidation.validationDetails;}
  };
}
