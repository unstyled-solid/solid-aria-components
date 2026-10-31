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
  alignCenter,
  alignEnd,
  alignStart,
  constrainStart,
  constrainValue,
  isEqualDuration,
  isInvalid,
  previousAvailableDate
} from './utils';
import {
  Calendar,
  CalendarDate,
  CalendarIdentifier,
  DateDuration,
  DateFormatter,
  endOfMonth,
  endOfWeek,
  getDayOfWeek,
  getWeeksInMonth,
  GregorianCalendar,
  isEqualCalendar,
  isSameDay,
  minDate,
  startOfMonth,
  startOfWeek,
  toCalendar,
  toCalendarDate,
  today
} from '@internationalized/date';
import {
  CalendarPropsBase,
  CalendarSelectionMode,
  CalendarState,
  CalendarValueType,
  DateValue,
  MappedDateValue
} from './types';
import {useControlledState} from '../utils/useControlledState';
import {createEffect, createMemo, createSignal, onSettled, untrack} from 'solid-js';
import {ValidationState, ValueBase} from '@react-types/shared';

export interface CalendarProps<T extends DateValue, M extends CalendarSelectionMode = 'single'>
  extends
    CalendarPropsBase,
    ValueBase<CalendarValueType<T | null, M>, CalendarValueType<MappedDateValue<T>, M>> {
  /**
   * Whether single or multiple selection is enabled.
   *
   * @default 'single'
   */
  selectionMode?: M;
  /**
   * Callback that is called for each date of the calendar. If it returns true, then the date is
   * unavailable.
   */
  isDateUnavailable?: (date: DateValue) => boolean;
}

export interface CalendarStateOptions<
  T extends DateValue = DateValue,
  M extends CalendarSelectionMode = 'single'
