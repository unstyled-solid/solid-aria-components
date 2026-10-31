import {render} from '@solidjs/web';
import {createSignal as createIslandProps} from 'solid-js';
import { Disclosure, DisclosureHeader, DisclosurePanel } from '../Tabs/tailwind/Disclosure';
function Example(props: Record<string, unknown>) {
  return <Disclosure {...props}>
  <DisclosureHeader>Files</DisclosureHeader>
  <DisclosurePanel>Files content</DisclosurePanel>
</Disclosure>;
}
export const title = "Disclosure source example 2";
export function mount(element: HTMLElement, initialProps: Record<string, unknown> = {}) {
  const [props, update] = createIslandProps(initialProps);
  const dispose = render(() => <Example {...props()} />, element);
  return Object.assign(dispose, {update});
}
