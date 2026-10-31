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
  FocusableElement,
  Key,
  RefObject
} from '@react-types/shared';
import {filterDOMProps} from '../utils/filterDOMProps';
import {generateId} from './utils';
import {mergeProps} from '../utils/mergeProps';
import {TabListState} from 'react-stately/useTabListState';
import {useFocusable} from '../interactions/useFocusable';
import {useLinkProps} from '../utils/openLink';
import {useSelectableItem} from '../selection/useSelectableItem';
import {Accessor, merge, omit} from 'solid-js';

export interface AriaTabProps extends AriaLabelingProps {
  /** The key of the tab. */
  key: Key;
  /** Whether the tab should be disabled. */
  isDisabled?: boolean;
  /** Whether the tab selection should occur on press up instead of press down. */
  shouldSelectOnPressUp?: boolean;
}

export interface TabAria {
  /** Props for the tab element. */
  tabProps: DOMAttributes;
  /** Whether the tab is currently selected. */
  isSelected: Accessor<boolean>;
  /** Whether the tab is disabled. */
  isDisabled: Accessor<boolean>;
  /** Whether the tab is currently in a pressed state. */
  isPressed: Accessor<boolean>;
}

/**
 * Provides the behavior and accessibility implementation for a tab.
 * When selected, the associated tab panel is shown.
 */
export function useTab<T>(
  props: AriaTabProps,
  state: TabListState<T>,
  ref: RefObject<FocusableElement | null>
): TabAria {
  let isSelected = () => props.key === state.selectedKey;
  let isDisabled = () => Boolean(props.isDisabled || state.isDisabled || state.selectionManager.isDisabled(props.key));
  let item = () => state.collection.getItem(props.key);
  // Collection nodes may be replaced while this tab host remains mounted.
  // Forward the complete source item prop bag without taking a setup snapshot.
  let itemProperties = merge(() => item()?.props ?? {});
  let {itemProps, isPressed} = useSelectableItem({
    get selectionManager() { return state.selectionManager; },
    get key() { return props.key; },
    ref,
    get isDisabled() { return isDisabled(); },
    // Link tabs should behave like native anchors (navigate on press up)
    // This avoids reopening beforeunload dialogs when browsers replay
    // queued pointer enter/leave events after cancellation.
    get shouldSelectOnPressUp() { return props.shouldSelectOnPressUp ?? item()?.props.href != null; },
    linkBehavior: 'selection'
  });

  let domProps = omit(filterDOMProps(itemProperties, {labelable: true}), 'id');
  let linkProps = useLinkProps(itemProperties);
  let {focusableProps} = useFocusable(
    merge(itemProperties, {get isDisabled() { return isDisabled(); }}),
    ref
  );

  return {
    tabProps: mergeProps(domProps, focusableProps, linkProps, itemProps, {
      get id() { return generateId(state, props.key, 'tab'); },
      get 'aria-selected'() { return isSelected() ? 'true' : 'false'; },
      get 'aria-disabled'() { return isDisabled() ? 'true' : undefined; },
      get 'aria-controls'() { return isSelected() ? generateId(state, props.key, 'tabpanel') : undefined; },
      get tabIndex() { return isDisabled() ? undefined : itemProps.tabIndex; },
      role: 'tab'
    }),
    isSelected,
    isDisabled,
    isPressed
  };
}
