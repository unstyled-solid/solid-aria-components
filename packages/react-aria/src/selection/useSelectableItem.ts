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

import {
  DOMAttributes,
  DOMProps,
  FocusableElement,
  Key,
  LongPressEvent,
  PointerType,
  PressEvent,
  RefObject
} from '@react-types/shared';
import {focusSafely} from '../interactions/focusSafely';
import {getActiveElement, getEventTarget} from '../utils/shadowdom/DOMFunctions';
import {getCollectionId, isNonContiguousSelectionModifier} from './utils';
import {isCtrlKeyPressed} from '../utils/keyboard';
import {isTabbable} from '../utils/isFocusable';
import {mergeProps} from '../utils/mergeProps';
import {moveVirtualFocus} from '../focus/virtualFocus';
import {MultipleSelectionManager} from 'react-stately/useMultipleSelectionState';
import {openLink, useRouter} from '../utils/openLink';
import {PressHookProps, usePress} from '../interactions/usePress';
import {Accessor, createEffect, createMemo, merge, untrack} from 'solid-js';
import {useId} from '../utils/useId';
import {useLongPress} from '../interactions/useLongPress';
import {useEffectEvent} from '../utils/useEffectEvent';

export interface SelectableItemOptions extends DOMProps {
  /**
   * An interface for reading and updating multiple selection state.
   */
  selectionManager: MultipleSelectionManager;
  /**
   * A unique key for the item.
   */
  key: Key;
  /**
   * Ref to the item.
   */
  ref: RefObject<FocusableElement | null>;
  /**
   * By default, selection occurs on pointer down. This can be strange if selecting an
   * item causes the UI to disappear immediately (e.g. menus).
   */
  shouldSelectOnPressUp?: boolean;
  /**
   * Whether selection requires the pointer/mouse down and up events to occur on the same target or
   * triggers selection on the target of the pointer/mouse up event.
   */
  allowsDifferentPressOrigin?: boolean;
  /**
   * Whether the option is contained in a virtual scroller.
   */
  isVirtualized?: boolean;
  /**
   * Function to focus the item.
   */
  focus?: () => void;
  /**
   * Whether the option should use virtual focus instead of being focused directly.
   */
  shouldUseVirtualFocus?: boolean;
  /** Whether the item is disabled. */
  isDisabled?: boolean;
  /**
   * Handler that is called when a user performs an action on the item. The exact user event depends
   * on the collection's `selectionBehavior` prop and the interaction modality.
   */
  onAction?: () => void;
  /**
   * The behavior of links in the collection.
   * - 'action': link behaves like onAction.
   * - 'selection': link follows selection interactions (e.g. if URL drives selection).
   * - 'override': links override all other interactions (link items are not selectable).
   * - 'none': links are disabled for both selection and actions (e.g. handled elsewhere).
   *
   * @default 'action'
   */
  linkBehavior?: 'action' | 'selection' | 'override' | 'none';
}

export interface SelectableItemStates {
  /** Whether the item is currently in a pressed state. */
  isPressed: Accessor<boolean>;
  /** Whether the item is currently selected. */
  isSelected: Accessor<boolean>;
  /** Whether the item is currently focused. */
  isFocused: Accessor<boolean>;
  /**
   * Whether the item is non-interactive, i.e. both selection and actions are disabled and the item
   * may not be focused. Dependent on `disabledKeys` and `disabledBehavior`.
   */
  isDisabled: Accessor<boolean>;
  /**
   * Whether the item may be selected, dependent on `selectionMode`, `disabledKeys`, and
   * `disabledBehavior`.
   */
  allowsSelection: Accessor<boolean>;
  /**
   * Whether the item has an action, dependent on `onAction`, `disabledKeys`,
   * and `disabledBehavior`. It may also change depending on the current selection state
   * of the list (e.g. when selection is primary). This can be used to enable or disable hover
   * styles or other visual indications of interactivity.
   */
  hasAction: Accessor<boolean>;
}

export interface SelectableItemAria extends SelectableItemStates {
  /**
   * Props to be spread on the item root node.
   */
  itemProps: DOMAttributes;
}

/**
 * Handles interactions with an item in a selectable collection.
 */
