import {omit} from 'solid-js';
'use client';
import {CalendarIcon} from './icons.solid';

import {
  DatePicker as AriaDatePicker,
  type DatePickerProps as AriaDatePickerProps,
  type DateValue,
  type ValidationResult
} from 'solid-aria-components';
import {Calendar} from './Calendar.solid';
import {DateInput} from './DateField.solid';
import {Description, FieldError, FieldGroup, Label} from './Field.solid';
import {Popover} from './Popover.solid';
import {composeTailwindRenderProps} from './utils';
import {FieldButton} from './FieldButton.solid';

export interface DatePickerProps<T extends DateValue> extends AriaDatePickerProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function DatePicker<T extends DateValue>(live0: DatePickerProps<T>) {
  return (
    <AriaDatePicker
      {...omit(live0, "label","description","errorMessage")}
      className={composeTailwindRenderProps(
        live0.className,
        'group flex flex-col gap-1 font-sans'
      )}>
      {live0.label && <Label>{live0.label}</Label>}
      <FieldGroup className="min-w-[208px] w-auto cursor-text disabled:cursor-default">
        <DateInput className="flex-1 min-w-[150px] px-3 text-sm" />
        <FieldButton className="w-6 mr-1 outline-offset-0">
          <CalendarIcon aria-hidden="true" className="w-4 h-4" />
        </FieldButton>
      </FieldGroup>
      {live0.description && <Description>{live0.description}</Description>}
      <FieldError>{live0.errorMessage}</FieldError>
      <Popover className="p-2">
        <Calendar />
      </Popover>
    </AriaDatePicker>
  );
}
