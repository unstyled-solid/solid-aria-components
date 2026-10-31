import {render} from '@solidjs/web';
import {createSignal} from 'solid-js';
import {ToggleButton} from './vanilla/ToggleButton.solid';
import {Star} from '../Button/icons.solid';
export const title = 'Selection';
export function Example(props: Partial<Parameters<typeof ToggleButton>[0]>) {
  const [selected, setSelection] = createSignal(false);
  return <><ToggleButton {...props} aria-label="Star" isSelected={selected()} onChange={setSelection}><Star size={18} /></ToggleButton><p>{selected() ? 'Starred' : 'Not starred'}</p></>;
}
export function mount(element: HTMLElement, props: Partial<Parameters<typeof ToggleButton>[0]> = {}) { return render(() => <Example {...props} />, element); }
