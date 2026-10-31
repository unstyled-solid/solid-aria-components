'use client';
import {TextField as NativeTextField, Label, Input, type TextFieldProps as NativeTextFieldProps} from 'solid-aria-components';
import type {JSX} from '@solidjs/web';
import './TextField.css';
import './Form.css';

export interface TextFieldProps extends NativeTextFieldProps {
  label?: JSX.Element;
}

export function TextField(props: TextFieldProps) {
  return (
    <NativeTextField {...props} className="react-aria-TextField">
      <Label class="react-aria-Label">{props.label}</Label>
      <Input className="react-aria-Input inset" />
    </NativeTextField>
  );
}
