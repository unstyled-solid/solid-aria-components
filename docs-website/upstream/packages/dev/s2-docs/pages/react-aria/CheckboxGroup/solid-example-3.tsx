import {render} from '@solidjs/web';
import {createSignal as createIslandProps} from 'solid-js';
import { CheckboxGroup } from '../Tabs/vanilla/CheckboxGroup';
import { Checkbox } from '../Tabs/vanilla/Checkbox';
import { createSignal } from 'solid-js';
function Example(props: Record<string, unknown>) {
  let [selected, setSelected] = createSignal(['soccer', 'baseball']);
  return <>
      <CheckboxGroup label="Favorite sports"
    /*- begin highlight -*/ value={selected()} onChange={setSelected}>
        {/*- end highlight -*/}
        <Checkbox value="soccer">Soccer</Checkbox>
        <Checkbox value="baseball">Baseball</Checkbox>
        <Checkbox value="basketball">Basketball</Checkbox>
      </CheckboxGroup>
      <p>Current selection: {selected().join(', ')}</p>
    </>;
}
export const title = "CheckboxGroup source example 3";
export function mount(element: HTMLElement, initialProps: Record<string, unknown> = {}) {
  const [props, update] = createIslandProps(initialProps);
  const dispose = render(() => <Example {...props()} />, element);
  return Object.assign(dispose, {update});
}
