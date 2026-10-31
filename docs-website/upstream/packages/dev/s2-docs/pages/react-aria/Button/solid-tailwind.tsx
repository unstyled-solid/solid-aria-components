import {render} from '@solidjs/web';
import {Button} from './tailwind/Button.solid';
export const title = 'Button — Tailwind';
export function mount(element: HTMLElement, props: Partial<Parameters<typeof Button>[0]> = {}) {
  return render(() => <Button {...props}>{props.children ?? 'Press me'}</Button>, element);
}
