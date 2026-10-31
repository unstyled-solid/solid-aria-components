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
  AriaLabelingProps,
  DOMAttributes,
  DOMProps,
  Key,
  KeyboardDelegate,
  RefObject
} from '@react-types/shared';
import {filterDOMProps} from '../utils/filterDOMProps';
import {createEffect, createMemo, merge, untrack} from 'solid-js';
import {getEventTarget, nodeContains} from '../utils/shadowdom/DOMFunctions';
import {IGridCollection as GridCollection} from 'react-stately/private/grid/GridCollection';
import {GridKeyboardDelegate} from './GridKeyboardDelegate';
import {gridMap} from './utils';
import {GridState} from 'react-stately/private/grid/useGridState';
import {mergeProps} from '../utils/mergeProps';
import {useCollator} from '../i18n/useCollator';
import {useGridSelectionAnnouncement} from './useGridSelectionAnnouncement';
import {useHasTabbableChild} from '../focus/useHasTabbableChild';
import {useHighlightSelectionDescription} from './useHighlightSelectionDescription';
import {useId} from '../utils/useId';
import {useLocale} from '../i18n/I18nProvider';
import {useSelectableCollection} from '../selection/useSelectableCollection';

export interface GridProps extends DOMProps, AriaLabelingProps {
  /** Whether the grid uses virtual scrolling. */
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
   * Whether initial grid focus should be placed on the grid row or grid cell.
   *
   * @default 'row'
   */
  focusMode?: 'row' | 'cell';
  /**
   * A function that returns the text that should be announced by assistive technology when a row is
   * added or removed from selection.
   *
   * @default (key) => state.collection.getItem(key)?.textValue
   */
  getRowText?: (key: Key) => string;
  /**
   * The ref attached to the scrollable body. Used to provided automatic scrolling on item focus for
   * non-virtualized grids.
   */
  scrollRef?: RefObject<HTMLElement | null>;
  /** Handler that is called when a user performs an action on the row. */
  onRowAction?: (key: Key) => void;
  /** Handler that is called when a user performs an action on the cell. */
  onCellAction?: (key: Key) => void;
  /**
   * Whether pressing the escape key should clear selection in the grid or not.
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
  /**
   * Whether keyboard navigation to focusable elements within grid cells is
   * via arrow keys or the tab key.
   *
   * @default 'arrow'
   */
  keyboardNavigationBehavior?: 'arrow' | 'tab';
}

export interface GridAria {
  /** Props for the grid element. */
  gridProps: DOMAttributes;
}

/**
 * Provides the behavior and accessibility implementation for a grid component. A grid displays data
 * in one or more rows and columns and enables a user to navigate its contents via directional
 * navigation keys.
 *
 * @param props - Props for the grid.
 * @param state - State for the grid, as returned by `useGridState`.
 * @param ref - The ref attached to the grid element.
 */
export function useGrid<T>(
  props: GridProps,
  state: GridState<T, GridCollection<T>>,
  ref: RefObject<HTMLElement | null>
): GridAria {
  let manager = () => state.selectionManager;
  createEffect(() => props['aria-label'] || props['aria-labelledby'], label => {
  if (!label) {
    console.warn('An aria-label or aria-labelledby prop is required for accessibility.');
  }
  });

  // By default, a KeyboardDelegate is provided which uses the DOM to query layout information (e.g. for page up/page down).
  // When virtualized, the layout object will be passed in as a prop and override this.
  let collator = useCollator({usage: 'search', sensitivity: 'base'});
  let locale = useLocale();
  let delegate = createMemo(
    () =>
      props.keyboardDelegate ||
      new GridKeyboardDelegate({
        collection: state.collection,
        disabledKeys: state.disabledKeys,
        disabledBehavior: manager().disabledBehavior,
        ref,
        direction: locale.direction,
        collator,
        focusMode: props.focusMode
      })
  );

  let {collectionProps} = useSelectableCollection({
    ref,
    get selectionManager() {return manager();},
    get keyboardDelegate() {return delegate();},
    get isVirtualized() {return props.isVirtualized;},
    get scrollRef() {return props.scrollRef;},
    get disallowTypeAhead() {return props.disallowTypeAhead;},
    get escapeKeyBehavior() {return props.escapeKeyBehavior ?? 'clearSelection';}
  });

  let id = useId(() => props.id);
  gridMap.set(state, {
    get keyboardDelegate() {return delegate();},
    actions: {get onRowAction() {return props.onRowAction;}, get onCellAction() {return props.onCellAction;}},
    get shouldSelectOnPressUp() {return props.shouldSelectOnPressUp;},
    get keyboardNavigationBehavior() {return props.keyboardNavigationBehavior ?? 'arrow';}
  });

  let descriptionProps = useHighlightSelectionDescription({
    get selectionManager() {return manager();},
    get hasItemActions() {return !!(props.onRowAction || props.onCellAction);}
  });

  let domProps = filterDOMProps(props, {labelable: true});

  let onFocus = (e: FocusEvent & {currentTarget: Element}) => {
      if (manager().isFocused) {
        // If a focus event bubbled through a portal, reset focus state.
        if (!nodeContains(e.currentTarget, getEventTarget(e))) {
          manager().setFocused(false);
        }

        return;
      }

      // Focus events can bubble through portals. Ignore these events.
      if (!nodeContains(e.currentTarget, getEventTarget(e))) {
        return;
      }

      manager().setFocused(true);
    };

  // Continue to track collection focused state even if keyboard navigation is disabled
  let navDisabledHandlers = {
      get onFocusOut() {return collectionProps.onFocusOut;},
      onFocusIn: onFocus
    };

  let hasTabbableChild = useHasTabbableChild(ref, {
    get isDisabled() {return state.collection.size !== 0;}
  });

  // Native spread installs event bindings from setup-owned property names.
  // Keep the source bags' full shape while resolving every value against the
  // currently selected bag. Disabled navigation still supplies undefined for
  // omitted properties, preserving Adobe merge precedence and DOM omission.
  let navigationProps: DOMAttributes = {};
  let navigationKeys = untrack(() => [...new Set([
    ...Reflect.ownKeys(collectionProps), ...Reflect.ownKeys(navDisabledHandlers)
  ])]);
  for (let key of navigationKeys) {
    Object.defineProperty(navigationProps, key, {
      enumerable: true,
      get() {
        let source = state.isKeyboardNavigationDisabled ? navDisabledHandlers : collectionProps;
        return Reflect.get(source, key, source);
      }
    });
  }
  let gridProps: DOMAttributes = mergeProps(
    domProps,
    {
      role: 'grid',
      get id() {return id();},
      get 'aria-multiselectable'() {return manager().selectionMode === 'multiple' ? 'true' as const : undefined;},
      get 'aria-rowcount'() {return props.isVirtualized ? state.collection.size : undefined;},
      get 'aria-colcount'() {return props.isVirtualized ? state.collection.columnCount : undefined;}
    },
    navigationProps,
    // If collection is empty, make sure the grid is tabbable unless there is a child tabbable element.
    merge(() => state.collection.size === 0 ? {tabIndex: hasTabbableChild() ? -1 : 0} : {}),
    descriptionProps
  );

  useGridSelectionAnnouncement({get getRowText() {return props.getRowText;}}, state);
  return {
    gridProps
  };
}
