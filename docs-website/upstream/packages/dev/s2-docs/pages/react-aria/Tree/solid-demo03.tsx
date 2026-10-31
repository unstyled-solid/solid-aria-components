import {render} from '@solidjs/web';
// Extracted from Tree.mdx render example 3; source content and algorithms retained.
import {Tree, TreeItem} from '../ListBox/native/vanilla/solid-Tree';
import {Collection} from 'solid-aria-components/Collection';

///- begin collapse -///
let items = [
  {id: 1, title: 'Documents', type: 'directory', children: [
    {id: 2, title: 'Project', type: 'directory', children: [
      {id: 3, title: 'Weekly Report', type: 'file', children: []},
      {id: 4, title: 'Budget', type: 'file', children: []}
    ]}
  ]},
  {id: 5, title: 'Photos', type: 'directory', children: [
    {id: 6, title: 'Image 1', type: 'file', children: []},
    {id: 7, title: 'Image 2', type: 'file', children: []}
  ]}
];
///- end collapse -///

export default function Demo(props: Record<string, unknown> = {}) {
  return (<Tree
  aria-label="Files"
  defaultExpandedKeys={[1, 4]}
  items={items}
  selectionMode="multiple">
  {function renderItem(item) {
    return (
      <TreeItem title={item.title}>
        {/*- begin highlight -*/}
        {/* recursively render children */}
        <Collection items={item.children}>
          {renderItem}
        </Collection>
        {/*- end highlight -*/}
      </TreeItem>
    );
  }}
</Tree>);
}


export const title = "Tree: upstream example 3";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{}} {...props} />, element);
}
