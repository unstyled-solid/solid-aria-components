import { omit, useContext } from 'solid-js';
import type { Ref } from 'solid-js';
import type { JSX } from '@solidjs/web';
import {
  Button as RACButton,
  type ButtonProps as RACButtonProps } from
'solid-aria-components';
import { composeRenderProps } from 'solid-aria-components';
import { ProgressCircle } from './ProgressCircle';
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
      {composeRenderProps(props.children, (children, _props) =>
      <>
          {!_props.isPending && children}
          {_props.isPending && <ProgressCircle aria-label="Saving..." isIndeterminate />}
        </>
      )}
    </RACButton>);

}
