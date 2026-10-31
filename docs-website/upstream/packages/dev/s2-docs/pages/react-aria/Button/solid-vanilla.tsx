import {render} from '@solidjs/web';
import {Button} from './vanilla/Button.solid';
export const title = 'Button — Vanilla CSS';
export function mount(element: HTMLElement, props: Partial<Parameters<typeof Button>[0]> = {}) {
  return render(() => <Button {...props}>{props.children ?? 'Press me'}</Button>, element);
}
