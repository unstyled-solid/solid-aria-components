import {omit} from 'solid-js';
'use client';

import {
  TimeField as AriaTimeField,
  type TimeFieldProps as AriaTimeFieldProps,
  type TimeValue,
  type ValidationResult
} from 'solid-aria-components';
import {DateInput} from './DateField.solid';
import {Description, FieldError, Label} from './Field.solid';
import {composeTailwindRenderProps} from './utils';

export interface TimeFieldProps<T extends TimeValue> extends AriaTimeFieldProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function TimeField<T extends TimeValue>(live0: TimeFieldProps<T>) {
  return (
    <AriaTimeField
      {...omit(live0, "label","description","errorMessage")}
      className={composeTailwindRenderProps(live0.className, 'flex flex-col gap-1 font-sans')}>
      <Label>{live0.label}</Label>
      <DateInput />
      {live0.description && <Description>{live0.description}</Description>}
      <FieldError>{live0.errorMessage}</FieldError>
    </AriaTimeField>
  );
}
