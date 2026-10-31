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
  DOMAttributes,
  DOMProps,
  FocusEvent,
  GroupDOMAttributes,
  InputDOMProps,
  RefObject,
  ValidationResult
} from '@react-types/shared';
import {createFocusManager, FocusManager} from '../focus/FocusScope';
import {DateFieldProps, DateFieldState, DateValue} from 'react-stately/useDateFieldState';
import {filterDOMProps} from '../utils/filterDOMProps';
import type {JSX} from '@solidjs/web';
import {Accessor, createEffect, createMemo, merge, onCleanup, untrack} from 'solid-js';
import intlMessages from '../../intl/datepicker/*.json';
import {mergeProps} from '../utils/mergeProps';
import {TimeFieldState, TimePickerProps, TimeValue} from 'react-stately/useTimeFieldState';
import {useDatePickerGroup} from './useDatePickerGroup';
import {useDescription} from '../utils/useDescription';
import {useField} from '../label/useField';
import {useFocusWithin} from '../interactions/useFocusWithin';
import {useFormReset} from '../utils/useFormReset';
import {useFormValidation} from '../form/useFormValidation';
import {useLocalizedStringFormatter} from '../i18n/useLocalizedStringFormatter';

export interface AriaDateFieldProps<T extends DateValue>
  extends DateFieldProps<T>, AriaLabelingProps, DOMProps, InputDOMProps {
  /**
   * Describes the type of autocomplete functionality the input should provide if any. See
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautocomplete).
   */
  autoComplete?: string;
}

// Allows this hook to also be used with TimeField
export interface AriaDateFieldOptions<T extends DateValue> extends Omit<
  AriaDateFieldProps<T>,
  'value' | 'defaultValue' | 'onChange' | 'minValue' | 'maxValue' | 'placeholderValue' | 'validate'
> {
  /** A ref for the hidden input element for HTML form submission. */
  inputRef?: RefObject<HTMLInputElement | null>;
}

export interface DateFieldAria {
  isInvalid: Accessor<boolean>;
  validationErrors: Accessor<ValidationResult['validationErrors']>;
  validationDetails: Accessor<ValidationResult['validationDetails']>;
  /** Props for the field's visible label element, if any. */
  labelProps: DOMAttributes;
  /** Props for the field grouping element. */
  fieldProps: GroupDOMAttributes;
  /** Props for the hidden input element for HTML form submission. */
  inputProps: JSX.InputHTMLAttributes<HTMLInputElement>;
  /** Props for the description element, if any. */
  descriptionProps: DOMAttributes<HTMLElement>;
  /** Props for the error message element, if any. */
  errorMessageProps: DOMAttributes<HTMLElement>;
}

// Data that is passed between useDateField and useDateSegment.
interface HookData {
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  focusManager: FocusManager;
}

export const hookData: WeakMap<DateFieldState, HookData> = new WeakMap<DateFieldState, HookData>();

// Private props that we pass from useDatePicker/useDateRangePicker.
// Ideally we'd use a Symbol for this, but React doesn't support them: https://github.com/facebook/react/issues/7552
// These need to be stable across server and client module evaluation for SSR hydration.
export const roleSymbol: string = '__reactAriaDateFieldRole';
export const focusManagerSymbol: string = '__reactAriaDateFieldFocusManager';

/**
 * Provides the behavior and accessibility implementation for a date field component.
 * A date field allows users to enter and edit date and time values using a keyboard.
 * Each part of a date value is displayed in an individually editable segment.
 */
