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

import {chain} from '../utils/chain';

import {DOMAttributes, FocusableElement, Key, RefObject} from '@react-types/shared';
import {filterDOMProps} from '../utils/filterDOMProps';
import {getItemCount} from 'react-stately/private/collections/getItemCount';
import {getItemId, listData} from './utils';
import {isFocusVisible} from '../interactions/useFocusVisible';
import {ListState} from 'react-stately/useListState';
import {mergeProps} from '../utils/mergeProps';
import {SelectableItemStates, useSelectableItem} from '../selection/useSelectableItem';
import {useHover} from '../interactions/useHover';
import {useLinkProps} from '../utils/openLink';
import {useSlotId} from '../utils/useId';
import {Accessor, merge, omit} from 'solid-js';

export interface OptionAria extends SelectableItemStates {
  /** Props for the option element. */
  optionProps: DOMAttributes;

  /** Props for the main text element inside the option. */
  labelProps: DOMAttributes;

  /** Props for the description text element inside the option, if any. */
  descriptionProps: DOMAttributes;

  /** Whether the option is currently focused. */
  isFocused: Accessor<boolean>;

  /** Whether the option is keyboard focused. */
  isFocusVisible: Accessor<boolean>;
}

export interface AriaOptionProps {
  /**
   * Whether the option is disabled.
   *
   * @deprecated
   */
  isDisabled?: boolean;

  /**
   * Whether the option is selected.
   *
   * @deprecated
   */
  isSelected?: boolean;

  /** A screen reader only label for the option. */
  'aria-label'?: string;

  /** The unique key for the option. */
  key: Key;

  /**
   * Whether selection should occur on press up instead of press down.
   *
   * @deprecated
   */
  shouldSelectOnPressUp?: boolean;

  /**
   * Whether the option should be focused when the user hovers over it.
   *
   * @deprecated
   */
  shouldFocusOnHover?: boolean;

  /**
   * Whether the option is contained in a virtual scrolling listbox.
   *
   * @deprecated
   */
  isVirtualized?: boolean;

  /**
   * Whether the option should use virtual focus instead of being focused directly.
   *
   * @deprecated
   */
  shouldUseVirtualFocus?: boolean;
}

/**
 * Provides the behavior and accessibility implementation for an option in a listbox.
 * See `useListBox` for more details about listboxes.
 *
 * @param props - Props for the option.
 * @param state - State for the listbox, as returned by `useListState`.
 */
export function useOption<T>(
  props: AriaOptionProps,
  state: ListState<T>,
  ref: RefObject<FocusableElement | null>
): OptionAria {
  let data = () => listData.get(state);
  let isDisabled = () => props.isDisabled ?? state.selectionManager.isDisabled(props.key);
  let isSelected = () => props.isSelected ?? state.selectionManager.isSelected(props.key);
  let shouldSelectOnPressUp = () => props.shouldSelectOnPressUp ?? data()?.shouldSelectOnPressUp;
  let shouldFocusOnHover = () => props.shouldFocusOnHover ?? data()?.shouldFocusOnHover;
  let shouldUseVirtualFocus = () => props.shouldUseVirtualFocus ?? data()?.shouldUseVirtualFocus;
  let isVirtualized = () => props.isVirtualized ?? data()?.isVirtualized;

  let labelId = useSlotId();
  let descriptionId = useSlotId();

  let optionProps = {
    role: 'option' as const,
    get 'aria-disabled'() { return isDisabled() ? 'true' : undefined; },
    get 'aria-selected'() { return state.selectionManager.selectionMode !== 'none' ? isSelected() ? 'true' : 'false' : undefined; },
    get 'aria-label'() { return props['aria-label']; },
    get 'aria-labelledby'() { return labelId(); },
    get 'aria-describedby'() { return descriptionId(); },
    get 'aria-posinset'() {
      if (!isVirtualized()) { return undefined; }
      let index = Number(item()?.index);
      return Number.isNaN(index) ? undefined : index + 1;
    },
    get 'aria-setsize'() { return isVirtualized() ? getItemCount(state.collection) : undefined; }
  };

  let item = () => state.collection.getItem(props.key);
  let itemProperties = new Proxy({} as Record<string, any>, {
    get: (_, key) => item()?.props?.[key],
    has: (_, key) => key in (item()?.props ?? {}),
    ownKeys: () => Reflect.ownKeys(item()?.props ?? {}),
    getOwnPropertyDescriptor: (_, key) => key in (item()?.props ?? {})
      ? {enumerable: true, configurable: true, get: () => item()?.props?.[key]} : undefined
  });
  let onAction = () => data()?.onAction?.(props.key);
  let selectableOptions = {
    get selectionManager() { return state.selectionManager; },
    get key() { return props.key; },
    ref,
    get shouldSelectOnPressUp() { return shouldSelectOnPressUp(); },
    get allowsDifferentPressOrigin() { return shouldSelectOnPressUp() && shouldFocusOnHover(); },
    get isVirtualized() { return isVirtualized(); },
    get shouldUseVirtualFocus() { return shouldUseVirtualFocus(); },
    get isDisabled() { return isDisabled(); },
    get onAction() { return data()?.onAction || item()?.props?.onAction ? chain(item()?.props?.onAction, data()?.onAction ? onAction : undefined) : undefined; },
    get linkBehavior() { return data()?.linkBehavior; },
    get UNSTABLE_itemBehavior() { return data()?.UNSTABLE_itemBehavior; },
    get id() { return getItemId(state, props.key); }
  };
  let {itemProps, isPressed, isFocused, hasAction, allowsSelection} = useSelectableItem(selectableOptions);

  let {hoverProps} = useHover({
    get isDisabled() { return isDisabled() || !shouldFocusOnHover(); },
    onHoverStart() {
      if (!isFocusVisible()) {
        state.selectionManager.setFocused(true);
        state.selectionManager.setFocusedKey(props.key);
      }
    }
  });

  let domProps = omit(filterDOMProps(itemProperties), 'id');
  let linkProps = useLinkProps(itemProperties);
  let mergedItemProps = mergeProps(domProps, itemProps, hoverProps, linkProps);

  return {
    // Disabled interaction bags may expose undefined ARIA keys. Preserve the
    // live slot linkage unless an interaction supplies an actual replacement.
    optionProps: mergeProps(optionProps, mergedItemProps, {
      get id() { return getItemId(state, props.key); }
    }),
    labelProps: {
      get id() { return labelId(); }
    },
    descriptionProps: {
      get id() { return descriptionId(); }
    },
    isFocused,
    isFocusVisible: () => isFocused() && state.selectionManager.isFocused && isFocusVisible(),
    isSelected,
    isDisabled,
    isPressed,
    allowsSelection,
    hasAction
  };
}
