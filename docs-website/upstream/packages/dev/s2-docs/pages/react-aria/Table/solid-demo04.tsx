import {render} from '@solidjs/web';
// Extracted from Table.mdx render example 4; source content and algorithms retained.
import {Table, TableHeader, Column, Row, TableBody, Cell} from '../ListBox/native/vanilla/solid-Table';
import {Collection, type Key} from 'solid-aria-components/Collection';
import {createSignal} from 'solid-js';

/*- begin collapse -*/
const rows = [
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
];
/*- end collapse -*/

function Example() {
  let [expandedKeys, setExpandedKeys] = createSignal(new Set<Key>(['1']))

  return (
    <Table
      aria-label="Files"
      /*- begin highlight -*/
      treeColumn="name"
      expandedKeys={expandedKeys()}
      onExpandedChange={setExpandedKeys}>
      {/*- end highlight -*/}
      <TableHeader>
        <Column id="name" isRowHeader>Name</Column>
        <Column id="type">Type</Column>
        <Column id="date">Date Modified</Column>
      </TableHeader>
      <TableBody items={rows}>
        {function renderItem(item) {
          return (
            <Row id={item.id}>
              <Cell>{item.title}</Cell>
              <Cell>{item.type}</Cell>
              <Cell>{item.date}</Cell>
              {/*- begin highlight -*/}
              {/* recursively render children */}
              <Collection items={item.children}>
                {renderItem}
              </Collection>
              {/*- end highlight -*/}
            </Row>
          );
        }}
      </TableBody>
    </Table>
  );
}

export default Example;

export const title = "Table: upstream example 4";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Example {...{}} {...props} />, element);
}
