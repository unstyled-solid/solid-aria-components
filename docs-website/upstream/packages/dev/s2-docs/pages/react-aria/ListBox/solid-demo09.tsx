import {render} from '@solidjs/web';
// Extracted from ListBox.mdx render example 9; source content and algorithms retained.
import type {Selection} from 'solid-aria-components/ListBox';
import {ListBox, ListBoxItem} from './native/vanilla/solid-ListBox';
import {createSignal} from 'solid-js';

function Example(props: Record<string, unknown>) {
  let [selected, setSelected] = createSignal<Selection>(new Set(['cheese']));

  return (
    <div>
      <ListBox
        {...props}
        aria-label="Sandwich contents"
        ///- begin highlight -///
        {...props}
        selectedKeys={selected()}
        onSelectionChange={setSelected}
        ///- end highlight -///
      >
        <ListBoxItem id="lettuce">Lettuce</ListBoxItem>
        <ListBoxItem id="tomato">Tomato</ListBoxItem>
        <ListBoxItem id="cheese">Cheese</ListBoxItem>
        <ListBoxItem id="tuna" isDisabled>Tuna Salad</ListBoxItem>
        <ListBoxItem id="egg">Egg Salad</ListBoxItem>
        <ListBoxItem id="ham">Ham</ListBoxItem>
      </ListBox>
      <p>Current selection: {selected() === 'all' ? 'all' : [...selected()].join(', ')}</p>
    </div>
  );
}

export default Example;

export const title = "ListBox: upstream example 9";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Example {...{selectionMode: 'multiple'}} {...props} />, element);
}
