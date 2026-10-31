import {render} from '@solidjs/web';
// Extracted from Table.mdx render example 10; source content and algorithms retained.
import {Table, TableHeader, Column, Row, TableBody, Cell} from '../ListBox/native/vanilla/solid-Table';
import {ResizableTableContainer} from 'solid-aria-components/Table';

///- begin collapse -///
const rows = [
  {id: 1, name: '2022 Roadmap Proposal Revision 012822 Copy (2)', date: 'November 27, 2022 at 4:56PM', size: '214 KB'},
  {id: 2, name: 'Budget', date: 'January 27, 2021 at 1:56AM', size: '14 MB'},
  {id: 3, name: 'Welcome Email Template', date: 'July 24, 2022 at 2:48 PM', size: '20 KB'},
  {id: 4, name: 'Job Posting_8301', date: 'May 30, 2025', size: '139 KB'}
];
///- end collapse -///

export default function Demo(props: Record<string, unknown> = {}) {
  return (<ResizableTableContainer>
  <Table aria-label="Table with resizable columns">
    <TableHeader>
      {/*- begin highlight -*/}
      <Column id="file" isRowHeader allowsResizing maxWidth={500}>File Name</Column>
      <Column id="size" allowsResizing defaultWidth={80}>Size</Column>
      <Column id="date" minWidth={100}>Date Modified</Column>
      {/*- end highlight -*/}
    </TableHeader>
    <TableBody items={rows}>
      {item => (
        <Row>
          <Cell>{item.name}</Cell>
          <Cell>{item.size}</Cell>
          <Cell>{item.date}</Cell>
        </Row>
      )}
    </TableBody>
  </Table>
</ResizableTableContainer>);
}


export const title = "Table: upstream example 10";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{}} {...props} />, element);
}
