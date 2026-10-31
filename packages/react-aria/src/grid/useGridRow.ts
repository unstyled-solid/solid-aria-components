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

import {chain} from '../utils/chain';
import {merge} from 'solid-js';

import {DOMAttributes, FocusableElement, RefObject} from '@react-types/shared';
import {
  IGridCollection as GridCollection,
  GridNode
} from 'react-stately/private/grid/GridCollection';
import {gridMap} from './utils';
import {GridState} from 'react-stately/private/grid/useGridState';
import {SelectableItemStates, useSelectableItem} from '../selection/useSelectableItem';

export interface GridRowProps<T> {
  /**
   * An object representing the grid row. Contains all the relevant information that makes up the
   * grid row.
   */
  node: GridNode<T>;
  /** Whether the grid row is contained in a virtual scroller. */
  isVirtualized?: boolean;
  /** Whether selection should occur on press up instead of press down. */
  shouldSelectOnPressUp?: boolean;
  /**
   * Handler that is called when a user performs an action on the row.
   * Please use onCellAction at the collection level instead.
   *
   * @deprecated
   */
  onAction?: () => void;
}

export interface GridRowAria extends SelectableItemStates {
  /** Props for the grid row element. */
  rowProps: DOMAttributes;
  /** Whether the row is currently in a pressed state. */
  isPressed: SelectableItemStates['isPressed'];
}

/**
 * Provides the behavior and accessibility implementation for a row in a grid.
 *
 * @param props - Props for the row.
 * @param state - State of the parent grid, as returned by `useGridState`.
 */
export function useGridRow<T, C extends GridCollection<T>, S extends GridState<T, C>>(
  props: GridRowProps<T>,
  state: S,
  ref: RefObject<FocusableElement | null>
): GridRowAria {
  let data = () => gridMap.get(state)!;
  let onRowAction = () => data().actions.onRowAction ? () => data().actions.onRowAction?.(props.node.key) : props.onAction;
  let {itemProps, ...states} = useSelectableItem({
    get selectionManager() {return state.selectionManager;},
    get key() {return props.node.key;},
    ref,
    get isVirtualized() {return props.isVirtualized;},
    get shouldSelectOnPressUp() {return data().shouldSelectOnPressUp || props.shouldSelectOnPressUp;},
    get onAction() {return onRowAction() || props.node?.props?.onAction ? chain(props.node?.props?.onAction, onRowAction()) : undefined;},
    get isDisabled() {return state.collection.size === 0;}
  });

  let isSelected = () => state.selectionManager.isSelected(props.node.key);

  let rowProps: DOMAttributes = merge({
    role: 'row' as const,
    get 'aria-selected'() {return state.selectionManager.selectionMode !== 'none' ? isSelected() ? 'true' as const : 'false' as const : undefined;},
    get 'aria-disabled'() {return states.isDisabled() ? 'true' as const : undefined;}
  }, itemProps, {get 'aria-rowindex'() {return props.isVirtualized ? props.node.index + 1 : undefined;}});

  return {
    rowProps,
    ...states
  };
}
