import type { JSX } from '@solidjs/web';
import { omit } from 'solid-js';
'use client';
import { useContext } from 'solid-js';
import { Disclosure as AriaDisclosure, DisclosurePanel as AriaDisclosurePanel, DisclosureStateContext, Heading, type DisclosurePanelProps as AriaDisclosurePanelProps, type DisclosureProps as AriaDisclosureProps } from 'solid-aria-components';
import { composeRenderProps } from 'solid-aria-components';
import { Button } from './Button.solid';
import { tv } from 'tailwind-variants';
import { ChevronRight } from '../native-icons/solid-icons';
import { composeTailwindRenderProps } from './utils.solid';
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
export function Disclosure(live0: DisclosureProps) {
    return (<AriaDisclosure {...omit(live0, "children")} className={composeRenderProps(live0.className, (className, renderProps) => disclosure({ ...renderProps, className }))}>{() => <>
      {live0.children}
    </>}</AriaDisclosure>);
}
export interface DisclosureHeaderProps {
    children: JSX.Element;
}
export function DisclosureHeader(live1: DisclosureHeaderProps) {
    let state = useContext(DisclosureStateContext)!;
    return (<Heading className="text-lg font-semibold m-0">
      <Button slot="trigger" variant="quiet" className="w-full justify-start font-medium">
        {(live2) => (<>
            <ChevronRight aria-hidden="true" className={chevron({ isExpanded: state.isExpanded, isDisabled: live2.isDisabled })}/>
            <span>{live1.children}</span>
          </>)}
      </Button>
    </Heading>);
}
export interface DisclosurePanelProps extends AriaDisclosurePanelProps {
    children: JSX.Element;
}
export function DisclosurePanel(live3: DisclosurePanelProps) {
    return (<AriaDisclosurePanel {...omit(live3, "children")} className={composeTailwindRenderProps(omit(live3, "children").className, 'h-(--disclosure-panel-height) motion-safe:transition-[height] overflow-clip')}>
      <div class="px-4 py-2">{live3.children}</div>
    </AriaDisclosurePanel>);
}
