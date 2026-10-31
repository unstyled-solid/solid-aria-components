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

import {
  Expandable,
  Key,
  MultipleSelection,
  Node,
  SelectionMode,
  Sortable,
  SortDescriptor,
  SortDirection
} from '@react-types/shared';
import {GridState, useGridState} from '../grid/useGridState';
import {ITableCollection, TableCollection} from './TableCollection';
import {MultipleSelectionState} from '../selection/types';
import {MultipleSelectionStateProps} from '../selection/useMultipleSelectionState';
import {createMemo, createSignal, merge, omit, untrack, type Accessor} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {TableBodyProps} from './TableBody';
import {TableHeaderProps} from './TableHeader';
import {liveView, useCollection} from '../collections/useCollection';
import {useControlledState} from '../utils/useControlledState';

export interface TableProps<T> extends MultipleSelection, Sortable, Expandable {
  /** The elements that make up the table. Includes the TableHeader, TableBody, Columns, and Rows. */
  children: JSX.Element;
  /** A list of row keys to disable. */
  disabledKeys?: Iterable<Key>;
  /**
   * Whether pressing the escape key should clear selection in the table or not.
   *
   * Most experiences should not modify this option as it eliminates a keyboard user's ability to
   * easily clear selection. Only use if the escape key is being handled externally or should not
   * trigger selection clearing contextually.
   *
   * @default 'clearSelection'
   */
  escapeKeyBehavior?: 'clearSelection' | 'none';
  /** Whether selection should occur on press up instead of press down. */
  shouldSelectOnPressUp?: boolean;
  /** The id of the column that displays hierarchical data. */
  treeColumn?: Key;
  /**
   * Whether keyboard navigation to focusable elements within the cells is
   * via the left/right arrow keys or the tab key.
   *
   * @default 'arrow'
   */
  keyboardNavigationBehavior?: 'arrow' | 'tab';
}

export interface TableState<T> extends GridState<T, ITableCollection<T>> {
  /** A collection of rows and columns in the table. */
  collection: ITableCollection<T>;
  /** Whether the row selection checkboxes should be displayed. */
  showSelectionCheckboxes: boolean;
  /** The current sorted column and direction. */
  sortDescriptor: SortDescriptor | null;
  /** Calls the provided onSortChange handler with the provided column key and sort direction. */
  sort(columnKey: Key, direction?: 'ascending' | 'descending'): void;
  /**
   * Whether keyboard navigation is disabled, such as when the arrow keys should be handled by a
   * component within a cell.
   */
  isKeyboardNavigationDisabled: boolean;
  /**
   * Set whether keyboard navigation is disabled, such as when the arrow keys should be handled by a
   * component within a cell.
   */
  setKeyboardNavigationDisabled: (val: boolean) => void;
  /** A set of keys for items that are expanded. */
  expandedKeys: Set<Key>;
  /** Toggles the expanded state for a row by its key. */
  toggleKey(key: Key): void;
  /** The id of the column that displays hierarchical data. */
  treeColumn: Key | null;
}

export interface CollectionBuilderContext<T> {
  showSelectionCheckboxes: boolean;
  showDragButtons: boolean;
  selectionMode: SelectionMode;
  columns: Node<T>[];
}

export interface TableStateProps<T> extends MultipleSelectionStateProps, Expandable, Sortable {
  /** The elements that make up the table. Includes the TableHeader, TableBody, Columns, and Rows. */
  children?: JSX.Element;
  /** A pre-constructed collection to use instead of building one from items and children. */
  collection?: ITableCollection<T>;
  /** Whether the row selection checkboxes should be displayed. */
  showSelectionCheckboxes?: boolean;
  /**
   * Whether the row drag button should be displayed.
   *
   * @private
   */
  showDragButtons?: boolean;
  /** @private - Do not use unless you know what you're doing. */
  UNSAFE_selectionState?: MultipleSelectionState;
  /** The id of the column that displays hierarchical data. */
  treeColumn?: Key;
}

const OPPOSITE_SORT_DIRECTION = {
  ascending: 'descending' as SortDirection,
  descending: 'ascending' as SortDirection
};

