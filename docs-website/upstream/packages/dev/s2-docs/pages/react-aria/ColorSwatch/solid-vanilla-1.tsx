import {render} from '@solidjs/web';
import {ColorSwatch} from './vanilla/ColorSwatch.solid';
export const title = 'ColorSwatch vanilla';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <ColorSwatch {...props} />, element);}
