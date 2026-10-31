import {omit} from 'solid-js';
'use client';
import {
  TimeField as AriaTimeField,
  type TimeFieldProps as AriaTimeFieldProps,
  type TimeValue,
  type ValidationResult
} from 'solid-aria-components';
import {Label, FieldError, Description} from './Form.solid';
import {DateInput, DateSegment} from './DateField.solid';
import './TimeField.css';

export interface TimeFieldProps<T extends TimeValue> extends AriaTimeFieldProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function TimeField<T extends TimeValue>(live0: TimeFieldProps<T>) {
  return (
    <AriaTimeField {...omit(live0, "label","description","errorMessage")}>
      <Label>{live0.label}</Label>
      <DateInput>{segment => <DateSegment segment={segment} />}</DateInput>
      {live0.description && <Description>{live0.description}</Description>}
      <FieldError>{live0.errorMessage}</FieldError>
    </AriaTimeField>
  );
}
