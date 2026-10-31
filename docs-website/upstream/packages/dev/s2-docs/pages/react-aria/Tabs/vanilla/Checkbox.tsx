import { omit, useContext } from 'solid-js';
import type { Ref } from 'solid-js';
import type { JSX } from '@solidjs/web';
import {
  CheckboxButton,
  CheckboxField,
  type CheckboxFieldProps,
  type ValidationResult } from
'solid-aria-components';
import './Checkbox.css';
import { Description, FieldError } from './Form';

interface CheckboxProps extends CheckboxFieldProps {
  children?: JSX.Element;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function Checkbox(_props: CheckboxProps) {const props = omit(_props, "children", "description", "errorMessage");
  return (
    <CheckboxField {...props}>
      {() => <>
      <CheckboxButton>
        {(_props2) =>
        <>
            <div class="indicator">
              <svg
              viewBox="0 0 18 18"
              aria-hidden="true">
              
                {_props2.isIndeterminate ?
              <rect x={1} y={7.5} width={16} height={3} /> :

              <polyline points="2 9 7 14 16 4" />
              }
              </svg>
            </div>
            {_props.children}
          </>
        }
      </CheckboxButton>
      {_props.description && <Description>{_props.description}</Description>}
      <FieldError>{_props.errorMessage}</FieldError>
      </>}
    </CheckboxField>);

}
