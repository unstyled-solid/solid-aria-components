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
import {AriaDatePickerProps} from './useDatePicker';
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
import {createFocusManager} from '../focus/FocusScope';
import type {
  DateRange,
  DateRangePickerProps,
  DateValue
} from 'react-stately/useDateRangePickerState';
import type {DateRangePickerState} from 'react-stately/private/datepicker/DateRangePickerStateTypes';
import {
  DEFAULT_VALIDATION_RESULT,
  mergeValidation,
  privateValidationStateProp
} from 'react-stately/private/form/useFormValidationState';
import {filterDOMProps} from '../utils/filterDOMProps';
import {focusManagerSymbol, roleSymbol} from './useDateField';
import intlMessages from '../../intl/datepicker/*.json';
import {mergeProps} from '../utils/mergeProps';
import {nodeContains} from '../utils/shadowdom/DOMFunctions';
import type {RangeCalendarProps} from 'react-stately/useRangeCalendarState';
import {useDatePickerGroup} from './useDatePickerGroup';
import {useDescription} from '../utils/useDescription';
import {useField} from '../label/useField';
import {useFocusWithin} from '../interactions/useFocusWithin';
import {useId} from '../utils/useId';
import {useLocale} from '../i18n/I18nProvider';
import {useLocalizedStringFormatter} from '../i18n/useLocalizedStringFormatter';
import {Accessor, createMemo, merge, untrack} from 'solid-js';

export interface AriaDateRangePickerProps<T extends DateValue>
  extends DateRangePickerProps<T>, AriaLabelingProps, Omit<InputDOMProps, 'name'>, DOMProps {}

export interface DateRangePickerAria {
  isInvalid: Accessor<boolean>;
  validationErrors: Accessor<ValidationResult['validationErrors']>;
  validationDetails: Accessor<ValidationResult['validationDetails']>;
  /** Props for the date range picker's visible label element, if any. */
  labelProps: DOMAttributes;
  /** Props for the grouping element containing the date fields and button. */
  groupProps: Omit<GroupDOMAttributes, 'ref'> & Pick<DOMAttributes, 'ref'>;
  /** Props for the start date field. */
  startFieldProps: AriaDatePickerProps<DateValue>;
  /** Props for the end date field. */
  endFieldProps: AriaDatePickerProps<DateValue>;
  /** Props for the popover trigger button. */
  buttonProps: AriaButtonProps;
  /** Props for the description element, if any. */
  descriptionProps: DOMAttributes<HTMLElement>;
  /** Props for the error message element, if any. */
  errorMessageProps: DOMAttributes<HTMLElement>;
  /** Props for the popover dialog. */
  dialogProps: AriaDialogProps;
  /** Props for the range calendar within the popover dialog. */
  calendarProps: RangeCalendarProps<DateValue>;
}

/**
 * Provides the behavior and accessibility implementation for a date picker component.
 * A date range picker combines two DateFields and a RangeCalendar popover to allow
 * users to enter or select a date and time range.
 */
