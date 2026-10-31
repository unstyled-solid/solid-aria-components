'use client';
import {SwitchField, SwitchButton, type SwitchFieldProps} from 'solid-aria-components';
import type {JSX} from '@solidjs/web';
import {omit} from 'solid-js';
import './Switch.css';

export interface SwitchProps extends Omit<SwitchFieldProps, 'children'> {
  children?: JSX.Element;
}

export function Switch(props: SwitchProps) {
  const fieldProps = omit(props, 'children');
  return (
    <SwitchField {...fieldProps} className="react-aria-SwitchField">
      {field => <>
      <SwitchButton className="react-aria-SwitchButton">
        {state => <>
          <div class="track indicator">
            <div data-disabled={state.isDisabled || undefined} class={state.isSelected ? 'handle' : 'handle indicator'} />
          </div>
          {props.children}
        </>}
      </SwitchButton>
      </>}
    </SwitchField>
  );
}
