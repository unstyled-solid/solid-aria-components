'use client';
import {NumberField as NativeNumberField, Label, Input, Group, Button, type NumberFieldProps as NativeNumberFieldProps} from 'solid-aria-components';
import type {JSX} from '@solidjs/web';
import './Button.css';
import './NumberField.css';
import './Form.css';

export interface NumberFieldProps extends NativeNumberFieldProps {
  label?: JSX.Element;
}

export function NumberField(props: NumberFieldProps) {
  return (
    <NativeNumberField {...props} className="react-aria-NumberField">
      <Label class="react-aria-Label">{props.label}</Label>
      <Group>
        <Input className="react-aria-Input inset" />
        <Button slot="decrement" className="react-aria-Button button-base" data-variant="secondary">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14" /></svg>
        </Button>
        <Button slot="increment" className="react-aria-Button button-base" data-variant="secondary">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5v14" /></svg>
        </Button>
      </Group>
    </NativeNumberField>
  );
}
