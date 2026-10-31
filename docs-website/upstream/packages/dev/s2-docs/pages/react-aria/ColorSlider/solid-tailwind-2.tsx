import {render} from '@solidjs/web';
import {ColorSlider} from './tailwind/ColorSlider.solid';
export const title = 'ColorSlider tailwind';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <ColorSlider channel="hue" defaultValue="hsl(0, 100%, 50%)" {...props} />, element);}
