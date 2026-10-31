'use client';
import { TextField as AriaTextField, type TextFieldProps as AriaTextFieldProps, type ValidationResult } from 'solid-aria-components';
import { tv } from 'tailwind-variants';
import { Description, FieldError, Input, Label, fieldBorderStyles } from '../../Button/tailwind/Field.solid';
import { composeTailwindRenderProps, focusRing } from '../../Button/tailwind/utils';
const inputStyles = tv({
    extend: focusRing,
    base: 'border-1 rounded-lg min-h-9 font-sans text-sm py-0 px-3 box-border transition',
    variants: {
        isFocused: fieldBorderStyles.variants.isFocusWithin,
        isInvalid: fieldBorderStyles.variants.isInvalid,
        isDisabled: fieldBorderStyles.variants.isDisabled
    }
});
export interface TextFieldProps extends AriaTextFieldProps {
    label?: string;
    description?: string;
    placeholder?: string;
    errorMessage?: string | ((validation: ValidationResult) => string);
}
export function TextField(props: TextFieldProps) {
    return (<AriaTextField {...props} className={composeTailwindRenderProps(props.className, 'flex flex-col gap-1 font-sans')}>
      {props.label && <Label>{props.label}</Label>}
      <Input className={inputStyles} placeholder={props.placeholder}/>
      {props.description && <Description>{props.description}</Description>}
      <FieldError>{props.errorMessage}</FieldError>
    </AriaTextField>);
}
