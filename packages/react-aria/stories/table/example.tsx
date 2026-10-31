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

import {Key, SelectionBehavior} from '@react-types/shared';
import {mergeProps} from '../../src/utils/mergeProps';
import {createEffect, createSignal, For, merge, Show, untrack} from 'solid-js';
import {Dynamic, JSX} from '@solidjs/web';
import {useObjectRef} from '../../src/utils/useObjectRef';
type ReactNode = JSX.Element;
import {TableProps, useTableState} from 'react-stately/useTableState';
import {useCheckbox} from '../../src/checkbox/useCheckbox';
import {useFocusRing} from '../../src/focus/useFocusRing';
import {useTable} from '../../src/table/useTable';
import {useTableCell} from '../../src/table/useTableCell';
import {useTableColumnHeader} from '../../src/table/useTableColumnHeader';
import {useTableHeaderRow} from '../../src/table/useTableHeaderRow';
import {useTableRow} from '../../src/table/useTableRow';
import {useTableRowGroup} from '../../src/table/useTableRowGroup';
import {
  useTableSelectAllCheckbox,
  useTableSelectionCheckbox
} from '../../src/table/useTableSelectionCheckbox';
import {useToggleState} from 'react-stately/useToggleState';
import {VisuallyHidden} from '../../src/visually-hidden/VisuallyHidden';

