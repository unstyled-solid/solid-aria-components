import {render} from '@solidjs/web';
import {createSignal} from 'solid-js';
import {Switch} from './vanilla/Switch.solid';
export const title = 'Selection';
export function Example(props: Partial<Parameters<typeof Switch>[0]>) {
  const [selected, setSelection] = createSignal(false);
  return <><Switch {...props} isSelected={selected()} onChange={setSelection}>Low power mode</Switch><p>{selected() ? 'Low' : 'High'} power mode active.</p></>;
}
export function mount(element: HTMLElement, props: Partial<Parameters<typeof Switch>[0]> = {}) { return render(() => <Example {...props} />, element); }
