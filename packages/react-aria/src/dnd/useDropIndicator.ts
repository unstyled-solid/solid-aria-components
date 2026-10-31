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
import {DOMAttributes, DropTarget, FocusableElement, Key, RefObject} from '@react-types/shared';
import {getDroppableCollectionId} from './utils';
import {Accessor, merge} from 'solid-js';
import intlMessages from '../../intl/dnd/*.json';
import {useDroppableItem} from './useDroppableItem';
import {useId} from '../utils/useId';
import {useLocalizedStringFormatter} from '../i18n/useLocalizedStringFormatter';

export interface DropIndicatorProps {
  /** The drop target that the drop indicator represents. */
  target: DropTarget;
  /** The ref to the activate button. */
  activateButtonRef?: RefObject<FocusableElement | null>;
}

export interface DropIndicatorAria {
  /** Props for the drop indicator element. */
  dropIndicatorProps: DOMAttributes;
  /** Whether the drop indicator is currently the active drop target. */
  isDropTarget: Accessor<boolean>;
  /**
   * Whether the drop indicator is hidden, both visually and from assistive technology.
   * Use this to determine whether to omit the element from the DOM entirely.
   */
  isHidden: Accessor<boolean>;
}

/**
 * Handles drop interactions for a target within a droppable collection.
 */
export function useDropIndicator(
  props: DropIndicatorProps,
  state: DroppableCollectionState,
  ref: RefObject<HTMLElement | null>
): DropIndicatorAria {

  let stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-aria/dnd');
  let dragSession = DragManager.useDragSession();
  let {dropProps} = useDroppableItem(props, state, ref);
  let id = useId();
  let getText = (key: Key | null) => {
    let collection = state.collection;
    if (key == null) {
      return '';
    } else {
      return collection.getTextValue?.(key) ?? collection.getItem(key)?.textValue ?? '';
    }
  };

  let labels = () => {
  let target = props.target;
  let collection = state.collection;
  let label = '';
  let labelledBy: string | undefined;
  if (target.type === 'root') {
    label = stringFormatter.format('dropOnRoot');
    labelledBy = `${id()} ${getDroppableCollectionId(state)}`;
  } else if (target.dropPosition === 'on') {
    label = stringFormatter.format('dropOnItem', {
      itemText: getText(target.key)
    });
  } else {
    let before: Key | null | undefined;
    let after: Key | null | undefined;
    if (target.dropPosition === 'before') {
      let prevKey = collection.getItem(target.key)?.prevKey;
      let prevNode = prevKey != null ? collection.getItem(prevKey) : null;
      before = prevNode?.type === 'item' ? prevNode.key : null;
    } else {
      before = target.key;
    }

    if (target.dropPosition === 'after') {
      let nextKey = collection.getItem(target.key)?.nextKey;
      let nextNode = nextKey != null ? collection.getItem(nextKey) : null;
      after = nextNode?.type === 'item' ? nextNode.key : null;
    } else {
      after = target.key;
    }

    if (before != null && after != null) {
      label = stringFormatter.format('insertBetween', {
        beforeItemText: getText(before),
        afterItemText: getText(after)
      });
    } else if (before != null) {
      label = stringFormatter.format('insertAfter', {
        itemText: getText(before)
      });
    } else if (after != null) {
      label = stringFormatter.format('insertBefore', {
        itemText: getText(after)
      });
    }
  }

  return {label, labelledBy};
  };
  let isDropTarget = () => state.isDropTarget(props.target);
  let ariaHidden = () => !dragSession() ? 'true' as const : dropProps['aria-hidden'];
  return {
    dropIndicatorProps: merge(dropProps, {
      get id() { return id(); },
      get 'aria-roledescription'() { return stringFormatter.format('dropIndicator'); },
      get 'aria-label'() { return labels().label; },
      get 'aria-labelledby'() { return labels().labelledBy; },
      get 'aria-hidden'() { return ariaHidden(); },
      tabIndex: -1
    }),
    isDropTarget,
    // If aria-hidden, we are either not in a drag session or the drop target is invalid.
    // In that case, there's no need to render anything at all unless we need to show the indicator visually.
    // This can happen when dragging using the native DnD API as opposed to keyboard dragging.
    isHidden: () => !isDropTarget() && !!ariaHidden()
  };
}
