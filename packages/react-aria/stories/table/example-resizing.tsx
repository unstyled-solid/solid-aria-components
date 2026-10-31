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

import ariaStyles from './resizing.css';
import {
  AriaTableColumnResizeProps,
  useTableColumnResize
} from '../../src/table/useTableColumnResize';
import {classNames} from '@adobe/react-spectrum/private/utils/classNames';
import {ColumnSize} from 'react-stately/useTableState';
import {FocusRing} from '../../src/focus/FocusRing';
import {Key} from '@react-types/shared';
import {mergeProps} from '../../src/utils/mergeProps';
import {createSignal, merge, For, Show, onSettled} from 'solid-js';
import {Dynamic, type JSX} from '@solidjs/web';
import {useObjectRef as useRef} from '../../src/utils/useObjectRef';
type ReactNode = JSX.Element;
import styles from '@adobe/spectrum-css-temp/components/table/vars.css';
import {TableProps, useTableColumnResizeState, useTableState} from 'react-stately/useTableState';
import {useCheckbox} from '../../src/checkbox/useCheckbox';
import {useFocusRing} from '../../src/focus/useFocusRing';
import {useResizeObserver} from '../../src/utils/useResizeObserver';
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
    selectionStyle?: 'highlight' | 'checkbox' | 'none';
    onAction?: (key: Key) => void;
    onResizeStart?: (widths: Map<Key, ColumnSize>) => void;
    onResize?: (widths: Map<Key, ColumnSize>) => void;
    onResizeEnd?: (widths: Map<Key, ColumnSize>) => void;
  }
): JSX.Element {
  let state = useTableState(merge(props, {
    get showSelectionCheckboxes() { return props.selectionStyle !== 'highlight'; },
    get selectionBehavior() { return props.selectionStyle === 'highlight' ? 'replace' as const : 'toggle' as const; }
  }));

  let [tableWidth, setTableWidth] = createSignal(0);
  let getDefaultWidth = () => undefined;
  let getDefaultMinWidth = () => 75;
  let layoutState = useTableColumnResizeState(
    {
      getDefaultWidth,
      getDefaultMinWidth,
      get tableWidth() { return tableWidth(); }
    },
    state
  );

  let ref = useRef<HTMLTableElement | null>(null);
  let bodyRef = useRef<HTMLElement | null>(null);
  let {gridProps} = useTable(
    merge(props, {
      get onRowAction() { return props.onAction; },
      scrollRef: bodyRef,
      'aria-label': 'example table'
    }),
    state,
    ref
  );
  let layout = merge(layoutState, {tableState: state});

  onSettled(() => {
    if (bodyRef && bodyRef.current) {
      setTableWidth(bodyRef.current.clientWidth);
    }
  });
  useResizeObserver({ref, onResize: () => setTableWidth(bodyRef.current!.clientWidth)});

  return (
    <table {...gridProps} ref={ref} class={classNames(ariaStyles, 'aria-table')}>
      <TableRowGroup
        type="thead"
        className={classNames(ariaStyles, 'aria-table-rowGroup', 'aria-table-rowGroupHeader')}>
        <For each={state.collection.headerRows} keyed={row => row.key}>{headerRow => (
          <TableHeaderRow
            item={headerRow()}
            state={state}
            className={classNames(ariaStyles, 'aria-table-row', 'aria-table-headerRow')}>
            <For each={[...state.collection.getChildren!(headerRow().key)]} keyed={column => column.key}>{column =>
              <Show when={column().props.isSelectionCell} fallback={
                <TableColumnHeader
                  column={column()}
                  state={state}
                  layout={layout}
                  onResizeStart={props.onResizeStart}
                  onResize={props.onResize}
                  onResizeEnd={props.onResizeEnd}
                />
              }>
                <TableSelectAllCell column={column()} state={state} layout={layout} />
              </Show>
            }</For>
          </TableHeaderRow>
        )}</For>
      </TableRowGroup>
      <TableRowGroup
        type="tbody"
        ref={bodyRef}
        className={classNames(ariaStyles, 'aria-table-rowGroup')}>
        <For each={[...state.collection]} keyed={row => row.key}>{row => (
          <TableRow
            item={row()}
            state={state}
            className={classNames(ariaStyles, 'aria-table-row')}>
            <For each={[...state.collection.getChildren!(row().key)]} keyed={cell => cell.key}>{cell =>
              <Show when={cell().props.isSelectionCell} fallback={
                <TableCell cell={cell()} state={state} layout={layout} />
              }>
                <TableCheckboxCell cell={cell()} state={state} layout={layout} />
              </Show>
            }</For>
          </TableRow>
        )}</For>
      </TableRowGroup>
    </table>
  );
}

export function TableRowGroup(props: any) {
  let {rowGroupProps} = useTableRowGroup();
  return (
    <Dynamic component={props.type} ref={props.ref} {...rowGroupProps} style={props.style} class={props.className}>
      {props.children}
    </Dynamic>
  );
}

