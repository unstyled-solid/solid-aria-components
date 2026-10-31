import {Form as RACForm, type FormProps} from 'solid-aria-components/Form';
import {type LabelProps, Label as RACLabel} from 'solid-aria-components/Label';
import {type FieldErrorProps, FieldError as RACFieldError} from 'solid-aria-components/FieldError';
import {type ButtonProps, Button} from 'solid-aria-components/Button';
import {type TextProps} from 'solid-aria-components/Text';
import './Form.css';
import {Text} from './solid-Content';

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
