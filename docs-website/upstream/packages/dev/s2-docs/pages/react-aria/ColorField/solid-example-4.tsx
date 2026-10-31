import {render} from '@solidjs/web';
import {ColorField} from './vanilla/ColorField.solid';
import {parseColor, type Color} from 'solid-aria-components';
import {createSignal} from 'solid-js';
function Example() {
  let [color, setColor] = createSignal<Color | null>(parseColor('#7f007f'));

  return (
    <div style={{ display: 'flex', "flex-direction": 'column', gap: "8px" }}>
      <ColorField
        label="Hue"

        value={color()}
        onChange={setColor}
        /*- begin highlight -*/
        colorSpace="hsl"
        channel="hue" />
        {/*- end highlight -*/}
      <ColorField
        label="Saturation"
        value={color()}
        onChange={setColor}
        colorSpace="hsl"
        channel="saturation" />
      <ColorField
        label="Lightness"
        value={color()}
        onChange={setColor}
        colorSpace="hsl"
        channel="lightness" />
      <pre style={{'font-size': '12px'}}>Current value: {color()?.toString('hex')}</pre>
    </div>
  );
}
export const title = 'ColorField example 4';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {return render(() => <Example {...props} />, element);}
