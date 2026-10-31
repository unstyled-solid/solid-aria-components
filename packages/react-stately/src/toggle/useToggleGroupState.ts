/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {Key} from '@react-types/shared';
import {useControlledState} from '../utils/useControlledState';
import {createMemo, untrack} from 'solid-js';

export interface ToggleGroupProps {
  /**
   * Whether single or multiple selection is enabled.
   *
   * @default 'single'
   */
  selectionMode?: 'single' | 'multiple';
  /** Whether the collection allows empty selection. */
  disallowEmptySelection?: boolean;
  /** The currently selected keys in the collection (controlled). */
  selectedKeys?: Iterable<Key>;
  /** The initial selected keys in the collection (uncontrolled). */
  defaultSelectedKeys?: Iterable<Key>;
  /** Handler that is called when the selection changes. */
  onSelectionChange?: (keys: Set<Key>) => void;
  /** Whether all items are disabled. */
  isDisabled?: boolean;
}

export interface ToggleGroupState {
  /** Whether single or multiple selection is enabled. */
  readonly selectionMode: 'single' | 'multiple';

  /** Whether all items are disabled. */
  readonly isDisabled: boolean;

  /** A set of keys for items that are selected. */
  readonly selectedKeys: Set<Key>;

  /** Toggles the selected state for an item by its key. */
  toggleKey(key: Key): void;

  /** Sets whether the given key is selected. */
  setSelected(key: Key, isSelected: boolean): void;

  /** Replaces the set of selected keys. */
  setSelectedKeys(keys: Set<Key>): void;
}

/**
 * Manages state for a group of toggles.
 * It supports both single and multiple selected items.
 */
export function useToggleGroupState(props: ToggleGroupProps): ToggleGroupState {
  let controlledKeys = createMemo(() => props.selectedKeys ? new Set(props.selectedKeys) : undefined);
  let [selectedKeys, setSelectedKeys] = useControlledState<Set<Key>>(
    controlledKeys,
    untrack(() => props.defaultSelectedKeys ? new Set(props.defaultSelectedKeys) : new Set<Key>()),
    keys => props.onSelectionChange?.(keys)
  );

  let toggle = (selected: Set<Key>, key: Key) => {
    let keys: Set<Key>;
    if (props.selectionMode === 'multiple') {
      keys = new Set(selected);
      if (keys.has(key) && (!props.disallowEmptySelection || keys.size > 1)) {
        keys.delete(key);
      } else {
        keys.add(key);
      }
    } else {
      keys = new Set(selected.has(key) && !props.disallowEmptySelection ? [] : [key]);
    }
    return keys;
  };

  return {
    get selectionMode() { return props.selectionMode ?? 'single'; },
    get isDisabled() { return props.isDisabled ?? false; },
    get selectedKeys() { return selectedKeys(); },
    setSelectedKeys,
    toggleKey(key) {
      // Functional requests consume the previous same-turn proposal, not a
      // committed signal snapshot; controlled refusal remains owned by the core.
      setSelectedKeys(selected => toggle(selected, key));
    },
    setSelected(key, isSelected) {
      setSelectedKeys(selected => isSelected !== selected.has(key) ? toggle(selected, key) : selected);
    }
  };
}