/**
 * Provides state management for a table component. Handles building a collection of columns and
 * rows from props. In addition, it tracks row selection and manages sort order changes.
 */
export function useTableState<T extends object>(props: TableStateProps<T>): TableState<T> {
  let [isKeyboardNavigationDisabled, setKeyboardNavigationDisabled] = createSignal(false);

  let context = createMemo<CollectionBuilderContext<T>>(() => {
    // Source resets the mutable builder context when children or these policies
    // change. Column generators populate this context, not a replacement list.
    props.children;
    let selectionMode = props.selectionMode ?? 'none';
    return {
      showSelectionCheckboxes: !!props.showSelectionCheckboxes && selectionMode !== 'none',
      showDragButtons: !!props.showDragButtons,
      selectionMode,
      columns: []
    };
  });
  let builderContext = new Proxy({} as CollectionBuilderContext<T>, {
    get: (_, key) => Reflect.get(context(), key),
    set: (_, key, value) => Reflect.set(context(), key, value)
  });

  let collection = useCollection<T, ITableCollection<T>>(
    props,
    nodes => new TableCollection(nodes, null, context()),
    builderContext
  );
  let gridState = useGridState(merge(props, {
    get collection() {return collection();},
    get disabledBehavior() {return props.disabledBehavior || 'selection';}
  }));

  let controlledExpandedKeys = createMemo(() => props.expandedKeys ? new Set(props.expandedKeys) : undefined);
  let [expandedKeys, setExpandedKeys] = useControlledState<Set<Key>>(
    controlledExpandedKeys,
    untrack(() => props.defaultExpandedKeys ? new Set(props.defaultExpandedKeys) : new Set<Key>()),
    keys => props.onExpandedChange?.(keys)
  );

  return {
    get collection() {return collection();},
    get disabledKeys() {return gridState.disabledKeys;},
    selectionManager: gridState.selectionManager,
    get showSelectionCheckboxes() {return props.showSelectionCheckboxes || false;},
    get sortDescriptor() {return props.sortDescriptor ?? null;},
    get isKeyboardNavigationDisabled() {return collection().size === 0 || isKeyboardNavigationDisabled();},
    setKeyboardNavigationDisabled,
    sort(columnKey: Key, direction?: 'ascending' | 'descending') {
      props.onSortChange?.({
        column: columnKey,
        direction:
          direction ??
          (props.sortDescriptor?.column === columnKey
            ? OPPOSITE_SORT_DIRECTION[props.sortDescriptor.direction]
            : 'ascending')
      });
    },
    get expandedKeys() {return expandedKeys();},
    toggleKey(key: Key) {
      setExpandedKeys(keys => {
        let newKeys = new Set(keys);
        if (newKeys.has(key)) {
          newKeys.delete(key);
        } else {
          newKeys.add(key);
        }

        return newKeys;
      });
    },
    get treeColumn() {return props.treeColumn ?? null;}
  };
}

/**
 * Filters a collection using the provided filter function and returns a new TableState.
 */
export function UNSTABLE_useFilteredTableState<T extends object>(
  state: TableState<T>,
  filterFn: ((nodeValue: string, node: Node<T>) => boolean) | null | undefined,
  getFilter?: Accessor<((nodeValue: string, node: Node<T>) => boolean) | null | undefined>
): TableState<T> {
  // As with native filtered ListState, the second argument is always the
  // source predicate. Only the explicit third argument supplies a live policy.
  let collection = createMemo(() => {
    let filter = getFilter ? getFilter() : filterFn;
    return (filter ? state.collection.filter!(filter) : state.collection) as ITableCollection<T>;
  });
  let selectionManager = liveView(createMemo(() => {
    state.selectionManager.selectedKeys;
    state.selectionManager.disabledKeys;
    return state.selectionManager.withCollection(collection());
  }));
  // TODO: handle focus key reset? That logic is in useGridState

  return merge(untrack(() => omit(state, 'collection', 'selectionManager')), {
    get collection() {return collection();},
    selectionManager
  });
}
