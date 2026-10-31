import {render} from '@solidjs/web';
import {Checkbox} from './tailwind/Checkbox.solid';
export const title = 'Checkbox — Tailwind';
export function mount(element: HTMLElement, props: Partial<Parameters<typeof Checkbox>[0]> = {}) {
  return render(() => <Checkbox {...props}>{props.children ?? 'Remember me'}</Checkbox>, element);
}
