import {render} from '@solidjs/web';
import {Time} from '@internationalized/date';
import {TimeField} from './vanilla/TimeField.solid';
import {createSignal} from 'solid-js';
function Example() {
  let [time, setTime] = createSignal<Time | null>(new Time(11, 45));

  return (
    <>
      <TimeField
        ///- begin highlight -///
        value={time()}
        onChange={setTime} />
      {/*- end highlight -*/}
      <p>Selected time: {time() ? time()!.toString() : '--'}</p>
    </>
  );
}
export const title = 'TimeField example 3';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <Example {...props} />, element);}
