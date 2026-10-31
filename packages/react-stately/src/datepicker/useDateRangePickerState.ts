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

import {DateFormatter, toCalendarDate, toCalendarDateTime} from '@internationalized/date';
import {
  DateRange,
  DateRangePickerProps,
  DateValue,
  MappedDateValue,
  TimeValue
} from './types';
import {
  FieldOptions,
  FormatterOptions,
  getFormatOptions,
  getPlaceholderTime,
  getRangeValidationResult,
  useDefaultProps
} from './utils';
import {useFormValidationState} from '../form/useFormValidationState';
import {useOverlayTriggerState} from '../overlays/useOverlayTriggerState';
import {RangeValue} from '@react-types/shared';
import {useControlledState} from '../utils/useControlledState';
import {createMemo, createSignal, merge, omit, untrack} from 'solid-js';
import type {DateRangePickerState} from './DateRangePickerStateTypes';
export type {DateRangePickerState} from './DateRangePickerStateTypes';

export interface DateRangePickerStateOptions<
  T extends DateValue = DateValue
> extends DateRangePickerProps<T> {
  /**
   * Determines whether the date picker popover should close automatically when a date is selected.
   *
   * @default true
   */
  shouldCloseOnSelect?: boolean | (() => boolean);
}

type TimeRange = RangeValue<TimeValue>;
/**
 * Provides state management for a date range picker component.
 * A date range picker combines two DateFields and a RangeCalendar popover to allow
 * users to enter or select a date and time range.
 */
