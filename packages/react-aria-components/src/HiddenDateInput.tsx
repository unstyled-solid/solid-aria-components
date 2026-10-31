/*
 * Copyright 2025 Adobe. All rights reserved.
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
  CalendarDateTime,
  parseDate,
  parseDateTime,
  toCalendarDate,
  toCalendarDateTime,
  toLocalTimeZone
} from '@internationalized/date';
import {DateFieldState, DateSegmentType} from 'react-stately/useDateFieldState';
import type {DatePickerState} from 'react-stately/private/datepicker/DatePickerStateTypes';
import {getEventTarget} from 'react-aria/private/utils/shadowdom/DOMFunctions';
import type {JSX} from '@solidjs/web';
import {mergeProps} from 'react-aria/mergeProps';
import {useVisuallyHidden} from 'react-aria/VisuallyHidden';

interface AriaHiddenDateInputProps {
  /**
   * Describes the type of autocomplete functionality the input should provide if any. See
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautocomplete).
   */
  autoComplete?: string;
  /** HTML form input name. */
  name?: string;
  /** Sets the disabled state of the input. */
  isDisabled?: boolean;
}

interface HiddenDateInputProps extends AriaHiddenDateInputProps {
  /**
   * State for the input.
   */
  state: DateFieldState | DatePickerState;
}

export interface HiddenDateAria {
  /** Props for the container element. */
  containerProps: JSX.HTMLAttributes<HTMLDivElement>;
  /** Props for the hidden input element. */
  inputProps: JSX.InputHTMLAttributes<HTMLInputElement>;
}

const dateSegments = ['day', 'month', 'year'];
const granularityMap = {hour: 1, minute: 2, second: 3};

export function useHiddenDateInput(
  props: HiddenDateInputProps,
  state: DateFieldState | DatePickerState
): HiddenDateAria {
  let {visuallyHiddenProps} = useVisuallyHidden({
    style: {
      // Prevent page scrolling.
      position: 'fixed',
      top: 0,
      left: 0
    }
  });

  let inputStep = () => {
    let step = 60;
    if (state.granularity === 'second') {
      step = 1;
    } else if (state.granularity === 'hour') {
      step = 3600;
    }
    return step;
  };

  let dateValue = () => {
    let value = '';
    if (state.value) {
      if (state.granularity === 'day') {
        value = toCalendarDate(state.value).toString();
      } else {
        value = toCalendarDateTime(
          'timeZone' in state.value ? toLocalTimeZone(state.value) : state.value
        ).toString();
      }
    }
    return value;
  };

  let inputType = () => state.granularity === 'day' ? 'date' : 'datetime-local';

  let timeSegments = () => {
    let segments = ['hour', 'minute', 'second'];
    // Depending on the granularity, we only want to validate certain time segments
    let end = 0;
    if (segments.includes(state.granularity)) {
      end = granularityMap[state.granularity as keyof typeof granularityMap];
      segments = segments.slice(0, end);
    }
    return segments;
  };

  return {
    containerProps: mergeProps(visuallyHiddenProps as JSX.HTMLAttributes<HTMLDivElement>, {
      'aria-hidden': true,
      // @ts-ignore
      ['data-react-aria-prevent-focus']: true,
      // @ts-ignore
      ['data-a11y-ignore']: 'aria-hidden-focus'
    }),
    inputProps: {
      tabindex: -1,
      get autocomplete() { return props.autoComplete; },
      get disabled() { return props.isDisabled; },
      get type() { return inputType(); },
      // We set the form prop to an empty string to prevent the hidden date input's value from being submitted
      form: '',
      get name() { return props.name; },
      get step() { return inputStep(); },
      get value() { return dateValue(); },
      onInput: e => {
        let targetString = (getEventTarget(e) as HTMLInputElement).value.toString();
        if (targetString) {
          try {
            let targetValue: CalendarDateTime | CalendarDate = parseDateTime(targetString);
            if (state.granularity === 'day') {
              targetValue = parseDate(targetString);
            }
            // We check to to see if setSegment exists in the state since it only exists in DateFieldState and not DatePickerState.
            // The setValue method has different behavior depending on if it's coming from DateFieldState or DatePickerState.
            // In DateFieldState, setValue firsts checks to make sure that each segment is filled before committing the newValue
            // which is why in the code below we first set each segment to validate it before committing the new value.
            // However, in DatePickerState, since we have to be able to commit values from the Calendar popover, we are also able to
            // set a new value when the field itself is empty.
            if ('setSegment' in state) {
              for (let type in targetValue) {
                // eslint-disable-next-line max-depth
                if (dateSegments.includes(type)) {
                  state.setSegment(type as DateSegmentType, targetValue[type as keyof typeof targetValue] as number);
                }
                // eslint-disable-next-line max-depth
                if (timeSegments().includes(type)) {
                  state.setSegment(type as DateSegmentType, targetValue[type as keyof typeof targetValue] as number);
                }
              }
            }
            state.setValue(targetValue);
          } catch {
            // ignore
          }
        }
      }
    }
  };
}

export function HiddenDateInput(props: HiddenDateInputProps): JSX.Element {
  let {containerProps, inputProps} = useHiddenDateInput(props, props.state);
  return (
    <div {...containerProps} data-testid="hidden-dateinput-container">
      <input {...inputProps} />
    </div>
  );
}
