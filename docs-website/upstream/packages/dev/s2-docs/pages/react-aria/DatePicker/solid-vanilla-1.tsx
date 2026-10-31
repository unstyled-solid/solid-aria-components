import {render} from '@solidjs/web';
import {DatePicker} from './vanilla/DatePicker.solid';
export const title = 'DatePicker vanilla';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <DatePicker {...props} />, element);}
