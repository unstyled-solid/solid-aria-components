import {omit} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {
  CheckboxGroup as AriaCheckboxGroup,
  type CheckboxGroupProps as AriaCheckboxGroupProps,
  type ValidationResult
} from 'solid-aria-components/CheckboxGroup';
import {Label, FieldError, Description} from './solid-Form';
import './CheckboxGroup.css';

export interface CheckboxGroupProps extends Omit<AriaCheckboxGroupProps, 'children'> {
  children?: JSX.Element;
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  orientation?: 'horizontal' | 'vertical';
}

export function CheckboxGroup(inputProps: CheckboxGroupProps) {
  let props = omit(inputProps, "label", "description", "errorMessage", "children", "orientation");
  return (
    <AriaCheckboxGroup {...props} data-orientation={(inputProps.orientation === undefined ? 'vertical' : inputProps.orientation)}>
      {inputProps.label && <Label>{inputProps.label}</Label>}
      <div class="checkbox-items">{inputProps.children}</div>
      {inputProps.description && <Description>{inputProps.description}</Description>}
      <FieldError>{inputProps.errorMessage}</FieldError>
    </AriaCheckboxGroup>
  );
}
