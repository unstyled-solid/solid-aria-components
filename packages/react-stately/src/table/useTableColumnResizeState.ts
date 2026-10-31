/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {ColumnSize} from './Column';
import {GridNode} from '../grid/GridCollection';
import {Key} from '@react-types/shared';
import {TableColumnLayout} from './TableColumnLayout';
import {TableState} from './useTableState';
import {createMemo, createSignal, untrack} from 'solid-js';

export interface TableColumnResizeStateProps<T> {
  /**
   * Current width of the table or table viewport that the columns
   * should be calculated against.
   */
  tableWidth: number;
  /** A function that is called to find the default width for a given column. */
  getDefaultWidth?: (node: GridNode<T>) => ColumnSize | null | undefined;
  /** A function that is called to find the default minWidth for a given column. */
  getDefaultMinWidth?: (node: GridNode<T>) => ColumnSize | null | undefined;
}

export interface TableColumnResizeState<T> {
  /**
   * Called to update the state that a resize event has occurred.
   * Returns the new widths for all columns based on the resized column.
   */
  updateResizedColumns: (key: Key, width: number) => Map<Key, ColumnSize>;
  /** Callback for when onColumnResize has started. */
  startResize: (key: Key) => void;
  /** Callback for when onColumnResize has ended. */
  endResize: () => void;
  /** Gets the current width for the specified column. */
  getColumnWidth: (key: Key) => number;
  /** Gets the current minWidth for the specified column. */
  getColumnMinWidth: (key: Key) => number;
  /** Gets the current maxWidth for the specified column. */
  getColumnMaxWidth: (key: Key) => number;
  /** Key of the currently resizing column. */
  resizingColumn: Key | null;
  /** A reference to the table state. */
  tableState: TableState<T>;
  /** A map of the current column widths. */
  columnWidths: Map<Key, number>;
}

/**
 * Provides column width state management for a table component with column resizing support.
 * Handles building a map of column widths calculated from the table's width and any provided column
 * width information from the collection. In addition, it tracks the currently resizing column and
 * provides callbacks for updating the widths upon resize operations.
 *
 * @param props - Props for the table.
 * @param state - State for the table, as returned by `useTableState`.
 */
export function useTableColumnResizeState<T>(
  props: TableColumnResizeStateProps<T>,
  state: TableState<T>
): TableColumnResizeState<T> {
  let [resizingColumn, setResizingColumn] = createSignal<Key | null>(null);
  let columnLayout = createMemo(
    () =>
      new TableColumnLayout({
        getDefaultWidth: props.getDefaultWidth,
        getDefaultMinWidth: props.getDefaultMinWidth
      })
  );

  let columns = createMemo(
    () => columnLayout().splitColumnsIntoControlledAndUncontrolled(state.collection.columns)
  );

  // Source resets local widths only when ordered column keys change, not when
  // a new collection image has the same keys or controlled widths change.
  let columnKeys = createMemo(() => state.collection.columns.map(column => column.key), {
    equals: (a, b) => a.length === b.length && a.every((key, index) => key === b[index])
  });
  let [uncontrolledWidths, setUncontrolledWidths] = createSignal(() => {
    columnKeys();
    return untrack(() => columnLayout().getInitialUncontrolledWidths(columns()[1]));
  });

  // combine columns back into one map that maintains same order as the columns
  let colWidths = createMemo(
    () =>
      columnLayout().recombineColumns(
        state.collection.columns,
        uncontrolledWidths(),
        columns()[1],
        columns()[0]
      )
  );

  let startResize = (key: Key) => {
    setResizingColumn(key);
  };

  let updateResizedColumns = (key: Key, width: number): Map<Key, ColumnSize> => {
    // Ensure lazy layout/min/max maps describe the accepted current inputs.
    columnWidths();
    let newSizes!: Map<Key, ColumnSize>;
    setUncontrolledWidths(previous => {
      newSizes = columnLayout().resizeColumnWidth(
        state.collection,
        previous,
        key,
        width
      );
      let map = new Map(Array.from(columns()[1]).map(([key]) => [key, newSizes.get(key)!]));
      map.set(key, width);
      return map;
    });
    return newSizes;
  };

  let endResize = () => {
    setResizingColumn(null);
  };

  let columnWidths = createMemo(
    () => columnLayout().buildColumnWidths(props.tableWidth ?? 0, state.collection, colWidths())
  );

  return {
    get resizingColumn() {return resizingColumn();},
    updateResizedColumns,
    startResize,
    endResize,
    getColumnWidth: (key: Key) => {columnWidths(); return columnLayout().getColumnWidth(key);},
    getColumnMinWidth: (key: Key) => {columnWidths(); return columnLayout().getColumnMinWidth(key);},
    getColumnMaxWidth: (key: Key) => {columnWidths(); return columnLayout().getColumnMaxWidth(key);},
    tableState: state,
    get columnWidths() {return columnWidths();}
  };
}
