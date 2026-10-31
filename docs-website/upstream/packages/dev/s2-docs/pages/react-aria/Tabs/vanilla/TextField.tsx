import { omit, useContext } from 'solid-js';
import type { Ref } from 'solid-js';
import type { JSX } from '@solidjs/web';
import {
  Input,
  TextField as AriaTextField,
  TextArea as AriaTextArea,
  type TextFieldProps as AriaTextFieldProps,
  type ValidationResult } from
'solid-aria-components';
import { Label, FieldError, Description } from './Form';
import './TextField.css';

export interface TextFieldProps<T = HTMLInputElement> extends AriaTextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
  inputRef?: Ref<T>;
}

export function TextField(_props






: TextFieldProps) {const props = omit(_props, "label", "description", "errorMessage", "placeholder", "inputRef");
  return (
    <AriaTextField {...props}>
      {_props.label && <Label>{_props.label}</Label>}
      <Input ref={_props.inputRef} className="react-aria-Input inset" placeholder={_props.placeholder} />
      {_props.description && <Description>{_props.description}</Description>}
      <FieldError>{_props.errorMessage}</FieldError>
    </AriaTextField>);

}

export function TextArea(_props2






: TextFieldProps<HTMLTextAreaElement>) {const props = omit(_props2, "label", "description", "errorMessage", "placeholder", "inputRef");
  return (
    <AriaTextField {...props}>
      <Label>{_props2.label}</Label>
      <AriaTextArea
        ref={_props2.inputRef}
        className="react-aria-TextArea inset"
        placeholder={_props2.placeholder} />
      
      {_props2.description && <Description>{_props2.description}</Description>}
      <FieldError>{_props2.errorMessage}</FieldError>
    </AriaTextField>);

}
