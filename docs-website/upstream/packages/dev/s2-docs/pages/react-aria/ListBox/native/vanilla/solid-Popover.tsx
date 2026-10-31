import {omit, Show} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {
  OverlayArrow,
  Popover as AriaPopover,
  type PopoverProps as AriaPopoverProps
} from 'solid-aria-components/Popover';
import clsx from 'clsx';
import './Popover.css';

export interface PopoverProps extends Omit<AriaPopoverProps, 'children'> {
  children: JSX.Element;
  hideArrow?: boolean;
}

export function Popover(inputProps: PopoverProps) {
  let props = omit(inputProps, "children", "hideArrow");
  return (
    <AriaPopover {...props} className={clsx('react-aria-Popover', props.className)}>
      {live => (
        <>
          <Show when={!inputProps.hideArrow && live.trigger !== 'MenuTrigger' && live.trigger !== 'SubmenuTrigger'}>
            <OverlayArrow>
              <svg width={12} height={12} viewBox="0 0 12 12">
                <path d="M0 0 L6 6 L12 0" />
              </svg>
            </OverlayArrow>
          </Show>
          {inputProps.children}
        </>
      )}
    </AriaPopover>
  );
}
