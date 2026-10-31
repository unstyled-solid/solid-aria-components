import {render} from '@solidjs/web';
import {Slider} from './vanilla/Slider.solid';
export const title = 'Slider vanilla';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <Slider {...props} />, element);}
