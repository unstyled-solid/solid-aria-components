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

import {DOMAttributes, FocusableElement, Key, RefObject} from '@react-types/shared';
import {focusSafely} from '../interactions/focusSafely';
import {
  getActiveElement,
  getEventTarget,
  isFocusWithin,
  nodeContains
} from '../utils/shadowdom/DOMFunctions';
import {getFocusableTreeWalker} from '../focus/FocusScope';
import {getOwnerDocument} from '../utils/domHelpers';
import {getScrollParent} from '../utils/getScrollParent';
import {
  IGridCollection as GridCollection,
  GridNode
} from 'react-stately/private/grid/GridCollection';
import {gridMap} from './utils';
import {GridState} from 'react-stately/private/grid/useGridState';
import {isFocusVisible} from '../interactions/useFocusVisible';
import {mergeProps} from '../utils/mergeProps';
import {createEffect, merge, omit, onSettled, type Accessor} from 'solid-js';
type ReactKeyboardEvent = KeyboardEvent & {currentTarget: Element};
import {scrollIntoViewport} from '../utils/scrollIntoView';
import {useLocale} from '../i18n/I18nProvider';
import {useSelectableItem} from '../selection/useSelectableItem';
import {useEffectEvent} from '../utils/useEffectEvent';
import {createSyntheticEvent} from '../interactions/utils';

export interface GridCellProps {
  /**
   * An object representing the grid cell. Contains all the relevant information that makes up the
   * grid cell.
   */
  node: GridNode<unknown>;
  /** Whether the grid cell is contained in a virtual scroller. */
  isVirtualized?: boolean;
  /**
   * Whether the cell or its first focusable child element should be focused when the grid cell is
   * focused. Defaults to 'child' in arrow keyboard navigation mode and 'cell' in
   * tab keyboard navigation mode.
   */
  focusMode?: 'child' | 'cell';
  /**
   * Whether the cell should support arrow key navigation even when the containing collection uses
   * tab keyboard navigation. Allows users to navigate between rows and cells with arrow keys while
   * focus is on an interactive child element within the cell.
   */
  allowsArrowNavigation?: boolean;
  /** Whether selection should occur on press up instead of press down. */
  shouldSelectOnPressUp?: boolean;
  /** Indicates how many columns the data cell spans. */
  colSpan?: number;
  /**
   * Handler that is called when a user performs an action on the cell.
   * Please use onCellAction at the collection level instead.
   *
   * @deprecated
   */
  onAction?: () => void;
}

export interface GridCellAria {
  /** Props for the grid cell element. */
  gridCellProps: DOMAttributes;
  /** Whether the cell is currently in a pressed state. */
  isPressed: Accessor<boolean>;
}

/**
 * Provides the behavior and accessibility implementation for a cell in a grid.
 *
 * @param props - Props for the cell.
 * @param state - State of the parent grid, as returned by `useGridState`.
 */
