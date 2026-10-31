import {render} from '@solidjs/web';
import {ColorArea} from './vanilla/ColorArea.solid';
export const title = 'ColorArea vanilla';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <ColorArea {...props} />, element);}
