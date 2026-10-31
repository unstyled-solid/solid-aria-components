'use client';
import {Button as NativeButton, type ButtonProps as NativeButtonProps} from 'solid-aria-components';
import './Button.css';

export interface ButtonProps extends NativeButtonProps {
  variant?: 'primary' | 'secondary' | 'quiet';
}

export function Button(props: ButtonProps) {
  return <NativeButton {...props} className="react-aria-Button button-base" data-variant={props.variant ?? 'primary'} />;
}
