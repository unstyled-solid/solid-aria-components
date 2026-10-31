import { omit } from 'solid-js';
'use client';
import { ColorField as AriaColorField, type ColorFieldProps as AriaColorFieldProps, Input, type ValidationResult } from 'solid-aria-components';
import { Label, FieldError, Description } from './Form.solid';
import './ColorField.css';
export interface ColorFieldProps extends AriaColorFieldProps {
    label?: string;
    description?: string;
    errorMessage?: string | ((validation: ValidationResult) => string);
    placeholder?: string;
}
export function ColorField(live0: ColorFieldProps) {
    return (<AriaColorField {...omit(live0, "label", "description", "errorMessage", "placeholder")}>
      {live0.label && <Label>{live0.label}</Label>}
      <Input className="react-aria-Input inset" placeholder={live0.placeholder}/>
      {live0.description && <Description>{live0.description}</Description>}
      <FieldError>{live0.errorMessage}</FieldError>
    </AriaColorField>);
}
