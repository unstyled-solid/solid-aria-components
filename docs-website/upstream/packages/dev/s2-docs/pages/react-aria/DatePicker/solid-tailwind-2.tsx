import {render} from '@solidjs/web';
import {DatePicker} from './tailwind/DatePicker.solid';
export const title = 'DatePicker tailwind';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <DatePicker {...props} />, element);}
