import {render} from '@solidjs/web';
// Extracted from ToggleButtonGroup.mdx render example 3; source content and algorithms retained.
import type {Key} from 'solid-aria-components/ToggleButtonGroup';
import {createSignal} from 'solid-js';
import {ToggleButtonGroup} from '../ListBox/native/vanilla/solid-ToggleButtonGroup';
import {ToggleButton} from '../ListBox/native/vanilla/solid-ToggleButton';
import {Bold, Italic, Underline, Strikethrough} from './../ListBox/native-icons/solid-icons';

function Example(props: Record<string, unknown>) {
  let [selected, setSelected] = createSignal(new Set<Key>(['bold']));

  return (
    <>
      <ToggleButtonGroup
        {...props}
        aria-label="Text style"
        /*- begin highlight -*/
        {...props}
        selectedKeys={selected()}
        onSelectionChange={setSelected}>
        {/*- end highlight -*/}
        <ToggleButton id="bold" aria-label="Bold">
          <Bold size={18} />
        </ToggleButton>
        <ToggleButton id="italic" aria-label="Italic" isDisabled>
          <Italic size={18} />
        </ToggleButton>
        <ToggleButton id="underline" aria-label="Underline">
          <Underline size={18} />
        </ToggleButton>
        <ToggleButton id="strike" aria-label="Strikethrough">
          <Strikethrough size={18} />
        </ToggleButton>
      </ToggleButtonGroup>
      <p>Current selection: {[...selected()].join(', ')}</p>
    </>
  );
}

export default Example;

export const title = "ToggleButtonGroup: upstream example 3";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Example {...{selectionMode: 'multiple'}} {...props} />, element);
}
