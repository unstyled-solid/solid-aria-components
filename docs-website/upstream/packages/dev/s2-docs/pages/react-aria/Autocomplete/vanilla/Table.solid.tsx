import type { JSX } from '@solidjs/web';
import { omit } from 'solid-js';
'use client';
import { Button, Collection, Column as AriaColumn, type ColumnProps as AriaColumnProps, Row as AriaRow, type RowProps, Table as AriaTable, TableHeader as AriaTableHeader, type TableHeaderProps, type TableProps, useTableOptions, type TableBodyProps, TableBody as AriaTableBody, type CellProps, Cell as AriaCell, ColumnResizer, TableLoadMoreItem as AriaTableLoadMoreItem, type TableLoadMoreItemProps, TableFooter as AriaTableFooter, type TableFooterProps } from 'solid-aria-components';
import { Group } from 'solid-aria-components';
import { composeRenderProps } from 'solid-aria-components';
import { Checkbox } from './Checkbox.solid';
import { ProgressCircle } from './ProgressCircle.solid';
import { ChevronUp, ChevronDown, GripVertical, ChevronRight } from '../native-icons/solid-icons';
import './Table.css';
export function Table(props: TableProps) {
    return <AriaTable {...props}/>;
}
interface ColumnProps extends AriaColumnProps {
    allowsResizing?: boolean;
}
export function Column(props: Omit<ColumnProps, 'children'> & {
    children?: JSX.Element;
}) {
    return (<AriaColumn {...props} className="react-aria-Column button-base">
      {(live0) => (<div class="column-header">
          <Group role="presentation" tabindex={-1} className="column-name">
            {props.children}
          </Group>
          {live0.allowsSorting && (<span aria-hidden="true" class="sort-indicator">
              {live0.sortDirection === 'ascending' ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
            </span>)}
          {props.allowsResizing && <ColumnResizer />}
        </div>)}
    </AriaColumn>);
}
export function TableHeader<T>(live1: TableHeaderProps<T>) {
    let options = useTableOptions();
    return (<AriaTableHeader {...omit(live1, "columns", "children")}>
      {/* Add extra columns for drag and drop and selection. */}
      {options.allowsDragging && (<AriaColumn width={20} minWidth={20} style={{ "width": "20px" }} className="react-aria-Column button-base"/>)}
      {options.selectionBehavior === 'toggle' && (<AriaColumn width={32} minWidth={32} style={{ "width": "32px" }} 
        ///- begin highlight -///
        focusMode="child" allowsArrowNavigation 
        ///- end highlight -///
        className="react-aria-Column button-base">
          {options.selectionMode === 'multiple' && <Checkbox slot="selection"/>}
        </AriaColumn>)}
      <Collection items={live1.columns}>{live1.children}</Collection>
    </AriaTableHeader>);
}
export function Row<T>(live2: RowProps<T>) {
    let options = useTableOptions();
    return (<AriaRow id={live2.id} {...omit(live2, "id", "columns", "children")}>
      {options.allowsDragging && (<Cell>
          <Button slot="drag" className="drag-button">
            <GripVertical />
          </Button>
        </Cell>)}
      {options.selectionBehavior === 'toggle' && (<Cell 
        ///- begin highlight -///
        focusMode="child" allowsArrowNavigation>
          <Checkbox slot="selection"/>
        </Cell>)}
      <Collection items={live2.columns}>{live2.children}</Collection>
    </AriaRow>);
}
export function TableBody<T>(props: TableBodyProps<T>) {
    return <AriaTableBody {...props}/>;
}
export function TableFooter<T>(props: TableFooterProps<T>) {
    return <AriaTableFooter {...props}/>;
}
export function Cell(props: CellProps) {
    return (<AriaCell {...props}>
      {composeRenderProps(props.children, (children, live3) => (<>
          {live3.isTreeColumn && live3.hasChildItems && (<Button slot="chevron">
              <ChevronRight />
            </Button>)}
          {children}
        </>))}
    </AriaCell>);
}
export function TableLoadMoreItem(props: TableLoadMoreItemProps) {
    return (<AriaTableLoadMoreItem {...props}>
      <div style={{ "display": 'flex', "align-items": 'center', "justify-content": 'center' }}>
        <ProgressCircle isIndeterminate aria-label="Loading more..."/>
      </div>
    </AriaTableLoadMoreItem>);
}
