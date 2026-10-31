import {render} from '@solidjs/web';
import {ColorWheel} from './tailwind/ColorWheel.solid';
export const title = 'ColorWheel tailwind';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <ColorWheel {...props} />, element);}
