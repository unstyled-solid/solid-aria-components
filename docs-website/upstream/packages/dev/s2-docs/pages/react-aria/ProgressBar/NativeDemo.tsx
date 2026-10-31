import {ProgressBar, Label} from 'solid-aria-components';
import {render} from '@solidjs/web';
export const title = 'Loading… progress bar';
export function mount(element: HTMLElement) {return render(() => <NativeDemo />, element);}
import './ProgressBar.css';
import './Form.css';

export default function NativeDemo() {
  return <ProgressBar value={80}>
    {state => <>
      <Label class="react-aria-Label">Loading…</Label>
      <span class="value">{state.valueText}</span>
      <div class="track inset"><div class="fill" style={{'--percent': (state.isIndeterminate ? 100 : state.percentage) + '%'}} /></div>
    </>}
  </ProgressBar>;
}
