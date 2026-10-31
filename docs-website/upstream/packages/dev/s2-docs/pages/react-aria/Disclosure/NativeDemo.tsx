import {Disclosure, DisclosurePanel, Heading, Button} from 'solid-aria-components';
import {render} from '@solidjs/web';
export const title = 'System Requirements disclosure';
export function mount(element: HTMLElement) {return render(() => <NativeDemo />, element);}
import './Disclosure.css';
import './Content.css';

export default function NativeDemo() {
  return <Disclosure>
    <Heading>
      <Button slot="trigger" className="disclosure-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
        <span>System Requirements</span>
      </Button>
    </Heading>
    <DisclosurePanel><div>Details about system requirements here.</div></DisclosurePanel>
  </Disclosure>;
}
