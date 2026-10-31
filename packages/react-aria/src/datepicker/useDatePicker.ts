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

import {AriaButtonProps} from '../button/useButton';
import {AriaDialogProps} from '../dialog/useDialog';
import {
  AriaLabelingProps,
  DOMAttributes,
  DOMProps,
  FocusEvent,
  GroupDOMAttributes,
  InputDOMProps,
  KeyboardEvent,
  RefObject,
  ValidationResult
} from '@react-types/shared';
import type {CalendarProps} from 'react-stately/useCalendarState';
import {createFocusManager} from '../focus/FocusScope';
import type {DatePickerProps, DateValue} from 'react-stately/useDatePickerState';
import type {DatePickerState} from 'react-stately/private/datepicker/DatePickerStateTypes';
import {filterDOMProps} from '../utils/filterDOMProps';
import intlMessages from '../../intl/datepicker/*.json';
import {mergeProps} from '../utils/mergeProps';
import {nodeContains} from '../utils/shadowdom/DOMFunctions';
import {privateValidationStateProp} from 'react-stately/private/form/useFormValidationState';
import {roleSymbol} from './useDateField';
import {useDatePickerGroup} from './useDatePickerGroup';
import {useDescription} from '../utils/useDescription';
import {useField} from '../label/useField';
import {useFocusWithin} from '../interactions/useFocusWithin';
import {useId} from '../utils/useId';
import {useLocale} from '../i18n/I18nProvider';
import {useLocalizedStringFormatter} from '../i18n/useLocalizedStringFormatter';
import {Accessor, createMemo, merge, untrack} from 'solid-js';

export interface AriaDatePickerProps<T extends DateValue>
  extends DatePickerProps<T>, AriaLabelingProps, InputDOMProps, DOMProps, InputDOMProps {
  /**
   * Describes the type of autocomplete functionality the input should provide if any. See
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautocomplete).
   */
  autoComplete?: string;
}

export interface DatePickerAria {
  isInvalid: Accessor<boolean>;
  validationErrors: Accessor<ValidationResult['validationErrors']>;
  validationDetails: Accessor<ValidationResult['validationDetails']>;
  /** Props for the date picker's visible label element, if any. */
  labelProps: DOMAttributes;
  /** Props for the grouping element containing the date field and button. */
  groupProps: Omit<GroupDOMAttributes, 'ref'> & Pick<DOMAttributes, 'ref'>;
  /** Props for the date field. */
  fieldProps: AriaDatePickerProps<DateValue>;
  /** Props for the popover trigger button. */
  buttonProps: AriaButtonProps;
  /** Props for the description element, if any. */
  descriptionProps: DOMAttributes<HTMLElement>;
  /** Props for the error message element, if any. */
  errorMessageProps: DOMAttributes<HTMLElement>;
  /** Props for the popover dialog. */
  dialogProps: AriaDialogProps;
  /** Props for the calendar within the popover dialog. */
  calendarProps: CalendarProps<DateValue>;
}

/**
 * Provides the behavior and accessibility implementation for a date picker component. A date picker
 * combines a DateField and a Calendar popover to allow users to enter or select a date and time
 * value.
 */
