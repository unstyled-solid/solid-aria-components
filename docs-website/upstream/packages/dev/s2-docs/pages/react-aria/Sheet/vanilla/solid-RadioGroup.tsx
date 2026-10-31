import {createSignal, Show, omit, flush} from 'solid-js';
import type {JSX} from '@solidjs/web';
'use client';

import { RadioGroup as AriaRadioGroup, RadioField, RadioButton, type RadioGroupProps as AriaRadioGroupProps, type ValidationResult, type RadioFieldProps } from "solid-aria-components/RadioGroup";
import { composeRenderProps } from "solid-aria-components/composeRenderProps";
import { Label, FieldError, Description } from "../../ListBox/native/vanilla/solid-Form";
import './RadioGroup.css';
import './utilities.css';
export interface RadioGroupProps extends Omit<AriaRadioGroupProps, 'children'> {
  children?: JSX.Element;
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}
export function RadioGroup(props: RadioGroupProps) {
  return <AriaRadioGroup {...props}>
      <Label>{props.label}</Label>
      <div className="radio-items">{props.children}</div>
      {props.description && <Description>{props.description}</Description>}
      <FieldError>{props.errorMessage}</FieldError>
    </AriaRadioGroup>;
}
export interface RadioProps extends RadioFieldProps {
  description?: string;
}
export function Radio(props: RadioProps) {
  return <RadioField {...props}>
      <RadioButton>
        {composeRenderProps(props.children, children => <>
            <div className="indicator" />
            {children}
          </>)}
      </RadioButton>
      {props.description && <Description>{props.description}</Description>}
    </RadioField>;
}
