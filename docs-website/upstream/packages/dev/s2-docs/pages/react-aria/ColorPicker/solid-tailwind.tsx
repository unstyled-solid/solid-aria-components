import { render } from '@solidjs/web';
import { ColorPicker } from './tailwind/ColorPicker.solid';
export const title = 'ColorPicker Tailwind';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {
    return render(() => <ColorPicker {...props}/>, element);
}
