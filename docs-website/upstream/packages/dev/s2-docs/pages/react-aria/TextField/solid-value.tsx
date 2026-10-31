import {render} from '@solidjs/web';
import {createSignal} from 'solid-js';
import {TextField} from './vanilla/TextField.solid';
export const title = 'Value';
export function Example() {
  const [name, setName] = createSignal('');
  return <><TextField label="Name" placeholder="Enter your full name" value={name()} onChange={setName} /><p>Your name: {name()}</p></>;
}
export function mount(element: HTMLElement) { return render(() => <Example />, element); }
