import {render} from '@solidjs/web';
import {parseColor} from 'solid-aria-components';
import {ColorSlider} from './vanilla/ColorSlider.solid';
import {createSignal} from 'solid-js';
function Example() {
  const initialValue = parseColor('hsl(50, 100%, 50%)');
  let [currentValue, setCurrentValue] = createSignal(initialValue);
  let [finalValue, setFinalValue] = createSignal(initialValue);

  return (
    <>
      <ColorSlider
        channel="hue"
        /*- begin highlight -*/
        value={currentValue()}
        onChange={setCurrentValue}
        onChangeEnd={setFinalValue} />
        {/*- end highlight -*/}
      <pre style={{'font-size': '12px'}}>
        onChange value: {currentValue().toString('hex')}{'\n'}
        onChangeEnd value: {finalValue().toString('hex')}
      </pre>
    </>
  );
}
export const title = 'ColorSlider example 3';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <Example {...props} />, element);}
