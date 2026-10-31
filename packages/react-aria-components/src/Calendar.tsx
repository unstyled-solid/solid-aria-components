/*
 * Copyright 2022 Adobe. All rights reserved.
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
  CalendarHeadingProps as AriaCalendarHeadingProps,
  CalendarMonthPickerProps as AriaCalendarMonthPickerProps,
  AriaCalendarProps,
  CalendarYearPickerProps as AriaCalendarYearPickerProps,
  CalendarMonthPickerAria,
  CalendarYearPickerAria,
  useCalendar,
  useCalendarCell,
  useCalendarGrid,
  useCalendarHeading,
  useCalendarMonthPicker,
  useCalendarYearPicker
} from 'react-aria/useCalendar';
import {AriaRangeCalendarProps, useRangeCalendar} from 'react-aria/useRangeCalendar';
import {ButtonContext} from './Button';
import {
  CalendarDate,
  CalendarIdentifier,
  createCalendar,
  DateDuration,
  endOfMonth,
  Calendar as ICalendar,
  isSameDay,
  isSameMonth,
  isToday
} from '@internationalized/date';
import {CalendarSelectionMode, CalendarState} from 'react-stately/useCalendarState';
import {
  ClassNameOrFunction,
  ContextValue,
  dom,
  DOMProps,
  DOMRenderProps,
  Provider,
  RenderProps,
  SlotProps,
  StyleProps,
  useContextProps,
  useRenderProps,
  useSlottedContext
} from './utils';
import {DateValue, useRangeCalendarState} from 'react-stately/useRangeCalendarState';
import {
  DOMAttributes,
  FocusableElement,
  GlobalDOMAttributes,
  HoverEvents
} from '@react-types/shared';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {Heading, HeadingContext, HeadingProps} from './Heading';
import {mergeProps} from 'react-aria/mergeProps';
import {RangeCalendarState} from 'react-stately/useRangeCalendarState';
import {createContext, For, merge, omit, useContext, type Ref} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {useObjectRef, type Ref as ObjectRefInput} from 'react-aria/private/utils/useObjectRef';
import {useSyncRef} from 'react-aria/private/utils/useSyncRef';
import {TextContext} from './Text';
import {useCalendarState} from 'react-stately/useCalendarState';
import {useFocusRing} from 'react-aria/useFocusRing';
import {useHover} from 'react-aria/useHover';
import {useLocale} from 'react-aria/I18nProvider';
import {VisuallyHidden} from 'react-aria/VisuallyHidden';

export interface CalendarRenderProps<M extends CalendarSelectionMode = 'single'> {
  /**
   * Whether the calendar is disabled.
   *
   * @selector [data-disabled]
   */
  isDisabled: boolean;
  /**
   * State of the calendar.
   */
  state: CalendarState<M>;
  /**
   * Whether the calendar is invalid.
   *
   * @selector [data-invalid]
   */
  isInvalid: boolean;
}

export interface RangeCalendarRenderProps extends Omit<CalendarRenderProps, 'state'> {
  /**
   * State of the range calendar.
   */
  state: RangeCalendarState;
}

export interface CalendarProps<T extends DateValue, M extends CalendarSelectionMode = 'single'>
  extends
    Omit<AriaCalendarProps<T, M>, 'errorMessage' | 'validationState'>,
    RenderProps<CalendarRenderProps<M>, 'div'>,
    SlotProps,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-Calendar'
   */
  className?: ClassNameOrFunction<CalendarRenderProps<M>>;
  /**
   * The amount of days that will be displayed at once. This affects how pagination works.
   *
   * @default { months: 1 }
   */
  visibleDuration?: DateDuration;
  /**
   * A function to create a new
   * [Calendar](https://react-spectrum.adobe.com/internationalized/date/Calendar.html) object for a
   * given calendar identifier. If not provided, the `createCalendar` function from
   * `@internationalized/date` will be used.
   */
  createCalendar?: (identifier: CalendarIdentifier) => ICalendar;
}

