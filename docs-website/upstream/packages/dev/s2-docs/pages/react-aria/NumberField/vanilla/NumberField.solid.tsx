'use client';
import {
  Group,
  Input,
  NumberField as AriaNumberField,
  type NumberFieldProps as AriaNumberFieldProps,
  type ValidationResult
} from 'solid-aria-components';
import {Button} from '../../Button/vanilla/Button.solid';
import {Plus, Minus} from '../../Button/icons.solid';
import {Label, FieldError, Description} from '../../Button/vanilla/Form.solid';
import './NumberField.css';

export interface NumberFieldProps extends AriaNumberFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
}

export function NumberField(props: NumberFieldProps) {
  return (
    <AriaNumberField {...props}>
      <Label>{props.label}</Label>
      <Group>
        <Input className="react-aria-Input inset" />
        <Button slot="decrement" variant="secondary">
          <Minus />
        </Button>
        <Button slot="increment" variant="secondary">
          <Plus />
        </Button>
      </Group>
      {props.description && <Description>{props.description}</Description>}
      <FieldError>{props.errorMessage}</FieldError>
    </AriaNumberField>
  );
}
