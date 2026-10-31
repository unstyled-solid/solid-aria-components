import {omit} from 'solid-js';
import type {Ref} from 'solid-js';
import {
  Input,
  TextField as AriaTextField,
  TextArea as AriaTextArea,
  type TextFieldProps as AriaTextFieldProps,
  type ValidationResult
} from 'solid-aria-components/TextField';
import {Label, FieldError, Description} from './solid-Form';
import './TextField.css';

export interface TextFieldProps<T = HTMLInputElement> extends AriaTextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
  inputRef?: Ref<T>;
}

export function TextField(inputProps: TextFieldProps) {
  let props = omit(inputProps, "label", "description", "errorMessage", "placeholder", "inputRef");
  return (
    <AriaTextField {...props}>
      {inputProps.label && <Label>{inputProps.label}</Label>}
      <Input ref={inputProps.inputRef} className="react-aria-Input inset" placeholder={inputProps.placeholder} />
      {inputProps.description && <Description>{inputProps.description}</Description>}
      <FieldError>{inputProps.errorMessage}</FieldError>
    </AriaTextField>
  );
}

export function TextArea(inputProps: TextFieldProps<HTMLTextAreaElement>) {
  let props = omit(inputProps, "label", "description", "errorMessage", "placeholder", "inputRef");
  return (
    <AriaTextField {...props}>
      <Label>{inputProps.label}</Label>
      <AriaTextArea
        ref={inputProps.inputRef}
        className="react-aria-TextArea inset"
        placeholder={inputProps.placeholder}
      />
      {inputProps.description && <Description>{inputProps.description}</Description>}
      <FieldError>{inputProps.errorMessage}</FieldError>
    </AriaTextField>
  );
}
