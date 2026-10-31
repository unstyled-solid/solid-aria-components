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
  DisabledBehavior,
  FocusStrategy,
  Key,
  MultipleSelection,
  SelectionBehavior,
  SelectionMode
} from '@react-types/shared';
import {MultipleSelectionState} from './types';
import {Selection} from './Selection';
import {useControlledState} from '../utils/useControlledState';
import {createMemo, createSignal, untrack} from 'solid-js';

function equalSets(setA: 'all' | Set<Key>, setB: 'all' | Set<Key>) {
  if (setA === 'all' || setB === 'all') {
    return setA === setB;
  }
  if (setA.size !== setB.size) {
    return false;
  }

  for (let item of setA) {
    if (!setB.has(item)) {
      return false;
    }
  }

  return true;
}

export interface MultipleSelectionStateProps extends MultipleSelection {
  /**
   * How multiple selection should behave in the collection.
   *
   * @default 'toggle'
   */
  selectionBehavior?: SelectionBehavior;
  /** Whether onSelectionChange should fire even if the new set of keys is the same as the last. */
  allowDuplicateSelectionEvents?: boolean;
  /**
   * Whether `disabledKeys` applies to all interactions, or only selection.
   *
   * @default 'all'
   */
  disabledBehavior?: DisabledBehavior;
}

/**
 * Manages state for multiple selection and focus in a collection.
 */
export function useMultipleSelectionState(
  props: MultipleSelectionStateProps
): MultipleSelectionState {
  // We want synchronous updates to `isFocused` and `focusedKey` after their setters are called.
  // But we also need to trigger a react re-render. So, we have both a ref (sync) and state (async).
  let isFocusedRef = false;
  let [focused, setFocused] = createSignal(false);
  let focusedKeyRef: Key | null = null;
  let childFocusStrategyRef: FocusStrategy | null = null;
  let [focusedKey, setFocusedKey] = createSignal<Key | null>(null);
  let selectedKeysProp = createMemo(() => convertSelection(props.selectedKeys));
  let defaultSelectedKeys = untrack(() => convertSelection(props.defaultSelectedKeys, new Selection()));
  let [selectedKeys, setSelectedKeys] = useControlledState<'all' | Set<Key>>(
    selectedKeysProp,
    defaultSelectedKeys!,
    keys => props.onSelectionChange?.(keys)
  );
  let disabledKeysProp = createMemo(() => props.disabledKeys ? new Set(props.disabledKeys) : new Set<Key>());
  let [behaviorRequest, setBehaviorRequest] = createSignal<{behavior: SelectionBehavior} | null>(null);
  // Source history: reset the touch toggle override on empty replace selection,
  // and reset it when the external behavior changes, without a signal relay.
  let previousBehavior: {prop: SelectionBehavior; request: ReturnType<typeof behaviorRequest>; behavior: SelectionBehavior} | undefined;
  let selectionBehavior = createMemo(() => {
    let prop = props.selectionBehavior ?? 'toggle';
    let request = behaviorRequest();
    let keys = selectedKeys();
    let behavior = !previousBehavior || previousBehavior.prop !== prop ? prop :
      previousBehavior.request !== request ? request?.behavior ?? prop : previousBehavior.behavior;
    if (prop === 'replace' && behavior === 'toggle' && keys !== 'all' && keys.size === 0) {
      behavior = 'replace';
    }
    previousBehavior = {prop, request, behavior};
    return behavior;
  });

  return {
    get selectionMode() {return props.selectionMode ?? 'none';},
    get disallowEmptySelection() {return props.disallowEmptySelection ?? false;},
    get selectionBehavior() {return selectionBehavior();},
    setSelectionBehavior(behavior) {setBehaviorRequest({behavior});},
    get isFocused() {
      focused();
      return isFocusedRef;
    },
    setFocused(f) {
      isFocusedRef = f;
      setFocused(f);
    },
    get focusedKey() {
      focusedKey();
      return focusedKeyRef;
    },
    get childFocusStrategy() {
      focusedKey();
      return childFocusStrategyRef;
    },
    setFocusedKey(k, childFocusStrategy = 'first') {
      focusedKeyRef = k;
      childFocusStrategyRef = childFocusStrategy;
      setFocusedKey(k);
    },
    get selectedKeys() {return selectedKeys();},
    setSelectedKeys(keys) {
      setSelectedKeys(previous => props.allowDuplicateSelectionEvents || !equalSets(keys, previous) ? keys : previous);
    },
    get disabledKeys() {return disabledKeysProp();},
    get disabledBehavior() {return props.disabledBehavior ?? 'all';}
  };
}

function convertSelection(
  selection: 'all' | Iterable<Key> | null | undefined,
  defaultValue?: Selection
): 'all' | Set<Key> | undefined {
  if (!selection) {
    return defaultValue;
  }

  return selection === 'all' ? 'all' : new Selection(selection);
}
