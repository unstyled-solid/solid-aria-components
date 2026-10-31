import {render} from '@solidjs/web';
// Extracted from Table.mdx render example 3; source content and algorithms retained.
import {createMemo} from 'solid-js';
import {Table, TableHeader, Column, Row, TableBody, Cell, TableFooter} from '../ListBox/native/vanilla/solid-Table';
import {CheckboxGroup} from '../ListBox/native/vanilla/solid-CheckboxGroup';
import {Checkbox} from '../ListBox/native/vanilla/solid-Checkbox';
import {Button} from '../ListBox/native/vanilla/solid-Button';
import {createSignal} from 'solid-js';

///- begin collapse -///
const columns = [
  {name: 'Title', id: 'title', isRowHeader: true},
  {name: 'Status', id: 'status'},
  {name: 'Payment Method', id: 'paymentMethod'},
  {name: 'Price', id: 'price'}
];
///- end collapse -///

///- begin collapse -///
const initialRows = [
  {id: 1, title: 'Website Design', status: 'Paid', paymentMethod: 'Credit Card', price: 1200},
  {id: 2, title: 'Logo Creation', status: 'Pending', paymentMethod: 'PayPal', price: 350},
  {id: 3, title: 'SEO Optimization', status: 'Overdue', paymentMethod: 'Bank Transfer', price: 800},
  {id: 4, title: 'Social Media Setup', status: 'Paid', paymentMethod: 'Debit Card', price: 450},
  {id: 5, title: 'Content Writing', status: 'Pending', paymentMethod: 'Credit Card', price: 600}
];
///- end collapse -///

function FileTable() {
  let [showColumns, setShowColumns] = createSignal(['title', 'status', 'paymentMethod', 'price']);
  let visibleColumns = createMemo(() => columns.filter(column => showColumns().includes(column.id)));

  let [rows, setRows] = createSignal(initialRows);
  let addRow = () => {
    setRows(rows => [
      ...rows,
      {id: rows.length + 1, title: 'New Invoice', status: 'Pending', paymentMethod: 'Credit Card', price: 250}
    ]);
  };

  return (
    <div style={{display: 'flex', "flex-direction": 'column', gap: "8px", "align-items": 'start', width: '100%'}}>
      <CheckboxGroup aria-label="Show columns" value={showColumns()} onChange={setShowColumns} orientation="horizontal">
        <Checkbox value="status">Status</Checkbox>
        <Checkbox value="paymentMethod">Payment Method</Checkbox>
      </CheckboxGroup>
      <Table aria-label="Files" style={{width: '100%'}}>
        <TableHeader columns={visibleColumns()}>
          {column => (
            <Column isRowHeader={column.isRowHeader}>
              {column.name}
            </Column>
          )}
        </TableHeader>
        {/*- begin highlight -*/}
        <TableBody items={rows()} dependencies={[visibleColumns()]}>
          {item => (
            /*- end highlight -*/
            <Row columns={visibleColumns()}>
              {column => (
                <Cell>
                  {column.id === 'price'
                    ? item.price.toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 0})
                  : item[column.id as keyof typeof item]}
                </Cell>
              )}
            </Row>
          )}
        </TableBody>
        <TableFooter>
          <Row>
            <Cell colSpan={showColumns().length - 1}>Total</Cell>
            <Cell>{rows().reduce((p, row) => p + row.price, 0).toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 0})}</Cell>
          </Row>
        </TableFooter>
      </Table>
      <Button onPress={addRow}>Add row</Button>
    </div>
  );
}

export default FileTable;

export const title = "Table: upstream example 3";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <FileTable {...{}} {...props} />, element);
}