export interface RangeCalendarProps<T extends DateValue>
  extends
    Omit<AriaRangeCalendarProps<T>, 'errorMessage' | 'validationState'>,
    RenderProps<RangeCalendarRenderProps, 'div'>,
    SlotProps,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-RangeCalendar'
   */
  className?: ClassNameOrFunction<RangeCalendarRenderProps>;
  /**
   * The amount of days that will be displayed at once. This affects how pagination works.
   *
   * @default { months: 1 }
   */
  visibleDuration?: DateDuration;
  /**
   * A function to create a new
   * [Calendar](https://react-spectrum.adobe.com/internationalized/date/Calendar.html) object for a
   * given calendar identifier. If not provided, the `createCalendar` function from
   * `@internationalized/date` will be used.
   */
  createCalendar?: (identifier: CalendarIdentifier) => ICalendar;
}

export const CalendarContext =
  createContext<ContextValue<CalendarProps<any, CalendarSelectionMode>, HTMLDivElement>>(null);
export const RangeCalendarContext =
  createContext<ContextValue<RangeCalendarProps<any>, HTMLDivElement>>(null);
export const CalendarStateContext = createContext<CalendarState<CalendarSelectionMode> | null>(
  null
);
export const RangeCalendarStateContext = createContext<RangeCalendarState | null>(null);

/**
 * A calendar displays one or more date grids and allows users to select a single date.
 */
export function Calendar<
  T extends DateValue,
  M extends CalendarSelectionMode = 'single'
>(inputProps: Omit<CalendarProps<T, M>, 'ref'> & {ref?: ObjectRefInput<HTMLDivElement>}) {
  let localRef = useObjectRef<HTMLDivElement>();
  useSyncRef(inputProps, localRef);
  let [props, ref] = useContextProps(inputProps, localRef, CalendarContext);
  let locale = useLocale();
  let state = useCalendarState(mergeProps(props, {
    get locale() { return locale.locale; },
    get createCalendar() { return props.createCalendar || createCalendar; }
  }));

  let aria = useCalendar(
    props,
    state
  );
  let {calendarProps, prevButtonProps, nextButtonProps, errorMessageProps} = aria;

  let renderProps = useRenderProps(merge(props, {
    get children() {
      let children = inputProps.children;
      return children !== undefined ? children : props.children;
    },
    values: {
      state,
      get isDisabled() { return props.isDisabled || false; },
      get isInvalid() { return state.isValueInvalid; }
    },
    defaultClassName: 'react-aria-Calendar'
  }));

  let DOMProps = filterDOMProps(props, {global: true});

  return (
    <dom.div
      {...mergeProps(DOMProps, renderProps, calendarProps)}
      ref={ref}
      slot={props.slot || undefined}
      data-disabled={props.isDisabled || undefined}
      data-invalid={state.isValueInvalid || undefined}>
      <Provider
        values={[
          [
            ButtonContext,
            {
              slots: {
                previous: prevButtonProps,
                next: nextButtonProps
              }
            }
          ],
          [HeadingContext, {'aria-hidden': 'true', level: 2, get children() { return aria.title(); }}],
          [CalendarStateContext, state],
          [CalendarContext, props as any],
          [
            TextContext,
            {
              slots: {
                errorMessage: {get id() { return errorMessageProps.id; }}
              }
            }
          ]
        ]}>
        {/* Add a screen reader only description of the entire visible range rather than
         * a separate heading above each month grid. This is placed first in the DOM order
         * so that it is the first thing a touch screen reader user encounters.
         * In addition, VoiceOver on iOS does not announce the aria-label of the grid
         * elements, so the aria-label of the Calendar is included here as well. */}
        <VisuallyHidden>
          <h2>{calendarProps['aria-label']}</h2>
        </VisuallyHidden>
        {renderProps.children}
        {/* For touch screen readers, add a visually hidden next button after the month grid
         * so it's easy to navigate after reaching the end without going all the way
         * back to the start of the month. */}
        <VisuallyHidden>
          <button
            aria-label={nextButtonProps['aria-label']}
            disabled={nextButtonProps.isDisabled}
            onClick={() => state.focusNextPage()}
            tabindex={-1}
          />
        </VisuallyHidden>
      </Provider>
    </dom.div>
  );
}

