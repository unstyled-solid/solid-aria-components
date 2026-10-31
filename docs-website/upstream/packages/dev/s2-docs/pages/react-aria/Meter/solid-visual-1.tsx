import {render} from '@solidjs/web';
import {createSignal} from 'solid-js';
import {Meter} from '../Tabs/vanilla/Meter';
export const title = 'Meter vanilla visual example';
export function mount(element: HTMLElement, initialProps: Record<string, unknown> = {}) {
  const [props, update] = createSignal(initialProps);
  const dispose = render(() => <Meter {...{label: 'Storage', value: 25}} {...props()} />, element);
  return Object.assign(dispose, {update});
}
