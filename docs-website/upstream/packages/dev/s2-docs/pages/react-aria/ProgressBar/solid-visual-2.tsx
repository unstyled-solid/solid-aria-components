import {render} from '@solidjs/web';
import {createSignal} from 'solid-js';
import {ProgressBar} from '../Tabs/tailwind/ProgressBar';
export const title = 'ProgressBar tailwind visual example';
export function mount(element: HTMLElement, initialProps: Record<string, unknown> = {}) {
  const [props, update] = createSignal(initialProps);
  const dispose = render(() => <ProgressBar {...{label: 'Loading…', value: 80}} {...props()} />, element);
  return Object.assign(dispose, {update});
}