/**
 * A range calendar displays one or more date grids and allows users to select a contiguous range of
 * dates.
 */
export function RangeCalendar<
  T extends DateValue
>(inputProps: Omit<RangeCalendarProps<T>, 'ref'> & {ref?: ObjectRefInput<HTMLDivElement>}) {
  let localRef = useObjectRef<HTMLDivElement>();
  useSyncRef(inputProps, localRef);
  let [props, ref] = useContextProps(inputProps, localRef, RangeCalendarContext);
  let domRef = useObjectRef<HTMLDivElement>();
  let locale = useLocale();
  let state = useRangeCalendarState(mergeProps(props, {
    get locale() { return locale.locale; },
    get createCalendar() { return props.createCalendar || createCalendar; }
  }));

  let aria = useRangeCalendar(props, state, domRef);
  let {calendarProps, prevButtonProps, nextButtonProps, errorMessageProps} = aria;

  let renderProps = useRenderProps(merge(props, {
    get children() {
      let children = inputProps.children;
      return children !== undefined ? children : props.children;
    },
    values: {
      state,
      get isDisabled() { return props.isDisabled || false; },
      get isInvalid() { return state.isValueInvalid; }
    },
    defaultClassName: 'react-aria-RangeCalendar'
  }));

  let DOMProps = filterDOMProps(props, {global: true});

  return (
    <dom.div
      {...mergeProps(renderProps, DOMProps, calendarProps)}
      ref={[ref, domRef]}
      slot={props.slot || undefined}
      data-disabled={props.isDisabled || undefined}
      data-invalid={state.isValueInvalid || undefined}>
      <Provider
        values={[
          [
            ButtonContext,
            {
              slots: {
                previous: prevButtonProps,
                next: nextButtonProps
              }
            }
          ],
          [HeadingContext, {'aria-hidden': 'true', level: 2, get children() { return aria.title(); }}],
          [RangeCalendarStateContext, state],
          [RangeCalendarContext, props as RangeCalendarProps<any>],
          [
            TextContext,
            {
              slots: {
                errorMessage: {get id() { return errorMessageProps.id; }}
              }
            }
          ]
        ]}>
        {/* Add a screen reader only description of the entire visible range rather than
         * a separate heading above each month grid. This is placed first in the DOM order
         * so that it is the first thing a touch screen reader user encounters.
         * In addition, VoiceOver on iOS does not announce the aria-label of the grid
         * elements, so the aria-label of the Calendar is included here as well. */}
        <VisuallyHidden>
          <h2>{calendarProps['aria-label']}</h2>
        </VisuallyHidden>
        {renderProps.children}
        {/* For touch screen readers, add a visually hidden next button after the month grid
         * so it's easy to navigate after reaching the end without going all the way
         * back to the start of the month. */}
        <VisuallyHidden>
          <button
            aria-label={nextButtonProps['aria-label']}
            disabled={nextButtonProps.isDisabled}
            onClick={() => state.focusNextPage()}
            tabindex={-1}
          />
        </VisuallyHidden>
      </Provider>
    </dom.div>
  );
}

