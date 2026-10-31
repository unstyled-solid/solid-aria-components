import {render} from '@solidjs/web';
import {createSignal} from 'solid-js';
import {ProgressCircle} from '../Tabs/vanilla/ProgressCircle';
export const title = 'ProgressBar vanilla visual example';
export function mount(element: HTMLElement, initialProps: Record<string, unknown> = {}) {
  const [props, update] = createSignal(initialProps);
  const dispose = render(() => <ProgressCircle {...{'aria-label': 'Loading…', value: 60, size: 64}} {...props()} />, element);
  return Object.assign(dispose, {update});
}
