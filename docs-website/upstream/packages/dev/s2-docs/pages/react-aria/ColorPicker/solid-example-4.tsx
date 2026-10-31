import { render } from '@solidjs/web';
import { getColorChannels, type ColorSpace } from 'solid-aria-components';
import { ColorPicker } from './vanilla/ColorPicker.solid';
import { ColorArea } from './vanilla/ColorArea.solid';
import { ColorSlider } from './vanilla/ColorSlider.solid';
import { Select, SelectItem } from './vanilla/Select.solid';
import { ColorField } from './vanilla/ColorField.solid';
import { createSignal, For } from 'solid-js';
function Example() {
    let [space, setSpace] = createSignal<ColorSpace>('rgb');
    return (<ColorPicker label="Color" defaultValue="#f80">
      <ColorArea colorSpace="hsb" xChannel="saturation" yChannel="brightness"/>
      <ColorSlider colorSpace="hsb" channel="hue"/>
      <Select aria-label="Color space" selectedKey={space()} onSelectionChange={s => setSpace(s as ColorSpace)}>
        <SelectItem id="rgb">RGB</SelectItem>
        <SelectItem id="hsl">HSL</SelectItem>
        <SelectItem id="hsb">HSB</SelectItem>
      </Select>
      <div style={{ "display": 'flex', "gap": "4px", "width": "192px" }}>
        <For each={getColorChannels(space())} keyed={channel => channel}>{channel => <ColorField colorSpace={space()} channel={channel()} style={{ "flex": "1" }} />}</For>
      </div>
    </ColorPicker>);
}
export const title = 'ColorPicker example 4';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props}/>, element); }
