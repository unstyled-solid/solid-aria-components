import {render} from '@solidjs/web';
import {createSignal} from 'solid-js';
import {Checkbox} from './vanilla/Checkbox.solid';
export const title = 'Selection';
export function Example(props: Partial<Parameters<typeof Checkbox>[0]>) {
  const [selected, setSelection] = createSignal(false);
  return <><Checkbox {...props} isSelected={selected()} onChange={setSelection}>Subscribe</Checkbox><p>{`You are ${props.isIndeterminate ? 'partially subscribed' : selected() ? 'subscribed' : 'unsubscribed'}`}</p></>;
}
export function mount(element: HTMLElement, props: Partial<Parameters<typeof Checkbox>[0]> = {}) { return render(() => <Example {...props} />, element); }
