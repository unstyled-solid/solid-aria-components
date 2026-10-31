import {omit} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {
  Button,
  Collection,
  Column as AriaColumn,
  type ColumnProps as AriaColumnProps,
  Row as AriaRow,
  type RowProps,
  Table as AriaTable,
  TableHeader as AriaTableHeader,
  type TableHeaderProps,
  type TableProps,
  useTableOptions,
  type TableBodyProps,
  TableBody as AriaTableBody,
  type CellProps,
  Cell as AriaCell,
  ColumnResizer,
  TableLoadMoreItem as AriaTableLoadMoreItem,
  type TableLoadMoreItemProps,
  TableFooter as AriaTableFooter,
  type TableFooterProps
} from 'solid-aria-components/Table';
import {Group} from 'solid-aria-components/Group';
import {composeRenderProps} from 'solid-aria-components/composeRenderProps';
import {Checkbox} from './solid-Checkbox';
import {ProgressCircle} from './solid-ProgressCircle';
import {ChevronUp, ChevronDown, GripVertical, ChevronRight} from './../../native-icons/solid-icons';
import './Table.css';

export function Table(props: TableProps) {
  return <AriaTable {...props} />;
}

interface ColumnProps extends AriaColumnProps {
  allowsResizing?: boolean;
}

export function Column(props: Omit<ColumnProps, 'children'> & {children?: JSX.Element}) {
  return (
    <AriaColumn {...props} className="react-aria-Column button-base">
      {live => (
        <div class="column-header">
          <Group role="presentation" tabindex={-1} className="column-name">
            {props.children}
          </Group>
          {live.allowsSorting && (
            <span aria-hidden="true" class="sort-indicator">
              {live.sortDirection === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </span>
          )}
          {props.allowsResizing && <ColumnResizer />}
        </div>
      )}
    </AriaColumn>
  );
}

export function TableHeader<T>(inputProps: TableHeaderProps<T>) {
  let otherProps = omit(inputProps, "columns", "children");
  let tableOptions = useTableOptions();

  return (
    <AriaTableHeader {...otherProps}>
      {/* Add extra columns for drag and drop and selection. */}
      {tableOptions.allowsDragging && (
        <AriaColumn
          width={20}
          minWidth={20}
          style={{width: "20px"}}
          className="react-aria-Column button-base"
        />
      )}
      {tableOptions.selectionBehavior === 'toggle' && (
        <AriaColumn
          width={32}
          minWidth={32}
          style={{width: "32px"}}
          ///- begin highlight -///
          focusMode="child"
          allowsArrowNavigation
          ///- end highlight -///
          className="react-aria-Column button-base">
          {tableOptions.selectionMode === 'multiple' && <Checkbox slot="selection" />}
        </AriaColumn>
      )}
      <Collection items={inputProps.columns}>{inputProps.children}</Collection>
    </AriaTableHeader>
  );
}

export function Row<T>(inputProps: RowProps<T>) {
  let otherProps = omit(inputProps, "id", "columns", "children");
  let tableOptions = useTableOptions();

  return (
    <AriaRow id={inputProps.id} {...otherProps}>
      {tableOptions.allowsDragging && (
        <Cell>
          <Button slot="drag" className="drag-button">
            <GripVertical />
          </Button>
        </Cell>
      )}
      {tableOptions.selectionBehavior === 'toggle' && (
        <Cell
          ///- begin highlight -///
          focusMode="child"
          allowsArrowNavigation
          ///- end highlight -///
        >
          <Checkbox slot="selection" />
        </Cell>
      )}
      <Collection items={inputProps.columns}>{inputProps.children}</Collection>
    </AriaRow>
  );
}

export function TableBody<T>(props: TableBodyProps<T>) {
  return <AriaTableBody {...props} />;
}

export function TableFooter<T>(props: TableFooterProps<T>) {
  return <AriaTableFooter {...props} />;
}

export function Cell(props: CellProps) {
  return (
    <AriaCell {...props}>
      {composeRenderProps(props.children, (children, live) => (
        <>
          {live.isTreeColumn && live.hasChildItems && (
            <Button slot="chevron">
              <ChevronRight />
            </Button>
          )}
          {children}
        </>
      ))}
    </AriaCell>
  );
}

export function TableLoadMoreItem(props: TableLoadMoreItemProps) {
  return (
    <AriaTableLoadMoreItem {...props}>
      <div style={{display: 'flex', "align-items": 'center', "justify-content": 'center'}}>
        <ProgressCircle isIndeterminate aria-label="Loading more..." />
      </div>
    </AriaTableLoadMoreItem>
  );
}
