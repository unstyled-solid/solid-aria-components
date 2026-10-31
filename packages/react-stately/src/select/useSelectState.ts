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
  CollectionBase,
  CollectionStateBase,
  FocusableProps,
  FocusStrategy,
  HelpTextProps,
  InputBase,
  Key,
  LabelableProps,
  Node,
  Selection,
  TextInputBase,
  Validation,
  ValueBase
} from '@react-types/shared';
import {FormValidationState, useFormValidationState} from '../form/useFormValidationState';
import {ListState, useListState} from '../list/useListState';
import {OverlayTriggerState, useOverlayTriggerState} from '../overlays/useOverlayTriggerState';
import {useControlledState} from '../utils/useControlledState';
import {createMemo, createSignal, merge, omit, untrack} from 'solid-js';

export type SelectionMode = 'single' | 'multiple';
export type ValueType<M extends SelectionMode> = M extends 'single' ? Key | null : readonly Key[];
export type ChangeValueType<M extends SelectionMode> = M extends 'single' ? Key | null : Key[];
type ValidationType<M extends SelectionMode> = M extends 'single' ? Key : Key[];

export interface SelectProps<T, M extends SelectionMode = 'single'>
  extends
    CollectionBase<T>,
    Omit<InputBase, 'isReadOnly'>,
    ValueBase<ValueType<M>, ChangeValueType<M>>,
    Validation<ValidationType<M>>,
    HelpTextProps,
    LabelableProps,
    TextInputBase,
    FocusableProps {
  /**
   * Whether single or multiple selection is enabled.
   *
   * @default 'single'
   */
  selectionMode?: M;
  /**
   * The currently selected key in the collection (controlled).
   *
   * @deprecated
   */
  selectedKey?: Key | null;
  /**
   * The initial selected key in the collection (uncontrolled).
   *
   * @deprecated
   */
  defaultSelectedKey?: Key | null;
  /**
   * Handler that is called when the selection changes.
   *
   * @deprecated
   */
  onSelectionChange?: (key: Key | null) => void;
  /** Sets the open state of the menu. */
  isOpen?: boolean;
  /** Sets the default open state of the menu. */
  defaultOpen?: boolean;
  /** Method that is called when the open state of the menu changes. */
  onOpenChange?: (isOpen: boolean) => void;
  /**
   * Whether the Select should close when an item is selected. Defaults to true if selectionMode is
   * single, false otherwise.
   */
  shouldCloseOnSelect?: boolean;
  /** Whether the select should be allowed to be open when the collection is empty. */
  allowsEmptyCollection?: boolean;
}

export interface SelectStateOptions<T, M extends SelectionMode = 'single'>
  extends Omit<SelectProps<T, M>, 'children'>, CollectionStateBase<T> {}

export interface SelectState<T, M extends SelectionMode = 'single'>
  extends ListState<T>, OverlayTriggerState, FormValidationState {
  /**
   * The key for the first selected item.
   *
   * @deprecated
   */
  readonly selectedKey: Key | null;

  /**
   * The default selected key.
   *
   * @deprecated
   */
  readonly defaultSelectedKey: Key | null;

  /**
   * Sets the selected key.
   *
   * @deprecated
   */
  setSelectedKey(key: Key | null): void;

  /** The current select value. */
  readonly value: ValueType<M>;

  /** The default select value. */
  readonly defaultValue: ValueType<M>;

  /** Sets the select value. */
  setValue(value: Key | readonly Key[] | null): void;

  /**
   * The value of the first selected item.
   *
   * @deprecated
   */
  readonly selectedItem: Node<T> | null;

  /** The value of the selected items. */
  readonly selectedItems: Node<T>[];

  /** Whether the select is currently focused. */
  readonly isFocused: boolean;

  /** Sets whether the select is focused. */
  setFocused(isFocused: boolean): void;

  /** Controls which item will be auto focused when the menu opens. */
  readonly focusStrategy: FocusStrategy | null;

  /** Opens the menu. */
  open(focusStrategy?: FocusStrategy | null): void;

  /** Toggles the menu. */
  toggle(focusStrategy?: FocusStrategy | null): void;
}

/**
 * Provides state management for a select component. Handles building a collection
 * of items from props, handles the open state for the popup menu, and manages
 * multiple selection state.
 */
