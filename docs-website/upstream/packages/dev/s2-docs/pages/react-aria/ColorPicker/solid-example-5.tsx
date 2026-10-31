import { render } from '@solidjs/web';
import { ColorPicker } from './vanilla/ColorPicker.solid';
import { ColorArea } from './vanilla/ColorArea.solid';
import { ColorSlider } from './vanilla/ColorSlider.solid';
import { ColorSwatchPicker, ColorSwatchPickerItem } from './vanilla/ColorSwatchPicker.solid';
function Example(props: Record<string, unknown>) {
    return (<ColorPicker label="Color" defaultValue="#A00">
  <ColorArea colorSpace="hsb" xChannel="saturation" yChannel="brightness"/>
  <ColorSlider colorSpace="hsb" channel="hue"/>
  <ColorSwatchPicker>
    <ColorSwatchPickerItem color="#A00"/>
    <ColorSwatchPickerItem color="#f80"/>
    <ColorSwatchPickerItem color="#080"/>
    <ColorSwatchPickerItem color="#08f"/>
    <ColorSwatchPickerItem color="#008"/>
  </ColorSwatchPicker>
    </ColorPicker>);
}
export const title = 'ColorPicker example 5';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props}/>, element); }
