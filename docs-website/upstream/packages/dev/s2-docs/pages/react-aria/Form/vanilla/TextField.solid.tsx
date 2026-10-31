'use client';
import { Input, TextField as AriaTextField, TextArea as AriaTextArea, type TextFieldProps as AriaTextFieldProps, type ValidationResult } from 'solid-aria-components';
import { Label, FieldError, Description } from '../../Button/vanilla/Form.solid';
import './TextField.css';
import type { JSX } from '@solidjs/web';
export interface TextFieldProps<T = HTMLInputElement> extends AriaTextFieldProps {
    label?: string;
    description?: string;
    errorMessage?: string | ((validation: ValidationResult) => string);
    placeholder?: string;
    inputRef?: JSX.Ref<T>;
}
export function TextField(props: TextFieldProps) {
    return (<AriaTextField {...props}>
      {props.label && <Label>{props.label}</Label>}
      <Input ref={props.inputRef} className="react-aria-Input inset" placeholder={props.placeholder}/>
      {props.description && <Description>{props.description}</Description>}
      <FieldError>{props.errorMessage}</FieldError>
    </AriaTextField>);
}
export function TextArea(props: TextFieldProps<HTMLTextAreaElement>) {
    return (<AriaTextField {...props}>
      <Label>{props.label}</Label>
      <AriaTextArea ref={props.inputRef} className="react-aria-TextArea inset" placeholder={props.placeholder}/>
      {props.description && <Description>{props.description}</Description>}
      <FieldError>{props.errorMessage}</FieldError>
    </AriaTextField>);
}
