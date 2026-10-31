import {render} from '@solidjs/web';
import {ColorField} from './tailwind/ColorField.solid';
export const title = 'ColorField tailwind';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <ColorField {...props} />, element);}
