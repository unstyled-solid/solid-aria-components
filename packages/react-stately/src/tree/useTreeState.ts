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
  Collection,
  CollectionStateBase,
  DisabledBehavior,
  Expandable,
  Key,
  MultipleSelection,
  Node
} from '@react-types/shared';
import {SelectionManager} from '../selection/SelectionManager';
import {TreeCollection} from './TreeCollection';
import {createEffect, createMemo, untrack} from 'solid-js';
import {liveView, useCollection} from '../collections/useCollection';
import {useControlledState} from '../utils/useControlledState';
import {useMultipleSelectionState} from '../selection/useMultipleSelectionState';

export interface TreeProps<T> extends CollectionStateBase<T>, Expandable, MultipleSelection {
  /** Whether `disabledKeys` applies to all interactions, or only selection. */
  disabledBehavior?: DisabledBehavior;
}
export interface TreeState<T> {
  /** A collection of items in the tree. */
  readonly collection: Collection<Node<T>>;

  /** A set of keys for items that are disabled. */
  readonly disabledKeys: Set<Key>;

  /** A set of keys for items that are expanded. */
  readonly expandedKeys: Set<Key>;

  /** Toggles the expanded state for an item by its key. */
  toggleKey(key: Key): void;

  /** Replaces the set of expanded keys. */
  setExpandedKeys(keys: Set<Key>): void;

  /** A selection manager to read and update multiple selection state. */
  readonly selectionManager: SelectionManager;
}

/**
 * Provides state management for tree-like components. Handles building a collection
 * of items from props, item expanded state, and manages multiple selection state.
 */
export function useTreeState<T>(props: TreeProps<T>): TreeState<T> {
  let expandedKeysProp = createMemo(() => props.expandedKeys ? new Set(props.expandedKeys) : undefined);
  let [expandedKeys, setExpandedKeys] = useControlledState<Set<Key>>(
    expandedKeysProp,
    untrack(() => props.defaultExpandedKeys ? new Set(props.defaultExpandedKeys) : new Set<Key>()),
    keys => props.onExpandedChange?.(keys)
  );

  let selectionState = useMultipleSelectionState(props);
  let disabledKeys = createMemo(() => props.disabledKeys ? new Set(props.disabledKeys) : new Set<Key>());

  let tree = useCollection(
    props,
    nodes => new TreeCollection(nodes, {expandedKeys: expandedKeys()}),
    null
  );

  // Reset focused key if that item is deleted from the collection.
  createEffect(() => {
    let collection = tree();
    let focusedKey = selectionState.focusedKey;
    return {shouldReset: focusedKey != null && !collection.getItem(focusedKey)};
  }, ({shouldReset}) => {
    if (shouldReset) {
      selectionState.setFocusedKey(null);
    }
  });

  let onToggle = (key: Key) => {
    setExpandedKeys(previous => toggleKey(previous, key));
  };

  let selectionManager = createMemo(() => {
    // Source recreates its manager with selection renders, resetting the
    // manager's isSelectAll cache as well as the current collection.
    selectionState.selectedKeys;
    selectionState.disabledKeys;
    return new SelectionManager(tree(), selectionState);
  });

  return {
    get collection() {return tree();},
    get expandedKeys() {return expandedKeys();},
    get disabledKeys() {return disabledKeys();},
    toggleKey: onToggle,
    setExpandedKeys,
    selectionManager: liveView(selectionManager)
  };
}

function toggleKey(set: Set<Key>, key: Key): Set<Key> {
  let res = new Set(set);
  if (res.has(key)) {
    res.delete(key);
  } else {
    res.add(key);
  }

  return res;
}
