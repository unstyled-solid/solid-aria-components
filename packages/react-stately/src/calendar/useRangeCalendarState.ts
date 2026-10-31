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

import {alignCenter, constrainValue, isInvalid, previousAvailableDate} from './utils';
import {
  Calendar,
  CalendarDate,
  CalendarIdentifier,
  DateDuration,
  GregorianCalendar,
  maxDate,
  minDate,
  toCalendar,
  toCalendarDate
} from '@internationalized/date';
import {CalendarPropsBase, DateValue, MappedDateValue, RangeCalendarState} from './types';
import {RangeValue, ValidationState, ValueBase} from '@react-types/shared';
import {useCalendarState} from './useCalendarState';
import {createMemo, createSignal, untrack} from 'solid-js';
import {useControlledState} from '../utils/useControlledState';

export type DateRange = RangeValue<DateValue> | null;
export interface RangeCalendarProps<T extends DateValue>
  extends CalendarPropsBase, ValueBase<RangeValue<T> | null, RangeValue<MappedDateValue<T>>> {
  /**
   * When combined with `isDateUnavailable`, determines whether non-contiguous ranges,
   * i.e. ranges containing unavailable dates, may be selected.
   */
  allowsNonContiguousRanges?: boolean;
  /**
   * Callback that is called for each date of the calendar. If it returns true, then the date is
   * unavailable. The second argument provides the current selection anchor date, if any. This can
   * be used to adjust the available dates based on the user's first selected date.
   */
  isDateUnavailable?: (date: DateValue, anchorDate: CalendarDate | null) => boolean;
}

export interface RangeCalendarStateOptions<
  T extends DateValue = DateValue
> extends RangeCalendarProps<T> {
  /** The locale to display and edit the value according to. */
  locale: string;
  /**
   * A function that creates a [Calendar](../internationalized/date/Calendar.html)
   * object for a given calendar identifier. Such a function may be imported from the
   * `@internationalized/date` package, or manually implemented to include support for
   * only certain calendars.
   */
  createCalendar: (name: CalendarIdentifier) => Calendar;
  /**
   * The amount of days that will be displayed at once. This affects how pagination works.
   *
   * @default { months: 1 }
   */
  visibleDuration?: DateDuration;
  /**
   * Determines the alignment of the visible months on initial render based on the current selection
   * or current date if there is no selection.
   *
   * @default 'center'
   */
  selectionAlignment?: 'start' | 'center' | 'end';
}

/**
 * Provides state management for a range calendar component. A range calendar displays one or more
 * date grids and allows users to select a contiguous range of dates.
 */
