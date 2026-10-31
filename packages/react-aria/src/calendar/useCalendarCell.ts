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

import {CalendarDate, isEqualDay, isSameDay, isToday} from '@internationalized/date';
import {CalendarSelectionMode, CalendarState} from 'react-stately/useCalendarState';
import {DOMAttributes, RefObject} from '@react-types/shared';
import {focusWithoutScrolling} from '../utils/focusWithoutScrolling';
import {getActiveElement, getEventTarget} from '../utils/shadowdom/DOMFunctions';
import {getEraFormat, hookData} from './utils';
import {getInteractionModality} from '../interactions/useFocusVisible';
import {getScrollParent} from '../utils/getScrollParent';
import intlMessages from '../../intl/calendar/*.json';
import {mergeProps} from '../utils/mergeProps';
import {RangeCalendarState} from 'react-stately/useRangeCalendarState';
import {scrollIntoViewport} from '../utils/scrollIntoView';
import {useDateFormatter} from '../i18n/useDateFormatter';
import {useDescription} from '../utils/useDescription';
import {createEffect, createMemo, onCleanup, untrack, type Accessor} from 'solid-js';
import {useLocalizedStringFormatter} from '../i18n/useLocalizedStringFormatter';
import {usePress} from '../interactions/usePress';

export interface AriaCalendarCellProps {
  /** The date that this cell represents. */
  date: CalendarDate;
  /**
   * Whether the cell is disabled. By default, this is determined by the
   * Calendar's `minValue`, `maxValue`, and `isDisabled` props.
   */
  isDisabled?: boolean;

  /**
   * Whether the cell is outside of the current month.
   */
  isOutsideMonth?: boolean;
}

export interface CalendarCellAria {
  /** Props for the grid cell element (e.g. `<td>`). */
  cellProps: DOMAttributes;
  /** Props for the button element within the cell. */
  buttonProps: DOMAttributes;
  /** Whether the cell is currently being pressed. */
  isPressed: Accessor<boolean>;
  /** Whether the cell is selected. */
  isSelected: Accessor<boolean>;
  /** Whether the cell is focused. */
  isFocused: Accessor<boolean>;
  /**
   * Whether the cell is disabled, according to the calendar's `minValue`, `maxValue`, and
   * `isDisabled` props. Disabled dates are not focusable, and cannot be selected by the user. They
   * are typically displayed with a dimmed appearance.
   */
  isDisabled: Accessor<boolean>;
  /**
   * Whether the cell is unavailable, according to the calendar's `isDateUnavailable` prop.
   * Unavailable dates remain focusable, but cannot be selected by the user. They should be
   * displayed with a visual affordance to indicate they are unavailable, such as a different color
   * or a strikethrough.
   *
   * Note that because they are focusable, unavailable dates must meet a 4.5:1 color contrast ratio,
   * [as defined by WCAG](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html).
   */
  isUnavailable: Accessor<boolean>;
  /**
   * Whether the cell is outside the visible range of the calendar.
   * For example, dates before the first day of a month in the same week.
   */
  isOutsideVisibleRange: Accessor<boolean>;
  /** Whether the cell is part of an invalid selection. */
  isInvalid: Accessor<boolean>;
  /** The day number formatted according to the current locale. */
  formattedDate: Accessor<string>;
}

/**
 * Provides the behavior and accessibility implementation for a calendar cell component.
 * A calendar cell displays a date cell within a calendar grid which can be selected by the user.
 */
