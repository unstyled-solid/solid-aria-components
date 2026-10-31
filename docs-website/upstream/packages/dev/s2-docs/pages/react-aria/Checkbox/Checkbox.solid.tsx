'use client';
import {CheckboxField, CheckboxButton, type CheckboxFieldProps} from 'solid-aria-components';
import type {JSX} from '@solidjs/web';
import './Checkbox.css';

export interface CheckboxProps extends Omit<CheckboxFieldProps, 'children'> {
  children?: JSX.Element;
}

export function Checkbox(props: CheckboxProps) {
  return (
    <CheckboxField {...props} className="react-aria-CheckboxField">
      {() => <>
      <CheckboxButton className="react-aria-CheckboxButton">
        {state => <>
          <div class="indicator">
            <svg viewBox="0 0 18 18" aria-hidden="true">
              {state.isIndeterminate ? <rect x={1} y={7.5} width={16} height={3} /> : <polyline points="2 9 7 14 16 4" />}
            </svg>
          </div>
          {props.children}
        </>}
      </CheckboxButton>
      </>}
    </CheckboxField>
  );
}
