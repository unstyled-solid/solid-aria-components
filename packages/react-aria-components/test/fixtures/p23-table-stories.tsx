/*
 * Copyright 2022 Adobe. All rights reserved.
 * Licensed under the Apache License, Version 2.0.
 * Terminal-copied selected Table.stories.tsx bodies at frozen
 * 3bdef480e85ff135cd485e9f4511b98300127d4b.
 * SHA256 52afbc1ef4aa081b6d620dadcdaf0ec1a2ba9cb6d7da618170b1b5ef12448a80.
 * Source ranges:299–310,412–459,488–664,751–823,865–911,1392–1407.
 * Native adaptation keeps actual data, defaults, collection/loading/DnD/checkbox
 * composition and SVG. React19 transition body is separately retained as source.
 */
import {omit} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {Button} from '../../src/Button';
import {Cell, Column, Row, Table, TableBody, TableHeader, TableLoadMoreItem, type TableLoadMoreItemProps} from '../../src/Table';
import {Checkbox, type CheckboxProps} from '../../src/Checkbox';
import {Collection} from 'react-aria/Collection';
import {useDragAndDrop} from '../../src/useDragAndDrop';
import {isTextDropItem} from 'react-aria/useDrop';
import {useListData} from 'react-stately/useListData';
import type {Selection} from '@react-types/shared';
import {LoadingSpinner} from './p23-loading-spinner';
import '../../stories/styles.css';

let columns: {name: string; id: 'name' | 'type' | 'date'; isRowHeader?: boolean}[] = [
  {name: 'Name', id: 'name', isRowHeader: true},
  {name: 'Type', id: 'type'},
  {name: 'Date Modified', id: 'date'}
];

let rows = [
  {id: 0, name: 'Games', date: '6/7/2020', type: 'File folder'},
  {id: 1, name: 'Program Files', date: '4/7/2021', type: 'File folder'},
  {id: 2, name: 'bootmgr', date: '11/20/2010', type: 'System file'},
  {id: 3, name: 'log.txt', date: '1/18/20167', type: 'Text Document'}
];

export const TableCellColSpanWithVariousSpansExample = () => {
  return (
    <Table aria-label="Table with various colspans">
      <TableHeader>
        <Column isRowHeader>Col 1</Column>
        <Column>Col 2</Column>
        <Column>Col 3</Column>
        <Column>Col 4</Column>
      </TableHeader>
      <TableBody>
        <Row>
          <Cell>Cell</Cell>
          <Cell colSpan={2}>Span 2</Cell>
          <Cell>Cell</Cell>
        </Row>
        <Row>
          <Cell>Cell</Cell>
          <Cell>Cell</Cell>
          <Cell>Cell</Cell>
          <Cell>Cell</Cell>
        </Row>
        <Row>
          <Cell colSpan={4}>Span 4</Cell>
        </Row>
        <Row>
          <Cell>Cell</Cell>
          <Cell>Cell</Cell>
          <Cell>Cell</Cell>
          <Cell>Cell</Cell>
        </Row>
        <Row>
          <Cell colSpan={3}>Span 3</Cell>
          <Cell>Cell</Cell>
        </Row>
        <Row>
          <Cell>Cell</Cell>
          <Cell>Cell</Cell>
          <Cell>Cell</Cell>
          <Cell>Cell</Cell>
        </Row>
        <Row>
          <Cell>Cell</Cell>
          <Cell colSpan={3}>Span 3</Cell>
        </Row>
      </TableBody>
    </Table>
  );
};

interface FileItem {
  id: string;
  name: string;
  type: string;
}

interface DndTableProps {
  initialItems: FileItem[];
  'aria-label': string;
  isDisabled?: boolean;
  isLoading?: boolean;
  onSelectionChange?: (keys: Selection) => void;
}

