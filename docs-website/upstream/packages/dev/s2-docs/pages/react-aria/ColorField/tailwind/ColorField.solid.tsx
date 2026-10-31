import {omit} from 'solid-js';
'use client';

import {
  ColorField as AriaColorField,
  type ColorFieldProps as AriaColorFieldProps,
  type ValidationResult
} from 'solid-aria-components';
import {tv} from 'tailwind-variants';
import {Description, FieldError, Input, Label, fieldBorderStyles} from './Field.solid';
import {composeTailwindRenderProps, focusRing} from './utils';

const inputStyles = tv({
  extend: focusRing,
  base: 'border-1 rounded-lg min-h-9 font-sans text-sm py-0 px-3 box-border transition [-webkit-tap-highlight-color:transparent]',
  variants: {
    isFocused: fieldBorderStyles.variants.isFocusWithin,
    isInvalid: fieldBorderStyles.variants.isInvalid,
    isDisabled: fieldBorderStyles.variants.isDisabled
  }
});

export interface ColorFieldProps extends AriaColorFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function ColorField(live0: ColorFieldProps) {
  return (
    <AriaColorField
      {...omit(live0, "label","description","errorMessage")}
      className={composeTailwindRenderProps(live0.className, 'flex flex-col gap-1 font-sans')}>
      {live0.label && <Label>{live0.label}</Label>}
      <Input className={inputStyles} />
      {live0.description && <Description>{live0.description}</Description>}
      <FieldError>{live0.errorMessage}</FieldError>
    </AriaColorField>
  );
}
