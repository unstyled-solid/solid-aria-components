import {render} from '@solidjs/web';
import {TimeField} from './vanilla/TimeField.solid';
export const title = 'TimeField vanilla';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <TimeField {...props} />, element);}
