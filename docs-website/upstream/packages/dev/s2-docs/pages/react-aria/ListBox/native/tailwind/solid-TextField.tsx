import {omit} from 'solid-js';
import {
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
  type ValidationResult
} from 'solid-aria-components/TextField';
import {tv} from 'tailwind-variants';
import {Description, FieldError, Input, Label, fieldBorderStyles} from './solid-Field';
import {composeTailwindRenderProps, focusRing} from './utils';

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

export function TextField(inputProps: TextFieldProps) {
  let props = omit(inputProps, "label", "description", "errorMessage");
  return (
    <AriaTextField
      {...props}
      className={composeTailwindRenderProps(props.className, 'flex flex-col gap-1 font-sans')}>
      {inputProps.label && <Label>{inputProps.label}</Label>}
      <Input className={inputStyles} />
      {inputProps.description && <Description>{inputProps.description}</Description>}
      <FieldError>{inputProps.errorMessage}</FieldError>
    </AriaTextField>
  );
}