export interface CalendarCellRenderProps {
  /** The date that the cell represents. */
  date: CalendarDate;
  /** The day number formatted according to the current locale. */
  formattedDate: string;
  /**
   * Whether the cell is currently hovered with a mouse.
   *
   * @selector [data-hovered]
   */
  isHovered: boolean;
  /**
   * Whether the cell is currently being pressed.
   *
   * @selector [data-pressed]
   */
  isPressed: boolean;
  /**
   * Whether the cell is selected.
   *
   * @selector [data-selected]
   */
  isSelected: boolean;
  /**
   * Whether the cell is the first date in a range selection.
   *
   * @selector [data-selection-start]
   */
  isSelectionStart: boolean;
  /**
   * Whether the cell is the last date in a range selection.
   *
   * @selector [data-selection-end]
   */
  isSelectionEnd: boolean;
  /**
   * Whether the cell is focused.
   *
   * @selector [data-focused]
   */
  isFocused: boolean;
  /**
   * Whether the cell is keyboard focused.
   *
   * @selector [data-focus-visible]
   */
  isFocusVisible: boolean;
  /**
   * Whether the cell is disabled, according to the calendar's `minValue`, `maxValue`, and
   * `isDisabled` props. Disabled dates are not focusable, and cannot be selected by the user. They
   * are typically displayed with a dimmed appearance.
   *
   * @selector [data-disabled]
   */
  isDisabled: boolean;
  /**
   * Whether the cell is outside the visible range of the calendar.
   * For example, dates before the first day of a month in the same week.
   *
   * @selector [data-outside-visible-range]
   */
  isOutsideVisibleRange: boolean;
  /**
   * Whether the cell is outside the current month.
   *
   * @selector [data-outside-month]
   */
  isOutsideMonth: boolean;
  /**
   * Whether the cell is unavailable, according to the calendar's `isDateUnavailable` prop.
   * Unavailable dates remain focusable, but cannot be selected by the user. They should be
   * displayed with a visual affordance to indicate they are unavailable, such as a different color
   * or a strikethrough.
   *
   * Note that because they are focusable, unavailable dates must meet a 4.5:1 color contrast ratio,
   * [as defined by WCAG](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html).
   *
   * @selector [data-unavailable]
   */
  isUnavailable: boolean;
  /**
   * Whether the cell is part of an invalid selection.
   *
   * @selector [data-invalid]
   */
  isInvalid: boolean;
  /**
   * Whether the cell is today.
   *
   * @selector [data-today]
   */
  isToday: boolean;
}

export interface CalendarGridProps
  extends StyleProps, DOMRenderProps<'table', undefined>, GlobalDOMAttributes<HTMLTableElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element.
   *
   * @default 'react-aria-CalendarGrid'
   */
  className?: string;
  /**
   * Either a function to render calendar cells for each date in the month,
   * or children containing a `<CalendarGridHeader>`` and `<CalendarGridBody>`
   * when additional customization is needed.
   */
  children?: JSX.Element | ((date: CalendarDate) => JSX.Element);
  /**
   * An offset from the beginning of the visible date range that this
   * CalendarGrid should display. Useful when displaying more than one
   * month at a time.
   */
  offset?: DateDuration;
  /**
   * The style of weekday names to display in the calendar grid header,
   * e.g. single letter, abbreviation, or full day name.
   *
   * @default 'narrow'
   */
  weekdayStyle?: 'narrow' | 'short' | 'long';
}

interface InternalCalendarGridContextValue {
  headerProps: DOMAttributes<FocusableElement>;
  weekDays: string[];
  startDate: CalendarDate;
  weeksInMonth: number;
}

const InternalCalendarGridContext = createContext<InternalCalendarGridContextValue | null>(null);

/**
 * A calendar grid displays a single grid of days within a calendar or range calendar which
 * can be keyboard navigated and selected by the user.
 */
