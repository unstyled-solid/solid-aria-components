import {
  Button as RACButton,
  type ButtonProps as RACButtonProps
} from 'solid-aria-components/Button';
import {composeRenderProps} from 'solid-aria-components/composeRenderProps';
import {ProgressCircle} from './solid-ProgressCircle';
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
      {composeRenderProps(props.children, (children, state) => (
        <>
          {!state.isPending && children}
          {state.isPending && <ProgressCircle aria-label="Saving..." isIndeterminate />}
        </>
      ))}
    </RACButton>
  );
}
