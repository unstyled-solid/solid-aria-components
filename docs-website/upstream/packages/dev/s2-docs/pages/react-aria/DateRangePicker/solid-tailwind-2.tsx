import {render} from '@solidjs/web';
import {DateRangePicker} from './tailwind/DateRangePicker.solid';
export const title = 'DateRangePicker tailwind';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <DateRangePicker {...props} />, element);}
