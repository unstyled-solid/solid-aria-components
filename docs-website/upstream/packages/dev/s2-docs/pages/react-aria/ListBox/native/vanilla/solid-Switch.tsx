import {omit} from 'solid-js';
import {
  SwitchField,
  SwitchButton,
  type SwitchFieldProps,
  type ValidationResult
} from 'solid-aria-components/Switch';
import './Switch.css';
import {Description, FieldError} from './solid-Form';
import type {JSX} from '@solidjs/web';

export interface SwitchProps extends Omit<SwitchFieldProps, 'children'> {
  children: JSX.Element;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function Switch(inputProps: SwitchProps) {
  let props = omit(inputProps, "children", "description", "errorMessage");
  return (
    <SwitchField {...props}>
      {field => <>
      <SwitchButton>
        {live => (
          <>
            <div class="track indicator">
              <div
                data-disabled={live.isDisabled || undefined}
                class={live.isSelected ? 'handle' : 'handle indicator'}
              />
            </div>
            {inputProps.children}
          </>
        )}
      </SwitchButton>
      {inputProps.description && <Description>{inputProps.description}</Description>}
      <FieldError>{inputProps.errorMessage}</FieldError>
      </>}
    </SwitchField>
  );
}