> extends CalendarProps<T, M> {
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
 * Provides state management for a calendar component.
 * A calendar displays one or more date grids and allows users to select a single date.
 */
export function useCalendarState<
  T extends DateValue = DateValue,
  M extends CalendarSelectionMode = 'single'
>(props: CalendarStateOptions<T, M>): CalendarState<M> {
  let defaultFormatter = createMemo(() => new DateFormatter(props.locale));
  let resolvedOptions = createMemo(() => defaultFormatter().resolvedOptions());
  let defaultDuration: DateDuration = {months: 1};
  let visibleDuration = () => props.visibleDuration ?? defaultDuration;
  let selectionMode = () => props.selectionMode ?? 'single' as M;
  let calendar = createMemo(() => props.createCalendar(resolvedOptions().calendar as CalendarIdentifier));

  let [value, setControlledValue] = useControlledState<
    T | T[] | null,
    MappedDateValue<T> | MappedDateValue<T>[] | null
  >(() => props.value as Exclude<T, undefined> | T[] | null | undefined,
    untrack(() => props.defaultValue as Exclude<T, undefined> | T[] | null) ?? null,
    value => props.onChange?.(value as CalendarValueType<MappedDateValue<T>, M>));
  let calendarDateValue = createMemo(() => {
    let current = value();
    if (Array.isArray(current)) {
      return current.map(value => toCalendar(toCalendarDate(value), calendar()));
    } else {
      return current ? toCalendar(toCalendarDate(current), calendar()) : null;
    }
  });
  let timeZone = createMemo(() => {
    let current = value();
    let val = Array.isArray(current) ? current[0] : current;
    return val && 'timeZone' in val ? val.timeZone : resolvedOptions().timeZone;
  });
  let focusedCalendarDate = createMemo(
    () =>
      props.focusedValue
        ? constrainValue(
            toCalendar(toCalendarDate(props.focusedValue), calendar()),
            props.minValue,
            props.maxValue
          )
        : undefined
  );
  let defaultFocusedCalendarDate = createMemo(() => {
    if (props.defaultFocusedValue) {
      return constrainValue(
        toCalendar(toCalendarDate(props.defaultFocusedValue), calendar()),
        props.minValue,
        props.maxValue
      );
    }

    let current = calendarDateValue();
    if (current) {
      return constrainValue(
        Array.isArray(current) ? current[0] : current,
        props.minValue,
        props.maxValue
      );
    }

    return constrainValue(toCalendar(today(timeZone()), calendar()), props.minValue, props.maxValue);
  });
  let [focusedState, setFocusedState] = useControlledState<CalendarDate>(
    focusedCalendarDate,
    untrack(defaultFocusedCalendarDate),
    date => props.onFocusChange?.(date)
  );
  let focusedDate = createMemo(() => constrainValue(toCalendar(focusedState(), calendar()), props.minValue, props.maxValue));
  let getStartDate = () => {
    switch (props.selectionAlignment) {
      case 'start':
        return alignStart(focusedDate(), visibleDuration(), props.locale, props.minValue, props.maxValue);
      case 'end':
        return alignEnd(focusedDate(), visibleDuration(), props.locale, props.minValue, props.maxValue);
      case 'center':
      default:
        return alignCenter(focusedDate(), visibleDuration(), props.locale, props.minValue, props.maxValue);
    }
  };

  let [requestedStart, setRequestedStart] = createSignal<CalendarDate | null>(null);
  let [isFocused, setFocused] = createSignal(untrack(() => props.autoFocus || false));
  let getEndDate = (start: CalendarDate) => {
    let duration = {...visibleDuration()};
    if (duration.days) {
      duration.days--;
    } else {
      duration.days = -1;
    }
    return start.add(duration);
  };

  // This memo retains the source's real range history. Duration/calendar resets
  // and keeping focus in range are derivations, not setter writes during render.
  interface RangeProjection {
    start: CalendarDate;
    duration: DateDuration;
    calendar: Calendar;
    request: CalendarDate | null;
  }
  let range = createMemo<RangeProjection>(previous => {
    let duration = visibleDuration();
    let currentCalendar = calendar();
    let request = requestedStart();
    let focus = focusedDate();
    let start = previous?.start ?? getStartDate();
    if (request && request !== previous?.request) {
      start = request;
    }
    if (previous && !isEqualDuration(duration, previous.duration)) {
      start = getStartDate();
    }
    if (previous && !isEqualCalendar(currentCalendar, previous.calendar)) {
      start = alignCenter(focus, duration, props.locale, props.minValue, props.maxValue);
    }
    if (focus.compare(start) < 0) {
      start = alignEnd(focus, duration, props.locale, props.minValue, props.maxValue);
    } else if (focus.compare(getEndDate(start)) > 0) {
      start = alignStart(focus, duration, props.locale, props.minValue, props.maxValue);
    }
    return {start, duration, calendar: currentCalendar, request};
  });
  // Focus changes within the visible range do not change the source startDate
  // state. Keep that boundary so grids retain their cells while focus moves.
  let startDate = createMemo(() => range().start);
  let endDate = createMemo(() => getEndDate(startDate()));

  // Accept same-turn focus requests explicitly; signal readers stay staged and
  // a controlled parent still owns the displayed focus. Reset the command image
  // after that turn rather than flushing production state.
  let pendingFocus: CalendarDate | null = null;
  let pendingStart: CalendarDate | null = null;
  let commandFocus = () => pendingFocus ?? focusedDate();
  let commandStart = () => pendingStart ?? startDate();
  let setFocusedDate = (date: CalendarDate) => {
    pendingFocus = date;
    setFocusedState(date);
    queueMicrotask(() => {pendingFocus = null;});
  };
  let setStartDate = (date: CalendarDate) => {
    pendingStart = date;
    setRequestedStart(date);
    queueMicrotask(() => {pendingStart = null;});
  };

  // Source normalization also notifies onFocusChange. Publish that request after
  // the derived DOM state settles, without a reactive effect writing its input.
  let lastCalendar = untrack(calendar);
  createEffect(() => ({
    calendar: calendar(),
    focused: focusedDate(),
    needsConstraint: isInvalid(focusedState(), props.minValue, props.maxValue)
  }), current => {
    let changedCalendar = !isEqualCalendar(current.calendar, lastCalendar);
    lastCalendar = current.calendar;
    let cancelled = false;
    if (changedCalendar || current.needsConstraint) {
      onSettled(() => {if (!cancelled) setFocusedDate(current.focused);});
    }
    return () => {cancelled = true;};
  });

  // Sets focus to a specific cell date
  function focusCell(date: CalendarDate) {
    date = constrainValue(date, props.minValue, props.maxValue);
    setFocusedDate(date);
  }

  function normalizeValue(newValue: CalendarDate, currentValue = value()) {
    let constrained = constrainValue(newValue, props.minValue, props.maxValue);
    let lowerBound = props.minValue ?? minDate(constrained, startDate());
    let prev = previousAvailableDate(constrained, lowerBound, props.isDateUnavailable);
    if (!prev) {
      return null;
    }

    // The display calendar should not have any effect on the emitted value.
    // Emit dates in the same calendar as the original value, if any, otherwise gregorian.
    let baseValue = Array.isArray(currentValue) ? currentValue[0] : currentValue;
    let calendarValue = toCalendar(prev, baseValue?.calendar || new GregorianCalendar());

    // Preserve time if the input value had one.
    if (baseValue && 'hour' in baseValue) {
      return baseValue.set(calendarValue) as T;
    }

    return calendarValue as T;
  }

  function setValue(newValue: CalendarDate | CalendarDate[] | null) {
    if (!props.isDisabled && !props.isReadOnly) {
      if (newValue === null) {
        setControlledValue(selectionMode() === 'multiple' ? [] : null);
        return;
      }

      if (Array.isArray(newValue)) {
        setControlledValue(newValue.map(date => normalizeValue(date)).filter(Boolean) as any);
      } else {
        let localValue = normalizeValue(newValue);
        if (localValue) {
          setControlledValue(localValue as any);
        }
      }
    }
  }

  let isUnavailable = createMemo(() => {
    let current = calendarDateValue();
    if (!current) {
      return false;
    }

    if (Array.isArray(current)) {
      return current.some(
        date => props.isDateUnavailable?.(date) || isInvalid(date, props.minValue, props.maxValue)
      );
    }

    return (
      props.isDateUnavailable?.(current) || isInvalid(current, props.minValue, props.maxValue)
    );
  });
  let isValueInvalid = () => props.isInvalid || props.validationState === 'invalid' || isUnavailable();
  let validationState = (): ValidationState | null => isValueInvalid() ? 'invalid' : null;

  let pageDuration = createMemo(() => {
    if ((props.pageBehavior ?? 'visible') === 'visible') {
      return visibleDuration();
    }

    return unitDuration(visibleDuration());
  });

  let visibleRange = {
    get start() {return startDate();},
    get end() {return endDate();}
  };

  return {
    get isDisabled() {return props.isDisabled ?? false;},
    get isReadOnly() {return props.isReadOnly ?? false;},
    get value() {return calendarDateValue() as CalendarValueType<CalendarDate | null, M>;},
    setValue: setValue as any,
    get selectionMode() {return selectionMode();},
    get visibleDuration() {return visibleDuration();},
    visibleRange,
    get minValue() {return props.minValue;},
    get maxValue() {return props.maxValue;},
    get focusedDate() {return focusedDate();},
    get timeZone() {return timeZone();},
    get validationState() {return validationState();},
    get isValueInvalid() {return isValueInvalid();},
    setFocusedDate(date) {
      focusCell(date);
    },
    focusNextDay() {
      focusCell(commandFocus().add({days: 1}));
    },
    focusPreviousDay() {
      focusCell(commandFocus().subtract({days: 1}));
    },
    focusNextRow() {
      if (visibleDuration().days) {
        this.focusNextPage();
      } else if (visibleDuration().weeks || visibleDuration().months || visibleDuration().years) {
        focusCell(commandFocus().add({weeks: 1}));
      }
    },
    focusPreviousRow() {
      if (visibleDuration().days) {
        this.focusPreviousPage();
      } else if (visibleDuration().weeks || visibleDuration().months || visibleDuration().years) {
        focusCell(commandFocus().subtract({weeks: 1}));
      }
    },
    focusNextPage() {
      let focus = commandFocus();
      let duration = pageDuration();
      let start = commandStart().add(duration);
      setFocusedDate(constrainValue(focus.add(duration), props.minValue, props.maxValue));
      setStartDate(
        alignStart(
          constrainStart(focus, start, duration, props.locale, props.minValue, props.maxValue),
          duration,
          props.locale
        )
      );
    },
    focusPreviousPage() {
      let focus = commandFocus();
      let duration = pageDuration();
      let start = commandStart().subtract(duration);
      setFocusedDate(constrainValue(focus.subtract(duration), props.minValue, props.maxValue));
      setStartDate(
        alignStart(
          constrainStart(focus, start, duration, props.locale, props.minValue, props.maxValue),
          duration,
          props.locale
        )
      );
    },
    focusSectionStart() {
      if (visibleDuration().days) {
        focusCell(commandStart());
      } else if (visibleDuration().weeks) {
        focusCell(startOfWeek(commandFocus(), props.locale));
      } else if (visibleDuration().months || visibleDuration().years) {
        focusCell(startOfMonth(commandFocus()));
      }
    },
    focusSectionEnd() {
      if (visibleDuration().days) {
        focusCell(getEndDate(commandStart()));
      } else if (visibleDuration().weeks) {
        focusCell(endOfWeek(commandFocus(), props.locale));
      } else if (visibleDuration().months || visibleDuration().years) {
        focusCell(endOfMonth(commandFocus()));
      }
    },
    focusNextSection(larger) {
      if (!larger && !visibleDuration().days) {
        focusCell(commandFocus().add(unitDuration(visibleDuration())));
        return;
      }

      if (visibleDuration().days) {
        this.focusNextPage();
      } else if (visibleDuration().weeks) {
        focusCell(commandFocus().add({months: 1}));
      } else if (visibleDuration().months || visibleDuration().years) {
        focusCell(commandFocus().add({years: 1}));
      }
    },
    focusPreviousSection(larger) {
      if (!larger && !visibleDuration().days) {
        focusCell(commandFocus().subtract(unitDuration(visibleDuration())));
        return;
      }

      if (visibleDuration().days) {
        this.focusPreviousPage();
      } else if (visibleDuration().weeks) {
        focusCell(commandFocus().subtract({months: 1}));
      } else if (visibleDuration().months || visibleDuration().years) {
        focusCell(commandFocus().subtract({years: 1}));
      }
    },
    selectFocusedDate() {
      let date = commandFocus();
      if (!(props.isDateUnavailable && props.isDateUnavailable(date))) {
        this.selectDate(date);
      }
    },
    selectDate(date) {
      if (props.isDisabled || props.isReadOnly) {
        return;
      }

      if (selectionMode() === 'multiple' && date != null) {
        setControlledValue(current => {
          let newDate = normalizeValue(date, current);
          if (!newDate) {
            return current;
          }

          let baseValue: T[] = [];
          if (Array.isArray(current)) {
            baseValue = current;
          } else if (current != null) {
            baseValue = [current];
          }

          let index = baseValue.findIndex(value => isSameDay(value, newDate));
          return index >= 0
            ? baseValue.slice(0, index).concat(baseValue.slice(index + 1))
            : [...baseValue, newDate];
        });
      } else {
        setValue(date);
      }
    },
    get isFocused() {return isFocused();},
    setFocused: value => {setFocused(value);},
    isInvalid(date) {
      return isInvalid(date, props.minValue, props.maxValue);
    },
    isSelected(date) {
      let current = calendarDateValue();
      if (!current || this.isCellDisabled(date) || this.isCellUnavailable(date)) {
        return false;
      }
      return Array.isArray(current)
        ? current.some(value => isSameDay(value, date))
        : isSameDay(date, current);
    },
    isCellFocused(date) {
      return isFocused() && isSameDay(date, focusedDate());
    },
    isCellDisabled(date) {
      return (
        props.isDisabled ||
        date.compare(startDate()) < 0 ||
        date.compare(endDate()) > 0 ||
        this.isInvalid(date)
      );
    },
    isCellUnavailable(date) {
      return props.isDateUnavailable ? props.isDateUnavailable(date) : false;
    },
    isPreviousVisibleRangeInvalid() {
      let start = startDate();
      let prev = start.subtract({days: 1});
      return isSameDay(prev, start) || this.isInvalid(prev);
    },
    isNextVisibleRangeInvalid() {
      // Adding may return the same date if we reached the end of time
      // according to the calendar system (e.g. 9999-12-31).
      let end = endDate();
      let next = end.add({days: 1});
      return isSameDay(next, end) || this.isInvalid(next);
    },
    getDatesInWeek(weekIndex, from = startDate()) {
      let date = from.add({weeks: weekIndex});
      let dates: (CalendarDate | null)[] = [];

      let duration = visibleDuration();
      let days = duration.days && duration.days < 7 ? duration.days : 7;
      if (days === 7) {
        date = startOfWeek(date, props.locale, props.firstDayOfWeek);

        // startOfWeek will clamp dates within the calendar system's valid range, which may
        // start in the middle of a week. In this case, add null placeholders.
        let dayOfWeek = getDayOfWeek(date, props.locale, props.firstDayOfWeek);
        for (let i = 0; i < dayOfWeek; i++) {
          dates.push(null);
        }
      }

      while (dates.length < days) {
        dates.push(date);
        let nextDate = date.add({days: 1});
        if (isSameDay(date, nextDate)) {
          // If the next day is the same, we have hit the end of the calendar system.
          break;
        }
        date = nextDate;
      }

      // Add null placeholders if at the end of the calendar system.
      while (dates.length < days) {
        dates.push(null);
      }

      return dates;
    },
    getWeeksInMonth(date = startDate()) {
      let duration = visibleDuration();
      let weeks = props.weeksInMonth || getWeeksInMonth(date, props.locale, props.firstDayOfWeek);
      if (duration.weeks || duration.days) {
        weeks = duration.weeks ?? 0;
        if (duration.days) {
          weeks += Math.ceil(duration.days / 7);
        }
      }
      return weeks;
    }
  };
}

function unitDuration(duration: DateDuration) {
  let unit = {...duration};
  for (let key in duration) {
    unit[key as keyof DateDuration] = 1;
  }
  return unit;
}
