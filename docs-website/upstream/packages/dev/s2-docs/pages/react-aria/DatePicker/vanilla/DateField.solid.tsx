import {omit} from 'solid-js';
'use client';
import {
  DateField as AriaDateField,
  type DateFieldProps as AriaDateFieldProps,
  DateInput as AriaDateInput,
  type DateInputProps,
  DateSegment as AriaDateSegment,
  type DateSegmentProps,
  type DateValue,
  type ValidationResult
} from 'solid-aria-components';
import {Label, FieldError, Description} from './Form.solid';
import './DateField.css';

export interface DateFieldProps<T extends DateValue> extends AriaDateFieldProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function DateField<T extends DateValue>(live0: DateFieldProps<T>) {
  return (
    <AriaDateField {...omit(live0, "label","description","errorMessage")}>
      <Label>{live0.label}</Label>
      <DateInput>{segment => <DateSegment segment={segment} />}</DateInput>
      {live0.description && <Description>{live0.description}</Description>}
      <FieldError>{live0.errorMessage}</FieldError>
    </AriaDateField>
  );
}

export function DateSegment(props: DateSegmentProps) {
  return <AriaDateSegment {...props} />;
}

export function DateInput(props: DateInputProps) {
  return <AriaDateInput {...props} className="react-aria-DateInput inset" />;
}
