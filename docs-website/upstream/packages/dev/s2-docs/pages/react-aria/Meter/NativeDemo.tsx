import {Meter, Label} from 'solid-aria-components';
import {render} from '@solidjs/web';
export const title = 'Storage space meter';
export function mount(element: HTMLElement) {return render(() => <NativeDemo />, element);}
import './Meter.css';
import './Form.css';

export default function NativeDemo() {
  return <Meter value={25}>
    {state => <>
      <Label class="react-aria-Label">Storage space</Label>
      <span class="value">{state.valueText}</span>
      <div class="track inset"><div class="fill" style={{width: state.percentage + '%', '--fill-color': state.percentage < 70 ? 'var(--green)' : state.percentage < 90 ? 'var(--orange)' : 'var(--red)'}} /></div>
    </>}
  </Meter>;
}
