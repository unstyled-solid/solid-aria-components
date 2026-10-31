import {render} from '@solidjs/web';
import {Calendar} from './vanilla/Calendar.solid';
export const title = 'Calendar vanilla';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <Calendar {...props} />, element);}
