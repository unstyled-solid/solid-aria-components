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

import {GridCollection} from 'react-stately/private/grid/GridCollection';

import {mergeProps} from '../../src/utils/mergeProps';
import type {JSX} from '@solidjs/web';
import {createMemo, createSignal, merge} from 'solid-js';
import {useObjectRef} from '../../src/utils/useObjectRef';
import {useFocus} from '../../src/interactions/useFocus';
import {useGrid} from '../../src/grid/useGrid';
import {useGridCell} from '../../src/grid/useGridCell';
import {useGridRow} from '../../src/grid/useGridRow';
import {useGridState} from 'react-stately/private/grid/useGridState';
import {useListState} from 'react-stately/useListState';

export function Grid(props: any): JSX.Element {
  let state = useListState<object>(props);
  let collection = createMemo(
      () =>
        new GridCollection<object>({
          columnCount: 1,
          items: [...state.collection].map(item => ({
            type: 'item',
            childNodes: [
              {
                ...item,
                index: 0,
                type: 'cell'
              }
            ]
          }))
        })
    );
  let gridState = useGridState(merge(props, {
    selectionMode: 'multiple' as const,
    get collection() {return collection();}
  }));

  let ref = useObjectRef<HTMLDivElement>();
  let {gridProps} = useGrid(
    {
      'aria-label': 'Grid',
      get focusMode() {return props.gridFocusMode ?? 'row';}
    },
    gridState,
    ref
  );

  return (
    <div {...gridProps} ref={ref}>
      {[...gridState.collection].map(item => (
        <Row state={gridState} item={item} focusMode={props.cellFocusMode ?? 'child'} />
      ))}
    </div>
  );
}

function Row(props: any) {
  let state = props.state;
  let rowRef = useObjectRef<HTMLDivElement>();
  let cellRef = useObjectRef<HTMLDivElement>();
  let cellNode = () => [...props.item.childNodes][0];
  let {rowProps} = useGridRow({get node() {return props.item;}}, state, rowRef);
  let {gridCellProps} = useGridCell(
    {
      get node() {return cellNode();},
      get focusMode() {return props.focusMode;}
    },
    state,
    cellRef
  );

  let [isRowFocused, setRowFocused] = createSignal(false);
  let {focusProps: rowFocusProps} = useFocus({
    onFocusChange: setRowFocused
  });

  let [isCellFocused, setCellFocused] = createSignal(false);
  let {focusProps: cellFocusProps} = useFocus({
    onFocusChange: setCellFocused
  });

  return (
    <div
      {...mergeProps(rowProps, rowFocusProps)}
      ref={rowRef}
      style={{outline: isRowFocused() ? '2px solid red' : undefined}}>
      <div
        {...mergeProps(gridCellProps, cellFocusProps)}
        ref={cellRef}
        style={{outline: isCellFocused() ? '2px solid green' : undefined}}>
        {cellNode().rendered}
      </div>
    </div>
  );
}