export function useSelectableItem(options: SelectableItemOptions): SelectableItemAria {
  let manager = () => options.selectionManager;
  let key = () => options.key;
  let ref = options.ref;
  let linkBehavior = () => options.linkBehavior ?? 'action';
  let isDisabled = () => Boolean(options.isDisabled || manager().isDisabled(key()));
  let router = useRouter();
  let id = useId(() => options.id);
  let onSelect = (e: PressEvent | LongPressEvent | PointerEvent) => {
    if (e.pointerType === 'keyboard' && isNonContiguousSelectionModifier(e)) {
      manager().toggleSelection(key());
    } else {
      if (manager().selectionMode === 'none') {
        return;
      }

      if (manager().isLink(key())) {
        if (linkBehavior() === 'selection' && ref.current) {
          let itemProps = manager().getItemProps(key());
          router.open(ref.current, e, itemProps.href, itemProps.routerOptions);
          // Always set selected keys back to what they were so that select and combobox close.
          manager().setSelectedKeys(manager().selectedKeys);
          return;
        } else if (linkBehavior() === 'override' || linkBehavior() === 'none') {
          return;
        }
      }

      if (manager().selectionMode === 'single') {
        if (manager().isSelected(key()) && !manager().disallowEmptySelection) {
          manager().toggleSelection(key());
        } else {
          manager().replaceSelection(key());
        }
      } else if (e && e.shiftKey) {
        manager().extendSelection(key());
      } else if (
        manager().selectionBehavior === 'toggle' ||
        (e && (isCtrlKeyPressed(e) || e.pointerType === 'touch' || e.pointerType === 'virtual'))
      ) {
        // if touch or virtual (VO) then we just want to toggle, otherwise it's impossible to multi select because they don't have modifier keys
        manager().toggleSelection(key());
      } else {
        manager().replaceSelection(key());
      }
    }
  };

  // Focus the associated DOM node when this item becomes the focusedKey
  // TODO: can't make this useLayoutEffect bacause it breaks menus inside dialogs
  // However, if this is a useEffect, it runs twice and dispatches two blur events and immediately sets
  // aria-activeDescendant in useAutocomplete... I've worked around this for now
  createEffect(() => ({element: ref.current, key: key(), focusedKey: manager().focusedKey, strategy: manager().childFocusStrategy, focused: manager().isFocused, virtual: options.shouldUseVirtualFocus, focus: options.focus}), ({element, key, focusedKey, focused, virtual, focus}) => {
    let isFocused = key === focusedKey;
    if (isFocused && focused) {
      if (!virtual) {
        if (focus) {
          untrack(focus);
        } else if (getActiveElement() !== element && element) {
          untrack(() => focusSafely(element));
        }
      } else {
        untrack(() => moveVirtualFocus(element));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });
  // Set tabIndex to 0 if the element is focused, or -1 otherwise so that only the last focused
  // item is tabbable.  If using virtual focus, don't set a tabIndex at all so that VoiceOver
  // on iOS 14 doesn't try to move real DOM focus to the item anyway.
  let itemProps: SelectableItemAria['itemProps'] = {
      get tabIndex() { return !options.shouldUseVirtualFocus && !isDisabled() ? key() === manager().focusedKey ? 0 : -1 : undefined; },
      onFocusIn: useEffectEvent(e => {
        if (options.shouldUseVirtualFocus || isDisabled()) { return; }
        if (getEventTarget(e) === ref.current) {
          manager().setFocusedKey(key());
        }
      }),
      onMouseDown(e) {
        if (!isDisabled()) { return; }
      // Prevent focus going to the body when clicking on a disabled item.
      e.preventDefault();
      }
  };

  // Source runs this reset when manager, disabled policy, or item key changes,
  // not when focusedKey changes. Observe current focus at the imperative edge.
  let clearDisabledFocus = useEffectEvent(({disabled, key, manager}: {disabled: boolean; key: Key; manager: MultipleSelectionManager}) => {
    if (disabled && manager.focusedKey === key) {
      manager.setFocusedKey(null);
    }
  });
  let disabledFocusPolicy = createMemo<{disabled: boolean; key: Key; manager: MultipleSelectionManager}>(previous => {
    let policy = {disabled: isDisabled(), key: key(), manager: manager()};
    // Match the source effect's dependency tuple. Collection snapshots may
    // invalidate these reads without changing the disabled-item policy.
    return previous && previous.disabled === policy.disabled &&
      previous.key === policy.key && previous.manager === policy.manager ? previous : policy;
  });
  createEffect(disabledFocusPolicy, clearDisabledFocus);

  // With checkbox selection, onAction (i.e. navigation) becomes primary, and occurs on a single click of the row.
  // Clicking the checkbox enters selection mode, after which clicking anywhere on any row toggles selection for that row.
  // With highlight selection, onAction is secondary, and occurs on double click. Single click selects the row.
  // With touch, onAction occurs on single tap, and long press enters selection mode.
  let isLinkOverride = () => manager().isLink(key()) && linkBehavior() === 'override';
  let isActionOverride = () => options.onAction && (options as SelectableItemOptions & {UNSTABLE_itemBehavior?: string}).UNSTABLE_itemBehavior === 'action';
  let hasLinkAction =
    () => manager().isLink(key()) && linkBehavior() !== 'selection' && linkBehavior() !== 'none';
  let allowsSelection =
    () => !isDisabled() && manager().canSelectItem(key()) && !isLinkOverride() && !isActionOverride();
  let allowsActions = () => Boolean((options.onAction || hasLinkAction()) && !isDisabled());
  let hasPrimaryAction =
    () => allowsActions() &&
    (manager().selectionBehavior === 'replace'
      ? !allowsSelection()
      : !allowsSelection() || manager().isEmpty);
  let hasSecondaryAction =
    () => allowsActions() && allowsSelection() && manager().selectionBehavior === 'replace';
  let hasAction = () => hasPrimaryAction() || hasSecondaryAction();
  let modality = {current: null as PointerType | null};

  let longPressEnabled = () => hasAction() && allowsSelection();
  let longPressEnabledOnPressStart = {current: false};
  let hadPrimaryActionOnPressStart = {current: false};
  let collectionItemProps = () => manager().getItemProps(key());

  let performAction = (e: PressEvent | MouseEvent) => {
    if (options.onAction) {
      options.onAction();
      ref.current?.dispatchEvent(new CustomEvent('react-aria-item-action', {bubbles: true}));
    }

    if (hasLinkAction() && ref.current) {
      router.open(ref.current, e, collectionItemProps().href, collectionItemProps().routerOptions);
    }
  };

  // By default, selection occurs on pointer down. This can be strange if selecting an
  // item causes the UI to disappear immediately (e.g. menus).
  // If shouldSelectOnPressUp is true, we use onPressUp instead of onPressStart.
  // onPress requires a pointer down event on the same element as pointer up. For menus,
  // we want to be able to have the pointer down on the trigger that opens the menu and
  // the pointer up on the menu item rather than requiring a separate press.
  // For keyboard events, selection still occurs on key down.
  let itemPressProps: PressHookProps = {ref};
  let pressUpStart = (e: PressEvent) => {
    // oxlint-disable-next-line react/react-compiler
      modality.current = e.pointerType;
      longPressEnabledOnPressStart.current = longPressEnabled();
      if (e.pointerType === 'keyboard' && (!hasAction() || isSelectionKey(e.key))) {
        onSelect(e);
      }
    };

    // If allowsDifferentPressOrigin and interacting with mouse, make selection happen on pressUp (e.g. open menu on press down, selection on menu item happens on press up.)
    // Otherwise, have selection happen onPress (prevents listview row selection when clicking on interactable elements in the row)
    let sameOriginPress = (e: PressEvent) => {
      // oxlint-disable-next-line react/react-compiler
        if (hasPrimaryAction() || (hasSecondaryAction() && e.pointerType !== 'mouse')) {
          if (e.pointerType === 'keyboard' && !isActionKey(e.key)) {
            return;
          }

          performAction(e);
        } else if (e.pointerType !== 'keyboard' && allowsSelection()) {
          onSelect(e);
        }
      };
      // oxlint-disable-next-line react/react-compiler
      let differentOriginPressUp = (e: PressEvent) => {
            if (e.pointerType === 'mouse' && allowsSelection()) {
              onSelect(e);
            }
          };

      // oxlint-disable-next-line react/react-compiler
      let differentOriginPress = (e: PressEvent) => {
            if (e.pointerType !== 'keyboard' && e.pointerType !== 'mouse' && allowsSelection()) {
              onSelect(e);
            }
          };
    // oxlint-disable-next-line react/react-compiler
    let pressDownStart = (e: PressEvent) => {
      modality.current = e.pointerType;
      longPressEnabledOnPressStart.current = longPressEnabled();
      hadPrimaryActionOnPressStart.current = hasPrimaryAction();

      // Select on mouse down unless there is a primary action which will occur on mouse up.
      // For keyboard, select on key down. If there is an action, the Space key selects on key down,
      // and the Enter key performs onAction on key up.
      if (
        allowsSelection() &&
        ((e.pointerType === 'mouse' && !hasPrimaryAction()) ||
          (e.pointerType === 'keyboard' && (!allowsActions() || isSelectionKey(e.key))))
      ) {
        onSelect(e);
      }
    };

    // oxlint-disable-next-line react/react-compiler
    let pressDown = (e: PressEvent) => {
      // Selection occurs on touch up. Primary actions always occur on pointer up.
      // Both primary and secondary actions occur on Enter key up. The only exception
      // is secondary actions, which occur on double click with a mouse.
      if (
        e.pointerType === 'touch' ||
        e.pointerType === 'pen' ||
        e.pointerType === 'virtual' ||
        (e.pointerType === 'keyboard' && hasAction() && isActionKey(e.key)) ||
        (e.pointerType === 'mouse' && hadPrimaryActionOnPressStart.current)
      ) {
        if (hasAction()) {
          performAction(e);
        } else if (allowsSelection()) {
          onSelect(e);
        }
      }
    };
  itemPressProps = merge(itemPressProps, {
    get onPressStart() { return options.shouldSelectOnPressUp ? pressUpStart : pressDownStart; },
    get onPressUp() { return options.shouldSelectOnPressUp && options.allowsDifferentPressOrigin && !hasPrimaryAction() ? differentOriginPressUp : undefined; },
    get onPress() { return options.shouldSelectOnPressUp ? options.allowsDifferentPressOrigin ? hasPrimaryAction() ? performAction : differentOriginPress : sameOriginPress : pressDown; },
    get preventFocusOnPress() { return options.shouldUseVirtualFocus; }
  });
  let collectionId = () => getCollectionId(manager().collection);
  itemProps = merge(itemProps, {
    get 'data-collection'() { return collectionId(); },
    get 'data-key'() { return key(); }
  });
  // oxlint-disable-next-line react/react-compiler

  // When using virtual focus, make sure the focused key gets updated on press.
    // oxlint-disable-next-line react/react-compiler
    itemPressProps = mergeProps(itemPressProps, {
      onPressStart(e: PressEvent) {
        if (options.shouldUseVirtualFocus && e.pointerType !== 'touch') {
          manager().setFocused(true);
          manager().setFocusedKey(key());
        }
      },
      onPress(e: PressEvent) {
        if (options.shouldUseVirtualFocus && e.pointerType === 'touch') {
          manager().setFocused(true);
          manager().setFocusedKey(key());
        }
      }
    });
    for (let key of [
      'onPressStart',
      'onPressEnd',
      'onPressChange',
      'onPress',
      'onPressUp',
      'onClick'
    ] as const) {
      let original = itemPressProps;
      itemPressProps = merge(original, {
        get [key]() { return chain(original[key], collectionItemProps()?.[key]); }
      }) as PressHookProps;
    }

  let {pressProps, isPressed} = usePress(itemPressProps);

  // Double clicking with a mouse with selectionBehavior = 'replace' performs an action.
  let onDoubleClick = (e: MouseEvent) => {
        if (!hasSecondaryAction()) { return; }
        if (modality.current === 'mouse') {
          e.stopPropagation();
          e.preventDefault();
          performAction(e);
        }
      };

  // Long pressing an item with touch when selectionBehavior = 'replace' switches the selection behavior
  // to 'toggle'. This changes the single tap behavior from performing an action (i.e. navigating) to
  // selecting, and may toggle the appearance of a UI affordance like checkboxes on each item.
  let {longPressProps} = useLongPress({
    get isDisabled() { return !longPressEnabled(); },
    onLongPress(e) {
      if (e.pointerType === 'touch') {
        onSelect(e);
        manager().setSelectionBehavior('toggle');
      }
    }
  });

  // Prevent native drag and drop on long press if we also select on long press.
  // Once the user is in selection mode, they can long press again to drag.
  // Use a capturing listener to ensure this runs before useDrag, regardless of
  // the order the props get merged.
  let onDragStartCapture = (e: DragEvent) => {
    if (modality.current === 'touch' && longPressEnabledOnPressStart.current) {
      e.preventDefault();
    }
  };

  // Prevent default on link clicks so that we control exactly
  // when they open (to match selection behavior).
  let onClick = (e: MouseEvent) => {
           if (linkBehavior() === 'none' || !manager().isLink(key())) { return; }
          if (!(openLink as any).isOpening) {
            e.preventDefault();
          }
        };

  let mergedItemProps: DOMAttributes = mergeProps(
    // oxlint-disable-next-line react/react-compiler
    itemProps,
    new Proxy(pressProps, {get(target, property) {
      return allowsSelection() || hasPrimaryAction() || (options.shouldUseVirtualFocus && !isDisabled()) ? Reflect.get(target, property) : undefined;
    }}),
    new Proxy(longPressProps, {get(target, property) { return longPressEnabled() ? Reflect.get(target, property) : undefined; }}),
    // oxlint-disable-next-line react/react-compiler
    {onDblClick: onDoubleClick, onClick, get id() { return id(); }},
    // Prevent DOM focus from moving on mouse down when using virtual focus
    {onMouseDown: (e: MouseEvent) => { if (options.shouldUseVirtualFocus) { e.preventDefault(); } }}
  );
  createEffect(() => ref.current, element => {
    if (!element) { return; }
    element.addEventListener('dragstart', onDragStartCapture as EventListener, true);
    return () => element.removeEventListener('dragstart', onDragStartCapture as EventListener, true);
  });

  // Guard against presses triggering selection when they happen on interactive children or collection items from different collections
  // will need to trigger selection if the target is itself a collection item belonging to the same collection parent (aka a cell in a row) but
  // not if the target is a child of a different collections aka taggroup in table cell.
  let isChildInteraction = (target: Element) => {
    let el: Element | null = target;
    while (el && el !== ref.current) {
      let elCollection = el.getAttribute('data-collection');
      if (elCollection != null) {
        return elCollection !== collectionId();
      }
      el = el.parentElement;
    }
    return isTabbable(target);
  };

  let baseItemProps = mergedItemProps;
  let onPointerDown = (e: PointerEvent) => {
    let target = getEventTarget(e) as Element | null;
    if (target && target !== ref.current && isChildInteraction(target)) {
      e.stopPropagation();
      return;
    }
    let handler = baseItemProps.onPointerDown;
    if (typeof handler === 'function') { handler(e as Parameters<typeof handler>[0]); }
    else if (handler) { handler[0](handler[1], e as Parameters<typeof handler[0]>[1]); }
  };

  let onMouseDown = (e: MouseEvent) => {
    let target = getEventTarget(e) as Element | null;
    if (target && target !== ref.current && isChildInteraction(target)) {
      e.stopPropagation();
      return;
    }
    let handler = baseItemProps.onMouseDown;
    if (typeof handler === 'function') { handler(e as Parameters<typeof handler>[0]); }
    else if (handler) { handler[0](handler[1], e as Parameters<typeof handler[0]>[1]); }
  };
  mergedItemProps = merge(baseItemProps, {onPointerDown, onMouseDown}) as DOMAttributes;

  return {
    itemProps: mergedItemProps,
    isPressed,
    isSelected: () => manager().isSelected(key()),
    isFocused: () => manager().isFocused && manager().focusedKey === key(),
    isDisabled,
    allowsSelection,
    hasAction
  };
}

function isActionKey(key: string | undefined) {
  return key === 'Enter';
}

function isSelectionKey(key: string | undefined) {
  return key === ' ';
}