export function CalendarGrid(
  props: CalendarGridProps & {ref?: Ref<HTMLTableElement>}
) {
  let calendarState = useContext(CalendarStateContext);
  let rangeCalendarState = useContext(RangeCalendarStateContext);
  let calenderProps = () => useSlottedContext(CalendarContext);
  let rangeCalenderProps = () => useSlottedContext(RangeCalendarContext);
  let state = calendarState ?? rangeCalendarState!;
  let startDate = () => props.offset ? state.visibleRange.start.add(props.offset) : state.visibleRange.start;

  let firstDayOfWeek = () => calenderProps()?.firstDayOfWeek ?? rangeCalenderProps()?.firstDayOfWeek;

  let aria = useCalendarGrid(
    {
      get startDate() { return startDate(); },
      get endDate() { return endOfMonth(startDate()); },
      get weekdayStyle() { return props.weekdayStyle; },
      get firstDayOfWeek() { return firstDayOfWeek(); }
    },
    state
  );
  let gridContext = {
    headerProps: aria.headerProps,
    get weekDays() { return aria.weekDays(); },
    get startDate() { return startDate(); },
    get weeksInMonth() { return aria.weeksInMonth(); }
  };

  let DOMProps = filterDOMProps(props, {global: true});

  return (
    <InternalCalendarGridContext value={gridContext}>
      <dom.table
        render={props.render}
        {...mergeProps(DOMProps, aria.gridProps)}
        ref={props.ref}
        style={props.style}
        {...{cellpadding: '0'}}
        className={props.className ?? 'react-aria-CalendarGrid'}>
        {typeof props.children !== 'function' || props.children.length === 0 ? (
          props.children as JSX.Element
        ) : (
          <>
            <CalendarGridHeaderForwardRef>
              {day => <CalendarHeaderCellForwardRef>{day}</CalendarHeaderCellForwardRef>}
            </CalendarGridHeaderForwardRef>
            <CalendarGridBodyForwardRef>{props.children as (date: CalendarDate) => JSX.Element}</CalendarGridBodyForwardRef>
          </>
        )}
      </dom.table>
    </InternalCalendarGridContext>
  );
}

export interface CalendarGridHeaderProps
  extends
    StyleProps,
    DOMRenderProps<'thead', undefined>,
    GlobalDOMAttributes<HTMLTableSectionElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element.
   *
   * @default 'react-aria-CalendarGridHeader'
   */
  className?: string;
  /** A function to render a `<CalendarHeaderCell>` for a weekday name. */
  children: (day: string) => JSX.Element;
}

function CalendarGridHeader(
  props: CalendarGridHeaderProps & {ref?: Ref<HTMLTableSectionElement>}
) {
  let context = useContext(InternalCalendarGridContext)!;
  let DOMProps = filterDOMProps(props, {global: true});

  return (
    <dom.thead
      render={props.render}
      {...mergeProps(DOMProps, context.headerProps)}
      ref={props.ref}
      style={props.style}
      className={props.className ?? 'react-aria-CalendarGridHeader'}>
      <tr><For each={context.weekDays} keyed={false}>{day => <>{props.children(day())}</>}</For></tr>
    </dom.thead>
  );
}

/**
 * A calendar grid header displays a row of week day names at the top of a month.
 */
const CalendarGridHeaderForwardRef = CalendarGridHeader;
export {CalendarGridHeaderForwardRef as CalendarGridHeader};

export interface CalendarHeaderCellProps
  extends
    DOMProps,
    DOMRenderProps<'th', undefined>,
    GlobalDOMAttributes<HTMLTableHeaderCellElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element.
   *
   * @default 'react-aria-CalendarHeaderCell'
   */
  className?: string;
}

function CalendarHeaderCell(
  props: CalendarHeaderCellProps & {ref?: Ref<HTMLTableCellElement>}
) {
  let DOMProps = filterDOMProps(props, {global: true});
  return (
    <dom.th
      render={props.render}
      {...DOMProps}
      ref={props.ref}
      style={props.style}
      className={props.className || 'react-aria-CalendarHeaderCell'}>
      {props.children}
    </dom.th>
  );
}

/**
 * A calendar header cell displays a week day name at the top of a column within a calendar.
 */
const CalendarHeaderCellForwardRef = CalendarHeaderCell;
export {CalendarHeaderCellForwardRef as CalendarHeaderCell};

