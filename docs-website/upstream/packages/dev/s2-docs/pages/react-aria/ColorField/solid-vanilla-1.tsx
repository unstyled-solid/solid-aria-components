import {render} from '@solidjs/web';
import {ColorField} from './vanilla/ColorField.solid';
export const title = 'ColorField vanilla';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <ColorField {...props} />, element);}
