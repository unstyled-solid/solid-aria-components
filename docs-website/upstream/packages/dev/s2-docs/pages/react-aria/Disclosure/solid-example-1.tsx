import {render} from '@solidjs/web';
import {createSignal as createIslandProps} from 'solid-js';
import { Disclosure, DisclosureHeader, DisclosurePanel } from '../Tabs/vanilla/Disclosure';
function Example(props: Record<string, unknown>) {
  return <Disclosure {...props}>
  <DisclosureHeader>System Requirements</DisclosureHeader>
  <DisclosurePanel>Details about system requirements here.</DisclosurePanel>
</Disclosure>;
}
export const title = "Disclosure source example 1";
export function mount(element: HTMLElement, initialProps: Record<string, unknown> = {}) {
  const [props, update] = createIslandProps(initialProps);
  const dispose = render(() => <Example {...props()} />, element);
  return Object.assign(dispose, {update});
}
