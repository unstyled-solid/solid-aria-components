import { render } from '@solidjs/web';
import { ColorSwatchPicker, ColorSwatchPickerItem } from './vanilla/ColorSwatchPicker.solid';
import { parseColor } from 'solid-aria-components';
import { createSignal } from 'solid-js';
function Example() {
    let [value, setValue] = createSignal(parseColor('#A00'));
    return (<>
      {/*- begin highlight -*/}
      <ColorSwatchPicker value={value()} onChange={setValue}>
      {/*- end highlight -*/}
        <ColorSwatchPickerItem color="#A00"/>
        <ColorSwatchPickerItem color="#f80"/>
        <ColorSwatchPickerItem color="#080"/>
        <ColorSwatchPickerItem color="#08f"/>
        <ColorSwatchPickerItem color="#088"/>
        <ColorSwatchPickerItem color="#008"/>
      </ColorSwatchPicker>
      <pre style={{ "font-size": "12px" }}>Selected color: {value().toString('rgb')}</pre>
    </>);
}
export const title = 'ColorSwatchPicker example 3';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props}/>, element); }
