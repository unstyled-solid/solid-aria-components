import {render} from '@solidjs/web';
import {TextField} from './vanilla/TextField.solid';
export const title = 'TextField — Vanilla CSS';
export function mount(element: HTMLElement, props: Partial<Parameters<typeof TextField>[0]> = {}) {
  return render(() => <TextField label="Name" placeholder="Enter your full name" {...props} />, element);
}
