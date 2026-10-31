import {render} from '@solidjs/web';
import {createSignal as createIslandProps} from 'solid-js';
import { Disclosure, DisclosureHeader, DisclosurePanel } from '../Tabs/vanilla/Disclosure';
import { createSignal } from 'solid-js';
function Example(props: Record<string, unknown>) {
  let [isExpanded, setIsExpanded] = createSignal(true);
  return <Disclosure
  /*- begin highlight -*/ isExpanded={isExpanded()} onExpandedChange={setIsExpanded}>
      {/*- end highlight -*/}
      <DisclosureHeader>Download, Install, and Set Up</DisclosureHeader>
      <DisclosurePanel>Instructions on how to download, install, and set up</DisclosurePanel>
    </Disclosure>;
}
export const title = "Disclosure source example 3";
export function mount(element: HTMLElement, initialProps: Record<string, unknown> = {}) {
  const [props, update] = createIslandProps(initialProps);
  const dispose = render(() => <Example {...props()} />, element);
  return Object.assign(dispose, {update});
}