export function useDatePicker<T extends DateValue>(
  props: AriaDatePickerProps<T>,
  state: DatePickerState,
  ref: RefObject<Element | null>
): DatePickerAria {
  let buttonId = useId();
  let dialogId = useId();
  let fieldId = useId();
  let stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-aria/datepicker');
  // Preserve the shared private keys while keeping computed-key inference
  // from turning every field property into a string-indexed union.
  let fieldRoleKey = roleSymbol as '__reactAriaDateFieldRole';
  let validationKey = privateValidationStateProp as '__reactAriaFormValidationState';

  let {labelProps, fieldProps, descriptionProps, errorMessageProps} = useField(merge(props, {
    labelElementType: 'span',
    get isInvalid() { return state.displayValidation.isInvalid; },
    get errorMessage() { return props.errorMessage || state.displayValidation.validationErrors; }
  }));

  let groupProps = useDatePickerGroup(state, ref);

  let labelledBy = () => fieldProps['aria-labelledby'] || fieldProps.id;

  let locale = useLocale();
  let date = createMemo(() => state.formatValue(locale.locale, {month: 'long'}));
  let description = () => date() ? stringFormatter.format('selectedDateDescription', {date: date()}) : '';
  let descProps = useDescription(description);
  let ariaDescribedBy = () =>
    [descProps['aria-describedby'], fieldProps['aria-describedby']].filter(Boolean).join(' ') ||
    undefined;
  let domProps = filterDOMProps(props);
  let focusManager = createFocusManager(ref);

  let isFocused = {current: false};
  let {focusWithinProps} = useFocusWithin(merge(props, {
    get isDisabled() { return state.isOpen; },
    onBlurWithin: (e: FocusEvent<Element>) => untrack(() => {
      // Ignore when focus moves into the popover.
      let dialog = ref.current?.ownerDocument.getElementById(dialogId()) ?? null;
      if (!nodeContains(dialog, e.relatedTarget as Element | null)) {
        isFocused.current = false;
        props.onBlur?.(e);
        props.onFocusChange?.(false);
      }
    }),
    onFocusWithin: (e: FocusEvent<Element>) => untrack(() => {
      if (!isFocused.current) {
        isFocused.current = true;
        props.onFocus?.(e);
        props.onFocusChange?.(true);
      }
    })
  }));

  return {
    groupProps: mergeProps(domProps, groupProps, fieldProps, descProps, focusWithinProps, {
      role: 'group' as const,
      get 'aria-disabled'() { return props.isDisabled ? 'true' as const : null; },
      get 'aria-labelledby'() { return labelledBy(); },
      get 'aria-describedby'() { return ariaDescribedBy(); },
      onKeyDown(e: KeyboardEvent) {
        if (state.isOpen) {
          return;
        }

        if (props.onKeyDown) {
          props.onKeyDown(e);
        }
      },
      onKeyUp(e: KeyboardEvent) {
        if (state.isOpen) {
          return;
        }

        if (props.onKeyUp) {
          props.onKeyUp(e);
        }
      }
    }),
    labelProps: merge(labelProps, {
      onClick: () => {
        focusManager.focusFirst();
      }
    }),
    fieldProps: merge(fieldProps, {
      get id() { return fieldId(); },
      [fieldRoleKey]: 'presentation',
      get 'aria-describedby'() { return ariaDescribedBy(); },
      get value() { return state.value; },
      get defaultValue() { return state.defaultValue; },
      onChange: state.setValue,
      get placeholderValue() { return props.placeholderValue; },
      get hideTimeZone() { return props.hideTimeZone; },
      get hourCycle() { return props.hourCycle; },
      get shouldForceLeadingZeros() { return props.shouldForceLeadingZeros; },
      get granularity() { return props.granularity; },
      get isDisabled() { return props.isDisabled; },
      get isReadOnly() { return props.isReadOnly; },
      get isRequired() { return props.isRequired; },
      get validationBehavior() { return props.validationBehavior; },
      // DatePicker owns the validation state for the date field.
      [validationKey]: state,
      get autoFocus() { return props.autoFocus; },
      get name() { return props.name; },
      get form() { return props.form; }
    }),
    descriptionProps,
    errorMessageProps,
    buttonProps: merge(descProps, {
      get id() { return buttonId(); },
      'aria-haspopup': 'dialog' as const,
      get 'aria-label'() { return stringFormatter.format('calendar'); },
      get 'aria-labelledby'() { return `${buttonId()} ${labelledBy()}`; },
      get 'aria-describedby'() { return ariaDescribedBy(); },
      get 'aria-expanded'() { return state.isOpen; },
      get isDisabled() { return props.isDisabled || props.isReadOnly; },
      onPress: () => state.setOpen(true)
    }),
    dialogProps: {
      get id() { return dialogId(); },
      get 'aria-labelledby'() { return `${buttonId()} ${labelledBy()}`; }
    },
    calendarProps: {
      autoFocus: true,
      get value() { return state.dateValue; },
      onChange: state.setDateValue,
      get minValue() { return props.minValue; },
      get maxValue() { return props.maxValue; },
      get isDisabled() { return props.isDisabled; },
      get isReadOnly() { return props.isReadOnly; },
      get isDateUnavailable() { return props.isDateUnavailable; },
      get defaultFocusedValue() { return state.dateValue ? undefined : props.placeholderValue; },
      get isInvalid() { return state.isInvalid; },
      get errorMessage() { return (
        typeof props.errorMessage === 'function'
          ? props.errorMessage(state.displayValidation)
           : props.errorMessage || state.displayValidation.validationErrors.join(' ')); },
      get firstDayOfWeek() { return props.firstDayOfWeek; },
      get pageBehavior() { return props.pageBehavior; }
    },
    isInvalid: () => state.displayValidation.isInvalid,
    validationErrors: () => state.displayValidation.validationErrors,
    validationDetails: () => state.displayValidation.validationDetails
  };
}
