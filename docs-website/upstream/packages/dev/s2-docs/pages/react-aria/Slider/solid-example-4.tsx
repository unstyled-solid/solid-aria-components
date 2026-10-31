import {render} from '@solidjs/web';
import {Slider} from './vanilla/Slider.solid';
import {createSignal} from 'solid-js';
function Example() {
  let [currentValue, setCurrentValue] = createSignal(25);
  let [finalValue, setFinalValue] = createSignal(25);

  return (
    <>
      <Slider
        label="Cookies to buy"
        /*- begin highlight -*/
        value={currentValue()}
        onChange={setCurrentValue}
        onChangeEnd={setFinalValue} />
        {/*- end highlight -*/}
      <pre style={{'font-size': '12px'}}>
        onChange value: {currentValue()}{'\n'}
        onChangeEnd value: {finalValue()}
      </pre>
    </>
  );
}
export const title = 'Slider example 4';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <Example {...props} />, element);}