export function useSelectState<T, M extends SelectionMode = 'single'>(
  props: SelectStateOptions<T, M>
): SelectState<T, M> {
  let selectionMode = () => props.selectionMode ?? 'single';
  let shouldCloseOnSelect = () => props.shouldCloseOnSelect ?? selectionMode() === 'single';
  let triggerState = useOverlayTriggerState(props);
  let [focusStrategy, setFocusStrategy] = createSignal<FocusStrategy | null>(null);
  let defaultValue = createMemo(() => {
    return props.defaultValue !== undefined
      ? props.defaultValue
      : ((selectionMode() === 'single' ? (props.defaultSelectedKey ?? null) : []) as ValueType<M>);
  });
  let value = createMemo(() => {
    return props.value !== undefined
      ? props.value
      : ((selectionMode() === 'single' ? props.selectedKey : undefined) as ValueType<M>);
  });
  let [controlledValue, setControlledValue] = useControlledState<Key | readonly Key[] | null>(
    value,
    untrack(defaultValue),
    value => props.onChange?.(value as ChangeValueType<M>)
  );
  // Only display the first selected item if in single selection mode but the value is an array.
  let displayValue = createMemo(() => {
    let current = controlledValue();
    return selectionMode() === 'single' && Array.isArray(current) ? current[0] : current;
  });
  let setValue = (value: Key | readonly Key[] | null) => {
    if (selectionMode() === 'single') {
      let key = Array.isArray(value) ? (value[0] ?? null) : value as Key | null;
      setControlledValue(key);
      if (key !== displayValue()) {
        props.onSelectionChange?.(key);
      }
    } else {
      let keys: readonly Key[] = [];
      if (Array.isArray(value)) {
        keys = value;
      } else if (value != null) {
        keys = [value as Key];
      }

      setControlledValue(keys);
    }
  };

  // oxlint-disable-next-line react/react-compiler
  let selectedKeys = createMemo(() => convertValue(displayValue()));
  let listState = useListState(merge(omit(props, 'onSelectionChange'), {
    get selectionMode() {return selectionMode();},
    get disallowEmptySelection() {return selectionMode() === 'single';},
    allowDuplicateSelectionEvents: true,
    get selectedKeys() {return selectedKeys();},
    onSelectionChange: (keys: Selection) => {
      // impossible, but TS doesn't know that
      if (keys === 'all') {
        return;
      }

      if (selectionMode() === 'single') {
        let key = keys.values().next().value ?? null;
        setValue(key);
      } else {
        setValue([...keys]);
      }
      if (shouldCloseOnSelect()) {
        triggerState.close();
      }

      validationState.commitValidation();
    }
  }));

  let selectedItems = createMemo(() => {
    return [...listState.selectionManager.selectedKeys]
      .map(key => listState.collection.getItem(key))
      .filter(item => item != null);
  });

  let validationState = useFormValidationState<ValidationType<M>>(merge(omit(props, 'value'), {
    get value() {
      let value = displayValue();
      // Source sends null for an empty multiple selection, despite the public
      // validation callback type excluding null.
      return (Array.isArray(value) && value.length === 0 ? null : value) as ValidationType<M>;
    }
  }));

  let [isFocused, setFocused] = createSignal(false);
  let initialValue = untrack(displayValue);

  return {
    get realtimeValidation() {return validationState.realtimeValidation;},
    get displayValidation() {return validationState.displayValidation;},
    updateValidation: validationState.updateValidation,
    resetValidation: validationState.resetValidation,
    commitValidation: validationState.commitValidation,
    get collection() {return listState.collection;},
    get disabledKeys() {return listState.disabledKeys;},
    selectionManager: listState.selectionManager,
    get isOpen() {return triggerState.isOpen;},
    setOpen: triggerState.setOpen,
    close: triggerState.close,
    get point() {return triggerState.point;},
    setPoint: triggerState.setPoint,
    get value() {return displayValue() as ValueType<M>;},
    get defaultValue() {return defaultValue() ?? (initialValue as ValueType<M>);},
    setValue,
    get selectedKey() {return listState.selectionManager.firstSelectedKey;},
    setSelectedKey: setValue,
    get selectedItem() {return selectedItems()[0] ?? null;},
    get selectedItems() {return selectedItems();},
    get defaultSelectedKey() {
      return props.defaultSelectedKey ?? (props.selectionMode === 'single' ? (initialValue as Key) : null);
    },
    get focusStrategy() {return focusStrategy();},
    open(focusStrategy: FocusStrategy | null = null) {
      // Don't open if the collection is empty.
      if (listState.collection.size !== 0 || props.allowsEmptyCollection) {
        setFocusStrategy(focusStrategy);
        triggerState.open();
      }
    },
    toggle(focusStrategy: FocusStrategy | null = null) {
      if (listState.collection.size !== 0 || props.allowsEmptyCollection) {
        setFocusStrategy(focusStrategy);
        triggerState.toggle();
      }
    },
    get isFocused() {return isFocused();},
    setFocused
  };
}

function convertValue(value: Key | readonly Key[] | null | undefined): readonly Key[] | undefined {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return [];
  }
  return Array.isArray(value) ? value : [value as Key];
}
