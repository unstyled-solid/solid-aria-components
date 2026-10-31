import {render} from '@solidjs/web';
import {parseColor} from 'solid-aria-components';
import {ColorArea} from './vanilla/ColorArea.solid';
import {createSignal} from 'solid-js';
function Example() {
  const initialValue = parseColor('#9B80FF');
  let [currentValue, setCurrentValue] = createSignal(initialValue);
  let [finalValue, setFinalValue] = createSignal(initialValue);

  return (
    <>
      <ColorArea
        xChannel="red"
        yChannel="green"
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
export const title = 'ColorArea example 3';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <Example {...props} />, element);}
