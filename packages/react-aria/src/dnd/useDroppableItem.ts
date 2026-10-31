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

import * as DragManager from './DragManager';
import {DroppableCollectionState} from 'react-stately/useDroppableCollectionState';
import {DOMAttributes, DropTarget, FocusableElement, RefObject} from '@react-types/shared';
import {
  getDroppableCollectionRef,
  getTypes,
  globalDndState,
  isInternalDropOperation
} from './utils';
import {Accessor, createEffect, merge} from 'solid-js';
import {useVirtualDrop} from './useVirtualDrop';

export interface DroppableItemOptions {
  /** The drop target represented by the item. */
  target: DropTarget;
  /** The ref to the activate button. */
  activateButtonRef?: RefObject<FocusableElement | null>;
}

export interface DroppableItemResult {
  /** Props for the droppable element. */
  dropProps: DOMAttributes;
  /** Whether the item is currently the active drop target. */
  isDropTarget: Accessor<boolean>;
}

/**
 * Handles drop interactions for an item within a collection component.
 */
export function useDroppableItem(
  options: DroppableItemOptions,
  state: DroppableCollectionState,
  ref: RefObject<HTMLElement | null>
): DroppableItemResult {
  let {dropProps} = useVirtualDrop();
  let droppableCollectionRef = () => getDroppableCollectionRef(state);
  createEffect(() => ({
    element: ref.current,
    target: options.target,
    activateButtonRef: options.activateButtonRef,
    activateButton: options.activateButtonRef?.current,
    collectionRef: droppableCollectionRef()
  }), ({element, target, activateButtonRef, activateButton, collectionRef}) => {
    if (element) {
      return DragManager.registerDropItem({
        element,
        target,
        getDropOperation(types, allowedOperations) {
          let {draggingKeys} = globalDndState;
          let isInternal = isInternalDropOperation(collectionRef);
          return state.getDropOperation({
            target: options.target,
            types,
            allowedOperations,
            isInternal,
            draggingKeys
          });
        },
        // Registration follows actual button replacement in the compute half.
        // The manager consumes this DOM snapshot in its imperative visibility
        // transaction rather than reading an owner-bound reactive ref there.
        activateButtonRef: activateButtonRef ? {current: activateButton ?? null} : undefined
      });
    }
  });

  let dragSession = DragManager.useDragSession();
  let isValidDropTarget = () => {
    let session = dragSession();
    let {draggingKeys} = globalDndState;
    let isInternal = isInternalDropOperation(droppableCollectionRef());
    return session &&
    state.getDropOperation({
      target: options.target,
      types: getTypes(session.dragTarget.items),
      allowedOperations: session.dragTarget.allowedDropOperations,
      isInternal,
      draggingKeys
    }) !== 'cancel';
  };

  let isDropTarget = () => state.isDropTarget(options.target);
  createEffect(() => ({session: dragSession(), active: isDropTarget(), element: ref.current}), ({session, active, element}) => {
    if (session && active && element) {
      element.focus();
    }
  });

  return {
    dropProps: merge(dropProps, {
      get 'aria-hidden'() { return !dragSession() || isValidDropTarget() ? undefined : 'true'; }
    }),
    isDropTarget
  };
}
