/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {beforeAll, describe, expect, it, vi, type MockedFunction} from 'vitest';
vi.mock('../../src/live-announcer/LiveAnnouncer');
import {announce} from '../../src/live-announcer/LiveAnnouncer';
import {Cell, Column, Row, TableBody, TableHeader} from 'react-stately/useTableState';
import {pointerMap, render} from '@react-spectrum/test-utils-internal';
import {For, merge, omit, Show} from 'solid-js';
import {useObjectRef} from '../../src/utils/useObjectRef';
import {
  TableCell,
  TableCheckboxCell,
  TableColumnHeader,
  TableHeaderRow,
  TableRow,
  TableRowGroup,
  TableSelectAllCell
} from '../../stories/table/example-backwards-compat';
import userEvent from '@testing-library/user-event';
import {useTable} from '../../src/table/useTable';
import {useTableState} from 'react-stately/useTableState';

let mockAnnounce = announce as MockedFunction<typeof announce>;

let columns = [
  {name: 'Name', uid: 'name'},
  {name: 'Type', uid: 'type'},
  {name: 'Level', uid: 'level'}
];

let rows = [
  {id: 1, name: 'Charizard', type: 'Fire, Flying', level: '67'},
  {id: 2, name: 'Squirtle', type: 'Water', level: '12'},
  {id: 3, name: 'Blastoise', type: 'Water', level: '56'},
  {id: 4, name: 'Venusaur', type: 'Grass, Poison', level: '83'},
  {id: 5, name: 'Pikachu', type: 'Electric', level: '100'}
];
// Differs from the main useTable in regards to onAction vs the newer onRowAction/onCellAction
function Table(props: any) {
  let otherProps = omit(props, 'onAction');
  let state = useTableState(merge(otherProps, {
    get showSelectionCheckboxes() { return otherProps.selectionMode === 'multiple'; }
  }));
  let ref = useObjectRef<HTMLTableElement>();
  let bodyRef = useObjectRef<HTMLElement>();
  let {gridProps} = useTable(merge(otherProps, {scrollRef: bodyRef}), state, ref);

  return (
    <table {...gridProps} ref={ref} style={{'border-collapse': 'collapse'}}>
      <TableRowGroup type="thead" style={{'border-bottom': '2px solid gray', display: 'block'}}>
        <For each={state.collection.headerRows} keyed={node => node.key}>{headerRow => (
          <TableHeaderRow item={headerRow()} state={state}>
            <For each={[...state.collection.getChildren!(headerRow().key)]} keyed={node => node.key}>{column =>
              <Show when={column().props.isSelectionCell} fallback={<TableColumnHeader column={column()} state={state} />}>
                <TableSelectAllCell column={column()} state={state} />
              </Show>
            }</For>
          </TableHeaderRow>
        )}</For>
      </TableRowGroup>
      <TableRowGroup
        ref={bodyRef}
        type="tbody"
        style={{display: 'block', overflow: 'auto', 'max-height': '200px'}}>
        <For each={[...state.collection]} keyed={node => node.key}>{row => (
          <TableRow item={row()} state={state} onAction={props.onAction}>
            <For each={[...state.collection.getChildren!(row().key)]} keyed={node => node.key}>{cell =>
              <Show when={cell().props.isSelectionCell} fallback={<TableCell cell={cell()} state={state} />}>
                <TableCheckboxCell cell={cell()} state={state} />
              </Show>
            }</For>
          </TableRow>
        )}</For>
      </TableRowGroup>
    </table>
  );
}
// I'd use tree.getByRole(role, {name: text}) here, but it's unbearably slow.
let getCell = (tree: ReturnType<typeof render>, text: string) => {
  // Find by text, then go up to the element with the cell role.
  let el = tree.getByText(text);
  while (el && !/gridcell|rowheader|columnheader/.test(el.getAttribute('role'))) {
    el = el.parentElement;
  }

  return el;
};

describe('useTable', () => {
  let user: ReturnType<typeof userEvent.setup>;
  beforeAll(() => {
    user = userEvent.setup({delay: null, pointerMap});
  });

  describe('actions on rows', () => {
    it('calls onAction', async () => {
      let onAction = vi.fn();
      let tree = render(
        <Table
          onAction={onAction}
          selectionBehavior="replace"
          aria-label="Table with selection"
          selectionMode="multiple">
          <TableHeader columns={columns}>
            {column => <Column key={column.uid}>{column.name}</Column>}
          </TableHeader>
          <TableBody items={rows}>
            {item => <Row>{columnKey => <Cell>{item[columnKey]}</Cell>}</Row>}
          </TableBody>
        </Table>
      );

      await user.click(getCell(tree, 'Squirtle'));
      expect(mockAnnounce).toHaveBeenLastCalledWith('Squirtle selected.');
      expect(mockAnnounce).toHaveBeenCalledTimes(1);
      expect(onAction).not.toHaveBeenCalled();

      mockAnnounce.mockReset();
      await user.dblClick(getCell(tree, 'Squirtle'));
      expect(mockAnnounce).not.toHaveBeenCalled();
      expect(onAction).toHaveBeenCalledTimes(1);
      expect(onAction).toHaveBeenCalledWith(2);
    });
  });
});
