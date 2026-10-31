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
  DropIndicatorProps as AriaDropIndicatorProps,
  DropIndicatorAria,
  DroppableCollectionOptions,
  DroppableCollectionResult,
  DroppableItemOptions,
  DroppableItemResult,
  useDropIndicator,
  useDroppableCollection,
  useDroppableItem
} from 'react-aria/useDroppableCollection';
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
  DroppableCollectionProps,
  Key,
  RefObject
} from '@react-types/shared';
import {
  DraggableCollectionState,
  DraggableCollectionStateOptions,
  useDraggableCollectionState
} from 'react-stately/useDraggableCollectionState';
import {DragItem, DropTarget, DropTargetDelegate} from '@react-types/shared';
import {
  DroppableCollectionState,
  DroppableCollectionStateOptions,
  useDroppableCollectionState
} from 'react-stately/useDroppableCollectionState';
import {isVirtualDragging} from 'react-aria/private/dnd/DragManager';
import type {JSX} from '@solidjs/web';
import {merge} from 'solid-js';
import {ListDropTargetDelegate} from 'react-aria/ListDropTargetDelegate';

export {DropIndicator, DropIndicatorContext, DragAndDropContext} from './DragAndDrop';
export type {DropIndicatorProps, DropIndicatorRenderProps} from './DragAndDrop';

interface DraggableCollectionStateOpts<T = object> extends Omit<
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
  renderDragPreview?: (
    items: DragItem[]
  ) => JSX.Element | {element: JSX.Element; x: number; y: number};
  isVirtualDragging?: () => boolean;
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
    props: AriaDropIndicatorProps,
    state: DroppableCollectionState,
    ref: RefObject<HTMLElement | null>
  ) => DropIndicatorAria;
  renderDropIndicator?: (target: DropTarget) => JSX.Element;
  dropTargetDelegate?: DropTargetDelegate;
  ListDropTargetDelegate: typeof ListDropTargetDelegate;
}

export type DragAndDropHooks<T = object> = DragHooks<T> & DropHooks;

export interface DragAndDrop<T = object> {
  /** Drag and drop hooks for the collection element. */
  dragAndDropHooks: DragAndDropHooks<T>;
}

export interface DragAndDropOptions<T = object>
  extends Omit<DraggableCollectionProps, 'preview' | 'getItems'>, DroppableCollectionProps {
  /**
   * A function that returns the items being dragged. If not specified, we assume that the
   * collection is not draggable.
   *
   * @default () => []
   */
  getItems?: (keys: Set<Key>, items: T[]) => DragItem[];
  /**
   * A function that renders a drag preview, which is shown under the user's cursor while dragging.
   * By default, a copy of the dragged element is rendered.
   */
  renderDragPreview?: (
    items: DragItem[]
  ) => JSX.Element | {element: JSX.Element; x: number; y: number};
  /**
   * A function that renders a drop indicator element between two items in a collection.
   * This should render a `<DropIndicator>` element. If this function is not provided, a
   * default DropIndicator is provided.
   */
  renderDropIndicator?: (target: DropTarget) => JSX.Element;
  /**
   * A custom delegate object that provides drop targets for pointer coordinates within the
   * collection.
   */
  dropTargetDelegate?: DropTargetDelegate;
  /** Whether the drag and drop events should be disabled. */
  isDisabled?: boolean;
}

/**
 * Provides the hooks required to enable drag and drop behavior for a drag and drop compatible
 * collection component.
 */
export function useDragAndDrop<T = object>(options: DragAndDropOptions<T>): DragAndDrop<T> {
  let isDraggable = () => !!options.getItems;
  let isDroppable = () => !!(options.onDrop || options.onInsert || options.onItemDrop ||
    options.onReorder || options.onMove || options.onRootDrop);

  // Stable native hook functions keep the source options precedence without
  // snapshotting callbacks, disabled state, or delegates during component setup.
  let draggableState = (props: DraggableCollectionStateOpts<T>) =>
    useDraggableCollectionState(merge(props, options) as DraggableCollectionStateOptions<T>);
  let droppableState = (props: DroppableCollectionStateOptions) =>
    useDroppableCollectionState(merge(props, options));
  let droppableCollection = (
    props: DroppableCollectionOptions,
    state: DroppableCollectionState,
    ref: RefObject<HTMLElement | null>
  ) => useDroppableCollection(merge(props, options), state, ref);

  let dragAndDropHooks = {
    get useDraggableCollectionState() { return isDraggable() ? draggableState : undefined; },
    get useDraggableCollection() { return isDraggable() ? useDraggableCollection : undefined; },
    get useDraggableItem() { return isDraggable() ? useDraggableItem : undefined; },
    get DragPreview() { return isDraggable() ? DragPreview : undefined; },
    get renderDragPreview() { return isDraggable() ? options.renderDragPreview : undefined; },
    get isVirtualDragging() { return isDraggable() ? isVirtualDragging : undefined; },
    get useDroppableCollectionState() { return isDroppable() ? droppableState : undefined; },
    get useDroppableItem() { return isDroppable() ? useDroppableItem : undefined; },
    get useDroppableCollection() { return isDroppable() ? droppableCollection : undefined; },
    get useDropIndicator() { return isDroppable() ? useDropIndicator : undefined; },
    get renderDropIndicator() { return isDroppable() ? options.renderDropIndicator : undefined; },
    get dropTargetDelegate() { return isDroppable() ? options.dropTargetDelegate : undefined; },
    get ListDropTargetDelegate() { return isDroppable() ? ListDropTargetDelegate : undefined; }
  } as DragAndDropHooks<T>;

  return {
    dragAndDropHooks
  };
}
