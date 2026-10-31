'use client';
import {ToggleButton as NativeToggleButton, type ToggleButtonProps as NativeToggleButtonProps} from 'solid-aria-components';
import type {JSX} from '@solidjs/web';
import './ToggleButton.css';

export interface ToggleButtonProps extends Omit<NativeToggleButtonProps, 'children'> {
  variant?: 'primary' | 'secondary' | 'quiet';
  children?: JSX.Element;
}

export function ToggleButton(props: ToggleButtonProps) {
  return (
    <NativeToggleButton {...props} className="react-aria-ToggleButton button-base" data-variant={props.variant ?? 'primary'}>
      <span>{props.children}</span>
    </NativeToggleButton>
  );
}
