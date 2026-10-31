import {render} from '@solidjs/web';
import {ColorField} from './vanilla/ColorField.solid';
import {parseColor, type Color} from 'solid-aria-components';
import {createSignal} from 'solid-js';
function Example() {
  let [value, setValue] = createSignal<Color | null>(parseColor('#e73623'));

  return (
    <div>
      <ColorField
        label="Primary color"
        placeholder="Enter a color"
        value={value()}
        onChange={setValue} />
      <pre style={{'font-size': '12px'}}>Current value: {value()?.toString('hex')}</pre>
    </div>
  );
}
export const title = 'ColorField example 3';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <Example {...props} />, element);}
