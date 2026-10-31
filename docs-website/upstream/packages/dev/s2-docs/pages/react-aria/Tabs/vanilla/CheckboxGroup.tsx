import { omit, useContext } from 'solid-js';
import type { Ref } from 'solid-js';
import type { JSX } from '@solidjs/web';
import {
  CheckboxGroup as AriaCheckboxGroup,
  type CheckboxGroupProps as AriaCheckboxGroupProps,
  type ValidationResult } from
'solid-aria-components';
import { Label, FieldError, Description } from './Form';
import './CheckboxGroup.css';

export interface CheckboxGroupProps extends Omit<AriaCheckboxGroupProps, 'children'> {
  children?: JSX.Element;
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  orientation?: 'horizontal' | 'vertical';
}

export function CheckboxGroup(_props






: CheckboxGroupProps) {const props = omit(_props, "label", "description", "errorMessage", "children", "orientation");
  return (
    <AriaCheckboxGroup {...props} data-orientation={_props.orientation ?? 'vertical'}>
      {_props.label && <Label>{_props.label}</Label>}
      <div class="checkbox-items">{_props.children}</div>
      {_props.description && <Description>{_props.description}</Description>}
      <FieldError>{_props.errorMessage}</FieldError>
    </AriaCheckboxGroup>);

}