export function useDateRangePickerState<T extends DateValue = DateValue>(
  props: DateRangePickerStateOptions<T>
): DateRangePickerState {
  let overlayState = useOverlayTriggerState(props);
  let [controlledValue, setControlledValue] = useControlledState<
    DateRange | null,
    RangeValue<MappedDateValue<T>> | null
  >(() => props.value, untrack(() => props.defaultValue || null), value => props.onChange?.(value));
  let initialValue = untrack(controlledValue);
  let empty: RangeValue<DateValue | null> = {start: null, end: null};
  let [placeholderValue, setPlaceholderValue] = createSignal<RangeValue<DateValue | null>>(initialValue || empty);
  // Record the source reset without writing from a computation. Incomplete
  // edits survive external value changes; a complete placeholder cleared by
  // null stays cleared even if an external value later becomes non-null.
  let placeholderHistory = createMemo<{
    input: RangeValue<DateValue | null>;
    value: RangeValue<DateValue | null>;
  }>(previous => {
    let input = placeholderValue();
    let retained = previous?.input === input ? previous.value : input;
    if (controlledValue() == null && isCompleteRange(retained)) {
      retained = empty;
    }
    return previous?.input === input && previous.value === retained
      ? previous : {input, value: retained};
  });
  let value = () => controlledValue() || placeholderHistory().value;
  let pendingValue: RangeValue<DateValue | null> | undefined;
  let requestedValue = () => pendingValue ?? value();

  let setValue = (newValue: RangeValue<DateValue | null> | null) => {
    let next = newValue || {start: null, end: null};
    pendingValue = next;
    setPlaceholderValue(next);
    queueMicrotask(() => {pendingValue = undefined;});
    if (isCompleteRange(next)) {
      setControlledValue(next);
    } else {
      setControlledValue(null);
    }
  };

  let v = () => value().start || value().end || props.placeholderValue || null;
  let defaults = useDefaultProps(null, undefined, v, () => props.granularity);
  let granularity = () => defaults[0];
  let defaultTimeZone = () => defaults[1];
  let hasTime = () => ['hour', 'minute', 'second'].includes(granularity());

  let [storedDateRange, writeDateRange] = createSignal<RangeValue<DateValue | null> | null>(null);
  let [storedTimeRange, writeTimeRange] = createSignal<RangeValue<TimeValue | null> | null>(null);
  let dateRange = () => {let current = value(); return isCompleteRange(current) ? current : storedDateRange();};
  let timeRange = () => {
    let current = value();
    return isCompleteRange(current) && 'hour' in current.start ? current as TimeRange : storedTimeRange();
  };
  let pendingParts: {date: RangeValue<DateValue | null> | null; time: RangeValue<TimeValue | null> | null} | undefined;
  let requestedDateRange = () => pendingParts ? pendingParts.date : dateRange();
  let requestedTimeRange = () => pendingParts ? pendingParts.time : timeRange();
  let stageParts = (date: RangeValue<DateValue | null> | null, time: RangeValue<TimeValue | null> | null) => {
    pendingParts = {date, time};
    writeDateRange(date);
    writeTimeRange(time);
    queueMicrotask(() => {pendingParts = undefined;});
  };

  let commitValue = (dateRange: DateRange, timeRange: TimeRange) => {
    setValue({
      start:
        'timeZone' in timeRange.start
          ? timeRange.start.set(toCalendarDate(dateRange.start))
          : toCalendarDateTime(dateRange.start, timeRange.start),
      end:
        'timeZone' in timeRange.end
          ? timeRange.end.set(toCalendarDate(dateRange.end))
          : toCalendarDateTime(dateRange.end, timeRange.end)
    });
    stageParts(null, null);
    validation.commitValidation();
  };

  // Intercept setValue to make sure the Time section is not changed by date selection in Calendar
  let setDateRange = (range: RangeValue<DateValue | null>) => {
    let shouldCloseOnSelect = props.shouldCloseOnSelect ?? true;
    let shouldClose =
      typeof shouldCloseOnSelect === 'function' ? shouldCloseOnSelect() : shouldCloseOnSelect;
    let timeRange = requestedTimeRange();
    if (hasTime()) {
      // Set a placeholder time if the popover is closing so we don't leave the field in an incomplete state.
      if (isCompleteRange(range) && (shouldClose || (timeRange?.start && timeRange?.end))) {
        commitValue(range, {
          start: timeRange?.start || getPlaceholderTime(props.placeholderValue),
          end: timeRange?.end || getPlaceholderTime(props.placeholderValue)
        });
      } else {
        stageParts(range, timeRange);
      }
    } else if (isCompleteRange(range)) {
      setValue(range);
      validation.commitValidation();
    } else {
      stageParts(range, timeRange);
    }

    if (shouldClose) {
      overlayState.setOpen(false);
    }
  };

  let setTimeRange = (range: RangeValue<TimeValue | null>) => {
    let dateRange = requestedDateRange();
    if (isCompleteRange(dateRange) && isCompleteRange(range)) {
      commitValue(dateRange, range);
    } else {
      stageParts(dateRange, range);
    }
  };

  let formatOpts = createMemo(() => {
    let current = value();
    return {
      granularity: granularity(),
      timeZone: defaultTimeZone(),
      hideTimeZone: props.hideTimeZone,
      hourCycle: props.hourCycle,
      shouldForceLeadingZeros: props.shouldForceLeadingZeros,
      showEra: (current.start?.calendar.identifier === 'gregory' && current.start.era === 'BC') ||
        (current.end?.calendar.identifier === 'gregory' && current.end.era === 'BC')
    };
  });

  let builtinValidation = createMemo(
    () =>
      getRangeValidationResult(
        value(),
        props.minValue,
        props.maxValue,
        props.isDateUnavailable ? date => props.isDateUnavailable!(date, null) : undefined,
        formatOpts()
      )
  );

  let names = createMemo(() => [props.startName, props.endName].filter(n => n != null));
  let validation = useFormValidationState<RangeValue<MappedDateValue<T>>>(merge(untrack(() => omit(props, 'value')), {
    get value() {return controlledValue() as RangeValue<MappedDateValue<T>>;},
    get name() {return names();},
    get builtinValidation() {return builtinValidation();}
  }));

  return merge(validation, overlayState, {
    get value() {return value();},
    get defaultValue() {return props.defaultValue ?? initialValue;},
    setValue,
    get dateRange() {return dateRange();},
    get timeRange() {return timeRange();},
    get granularity() {return granularity();},
    get hasTime() {return hasTime();},
    setDate(part: 'start' | 'end', date: DateValue | null) {
      let dateRange = requestedDateRange();
      if (part === 'start') {
        setDateRange({start: date, end: dateRange?.end ?? null});
      } else {
        setDateRange({start: dateRange?.start ?? null, end: date});
      }
    },
    setTime(part: 'start' | 'end', time: TimeValue | null) {
      let timeRange = requestedTimeRange();
      if (part === 'start') {
        setTimeRange({start: time, end: timeRange?.end ?? null});
      } else {
        setTimeRange({start: timeRange?.start ?? null, end: time});
      }
    },
    setDateTime(part: 'start' | 'end', dateTime: DateValue | null) {
      let value = requestedValue();
      if (part === 'start') {
        setValue({start: dateTime, end: value?.end ?? null});
      } else {
        setValue({start: value?.start ?? null, end: dateTime});
      }
    },
    setDateRange,
    setTimeRange,
    setOpen(isOpen: boolean) {
      // Commit the selected date range when the calendar is closed. Use a placeholder time if one wasn't set.
      // If only the time range was set and not the date range, don't commit. The state will be preserved until
      // the user opens the popover again.
      let value = requestedValue();
      let dateRange = requestedDateRange();
      let timeRange = requestedTimeRange();
      if (!isOpen && !(value?.start && value?.end) && isCompleteRange(dateRange) && hasTime()) {
        commitValue(dateRange, {
          start: timeRange?.start || getPlaceholderTime(props.placeholderValue),
          end: timeRange?.end || getPlaceholderTime(props.placeholderValue)
        });
      }

      overlayState.setOpen(isOpen);
    },
    get validationState() {return props.validationState || (validation.displayValidation.isInvalid ? 'invalid' : null);},
    get isInvalid() {return validation.displayValidation.isInvalid;},
    formatValue(locale: string, fieldOptions: FieldOptions) {
      let value = controlledValue() || placeholderHistory().value;
      if (!value || !value.start || !value.end) {
        return null;
      }

      let startTimeZone = 'timeZone' in value.start ? value.start.timeZone : undefined;
      let startGranularity =
        props.granularity || (value.start && 'minute' in value.start ? 'minute' : 'day');
      let endTimeZone = 'timeZone' in value.end ? value.end.timeZone : undefined;
      let endGranularity =
        props.granularity || (value.end && 'minute' in value.end ? 'minute' : 'day');

      let startOptions = getFormatOptions(fieldOptions, {
        granularity: startGranularity,
        timeZone: startTimeZone,
        hideTimeZone: props.hideTimeZone,
        hourCycle: props.hourCycle,
        showEra:
          (value.start.calendar.identifier === 'gregory' && value.start.era === 'BC') ||
          (value.end.calendar.identifier === 'gregory' && value.end.era === 'BC')
      });

      let startDate = value.start.toDate(startTimeZone || 'UTC');
      let endDate = value.end.toDate(endTimeZone || 'UTC');

      let startFormatter = new DateFormatter(locale, startOptions);
      let endFormatter: Intl.DateTimeFormat;
      if (
        startTimeZone === endTimeZone &&
        startGranularity === endGranularity &&
        value.start.compare(value.end) !== 0
      ) {
        // Use formatRange, as it results in shorter output when some of the fields
        // are shared between the start and end dates (e.g. the same month).
        // Formatting will fail if the end date is before the start date. Fall back below when that happens.
        try {
          let parts = startFormatter.formatRangeToParts(startDate, endDate);

          // Find the separator between the start and end date. This is determined
          // by finding the last shared literal before the end range.
          let separatorIndex = -1;
          for (let i = 0; i < parts.length; i++) {
            let part = parts[i];
            if (part.source === 'shared' && part.type === 'literal') {
              separatorIndex = i;
            } else if (part.source === 'endRange') {
              break;
            }
          }

          // Now we can combine the parts into start and end strings.
          let start = '';
          let end = '';
          for (let i = 0; i < parts.length; i++) {
            if (i < separatorIndex) {
              start += parts[i].value;
            } else if (i > separatorIndex) {
              end += parts[i].value;
            }
          }

          return {start, end};
        } catch {
          // ignore
        }

        endFormatter = startFormatter;
      } else {
        let endOptions = getFormatOptions(fieldOptions, {
          granularity: endGranularity,
          timeZone: endTimeZone,
          hideTimeZone: props.hideTimeZone,
          hourCycle: props.hourCycle
        });

        endFormatter = new DateFormatter(locale, endOptions);
      }

      return {
        start: startFormatter.format(startDate),
        end: endFormatter.format(endDate)
      };
    },
    getDateFormatter(locale: string, formatOptions: FormatterOptions) {
      let newOptions = {...formatOpts(), ...formatOptions};
      let newFormatOptions = getFormatOptions({}, newOptions);
      return new DateFormatter(locale, newFormatOptions);
    }
  });
}

function isCompleteRange<T>(value: RangeValue<T | null> | null): value is RangeValue<T> {
  return value?.start != null && value.end != null;
}
