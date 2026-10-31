import {render} from '@solidjs/web';
import {createSignal} from 'solid-js';
import {Meter} from '../Tabs/vanilla/Meter';
export const title = 'Meter vanilla visual example';
export function mount(element: HTMLElement, initialProps: Record<string, unknown> = {}) {
  const [props, update] = createSignal(initialProps);
  const dispose = render(() => <Meter {...{
    label: 'Data usage',
    minValue: 0,
    maxValue: 500,
    value: 250,
    formatOptions: {
      style: 'unit',
      unit: 'megabyte'
    }
  }} {...props()} />, element);
  return Object.assign(dispose, {update});
}
