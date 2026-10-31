import { omit, useContext } from 'solid-js';
import type { Ref } from 'solid-js';
import type { JSX } from '@solidjs/web';
import { Form as RACForm, type FormProps } from 'solid-aria-components';
import { type LabelProps, Label as RACLabel } from 'solid-aria-components';
import { type FieldErrorProps, FieldError as RACFieldError } from 'solid-aria-components';
import { type ButtonProps, Button } from 'solid-aria-components';
import { type TextProps } from 'solid-aria-components';
import './Form.css';
import { Text } from './Content';

export function Form(props: FormProps) {
  return <RACForm {...props} />;
}

export function Label(props: LabelProps) {
  return <RACLabel {...props} />;
}

export function FieldError(props: FieldErrorProps) {
  return <RACFieldError {...props} />;
}

export function Description(props: TextProps) {
  return <Text slot="description" class="field-description" {...props} />;
}

export function FieldButton(props: ButtonProps) {
  return <Button {...props} className="field-Button" />;
}
