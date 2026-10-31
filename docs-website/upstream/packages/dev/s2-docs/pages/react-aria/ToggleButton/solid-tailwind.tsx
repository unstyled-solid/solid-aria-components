import {render} from '@solidjs/web';
import {ToggleButton} from './tailwind/ToggleButton.solid';
export const title = 'ToggleButton — Tailwind';
export function mount(element: HTMLElement, props: Partial<Parameters<typeof ToggleButton>[0]> = {}) {
  return render(() => <ToggleButton {...props}>{props.children ?? 'Pin'}</ToggleButton>, element);
}
