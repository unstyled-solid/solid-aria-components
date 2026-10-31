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
import {AriaCalendarProps, useCalendar} from '../../src/calendar/useCalendar';

import {Button} from '@adobe/react-spectrum/Button';
import {CalendarDate, createCalendar, DateDuration, startOfWeek} from '@internationalized/date';
import {CalendarState, DateValue} from 'react-stately/useCalendarState';
import {RangeCalendarState} from 'react-stately/useRangeCalendarState';
import {merge, For} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {useObjectRef as useRef} from '../../src/utils/useObjectRef';
import {useCalendarCell} from '../../src/calendar/useCalendarCell';
import {useCalendarGrid} from '../../src/calendar/useCalendarGrid';
import {useCalendarState} from 'react-stately/useCalendarState';
import {useDateFormatter} from '../../src/i18n/useDateFormatter';
import {useLocale} from '../../src/i18n/I18nProvider';

export function Example<T extends DateValue | CalendarDate>(
  props: AriaCalendarProps<T> & {visibleDuration: DateDuration}
): JSX.Element {
  let locale = useLocale();
  let visibleDuration = () => props.visibleDuration;

  let state = useCalendarState(merge({
    createCalendar,
  }, props, {get locale() { return locale.locale; }}));

  let {calendarProps, prevButtonProps, nextButtonProps} = useCalendar(props, state);

  let gridCount = () => {
    let gridCount = 1;
    if (visibleDuration().months && visibleDuration().months! > 0) {
      gridCount = visibleDuration().months!;
    }

    return gridCount;
  };

  return (
    <div {...calendarProps as JSX.HTMLAttributes<HTMLDivElement>}>
      <div style={{'text-align': 'center'}} data-testid={'range'}>
        {calendarProps['aria-label']}
      </div>
      <div
        style={{display: 'grid', 'grid-template-columns': `repeat(${gridCount()}, 1fr)`, gap: '1em'}}>
        <For each={[...new Array(gridCount()).keys()]}>{i =>
          <CalendarGrid state={state} visibleDuration={visibleDuration()} offset={{months: i}} />
        }</For>
      </div>
      <div>
        <Button variant={'secondary'} {...prevButtonProps}>
          prev
        </Button>
        <Button variant={'secondary'} {...nextButtonProps}>
          next
        </Button>
      </div>
    </div>
  );
}

function CalendarGrid(props: {
  state: CalendarState | RangeCalendarState;
  visibleDuration: DateDuration;
  offset?: DateDuration;
}) {
  let locale = useLocale();
  let {gridProps, weeksInMonth} = useCalendarGrid({}, props.state);

  let weeks = () => props.visibleDuration.months ? weeksInMonth() : props.visibleDuration.weeks ?? 1;
  let startDate = () => {
    let date = props.state.visibleRange.start.add(props.offset ?? {});
    return props.visibleDuration.months ? startOfWeek(date, locale.locale) : date;
  };
  return (
    <div {...gridProps as JSX.HTMLAttributes<HTMLDivElement>}>
      <For each={[...new Array(weeks()).keys()]}>{weekIndex => (
        <div role="row">
          <For each={[...new Array(props.visibleDuration.days ?? 7).keys()]}>{dayIndex => (
            <Cell
              state={props.state}
              date={startDate().add({weeks: weekIndex, days: dayIndex})}
            />
          )}</For>
        </div>
      )}</For>
    </div>
  );
}

function Cell(props: {date: CalendarDate; state: CalendarState | RangeCalendarState}) {
  let ref = useRef<HTMLSpanElement | null>(null);
  let {cellProps, buttonProps} = useCalendarCell(props, props.state, ref);

  let dateFormatter = useDateFormatter(() => ({
    day: 'numeric',
    timeZone: props.state.timeZone,
    calendar: props.date.calendar.identifier
  }));

  return (
    <div {...cellProps as JSX.HTMLAttributes<HTMLDivElement>} style={{display: 'inline-block'}}>
      <span
        ref={ref}
        {...buttonProps as JSX.HTMLAttributes<HTMLSpanElement>}
        style={{
          display: 'block',
          width: '42px',
          height: '42px',
          background: props.state.isSelected(props.date) ? 'blue' : ''
        }}>
        {dateFormatter().format(props.date.toDate(props.state.timeZone))}
      </span>
    </div>
  );
}

export function ExampleCustomFirstDay(props: AriaCalendarProps<DateValue>): JSX.Element {
  let locale = useLocale();

  let state = useCalendarState(merge({
    createCalendar,
  }, props, {get locale() { return locale.locale; }}));

  let {calendarProps, prevButtonProps, nextButtonProps} = useCalendar(props, state);

  return (
    <div {...calendarProps as JSX.HTMLAttributes<HTMLDivElement>}>
      <div style={{'text-align': 'center'}} data-testid={'range'}>
        {calendarProps['aria-label']}
      </div>
      <div style={{display: 'grid', 'grid-template-columns': 'repeat(1, 1fr)', gap: '1em'}}>
        <ExampleFirstDayCalendarGrid state={state} firstDayOfWeek={props.firstDayOfWeek} />
      </div>
      <div>
        <Button variant={'secondary'} {...prevButtonProps}>
          prev
        </Button>
        <Button variant={'secondary'} {...nextButtonProps}>
          next
        </Button>
      </div>
    </div>
  );
}

function ExampleFirstDayCalendarGrid(props: {
  state: CalendarState | RangeCalendarState;
  firstDayOfWeek?: 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';
}) {
  let {gridProps, weeksInMonth} = useCalendarGrid({get firstDayOfWeek() { return props.firstDayOfWeek; }}, props.state);
  return (
    <div {...gridProps as JSX.HTMLAttributes<HTMLDivElement>}>
      <For each={[...new Array(weeksInMonth()).keys()]}>{weekIndex => (
        <div role="row">
          <For each={props.state.getDatesInWeek(weekIndex, props.state.visibleRange.start)} keyed={false}>{date => (
            <Cell state={props.state} date={date()!} />
          )}</For>
        </div>
      )}</For>
    </div>
  );
}
