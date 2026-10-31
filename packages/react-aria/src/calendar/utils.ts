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
  endOfMonth,
  isSameDay,
  startOfMonth
} from '@internationalized/date';
import {CalendarSelectionMode, CalendarState} from 'react-stately/useCalendarState';
import intlMessages from '../../intl/calendar/*.json';
import type {LocalizedStringFormatter} from '@internationalized/string';
import {RangeCalendarState} from 'react-stately/useRangeCalendarState';
import {useDateFormatter} from '../i18n/useDateFormatter';
import {useLocale} from '../i18n/I18nProvider';
import {useLocalizedStringFormatter} from '../i18n/useLocalizedStringFormatter';
import {createMemo, type Accessor} from 'solid-js';

interface HookData {
  ariaLabel?: string;
  ariaLabelledBy?: string;
  errorMessageId: string | undefined;
  selectedDateDescription: string;
}

export const hookData: WeakMap<
  CalendarState<CalendarSelectionMode> | RangeCalendarState,
  HookData
> = new WeakMap<CalendarState<CalendarSelectionMode> | RangeCalendarState, HookData>();

export function getEraFormat(date: CalendarDate | undefined): 'short' | undefined {
  return date?.calendar.identifier === 'gregory' && date.era === 'BC' ? 'short' : undefined;
}

export function useSelectedDateDescription(
  state: CalendarState<'single' | 'multiple'> | RangeCalendarState
): Accessor<string> {
  let stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-aria/calendar');

  let range = createMemo(() => {
  let start: CalendarDate | undefined, end: CalendarDate | undefined;
  if ('highlightedRange' in state) {
    ({start, end} = state.highlightedRange || {});
  } else {
    start = Array.isArray(state.value) ? state.value[0] : (state.value ?? undefined);
    end = Array.isArray(state.value) ? state.value.at(-1) : (state.value ?? undefined);
  }

  return {start, end};
  });
  let dateFormatter = useDateFormatter(() => ({
    weekday: 'long',
    month: 'long',
    year: 'numeric',
    day: 'numeric',
    era: getEraFormat(range().start) || getEraFormat(range().end),
    timeZone: state.timeZone
  }));

  let locale = useLocale();
  let listFormatter = createMemo(() => new Intl.ListFormat(locale.locale));

  return createMemo(() => {
    let {start, end} = range();
    let anchorDate = 'anchorDate' in state ? state.anchorDate : null;
    // No message if currently selecting a range, or there is nothing highlighted.
    if (!anchorDate && start && end) {
      // Use a single date message if the start and end dates are the same day,
      // otherwise include both dates.
      if (isSameDay(start, end)) {
        let date = dateFormatter().format(start.toDate(state.timeZone));
        return stringFormatter.format('selectedDateDescription', {date});
      } else if ('highlightedRange' in state) {
        let dateRange = formatRange(dateFormatter(), stringFormatter, start, end, state.timeZone);
        return stringFormatter.format('selectedRangeDescription', {dateRange});
      } else if (Array.isArray(state.value)) {
        let dates = state.value.map(date => dateFormatter().format(date.toDate(state.timeZone)));
        let formatted = listFormatter().format(dates);
        return stringFormatter.format('selectedDateDescription', {date: formatted});
      }
    }
    return '';
  });
}

export function useVisibleRangeDescription(
  start: CalendarDate | Accessor<CalendarDate>,
  end: CalendarDate | Accessor<CalendarDate>,
  zone: string | Accessor<string>,
  isAria: boolean
): Accessor<string> {
  let startDate = () => typeof start === 'function' ? start() : start;
  let endDate = () => typeof end === 'function' ? end() : end;
  let timeZone = () => typeof zone === 'function' ? zone() : zone;
  let stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-aria/calendar');
  let era = () => getEraFormat(startDate()) || getEraFormat(endDate());
  let monthFormatter = useDateFormatter(() => ({
    month: 'long',
    year: 'numeric',
    era: era(),
    calendar: startDate().calendar.identifier,
    timeZone: timeZone()
  }));

  let dateFormatter = useDateFormatter(() => ({
    month: 'long',
    year: 'numeric',
    day: 'numeric',
    era: era(),
    calendar: startDate().calendar.identifier,
    timeZone: timeZone()
  }));

  return createMemo(() => {
    let start = startDate(), end = endDate(), zone = timeZone();
    // Special case for month granularity. Format as a single month if only a
    // single month is visible, otherwise format as a range of months.
    if (isSameDay(start, startOfMonth(start))) {
      let startMonth = start;
      let endMonth = end;
      if (start.calendar.getFormattableMonth) {
        startMonth = start.calendar.getFormattableMonth(start);
      }
      if (end.calendar.getFormattableMonth) {
        endMonth = end.calendar.getFormattableMonth(end);
      }

      if (isSameDay(end, endOfMonth(start))) {
        return monthFormatter().format(startMonth.toDate(zone));
      } else if (isSameDay(end, endOfMonth(end))) {
        return isAria
          ? formatRange(monthFormatter(), stringFormatter, startMonth, endMonth, zone)
          : monthFormatter().formatRange(startMonth.toDate(zone), endMonth.toDate(zone));
      }
    }

    return isAria
      ? formatRange(dateFormatter(), stringFormatter, start, end, zone)
      : dateFormatter().formatRange(start.toDate(zone), end.toDate(zone));
  });
}

function formatRange(
  dateFormatter: DateFormatter,
  stringFormatter: Pick<LocalizedStringFormatter<string, import('@internationalized/string').LocalizedString>, 'format'>,
  start: CalendarDate,
  end: CalendarDate,
  timeZone: string
) {
  let parts = dateFormatter.formatRangeToParts(start.toDate(timeZone), end.toDate(timeZone));

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
  let startValue = '';
  let endValue = '';
  for (let i = 0; i < parts.length; i++) {
    if (i < separatorIndex) {
      startValue += parts[i].value;
    } else if (i > separatorIndex) {
      endValue += parts[i].value;
    }
  }

  return stringFormatter.format('dateRange', {startDate: startValue, endDate: endValue});
}
