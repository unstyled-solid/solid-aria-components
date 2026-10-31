import {render} from '@solidjs/web';
import {TextField} from './tailwind/TextField.solid';
export const title = 'TextField — Tailwind';
export function mount(element: HTMLElement, props: Partial<Parameters<typeof TextField>[0]> = {}) {
  return render(() => <TextField label="Name" placeholder="Enter your full name" {...props} />, element);
}
