import {render} from '@solidjs/web';
import {TimeField} from './tailwind/TimeField.solid';
export const title = 'TimeField tailwind';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <TimeField {...props} />, element);}
