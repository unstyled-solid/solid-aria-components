'use client';
import {
  Button as RACButton,
  type ButtonProps as RACButtonProps
} from 'solid-aria-components';
import {composeRenderProps} from 'solid-aria-components';
import {ProgressCircle} from './ProgressCircle.solid';
import './Button.css';

interface ButtonProps extends RACButtonProps {
  /**
   * The visual style of the button (Vanilla CSS implementation specific).
   *
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'quiet';
}

export function Button(props: ButtonProps) {
  return (
    <RACButton
      {...props}
      className="react-aria-Button button-base"
      data-variant={props.variant || 'primary'}>
      {composeRenderProps(props.children, (children, live0) => (
        <>
          {!live0.isPending && children}
          {live0.isPending && <ProgressCircle aria-label="Saving..." isIndeterminate />}
        </>
      ))}
    </RACButton>
  );
}
