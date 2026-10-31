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
  DraggableCollectionOptions,
  DraggableItemProps,
  DraggableItemResult,
  DragPreview,
  useDraggableCollection,
  useDraggableItem
} from 'react-aria/useDraggableCollection';
import {
  DraggableCollectionProps,
  DragItem,
  DroppableCollectionProps,
  Key,
  RefObject
} from '@react-types/shared';
import {
  DraggableCollectionState,
  DraggableCollectionStateOptions,
  useDraggableCollectionState
} from 'react-stately/useDraggableCollectionState';
import {
  DropIndicatorAria,
  DropIndicatorProps,
  DroppableCollectionOptions,
  DroppableCollectionResult,
  DroppableItemOptions,
  DroppableItemResult,
  useDropIndicator,
  useDroppableCollection,
  useDroppableItem
} from 'react-aria/useDroppableCollection';
import {
  DroppableCollectionState,
  DroppableCollectionStateOptions,
  useDroppableCollectionState
} from 'react-stately/useDroppableCollectionState';
import {isVirtualDragging} from 'react-aria/private/dnd/DragManager';
import type {JSX} from '@solidjs/web';
import {merge} from 'solid-js';

interface DraggableCollectionStateOpts<T> extends Omit<
  DraggableCollectionStateOptions<T>,
  'getItems'
> {}

interface DragHooks<T = object> {
  useDraggableCollectionState?: (
    props: DraggableCollectionStateOpts<T>
  ) => DraggableCollectionState;
  useDraggableCollection?: (
    props: DraggableCollectionOptions,
    state: DraggableCollectionState,
    ref: RefObject<HTMLElement | null>
  ) => void;
  useDraggableItem?: (
    props: DraggableItemProps,
    state: DraggableCollectionState
  ) => DraggableItemResult;
  DragPreview?: typeof DragPreview;
}

interface DropHooks {
  useDroppableCollectionState?: (
    props: DroppableCollectionStateOptions
  ) => DroppableCollectionState;
  useDroppableCollection?: (
    props: DroppableCollectionOptions,
    state: DroppableCollectionState,
    ref: RefObject<HTMLElement | null>
  ) => DroppableCollectionResult;
  useDroppableItem?: (
    options: DroppableItemOptions,
    state: DroppableCollectionState,
    ref: RefObject<HTMLElement | null>
  ) => DroppableItemResult;
  useDropIndicator?: (
    props: DropIndicatorProps,
    state: DroppableCollectionState,
    ref: RefObject<HTMLElement | null>
  ) => DropIndicatorAria;
}

export interface DragAndDropHooks<T = object> {
  /** Drag and drop hooks for the collection element. */
  dragAndDropHooks: DragHooks<T> &
    DropHooks & {
      isVirtualDragging?: () => boolean;
      renderPreview?: (keys: Set<Key>, draggedKey: Key) => JSX.Element;
    };
}

export interface DragAndDropOptions<T = object>
  extends
    Omit<DraggableCollectionProps, 'preview' | 'getItems'>,
    Omit<DroppableCollectionProps, 'onMove'> {
  /**
   * A function that returns the items being dragged. If not specified, we assume that the
   * collection is not draggable.
   *
   * @default () => []
   */
  getItems?: (keys: Set<Key>, items: T[]) => DragItem[];
  /**
   * Provide a custom drag preview. `draggedKey` represents the key of the item the user actually
   * dragged.
   */
  renderPreview?: (keys: Set<Key>, draggedKey: Key) => JSX.Element;
}

/**
 * Provides the hooks required to enable drag and drop behavior for a drag and drop compatible React
 * Spectrum component.
 */
export function useDragAndDrop<T = object>(options: DragAndDropOptions<T>): DragAndDropHooks<T> {
    let isDraggable = () => !!options.getItems;
    let isDroppable = () => !!(options.onDrop || options.onInsert || options.onItemDrop || options.onReorder || options.onRootDrop);

    let useDraggableCollectionStateOverride = function (
        props: DraggableCollectionStateOpts<T>
      ) {
        // oxlint-disable-next-line react/react-compiler
        return useDraggableCollectionState(merge(props, options, {get getItems() { return options.getItems!; }}));
      };
    let useDroppableCollectionStateOverride = function (
        props: DroppableCollectionStateOptions
      ) {
        // oxlint-disable-next-line react/react-compiler
        return useDroppableCollectionState(merge(props, options));
      };
    let useDroppableCollectionOverride = function (
        props: DroppableCollectionOptions,
        state: DroppableCollectionState,
        ref: RefObject<HTMLElement | null>
      ) {
        // oxlint-disable-next-line react/react-compiler
        return useDroppableCollection(merge(props, options), state, ref);
      };
    // Stable live capability view: options and callbacks remain current without
    // replacing the source hooks or creating another drag-and-drop manager.
    let dragAndDropHooks: DragAndDropHooks<T>['dragAndDropHooks'] = {
      get useDraggableCollectionState() { return isDraggable() ? useDraggableCollectionStateOverride : undefined; },
      get useDraggableCollection() { return isDraggable() ? useDraggableCollection : undefined; },
      get useDraggableItem() { return isDraggable() ? useDraggableItem : undefined; },
      get DragPreview() { return isDraggable() ? DragPreview : undefined; },
      get renderPreview() { return isDraggable() ? options.renderPreview : undefined; },
      get useDroppableCollectionState() { return isDroppable() ? useDroppableCollectionStateOverride : undefined; },
      get useDroppableCollection() { return isDroppable() ? useDroppableCollectionOverride : undefined; },
      get useDroppableItem() { return isDroppable() ? useDroppableItem : undefined; },
      get useDropIndicator() { return isDroppable() ? useDropIndicator : undefined; },
      get isVirtualDragging() { return isDraggable() || isDroppable() ? isVirtualDragging : undefined; }
    };

  return {
    dragAndDropHooks: dragAndDropHooks
  };
}
