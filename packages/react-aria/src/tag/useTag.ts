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
import {DOMAttributes, FocusableElement, Node, RefObject} from '@react-types/shared';
import {filterDOMProps} from '../utils/filterDOMProps';
import {hookData} from './useTagGroup';
import intlMessages from '../../intl/tag/*.json';
import type {ListState} from 'react-stately/useListState';
import {mergeProps} from '../utils/mergeProps';
import {SelectableItemStates} from '../selection/useSelectableItem';
import {useDescription} from '../utils/useDescription';
import {useFocusable} from '../interactions/useFocusable';
import {useGridListItem} from '../gridlist/useGridListItem';
import {useId} from '../utils/useId';
import {useInteractionModality} from '../interactions/useFocusVisible';
import {useKeyboard} from '../interactions/useKeyboard';
import {useLocalizedStringFormatter} from '../i18n/useLocalizedStringFormatter';
import {useSyntheticLinkProps} from '../utils/openLink';
import {merge, omit, type Accessor} from 'solid-js';

export interface TagAria extends SelectableItemStates {
  /** Props for the tag row element. */
  rowProps: DOMAttributes;
  /** Props for the tag cell element. */
  gridCellProps: DOMAttributes;
  /** Props for the tag remove button. */
  removeButtonProps: AriaButtonProps;
  /** Whether the tag can be removed. */
  allowsRemoving: Accessor<boolean>;
}

export interface AriaTagProps<T> extends Pick<DOMAttributes, 'aria-label' | 'aria-errormessage'> {
  /** An object representing the tag. Contains all the relevant information that makes up the tag. */
  item: Node<T>;
}

/**
 * Provides the behavior and accessibility implementation for a tag component.
 *
 * @param props - Props to be applied to the tag.
 * @param state - State for the tag group, as returned by `useListState`.
 * @param ref - A ref to a DOM element for the tag.
 */
export function useTag<T>(
  props: AriaTagProps<T>,
  state: ListState<T>,
  ref: RefObject<FocusableElement | null>
): TagAria {
  let item = () => props.item;
  let stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-aria/tag');
  let buttonId = useId();

  let onRemove = () => hookData.get(state)?.onRemove;
  let gridItem = useGridListItem(
    {
      get node() { return item(); }
    },
    state,
    ref
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let stateWithoutDescription = omit(gridItem, 'rowProps', 'gridCellProps', 'descriptionProps');
  let {rowProps, gridCellProps} = gridItem;

  let isDisabled = () => state.disabledKeys.has(item().key) || item().props.isDisabled;
  let {keyboardProps} = useKeyboard({
    get isDisabled() { return isDisabled(); },
    shortcuts: {
      Delete: () => {
        if (state.selectionManager.isSelected(item().key)) {
          onRemove()?.(new Set(state.selectionManager.selectedKeys));
        } else {
          onRemove()?.(new Set([item().key]));
        }
      },
      Backspace: () => {
        if (state.selectionManager.isSelected(item().key)) {
          onRemove()?.(new Set(state.selectionManager.selectedKeys));
        } else {
          onRemove()?.(new Set([item().key]));
        }
      }
    },
    allowRepeats: true
  });

  let interactionModality = useInteractionModality();
  let modality = () => {
    let value = interactionModality();
    return value === 'virtual' && typeof window !== 'undefined' && 'ontouchstart' in window ? 'pointer' : value;
  };
  let description = () =>
    onRemove() && (modality() === 'keyboard' || modality() === 'virtual')
      ? stringFormatter.format('removeDescription')
      : '';
  let descProps = useDescription(description);

  let tabIndex = () => !isDisabled() &&
    (item().key === state.selectionManager.focusedKey || state.selectionManager.focusedKey == null) ? 0 : -1;

  let itemProps = merge(() => item().props);
  let domProps = filterDOMProps(itemProps);
  let linkProps = useSyntheticLinkProps(itemProps);
  let {focusableProps} = useFocusable(
    merge(itemProps, {get isDisabled() { return isDisabled(); }}),
    ref
  );

  return merge(stateWithoutDescription, {
    removeButtonProps: {
      get 'aria-label'() { return stringFormatter.format('removeButtonLabel'); },
      get 'aria-labelledby'() { return `${buttonId()} ${rowProps.id}`; },
      get isDisabled() { return isDisabled(); },
      get id() { return buttonId(); },
      onPress: () => (onRemove() ? onRemove()!(new Set([item().key])) : null)
    },
    rowProps: mergeProps(focusableProps, rowProps, domProps, linkProps, {
      get tabIndex() { return tabIndex(); },
      get onKeyDown() { return onRemove() ? keyboardProps.onKeyDown : undefined; },
      get onKeyUp() { return onRemove() ? keyboardProps.onKeyUp : undefined; },
      get 'aria-describedby'() { return descProps['aria-describedby']; }
    }),
    gridCellProps: mergeProps(gridCellProps, {
      get 'aria-errormessage'() { return props['aria-errormessage']; },
      get 'aria-label'() { return props['aria-label']; }
    }),
    allowsRemoving: () => !!onRemove()
  });
}
