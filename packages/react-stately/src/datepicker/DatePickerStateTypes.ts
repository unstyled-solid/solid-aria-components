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
import type {DateValue, Granularity, TimeValue} from './types';
import type {FieldOptions, FormatterOptions} from './utils';
import type {FormValidationState} from '../form/useFormValidationState';
import type {OverlayTriggerState} from '../overlays/useOverlayTriggerState';
import type {ValidationState} from '@react-types/shared';

// Complete frozen useDatePickerState.ts:43–88, with type-only dependencies.
export interface DatePickerState extends OverlayTriggerState, FormValidationState {
  /** The currently selected date. */
  value: DateValue | null;
  /** The default date. */
  defaultValue: DateValue | null;
  /** Sets the selected date. */
  setValue(value: DateValue | null): void;
  /**
   * The date portion of the value. This may be set prior to `value` if the user has
   * selected a date but has not yet selected a time.
   */
  dateValue: DateValue | null;
  /** Sets the date portion of the value. */
  setDateValue(value: DateValue): void;
  /**
   * The time portion of the value. This may be set prior to `value` if the user has
   * selected a time but has not yet selected a date.
   */
  timeValue: TimeValue | null;
  /** Sets the time portion of the value. */
  setTimeValue(value: TimeValue): void;
  /** The granularity for the field, based on the `granularity` prop and current value. */
  granularity: Granularity;
  /**
   * Whether the date picker supports selecting a time, according to the `granularity` prop and
   * current value.
   */
  hasTime: boolean;
  /** Whether the calendar popover is currently open. */
  isOpen: boolean;
  /** Sets whether the calendar popover is open. */
  setOpen(isOpen: boolean): void;
  /**
   * The current validation state of the date picker, based on the `validationState`, `minValue`,
   * and `maxValue` props.
   *
   * @deprecated Use `isInvalid` instead.
   */
  validationState: ValidationState | null;
  /** Whether the date picker is invalid, based on the `isInvalid`, `minValue`, and `maxValue` props. */
  isInvalid: boolean;
  /** Formats the selected value using the given options. */
  formatValue(locale: string, fieldOptions: FieldOptions): string;
  /** Gets a formatter based on state's props. */
  getDateFormatter(locale: string, formatOptions: FormatterOptions): DateFormatter;
}
