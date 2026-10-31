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
  DraggableCollectionEndEvent,
  DraggableCollectionProps,
  DragItem,
  DragMoveEvent,
  DragPreviewRenderer,
  DragStartEvent,
  DropOperation,
  Key,
  Node,
  RefObject
} from '@react-types/shared';
import {MultipleSelectionManager} from '../selection/types';
import {createSignal} from 'solid-js';

export interface DraggableCollectionStateOptions<T = object> extends DraggableCollectionProps<T> {
  /** A collection of items. */
  collection: Collection<Node<unknown>>;
  /** An interface for reading and updating multiple selection state. */
  selectionManager: MultipleSelectionManager;
  /** Whether the drag events should be disabled. */
  isDisabled?: boolean;
}

export interface DraggableCollectionState {
  /** A collection of items. */
  collection: Collection<Node<unknown>>;
  /** An interface for reading and updating multiple selection state. */
  selectionManager: MultipleSelectionManager;
  /** The key of the item that initiated a drag. */
  draggedKey: Key | null;
  /** The keys of the items that are currently being dragged. */
  draggingKeys: Set<Key>;
  /** Whether drag events are disabled. */
  isDisabled?: boolean;
  /** Returns whether the given key is currently being dragged. */
  isDragging(key: Key): boolean;
  /** Returns the keys of the items that will be dragged with the given key (e.g. selected items). */
  getKeysForDrag(key: Key): Set<Key>;
  /** Returns the items to drag for the given key. */
  getItems(key: Key): DragItem[];
  /** The ref of the element that will be rendered as the drag preview while dragging. */
  preview?: RefObject<DragPreviewRenderer | null>;
  /**
   * Function that returns the drop operations that are allowed for the dragged items. If not
   * provided, all drop operations are allowed.
   */
  getAllowedDropOperations?: () => DropOperation[];
  /** Begins a drag for the given key. This triggers the onDragStart event. */
  startDrag(key: Key, event: DragStartEvent): void;
  /** Triggers an onDragMove event. */
  moveDrag(event: DragMoveEvent): void;
  /** Ends the current drag, and emits an onDragEnd event. */
  endDrag(event: DraggableCollectionEndEvent): void;
}

/**
 * Manages state for a draggable collection.
 */
export function useDraggableCollectionState<T = object>(
  props: DraggableCollectionStateOptions<T>
): DraggableCollectionState {
  let [dragRevision, setDragRevision] = createSignal(0);
  // Source refs publish the current session synchronously. The revision makes
  // the same source getters reactive without relying on React reexecution.
  let draggingKeys = new Set<Key>();
  let draggedKey: Key | null = null;
  let getKeys = (key: Key) => {
    let {collection, selectionManager} = props;
    // The clicked item is always added to the drag. If it is selected, then all of the
    // other selected items are also dragged. If it is not selected, then only the clicked
    // item is dragged. This matches native macOS behavior.
    // Additionally, we filter out any keys that are children of any of the other selected keys
    let keys = new Set<Key>();
    if (selectionManager.isSelected(key)) {
      for (let currentKey of selectionManager.selectedKeys) {
        let node = collection.getItem(currentKey);
        if (node) {
          let isChild = false;
          let parentKey = node.parentKey;
          while (parentKey != null) {
            // eslint-disable-next-line max-depth
            if (selectionManager.selectedKeys.has(parentKey)) {
              isChild = true;
              break;
            }
            let parentNode = collection.getItem(parentKey);
            parentKey = parentNode ? parentNode.parentKey : null;
          }

          if (!isChild) {
            keys.add(currentKey);
          }
        }
      }
    } else {
      keys.add(key);
    }

    return keys;
  };

  return {
    get collection() {return props.collection;},
    get selectionManager() {return props.selectionManager;},
    get draggedKey() {
      dragRevision();
      return draggedKey;
    },
    get draggingKeys() {
      dragRevision();
      return draggingKeys;
    },
    isDragging(key) {
      dragRevision();
      return draggingKeys.has(key);
    },
    getKeysForDrag: getKeys,
    getItems(key) {
      let keys = getKeys(key);
      let items: any[] = [];
      for (let key of keys) {
        let value = props.collection.getItem(key)?.value;
        if (value != null) {
          items.push(value);
        }
      }

      return props.getItems(getKeys(key), items);
    },
    get isDisabled() {return props.isDisabled;},
    get preview() {return props.preview;},
    get getAllowedDropOperations() {return props.getAllowedDropOperations;},
    startDrag(key, event) {
      let keys = getKeys(key);
      draggingKeys = keys;
      draggedKey = key;
      props.selectionManager.setFocused(false);
      setDragRevision(previous => previous + 1);
      if (typeof props.onDragStart === 'function') {
        props.onDragStart({
          ...event,
          keys
        });
      }
    },
    moveDrag(event) {
      if (typeof props.onDragMove === 'function') {
        props.onDragMove({
          ...event,
          keys: draggingKeys
        });
      }
    },
    endDrag(event) {
      let {isInternal} = event;

      if (typeof props.onDragEnd === 'function') {
        props.onDragEnd({
          ...event,
          keys: draggingKeys,
          isInternal
        });
      }

      draggingKeys = new Set();
      draggedKey = null;
      setDragRevision(previous => previous + 1);
    }
  };
}
