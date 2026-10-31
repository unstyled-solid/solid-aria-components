import {render} from '@solidjs/web';
// Extracted from TagGroup.mdx render example 3; source content and algorithms retained.
import {TagGroup, Tag} from '../ListBox/native/vanilla/solid-TagGroup';
import {useListData} from 'solid-aria-components/useListData';

function Example() {
  let list = useListData({
    initialItems: [
      { id: 1, name: 'News' },
      { id: 2, name: 'Travel' },
      { id: 3, name: 'Gaming' },
      { id: 4, name: 'Shopping' }
    ]
  });

  return (
    <TagGroup
      label="Categories"
      /*- begin highlight -*/
      items={list.items}
      onRemove={(keys) => list.remove(...keys)}
      renderEmptyState={() => <div>No categories</div>}>
      {/*- end highlight -*/}
      {(item) => <Tag>{item.name}</Tag>}
    </TagGroup>
  );
}

export default Example;

export const title = "TagGroup: upstream example 3";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Example {...{}} {...props} />, element);
}
