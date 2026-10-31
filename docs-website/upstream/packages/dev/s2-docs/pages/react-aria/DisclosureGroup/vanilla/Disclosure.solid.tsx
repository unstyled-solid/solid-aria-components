import type { JSX } from '@solidjs/web';
import { omit } from 'solid-js';
'use client';
import { Button } from 'solid-aria-components';
import { Disclosure as AriaDisclosure, DisclosurePanel as AriaDisclosurePanel, type DisclosureProps, type DisclosurePanelProps, type HeadingProps } from 'solid-aria-components';
import { Heading } from './Content.solid';
import { ChevronRight } from '../native-icons/solid-icons';
import './Disclosure.css';
export function Disclosure(props: DisclosureProps) {
    return <AriaDisclosure {...props}/>;
}
export function DisclosureHeader(live0: HeadingProps) {
    return (<Heading {...omit(live0, "children")}>
      <Button slot="trigger" className="disclosure-button">
        <ChevronRight size={16}/>
        <span>{live0.children}</span>
      </Button>
    </Heading>);
}
export function DisclosurePanel(props: DisclosurePanelProps) {
    return (<AriaDisclosurePanel {...props}>
      <div>{props.children}</div>
    </AriaDisclosurePanel>);
}
