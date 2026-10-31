import {render} from '@solidjs/web';
// Extracted from Table.mdx render example 13; source content and algorithms retained.
import {Table, TableHeader, TableBody, Column, Row, Cell} from '../ListBox/native/vanilla/solid-Table';
import {useDragAndDrop} from 'solid-aria-components/useDragAndDrop';
import {useTreeData} from 'solid-aria-components/useTreeData';
import {Collection} from 'solid-aria-components/Collection';

function ReorderableTable() {
  let tree = useTreeData({
    initialItems: [
      {id: '1', title: 'Documents', type: 'Directory', date: '10/20/2025', children: [
        {id: '2', title: 'Project', type: 'Directory', date: '8/2/2025', children: [
          {id: '3', title: 'Weekly Report', type: 'File', date: '7/10/2025', children: []},
          {id: '4', title: 'Budget', type: 'File', date: '8/20/2025', children: []}
        ]}
      ]},
      {id: '5', title: 'Photos', type: 'Directory', date: '2/3/2026', children: [
        {id: '6', title: 'Image 1', type: 'File', date: '1/23/2026', children: []},
        {id: '7', title: 'Image 2', type: 'File', date: '2/3/2026', children: []}
      ]}
    ]
  });

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
    <Table
      aria-label="Files"
      selectionMode="multiple"
      treeColumn="name"
      defaultExpandedKeys={['5']}
      ///- begin highlight -///
      dragAndDropHooks={dragAndDropHooks}
      ///- end highlight -///
    >
      <TableHeader>
        <Column id="name" isRowHeader>Name</Column>
        <Column id="type">Type</Column>
        <Column id="date">Date Modified</Column>
      </TableHeader>
      <TableBody items={tree.items}>
        {function renderItem(item) {
          return (
            <Row id={item.key}>
              <Cell>{item.value.title}</Cell>
              <Cell>{item.value.type}</Cell>
              <Cell>{item.value.date}</Cell>
              {item.children && <Collection items={item.children}>
                {renderItem}
              </Collection>}
            </Row>
          );
        }}
      </TableBody>
    </Table>
  );
}

export default ReorderableTable;

export const title = "Table: upstream example 13";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <ReorderableTable {...{}} {...props} />, element);
}
