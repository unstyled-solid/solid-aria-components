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

import {createEffect, createSignal, merge, untrack, type Accessor} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {ColumnSize} from 'react-stately/useTableState';
import {DOMAttributes, FocusableElement, Key, RefObject} from '@react-types/shared';
import {focusSafely} from '../interactions/focusSafely';
import {getActiveElement, getEventTarget} from '../utils/shadowdom/DOMFunctions';
import {getColumnHeaderId} from './utils';
import {GridNode} from 'react-stately/private/grid/GridCollection';
import intlMessages from '../../intl/table/*.json';
import {mergeProps} from '../utils/mergeProps';
import {TableColumnResizeState} from 'react-stately/useTableState';
import {useDescription} from '../utils/useDescription';
import {useId} from '../utils/useId';
import {useInteractionModality} from '../interactions/useFocusVisible';
import {useKeyboard} from '../interactions/useKeyboard';
import {useLocale} from '../i18n/I18nProvider';
import {useLocalizedStringFormatter} from '../i18n/useLocalizedStringFormatter';
import {useMove} from '../interactions/useMove';
import {usePress} from '../interactions/usePress';
import {useVisuallyHidden} from '../visually-hidden/VisuallyHidden';

export interface TableColumnResizeAria {
  /** Props for the visually hidden input element. */
  inputProps: JSX.InputHTMLAttributes<HTMLInputElement>;
  /** Props for the resizer element. */
  resizerProps: DOMAttributes;
  /** Whether this column is currently being resized. */
  isResizing: Accessor<boolean>;
  /**
   * Whether this column is currently being resized via a mouse drag (e.g. to render a cursor
   * overlay).
   */
  isMouseResizing: Accessor<boolean>;
}

export interface AriaTableColumnResizeProps<T> {
  /**
   * An object representing the [column header](https://www.w3.org/TR/wai-aria-1.1/#columnheader).
   * Contains all the relevant information that makes up the column header.
   */
  column: GridNode<T>;
  /** Aria label for the hidden input. Gets read when resizing. */
  'aria-label': string;
  /**
   * Ref to the trigger if resizing was started from a column header menu. If it's provided, focus
   * will be returned there when resizing is done. If it isn't provided, it is assumed that the
   * resizer is visible at all time and keyboard resizing is started via pressing Enter on the
   * resizer and not on focus.
   */
  triggerRef?: RefObject<FocusableElement | null>;
  /** If resizing is disabled. */
  isDisabled?: boolean;
  /** Called when resizing starts. */
  onResizeStart?: (widths: Map<Key, ColumnSize>) => void;
  /** Called for every resize event that results in new column sizes. */
  onResize?: (widths: Map<Key, ColumnSize>) => void;
  /** Called when resizing ends. */
  onResizeEnd?: (widths: Map<Key, ColumnSize>) => void;
}

/**
 * Provides the behavior and accessibility implementation for a table column resizer element.
 *
 * @param props - Props for the resizer.
 * @param state - State for the table's resizable columns, as returned by
 *   `useTableColumnResizeState`.
 * @param ref - The ref attached to the resizer's visually hidden input element.
 */
