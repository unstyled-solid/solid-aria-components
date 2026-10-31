import {render} from '@solidjs/web';
import {ColorSwatch} from './tailwind/ColorSwatch.solid';
export const title = 'ColorSwatch tailwind';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <ColorSwatch {...props} />, element);}
