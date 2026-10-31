import { render } from '@solidjs/web';
import { parseColor } from 'solid-aria-components';
import { ColorPicker } from './vanilla/ColorPicker.solid';
import { createSignal } from 'solid-js';
function Example() {
    let [value, setValue] = createSignal(parseColor('hsl(50, 100%, 50%)'));
    return (<>
      <ColorPicker label="Color" 
    /*- begin highlight -*/
    value={value()} onChange={setValue}/>
        {/*- end highlight -*/}
      <pre style={{ "font-size": "12px" }}>Selected color: {value().toString('hsl')}</pre>
    </>);
}
export const title = 'ColorPicker example 1';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props}/>, element); }