export function useRangeCalendarState<T extends DateValue = DateValue>(
  props: RangeCalendarStateOptions<T>
): RangeCalendarState<T> {
  let defaultDuration: DateDuration = {months: 1};
  let visibleDuration = () => props.visibleDuration ?? defaultDuration;
  let [value, setValue] = useControlledState<RangeValue<T> | null, RangeValue<MappedDateValue<T>>>(
    () => props.value,
    untrack(() => props.defaultValue || null),
    next => props.onChange?.(next)
  );

  let [anchorDate, setAnchorSignal] = createSignal<CalendarDate | null>(null);
  // Event algorithms carry the requested anchor across staged writes. Public
  // getters still expose committed state, not a speculative controlled value.
  let requestedAnchor: CalendarDate | null = null;
  let setAnchorDate = (date: CalendarDate | null) => {
    requestedAnchor = date;
    setAnchorSignal(date);
  };
  let alignment = () => {
    let currentValue = value();
    if (currentValue && currentValue.start && currentValue.end) {
      let start = alignCenter(
        toCalendarDate(currentValue.start),
        visibleDuration(),
        props.locale,
        props.minValue,
        props.maxValue
      );
      let end = start.add(visibleDuration()).subtract({days: 1});

      if (currentValue.end.compare(end) > 0) {
        return 'start' as const;
      }
    }
    return 'center' as const;
  };

  let isDateUnavailable = createMemo(() => {
    let isDateUnavailable = props.isDateUnavailable;
    if (!isDateUnavailable) {
      return undefined;
    }

    let anchor = anchorDate();
    return (date: DateValue) => isDateUnavailable(date, anchor);
  });

  let getAvailableRange = (anchorDate: CalendarDate | null, unavailable = isDateUnavailable()) => {
    if (anchorDate && unavailable && !props.allowsNonContiguousRanges) {
      const nextAvailableStartDate = nextUnavailableDate(
        anchorDate,
        unavailable,
        visibleDuration(),
        -1
      );
      const nextAvailableEndDate = nextUnavailableDate(
        anchorDate,
        unavailable,
        visibleDuration(),
        1
      );
      return {
        start: nextAvailableStartDate,
        end: nextAvailableEndDate
      };
    } else {
      return null;
    }
  };

  let availableRange = createMemo(() => getAvailableRange(anchorDate()));
  let min = () => maxDate(props.minValue, availableRange()?.start);
  let max = () => minDate(props.maxValue, availableRange()?.end);

  // Forward reads to their original receiver, without snapshotting live props.
  let calendarOverrides = {
    get value() { return value()?.start ?? null; },
    get defaultValue() { return undefined; },
    get onChange() { return undefined; },
    get visibleDuration() { return visibleDuration(); },
    get minValue() { return min(); },
    get maxValue() { return max(); },
    get selectionAlignment() { return props.selectionAlignment || alignment(); },
    get isDateUnavailable() { return isDateUnavailable(); }
  };
  let calendar = useCalendarState<T>(new Proxy(calendarOverrides, {
    get(target, key, receiver) {
      return Reflect.has(target, key) ? Reflect.get(target, key, receiver) : Reflect.get(props, key, props);
    }
  }) as Parameters<typeof useCalendarState<T>>[0]);

  let highlightedRange = () => {
    let anchor = anchorDate();
    let currentValue = value();
    return anchor ? makeRange(anchor, calendar.focusedDate)
      : currentValue && makeRange(currentValue.start, currentValue.end);
  };
  let selectDate = (date: CalendarDate) => {
    if (props.isReadOnly) {
      return;
    }

    let unavailableCallback = props.isDateUnavailable;
    let anchor = requestedAnchor;
    let unavailable = unavailableCallback
      ? (date: DateValue) => unavailableCallback(date, anchor)
      : undefined;
    let rangeBounds = getAvailableRange(requestedAnchor, unavailable);
    const constrainedDate = constrainValue(
      date,
      maxDate(props.minValue, rangeBounds?.start),
      minDate(props.maxValue, rangeBounds?.end)
    );
    const previousAvailableConstrainedDate = previousAvailableDate(
      constrainedDate,
      calendar.visibleRange.start,
      unavailable
    );
    if (!previousAvailableConstrainedDate) {
      return;
    }

    if (!requestedAnchor) {
      setAnchorDate(previousAvailableConstrainedDate);
    } else {
      let range = makeRange(requestedAnchor, previousAvailableConstrainedDate);
      if (range) {
        setValue({
          start: convertValue(range.start, value()?.start) as T,
          end: convertValue(range.end, value()?.end) as T
        });
      }
      setAnchorDate(null);
    }
  };

  let [isDragging, setDragging] = createSignal(false);

  let isInvalidSelection = () => {
    let currentValue = value();
    let unavailable = isDateUnavailable();
    if (!currentValue || anchorDate()) {
      return false;
    }

    if (unavailable && (unavailable(currentValue.start) || unavailable(currentValue.end))) {
      return true;
    }

    return isInvalid(currentValue.start, props.minValue, props.maxValue) ||
      isInvalid(currentValue.end, props.minValue, props.maxValue);
  };

  let isValueInvalid = () => props.isInvalid || props.validationState === 'invalid' || isInvalidSelection();

  let state = {
    get value() { return value(); },
    setValue,
    get anchorDate() { return anchorDate(); },
    setAnchorDate,
    get highlightedRange() { return highlightedRange(); },
    get validationState(): ValidationState | null { return isValueInvalid() ? 'invalid' : null; },
    get isValueInvalid() { return isValueInvalid(); },
    selectFocusedDate() {
      if (!calendar.isCellUnavailable(calendar.focusedDate)) {
        selectDate(calendar.focusedDate);
      }
    },
    commitSelection() {
      selectDate(calendar.focusedDate);
    },
    selectDate,
    highlightDate(date: CalendarDate) {
      if (requestedAnchor) {
        calendar.setFocusedDate(date);
      }
    },
    isSelected(date: CalendarDate) {
      let range = highlightedRange();
      return Boolean(
        range &&
        date.compare(range.start) >= 0 &&
        date.compare(range.end) <= 0 &&
        !calendar.isCellDisabled(date) &&
        !calendar.isCellUnavailable(date)
      );
    },
    isInvalid(date: CalendarDate) {
      return (
        calendar.isInvalid(date) || isInvalid(date, availableRange()?.start, availableRange()?.end)
      );
    },
    get isDragging() { return isDragging(); },
    setDragging,
    clearSelection() {
      setAnchorDate(null);
      setValue(null);
    },
    focusNearestAvailableDate(this: RangeCalendarState<T>, anchorDate: CalendarDate) {
      let availableRange = getAvailableRange(anchorDate);
      let isDateInvalid = (date: CalendarDate) =>
        this.isInvalid(date) || isInvalid(date, availableRange?.start, availableRange?.end);
      let nextDay = anchorDate.add({days: 1});
      if (isDateInvalid(nextDay)) {
        nextDay = anchorDate.subtract({days: 1});
      }
      if (!isDateInvalid(nextDay)) {
        this.setFocusedDate(nextDay);
        this.setFocused(true);
      }
    }
  } as unknown as RangeCalendarState<T>;
  // Like the source spread, methods receive the range state as `this`, while
  // inherited property getters keep the original calendar receiver and stay live.
  for (let key of Object.keys(calendar)) {
    if (!Object.hasOwn(state, key)) {
      Object.defineProperty(state, key, {
        enumerable: true,
        configurable: true,
        get: () => Reflect.get(calendar, key, calendar)
      });
    }
  }
  return state;
}

