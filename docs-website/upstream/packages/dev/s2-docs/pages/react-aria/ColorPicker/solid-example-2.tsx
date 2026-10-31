import { render } from '@solidjs/web';
import { getColorChannels, type ColorSpace } from 'solid-aria-components';
import { ColorPicker } from './vanilla/ColorPicker.solid';
import { ColorSlider } from './vanilla/ColorSlider.solid';
import { Select, SelectItem } from './vanilla/Select.solid';
import { createSignal, For } from 'solid-js';
function Example() {
    let [space, setSpace] = createSignal<ColorSpace>('rgb');
    return (<ColorPicker label="Fill color" defaultValue="#184">
      <Select aria-label="Color space" selectedKey={space()} onSelectionChange={s => setSpace(s as ColorSpace)}>
        <SelectItem id="rgb">RGB</SelectItem>
        <SelectItem id="hsl">HSL</SelectItem>
        <SelectItem id="hsb">HSB</SelectItem>
      </Select>
      <For each={getColorChannels(space())} keyed={channel => channel}>{channel => <ColorSlider colorSpace={space()} channel={channel()} />}</For>
      <ColorSlider channel="alpha"/>
    </ColorPicker>);
}
export const title = 'ColorPicker example 2';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props}/>, element); }
