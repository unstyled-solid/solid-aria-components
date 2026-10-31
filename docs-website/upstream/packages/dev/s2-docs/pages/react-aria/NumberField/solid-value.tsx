import {render} from '@solidjs/web';
import {createSignal} from 'solid-js';
import {NumberField} from './vanilla/NumberField.solid';
export const title = 'Value';
export function Example() {
  const [value, setValue] = createSignal(25);
  return <div><NumberField label="Cookies to buy" value={value()} onChange={setValue} /><p>Current value: {value()}</p></div>;
}
export function mount(element: HTMLElement) { return render(() => <Example />, element); }
