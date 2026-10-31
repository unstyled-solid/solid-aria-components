import { omit, useContext } from 'solid-js';
import type { Ref } from 'solid-js';
import type { JSX } from '@solidjs/web';
import { Button } from 'solid-aria-components';
import {
  Disclosure as AriaDisclosure,
  DisclosurePanel as AriaDisclosurePanel,
  type DisclosureProps,
  type DisclosurePanelProps,
  type HeadingProps } from
'solid-aria-components';
import { Heading } from './Content';
import { ChevronRight } from '../icons';
import './Disclosure.css';

export function Disclosure(props: DisclosureProps) {
  return <AriaDisclosure {...props} />;
}

export function DisclosureHeader(_props: HeadingProps) {const props = omit(_props, "children");
  return (
    <Heading {...props}>
      <Button slot="trigger" className="disclosure-button">
        <ChevronRight size={16} />
        <span>{_props.children}</span>
      </Button>
    </Heading>);

}

export function DisclosurePanel(props: DisclosurePanelProps) {
  return (
    <AriaDisclosurePanel {...props}>
      <div>{props.children}</div>
    </AriaDisclosurePanel>);

}
