import {render} from '@solidjs/web';
import {Slider} from './vanilla/Slider.solid';
function Example(props: Record<string, unknown>) {return (<Slider
  label="Range"
  defaultValue={[30, 60]}
  thumbLabels={['start', 'end']} />);}
export const title = 'Slider example 5';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <Example {...props} />, element);}
