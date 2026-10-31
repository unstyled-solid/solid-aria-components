import { omit, useContext } from 'solid-js';
import type { Ref } from 'solid-js';
import type { JSX } from '@solidjs/web';
import {
  Disclosure as AriaDisclosure,
  DisclosurePanel as AriaDisclosurePanel,
  DisclosureStateContext,
  Heading,
  type DisclosurePanelProps as AriaDisclosurePanelProps,
  type DisclosureProps as AriaDisclosureProps } from
'solid-aria-components';
import { composeRenderProps } from 'solid-aria-components';
import { Button } from './Button';
import { tv } from 'tailwind-variants';
import { ChevronRight } from '../icons';
import { composeTailwindRenderProps } from './utils';

const disclosure = tv({
  base: 'group min-w-50 font-sans rounded-lg text-neutral-900 dark:text-neutral-200'
});

const chevron = tv({
  base: 'w-4 h-4 text-neutral-500 dark:text-neutral-400 transition-transform duration-200 ease-in-out',
  variants: {
    isExpanded: {
      true: 'transform rotate-90'
    },
    isDisabled: {
      true: 'text-neutral-300 dark:text-neutral-600 forced-colors:text-[GrayText]'
    }
  }
});

export interface DisclosureProps extends AriaDisclosureProps {
  children: JSX.Element;
}

export function Disclosure(_props: DisclosureProps) {const props = omit(_props, "children");
  return (
    <AriaDisclosure
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
      disclosure({ ...renderProps, className })
      )}>
      {_props.children}
    </AriaDisclosure>);

}

export interface DisclosureHeaderProps {
  children: JSX.Element;
}

export function DisclosureHeader(_props2: DisclosureHeaderProps) {
  let _state = useContext(DisclosureStateContext)!;
  return (
    <Heading className="text-lg font-semibold m-0">
      <Button slot="trigger" variant="quiet" className="w-full justify-start font-medium">
        {(_props3) =>
        <>
            <ChevronRight aria-hidden="true" className={chevron({ isExpanded: _state.isExpanded, isDisabled: _props3.isDisabled })} />
            <span>{_props2.children}</span>
          </>
        }
      </Button>
    </Heading>);

}

export interface DisclosurePanelProps extends AriaDisclosurePanelProps {
  children: JSX.Element;
}

export function DisclosurePanel(_props4: DisclosurePanelProps) {const props = omit(_props4, "children");
  return (
    <AriaDisclosurePanel
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'h-(--disclosure-panel-height) motion-safe:transition-[height] overflow-clip'
      )}>
      <div class="px-4 py-2">{_props4.children}</div>
    </AriaDisclosurePanel>);

}
