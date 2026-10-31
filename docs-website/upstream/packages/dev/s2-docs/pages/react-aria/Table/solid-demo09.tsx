import {render} from '@solidjs/web';
// Extracted from Table.mdx render example 9; source content and algorithms retained.
import {createMemo} from 'solid-js';
import {type SortDescriptor} from 'solid-aria-components/Table';
import {Table, TableHeader, Column, TableBody, Row, Cell} from '../ListBox/native/vanilla/solid-Table';
import {createSignal} from 'solid-js';

///- begin collapse -///
const rows = [
  {id: 1, name: 'Charizard', type: 'Fire, Flying', level: 67},
  {id: 2, name: 'Blastoise', type: 'Water', level: 56},
  {id: 3, name: 'Venusaur', type: 'Grass, Poison', level: 83},
  {id: 4, name: 'Pikachu', type: 'Electric', level: 100}
];
///- end collapse -///

function SortableTable() {
  let [sortDescriptor, setSortDescriptor] = createSignal<SortDescriptor>({
    column: 'name',
    direction: 'ascending'
  });

  let sortedRows = createMemo(() => {
    let sortedRows = rows;
  if (sortDescriptor()) {
    sortedRows = rows.toSorted((a, b) => {
      let first = a[sortDescriptor().column as keyof typeof a];
      let second = b[sortDescriptor().column as keyof typeof b];
      let cmp = first < second ? -1 : 1;
      if (sortDescriptor().direction === 'descending') {
        cmp = -cmp;
      }
      return cmp;
    });
  }

    return sortedRows;
  });

  return (
    <Table
      aria-label="Favorite pokemon"
      ///- begin highlight -///
      sortDescriptor={sortDescriptor()}
      onSortChange={setSortDescriptor}
      ///- end highlight -///
    >
      <TableHeader>
        <Column id="name" isRowHeader allowsSorting>Name</Column>
        <Column id="type" allowsSorting>Type</Column>
        <Column id="level" allowsSorting>Level</Column>
      </TableHeader>
      <TableBody items={sortedRows()}>
        {item => (
          <Row>
            <Cell>{item.name}</Cell>
            <Cell>{item.type}</Cell>
            <Cell>{item.level}</Cell>
          </Row>
        )}
      </TableBody>
    </Table>
  );
}

export default SortableTable;

export const title = "Table: upstream example 9";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <SortableTable {...{}} {...props} />, element);
}
