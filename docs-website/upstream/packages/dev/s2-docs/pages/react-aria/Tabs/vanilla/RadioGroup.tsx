import { omit, useContext } from 'solid-js';
import type { Ref } from 'solid-js';
import type { JSX } from '@solidjs/web';
import {
  RadioGroup as AriaRadioGroup,
  RadioField,
  RadioButton,
  type RadioGroupProps as AriaRadioGroupProps,
  type ValidationResult,
  type RadioFieldProps } from
'solid-aria-components';
import { composeRenderProps } from 'solid-aria-components';
import { Label, FieldError, Description } from './Form';
import './RadioGroup.css';
import './utilities.css';

export interface RadioGroupProps extends Omit<AriaRadioGroupProps, 'children'> {
  children?: JSX.Element;
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function RadioGroup(_props





: RadioGroupProps) {const props = omit(_props, "label", "description", "errorMessage", "children");
  return (
    <AriaRadioGroup {...props}>
      {() => <>
      <Label>{_props.label}</Label>
      <div class="radio-items">{_props.children}</div>
      {_props.description && <Description>{_props.description}</Description>}
      <FieldError>{_props.errorMessage}</FieldError>
      </>}
    </AriaRadioGroup>);

}

export interface RadioProps extends RadioFieldProps {
  description?: string;
}

export function Radio(props: RadioProps) {
  return (
    <RadioField {...props}>
      {() => <>
      <RadioButton>
        {composeRenderProps(props.children, (children) =>
        <>
            <div class="indicator" />
            {children}
          </>
        )}
      </RadioButton>
      {props.description && <Description>{props.description}</Description>}
      </>}
    </RadioField>);

}
