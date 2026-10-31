import { render } from '@solidjs/web';
import { ColorPicker } from './vanilla/ColorPicker.solid';
export const title = 'ColorPicker vanilla';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {
    return render(() => <ColorPicker {...props}/>, element);
}
