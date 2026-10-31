import {render} from '@solidjs/web';
import {createSignal} from 'solid-js';
import {Slider} from './solid-Slider';

export const title = 'Slider value — native Solid 2';
// Adapted from the complete Slider.mdx Value example, lines 43–68.
function Example() {
  const [currentValue, setCurrentValue] = createSignal(25);
  const [finalValue, setFinalValue] = createSignal(25);
  return <>
    <Slider label="Cookies to buy" value={currentValue()} onChange={setCurrentValue} onChangeEnd={setFinalValue} />
    <pre style={{'font-size': '12px'}}>onChange value: {currentValue()}{'\n'}onChangeEnd value: {finalValue()}</pre>
  </>;
}
export function mount(element: HTMLElement) {
  return render(() => <Example />, element);
}
