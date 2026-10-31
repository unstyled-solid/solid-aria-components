import {render} from '@solidjs/web';
import {Calendar} from './tailwind/Calendar.solid';
export const title = 'Calendar tailwind';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <Calendar {...props} />, element);}
