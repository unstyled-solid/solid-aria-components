import {render} from '@solidjs/web';
import {createSignal as createIslandProps} from 'solid-js';
import { Disclosure, DisclosureHeader, DisclosurePanel } from '../Tabs/vanilla/Disclosure';
import { Button } from '../Tabs/vanilla/Button';
import { Settings } from '../Tabs/icons';
function Example(props: Record<string, unknown>) {
  return <Disclosure style={{
    "width": "200px"
  }}>
  <div style={{
      "display": 'flex',
      "align-items": 'center',
      "gap": "8px"
    }}>
    {/*- begin highlight -*/}
    <DisclosureHeader style={{
        "flex": 1
      }}>Files</DisclosureHeader>
    <Button aria-label="Settings"><Settings /></Button>
    {/*- end highlight -*/}
  </div>
  <DisclosurePanel>Files content</DisclosurePanel>
</Disclosure>;
}
export const title = "Disclosure source example 4";
export function mount(element: HTMLElement, initialProps: Record<string, unknown> = {}) {
  const [props, update] = createIslandProps(initialProps);
  const dispose = render(() => <Example {...props()} />, element);
  return Object.assign(dispose, {update});
}
