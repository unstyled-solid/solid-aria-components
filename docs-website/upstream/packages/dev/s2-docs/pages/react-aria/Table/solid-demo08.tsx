import {render} from '@solidjs/web';
// Extracted from Table.mdx render example 8; source content and algorithms retained.
import type {Selection} from 'solid-aria-components/Table';
import {Table, TableHeader, Column, Row, TableBody, Cell} from '../ListBox/native/vanilla/solid-Table';
import {createSignal} from 'solid-js';

function Example(props: Record<string, unknown>) {
  let [selected, setSelected] = createSignal<Selection>(new Set());

  return (
    <>
      <Table
        {...props}
        aria-label="Favorite pokemon"
        ///- begin highlight -///
        {...props}
        selectedKeys={selected()}
        onSelectionChange={setSelected}
        onRowAction={key => alert(`Clicked ${key}`)}
        ///- end highlight -///
      >
        <TableHeader>
          <Column isRowHeader>Name</Column>
          <Column>Type</Column>
          <Column>Level</Column>
        </TableHeader>
        <TableBody>
          <Row id="charizard">
            <Cell>Charizard</Cell>
            <Cell>Fire, Flying</Cell>
            <Cell>67</Cell>
          </Row>
          <Row id="blastoise">
            <Cell>Blastoise</Cell>
            <Cell>Water</Cell>
            <Cell>56</Cell>
          </Row>
          <Row id="venusaur" isDisabled>
            <Cell>Venusaur</Cell>
            <Cell>Grass, Poison</Cell>
            <Cell>83</Cell>
          </Row>
          <Row id="pikachu">
            <Cell>Pikachu</Cell>
            <Cell>Electric</Cell>
            <Cell>100</Cell>
          </Row>
        </TableBody>
      </Table>
      <p>Current selection: {selected() === 'all' ? 'all' : [...selected()].join(', ')}</p>
    </>
  );
}

export default Example;

export const title = "Table: upstream example 8";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Example {...{selectionMode: 'multiple'}} {...props} />, element);
}
