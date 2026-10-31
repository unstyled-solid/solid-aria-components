'use client';
import { CheckboxButton, CheckboxField, type CheckboxFieldProps, type ValidationResult } from 'solid-aria-components';
import './Checkbox.css';
import { Description, FieldError } from '../../Button/vanilla/Form.solid';
import type { JSX } from '@solidjs/web';
interface CheckboxProps extends CheckboxFieldProps {
    children?: JSX.Element;
    description?: string;
    errorMessage?: string | ((validation: ValidationResult) => string);
}
export function Checkbox(props: CheckboxProps) {
    return (<CheckboxField {...props}>
      {() => <>
      <CheckboxButton>
        {state => (<>
            <div class="indicator">
              <svg viewBox="0 0 18 18" aria-hidden="true">
                {state.isIndeterminate ? (<rect x={1} y={7.5} width={16} height={3}/>) : (<polyline points="2 9 7 14 16 4"/>)}
              </svg>
            </div>
            {props.children}
          </>)}
      </CheckboxButton>
      {props.description && <Description>{props.description}</Description>}
      <FieldError>{props.errorMessage}</FieldError>
      </>}
    </CheckboxField>);
}
