import {render} from '@solidjs/web';
import {createSignal} from 'solid-js';
import {Separator} from '../Tabs/tailwind/Separator';
export const title = 'Separator tailwind visual example';
export function mount(element: HTMLElement, initialProps: Record<string, unknown> = {}) {
  const [props, update] = createSignal(initialProps);
  const dispose = render(() => <Separator {...{}} {...props()} />, element);
  return Object.assign(dispose, {update});
}
