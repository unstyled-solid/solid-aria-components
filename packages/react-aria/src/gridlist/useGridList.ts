/*
 * Copyright 2022 Adobe. All rights reserved.
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
  AriaLabelingProps,
  CollectionBase,
  DisabledBehavior,
  DOMAttributes,
  DOMProps,
  FocusStrategy,
  Key,
  KeyboardDelegate,
  LayoutDelegate,
  MultipleSelection,
  RefObject
} from '@react-types/shared';
import {filterDOMProps} from '../utils/filterDOMProps';
import {listMap} from './utils';
import {ListState} from 'react-stately/useListState';
import {mergeProps} from '../utils/mergeProps';
import {useGridSelectionAnnouncement} from '../grid/useGridSelectionAnnouncement';
import {useHasTabbableChild} from '../focus/useHasTabbableChild';
import {useHighlightSelectionDescription} from '../grid/useHighlightSelectionDescription';
import {useId} from '../utils/useId';
import {useSelectableList} from '../selection/useSelectableList';
import {createEffect, merge, onCleanup} from 'solid-js';

export interface GridListProps<T> extends CollectionBase<T>, MultipleSelection {
  /** Whether to auto focus the gridlist or an option. */
  autoFocus?: boolean | FocusStrategy;
  /**
   * Handler that is called when a user performs an action on an item. The exact user event depends
   * on the collection's `selectionBehavior` prop and the interaction modality.
   */
  onAction?: (key: Key) => void;
  /**
   * Whether `disabledKeys` applies to all interactions, or only selection.
   *
   * @default 'all'
   */
  disabledBehavior?: DisabledBehavior;
  /** Whether selection should occur on press up instead of press down. */
  shouldSelectOnPressUp?: boolean;
}

export interface AriaGridListProps<T> extends GridListProps<T>, DOMProps, AriaLabelingProps {
  /**
   * Whether keyboard navigation to focusable elements within grid list items is
   * via the left/right arrow keys or the tab key.
   *
   * @default 'arrow'
   */
  keyboardNavigationBehavior?: 'arrow' | 'tab';
  /**
   * Whether pressing the escape key should clear selection in the grid list or not.
   *
   * Most experiences should not modify this option as it eliminates a keyboard user's ability to
   * easily clear selection. Only use if the escape key is being handled externally or should not
   * trigger selection clearing contextually.
   *
   * @default 'clearSelection'
   */
  escapeKeyBehavior?: 'clearSelection' | 'none';
}

export interface AriaGridListOptions<T> extends Omit<AriaGridListProps<T>, 'children'> {
  /** Whether the list uses virtual scrolling. */
  isVirtualized?: boolean;
  /**
   * Whether typeahead navigation is disabled.
   *
   * @default false
   */
  disallowTypeAhead?: boolean;
  /**
   * An optional keyboard delegate implementation for type to select,
   * to override the default.
   */
  keyboardDelegate?: KeyboardDelegate;
  /**
   * A delegate object that provides layout information for items in the collection.
   * By default this uses the DOM, but this can be overridden to implement things like
   * virtualized scrolling.
   */
  layoutDelegate?: LayoutDelegate;
  /**
   * Whether focus should wrap around when the end/start is reached.
   *
   * @default false
   */
  shouldFocusWrap?: boolean;
  /**
   * The behavior of links in the collection.
   * - 'action': link behaves like onAction.
   * - 'selection': link follows selection interactions (e.g. if URL drives selection).
   * - 'override': links override all other interactions (link items are not selectable).
   *
   * @default 'action'
   */
  linkBehavior?: 'action' | 'selection' | 'override';
  /**
   * Which item in the collection to focus when tabbing into the collection. Overrides default
   * roving tab index like behavior.
   *
   * @private
   */
  UNSTABLE_focusOnEntry?: 'first' | 'last';
}

export interface GridListAria {
  /** Props for the grid element. */
  gridProps: DOMAttributes;
}

/**
 * Provides the behavior and accessibility implementation for a list component with interactive
 * children. A grid list displays data in a single column and enables a user to navigate its
 * contents via directional navigation keys.
 *
 * @param props - Props for the list.
 * @param state - State for the list, as returned by `useListState`.
 * @param ref - The ref attached to the list element.
 */
export function useGridList<T>(
  props: AriaGridListOptions<T>,
  state: ListState<T>,
  ref: RefObject<HTMLElement | null>
): GridListAria {
  createEffect(() => !props['aria-label'] && !props['aria-labelledby'], missingLabel => {
    if (missingLabel) {
      console.warn('An aria-label or aria-labelledby prop is required for accessibility.');
    }
  });

  let {listProps} = useSelectableList(merge(props, {
    get selectionManager() { return state.selectionManager; },
    get collection() { return state.collection; },
    get disabledKeys() { return state.disabledKeys; },
    ref,
    get selectOnFocus() { return state.selectionManager.selectionBehavior === 'replace'; },
    get linkBehavior() { return props.linkBehavior ?? 'action'; },
    get escapeKeyBehavior() { return props.escapeKeyBehavior ?? 'clearSelection'; }
  }));

  let id = useId(() => props.id);
  let metadata = {
    get id() { return id(); },
    get onAction() { return props.onAction; },
    get linkBehavior() { return props.linkBehavior ?? 'action'; },
    get keyboardNavigationBehavior() { return props.keyboardNavigationBehavior ?? 'arrow'; },
    get shouldSelectOnPressUp() { return props.shouldSelectOnPressUp; }
  };
  listMap.set(state, metadata);
  onCleanup(() => {
    if (listMap.get(state) === metadata) { listMap.delete(state); }
  });

  let descriptionProps = useHighlightSelectionDescription({
    get selectionManager() { return state.selectionManager; },
    get hasItemActions() { return !!props.onAction; }
  });

  let hasTabbableChild = useHasTabbableChild(ref, {
    get isDisabled() { return state.collection.size !== 0; }
  });

  let domProps = filterDOMProps(props, {labelable: true});
  let gridProps: DOMAttributes = mergeProps(
    domProps,
    {
      role: 'grid' as const,
      get id() { return id(); },
      get 'aria-multiselectable'() { return state.selectionManager.selectionMode === 'multiple' ? 'true' : undefined; },
      get 'aria-rowcount'() { return props.isVirtualized ? state.collection.size : undefined; },
      get 'aria-colcount'() { return props.isVirtualized ? 1 : undefined; }
    },
    // If collection is empty, make sure the grid is tabbable unless there is a child tabbable element.
    merge(() => state.collection.size === 0 ? {tabIndex: hasTabbableChild() ? -1 : 0} : listProps),
    descriptionProps
  );

  useGridSelectionAnnouncement({}, state);

  return {
    gridProps
  };
}
