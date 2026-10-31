import {omit} from 'solid-js';
'use client';
import {
  DateRangePicker as AriaDateRangePicker,
  type DateRangePickerProps as AriaDateRangePickerProps,
  type DateValue,
  Group,
  type ValidationResult
} from 'solid-aria-components';
import {DateInput, DateSegment} from './DateField.solid';
import {Description, FieldButton} from './Form.solid';
import {Popover} from './Popover.solid';
import {Label, FieldError} from './Form.solid';
import {RangeCalendar} from './RangeCalendar.solid';
import {ChevronDown} from './icons.solid';
import './DateRangePicker.css';

export interface DateRangePickerProps<T extends DateValue> extends AriaDateRangePickerProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function DateRangePicker<T extends DateValue>(live0: DateRangePickerProps<T>) {
  return (
    <AriaDateRangePicker {...omit(live0, "label","description","errorMessage")}>
      <Label>{live0.label}</Label>
      <Group className="react-aria-Group inset">
        <div class="date-fields">
          <DateInput slot="start">{segment => <DateSegment segment={segment} />}</DateInput>
          <span aria-hidden="true">–</span>
          <DateInput slot="end">{segment => <DateSegment segment={segment} />}</DateInput>
        </div>
        <FieldButton>
          <ChevronDown />
        </FieldButton>
      </Group>
      {live0.description && <Description>{live0.description}</Description>}
      <FieldError>{live0.errorMessage}</FieldError>
      <Popover hideArrow>
        <RangeCalendar />
      </Popover>
    </AriaDateRangePicker>
  );
}