export function useDateField<T extends DateValue>(
  props: AriaDateFieldOptions<T>,
  state: DateFieldState,
  ref: RefObject<Element | null>
): DateFieldAria {
  let {labelProps, fieldProps, descriptionProps, errorMessageProps} = useField(merge(props, {
    labelElementType: 'span',
    get isInvalid() { return state.displayValidation.isInvalid; },
    get errorMessage() { return props.errorMessage || state.displayValidation.validationErrors; }
  }));

  let valueOnFocus = {current: null as DateValue | null};
  let {focusWithinProps} = useFocusWithin(merge(props, {
    onFocusWithin(e: FocusEvent<Element>) {
      valueOnFocus.current = state.value;
      props.onFocus?.(e);
    },
    onBlurWithin: (e: FocusEvent<Element>) => {
      state.confirmPlaceholder();
      if (state.value !== valueOnFocus.current) {
        state.commitValidation();
      }
      props.onBlur?.(e);
    },
    get onFocusWithinChange() { return props.onFocusChange; }
  }));

  let stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-aria/datepicker');
  let description = () => {
    let message = state.maxGranularity === 'hour' ? 'selectedTimeDescription' : 'selectedDateDescription';
    let field = state.maxGranularity === 'hour' ? 'time' : 'date';
    return state.value
    ? stringFormatter.format(message, {[field]: state.formatValue({month: 'long'})})
    : '';
  };
  let descProps = useDescription(description);

  // If within a date picker or date range picker, the date field will have role="presentation" and an aria-describedby
  // will be passed in that references the value (e.g. entire range). Otherwise, add the field's value description.
  let role = () => Reflect.get(props, roleSymbol) as 'presentation' | undefined;
  let describedBy = () =>
    role() === 'presentation'
      ? fieldProps['aria-describedby']
      : [descProps['aria-describedby'], fieldProps['aria-describedby']].filter(Boolean).join(' ') ||
        undefined;
  let localFocusManager = createFocusManager(ref);
  let focusManager = createMemo(() => (Reflect.get(props, focusManagerSymbol) as FocusManager | undefined) || localFocusManager);
  let groupProps = useDatePickerGroup(state, ref, () => role() === 'presentation');

  // Pass labels and other information to segments.
  let metadata = {
    get ariaLabel() { return props['aria-label']; },
    get ariaLabelledBy() { return [labelProps.id, props['aria-labelledby']].filter(Boolean).join(' ') || undefined; },
    get ariaDescribedBy() { return describedBy(); },
    get focusManager() { return focusManager(); }
  };
  hookData.set(state, metadata);
  onCleanup(() => {
    if (hookData.get(state) === metadata) { hookData.delete(state); }
  });

  let autoFocusRef = {current: untrack(() => props.autoFocus)};

  // When used within a date picker or date range picker, the field gets role="presentation"
  // rather than role="group". Since the date picker/date range picker already has a role="group"
  // with a label and description, and the segments are already labeled by this as well, this
  // avoids very verbose duplicate announcements.
  let standaloneFieldProps = mergeProps(fieldProps, {
      role: 'group' as const,
      get 'aria-disabled'() { return props.isDisabled ? 'true' as const : undefined; },
      get 'aria-describedby'() { return describedBy(); }
    });
  let fieldDOMProps = merge(() => role() === 'presentation' ? {role: 'presentation' as const} : standaloneFieldProps);

  createEffect(focusManager, focusManager => {
    if (autoFocusRef.current) {
      focusManager.focusFirst();
    }
    autoFocusRef.current = false;
  });

  let inputRef = {get current() { return props.inputRef?.current ?? null; }};
  useFormReset(inputRef, () => state.defaultValue, value => state.setValue(value));
  useFormValidation(
    merge(props, {
      focus() {
        focusManager().focusFirst();
      }
    }),
    state,
    inputRef
  );

  let inputProps: JSX.InputHTMLAttributes<HTMLInputElement> = {
    get type() { return props.validationBehavior === 'native' ? 'text' : 'hidden'; },
    get name() { return props.name; },
    get form() { return props.form; },
    get value() { return state.value?.toString() || ''; },
    get disabled() { return props.isDisabled; },
    get hidden() { return props.validationBehavior === 'native' ? true : undefined; },
    get required() { return props.validationBehavior === 'native' ? props.isRequired : undefined; }
  };

  let domProps = filterDOMProps(props);
  return {
    labelProps: merge(labelProps, {
      onClick: () => {
        focusManager().focusFirst();
      }
    }),
    fieldProps: mergeProps(domProps, fieldDOMProps, groupProps, focusWithinProps, {
      get onKeyDown() { return props.onKeyDown; },
      get onKeyUp() { return props.onKeyUp; },
      style: {
        'unicode-bidi': 'isolate'
      }
    }),
    inputProps,
    descriptionProps,
    errorMessageProps,
    isInvalid: () => state.displayValidation.isInvalid,
    validationErrors: () => state.displayValidation.validationErrors,
    validationDetails: () => state.displayValidation.validationDetails
  };
}

export interface AriaTimeFieldProps<T extends TimeValue>
  extends TimePickerProps<T>, AriaLabelingProps, DOMProps, InputDOMProps {}

export interface AriaTimeFieldOptions<T extends TimeValue> extends AriaTimeFieldProps<T> {
  /** A ref for the hidden input element for HTML form submission. */
  inputRef?: RefObject<HTMLInputElement | null>;
}

/**
 * Provides the behavior and accessibility implementation for a time field component.
 * A time field allows users to enter and edit time values using a keyboard.
 * Each part of a time value is displayed in an individually editable segment.
 */
export function useTimeField<T extends TimeValue>(
  props: AriaTimeFieldOptions<T>,
  state: TimeFieldState,
  ref: RefObject<Element | null>
): DateFieldAria {
  let res = useDateField(props, state, ref);
  // oxlint-disable-next-line react/react-compiler
  return merge(res, {inputProps: merge(res.inputProps, {
    get value() { return state.timeValue?.toString() || ''; }
  })});
}
