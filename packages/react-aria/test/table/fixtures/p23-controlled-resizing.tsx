/*
 * Copyright 2021 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

// Extracted from frozen useTable.stories.tsx:36-49,133-138,167-226,249-270.
import {createMemo, createSignal, For, merge, omit, untrack} from 'solid-js';
import type {JSX} from '@solidjs/web';
import type {Key} from '@react-types/shared';
import {Cell, Column, ColumnSize, Row, TableBody, TableHeader} from 'react-stately/useTableState';
import {Table as ResizingTable} from '../../../stories/table/example-resizing';
interface ResizingRow {
  readonly [columnKey: string]: string | number | undefined;
  readonly id: number;
  readonly name: string;
  readonly type: string;
  readonly level: string;
  readonly weight: string;
  readonly height: string;
}
let defaultRows: readonly ResizingRow[] = [
  {id: 1, name: 'Charizard', type: 'Fire, Flying', level: '67', weight: '200lbs', height: '5\'7"'},
  {id: 2, name: 'Blastoise', type: 'Water', level: '56', weight: '188lbs', height: '5\'3"'},
  {id: 3, name: 'Venusaur', type: 'Grass, Poison', level: '83', weight: '220lbs', height: '6\'7"'},
  {id: 4, name: 'Pikachu', type: 'Electric', level: '100', weight: '13lbs', height: '1\'4"'},
  {id: 5, name: 'Charizard', type: 'Fire, Flying', level: '67', weight: '200lbs', height: '5\'7"'},
  {id: 6, name: 'Blastoise', type: 'Water', level: '56', weight: '188lbs', height: '5\'3"'},
  {id: 7, name: 'Venusaur', type: 'Grass, Poison', level: '83', weight: '220lbs', height: '6\'7"'},
  {id: 8, name: 'Pikachu', type: 'Electric', level: '100', weight: '13lbs', height: '1\'4"'},
  {id: 9, name: 'Charizard', type: 'Fire, Flying', level: '67', weight: '200lbs', height: '5\'7"'},
  {id: 10, name: 'Blastoise', type: 'Water', level: '56', weight: '188lbs', height: '5\'3"'},
  {id: 11, name: 'Venusaur', type: 'Grass, Poison', level: '83', weight: '220lbs', height: '6\'7"'},
  {id: 12, name: 'Pikachu', type: 'Electric', level: '100', weight: '13lbs', height: '1\'4"'}
] as const;
interface ColumnData {
  name: string;
  uid: string;
  defaultWidth?: ColumnSize | null;
  width?: ColumnSize | null;
}
export function ControlledTableResizing(props: {
  columns: Array<{name: string; uid: string; width?: ColumnSize | null}>;
  rows?: readonly (typeof defaultRows)[number][];
  onResize?: any;
  onResizeStart?: any;
  onResizeEnd?: any;
}): JSX.Element {
  let otherProps = omit(props, 'columns', 'rows', 'onResize');
  let [widths, _setWidths] = createSignal<Map<Key, ColumnSize | null>>(
    untrack(() => new Map(props.columns.filter(col => col.width).map(col => [col.uid as Key, col.width ?? null])))
  );

  let setWidths = (vals: Map<Key, ColumnSize>) => {
      let controlledKeys = new Set(props.columns.filter(col => col.width).map(col => col.uid as Key));
      let newVals = new Map(Array.from(vals).filter(([key]) => controlledKeys.has(key)));
      _setWidths(newVals);
      props.onResize?.(vals);
    };
  let [savedCols, setSavedCols] = createSignal(untrack(widths));
  // oxlint-disable-next-line react/react-compiler
  let [renderKey, setRenderKey] = createSignal(Math.random());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // oxlint-disable-next-line react/react-compiler, react-hooks/exhaustive-deps
  let cols = createMemo(() => { widths(); return props.columns.map(col => ({...col})); });

  return (
    <div>
      <button onClick={() => setSavedCols(widths())}>Save Cols</button>
      <button
        onClick={() => {
          _setWidths(savedCols());
          setRenderKey(Math.random());
        }}>
        Restore Cols
      </button>
      <div>
        Current saved column state: {'{'}
        {Array.from(savedCols())
          .map(([key, entry]) => `${key} => ${entry}`)
          .join(',')}
        {'}'}
      </div>
      <For each={[renderKey()]}>{() => <div>
        <ResizingTable onResize={setWidths} {...otherProps}>
          <TableHeader columns={cols()}>
            {column => (
              <Column {...column} key={column.uid} width={widths().get(column.uid)} allowsResizing>
                {column.name}
              </Column>
            )}
          </TableHeader>
          <TableBody items={props.rows ?? defaultRows}>
            {item => <Row>{columnKey => <Cell>{item[columnKey]}</Cell>}</Row>}
          </TableBody>
        </ResizingTable>
      </div>}</For>
    </div>
  );
}
let columnsSomeFR: ColumnData[] = [
  {name: 'Name', uid: 'name', width: '1fr'},
  {name: 'Type', uid: 'type', width: '1fr'},
  {name: 'Height', uid: 'height'},
  {name: 'Weight', uid: 'weight'},
  {name: 'Level', uid: 'level', width: '5fr'}
];

export const TableWithSomeResizingFRsControlledStory = {
  args: {columns: columnsSomeFR},
  render: (args: Parameters<typeof ControlledTableResizing>[0]) => <ControlledTableResizing {...args} />,
  parameters: {
    description: {
      data: `
  You can use the buttons to save and restore the column widths. When restoring,
  you will see a quick flash because the entire table is re-rendered. This
  mimics what would happen if an app reloaded the whole page and restored a saved
  column width state.
  `
    }
  }
};
export function TableWithSomeResizingFRsControlled(props: Partial<Parameters<typeof ControlledTableResizing>[0]>) {
  return TableWithSomeResizingFRsControlledStory.render(merge(TableWithSomeResizingFRsControlledStory.args, props));
}
