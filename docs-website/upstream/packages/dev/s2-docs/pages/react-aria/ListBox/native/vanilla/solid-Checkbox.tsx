import {omit} from 'solid-js';
import {
  CheckboxButton,
  CheckboxField,
  type CheckboxFieldProps,
  type ValidationResult
} from 'solid-aria-components/Checkbox';
import './Checkbox.css';
import {Description, FieldError} from './solid-Form';
import type {JSX} from '@solidjs/web';

interface CheckboxProps extends CheckboxFieldProps {
  children?: JSX.Element;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function Checkbox(inputProps: CheckboxProps) {
  let props = omit(inputProps, "children", "description", "errorMessage");
  return (
    <CheckboxField {...props}>
      {() => <>
      <CheckboxButton>
        {live => (
          <>
            <div class="indicator">
              <svg
                viewBox="0 0 18 18"
                aria-hidden="true"
                $key={live.isIndeterminate ? 'indeterminate' : 'check'}>
                {live.isIndeterminate ? (
                  <rect x={1} y={7.5} width={16} height={3} />
                ) : (
                  <polyline points="2 9 7 14 16 4" />
                )}
              </svg>
            </div>
            {inputProps.children}
          </>
        )}
      </CheckboxButton>
      {inputProps.description && <Description>{inputProps.description}</Description>}
      <FieldError>{inputProps.errorMessage}</FieldError>
      </>}
    </CheckboxField>
  );
}
