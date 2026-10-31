import { render } from '@solidjs/web';
import { DisclosureGroup } from './vanilla/DisclosureGroup.solid';
import { Disclosure, DisclosureHeader, DisclosurePanel } from './vanilla/Disclosure.solid';
function Example(props: Record<string, unknown>) {
    return (<DisclosureGroup {...props}>
  <Disclosure>
    <DisclosureHeader>Personal Information</DisclosureHeader>
    <DisclosurePanel>Personal information form here.</DisclosurePanel>
  </Disclosure>
  <Disclosure>
    <DisclosureHeader>Billing Address</DisclosureHeader>
    <DisclosurePanel>Billing address form here.</DisclosurePanel>
  </Disclosure>
    </DisclosureGroup>);
}
export const title = 'DisclosureGroup example 1';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props}/>, element); }
