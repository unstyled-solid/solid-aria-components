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

import type {DateFormatter} from '@internationalized/date';
import type {DateRange, DateValue, Granularity, TimeValue} from './types';
import type {FieldOptions, FormatterOptions} from './utils';
import type {FormValidationState} from '../form/useFormValidationState';
import type {OverlayTriggerState} from '../overlays/useOverlayTriggerState';
import type {RangeValue, ValidationState} from '@react-types/shared';

// Complete frozen useDateRangePickerState.ts:47–102, with type-only dependencies.
type TimeRange = RangeValue<TimeValue>;
export interface DateRangePickerState extends OverlayTriggerState, FormValidationState {
  /** The currently selected date range. */
  value: RangeValue<DateValue | null>;
  /** The default selected date range. */
  defaultValue: DateRange | null;
  /** Sets the selected date range. */
  setValue(value: DateRange | null): void;
  /**
   * The date portion of the selected range. This may be set prior to `value` if the user has
   * selected a date range but has not yet selected a time range.
   */
  dateRange: RangeValue<DateValue | null> | null;
  /** Sets the date portion of the selected range. */
  setDateRange(value: DateRange): void;
  /**
   * The time portion of the selected range. This may be set prior to `value` if the user has
   * selected a time range but has not yet selected a date range.
   */
  timeRange: RangeValue<TimeValue | null> | null;
  /** Sets the time portion of the selected range. */
  setTimeRange(value: TimeRange): void;
  /** Sets the date portion of either the start or end of the selected range. */
  setDate(part: 'start' | 'end', value: DateValue | null): void;
  /** Sets the time portion of either the start or end of the selected range. */
  setTime(part: 'start' | 'end', value: TimeValue | null): void;
  /** Sets the date and time of either the start or end of the selected range. */
  setDateTime(part: 'start' | 'end', value: DateValue | null): void;
  /** The granularity for the field, based on the `granularity` prop and current value. */
  granularity: Granularity;
  /**
   * Whether the date range picker supports selecting times, according to the `granularity` prop and
   * current value.
   */
  hasTime: boolean;
  /** Whether the calendar popover is currently open. */
  isOpen: boolean;
  /** Sets whether the calendar popover is open. */
  setOpen(isOpen: boolean): void;
  /**
   * The current validation state of the date range picker, based on the `validationState`,
   * `minValue`, and `maxValue` props.
   *
   * @deprecated Use `isInvalid` instead.
   */
  validationState: ValidationState | null;
  /**
   * Whether the date range picker is invalid, based on the `isInvalid`, `minValue`, and `maxValue`
   * props.
   */
  isInvalid: boolean;
  /** Formats the selected range using the given options. */
  formatValue(locale: string, fieldOptions: FieldOptions): {start: string; end: string} | null;
  /** Gets a formatter based on state's props. */
  getDateFormatter(locale: string, formatOptions: FormatterOptions): DateFormatter;
}
