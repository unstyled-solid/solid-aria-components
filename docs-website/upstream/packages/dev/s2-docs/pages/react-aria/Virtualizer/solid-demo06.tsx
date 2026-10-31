import './demo.css';
import {render} from '@solidjs/web';
// Terminal-copied upstream Virtualizer.mdx, render example 6.
import {Virtualizer, TableLayout} from 'solid-aria-components/Virtualizer';
import {Cell, Column, Row, Table, TableBody, TableHeader} from '../ListBox/native/vanilla/solid-Table';

type Row = { id: number; foo: string; bar: string; baz: string };
let rows: Row[] = [];
for (let i = 0; i < 1000; i++) {
  rows.push({ id: i, foo: `Foo ${i}`, bar: `Bar ${i}`, baz: `Baz ${i}` });
}

export default function Demo(props: Record<string, unknown> = {}) { return (<Virtualizer
  /*- begin highlight -*/
  layout={TableLayout}
  {...props}
  /*- end highlight -*/
>
  <Table
    aria-label="Virtualized Table"
    selectionMode="multiple"
    style={{
      width: '100%',
      height: "300px",
      overflow: 'auto',
      "scroll-padding-top": "38px"
    }}>
    <TableHeader
      style={{
        background: 'var(--gray-100)',
        width: '100%',
        height: '100%',
        "border-radius": "8px",
        "font-weight": 'bold'
      }}>
      <Column isRowHeader>Foo</Column>
      <Column>Bar</Column>
      <Column>Baz</Column>
    </TableHeader>
    <TableBody items={rows}>
      {(item) => (
        <Row style={{width: 'inherit', height: 'inherit'}}>
          <Cell>{item.foo}</Cell>
          <Cell>{item.bar}</Cell>
          <Cell>{item.baz}</Cell>
        </Row>
      )}
    </TableBody>
  </Table>
</Virtualizer>); }


export const title = 'Virtualizer: upstream example 6';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void { return render(() => <Demo {...{layoutOptions: {rowHeight:32,headingHeight:32,padding:4,gap:4}}} {...props} />, element); }
