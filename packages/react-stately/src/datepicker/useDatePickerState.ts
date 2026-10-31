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
  CalendarDate,
  DateFormatter,
  toCalendarDate,
  toCalendarDateTime
} from '@internationalized/date';
import {DatePickerProps, DateValue, MappedDateValue, TimeValue} from './types';
import {
  FieldOptions,
  FormatterOptions,
  getFormatOptions,
  getPlaceholderTime,
  getValidationResult,
  useDefaultProps
} from './utils';
import {useFormValidationState} from '../form/useFormValidationState';
import {useOverlayTriggerState} from '../overlays/useOverlayTriggerState';
import {useControlledState} from '../utils/useControlledState';
import {createMemo, createSignal, merge, omit, untrack} from 'solid-js';
import type {DatePickerState} from './DatePickerStateTypes';
export type {DatePickerState} from './DatePickerStateTypes';

export interface DatePickerStateOptions<T extends DateValue> extends DatePickerProps<T> {
  /**
   * Determines whether the date picker popover should close automatically when a date is selected.
   *
   * @default true
   */
  shouldCloseOnSelect?: boolean | (() => boolean);
}

/**
 * Provides state management for a date picker component. A date picker combines a DateField and a
 * Calendar popover to allow users to enter or select a date and time value.
 */
export function useDatePickerState<T extends DateValue = DateValue>(
  props: DatePickerStateOptions<T>
): DatePickerState {
  let overlayState = useOverlayTriggerState(props);
  let [value, setValue] = useControlledState<DateValue | null, MappedDateValue<T> | null>(
    () => props.value,
    untrack(() => props.defaultValue || null),
    value => props.onChange?.(value)
  );
  let initialValue = untrack(value);

  let v = () => value() || props.placeholderValue || null;
  let defaults = useDefaultProps(null, undefined, v, () => props.granularity);
  let granularity = () => defaults[0];
  let defaultTimeZone = () => defaults[1];
  let dateValue = () => value()?.toDate(defaultTimeZone() ?? 'UTC') ?? null;
  let hasTime = () => ['hour', 'minute', 'second'].includes(granularity());

  let [storedDate, writeDate] = createSignal<DateValue | null>(null);
  let [storedTime, writeTime] = createSignal<TimeValue | null>(null);
  // Public parts reflect accepted value. Event requests compose separately
  // until Solid's staged writes commit, including a controlled refusal.
  let pending: {date: DateValue | null; time: TimeValue | null} | undefined;
  let selectedDate = () => value() || storedDate();
  let selectedTime = () => {let current = value(); return current && 'hour' in current ? current : storedTime();};
  let requestedDate = () => pending ? pending.date : selectedDate();
  let requestedTime = () => pending ? pending.time : selectedTime();
  let stage = (date: DateValue | null, time: TimeValue | null) => {
    pending = {date, time};
    writeDate(date);
    writeTime(time);
    queueMicrotask(() => {pending = undefined;});
  };

  // props.granularity must actually exist in the value if one is provided.
  let formatOpts = createMemo(() => {
    let current = v();
    if (current && !(granularity() in current)) {
      throw new Error('Invalid granularity ' + granularity() + ' for value ' + current.toString());
    }
    let accepted = value();
    return {
      granularity: granularity(),
      timeZone: defaultTimeZone(),
      hideTimeZone: props.hideTimeZone,
      hourCycle: props.hourCycle,
      shouldForceLeadingZeros: props.shouldForceLeadingZeros,
      showEra: accepted?.calendar.identifier === 'gregory' && accepted.era === 'BC'
    };
  });

  let builtinValidation = createMemo(
    () => getValidationResult(value(), props.minValue, props.maxValue, props.isDateUnavailable, formatOpts())
  );

  let validation = useFormValidationState<MappedDateValue<T>>(merge(untrack(() => omit(props, 'value')), {
    get value() {return value() as MappedDateValue<T>;},
    get builtinValidation() {return builtinValidation();}
  }));

  let commitValue = (date: DateValue, time: TimeValue) => {
    setValue('timeZone' in time ? time.set(toCalendarDate(date)) : toCalendarDateTime(date, time));
    stage(null, null);
    validation.commitValidation();
  };

  // Intercept setValue to make sure the Time section is not changed by date selection in Calendar
  let selectDate = (newValue: CalendarDate) => {
    let shouldCloseOnSelect = props.shouldCloseOnSelect ?? true;
    let shouldClose =
      typeof shouldCloseOnSelect === 'function' ? shouldCloseOnSelect() : shouldCloseOnSelect;
    if (hasTime()) {
      if (requestedTime() || shouldClose) {
        commitValue(
          newValue,
          requestedTime() || getPlaceholderTime(props.defaultValue || props.placeholderValue)
        );
      } else {
        stage(newValue, requestedTime());
      }
    } else {
      setValue(newValue);
      validation.commitValidation();
    }

    if (shouldClose) {
      overlayState.setOpen(false);
    }
  };

  let selectTime = (newValue: TimeValue) => {
    let date = requestedDate();
    if (date && newValue) {
      commitValue(date, newValue);
    } else {
      stage(requestedDate(), newValue);
    }
  };

  return merge(validation, overlayState, {
    get value() {return value();},
    get defaultValue() {return props.defaultValue ?? initialValue;},
    setValue,
    get dateValue() {return selectedDate();},
    get timeValue() {return selectedTime();},
    setDateValue: selectDate,
    setTimeValue: selectTime,
    get granularity() {return granularity();},
    get hasTime() {return hasTime();},
    setOpen(isOpen: boolean) {
      // Commit the selected date when the calendar is closed. Use a placeholder time if one wasn't set.
      // If only the time was set and not the date, don't commit. The state will be preserved until
      // the user opens the popover again.
      let date = requestedDate();
      if (!isOpen && !value() && date && hasTime()) {
        commitValue(
          date,
          requestedTime() || getPlaceholderTime(props.defaultValue || props.placeholderValue)
        );
      }

      overlayState.setOpen(isOpen);
    },
    get validationState() {return props.validationState || (validation.displayValidation.isInvalid ? 'invalid' : null);},
    get isInvalid() {return validation.displayValidation.isInvalid;},
    formatValue(locale: string, fieldOptions: FieldOptions) {
      let date = dateValue();
      if (!date) {
        return '';
      }

      let formatOptions = getFormatOptions(fieldOptions, formatOpts());
      let formatter = new DateFormatter(locale, formatOptions);
      return formatter.format(date);
    },
    getDateFormatter(locale: string, formatOptions: FormatterOptions) {
      let newOptions = {...formatOpts(), ...formatOptions};
      let newFormatOptions = getFormatOptions({}, newOptions);
      return new DateFormatter(locale, newFormatOptions);
    }
  });
}