export function TableHeaderRow(props: {
  item: any;
  state: any;
  children: ReactNode;
  className: string;
}): JSX.Element {
  let ref = useRef<HTMLTableRowElement | null>(null);
  let {rowProps} = useTableHeaderRow({get node() { return props.item; }}, props.state, ref);

  return (
    <tr {...rowProps} ref={ref} class={props.className}>
      {props.children}
    </tr>
  );
}
function Resizer(props: {
  column: any;
  layout: any;
  onResizeStart: any;
  onResize: any;
  onResizeEnd: any;
}): JSX.Element {
  let ref = useRef<HTMLInputElement | null>();
  let {resizerProps, inputProps} = useTableColumnResize(
    merge(props, {'aria-label': 'Resizer'}) as AriaTableColumnResizeProps<any>,
    props.layout,
    ref
  );

  return (
    <>
      <FocusRing within focusRingClass={classNames(styles, 'focus-ring')}>{compose =>
        <div
          role="presentation"
          style={{
            cursor: undefined,
            'align-self': 'stretch',
            width: '20px',
            border: '1px solid red',
            'touch-action': 'none',
            flex: '0 0 auto',
            position: 'absolute',
            'inset-inline-end': 0,
            height: '100%'
          }} {...compose(resizerProps) as JSX.HTMLAttributes<HTMLDivElement>}>
          <VisuallyHidden>
            <input ref={ref} {...inputProps} />
          </VisuallyHidden>
        </div>}
      </FocusRing>
    </>
  );
}
export function TableColumnHeader(props: {
  column: any;
  state: any;
  layout: any;
  onResizeStart: any;
  onResize: any;
  onResizeEnd: any;
}): JSX.Element {
  let ref = useRef<HTMLTableHeaderCellElement | null>(null);
  let {columnHeaderProps} = useTableColumnHeader({get node() { return props.column; }}, props.state, ref);
  let {isFocusVisible, focusProps} = useFocusRing();
  let arrowIcon = () => props.state.sortDescriptor?.direction === 'ascending' ? '▲' : '▼';

  return (
    <th
      {...mergeProps(columnHeaderProps, focusProps)}
      style={{
        width: `${props.layout.getColumnWidth(props.column.key)}px`,
        'text-align': props.column.colSpan > 1 ? 'center' : 'left',
        padding: '5px 10px',
        outline: isFocusVisible() ? '2px solid orange' : 'none',
        cursor: 'default',
        overflow: 'hidden',
        'white-space': 'nowrap',
        'text-overflow': 'ellipsis',
        display: 'block',
        flex: '0 0 auto'
      }}
      ref={ref}>
      <div style={{display: 'flex', position: 'relative'}}>
        <div style={{flex: '1 1 auto'}}>
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
        </div>
        {props.column.props.allowsResizing && (
          <Resizer
            column={props.column}
            layout={props.layout}
            onResizeStart={props.onResizeStart}
            onResize={props.onResize}
            onResizeEnd={props.onResizeEnd}
          />
        )}
      </div>
    </th>
  );
}

export function TableRow(props: {
  item: any;
  children: ReactNode;
  state: any;
  className: string;
}): JSX.Element {
  let ref = useRef<HTMLTableRowElement | null>(null);
  let isSelected = () => props.state.selectionManager.isSelected(props.item.key);
  let {rowProps} = useTableRow({get node() { return props.item; }}, props.state, ref);
  let {isFocusVisible, focusProps} = useFocusRing();

  return (
    <tr
      style={{
        color: isSelected() ? 'white' : undefined,
        outline: isFocusVisible() ? '2px solid orange' : 'none'
      }}
      class={props.className}
      {...mergeProps(rowProps, focusProps)}
      ref={ref}>
      {props.children}
    </tr>
  );
}

export function TableCell(props: {
  cell: any;
  state: any;
  layout: any;
}): JSX.Element {
  let ref = useRef<HTMLTableCellElement | null>(null);
  let {gridCellProps} = useTableCell({get node() { return props.cell; }}, props.state, ref);
  let {isFocusVisible, focusProps} = useFocusRing();
  let isSelected = () => props.state.selectionManager.isSelected(props.cell.parentKey);

  return (
    <td
      {...mergeProps(gridCellProps, focusProps)}
      style={{
        width: `${props.layout.getColumnWidth(props.cell.column.key)}px`,
        padding: '5px 10px',
        outline: isFocusVisible() ? '2px solid orange inset' : 'none',
        cursor: 'default',
        overflow: 'hidden',
        'white-space': 'nowrap',
        'text-overflow': 'ellipsis',
        display: 'block',
        flex: '0 0 auto',
        // eslint-disable-next-line no-nested-ternary
        background: isSelected()
          ? 'blueviolet'
          : props.cell.parentKey % 2
            ? 'var(--spectrum-gray-75)'
            : 'var(--spectrum-gray-100)'
      }}
      ref={ref}>
      {props.cell.rendered}
    </td>
  );
}

export function TableCheckboxCell(props: {
  cell: any;
  state: any;
  layout: any;
}): JSX.Element {
  let ref = useRef<HTMLTableCellElement | null>(null);
  let {gridCellProps} = useTableCell({get node() { return props.cell; }}, props.state, ref);
  let {checkboxProps} = useTableSelectionCheckbox({get key() { return props.cell.parentKey; }}, props.state);

  let inputRef = useRef<HTMLInputElement | null>();
  let {inputProps} = useCheckbox(checkboxProps, useToggleState(checkboxProps), inputRef);

  return (
    <td
      {...gridCellProps}
      style={{
        width: `${props.layout.getColumnWidth(props.cell.column.key)}px`
      }}
      ref={ref}>
      <input {...inputProps} />
    </td>
  );
}

export function TableSelectAllCell(props: {
  column: any;
  state: any;
  layout: any;
}): JSX.Element {
  let ref = useRef<HTMLTableCellElement | null>(null);
  let isSingleSelectionMode = () => props.state.selectionManager.selectionMode === 'single';
  let {columnHeaderProps} = useTableColumnHeader({get node() { return props.column; }}, props.state, ref);

  let {checkboxProps} = useTableSelectAllCheckbox(props.state);
  let inputRef = useRef<HTMLInputElement | null>();
  let {inputProps} = useCheckbox(checkboxProps, useToggleState(checkboxProps), inputRef);

  return (
    <th
      {...columnHeaderProps}
      style={{
        width: `${props.layout.getColumnWidth(props.column.key)}px`
      }}
      ref={ref}>
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
