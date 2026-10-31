import {render} from '@solidjs/web';
import {createSignal as createIslandProps} from 'solid-js';
import { RadioGroup, Radio } from '../Tabs/vanilla/RadioGroup';
import { createSignal } from 'solid-js';
function Example(props: Record<string, unknown>) {
  let [selected, setSelected] = createSignal<string | null>(null);
  return <>
      <RadioGroup label="Favorite sport"
    /*- begin highlight -*/ value={selected()} onChange={setSelected}>
        {/*- end highlight -*/}
        <Radio value="soccer">Soccer</Radio>
        <Radio value="baseball">Baseball</Radio>
        <Radio value="basketball">Basketball</Radio>
      </RadioGroup>
      <p>Current selection: {selected() || 'None'}</p>
    </>;
}
export const title = "RadioGroup source example 3";
export function mount(element: HTMLElement, initialProps: Record<string, unknown> = {}) {
  const [props, update] = createIslandProps(initialProps);
  const dispose = render(() => <Example {...props()} />, element);
  return Object.assign(dispose, {update});
}
