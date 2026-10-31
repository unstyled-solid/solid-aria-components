import { render } from '@solidjs/web';
import { ColorSwatchPicker, ColorSwatchPickerItem } from './vanilla/ColorSwatchPicker.solid';
function Example(props: Record<string, unknown>) {
    return (<ColorSwatchPicker {...props}>
  <ColorSwatchPickerItem color="#A00"/>
  <ColorSwatchPickerItem color="#f80"/>
  <ColorSwatchPickerItem color="#080"/>
  <ColorSwatchPickerItem color="#08f"/>
  <ColorSwatchPickerItem color="#088"/>
  <ColorSwatchPickerItem color="#008"/>
    </ColorSwatchPicker>);
}
export const title = 'ColorSwatchPicker example 1';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props}/>, element); }