export interface CalendarGridBodyProps
  extends
    StyleProps,
    DOMRenderProps<'tbody', undefined>,
    GlobalDOMAttributes<HTMLTableSectionElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element.
   *
   * @default 'react-aria-CalendarGridBody'
   */
  className?: string;
  /** A function to render a `<CalendarCell>` for a given date. */
  children: (date: CalendarDate) => JSX.Element;
}

function CalendarGridBody(
  props: CalendarGridBodyProps & {ref?: Ref<HTMLTableSectionElement>}
) {
  let calendarState = useContext(CalendarStateContext);
  let rangeCalendarState = useContext(RangeCalendarStateContext);
  let state = calendarState ?? rangeCalendarState!;
  let context = useContext(InternalCalendarGridContext)!;
  let DOMProps = filterDOMProps(props, {global: true});

  return (
    <dom.tbody
      render={props.render}
      {...DOMProps}
      ref={props.ref}
      style={props.style}
      className={props.className ?? 'react-aria-CalendarGridBody'}>
      <For each={Array.from({length: context.weeksInMonth}, (_, i) => i)} keyed={false}>{weekIndex => (
        <tr>
          <For each={state.getDatesInWeek(weekIndex(), context.startDate)} keyed={false}>
            {date => <>{date() ? props.children(date()!) : <td />}</>}
          </For>
        </tr>
      )}</For>
    </dom.tbody>
  );
}

/**
 * A calendar grid body displays a grid of calendar cells within a month.
 */
const CalendarGridBodyForwardRef = CalendarGridBody;
export {CalendarGridBodyForwardRef as CalendarGridBody};

export interface CalendarCellProps
  extends
    RenderProps<CalendarCellRenderProps, 'div'>,
    HoverEvents,
    GlobalDOMAttributes<HTMLTableCellElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-CalendarCell'
   */
  className?: ClassNameOrFunction<CalendarCellRenderProps>;
  /** The date to render in the cell. */
  date: CalendarDate;
}

/**
 * A calendar cell displays a date cell within a calendar grid which can be selected by the user.
 */
