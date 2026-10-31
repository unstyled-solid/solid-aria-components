import {render} from '@solidjs/web';
import {Slider} from './tailwind/Slider.solid';
export const title = 'Slider tailwind';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <Slider {...props} />, element);}
