import type { JSX } from '@solidjs/web';
import { omit } from 'solid-js';
'use client';
import { TokenField as AriaTokenField, TokenInput as AriaTokenInput, Token as AriaToken, type TokenFieldProps as AriaTokenFieldProps, type TokenInputProps, type TokenProps, type TokenFieldValue } from 'solid-aria-components';
import { Label, Description } from './Form.solid';
import './TokenField.css';
export interface TokenFieldProps<T extends TokenFieldValue = TokenFieldValue> extends Omit<AriaTokenFieldProps<T>, 'children'> {
    label?: string;
    description?: string;
    placeholder?: string;
    inputRef?: ((node: HTMLDivElement | null) => void);
    children: TokenInputProps['children'];
}
export function TokenField<T extends TokenFieldValue = TokenFieldValue>(live0: TokenFieldProps<T>) {
    return (<AriaTokenField {...omit(live0, "label", "description", "placeholder", "inputRef", "style", "children")}>{() => <>
      {live0.label && <Label>{live0.label}</Label>}
      <AriaTokenInput ref={live0.inputRef} style={live0.style} data-placeholder={live0.placeholder} className="react-aria-TokenInput inset">
        {live0.children}
      </AriaTokenInput>
      {live0.description && <Description>{live0.description}</Description>}
    </>}</AriaTokenField>);
}
export function Token(props: TokenProps) {
    return <AriaToken {...props}/>;
}