export function CalendarCell(
  props: Omit<CalendarCellProps, 'ref'> & {ref?: ObjectRefInput<HTMLTableCellElement>}
) {
  let cellRef = useObjectRef<HTMLTableCellElement>();
  useSyncRef(props, cellRef);
  let calendarState = useContext(CalendarStateContext);
  let rangeCalendarState = useContext(RangeCalendarStateContext);
  let state = calendarState ?? rangeCalendarState!;
  let context = useContext(InternalCalendarGridContext);
  let otherProps = omit(props, 'date', 'ref');
  let isOutsideMonth = () =>
    state.visibleDuration.days || state.visibleDuration.weeks
      ? false
      : !isSameMonth(context?.startDate ?? state.visibleRange.start, props.date);
  let istoday = () => isToday(props.date, state.timeZone);

  let buttonRef = useObjectRef<HTMLDivElement>();
  let states = useCalendarCell(
    {get date() { return props.date; }, get isOutsideMonth() { return isOutsideMonth(); }},
    state,
    buttonRef
  );

  let {hoverProps, isHovered} = useHover(merge(otherProps, {
    get isDisabled() { return states.isDisabled() || states.isUnavailable(); }
  }));
  let {focusProps, isFocusVisible} = useFocusRing();
  let focusedVisible = () => isFocusVisible() && states.isFocused();
  let isSelectionStart = () => 'highlightedRange' in state && !!state.highlightedRange && isSameDay(props.date, state.highlightedRange.start);
  let isSelectionEnd = () => 'highlightedRange' in state && !!state.highlightedRange && isSameDay(props.date, state.highlightedRange.end);

  let renderProps = useRenderProps(merge(otherProps, {
    get defaultChildren() { return states.formattedDate(); },
    defaultClassName: 'react-aria-CalendarCell',
    values: {
      get formattedDate() { return states.formattedDate(); },
      get isPressed() { return states.isPressed(); },
      get isSelected() { return states.isSelected(); },
      get isFocused() { return states.isFocused(); },
      get isDisabled() { return states.isDisabled(); },
      get isUnavailable() { return states.isUnavailable(); },
      get isOutsideVisibleRange() { return states.isOutsideVisibleRange(); },
      get isInvalid() { return states.isInvalid(); },
      get date() { return props.date; },
      get isHovered() { return isHovered(); },
      get isOutsideMonth() { return isOutsideMonth(); },
      get isFocusVisible() { return focusedVisible(); },
      get isSelectionStart() { return isSelectionStart(); },
      get isSelectionEnd() { return isSelectionEnd(); },
      get isToday() { return istoday(); }
    }
  }));

  let dataAttrs = {
    get 'data-focused'() { return states.isFocused() || undefined; },
    get 'data-hovered'() { return isHovered() || undefined; },
    get 'data-pressed'() { return states.isPressed() || undefined; },
    get 'data-unavailable'() { return states.isUnavailable() || undefined; },
    get 'data-disabled'() { return states.isDisabled() || undefined; },
    get 'data-focus-visible'() { return focusedVisible() || undefined; },
    get 'data-outside-visible-range'() { return states.isOutsideVisibleRange() || undefined; },
    get 'data-outside-month'() { return isOutsideMonth() || undefined; },
    get 'data-selected'() { return states.isSelected() || undefined; },
    get 'data-selection-start'() { return isSelectionStart() || undefined; },
    get 'data-selection-end'() { return isSelectionEnd() || undefined; },
    get 'data-invalid'() { return states.isInvalid() || undefined; },
    get 'data-today'() { return istoday() || undefined; }
  };

  let DOMProps = filterDOMProps(otherProps, {global: true});

  return (
    <td {...states.cellProps} ref={cellRef}>
      <dom.div
        {...mergeProps(DOMProps, states.buttonProps, focusProps, hoverProps, dataAttrs, renderProps)}
        ref={buttonRef}
      />
    </td>
  );
}

export interface CalendarYearPickerProps extends AriaCalendarYearPickerProps {
  /**
   * A function to render the year picker.
   */
  children: (renderProps: CalendarYearPickerAria) => JSX.Element;
}

export function CalendarYearPicker(props: CalendarYearPickerProps): JSX.Element {
  let calendarState = useContext(CalendarStateContext);
  let rangeCalendarState = useContext(RangeCalendarStateContext);
  let state = calendarState || rangeCalendarState!;
  let aria = useCalendarYearPicker(props, state);
  return <>{props.children(aria)}</>;
}

export interface CalendarMonthPickerProps extends AriaCalendarMonthPickerProps {
  /**
   * A function to render the month picker.
   */
  children: (renderProps: CalendarMonthPickerAria) => JSX.Element;
}

export function CalendarMonthPicker(props: CalendarMonthPickerProps): JSX.Element {
  let calendarState = useContext(CalendarStateContext);
  let rangeCalendarState = useContext(RangeCalendarStateContext);
  let state = calendarState || rangeCalendarState!;
  let aria = useCalendarMonthPicker(props, state);
  return <>{props.children(aria)}</>;
}

export interface CalendarHeadingProps extends AriaCalendarHeadingProps, HeadingProps {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element.
   *
   * @default 'react-aria-CalendarHeading'
   */
  className?: string;
}

export function CalendarHeading(
  props: CalendarHeadingProps & {ref?: Ref<HTMLHeadingElement>}
) {
  let headingProps = omit(props, 'offset', 'format', 'className', 'ref');
  let calendarState = useContext(CalendarStateContext);
  let rangeCalendarState = useContext(RangeCalendarStateContext);
  let state = calendarState || rangeCalendarState!;
  let aria = useCalendarHeading(props, state);

  return (
    <Heading {...headingProps} className={props.className ?? 'react-aria-CalendarHeading'} ref={props.ref}>
      {aria()}
    </Heading>
  );
}
