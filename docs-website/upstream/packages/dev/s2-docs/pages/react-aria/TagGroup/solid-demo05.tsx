import {render} from '@solidjs/web';
// Extracted from TagGroup.mdx render example 5; source content and algorithms retained.
import type {Selection} from 'solid-aria-components/TagGroup';
import {TagGroup, Tag} from '../ListBox/native/vanilla/solid-TagGroup';
import {createSignal} from 'solid-js';

function Example(props: Record<string, unknown>) {
  let [selected, setSelected] = createSignal<Selection>(new Set());

  return (
    <div>
      <TagGroup
        {...props}
        label="Amenities"
        ///- begin highlight -///
        {...props}
        selectedKeys={selected()}
        onSelectionChange={setSelected}
        ///- end highlight -///
      >
        <Tag id="laundry">Laundry</Tag>
        <Tag id="fitness">Fitness center</Tag>
        <Tag id="parking" isDisabled>Parking</Tag>
        <Tag id="pool">Swimming pool</Tag>
        <Tag id="breakfast">Breakfast</Tag>
      </TagGroup>
      <p>Current selection: {selected() === 'all' ? 'all' : [...selected()].join(', ')}</p>
    </div>
  );
}

export default Example;

export const title = "TagGroup: upstream example 5";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Example {...{selectionMode: 'multiple'}} {...props} />, element);
}
