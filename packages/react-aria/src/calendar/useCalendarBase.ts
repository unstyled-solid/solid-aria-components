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

import {announce} from '../live-announcer/LiveAnnouncer';
import {AriaButtonProps} from '../button/useButton';
import {AriaLabelingProps, DOMAttributes, DOMProps} from '@react-types/shared';
import {
  CalendarPropsBase,
  CalendarSelectionMode,
  CalendarState
} from 'react-stately/useCalendarState';
import {filterDOMProps} from '../utils/filterDOMProps';
import {hookData, useSelectedDateDescription, useVisibleRangeDescription} from './utils';
import intlMessages from '../../intl/calendar/*.json';
import {mergeProps} from '../utils/mergeProps';
import {RangeCalendarState} from 'react-stately/useRangeCalendarState';
import {useLabels} from '../utils/useLabels';
import {useLocalizedStringFormatter} from '../i18n/useLocalizedStringFormatter';
import {useSlotId} from '../utils/useId';
import {createSignal, createEffect, untrack, type Accessor} from 'solid-js';

export interface CalendarAria {
  /** Props for the calendar grouping element. */
  calendarProps: DOMAttributes;
  /** Props for the next button. */
  nextButtonProps: AriaButtonProps;
  /** Props for the previous button. */
  prevButtonProps: AriaButtonProps;
  /** Props for the error message element, if any. */
  errorMessageProps: DOMAttributes;
  /** A description of the visible date range, for use in the calendar title. */
  title: Accessor<string>;
}

export function useCalendarBase(
  props: CalendarPropsBase & DOMProps & AriaLabelingProps,
  state: CalendarState<CalendarSelectionMode> | RangeCalendarState
): CalendarAria {
  let stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-aria/calendar');
  let domProps = filterDOMProps(props);

  let title = useVisibleRangeDescription(
    () => state.visibleRange.start,
    () => state.visibleRange.end,
    () => state.timeZone,
    false
  );
  let visibleRangeDescription = useVisibleRangeDescription(
    () => state.visibleRange.start,
    () => state.visibleRange.end,
    () => state.timeZone,
    true
  );

  // Announce when the visible date range changes
  createEffect(visibleRangeDescription, description => {
    // only when pressing the Previous or Next button
    if (!untrack(() => state.isFocused)) {
      announce(description);
    }
  }, {defer: true});

  // Announce when the selected value changes
  let selectedDateDescription = useSelectedDateDescription(state);
  createEffect(selectedDateDescription, description => {
    if (description) {
      announce(description, 'polite', 4000);
    }
    // handle an update to the caption that describes the currently selected range, to announce the new value
  }, {defer: true});

  let errorMessageId = useSlotId(() => [
    Boolean(props.errorMessage),
    props.isInvalid,
    props.validationState
  ]);

  // Pass the label to the child grid elements.
  hookData.set(state, {
    get ariaLabel() { return props['aria-label']; },
    get ariaLabelledBy() { return props['aria-labelledby']; },
    get errorMessageId() { return errorMessageId(); },
    get selectedDateDescription() { return selectedDateDescription(); }
  });

  // If the next or previous buttons become disabled while they are focused, move focus to the calendar body.
  let [nextFocused, setNextFocused] = createSignal(false);
  let nextDisabled = () => props.isDisabled || state.isNextVisibleRangeInvalid();
  createEffect(() => nextDisabled() && nextFocused(), move => {
    if (move) { setNextFocused(false); state.setFocused(true); }
  });

  let [previousFocused, setPreviousFocused] = createSignal(false);
  let previousDisabled = () => props.isDisabled || state.isPreviousVisibleRangeInvalid();
  createEffect(() => previousDisabled() && previousFocused(), move => {
    if (move) { setPreviousFocused(false); state.setFocused(true); }
  });

  let labelProps = useLabels({
    get id() { return props.id; },
    get 'aria-label'() { return [props['aria-label'], visibleRangeDescription()].filter(Boolean).join(', '); },
    get 'aria-labelledby'() { return props['aria-labelledby']; }
  });

  return {
    calendarProps: mergeProps(domProps, labelProps, {
      role: 'application' as const,
      get 'aria-details'() { return props['aria-details'] || undefined; },
      get 'aria-describedby'() { return props['aria-describedby'] || undefined; }
    }),
    nextButtonProps: {
      onPress: () => state.focusNextPage(),
      get 'aria-label'() { return stringFormatter.format('next'); },
      get isDisabled() { return nextDisabled(); },
      onFocusChange: setNextFocused
    },
    prevButtonProps: {
      onPress: () => state.focusPreviousPage(),
      get 'aria-label'() { return stringFormatter.format('previous'); },
      get isDisabled() { return previousDisabled(); },
      onFocusChange: setPreviousFocused
    },
    errorMessageProps: {
      get id() { return errorMessageId(); }
    },
    title
  };
}