export function useDateRangePicker<T extends DateValue>(
  props: AriaDateRangePickerProps<T>,
  state: DateRangePickerState,
  ref: RefObject<Element | null>
): DateRangePickerAria {
  let stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-aria/datepicker');
  let fieldRoleKey = roleSymbol as '__reactAriaDateFieldRole';
  let fieldFocusManagerKey = focusManagerSymbol as '__reactAriaDateFieldFocusManager';
  let validationKey = privateValidationStateProp as '__reactAriaFormValidationState';
  let {labelProps, fieldProps, descriptionProps, errorMessageProps} = useField(merge(props, {
    labelElementType: 'span',
    get isInvalid() { return state.displayValidation.isInvalid; },
    get errorMessage() { return props.errorMessage || state.displayValidation.validationErrors; }
  }));

  let labelledBy = () => fieldProps['aria-labelledby'] || fieldProps.id;

  let locale = useLocale();
  let range = createMemo(() => state.formatValue(locale.locale, {month: 'long'}));
  let description = () => {
    let value = range();
    return value
    ? stringFormatter.format('selectedRangeDescription', {
         startDate: value.start,
         endDate: value.end
      })
    : '';
  };
  let descProps = useDescription(description);

  let startFieldProps = {
    get 'aria-label'() { return stringFormatter.format('startDate'); },
    get 'aria-labelledby'() { return labelledBy(); }
  };

  let endFieldProps = {
    get 'aria-label'() { return stringFormatter.format('endDate'); },
    get 'aria-labelledby'() { return labelledBy(); }
  };

  let buttonId = useId();
  let dialogId = useId();

  let groupProps = useDatePickerGroup(state, ref);

  let ariaDescribedBy = () =>
    [descProps['aria-describedby'], fieldProps['aria-describedby']].filter(Boolean).join(' ') ||
    undefined;
  let focusManager = createFocusManager(ref, {
        // Exclude the button from the focus manager.
         accept: element => element.id !== buttonId()
       });

  let commonFieldProps = {
    [fieldFocusManagerKey]: focusManager,
    [fieldRoleKey]: 'presentation',
    get 'aria-describedby'() { return ariaDescribedBy(); },
    get placeholderValue() { return props.placeholderValue; },
    get hideTimeZone() { return props.hideTimeZone; },
    get hourCycle() { return props.hourCycle; },
    get granularity() { return props.granularity; },
    get shouldForceLeadingZeros() { return props.shouldForceLeadingZeros; },
    get isDisabled() { return props.isDisabled; },
    get isReadOnly() { return props.isReadOnly; },
    get isRequired() { return props.isRequired; },
    get validationBehavior() { return props.validationBehavior; }
  };

  let domProps = filterDOMProps(props);

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

  let startFieldValidation = {current: DEFAULT_VALIDATION_RESULT};
  let endFieldValidation = {current: DEFAULT_VALIDATION_RESULT};

  return {
    groupProps: mergeProps(domProps, groupProps, fieldProps, descProps, focusWithinProps, {
      role: 'group' as const,
      get 'aria-disabled'() { return props.isDisabled ? 'true' as const : null; },
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
    startFieldProps: merge(startFieldProps, commonFieldProps, {
      get value() { return state.value?.start ?? null; },
      get defaultValue() { return state.defaultValue?.start; },
      onChange: (start: DateValue | null) => state.setDateTime('start', start),
      get autoFocus() { return props.autoFocus; },
      get name() { return props.startName; },
      get form() { return props.form; },
      [validationKey]: {
        get realtimeValidation() { return state.realtimeValidation; },
        get displayValidation() { return state.displayValidation; },
        updateValidation(e: ValidationResult) {
          startFieldValidation.current = e;
          state.updateValidation(mergeValidation(e, endFieldValidation.current));
        },
        resetValidation: state.resetValidation,
        commitValidation: state.commitValidation
      }
    }),
    endFieldProps: merge(endFieldProps, commonFieldProps, {
      get value() { return state.value?.end ?? null; },
      get defaultValue() { return state.defaultValue?.end; },
      onChange: (end: DateValue | null) => state.setDateTime('end', end),
      get name() { return props.endName; },
      get form() { return props.form; },
      [validationKey]: {
        get realtimeValidation() { return state.realtimeValidation; },
        get displayValidation() { return state.displayValidation; },
        updateValidation(e: ValidationResult) {
          endFieldValidation.current = e;
          state.updateValidation(mergeValidation(startFieldValidation.current, e));
        },
        resetValidation: state.resetValidation,
        commitValidation: state.commitValidation
      }
    }),
    descriptionProps,
    errorMessageProps,
    calendarProps: {
      autoFocus: true,
      get value() { return state.dateRange?.start && state.dateRange.end ? (state.dateRange as DateRange) : null; },
      onChange: state.setDateRange,
      get minValue() { return props.minValue; },
      get maxValue() { return props.maxValue; },
      get isDisabled() { return props.isDisabled; },
      get isReadOnly() { return props.isReadOnly; },
      get isDateUnavailable() { return props.isDateUnavailable; },
      get allowsNonContiguousRanges() { return props.allowsNonContiguousRanges; },
      get defaultFocusedValue() { return state.dateRange ? undefined : props.placeholderValue; },
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
