import {omit} from 'solid-js';
'use client';
import {
  DatePicker as AriaDatePicker,
  type DatePickerProps as AriaDatePickerProps,
  type DateValue,
  Group,
  type ValidationResult
} from 'solid-aria-components';
import {DateInput, DateSegment} from './DateField.solid';
import {Label, FieldError, Description} from './Form.solid';
import {FieldButton} from './Form.solid';
import {Calendar} from './Calendar.solid';
import {Popover} from './Popover.solid';
import {ChevronDown} from './icons.solid';
import './DatePicker.css';

export interface DatePickerProps<T extends DateValue> extends AriaDatePickerProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function DatePicker<T extends DateValue>(live0: DatePickerProps<T>) {
  return (
    <AriaDatePicker {...omit(live0, "label","description","errorMessage")}>
      <Label>{live0.label}</Label>
      <Group>
        <DateInput>{segment => <DateSegment segment={segment} />}</DateInput>
        <FieldButton>
          <ChevronDown />
        </FieldButton>
      </Group>
      {live0.description && <Description>{live0.description}</Description>}
      <FieldError>{live0.errorMessage}</FieldError>
      <Popover hideArrow>
        <Calendar />
      </Popover>
    </AriaDatePicker>
  );
}
