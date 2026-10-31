import {omit} from 'solid-js';
'use client';
import {CalendarIcon} from './icons.solid';

import {
  DateRangePicker as AriaDateRangePicker,
  type DateRangePickerProps as AriaDateRangePickerProps,
  type DateValue,
  type ValidationResult
} from 'solid-aria-components';
import {DateInput} from './DateField.solid';
import {Description, FieldError, FieldGroup, Label} from './Field.solid';
import {Popover} from './Popover.solid';
import {RangeCalendar} from './RangeCalendar.solid';
import {composeTailwindRenderProps} from './utils';
import {FieldButton} from './FieldButton.solid';

export interface DateRangePickerProps<T extends DateValue> extends AriaDateRangePickerProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function DateRangePicker<T extends DateValue>(live0: DateRangePickerProps<T>) {
  return (
    <AriaDateRangePicker
      {...omit(live0, "label","description","errorMessage")}
      className={composeTailwindRenderProps(
        live0.className,
        'group flex flex-col gap-1 font-sans max-w-full'
      )}>
      {live0.label && <Label>{live0.label}</Label>}
      <FieldGroup className="min-w-[208px] w-auto cursor-text disabled:cursor-default">
        <div class="flex-1 w-fit flex items-center overflow-x-auto overflow-y-clip [scrollbar-width:none]">
          <DateInput slot="start" className="ps-3 pe-2 text-sm" />
          <span
            aria-hidden="true"
            class="text-neutral-800 dark:text-neutral-200 forced-colors:text-[ButtonText] group-disabled:text-neutral-200 dark:group-disabled:text-neutral-600 forced-colors:group-disabled:text-[GrayText]">
            –
          </span>
          <DateInput slot="end" className="flex-1 ps-2 pe-3 text-sm" />
        </div>
        <FieldButton className="w-6 mr-1 outline-offset-0">
          <CalendarIcon aria-hidden="true" className="w-4 h-4" />
        </FieldButton>
      </FieldGroup>
      {live0.description && <Description>{live0.description}</Description>}
      <FieldError>{live0.errorMessage}</FieldError>
      <Popover className="p-2">
        <RangeCalendar />
      </Popover>
    </AriaDateRangePicker>
  );
}
