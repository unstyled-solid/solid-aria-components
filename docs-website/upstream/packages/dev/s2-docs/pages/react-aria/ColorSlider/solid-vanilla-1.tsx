import {render} from '@solidjs/web';
import {ColorSlider} from './vanilla/ColorSlider.solid';
export const title = 'ColorSlider vanilla';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <ColorSlider channel="hue" defaultValue="hsl(0, 100%, 50%)" {...props} />, element);}
