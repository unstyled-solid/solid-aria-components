import {render} from '@solidjs/web';
import {ColorWheel} from './vanilla/ColorWheel.solid';
export const title = 'ColorWheel vanilla';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <ColorWheel {...props} />, element);}
