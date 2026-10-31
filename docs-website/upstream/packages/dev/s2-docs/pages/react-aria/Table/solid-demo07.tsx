import {render} from '@solidjs/web';
// Extracted from Table.mdx render example 7; source content and algorithms retained.
import {Table, TableHeader, Column, TableBody} from '../ListBox/native/vanilla/solid-Table';

export default function Demo(props: Record<string, unknown> = {}) {
  return (<Table aria-label="Search results">
  <TableHeader>
    <Column isRowHeader>Name</Column>
    <Column>Type</Column>
    <Column>Date Modified</Column>
  </TableHeader>
  {/*- begin highlight -*/}
  <TableBody renderEmptyState={() => 'No results found.'}>
  {/*- end highlight -*/}
    {[]}
  </TableBody>
</Table>);
}


export const title = "Table: upstream example 7";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{}} {...props} />, element);
}