function makeRange(start: DateValue, end: DateValue): RangeValue<CalendarDate> | null {
  if (!start || !end) {
    return null;
  }

  if (end.compare(start) < 0) {
    [start, end] = [end, start];
  }

  return {start: toCalendarDate(start), end: toCalendarDate(end)};
}

function convertValue(newValue: CalendarDate, oldValue?: DateValue): DateValue {
  // The display calendar should not have any effect on the emitted value.
  // Emit dates in the same calendar as the original value, if any, otherwise gregorian.
  newValue = toCalendar(newValue, oldValue?.calendar || new GregorianCalendar());

  // Preserve time if the input value had one.
  if (oldValue && 'hour' in oldValue) {
    return oldValue.set(newValue);
  }

  return newValue;
}

function nextUnavailableDate(
  anchorDate: CalendarDate,
  isDateUnavailable: (date: CalendarDate) => boolean,
  visibleDuration: DateDuration,
  dir: number
): CalendarDate | undefined {
  let nextDate = anchorDate.add({days: dir});
  let minDate = anchorDate.subtract(visibleDuration);
  let maxDate = anchorDate.add(visibleDuration);
  while (
    (dir < 0 ? nextDate.compare(minDate) >= 0 : nextDate.compare(maxDate) <= 0) &&
    !isDateUnavailable(nextDate)
  ) {
    nextDate = nextDate.add({days: dir});
  }

  if (isDateUnavailable(nextDate)) {
    return nextDate.add({days: -dir});
  }
}
