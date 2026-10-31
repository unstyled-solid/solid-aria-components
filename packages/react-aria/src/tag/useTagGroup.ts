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

import {AriaGridListProps, useGridList} from '../gridlist/useGridList';

import {
  AriaLabelingProps,
  CollectionBase,
  DOMAttributes,
  DOMProps,
  HelpTextProps,
  Key,
  KeyboardDelegate,
  LabelableProps,
  MultipleSelection,
  RefObject,
  SelectionBehavior
} from '@react-types/shared';
import {filterDOMProps} from '../utils/filterDOMProps';
import {ListKeyboardDelegate} from '../selection/ListKeyboardDelegate';
import type {ListState} from 'react-stately/useListState';
import {mergeProps} from '../utils/mergeProps';
import {createEffect, createMemo, createSignal, merge, untrack} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {useField} from '../label/useField';
import {useFocusWithin} from '../interactions/useFocusWithin';
import {useLocale} from '../i18n/I18nProvider';

export interface TagGroupAria {
  /** Props for the tag grouping element. */
  gridProps: DOMAttributes;
  /** Props for the tag group's visible label (if any). */
  labelProps: DOMAttributes;
  /** Props for the tag group description element, if any. */
  descriptionProps: DOMAttributes<HTMLElement>;
  /** Props for the tag group error message element, if any. */
  errorMessageProps: DOMAttributes<HTMLElement>;
}

export interface AriaTagGroupProps<T>
  extends
    CollectionBase<T>,
    MultipleSelection,
    Pick<AriaGridListProps<T>, 'escapeKeyBehavior' | 'onAction'>,
    DOMProps,
    LabelableProps,
    AriaLabelingProps,
    Omit<HelpTextProps, 'errorMessage'> {
  /**
   * How multiple selection should behave in the collection.
   *
   * @default 'toggle'
   */
  selectionBehavior?: SelectionBehavior;
  /** Whether selection should occur on press up instead of press down. */
  shouldSelectOnPressUp?: boolean;
  /** Handler that is called when a user deletes a tag. */
  onRemove?: (keys: Set<Key>) => void;
  /** An error message for the field. */
  errorMessage?: JSX.Element;
  /**
   * Whether pressing the escape key should clear selection in the TagGroup or not.
   *
   * Most experiences should not modify this option as it eliminates a keyboard user's ability to
   * easily clear selection. Only use if the escape key is being handled externally or should not
   * trigger selection clearing contextually.
   *
   * @default 'clearSelection'
   */
  escapeKeyBehavior?: 'clearSelection' | 'none';
}

export interface AriaTagGroupOptions<T> extends Omit<AriaTagGroupProps<T>, 'children'> {
  /**
   * An optional keyboard delegate to handle arrow key navigation,
   * to override the default.
   */
  keyboardDelegate?: KeyboardDelegate;
}

interface HookData {
  onRemove?: (keys: Set<Key>) => void;
}

export const hookData: WeakMap<ListState<any>, HookData> = new WeakMap<ListState<any>, HookData>();

/**
 * Provides the behavior and accessibility implementation for a tag group component. A tag group is
 * a focusable list of labels, categories, keywords, filters, or other items, with support for
 * keyboard navigation, selection, and removal.
 *
 * @param props - Props to be applied to the tag group.
 * @param state - State for the tag group, as returned by `useListState`.
 * @param ref - A ref to a DOM element for the tag group.
 */
export function useTagGroup<T>(
  props: AriaTagGroupOptions<T>,
  state: ListState<T>,
  ref: RefObject<HTMLElement | null>
): TagGroupAria {
  let locale = useLocale();
  let keyboardDelegate = createMemo(() =>
    props.keyboardDelegate ||
    new ListKeyboardDelegate({
      collection: state.collection,
      ref,
      orientation: 'horizontal',
      direction: locale.direction,
      disabledKeys: state.disabledKeys,
      disabledBehavior: state.selectionManager.disabledBehavior
    }));
  let {labelProps, fieldProps, descriptionProps, errorMessageProps} = useField(merge(props, {
    labelElementType: 'span'
  }));
  let {gridProps} = useGridList(
    merge(props, fieldProps, {
      get keyboardDelegate() { return keyboardDelegate(); },
      shouldFocusWrap: true,
      linkBehavior: 'override' as const,
      keyboardNavigationBehavior: 'tab' as const
    }),
    state,
    ref
  );

  let [isFocusWithin, setFocusWithin] = createSignal(false);
  let {focusWithinProps} = useFocusWithin({
    onFocusWithinChange: setFocusWithin
  });
  let domProps = filterDOMProps(props);

  // If the last tag is removed, focus the container.
  let prevCount = untrack(() => state.collection.size);
  createEffect(() => ({count: state.collection.size, focused: isFocusWithin(), element: ref.current}),
    ({count, focused, element}) => {
      if (element && prevCount > 0 && count === 0 && focused) { element.focus(); }
      prevCount = count;
    });

  hookData.set(state, {get onRemove() { return props.onRemove; }});

  return {
    gridProps: mergeProps(gridProps, domProps, {
      get role() { return state.collection.size ? 'grid' : 'group'; },
      'aria-atomic': false,
      'aria-relevant': 'additions',
      get 'aria-live'() { return isFocusWithin() ? 'polite' : 'off'; }
    }, focusWithinProps, fieldProps),
    labelProps,
    descriptionProps,
    errorMessageProps
  };
}
