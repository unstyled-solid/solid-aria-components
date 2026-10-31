import {render} from '@solidjs/web';
import {createSignal} from 'solid-js';
import {ProgressBar} from '../Tabs/vanilla/ProgressBar';
export const title = 'ProgressBar vanilla visual example';
export function mount(element: HTMLElement, initialProps: Record<string, unknown> = {}) {
  const [props, update] = createSignal(initialProps);
  const dispose = render(() => <ProgressBar {...{label: 'Loading…', value: 80}} {...props()} />, element);
  return Object.assign(dispose, {update});
}
