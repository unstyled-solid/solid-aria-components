/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {DateFieldState, useDateFieldState} from './useDateFieldState';
import {DateValue, MappedTimeValue, TimePickerProps, TimeValue} from './types';
import {
  getLocalTimeZone,
  GregorianCalendar,
  Time,
  toCalendarDateTime,
  today,
  toTime,
  toZoned
} from '@internationalized/date';
import {createMemo, merge, omit, untrack} from 'solid-js';
import {useControlledState} from '../utils/useControlledState';

export interface TimeFieldStateOptions<T extends TimeValue = TimeValue> extends TimePickerProps<T> {
  /** The locale to display and edit the value according to. */
  locale: string;
}

export interface TimeFieldState extends DateFieldState {
  /** The current time value. */
  timeValue: Time;
}

/**
 * Provides state management for a time field component.
 * A time field allows users to enter and edit time values using a keyboard.
 * Each part of a time value is displayed in an individually editable segment.
 */
export function useTimeFieldState<T extends TimeValue = TimeValue>(
  props: TimeFieldStateOptions<T>
): TimeFieldState {
  let defaultPlaceholder = new Time();
  let placeholderValue = () => props.placeholderValue ?? defaultPlaceholder;

  let [value, setValue] = useControlledState<TimeValue | null, MappedTimeValue<T> | null>(
    () => props.value,
    untrack(() => props.defaultValue ?? null),
    value => props.onChange?.(value)
  );

  let v = () => value() || placeholderValue();
  let day = () => {let current = v(); return current && 'day' in current ? current : undefined;};
  let defaultValueTimeZone = () => {
    let current = props.defaultValue;
    return current && 'timeZone' in current ? current.timeZone : undefined;
  };
  let placeholderDate = createMemo(() => {
    let v = value() || placeholderValue();
    let valueTimeZone = v && 'timeZone' in v ? v.timeZone : undefined;

    return (valueTimeZone || defaultValueTimeZone()) && placeholderValue()
      ? toZoned(convertValue(placeholderValue())!, valueTimeZone || defaultValueTimeZone()!)
      : convertValue(placeholderValue());
  });
  let minDate = createMemo(() => convertValue(props.minValue, day()));
  let maxDate = createMemo(() => convertValue(props.maxValue, day()));

  let timeValue = createMemo(() => {
    let current = value();
    return current && 'day' in current ? toTime(current) : current as Time;
  });
  let dateTime = createMemo(() => value() == null ? null : convertValue(value()));
  let defaultDateTime = createMemo(() => props.defaultValue == null ? null : convertValue(props.defaultValue));
  let onChange = (newValue: Exclude<TimeValue, Time> | null) => {
    setValue(day() || defaultValueTimeZone() ? newValue : newValue && toTime(newValue));
  };

  let state = useDateFieldState(merge(untrack(() => omit(props, 'onChange', 'validate', 'value', 'defaultValue', 'placeholderValue', 'minValue', 'maxValue')), {
    get value() {return dateTime();},
    get defaultValue() {return defaultDateTime();},
    get minValue() {return minDate();},
    get maxValue() {return maxDate();},
    onChange,
    get granularity() {return props.granularity || 'minute';},
    maxGranularity: 'hour' as const,
    get placeholderValue() {return placeholderDate() ?? undefined;},
    // Calendar should not matter for time fields.
    createCalendar: () => new GregorianCalendar(),
    validate: () => props.validate?.(value() as MappedTimeValue<T>)
  }));

  return merge(state, {get timeValue() {return timeValue();}});
}

function convertValue(
  value: TimeValue | null | undefined,
  date: DateValue = today(getLocalTimeZone())
) {
  if (!value) {
    return null;
  }

  if ('day' in value) {
    return value;
  }

  return toCalendarDateTime(date, value);
}
