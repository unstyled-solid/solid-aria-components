import {render} from '@solidjs/web';
import {DateField} from './tailwind/DateField.solid';
export const title = 'DateField tailwind';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <DateField {...props} />, element);}
