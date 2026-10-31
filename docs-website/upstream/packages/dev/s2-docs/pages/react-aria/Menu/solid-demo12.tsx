import {render} from '@solidjs/web';
// Extracted from Menu.mdx render example 12; source content and algorithms retained.
import type {Selection} from 'solid-aria-components/Menu';
import {MenuTrigger, Menu, MenuItem} from '../ListBox/native/vanilla/solid-Menu';
import {Button} from '../ListBox/native/vanilla/solid-Button';
import {createSignal} from 'solid-js';

function Example(props: Record<string, unknown>) {
  let [selected, setSelected] = createSignal<Selection>(new Set(['rulers']));

  return (
    <>
      <MenuTrigger children={[() => (<Button>View</Button>), () => (<Menu
          {...props}
          ///- begin highlight -///
          {...props}
          selectedKeys={selected()}
          onSelectionChange={setSelected}>
          {/*- end highlight -*/}
          <MenuItem id="grid">Pixel grid</MenuItem>
          <MenuItem id="rulers">Rulers</MenuItem>
          <MenuItem id="comments" isDisabled>Comments</MenuItem>
          <MenuItem id="layout">Layout guides</MenuItem>
          <MenuItem id="toolbar">Toolbar</MenuItem>
        </Menu>)]} />
      <p>Current selection: {selected() === 'all' ? 'all' : [...selected()].join(', ')}</p>
    </>
  );
}

export default Example;

export const title = "Menu: upstream example 12";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Example {...{selectionMode: 'multiple'}} {...props} />, element);
}
