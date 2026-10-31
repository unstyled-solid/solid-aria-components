import {render} from '@solidjs/web';
import {RangeCalendar} from './vanilla/RangeCalendar.solid';
export const title = 'RangeCalendar vanilla';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <RangeCalendar {...props} />, element);}
