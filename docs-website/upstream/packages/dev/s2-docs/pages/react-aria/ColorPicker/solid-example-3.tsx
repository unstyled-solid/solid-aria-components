import { render } from '@solidjs/web';
import { ColorPicker } from './vanilla/ColorPicker.solid';
import { ColorWheel } from './vanilla/ColorWheel.solid';
import { ColorArea } from './vanilla/ColorArea.solid';
function Example(props: Record<string, unknown>) {
    return (<ColorPicker label="Stroke color" defaultValue="#345">
  <ColorWheel />
  <ColorArea colorSpace="hsb" xChannel="saturation" yChannel="brightness" style={{
            "width": '100px',
            "height": '100px',
            "position": 'absolute',
            "top": 'calc(50% - 50px)',
            "left": 'calc(50% - 50px)'
        }}/>
    </ColorPicker>);
}
export const title = 'ColorPicker example 3';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props}/>, element); }