export function Table<T extends object>(
  props: TableProps<T> & {
    selectionStyle?: 'highlight' | 'checkbox';
    selectionBehavior?: SelectionBehavior;
    onAction?: (key: Key) => void;
  }
): JSX.Element {
  let [showSelectionCheckboxes, setShowSelectionCheckboxes] = createSignal(untrack(() => props.selectionStyle !== 'highlight'));
  let state = useTableState(merge(props, {
    get showSelectionCheckboxes() { return showSelectionCheckboxes(); },
    get selectionBehavior() { return props.selectionStyle === 'highlight' ? 'replace' as const : 'toggle' as const; }
  }));
  // If the selection behavior changes in state, we need to update showSelectionCheckboxes here due to the circular dependency...
  // Preserve the source's feedback flag, including the manager's touch toggle
  // override; it is not equivalent to the external selectionStyle alone.
  createEffect(() => state.selectionManager.selectionBehavior !== 'replace', shouldShow => {
    setShowSelectionCheckboxes(shouldShow);
  });
  let ref = useObjectRef<HTMLTableElement>();
  let bodyRef = useObjectRef<HTMLElement>();
  let {gridProps} = useTable(
    merge(props, {
      get onRowAction() { return props.onAction; },
      scrollRef: bodyRef
    }),
    state,
    ref
  );

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
          <TableRow item={row()} state={state}>
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

export const TableRowGroup = (props: any) => {
  let {rowGroupProps} = useTableRowGroup();
  return (
    <Dynamic component={props.type} ref={props.ref} {...rowGroupProps} style={props.style}>
      {props.children}
    </Dynamic>
  );
};

export function TableHeaderRow(props: {
  item: any;
  state: any;
  children: ReactNode;
}): JSX.Element {
  let ref = useObjectRef<HTMLTableRowElement>();
  let {rowProps} = useTableHeaderRow({get node() { return props.item; }}, props.state, ref);

  return (
    <tr {...rowProps} ref={ref}>
      {props.children}
    </tr>
  );
}

export function TableColumnHeader(props: {column: any; state: any}): JSX.Element {
  let ref = useObjectRef<HTMLTableCellElement>();
  let {columnHeaderProps} = useTableColumnHeader({get node() { return props.column; }}, props.state, ref);
  let {isFocusVisible, focusProps} = useFocusRing();
  let arrowIcon = () => props.state.sortDescriptor?.direction === 'ascending' ? '▲' : '▼';

  return (
    <th
      {...mergeProps(columnHeaderProps, focusProps)}
      style={{
        'text-align': props.column.colSpan > 1 ? 'center' : 'left',
        padding: '5px 10px',
        outline: isFocusVisible() ? '2px solid orange' : 'none',
        cursor: 'default'
      }}
      ref={ref}>
      {props.column.rendered}
      {props.column.props.allowsSorting && (
        <span
          aria-hidden="true"
          style={{
            padding: '0 2px',
            visibility: props.state.sortDescriptor?.column === props.column.key ? 'visible' : 'hidden'
          }}>
          {arrowIcon()}
        </span>
      )}
    </th>
  );
}

export function TableRow(props: {
  item: any;
  children: ReactNode;
  state: any;
}): JSX.Element {
  let ref = useObjectRef<HTMLTableRowElement>();
  let isSelected = () => props.state.selectionManager.isSelected(props.item.key);
  let {rowProps} = useTableRow({get node() { return props.item; }}, props.state, ref);
  let {isFocusVisible, focusProps} = useFocusRing();

  return (
    <tr
      style={{
        // eslint-disable-next-line no-nested-ternary
        background: isSelected() ? 'blueviolet' : props.item.index % 2 ? 'lightgray' : 'none',
        color: isSelected() ? 'white' : undefined,
        outline: isFocusVisible() ? '2px solid orange' : 'none'
      }}
      {...mergeProps(rowProps, focusProps)}
      onDblClick={rowProps.onDblClick}
      ref={ref}>
      {props.children}
    </tr>
  );
}

export function TableCell(props: {cell: any; state: any}): JSX.Element {
  let ref = useObjectRef<HTMLTableCellElement>();
  let {gridCellProps} = useTableCell({get node() { return props.cell; }}, props.state, ref);
  let {isFocusVisible, focusProps} = useFocusRing();

  return (
    <td
      {...mergeProps(gridCellProps, focusProps)}
      style={{
        padding: '5px 10px',
        outline: isFocusVisible() ? '2px solid orange' : 'none',
        cursor: 'default'
      }}
      ref={ref}>
      {props.cell.rendered}
    </td>
  );
}

export function TableCheckboxCell(props: {cell: any; state: any}): JSX.Element {
  let ref = useObjectRef<HTMLTableCellElement>();
  let {gridCellProps} = useTableCell({get node() { return props.cell; }}, props.state, ref);
  let {checkboxProps} = useTableSelectionCheckbox({get key() { return props.cell.parentKey; }}, props.state);

  let inputRef = useObjectRef<HTMLInputElement>();
  let {inputProps} = useCheckbox(checkboxProps, useToggleState(checkboxProps), inputRef);

  return (
    <td {...gridCellProps} ref={ref}>
      <input {...inputProps} ref={inputRef} />
    </td>
  );
}

export function TableSelectAllCell(props: {column: any; state: any}): JSX.Element {
  let ref = useObjectRef<HTMLTableCellElement>();
  let isSingleSelectionMode = () => props.state.selectionManager.selectionMode === 'single';
  let {columnHeaderProps} = useTableColumnHeader({get node() { return props.column; }}, props.state, ref);

  let {checkboxProps} = useTableSelectAllCheckbox(props.state);
  let inputRef = useObjectRef<HTMLInputElement>();
  let {inputProps} = useCheckbox(checkboxProps, useToggleState(checkboxProps), inputRef);

  return (
    <th {...columnHeaderProps} ref={ref}>
      {
        /*
          In single selection mode, the checkbox will be hidden.
          So to avoid leaving a column header with no accessible content,
          use a VisuallyHidden component to include the aria-label from the checkbox,
          which for single selection will be "Select."
        */
        isSingleSelectionMode() && <VisuallyHidden>{inputProps['aria-label']}</VisuallyHidden>
      }
      <input
        {...inputProps}
        ref={inputRef}
        style={isSingleSelectionMode() ? {visibility: 'hidden'} : undefined}
      />
    </th>
  );
}
