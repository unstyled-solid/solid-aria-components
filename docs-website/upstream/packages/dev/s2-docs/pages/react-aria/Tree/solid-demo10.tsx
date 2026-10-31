import {render} from '@solidjs/web';
// Extracted from Tree.mdx render example 10; source content and algorithms retained.
import {Tree, TreeItem} from '../ListBox/native/vanilla/solid-Tree';
import {useDragAndDrop} from 'solid-aria-components/useDragAndDrop';
import {Collection} from 'solid-aria-components/Collection';
import {useTreeData} from 'solid-aria-components/useTreeData';

function Example() {
  ///- begin collapse -///
  let tree = useTreeData({
    initialItems: [
      {id: '1', title: 'Documents', type: 'directory', children: [
        {id: '2', title: 'Project', type: 'directory', children: [
          {id: '3', title: 'Weekly Report', type: 'file', children: []},
          {id: '4', title: 'Budget', type: 'file', children: []}
        ]}
      ]},
      {id: '5', title: 'Photos', type: 'directory', children: [
        {id: '6', title: 'Image 1', type: 'file', children: []},
        {id: '7', title: 'Image 2', type: 'file', children: []}
      ]}
    ]
  });
  ///- end collapse -///

  ///- begin highlight -///
  let {dragAndDropHooks} = useDragAndDrop({
    getItems: (keys, items: typeof tree.items) => items.map(item => ({'text/plain': item.value.title})),
    onMove(e) {
      if (e.target.dropPosition === 'before') {
        tree.moveBefore(e.target.key, e.keys);
      } else if (e.target.dropPosition === 'after') {
        tree.moveAfter(e.target.key, e.keys);
      } else if (e.target.dropPosition === 'on') {
        // Move items to become children of the target
        let targetNode = tree.getItem(e.target.key);
        if (targetNode) {
          let targetIndex = targetNode.children ? targetNode.children.length : 0;
          let keyArray = Array.from(e.keys);
          for (let i = 0; i < keyArray.length; i++) {
            tree.move(keyArray[i], e.target.key, targetIndex + i);
          }
        }
      }
    }
  });
  ///- end highlight -///

  return (
    <Tree
      aria-label="Tree with hierarchical drag and drop"
      selectionMode="multiple"
      items={tree.items}
      ///- begin highlight -///
      dragAndDropHooks={dragAndDropHooks}
      ///- end highlight -///
    >
      {function renderItem(item) {
        return (
          <TreeItem title={item.value.title}>
            {item.children && <Collection items={item.children}>
              {renderItem}
            </Collection>}
          </TreeItem>
        )
      }}
    </Tree>
  );
}

export default Example;

export const title = "Tree: upstream example 10";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Example {...{}} {...props} />, element);
}
