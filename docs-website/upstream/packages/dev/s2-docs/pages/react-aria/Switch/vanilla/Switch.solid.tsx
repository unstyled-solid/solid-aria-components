'use client';
import {
  SwitchField,
  SwitchButton,
  type SwitchFieldProps,
  type ValidationResult
} from 'solid-aria-components';
import './Switch.css';
import {Description, FieldError} from '../../Button/vanilla/Form.solid';
import type {JSX} from '@solidjs/web';
import {omit} from 'solid-js';

export interface SwitchProps extends Omit<SwitchFieldProps, 'children'> {
  children: JSX.Element;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function Switch(props: SwitchProps) {
  const fieldProps = omit(props, 'children', 'description', 'errorMessage');
  return (
    <SwitchField {...fieldProps}>
      {field => <>
      <SwitchButton>
        {state => (
          <>
            <div class="track indicator">
              <div
                data-disabled={state.isDisabled || undefined}
                class={state.isSelected ? 'handle' : 'handle indicator'}
              />
            </div>
            {props.children}
          </>
        )}
      </SwitchButton>
      {props.description && <Description>{props.description}</Description>}
      <FieldError>{props.errorMessage}</FieldError>
      </>}
    </SwitchField>
  );
}
