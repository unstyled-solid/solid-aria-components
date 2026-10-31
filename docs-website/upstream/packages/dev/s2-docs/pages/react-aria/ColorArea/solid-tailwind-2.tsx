import {render} from '@solidjs/web';
import {ColorArea} from './tailwind/ColorArea.solid';
export const title = 'ColorArea tailwind';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <ColorArea {...props} />, element);}
