/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {CollectionBuilder} from '../collections/CollectionBuilder';
import {GridNode} from '../grid/GridCollection';
import {Key} from '@react-types/shared';
import {createMemo, merge, untrack} from 'solid-js';
import {TableCollection} from './TableCollection';
import {tableNestedRows} from '../flags/flags';
import {CollectionBuilderContext, TableStateProps, useTableState} from './useTableState';
import type {TreeGridState} from './TreeGridTypes';
export type {TreeGridState} from './TreeGridTypes';
import {useControlledState} from '../utils/useControlledState';

export interface TreeGridStateProps<T> extends Omit<TableStateProps<T>, 'collection'> {
  /** The currently expanded keys in the collection (controlled). */
  UNSTABLE_expandedKeys?: 'all' | Iterable<Key>;
  /** The initial expanded keys in the collection (uncontrolled). */
  UNSTABLE_defaultExpandedKeys?: 'all' | Iterable<Key>;
  /** Handler that is called when items are expanded or collapsed. */
  UNSTABLE_onExpandedChange?: (keys: Set<Key>) => any;
}

/**
 * Provides state management for a tree grid component. Handles building a collection of columns and
 * rows from props. In addition, it tracks and manages expanded rows, row selection, and sort order
 * changes.
 */
export function UNSTABLE_useTreeGridState<T extends object>(
  props: TreeGridStateProps<T>
): TreeGridState<T> {
  if (!tableNestedRows()) {
    throw new Error('Feature flag for table nested rows must be enabled to use useTreeGridState.');
  }

  let controlledExpanded = createMemo(() => props.UNSTABLE_expandedKeys
    ? convertExpanded(props.UNSTABLE_expandedKeys) : undefined);
  let [expandedKeys, setExpandedKeys] = useControlledState<'all' | Set<Key>, Set<Key>>(
    controlledExpanded,
    untrack(() => props.UNSTABLE_defaultExpandedKeys ? convertExpanded(props.UNSTABLE_defaultExpandedKeys) : new Set<Key>()),
    keys => props.UNSTABLE_onExpandedChange?.(keys)
  );

  let context = createMemo<CollectionBuilderContext<T>>(() => {
    props.children;
    let selectionMode = props.selectionMode ?? 'none';
    return {
      showSelectionCheckboxes: !!props.showSelectionCheckboxes && selectionMode !== 'none',
      showDragButtons: !!props.showDragButtons,
      selectionMode,
      columns: []
    };
  });

  let builder = new CollectionBuilder<T>();
  let builderContext = new Proxy(untrack(context), {
    get: (_target, key) => Reflect.get(context(), key),
    set: (_target, key, value) => Reflect.set(context(), key, value)
  });
  let nodes = createMemo(() => builder.build({get children() {return props.children;}}, builderContext));
  let treeGridCollection = createMemo(() => {
    return generateTreeGridCollection<T>(nodes(), {
      showSelectionCheckboxes: props.showSelectionCheckboxes,
      showDragButtons: props.showDragButtons,
      expandedKeys: expandedKeys()
    });
  });

  let onToggle = (key: Key) => {
    setExpandedKeys(current => toggleKey(current, key, treeGridCollection()));
  };

  let collection = createMemo(() => {
    return new TableCollection(treeGridCollection().tableNodes, null, context());
  });

  let tableState = useTableState(merge(props, {get collection() {return collection();}}));
  return merge(tableState, {
    get keyMap() {return treeGridCollection().keyMap;},
    get userColumnCount() {return treeGridCollection().userColumnCount;},
    get expandedKeys() {return expandedKeys();},
    toggleKey: onToggle,
    get treeColumn() {return tableState.treeColumn ?? collection().rowHeaderColumnKeys.keys().next().value ?? null;}
  });
}

function toggleKey<T>(
  currentExpandedKeys: 'all' | Set<Key>,
  key: Key,
  collection: TreeGridCollection<T>
): Set<Key> {
  let updatedExpandedKeys: Set<Key>;
  if (currentExpandedKeys === 'all') {
    updatedExpandedKeys = new Set(
      collection.flattenedRows
        .filter(
          row =>
            row.props.UNSTABLE_childItems || row.props.children.length > collection.userColumnCount
        )
        .map(row => row.key)
    );
    updatedExpandedKeys.delete(key);
  } else {
    updatedExpandedKeys = new Set(currentExpandedKeys);
    if (updatedExpandedKeys.has(key)) {
      updatedExpandedKeys.delete(key);
    } else {
      updatedExpandedKeys.add(key);
    }
  }

  return updatedExpandedKeys;
}

function convertExpanded(expanded: 'all' | Iterable<Key>): 'all' | Set<Key> {
  if (!expanded) {
    return new Set<Key>();
  }

  return expanded === 'all' ? 'all' : new Set(expanded);
}

interface TreeGridCollectionOptions {
  showSelectionCheckboxes?: boolean;
  showDragButtons?: boolean;
  expandedKeys: 'all' | Set<Key>;
}

interface TreeGridCollection<T> {
  keyMap: Map<Key, GridNode<T>>;
  tableNodes: GridNode<T>[];
  flattenedRows: GridNode<T>[];
  userColumnCount: number;
}
function generateTreeGridCollection<T>(
  nodes: Iterable<GridNode<T>>,
  opts: TreeGridCollectionOptions
): TreeGridCollection<T> {
  let {expandedKeys = new Set()} = opts;

  let body: GridNode<T> | null = null;
  let flattenedRows: GridNode<T>[] = [];
  let userColumnCount = 0;
  let originalColumns: GridNode<T>[] = [];
  let keyMap = new Map<Key, GridNode<T>>();

  let topLevelRows: GridNode<T>[] = [];
  let visit = (node: GridNode<T>) => {
    switch (node.type) {
      case 'body':
        body = node;
        keyMap.set(body.key, body);
        break;
      case 'column':
        if (!node.hasChildNodes) {
          userColumnCount++;
        }
        break;
      case 'item':
        topLevelRows.push(node);
        return;
    }

    for (let child of node.childNodes) {
      visit(child);
    }
  };

  for (let node of nodes) {
    if (node.type === 'column') {
      originalColumns.push(node);
    }
    visit(node);
  }

  // Update each grid node in the treegrid table with values specific to a treegrid structure. Also store a set of flattened row nodes for TableCollection to consume
  let visitNode = (node: GridNode<T>) => {
    if (node.type === 'item') {
      flattenedRows.push(node);
    }

    keyMap.set(node.key, node);

    for (let child of node.childNodes) {
      if (!(child.type === 'item' && expandedKeys !== 'all' && !expandedKeys.has(node.key))) {
        if (child.type === 'item') {
          visitNode(child);
        } else {
          // We enforce that the cells come before rows so can just reuse cell index
          visitNode(child);
        }
      }
    }
  };

  for (let node of topLevelRows) {
    visitNode(node as GridNode<T>);
  }

  return {
    keyMap,
    userColumnCount,
    flattenedRows,
    tableNodes: [...originalColumns, {...body!, childNodes: flattenedRows}]
  };
}
