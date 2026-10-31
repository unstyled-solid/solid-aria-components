import {render} from '@solidjs/web';
import {DateRangePicker} from './vanilla/DateRangePicker.solid';
export const title = 'DateRangePicker vanilla';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <DateRangePicker {...props} />, element);}
