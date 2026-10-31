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

import {CalendarDate, startOfWeek, today} from '@internationalized/date';
import {CalendarSelectionMode, CalendarState} from 'react-stately/useCalendarState';
import {DOMAttributes} from '@react-types/shared';
import {hookData, useVisibleRangeDescription} from './utils';
import {mergeProps} from '../utils/mergeProps';
import {RangeCalendarState} from 'react-stately/useRangeCalendarState';
import {useDateFormatter} from '../i18n/useDateFormatter';
import {useKeyboard} from '../interactions/useKeyboard';
import {useLabels} from '../utils/useLabels';
import {useLocale} from '../i18n/I18nProvider';
import {createMemo, type Accessor} from 'solid-js';

export interface AriaCalendarGridProps {
  /**
   * The first date displayed in the calendar grid.
   * Defaults to the first visible date in the calendar.
   * Override this to display multiple date grids in a calendar.
   */
  startDate?: CalendarDate;
  /**
   * The last date displayed in the calendar grid.
   * Defaults to the last visible date in the calendar.
   * Override this to display multiple date grids in a calendar.
   */
  endDate?: CalendarDate;
  /**
   * The style of weekday names to display in the calendar grid header,
   * e.g. single letter, abbreviation, or full day name.
   *
   * @default 'narrow'
   */
  weekdayStyle?: 'narrow' | 'short' | 'long';
  /**
   * The day that starts the week.
   */
  firstDayOfWeek?: 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';
}

export interface CalendarGridAria {
  /** Props for the date grid element (e.g. `<table>`). */
  gridProps: DOMAttributes;
  /** Props for the grid header element (e.g. `<thead>`). */
  headerProps: DOMAttributes;
  /**
   * A list of week day abbreviations formatted for the current locale, typically used in column
   * headers.
   */
  weekDays: Accessor<string[]>;
  /** The number of weeks in the month. */
  weeksInMonth: Accessor<number>;
}

/**
 * Provides the behavior and accessibility implementation for a calendar grid component.
 * A calendar grid displays a single grid of days within a calendar or range calendar which
 * can be keyboard navigated and selected by the user.
 */
export function useCalendarGrid(
  props: AriaCalendarGridProps,
  state: CalendarState<CalendarSelectionMode> | RangeCalendarState
): CalendarGridAria {
  let startDate = () => props.startDate ?? state.visibleRange.start;
  let endDate = () => props.endDate ?? state.visibleRange.end;

  let locale = useLocale();

  let {keyboardProps} = useKeyboard({
    shortcuts: {
      End: () => {
        state.focusSectionEnd();
      },
      Home: () => {
        state.focusSectionStart();
      },
      Escape: () => {
        // Cancel the selection.
        if ('setAnchorDate' in state) {
          state.setAnchorDate(null);
        }
        return false; // TODO: is this really correct? or should it return true when we cancel and only propagate if there's nothing to do
      }
    }
  });

  let {keyboardProps: repeatKeyboardProps} = useKeyboard({
    shortcuts: {
      Enter: () => {
        state.selectFocusedDate();
      },
      ' ': () => {
        state.selectFocusedDate();
      },
      PageUp: () => {
        state.focusPreviousSection();
      },
      'Shift+PageUp': () => {
        state.focusPreviousSection(true);
      },
      PageDown: () => {
        state.focusNextSection();
      },
      'Shift+PageDown': () => {
        state.focusNextSection(true);
      },
      ArrowLeft: () => {
        if (locale.direction === 'rtl') {
          state.focusNextDay();
        } else {
          state.focusPreviousDay();
        }
      },
      ArrowUp: () => {
        state.focusPreviousRow();
      },
      ArrowRight: () => {
        if (locale.direction === 'rtl') {
          state.focusPreviousDay();
        } else {
          state.focusNextDay();
        }
      },
      ArrowDown: () => {
        state.focusNextRow();
      }
    },
    allowRepeats: true
  });

  let visibleRangeDescription = useVisibleRangeDescription(
    startDate,
    endDate,
    () => state.timeZone,
    true
  );

  let metadata = hookData.get(state)!;
  let labelProps = useLabels({
    get 'aria-label'() { return [metadata.ariaLabel, visibleRangeDescription()].filter(Boolean).join(', '); },
    get 'aria-labelledby'() { return metadata.ariaLabelledBy; }
  });

  let dayFormatter = useDateFormatter(() => ({
    weekday: props.weekdayStyle || 'narrow',
    timeZone: state.timeZone
  }));
  let weekDays = createMemo(() => {
    let isDayView = state.visibleDuration.days && state.visibleDuration.days < 7;
    let weekStart = isDayView
      ? startDate()
      : startOfWeek(today(state.timeZone), locale.locale, props.firstDayOfWeek);
    let days = isDayView ? state.visibleDuration.days! : 7;
    return [...new Array(days).keys()].map(index => {
      let date = weekStart.add({days: index});
      let dateDay = date.toDate(state.timeZone);
      return dayFormatter().format(dateDay);
    });
  });
  let weeksInMonth = () => state.getWeeksInMonth(startDate());

  return {
    gridProps: mergeProps(
      labelProps,
      {
        role: 'grid' as const,
        get 'aria-readonly'() { return state.isReadOnly ? 'true' as const : undefined; },
        get 'aria-disabled'() { return state.isDisabled ? 'true' as const : undefined; },
        get 'aria-multiselectable'() { return 'highlightedRange' in state || state.selectionMode === 'multiple' ? 'true' as const : undefined; },
        onFocus: () => state.setFocused(true),
        onBlur: () => state.setFocused(false)
      },
      keyboardProps,
      repeatKeyboardProps
    ),
    headerProps: {
      // Column headers are hidden to screen readers to make navigating with a touch screen reader easier.
      // The day names are already included in the label of each cell, so there's no need to announce them twice.
      'aria-hidden': 'true'
    },
    weekDays,
    weeksInMonth
  };
}