function DndTableRender(props: DndTableProps): JSX.Element {
  let list = useListData({
    initialItems: props.initialItems
  });

  let {dragAndDropHooks} = useDragAndDrop({
    get isDisabled() { return props.isDisabled; },
    // Provide drag data in a custom format as well as plain text.
    getItems(keys) {
      return [...keys]
        .filter(k => !!list.getItem(k))
        .map(key => {
          let item = list.getItem(key);
          return {
            'custom-app-type': JSON.stringify(item),
            'text/plain': item!.name
          };
        });
    },

    // Accept drops with the custom format.
    acceptedDragTypes: ['custom-app-type'],

    // Ensure items are always moved rather than copied.
    getDropOperation: () => 'move',

    // Handle drops between items from other lists.
    async onInsert(e) {
      let processedItems = await Promise.all(
        e.items
          .filter(isTextDropItem)
          .map(async item => JSON.parse(await item.getText('custom-app-type')))
      );
      if (e.target.dropPosition === 'before') {
        list.insertBefore(e.target.key, ...processedItems);
      } else if (e.target.dropPosition === 'after') {
        list.insertAfter(e.target.key, ...processedItems);
      }
    },

    // Handle drops on the collection when empty.
    async onRootDrop(e) {
      let processedItems = await Promise.all(
        e.items
          .filter(isTextDropItem)
          .map(async item => JSON.parse(await item.getText('custom-app-type')))
      );
      list.append(...processedItems);
    },

    // Handle reordering items within the same list.
    onReorder(e) {
      if (e.target.dropPosition === 'before') {
        list.moveBefore(e.target.key, e.keys);
      } else if (e.target.dropPosition === 'after') {
        list.moveAfter(e.target.key, e.keys);
      }
    },

    // Remove the items from the source list on drop
    // if they were moved to a different list.
    onDragEnd(e) {
      if (e.dropOperation === 'move' && !e.isInternal) {
        list.remove(...e.keys);
      }
    }
  });

  return (
    <Table
      aria-label={props['aria-label']}
      selectionMode="multiple"
      selectedKeys={list.selectedKeys}
      onSelectionChange={keys => {
        props.onSelectionChange?.(keys);
        list.setSelectedKeys(keys);
      }}
      dragAndDropHooks={dragAndDropHooks}>
      <TableHeader>
        <Column />
        <Column>
          <MyCheckbox slot="selection" />
        </Column>
        <Column>ID</Column>
        <Column isRowHeader>Name</Column>
        <Column>Type</Column>
      </TableHeader>
      <TableBody
        items={list.items}
        renderEmptyState={() => renderEmptyLoader({isLoading: props.isLoading, tableWidth: 200})}>
        <Collection items={list.items}>
          {item => (
            <Row>
              <Cell>
                <Button slot="drag">≡</Button>
              </Cell>
              <Cell>
                <MyCheckbox slot="selection" />
              </Cell>
              <Cell>{item.id}</Cell>
              <Cell>{item.name}</Cell>
              <Cell>{item.type}</Cell>
            </Row>
          )}
        </Collection>
        <MyTableLoadingIndicator isLoading={props.isLoading} />
      </TableBody>
    </Table>
  );
}

export const DndTable = (props: DndTableProps) => {
  return <DndTableRender {...props} />;
};

type DndTableExampleProps = {
  isDisabledFirstTable?: boolean;
  isDisabledSecondTable?: boolean;
  isLoading?: boolean;
};

function DndTableExampleRender(props: DndTableExampleProps): JSX.Element {
  return (
    <div style={{display: 'flex', gap: '12px', 'flex-wrap': 'wrap'}}>
      <DndTableRender
        isLoading={props.isLoading}
        initialItems={[
          {id: '1', type: 'file', name: 'Adobe Photoshop'},
          {id: '2', type: 'file', name: 'Adobe XD'},
          {id: '3', type: 'folder', name: 'Documents'},
          {id: '4', type: 'file', name: 'Adobe InDesign'},
          {id: '5', type: 'folder', name: 'Utilities'},
          {id: '6', type: 'file', name: 'Adobe AfterEffects'}
        ]}
        aria-label="First Table"
        isDisabled={props.isDisabledFirstTable}
      />
      <DndTableRender
        isLoading={props.isLoading}
        initialItems={[
          {id: '7', type: 'folder', name: 'Pictures'},
          {id: '8', type: 'file', name: 'Adobe Fresco'},
          {id: '9', type: 'folder', name: 'Apps'},
          {id: '10', type: 'file', name: 'Adobe Illustrator'},
          {id: '11', type: 'file', name: 'Adobe Lightroom'},
          {id: '12', type: 'file', name: 'Adobe Dreamweaver'}
        ]}
        aria-label="Second Table"
        isDisabled={props.isDisabledSecondTable}
      />
    </div>
  );
}

export const DndTableExample = (props: DndTableExampleProps) => {
  return <DndTableExampleRender {...props} />;
};

DndTableExample.args = {
  isDisabledFirstTable: false,
  isDisabledSecondTable: false,
  isLoading: false
};