export function useTableColumnResize<T>(
  props: AriaTableColumnResizeProps<T>,
  state: TableColumnResizeState<T>,
  ref: RefObject<HTMLInputElement | null>
): TableColumnResizeAria {
  let item = () => props.column;
  const stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-aria/table');
  let id = useId();
  let isResizing = () => state.resizingColumn === item().key;
  let isResizingRef = untrack(isResizing);
  let lastSize: Map<Key, ColumnSize> | null = null;
  let wasFocusedOnResizeStart = false;
  let editModeEnabled = () => state.tableState.isKeyboardNavigationDisabled;
  // Whether a mouse drag-resize is active. Set on the first move (not on press) so a cursor
  // overlay only mounts during an actual drag.
  let [isMouseResizing, setMouseResizing] = createSignal(false);

  let locale = useLocale();

  let startResize = (item: GridNode<T>) => {
      if (!isResizingRef) {
        lastSize = state.updateResizedColumns(item.key, state.getColumnWidth(item.key));
        state.startResize(item.key);
        state.tableState.setKeyboardNavigationDisabled(true);
        props.onResizeStart?.(lastSize);
      }
      isResizingRef = true;
    };

  let resize = (item: GridNode<T>, newWidth: number) => {
      let sizes = state.updateResizedColumns(item.key, newWidth);
      props.onResize?.(sizes);
      lastSize = sizes;
    };

  let endResize = (item: GridNode<T>) => {
      if (isResizingRef) {
        if (lastSize == null) {
          lastSize = state.updateResizedColumns(item.key, state.getColumnWidth(item.key));
        }

        state.endResize();
        state.tableState.setKeyboardNavigationDisabled(false);
        props.onResizeEnd?.(lastSize);
        isResizingRef = false;

        if (props.triggerRef?.current && !wasFocusedOnResizeStart) {
          // switch focus back to the column header unless the resizer was already focused when resizing started.
          focusSafely(props.triggerRef.current);
        }
      }
      lastSize = null;
    };

  let endResizeEvent = () => {
    if (editModeEnabled()) {
      endResize(item());
      return;
    }
    return false;
  };

  let {keyboardProps} = useKeyboard({
    shortcuts: {
      Escape: () => {
        return endResizeEvent();
      },
      Enter: () => {
        if (editModeEnabled()) {
          endResize(item());
        } else {
          startResize(item());
        }
      },
      ' ': () => {
        return endResizeEvent();
      },
      Tab: () => {
        return endResizeEvent();
      }
    }
  });

  let columnResizeWidth = 0;
  const {moveProps} = useMove({
    onMoveStart(e) {
      columnResizeWidth = state.getColumnWidth(item().key);
      if (e.pointerType === 'mouse') {
        setMouseResizing(true);
      }
      startResize(item());
    },
    onMove(e) {
      let {deltaX, deltaY, pointerType} = e;
      if (locale.direction === 'rtl') {
        deltaX *= -1;
      }
      if (pointerType === 'keyboard') {
        if (deltaY !== 0 && deltaX === 0) {
          deltaX = deltaY * -1;
        }
        deltaX *= 10;
      }
      // if moving up/down only, no need to resize
      if (deltaX !== 0) {
        columnResizeWidth += deltaX;
        resize(item(), columnResizeWidth);
      }
    },
    onMoveEnd(e) {
      let {pointerType} = e;
      columnResizeWidth = 0;
      setMouseResizing(false);
      if (pointerType === 'mouse' || (pointerType === 'touch' && wasFocusedOnResizeStart)) {
        endResize(item());
      }
    }
  });

  let onKeyDown: NonNullable<DOMAttributes['onKeyDown']> = e => {
      if (editModeEnabled()) {
        (moveProps.onKeyDown as ((event: typeof e) => void) | undefined)?.(e);
      }
    };

  let min = () => Math.floor(state.getColumnMinWidth(item().key));
  let max = () => {
    let value = Math.floor(state.getColumnMaxWidth(item().key));
    return value === Infinity ? Number.MAX_SAFE_INTEGER : value;
  };
  let value = () => Math.floor(state.getColumnWidth(item().key));
  let interactionModality = useInteractionModality();
  let modality = () => interactionModality() === 'virtual' && typeof window !== 'undefined' && 'ontouchstart' in window ? 'touch' : interactionModality();
  let description = () =>
    // oxlint-disable-next-line react/react-compiler
    props.triggerRef?.current == null &&
    (modality() === 'keyboard' || modality() === 'virtual') &&
    !isResizing()
      ? stringFormatter.format('resizerDescription')
      : undefined;
  let descriptionProps = useDescription(description);
  let ariaProps = merge({
    get 'aria-label'() { return props['aria-label']; },
    'aria-orientation': 'horizontal' as 'horizontal',
    get 'aria-labelledby'() { return `${id()} ${getColumnHeaderId(state.tableState, item().key)}`; },
    get 'aria-valuetext'() { return stringFormatter.format('columnSize', {value: value()}); },
    type: 'range',
    get min() { return min(); },
    get max() { return max(); },
    get value() { return value(); },
    // React's controlled range also reflects its value as the default attribute.
    get defaultValue() { return value(); }
  }, descriptionProps);

  const focusInput = () => {
    if (ref.current) {
      focusSafely(ref.current);
    }
  };

  let prevResizingColumn: Key | null = null;
  createEffect(() => ({resizingColumn: state.resizingColumn, column: item(), input: ref.current}), ({resizingColumn, column, input}) => {
    if (
      prevResizingColumn !== resizingColumn &&
      resizingColumn != null &&
      resizingColumn === column.key
    ) {
      wasFocusedOnResizeStart = getActiveElement() === input;
      untrack(() => startResize(column));
      // Delay focusing input until Android Chrome's delayed click after touchend happens: https://bugs.chromium.org/p/chromium/issues/detail?id=1150073
      let timeout = setTimeout(() => focusInput(), 0);
      // VoiceOver on iOS has problems focusing the input from a menu.
      let VOTimeout = setTimeout(focusInput, 400);
      return () => {
        clearTimeout(timeout);
        clearTimeout(VOTimeout);
      };
    }
    prevResizingColumn = resizingColumn;
  });

  let onChange = (e: Event) => {
    let currentWidth = state.getColumnWidth(item().key);
    let nextValue = parseFloat((getEventTarget(e) as HTMLInputElement).value);

    if (nextValue > currentWidth) {
      nextValue = currentWidth + 10;
    } else {
      nextValue = currentWidth - 10;
    }
    resize(item(), nextValue);
  };

  let {pressProps} = usePress({
    preventFocusOnPress: true,
    onPressStart: e => {
      if (e.ctrlKey || e.altKey || e.metaKey || e.shiftKey || e.pointerType === 'keyboard') {
        return;
      }
      if (e.pointerType === 'virtual' && state.resizingColumn != null) {
        endResize(item());
        return;
      }

      // Sometimes onPress won't trigger for quick taps on mobile so we want to focus the input so blurring away
      // can cancel resize mode for us.
      focusInput();

      // If resizer is always visible, mobile screenreader user can access the visually hidden resizer directly and thus we don't need
      // to handle a virtual click to start the resizer.
      if (e.pointerType !== 'virtual') {
        startResize(item());
      }
    },
    onPress: e => {
      if (
        ((e.pointerType === 'touch' && wasFocusedOnResizeStart) ||
          e.pointerType === 'mouse') &&
        state.resizingColumn != null
      ) {
        endResize(item());
      }
    }
  });
  let {visuallyHiddenProps} = useVisuallyHidden();

  return {
    resizerProps: mergeProps(keyboardProps, merge(moveProps, {onKeyDown}), pressProps, {
      style: {touchAction: 'none'}
    }),
    inputProps: mergeProps(
      visuallyHiddenProps,
      // oxlint-disable-next-line react/react-compiler
      {
        get id() { return id(); },
        onBlur: () => {
          endResize(item());
        },
        onChange,
        get disabled() { return props.isDisabled; }
      },
      ariaProps
    ) as JSX.InputHTMLAttributes<HTMLInputElement>,
    isResizing,
    isMouseResizing
  };
}
