import {render} from '@solidjs/web';
// Extracted from Table.mdx render example 6; source content and algorithms retained.
import {Table, TableHeader, Column, Row, TableBody, Cell} from '../ListBox/native/vanilla/solid-Table';

export default function Demo(props: Record<string, unknown> = {}) {
  return (<Table{...props}>
  <TableHeader>
    <Column isRowHeader>Name</Column>
    <Column>URL</Column>
    <Column>Date added</Column>
  </TableHeader>
  <TableBody>
    {/*- begin highlight -*/}
    <Row id="row-1" href="https://adobe.com/" target="_blank">
      {/*- end highlight -*/}
      <Cell>Adobe</Cell>
      <Cell>https://adobe.com/</Cell>
      <Cell>January 28, 2023</Cell>
    </Row>
    <Row id="row-2" href="https://google.com/" target="_blank">
      <Cell>Google</Cell>
      <Cell>https://google.com/</Cell>
      <Cell>April 5, 2023</Cell>
    </Row>
    <Row id="row-3" href="https://nytimes.com/" target="_blank">
      <Cell>New York Times</Cell>
      <Cell>https://nytimes.com/</Cell>
      <Cell>July 12, 2023</Cell>
    </Row>
  </TableBody>
</Table>);
}


export const title = "Table: upstream example 6";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{'aria-label': 'Bookmarks', selectionMode: 'multiple'}} {...props} />, element);
}
