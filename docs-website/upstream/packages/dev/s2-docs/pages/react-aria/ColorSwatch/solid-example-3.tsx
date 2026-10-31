import {render} from '@solidjs/web';
import {ColorSwatch} from './vanilla/ColorSwatch.solid';
function Example(props: Record<string, unknown>) {return (<ColorSwatch
  color="#f00"
  aria-label="Background color"
  colorName="Fire truck red" />);}
export const title = 'ColorSwatch example 3';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <Example {...props} />, element);}
