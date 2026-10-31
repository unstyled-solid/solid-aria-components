import {render} from '@solidjs/web';
import {RangeCalendar} from './tailwind/RangeCalendar.solid';
export const title = 'RangeCalendar tailwind';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <RangeCalendar {...props} />, element);}
