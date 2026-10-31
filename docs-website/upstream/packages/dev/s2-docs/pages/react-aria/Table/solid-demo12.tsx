import {render} from '@solidjs/web';
// Extracted from Table.mdx render example 12; source content and algorithms retained.
import {Table, TableHeader, Column, Row, TableBody, Cell} from '../ListBox/native/vanilla/solid-Table';
import {TextField} from '../ListBox/native/vanilla/solid-TextField';

///- begin collapse -///
let files = [
  {id: 'games', name: 'Games', type: 'Folder', date: '6/7/2023'},
  {id: 'apps', name: 'Applications', type: 'Folder', date: '4/7/2025'},
  {id: 'report', name: '2024 Financial Report', type: 'PDF Document', date: '12/30/2024'},
  {id: 'job', name: 'Job Posting', type: 'Text Document', date: '1/18/2025'},
];
///- end collapse -///

export default function Demo(props: Record<string, unknown> = {}) {
  return (<Table
  /*- begin highlight -*/
  keyboardNavigationBehavior="tab"
  /*- end highlight -*/
  selectionMode="multiple"
  aria-label="Shared files">
  <TableHeader>
    <Column id="name" isRowHeader>Name</Column>
    <Column id="type">Type</Column>
    <Column id="date">Date Modified</Column>
    <Column id="notes">Notes</Column>
  </TableHeader>
  <TableBody items={files}>
    {item => (
      <Row id={item.id}>
        <Cell>{item.name}</Cell>
        <Cell>{item.type}</Cell>
        <Cell>{item.date}</Cell>
        <Cell><TextField aria-label={`${item.name} notes`} placeholder="Enter notes" /></Cell>
      </Row>
    )}
  </TableBody>
</Table>);
}


export const title = "Table: upstream example 12";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{}} {...props} />, element);
}