export function useGridCell<T, C extends GridCollection<T>>(
  props: GridCellProps,
  state: GridState<T, C>,
  ref: RefObject<FocusableElement | null>
): GridCellAria {
  let node = () => props.node;
  let locale = useLocale();
  let data = () => gridMap.get(state)!;
  let keyboardNavigationBehavior = () => data().keyboardNavigationBehavior;
  let focusMode = () => props.focusMode ?? (keyboardNavigationBehavior() === 'tab' ? 'cell' : 'child');

  // We need to track the key of the item at the time it was last focused so that we force
  // focus to go to the item when the DOM node is reused for a different item in a virtualizer.
  let keyWhenFocused: {current: Key | null} = {current: null};

  // Tracks the specific focusable child that was last focused within this cell.
  let lastFocusedChild: {current: FocusableElement | null} = {current: null};
  let frames = new Set<number>();
  let scheduleFrame = (callback: () => void) => {
    let frame = requestAnimationFrame(() => {frames.delete(frame); callback();});
    frames.add(frame);
  };
  onSettled(() => () => {for (let frame of frames) {cancelAnimationFrame(frame);} frames.clear();});

  // Handles focusing the cell. If there is a focusable child,
  // it is focused, otherwise the cell itself is focused.
  let focus = () => {
    if (ref.current) {
      let treeWalker = getFocusableTreeWalker(ref.current);
      if (focusMode() === 'child') {
        let activeElement = getActiveElement(getOwnerDocument(ref.current));

        // If focus is already on a focusable child within the cell, early return so we don't shift focus
        if (isFocusWithin(ref.current) && ref.current !== activeElement) {
          return;
        }

        let ownerDocument = getOwnerDocument(ref.current);
        let shouldRestoreToLastFocused =
          !activeElement || activeElement === ownerDocument.body || activeElement === ref.current;
        if (shouldRestoreToLastFocused) {
          let lastChild = lastFocusedChild.current;
          if (
            lastChild &&
            keyWhenFocused.current === node().key &&
            nodeContains(ref.current, lastChild)
          ) {
            focusSafely(lastChild);
            return;
          }
        }

        let focusable =
          state.selectionManager.childFocusStrategy === 'last'
            ? last(treeWalker)
            : (treeWalker.firstChild() as FocusableElement);
        if (focusable) {
          focusSafely(focusable);
          return;
        }
      }

      if (
        (keyWhenFocused.current != null && node().key !== keyWhenFocused.current) ||
        !isFocusWithin(ref.current)
      ) {
        focusSafely(ref.current);
      }
    }
  };

  let {itemProps, isPressed} = useSelectableItem({
    get selectionManager() {return state.selectionManager;},
    get key() {return node().key;},
    ref,
    get isVirtualized() {return props.isVirtualized;},
    focus,
    get shouldSelectOnPressUp() {return props.shouldSelectOnPressUp;},
    get onAction() {return data().actions.onCellAction ? () => data().actions.onCellAction?.(node().key) : props.onAction;},
    get isDisabled() {return state.collection.size === 0;}
  });

  let onKeyDownCapture = (nativeEvent: ReactKeyboardEvent) => {
    let e = createSyntheticEvent<ReactKeyboardEvent>(nativeEvent);
    let activeElement = getActiveElement(getOwnerDocument(ref.current));
    if (
      !nodeContains(e.currentTarget, getEventTarget(e) as Element) ||
      state.isKeyboardNavigationDisabled ||
      !ref.current ||
      !activeElement
    ) {
      return;
    }

    let walker = getFocusableTreeWalker(ref.current);
    walker.currentNode = activeElement;

    switch (e.key) {
      case 'ArrowLeft': {
        // Find the next focusable element within the cell.
        let focusable: FocusableElement | null =
          locale.direction === 'rtl'
            ? (walker.nextNode() as FocusableElement)
            : (walker.previousNode() as FocusableElement);

        // Don't focus the cell itself if focusMode is "child"
        if (focusMode() === 'child' && focusable === ref.current) {
          focusable = null;
        }

        e.preventDefault();
        e.stopPropagation();
        if (focusable) {
          focusSafely(focusable);
          scrollIntoViewport(focusable, {containingElement: getScrollParent(ref.current)});
        } else {
          // If there is no next focusable child, then move to the next cell to the left of this one.
          // This will be handled by useSelectableCollection. However, if there is no cell to the left
          // of this one, only one column, and the grid doesn't focus rows, then the next key will be the
          // same as this one. In that case we need to handle focusing either the cell or the first/last
          // child, depending on the focus mode.
          let prev = data().keyboardDelegate.getKeyLeftOf?.(node().key);
          if (prev !== node().key) {
            // We prevent the capturing event from reaching children of the cell, e.g. pickers.
            // We want arrow keys to navigate to the next cell instead. We need to re-dispatch
            // the event from a higher parent so it still bubbles and gets handled by useSelectableCollection.
            ref.current.parentElement?.dispatchEvent(
              new KeyboardEvent(e.type, e)
            );
            break;
          }

          if (focusMode() === 'cell' && locale.direction === 'rtl') {
            focusSafely(ref.current);
            scrollIntoViewport(ref.current, {containingElement: getScrollParent(ref.current)});
          } else {
            walker.currentNode = ref.current;
            focusable =
              locale.direction === 'rtl' ? (walker.firstChild() as FocusableElement) : last(walker);
            if (focusable) {
              focusSafely(focusable);
              scrollIntoViewport(focusable, {containingElement: getScrollParent(ref.current)});
            }
          }
        }
        break;
      }
      case 'ArrowRight': {
        let focusable: FocusableElement | null =
          locale.direction === 'rtl'
            ? (walker.previousNode() as FocusableElement)
            : (walker.nextNode() as FocusableElement);

        if (focusMode() === 'child' && focusable === ref.current) {
          focusable = null;
        }

        e.preventDefault();
        e.stopPropagation();
        if (focusable) {
          focusSafely(focusable);
          scrollIntoViewport(focusable, {containingElement: getScrollParent(ref.current)});
        } else {
          let next = data().keyboardDelegate.getKeyRightOf?.(node().key);
          if (next !== node().key) {
            // We prevent the capturing event from reaching children of the cell, e.g. pickers.
            // We want arrow keys to navigate to the next cell instead. We need to re-dispatch
            // the event from a higher parent so it still bubbles and gets handled by useSelectableCollection.
            ref.current.parentElement?.dispatchEvent(
              new KeyboardEvent(e.type, e)
            );
            break;
          }

          if (focusMode() === 'cell' && locale.direction === 'ltr') {
            focusSafely(ref.current);
            scrollIntoViewport(ref.current, {containingElement: getScrollParent(ref.current)});
          } else {
            walker.currentNode = ref.current;
            focusable =
              locale.direction === 'rtl' ? last(walker) : (walker.firstChild() as FocusableElement);
            if (focusable) {
              focusSafely(focusable);
              scrollIntoViewport(focusable, {containingElement: getScrollParent(ref.current)});
            }
          }
        }
        break;
      }
      case 'ArrowUp':
      case 'ArrowDown':
        // Prevent this event from reaching cell children, e.g. menu buttons. We want arrow keys to navigate
        // to the cell above/below instead. We need to re-dispatch the event from a higher parent so it still
        // bubbles and gets handled by useSelectableCollection.
        if (!e.altKey && nodeContains(ref.current, getEventTarget(e) as Element)) {
          e.stopPropagation();
          e.preventDefault();
          ref.current.parentElement?.dispatchEvent(
            new KeyboardEvent(e.type, e)
          );
        }
        break;
    }
  };

  let onKeyDown = (e: ReactKeyboardEvent) => {
    let activeElement = getActiveElement(getOwnerDocument(ref.current));
    if (
      !nodeContains(e.currentTarget, getEventTarget(e) as Element) ||
      state.isKeyboardNavigationDisabled ||
      !ref.current ||
      !activeElement
    ) {
      return;
    }

    if (keyboardNavigationBehavior() === 'tab') {
      if (getEventTarget(e) !== ref.current && e.key !== 'Tab') {
        e.stopPropagation();
        return;
      }
    }

    switch (e.key) {
      case 'Tab': {
        if (keyboardNavigationBehavior() === 'tab') {
          // If there is another focusable element within this item, stop propagation so the tab key
          // is handled by the browser and not by useSelectableCollection (which would take us out of the list).
          let walker = getFocusableTreeWalker(ref.current, {tabbable: true});
          walker.currentNode = activeElement;
          let next = e.shiftKey ? walker.previousNode() : walker.nextNode();

          if (next) {
            e.stopPropagation();
          }
        }
      }
    }
  };
  // Native capturing listeners preserve the source interception/redispatch order.
  createEffect(() => ({element: ref.current, enabled: keyboardNavigationBehavior() !== 'tab' || props.allowsArrowNavigation}), ({element, enabled}) => {
    if (!element || !enabled) {return;}
    let listener = (e: Event) => onKeyDownCapture(e as ReactKeyboardEvent);
    element.addEventListener('keydown', listener, true);
    return () => element.removeEventListener('keydown', listener, true);
  });

  // Grid cells can have focusable elements inside them. In this case, focus should
  // be marshalled to that element rather than focusing the cell itself.
  let onFocus = useEffectEvent((e: FocusEvent) => {
    keyWhenFocused.current = node().key;
    if (getEventTarget(e) !== ref.current) {
      // useSelectableItem only handles setting the focused key when
      // the focused element is the gridcell itself. We also want to
      // set the focused key when a child element receives focus.
      // If focus is currently visible (e.g. the user is navigating with the keyboard),
      // then skip this. We want to restore focus to the previously focused row/cell
      // in that case since the table should act like a single tab stop.

      let target = getEventTarget(e) as FocusableElement;
      if (ref.current && nodeContains(ref.current, target)) {
        lastFocusedChild.current = target;
      }

      if (!isFocusVisible()) {
        state.selectionManager.setFocusedKey(node().key);
      }
      return;
    }

    // if focus goes back to cell from child, make sure we don't refocus the cell if we are in focusMode=child
    // since that would be a focus trap
    if (
      focusMode() === 'child' &&
      e.relatedTarget &&
      nodeContains(ref.current, e.relatedTarget as Element)
    ) {
      return;
    }

    // If the cell itself is focused, wait a frame so that focus finishes propagating
    // up to the tree, and move focus to a focusable child if possible.
    scheduleFrame(() => {
      if (
        focusMode() === 'child' &&
        getActiveElement(getOwnerDocument(ref.current)) === ref.current
      ) {
        focus();
      }
    });
  });

  // oxlint-disable-next-line react/react-compiler
  let baseCellProps = mergeProps(itemProps, {
    role: 'gridcell',
    get onKeyDown() {return keyboardNavigationBehavior() === 'tab' ? onKeyDown : undefined;},
    get 'aria-colspan'() {return node().colSpan;},
    get 'aria-colindex'() {return props.isVirtualized ? (node().colIndex ?? node().index) + 1 : node().colIndex != null ? node().colIndex! + 1 : undefined;},
    get colSpan() {return props.isVirtualized ? undefined : node().colSpan;},
    onFocusIn: onFocus,
    // make sure shift tabbing from a child of a cell doesnt move focus back to cell if focusMode="child" and in tab nav
    // consistent with arrow nav and focusMode="child" since you can't go back to the cell there either
  }, omit({tabIndex: -1}, () => !(focusMode() === 'child' && keyboardNavigationBehavior() === 'tab')));

  // When pressing with a pointer and cell selection is not enabled, usePress will be applied to the
  // row rather than the cell. However, when the row is draggable, usePress cannot preventDefault
  // on pointer down, so the browser will try to focus the cell which has a tabIndex applied.
  // To avoid this, remove the tabIndex from the cell briefly on pointer down.
  let onPointerDown = (e: PointerEvent & {currentTarget: Element}) => {
      let el = e.currentTarget;
      let tabindex = el.getAttribute('tabindex');
      el.removeAttribute('tabindex');
      scheduleFrame(() => {
        if (tabindex != null) {
          el.setAttribute('tabindex', tabindex);
        }
      });
    };
  let gridCellProps: DOMAttributes = merge(baseCellProps, omit({onPointerDown}, () => !props.shouldSelectOnPressUp || baseCellProps.tabIndex == null || baseCellProps.onPointerDown != null));

  return {
    gridCellProps,
    isPressed
  };
}

function last(walker: TreeWalker) {
  let next: FocusableElement | null = null;
  let last: FocusableElement | null = null;
  do {
    last = walker.lastChild() as FocusableElement | null;
    if (last) {
      next = last;
    }
  } while (last);
  return next;
}
