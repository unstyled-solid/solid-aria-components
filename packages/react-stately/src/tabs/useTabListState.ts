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
  CollectionBase,
  CollectionStateBase,
  Key,
  Node,
  SingleSelection
} from '@react-types/shared';
import {SingleSelectListState, useSingleSelectListState} from '../list/useSingleSelectListState';
import {createEffect, merge, omit, untrack} from 'solid-js';

export interface TabListProps<T>
  extends
    CollectionBase<T>,
    Omit<
      SingleSelection,
      'disallowEmptySelection' | 'selectedKey' | 'defaultSelectedKey' | 'onSelectionChange'
    > {
  /**
   * Whether the TabList is disabled.
   * Shows that a selection exists, but is not available in that circumstance.
   */
  isDisabled?: boolean;
  /** The currently selected key in the collection (controlled). */
  selectedKey?: Key;
  /** The initial selected keys in the collection (uncontrolled). */
  defaultSelectedKey?: Key;
  /** Handler that is called when the selection changes. */
  onSelectionChange?: (key: Key) => void;
}

export interface TabListStateOptions<T>
  extends Omit<TabListProps<T>, 'children'>, CollectionStateBase<T> {}

export interface TabListState<T> extends SingleSelectListState<T> {
  /** Whether the tab list is disabled. */
  isDisabled: boolean;
}

/**
 * Provides state management for a Tabs component. Tabs include a TabList which tracks
 * which tab is currently selected and displays the content associated with that Tab in a TabPanel.
 */
export function useTabListState<T extends object>(props: TabListStateOptions<T>): TabListState<T> {
  let state = useSingleSelectListState<T>(merge(omit(props, 'onSelectionChange'), {
    get onSelectionChange() {return props.onSelectionChange
      ? (key: Key | null) => {
          if (key != null) {
            props.onSelectionChange?.(key);
          }
        }
      : undefined;},
    suppressTextValueWarning: true,
    get defaultSelectedKey() {return props.defaultSelectedKey ??
      findDefaultSelectedKey(
        props.collection,
        props.disabledKeys ? new Set(props.disabledKeys) : new Set()
      ) ??
      undefined;}
  }));

  let selectionManager = state.selectionManager;

  let lastSelectedKey = untrack(() => state.selectedKey);
  createEffect(() => {
    // Ensure a tab is always selected (in case no selected key was specified or if selected item was deleted from collection)
    let collection = state.collection;
    let selectedKey = state.selectedKey;
    let controlled = props.selectedKey !== undefined;
    let requestSelection = false;
    if (
      props.selectedKey == null &&
      (selectionManager.isEmpty || selectedKey == null || !collection.getItem(selectedKey))
    ) {
      selectedKey = findDefaultSelectedKey(collection, state.disabledKeys);
      if (selectedKey != null) {
        requestSelection = true;
      }
    }

    // An uncontrolled fallback is an accepted staged request. A controlled
    // request is not acceptance: keep focus tied to the actual external key.
    let focusKey = controlled ? state.selectedKey : selectedKey;
    return {selectedKey, requestSelection, focusKey};
  }, ({selectedKey, requestSelection, focusKey}) => {
    if (requestSelection && selectedKey != null) {
      // Direct source selection avoids replace/toggle disabled-key policy.
      untrack(() => selectionManager.setSelectedKeys([selectedKey]));
    }
    // These are imperative focus observations, not inputs to the selected-key
    // transition. Tracking them would make this correction subscribe to itself.
    let {focusedKey, isFocused} = untrack(() => ({focusedKey: selectionManager.focusedKey, isFocused: selectionManager.isFocused}));
    if ((focusKey != null && focusedKey == null) ||
      (!isFocused && focusKey !== lastSelectedKey)) {
      untrack(() => selectionManager.setFocusedKey(focusKey));
    }
    lastSelectedKey = focusKey;
  });

  return merge(state, {get isDisabled() {return props.isDisabled || false;}});
}

function findDefaultSelectedKey<T>(
  collection: Collection<Node<T>> | undefined,
  disabledKeys: Set<Key>
) {
  let selectedKey: Key | null = null;
  if (collection) {
    selectedKey = collection.getFirstKey();
    // loop over tabs until we find one that isn't disabled and select that
    while (
      selectedKey != null &&
      (disabledKeys.has(selectedKey) || collection.getItem(selectedKey)?.props?.isDisabled) &&
      selectedKey !== collection.getLastKey()
    ) {
      selectedKey = collection.getKeyAfter(selectedKey);
    }
    // if this check is true, then every item is disabled, it makes more sense to default to the first key than the last
    if (
      selectedKey != null &&
      (disabledKeys.has(selectedKey) || collection.getItem(selectedKey)?.props?.isDisabled) &&
      selectedKey === collection.getLastKey()
    ) {
      selectedKey = collection.getFirstKey();
    }
  }

  return selectedKey;
}
