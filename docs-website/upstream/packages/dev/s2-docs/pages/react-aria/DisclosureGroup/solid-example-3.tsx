import { render } from '@solidjs/web';
import type { Key } from 'solid-aria-components';
import { DisclosureGroup } from './vanilla/DisclosureGroup.solid';
import { Disclosure, DisclosureHeader, DisclosurePanel } from './vanilla/Disclosure.solid';
import { createSignal } from 'solid-js';
function Example() {
    let [expandedKeys, setExpandedKeys] = createSignal(new Set<Key>(['system']));
    return (<DisclosureGroup 
    /*- begin highlight -*/
    expandedKeys={expandedKeys()} onExpandedChange={setExpandedKeys}>
      {/*- end highlight -*/}
      <Disclosure id="settings">
        <DisclosureHeader>Settings</DisclosureHeader>
        <DisclosurePanel>Application settings content</DisclosurePanel>
      </Disclosure>
      <Disclosure id="preferences">
        <DisclosureHeader>Preferences</DisclosureHeader>
        <DisclosurePanel>User preferences content</DisclosurePanel>
      </Disclosure>
      <Disclosure id="advanced">
        <DisclosureHeader>Advanced</DisclosureHeader>
        <DisclosurePanel>Advanced configuration options</DisclosurePanel>
      </Disclosure>
    </DisclosureGroup>);
}
export const title = 'DisclosureGroup example 3';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props}/>, element); }