export function useCalendarCell(
  props: AriaCalendarCellProps,
  state: CalendarState<CalendarSelectionMode> | RangeCalendarState,
  ref: RefObject<HTMLElement | null>
): CalendarCellAria {
  // Source date identity reuse, without render-time mutation.
  let date = createMemo<CalendarDate>(previous => previous && isEqualDay(previous, props.date) ? previous : props.date);
  let metadata = hookData.get(state)!;
  let stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-aria/calendar');
  let dateFormatter = useDateFormatter(() => ({
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    era: getEraFormat(date()),
    timeZone: state.timeZone
  }));
  let isFocused = () => state.isCellFocused(date()) && !props.isOutsideMonth;
  let isDisabled = () => !!(props.isDisabled || state.isCellDisabled(date()) || props.isOutsideMonth);
  let isUnavailable = () => state.isCellUnavailable(date());
  let isSelectable = () => !isDisabled() && !isUnavailable();
  let isInvalid = () => {
  let invalid = false;
  if (state.isValueInvalid) {
    if ('highlightedRange' in state) {
      invalid =
        !state.anchorDate &&
        state.highlightedRange != null &&
        date().compare(state.highlightedRange.start) >= 0 &&
        date().compare(state.highlightedRange.end) <= 0;
    } else if (Array.isArray(state.value)) {
      invalid = state.value.some(value => isSameDay(value, date()));
    } else if (state.value) {
      invalid = isSameDay(state.value as CalendarDate, date());
    }
  }

  return invalid;
  };
  let isSelected = () => (isInvalid() && !isDisabled()) || (state.isSelected(date()) && isSelectable());

  // For performance, reuse the same date object as before if the new date prop is the same.
  // This allows subsequent useMemo results to be reused.
  // oxlint-disable-next-line react/react-compiler
  let nativeDate = createMemo(() => date().toDate(state.timeZone));

  // aria-label should be localize Day of week, Month, Day and Year without Time.
  let isDateToday = () => isToday(date(), state.timeZone);
  let label = createMemo(() => {
    let label = '';

    // If this is a range calendar, add a description of the full selected range
    // to the first and last selected date.
    if (
      'highlightedRange' in state &&
      state.value &&
      !state.anchorDate &&
      (isSameDay(date(), state.value.start) || isSameDay(date(), state.value.end))
    ) {
      label = metadata.selectedDateDescription + ', ';
    }

    label += dateFormatter().format(nativeDate());
    if (isDateToday()) {
      // If date is today, set appropriate string depending on selected state:
      label = stringFormatter.format(isSelected() ? 'todayDateSelected' : 'todayDate', {
        date: label
      });
    } else if (isSelected()) {
      // If date is selected but not today:
      label = stringFormatter.format('dateSelected', {
        date: label
      });
    }

    if (state.minValue && isSameDay(date(), state.minValue)) {
      label += ', ' + stringFormatter.format('minimumDate');
    } else if (state.maxValue && isSameDay(date(), state.maxValue)) {
      label += ', ' + stringFormatter.format('maximumDate');
    }

    return label;
  });

  // When a cell is focused and this is a range calendar, add a prompt to help
  // screenreader users know that they are in a range selection mode.
  let rangeSelectionPrompt = () => {
  let prompt = '';
  if ('anchorDate' in state && isFocused() && !state.isReadOnly && isSelectable()) {
    // If selection has started add "click to finish selecting range"
    if (state.anchorDate) {
      prompt = stringFormatter.format('finishRangeSelectionPrompt');
      // Otherwise, add "click to start selecting range" prompt
    } else {
      prompt = stringFormatter.format('startRangeSelectionPrompt');
    }
  }

  return prompt;
  };
  let descriptionProps = useDescription(rangeSelectionPrompt);

  let isAnchorPressed = {current: false};
  let isRangeBoundaryPressed = {current: false};
  let touchDragTimerRef: {current: ReturnType<typeof setTimeout> | undefined} = {current: undefined};
  onCleanup(() => clearTimeout(touchDragTimerRef.current));
  let {pressProps, isPressed} = usePress({
    // When dragging to select a range, we don't want dragging over the original anchor
    // again to trigger onPressStart. Cancel presses immediately when the pointer exits.
    get shouldCancelOnPointerExit() { return 'anchorDate' in state && !!state.anchorDate; },
    preventFocusOnPress: true,
    get isDisabled() { return !isSelectable() || state.isReadOnly; },
    onPressStart(e) {
      if (state.isReadOnly) {
        state.setFocusedDate(date());
        state.setFocused(true);
        return;
      }

      if (
        'highlightedRange' in state &&
        !state.anchorDate &&
        (e.pointerType === 'mouse' || e.pointerType === 'touch')
      ) {
        // Allow dragging the start or end date of a range to modify it
        // rather than starting a new selection.
        // Don't allow dragging when invalid, or weird jumping behavior may occur as date ranges
        // are constrained to available dates. The user will need to select a new range in this case.
        if (state.highlightedRange && !isInvalid()) {
          if (isSameDay(date(), state.highlightedRange.start)) {
            state.setAnchorDate(state.highlightedRange.end);
            state.setFocusedDate(date());
            state.setFocused(true);
            state.setDragging(true);
            isRangeBoundaryPressed.current = true;
            return;
          } else if (isSameDay(date(), state.highlightedRange.end)) {
            state.setAnchorDate(state.highlightedRange.start);
            state.setFocusedDate(date());
            state.setFocused(true);
            state.setDragging(true);
            isRangeBoundaryPressed.current = true;
            return;
          }
        }

        let startDragging = () => {
          state.setDragging(true);
          touchDragTimerRef.current = undefined;

          state.selectDate(date());
          state.setFocusedDate(date());
          state.setFocused(true);
          isAnchorPressed.current = true;
        };

        // Start selection on mouse/touch down so users can drag to select a range.
        // On touch, delay dragging to determine if the user really meant to scroll.
        if (e.pointerType === 'touch') {
          touchDragTimerRef.current = setTimeout(startDragging, 200);
        } else {
          startDragging();
        }
      }
    },
    onPressEnd() {
      isRangeBoundaryPressed.current = false;
      isAnchorPressed.current = false;
      clearTimeout(touchDragTimerRef.current);
      touchDragTimerRef.current = undefined;
    },
    onPress() {
      // For non-range selection, always select on press up.
      if (!('anchorDate' in state) && !state.isReadOnly) {
        state.selectDate(date());
        state.setFocusedDate(date());
        state.setFocused(true);
      }
    },
    onPressUp(e) {
      if (state.isReadOnly) {
        return;
      }

      // If the user tapped quickly, the date won't be selected yet and the
      // timer will still be in progress. In this case, select the date on touch up.
      // Timer is cleared in onPressEnd.
      if ('anchorDate' in state && touchDragTimerRef.current) {
        state.selectDate(date());
        state.setFocusedDate(date());
        state.setFocused(true);
      }

      if ('anchorDate' in state) {
        if (isRangeBoundaryPressed.current) {
          // When clicking on the start or end date of an already selected range,
          // start a new selection on press up to also allow dragging the date to
          // change the existing range.
          state.setAnchorDate(date());
        } else if (state.anchorDate && !isAnchorPressed.current) {
          // When releasing a drag or pressing the end date of a range, select it.
          state.selectDate(date());
          state.setFocusedDate(date());
          state.setFocused(true);
        } else if (e.pointerType === 'keyboard' && !state.anchorDate) {
          // For range selection, auto-advance the focused date by one if using keyboard.
          // This gives an indication that you're selecting a range rather than a single date.
          // For mouse, this is unnecessary because users will see the indication on hover. For screen readers,
          // there will be an announcement to "click to finish selecting range" (above).
          state.selectDate(date());
          state.focusNearestAvailableDate(date());
        } else if (e.pointerType === 'virtual') {
          // For screen readers, just select the date on click.
          state.selectDate(date());
          state.setFocusedDate(date());
          state.setFocused(true);
        }
      }
    }
  });

  let tabIndex = () => isDisabled() ? undefined : isSameDay(date(), state.focusedDate) ? 0 : -1;

  // Focus the button in the DOM when the state updates.
  createEffect(() => ({focused: isFocused(), element: ref.current}), ({focused, element}) => {
    if (focused && element) {
      focusWithoutScrolling(element);

      // Scroll into view if navigating with a keyboard, otherwise
      // try not to shift the view under the user's mouse/finger.
      // If in a overlay, scrollIntoViewport will only cause scrolling
      // up to the overlay scroll body to prevent overlay shifting.
      // Also only scroll into view if the cell actually got focused.
      // There are some cases where the cell might be disabled or inside,
      // an inert container and we don't want to scroll then.
      if (getInteractionModality() !== 'pointer' && getActiveElement() === element) {
        scrollIntoViewport(element, {containingElement: getScrollParent(element)});
      }
    }
  });

  let cellDateFormatter = useDateFormatter(() => ({
    day: 'numeric',
    timeZone: state.timeZone,
    calendar: date().calendar.identifier
  }));

  let formattedDate = createMemo(() => cellDateFormatter().formatToParts(nativeDate()).find(part => part.type === 'day')!.value);

  return {
    cellProps: {
      role: 'gridcell',
      get 'aria-disabled'() { return !isSelectable() ? 'true' as const : undefined; },
      get 'aria-selected'() { return isSelected() ? 'true' as const : undefined; },
      get 'aria-invalid'() { return isInvalid() ? 'true' as const : undefined; }
    },
    buttonProps: mergeProps(pressProps, {
      onFocus() {
        // Programmatic focus also dispatches this event from the focus effect.
        // Read its current policy/date as an imperative event snapshot.
        untrack(() => {
        if (!isDisabled()) {
          state.setFocusedDate(date());
          state.setFocused(true);
        }
        });
      },
      get tabIndex() { return tabIndex(); },
      role: 'button',
      get 'aria-disabled'() { return !isSelectable() ? 'true' as const : undefined; },
      get 'aria-label'() { return label(); },
      get 'aria-invalid'() { return isInvalid() ? 'true' as const : undefined; },
      get 'aria-describedby'() { return (
        [isInvalid() ? metadata.errorMessageId : undefined, descriptionProps['aria-describedby']]
          .filter(Boolean)
           .join(' ') || undefined); },
      onPointerEnter(e: PointerEvent) {
        // Highlight the date on hover or drag over a date when selecting a range.
        if (
          'highlightDate' in state &&
          (e.pointerType !== 'touch' || state.isDragging) &&
          isSelectable()
        ) {
          state.highlightDate(date());
        }
      },
      onPointerDown(e: PointerEvent) {
        // This is necessary on touch devices to allow dragging
        // outside the original pressed element.
        // (JSDOM does not support this)
        let target = getEventTarget(e);
        if (target instanceof HTMLElement && 'releasePointerCapture' in target) {
          if ('hasPointerCapture' in target) {
            if (target.hasPointerCapture(e.pointerId)) {
              target.releasePointerCapture(e.pointerId);
            }
          } else {
            (target as HTMLElement).releasePointerCapture(e.pointerId);
          }
        }
      },
      onContextMenu(e: MouseEvent) {
        // Prevent context menu on long press.
        e.preventDefault();
      }
    }),
    isPressed,
    isFocused,
    isSelected,
    isDisabled,
    isUnavailable,
    isOutsideVisibleRange: () => date().compare(state.visibleRange.start) < 0 || date().compare(state.visibleRange.end) > 0,
    isInvalid,
    formattedDate
  };
}
