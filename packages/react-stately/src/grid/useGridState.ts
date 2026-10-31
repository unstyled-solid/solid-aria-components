import {getChildNodes, getFirstItem, getLastItem} from '../collections/getChildNodes';
import {GridNode, IGridCollection} from './GridCollection';
import {Key} from '@react-types/shared';
import {MultipleSelectionState} from '../selection/types';
import {
  MultipleSelectionStateProps,
  useMultipleSelectionState
} from '../selection/useMultipleSelectionState';
import {SelectionManager} from '../selection/SelectionManager';
import {createEffect, createMemo, createSignal, untrack} from 'solid-js';
import {liveView} from '../collections/useCollection';

export interface GridState<T, C extends IGridCollection<T>> {
  collection: C;
  /** A set of keys for rows that are disabled. */
  disabledKeys: Set<Key>;
  /** A selection manager to read and update row selection state. */
  selectionManager: SelectionManager;
  /**
   * Whether keyboard navigation is disabled, such as when the arrow keys should be handled by a
   * component within a cell.
   */
  isKeyboardNavigationDisabled: boolean;
}

export interface GridStateOptions<
  T,
  C extends IGridCollection<T>
> extends MultipleSelectionStateProps {
  collection: C;
  disabledKeys?: Iterable<Key>;
  focusMode?: 'row' | 'cell';
  /** @private - Do not use unless you know what you're doing. */
  UNSAFE_selectionState?: MultipleSelectionState;
}

/**
 * Provides state management for a grid component. Handles row selection and focusing a grid cell's
 * focusable child if applicable.
 */
export function useGridState<T extends object, C extends IGridCollection<T>>(
  props: GridStateOptions<T, C>
): GridState<T, C> {
  // oxlint-disable-next-line react/react-compiler, react-hooks/rules-of-hooks
  // The optional shared selection engine is setup-owned, as is its source
  // focused-key override. Its scalar fields and the grid props remain live.
  let selectionState = untrack(() => props.UNSAFE_selectionState) || useMultipleSelectionState(props);
  let disabledKeys = createMemo(() => props.disabledKeys ? new Set(props.disabledKeys) : new Set<Key>());

  let setFocusedKey = selectionState.setFocusedKey;
  // oxlint-disable-next-line react/react-compiler
  selectionState.setFocusedKey = (key, child) => {
    // If focusMode is cell and an item is focused, focus a child cell instead.
    if (props.focusMode === 'cell' && key != null) {
      let collection = props.collection;
      let item = collection.getItem(key);
      if (item?.type === 'item') {
        let children = getChildNodes(item, collection);
        if (child === 'last') {
          key = getLastItem(children)?.key ?? null;
        } else {
          key = getFirstItem(children)?.key ?? null;
        }
      }
    }

    setFocusedKey(key, child);
  };

  let selectionManager = liveView(createMemo(() => {
    selectionState.selectedKeys;
    selectionState.disabledKeys;
    return new SelectionManager(props.collection, selectionState);
  }));

  // Reset focused key if that item is deleted from the collection.
  let cachedCollection: C | null = null;
  createEffect(() => {
    let collection = props.collection;
    let focusedKey = selectionState.focusedKey;
    let resetFocusedKey = false;
    let nextFocusedKey: Key | null = null;
    if (
      focusedKey != null &&
      cachedCollection &&
      !collection.getItem(focusedKey)
    ) {
      resetFocusedKey = true;
      const node = cachedCollection.getItem(focusedKey);
      const parentNode =
        node?.parentKey != null &&
        (node.type === 'cell' || node.type === 'rowheader' || node.type === 'column')
          ? cachedCollection.getItem(node.parentKey)
          : node;
      if (!parentNode) {
        // Source returns before replacing the cached collection in this case.
        return {collection, resetFocusedKey, nextFocusedKey, updateCache: false};
      }
      const cachedRows = cachedCollection.rows;
      const rows = collection.rows;
      const diff = cachedRows.length - rows.length;
      let index = Math.min(
        diff > 1 ? Math.max(parentNode.index - diff + 1, 0) : parentNode.index,
        rows.length - 1
      );
      let newRow: GridNode<T> | null = null;
      // Find the nearest focusable row at or after the deleted position...
      for (let i = Math.max(0, index); i < rows.length; i++) {
        if (!selectionManager.isDisabled(rows[i].key) && rows[i].type !== 'headerrow') {
          newRow = rows[i];
          break;
        }
      }
      // ...otherwise the nearest focusable row before it. (Mirrors useListState's
      // getKeyAfter/getKeyBefore walk.)
      if (newRow === null) {
        for (let i = index - 1; i >= 0; i--) {
          if (!selectionManager.isDisabled(rows[i].key) && rows[i].type !== 'headerrow') {
            newRow = rows[i];
            break;
          }
        }
      }
      if (newRow) {
        const childNodes = newRow.hasChildNodes ? [...getChildNodes(newRow, collection)] : [];
        nextFocusedKey =
          newRow.hasChildNodes && parentNode !== node && node && node.index < childNodes.length
            ? childNodes[node.index].key
            : newRow.key;
      }
    }
    return {collection, resetFocusedKey, nextFocusedKey, updateCache: true};
  }, ({collection, resetFocusedKey, nextFocusedKey, updateCache}) => {
    if (resetFocusedKey) {
      // Focus translation/selection is an imperative request. All inputs to the
      // source recovery algorithm were tracked in the compute half above.
      untrack(() => selectionState.setFocusedKey(nextFocusedKey));
    }
    if (updateCache) {
      cachedCollection = collection;
    }
  });

  let keyboardNavigationDisabled = false;
  let [navigationDisabled, setNavigationDisabled] = createSignal(false);

  return {
    get collection() {return props.collection;},
    get disabledKeys() {return disabledKeys();},
    get isKeyboardNavigationDisabled() {
      navigationDisabled();
      return keyboardNavigationDisabled;
    },
    set isKeyboardNavigationDisabled(value) {
      keyboardNavigationDisabled = value;
      setNavigationDisabled(value);
    },
    selectionManager
  };
}
