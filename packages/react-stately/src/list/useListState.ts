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

import {Collection, CollectionStateBase, Key, LayoutDelegate, Node} from '@react-types/shared';
import {ListCollection} from './ListCollection';
import {
  MultipleSelectionStateProps,
  useMultipleSelectionState
} from '../selection/useMultipleSelectionState';
import {SelectionManager} from '../selection/SelectionManager';
import {createEffect, createMemo, untrack, type Accessor} from 'solid-js';
import {liveView, readLiveView, useCollection} from '../collections/useCollection';

export interface ListProps<T> extends CollectionStateBase<T>, MultipleSelectionStateProps {
  /** Filter function to generate a filtered list of nodes. */
  filter?: (nodes: Iterable<Node<T>>) => Iterable<Node<T>>;
  /** @private */
  suppressTextValueWarning?: boolean;
  /**
   * A delegate object that provides layout information for items in the collection.
   * This can be used to override the behavior of shift selection.
   */
  layoutDelegate?: LayoutDelegate;
}

export interface ListState<T> {
  /** A collection of items in the list. */
  collection: Collection<Node<T>>;

  /** A set of items that are disabled. */
  disabledKeys: Set<Key>;

  /** A selection manager to read and update multiple selection state. */
  selectionManager: SelectionManager;
}

/**
 * Provides state management for list-like components. Handles building a collection
 * of items from props, and manages multiple selection state.
 */
export function useListState<T>(props: ListProps<T>): ListState<T> {
  let selectionState = useMultipleSelectionState(props);
  let disabledKeys = createMemo(() => props.disabledKeys ? new Set(props.disabledKeys) : new Set<Key>());

  let factory = (nodes: Iterable<Node<T>>) =>
    props.filter ? new ListCollection(props.filter(nodes)) : new ListCollection(nodes);
  let context = {get suppressTextValueWarning() {return props.suppressTextValueWarning;}};

  let sourceCollection = useCollection(props, factory, context);
  // Source consumers compare immutable collection images to invalidate layout.
  // A stable native handle must not hide a newly published collection image.
  let collection = createMemo(() => readLiveView(sourceCollection()));

  let selectionManager = liveView(createMemo(() => {
    selectionState.selectedKeys;
    selectionState.disabledKeys;
    return new SelectionManager(collection(), selectionState, {layoutDelegate: props.layoutDelegate});
  }));

  useFocusedKeyReset(collection, selectionManager);

  return {
    get collection() {return collection();},
    get disabledKeys() {return disabledKeys();},
    selectionManager
  };
}

/**
 * Filters a collection using the provided filter function and returns a new ListState.
 */
export function UNSTABLE_useFilteredListState<T>(
  state: ListState<T>,
  filterFn: ((nodeValue: string, node: Node<T>) => boolean) | null | undefined,
  getFilter?: Accessor<((nodeValue: string, node: Node<T>) => boolean) | null | undefined>
): ListState<T> {
  let collection = createMemo(() => {
    let filter = getFilter ? getFilter() : filterFn;
    return filter ? state.collection.filter!(filter) : state.collection;
  }, {name: 'filteredList.collection'});
  let manager = createMemo(() => state.selectionManager.withCollection(collection()), {name: 'filteredList.selectionManager'});
  let methods = new Map<PropertyKey, (...args: any[]) => any>();
  let selectionManager: SelectionManager = new Proxy({} as SelectionManager, {
    get(_target, key) {
      if (key === 'collection') {
        return collection();
      }
      // The class instance is a construction/cache record, not scalar state.
      // Its getters and methods read live fields through this receiver, so a
      // selected-key update does not invalidate unrelated option bindings.
      let current = untrack(manager);
      let value = Reflect.get(current, key, selectionManager);
      if (typeof value !== 'function') {
        return value;
      }
      if (!methods.has(key)) {
        methods.set(key, (...args) => Reflect.apply(Reflect.get(untrack(manager), key), selectionManager, args));
      }
      return methods.get(key);
    },
    set(_target, key, value) {
      let current = untrack(manager);
      return Reflect.set(current, key, value, current);
    },
    getPrototypeOf: () => SelectionManager.prototype
  });
  useFocusedKeyReset(collection, selectionManager);
  return {
    get collection() {return collection();},
    selectionManager,
    get disabledKeys() {return state.disabledKeys;}
  };
}

function useFocusedKeyReset<T>(
  collectionAccessor: Accessor<Collection<Node<T>>>,
  selectionManager: SelectionManager
) {
  // Reset focused key if that item is deleted from the collection.
  // Native collections may be stable live views of immutable source images.
  // Cache the old image's traversal, not a receiver that follows the new image.
  let cachedKeyLinks: Map<Key, {after: Key | null; before: Key | null}> | null = null;
  createEffect(() => {
    let collection = collectionAccessor();
    let keyLinks = new Map<Key, {after: Key | null; before: Key | null}>();
    for (let key of collection.getKeys()) {
      keyLinks.set(key, {after: collection.getKeyAfter(key), before: collection.getKeyBefore(key)});
    }
    let focusedKey = selectionManager.focusedKey;
    let resetFocusedKey = false;
    let nextFocusedKey: Key | null = null;
    if (
      focusedKey != null &&
      !collection.getItem(focusedKey) &&
      cachedKeyLinks
    ) {
      // Walk forward in the old collection to find the next key that still exists in the new collection.
      let key = cachedKeyLinks.get(focusedKey)?.after ?? null;
      resetFocusedKey = true;
      while (key != null) {
        let node = collection.getItem(key);
        if (node && node.type === 'item' && !selectionManager.isDisabled(key)) {
          nextFocusedKey = key;
          break;
        }

        key = cachedKeyLinks.get(key)?.after ?? null;
      }

      // If no such key exists, walk backward.
      if (nextFocusedKey == null) {
        key = cachedKeyLinks.get(focusedKey)?.before ?? null;
        while (key != null) {
          let node = collection.getItem(key);
          if (node && node.type === 'item' && !selectionManager.isDisabled(key)) {
            nextFocusedKey = key;
            break;
          }

          key = cachedKeyLinks.get(key)?.before ?? null;
        }
      }

    }
    return {keyLinks, resetFocusedKey, nextFocusedKey};
  }, ({keyLinks, resetFocusedKey, nextFocusedKey}) => {
    if (resetFocusedKey) {
      untrack(() => selectionManager.setFocusedKey(nextFocusedKey));
    }
    cachedKeyLinks = keyLinks;
  });
}
