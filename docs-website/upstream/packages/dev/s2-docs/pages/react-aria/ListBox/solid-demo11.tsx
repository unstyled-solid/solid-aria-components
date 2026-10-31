import {render} from '@solidjs/web';
// Extracted from ListBox.mdx render example 11; source content and algorithms retained.
import {ListBox, ListBoxItem} from './native/vanilla/solid-ListBox';
import {useDragAndDrop} from 'solid-aria-components/useDragAndDrop';
import {useListData} from 'solid-aria-components/useListData';

function Example() {
  let list = useListData({
    initialItems: [
      {id: 1, name: 'Adobe Photoshop'},
      {id: 2, name: 'Adobe XD'},
      {id: 3, name: 'Adobe Dreamweaver'},
      {id: 4, name: 'Adobe InDesign'},
      {id: 5, name: 'Adobe Connect'}
    ]
  });

  ///- begin highlight -///
  let {dragAndDropHooks} = useDragAndDrop({
    getItems: (keys, items: typeof list.items) => items.map(item => ({'text/plain': item.name})),
    onReorder(e) {
      if (e.target.dropPosition === 'before') {
        list.moveBefore(e.target.key, e.keys);
      } else if (e.target.dropPosition === 'after') {
        list.moveAfter(e.target.key, e.keys);
      }
    }
  });
  ///- end highlight -///

  return (
    <ListBox
      aria-label="Reorderable list"
      selectionMode="multiple"
      items={list.items}
      ///- begin highlight -///
      dragAndDropHooks={dragAndDropHooks}
      ///- end highlight -///
    >
      {item => <ListBoxItem>{item.name}</ListBoxItem>}
    </ListBox>
  );
}

export default Example;

export const title = "ListBox: upstream example 11";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Example {...{}} {...props} />, element);
}