export const MyCheckbox = (props: CheckboxProps) => {
  let otherProps = omit(props, 'children');
  return (
    <Checkbox {...otherProps}>
      {values => (
        <>
          <div class="checkbox">
            <svg viewBox="0 0 18 18" aria-hidden="true">
              {values.isIndeterminate ? (
                <rect x={1} y={7.5} width={15} height={3} />
              ) : (
                <polyline points="1 9 7 14 15 4" />
              )}
            </svg>
          </div>
          {props.children as JSX.Element}
        </>
      )}
    </Checkbox>
  );
};

const MyTableLoadingIndicator = (props: TableLoadMoreItemProps & {tableWidth?: number}) => {
  let otherProps = omit(props, 'tableWidth');
  return (
    // These styles will make the load more spinner sticky. A user would know if their table is virtualized and thus could control this styling if they wanted to
    // TODO: this doesn't work because the virtualizer wrapper around the table body has overflow: hidden. Perhaps could change this by extending the table layout and
    // making the layoutInfo for the table body have allowOverflow
    <TableLoadMoreItem style={{height: '30px', width: (props.tableWidth === undefined ? 400 : props.tableWidth) + 'px'}} {...otherProps}>
      <LoadingSpinner style={{height: '20px', position: 'unset'}} />
    </TableLoadMoreItem>
  );
};

function MyTableBody(props: {
  rows: typeof rows;
  children: (item: typeof rows[number]) => JSX.Element;
  isLoading?: boolean;
  onLoadMore?: () => void;
  tableWidth?: number;
}) {
  let otherProps = omit(props, 'rows', 'children', 'isLoading', 'onLoadMore', 'tableWidth');
  return (
    <TableBody {...otherProps}>
      <Collection items={props.rows}>{props.children}</Collection>
      <MyTableLoadingIndicator
        tableWidth={props.tableWidth}
        isLoading={props.isLoading}
        onLoadMore={props.onLoadMore}
      />
    </TableBody>
  );
}

const TableLoadingBodyWrapper = (args: {isLoadingMore: boolean}): JSX.Element => {
  return (
    <Table aria-label="Files">
      <TableHeader columns={columns}>
        {column => <Column isRowHeader={column.isRowHeader}>{column.name}</Column>}
      </TableHeader>
      <MyTableBody rows={rows} isLoading={args.isLoadingMore}>
        {item => (
          <Row columns={columns}>
            {column => {
              return <Cell>{item[column.id]}</Cell>;
            }}
          </Row>
        )}
      </MyTableBody>
    </Table>
  );
};

export const TableLoadingBodyWrapperStory = {
  render: TableLoadingBodyWrapper,
  args: {
    isLoadingMore: false
  },
  name: 'Table loading, table body wrapper with collection'
};

function renderEmptyLoader({isLoading, tableWidth = 400}: {isLoading?: boolean; tableWidth?: number}) {
  let contents = isLoading ? (
    <LoadingSpinner style={{height: '20px', width: '20px', transform: 'translate(-50%, -50%)'}} />
  ) : (
    'No results found'
  );
  return (
    <div style={{height: '30px', position: 'sticky', top: 0, left: 0, width: tableWidth + 'px'}}>
      {contents}
    </div>
  );
}

const RenderEmptyState = (args: {isLoading: boolean}): JSX.Element => {
  return (
    <Table aria-label="Files" selectionMode="multiple">
      <TableHeader columns={columns}>
        <Column>
          <MyCheckbox slot="selection" />
        </Column>
        <Collection items={columns}>
          {column => <Column isRowHeader={column.isRowHeader}>{column.name}</Column>}
        </Collection>
      </TableHeader>
      <TableBody renderEmptyState={() => renderEmptyLoader({isLoading: args.isLoading})}>
        <Collection items={[]}>
          {item => (
            <Row columns={columns}>
              {column => {
                return <Cell>{item[column.id]}</Cell>;
              }}
            </Row>
          )}
        </Collection>
      </TableBody>
    </Table>
  );
};

export const RenderEmptyStateStory = {
  render: RenderEmptyState,
  args: {
    isLoading: false
  },
  name: 'Empty/Loading Table rendered with TableLoadingIndicator collection element'
};


interface Launch {
  id: number;
  mission_name: string;
  launch_year: number;
}

const items: Launch[] = [
  {id: 0, mission_name: 'FalconSat', launch_year: 2006},
  {id: 1, mission_name: 'DemoSat', launch_year: 2007},
  {id: 2, mission_name: 'Trailblazer', launch_year: 2008},
  {id: 3, mission_name: 'RatSat', launch_year: 2009}
];

export function makePromise(items: Launch[]): Promise<Launch[]> {
  return new Promise(resolve => setTimeout(() => resolve(items), 1000));
}
