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

import {AriaButtonProps} from '../button/useButton';
import {
  clearGlobalDnDState,
  isInternalDropOperation,
  setDraggingKeys,
  useDragModality
} from './utils';
import {DraggableCollectionState} from 'react-stately/useDraggableCollectionState';
import {JSX} from '@solidjs/web';
import {merge} from 'solid-js';
import intlMessages from '../../intl/dnd/*.json';
import {Key} from '@react-types/shared';
import {useDescription} from '../utils/useDescription';
import {useDrag} from './useDrag';
import {useLocalizedStringFormatter} from '../i18n/useLocalizedStringFormatter';

export interface DraggableItemProps {
  /** The key of the draggable item within the collection. */
  key: Key;
  /**
   * Whether the item has an explicit focusable drag affordance to initiate accessible drag and drop
   * mode. If true, the dragProps will omit these event handlers, and they will be applied to
   * dragButtonProps instead.
   */
  hasDragButton?: boolean;
  /**
   * Whether the item has a primary action (e.g. Enter key or long press) that would conflict with
   * initiating accessible drag and drop. If true, the Alt key must be held to start dragging with a
   * keyboard, and long press is disabled until selection mode is entered. This should be passed
   * from the associated collection item hook (e.g. useOption, useGridListItem, etc.).
   */
  hasAction?: boolean;
}

export interface DraggableItemResult {
  /** Props for the draggable item. */
  dragProps: JSX.HTMLAttributes<HTMLElement>;
  /** Props for the explicit drag button affordance, if any. */
  dragButtonProps: AriaButtonProps;
}

const MESSAGES = {
  keyboard: {
    selected: 'dragSelectedKeyboard',
    notSelected: 'dragDescriptionKeyboard'
  },
  touch: {
    selected: 'dragSelectedLongPress',
    notSelected: 'dragDescriptionLongPress'
  },
  virtual: {
    selected: 'dragDescriptionVirtual',
    notSelected: 'dragDescriptionVirtual'
  }
};

/**
 * Handles drag interactions for an item within a draggable collection.
 */
export function useDraggableItem(
  props: DraggableItemProps,
  state: DraggableCollectionState
): DraggableItemResult {
  let stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-aria/dnd');
  let isDisabled = () => state.isDisabled || state.selectionManager.isDisabled(props.key);
  let drag = useDrag({
    getItems() {
      return state.getItems(props.key);
    },
    get preview() { return state.preview; },
    get getAllowedDropOperations() { return state.getAllowedDropOperations; },
    get hasDragButton() { return props.hasDragButton; },
    shouldStartKeyboardDrag(e) {
      return !(!props.hasDragButton && props.hasAction) || e.altKey;
    },
    onDragStart(e) {
      state.startDrag(props.key, e);
      // Track draggingKeys for useDroppableCollection's default onDrop handler and useDroppableCollectionState's default getDropOperation
      setDraggingKeys(state.draggingKeys);
    },
    onDragMove(e) {
      state.moveDrag(e);
    },
    onDragEnd(e) {
      let {dropOperation} = e;
      let isInternal = dropOperation === 'cancel' ? false : isInternalDropOperation();
      state.endDrag({...e, keys: state.draggingKeys, isInternal});
      clearGlobalDnDState();
    }
  });
  let dragProps = drag.dragProps;
  let dragButtonProps = drag.dragButtonProps;

  let item = () => state.collection.getItem(props.key);
  let numKeysForDrag = () => state.getKeysForDrag(props.key).size;
  let isSelected = () => numKeysForDrag() > 1 && state.selectionManager.isSelected(props.key);

  // Override description to include selected item count.
  let modality = useDragModality();
  let useCollectionDescription = () => !props.hasDragButton && state.selectionManager.selectionMode !== 'none';
  let description = () => {
    if (!useCollectionDescription()) { return undefined; }
    let msg = MESSAGES[modality() as keyof typeof MESSAGES][isSelected() ? 'selected' : 'notSelected'];
    if (props.hasAction && modality() === 'keyboard') {
      msg += 'Alt';
    }

    return isSelected()
      ? stringFormatter.format(msg, {count: numKeysForDrag()})
      : stringFormatter.format(msg);
  };
  let dragButtonLabel = () => {
    if (useCollectionDescription()) { return undefined; }
    if (isSelected()) {
      return stringFormatter.format('dragSelectedItems', {count: numKeysForDrag()});
    } else {
      let itemText = state.collection.getTextValue?.(props.key) ?? item()?.textValue ?? '';
      return stringFormatter.format('dragItem', {itemText});
    }
  };

  let descriptionProps = useDescription(description);
  let hasConflictingAction = () => !props.hasDragButton && props.hasAction;
  let itemDragProps = merge(dragProps, {
    // Long pressing is required on touch devices; NVDA/JAWS are in forms mode in collections.
    get onClick() { return useCollectionDescription() ? undefined : dragProps.onClick; },
    get 'aria-describedby'() {
      if (hasConflictingAction() && modality() === 'touch') { return undefined; }
      return description() ? descriptionProps['aria-describedby'] : dragProps['aria-describedby'];
    }
  });

  return {
    dragProps: merge(() => isDisabled() ? {} : itemDragProps),
    dragButtonProps: merge(dragButtonProps, {
      get isDisabled() { return isDisabled(); },
      get 'aria-label'() { return dragButtonLabel(); }
    })
  };
}
