import {omit} from 'solid-js';
import type {JSX} from '@solidjs/web';
'use client';
import {
  OverlayArrow,
  Popover as AriaPopover,
  type PopoverProps as AriaPopoverProps
} from 'solid-aria-components';
import clsx from 'clsx';
import './Popover.css';

export interface PopoverProps extends Omit<AriaPopoverProps, 'children'> {
  children: JSX.Element;
  hideArrow?: boolean;
}

export function Popover(live0: PopoverProps) {
  return (
    <AriaPopover {...omit(live0, "children","hideArrow")} className={clsx('react-aria-Popover', live0.className)}>
      {(live1) => (
        <>
          {!live0.hideArrow && live1.trigger !== 'MenuTrigger' && live1.trigger !== 'SubmenuTrigger' && (
            <OverlayArrow>
              <svg width={12} height={12} viewBox="0 0 12 12">
                <path d="M0 0 L6 6 L12 0" />
              </svg>
            </OverlayArrow>
          )}
          {live0.children}
        </>
      )}
    </AriaPopover>
  );
}
