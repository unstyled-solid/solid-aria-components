import {render} from '@solidjs/web';
// Extracted from Table.mdx render example 11; source content and algorithms retained.
import {Table, TableHeader, Column, Row, TableBody, Cell} from '../ListBox/native/vanilla/solid-Table';
import {ResizableTableContainer} from 'solid-aria-components/Table';
import type {ResizableTableContainerProps} from 'solid-aria-components/Table';
import {createSignal, onSettled} from 'solid-js';

///- begin collapse -///
const rows = [
  {id: 1, name: '2022 Roadmap Proposal Revision 012822 Copy (2)', date: 'November 27, 2022 at 4:56PM', size: '214 KB'},
  {id: 2, name: 'Budget', date: 'January 27, 2021 at 1:56AM', size: '14 MB'},
  {id: 3, name: 'Welcome Email Template', date: 'July 24, 2022 at 2:48 PM', size: '20 KB'},
  {id: 4, name: 'Job Posting_8301', date: 'May 30, 2025', size: '139 KB'}
];
///- end collapse -///

///- begin collapse -///
const columns = [
  {id: 'file', name: 'File Name'},
  {id: 'size', name: 'Size'},
  {id: 'date', name: 'Date'}
];
///- end collapse -///

type ColumnWidths = Parameters<NonNullable<ResizableTableContainerProps['onResize']>>[0];
const initialWidths: ColumnWidths = new Map<string, number | `${number}fr`>([
  ['file', '1fr'],
  ['size', 80],
  ['date', 100]
]);

export default function ResizableTable() {
  let [columnWidths, updateColumnWidths] = createSignal(getInitialWidths());
  onSettled(() => {
    updateColumnWidths(getColumnWidths());
    return subscribe(() => updateColumnWidths(getColumnWidths()));
  });

  return (
    <ResizableTableContainer
      ///- begin highlight -///
      onResize={setColumnWidths}
      ///- end highlight -///
    >
      <Table aria-label="Table with resizable columns">
        <TableHeader columns={columns} dependencies={[columnWidths()]}>
          {column => (
            <Column
              isRowHeader={column.id === 'file'}
              allowsResizing
              ///- begin highlight -///
              width={columnWidths().get(column.id)}
              ///- end highlight -///
            >
              {column.name}
            </Column>
          )}
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
    </ResizableTableContainer>
  );
}

let parsedWidths: ColumnWidths | null | undefined;
function getColumnWidths() {
  // Parse column widths from localStorage.
  if (!parsedWidths) {
    let data = localStorage.getItem('table-widths');
    if (data) {
      parsedWidths = new Map(JSON.parse(data));
    }
  }
  return parsedWidths || initialWidths;
}

function setColumnWidths(widths: ColumnWidths) {
  // Store new widths in localStorage, and trigger subscriptions.
  localStorage.setItem('table-widths', JSON.stringify(Array.from(widths)));
  window.dispatchEvent(new Event('storage'));
}

function getInitialWidths() {
  return initialWidths;
}

function subscribe(fn: () => void) {
  let onStorage = () => {
    // Invalidate cache.
    parsedWidths = null;
    fn();
  };

  window.addEventListener('storage', onStorage);
  return () => window.removeEventListener('storage', onStorage);
}

export const title = "Table: upstream example 11";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <ResizableTable {...{}} {...props} />, element);
}
