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

import {CLEAR_FOCUS_EVENT, FOCUS_EVENT} from '../utils/constants';

import {dispatchVirtualFocus, moveVirtualFocus} from '../focus/virtualFocus';
import {
  DOMAttributes,
  FocusableElement,
  FocusStrategy,
  Key,
  KeyboardDelegate,
  KeyboardEvent,
  RefObject
} from '@react-types/shared';
import {FocusEvent} from '@react-types/shared';
import {createEffect, createMemo, onCleanup, onSettled, untrack} from 'solid-js';
import {focusSafely} from '../interactions/focusSafely';
import {focusWithoutScrolling} from '../utils/focusWithoutScrolling';
import {
  getActiveElement,
  getEventTarget,
  isFocusWithin,
  nodeContains
} from '../utils/shadowdom/DOMFunctions';
import {getFocusableTreeWalker} from '../focus/FocusScope';
import {getInteractionModality} from '../interactions/useFocusVisible';
import {getItemElement, isNonContiguousSelectionModifier, useCollectionId} from './utils';
import {isCtrlKeyPressed} from '../utils/keyboard';
import {isMac} from '../utils/platform';
import {isTabbable} from '../utils/isFocusable';
import {mergeProps} from '../utils/mergeProps';
import {MultipleSelectionManager} from 'react-stately/useMultipleSelectionState';
import {scrollIntoView, scrollIntoViewport} from '../utils/scrollIntoView';
import {useEvent} from '../utils/useEvent';
import {useEffectEvent} from '../utils/useEffectEvent';
import {useKeyboard} from '../interactions/useKeyboard';
import {useLocale} from '../i18n/I18nProvider';
import {useRouter} from '../utils/openLink';
import {useTypeSelect} from './useTypeSelect';

export interface AriaSelectableCollectionOptions {
  /**
   * An interface for reading and updating multiple selection state.
   */
  selectionManager: MultipleSelectionManager;
  /**
   * A delegate object that implements behavior for keyboard focus movement.
   */
  keyboardDelegate: KeyboardDelegate;
  /**
   * The ref attached to the element representing the collection.
   */
  ref: RefObject<HTMLElement | null>;
  /**
   * Whether the collection or one of its items should be automatically focused upon render.
   *
   * @default false
   */
  autoFocus?: boolean | FocusStrategy;
  /**
   * Whether focus should wrap around when the end/start is reached.
   *
   * @default false
   */
  shouldFocusWrap?: boolean;
  /**
   * Whether the collection allows empty selection.
   *
   * @default false
   */
  disallowEmptySelection?: boolean;
  /**
   * Whether the collection allows the user to select all items via keyboard shortcut.
   *
   * @default false
   */
  disallowSelectAll?: boolean;
  /**
   * Whether pressing the Escape should clear selection in the collection or not.
   *
   * @default 'clearSelection'
   */
  escapeKeyBehavior?: 'clearSelection' | 'none';
  /**
   * Whether selection should occur automatically on focus.
   *
   * @default false
   */
  selectOnFocus?: boolean;
  /**
   * Whether typeahead is disabled.
   *
   * @default false
   */
  disallowTypeAhead?: boolean;
  /**
   * Whether the collection items should use virtual focus instead of being focused directly.
   */
  shouldUseVirtualFocus?: boolean;
  /**
   * Whether navigation through tab key is enabled.
   */
  allowsTabNavigation?: boolean;
  /**
   * Whether the collection items are contained in a virtual scroller.
   */
  isVirtualized?: boolean;
  /**
   * The ref attached to the scrollable body. Used to provide automatic scrolling on item focus for
   * non-virtualized collections. If not provided, defaults to the collection ref.
   */
  scrollRef?: RefObject<HTMLElement | null>;
  /**
   * The behavior of links in the collection.
   * - 'action': link behaves like onAction.
   * - 'selection': link follows selection interactions (e.g. if URL drives selection).
   * - 'override': links override all other interactions (link items are not selectable).
   *
   * @default 'action'
   */
  linkBehavior?: 'action' | 'selection' | 'override';
  /**
   * Which item in the collection to focus when tabbing into the collection. Overrides default
   * roving tab index like behavior.
   *
   * @private
   */
  UNSTABLE_focusOnEntry?: 'first' | 'last';
}

export interface SelectableCollectionAria {
  /** Props for the collection element. */
  collectionProps: DOMAttributes;
}

/**
 * Handles interactions with selectable collections.
 */
export function useSelectableCollection(
  options: AriaSelectableCollectionOptions
): SelectableCollectionAria {
  let manager = () => options.selectionManager;
  let delegate = () => options.keyboardDelegate;
  let ref = options.ref;
  let scrollRef = () => options.scrollRef ?? ref;
  let selectOnFocus = () => options.selectOnFocus ?? manager().selectionBehavior === 'replace';
  let locale = useLocale();
  let router = useRouter();
  // React's source flushSync made newly focused virtual rows available before
  // opening a link. Native writes are staged: finish that request after the
  // accepted focused key and its DOM have committed, without a production flush.
  let pendingLink: {key: Key; event: KeyboardEvent} | null = null;
  createEffect(() => ({focusedKey: manager().focusedKey, collection: manager().collection, element: ref.current}), ({focusedKey}) => {
    let request = pendingLink;
    if (!request) { return; }
    pendingLink = null;
    if (focusedKey !== request.key) { return; }
    let item = getItemElement(ref, request.key);
    if (item) {
      let itemProps = manager().getItemProps(request.key);
      router.open(item, request.event, itemProps.href, itemProps.routerOptions);
    }
  });

  const navigateToKey = (
    e: KeyboardEvent,
    key: Key | undefined,
    childFocus?: FocusStrategy
  ): boolean | void => {
    pendingLink = null;
    if (key != null) {
      if (
        manager().isLink(key) &&
        (options.linkBehavior ?? 'action') === 'selection' &&
        selectOnFocus() &&
        !isNonContiguousSelectionModifier(e)
      ) {
        manager().setFocusedKey(key, childFocus);

        let item = getItemElement(ref, key);
        let itemProps = manager().getItemProps(key);
        if (item) {
          router.open(item, e, itemProps.href, itemProps.routerOptions);
          return;
        }

        pendingLink = {key, event: e};
        return false;
      }

      manager().setFocusedKey(key, childFocus);

      if (manager().isLink(key) && options.linkBehavior === 'override') {
        return false;
      }

      if (e.shiftKey && manager().selectionMode === 'multiple') {
        manager().extendSelection(key);
        return;
      } else if (selectOnFocus() && !isNonContiguousSelectionModifier(e)) {
        manager().replaceSelection(key);
        return;
      }
    }
    return false;
  };

  let arrowDown = (e: KeyboardEvent) => {
    if (delegate().getKeyBelow) {
      let nextKey =
        manager().focusedKey != null
          ? delegate().getKeyBelow?.(manager().focusedKey!)
          : delegate().getFirstKey?.();
      if (nextKey == null && options.shouldFocusWrap) {
        nextKey = delegate().getFirstKey?.(manager().focusedKey);
      }
      if (nextKey != null) {
        navigateToKey(e, nextKey);
        return;
      }
    }
    return false;
  };

  let arrowUp = (e: KeyboardEvent) => {
    if (delegate().getKeyAbove) {
      let nextKey =
        manager().focusedKey != null
          ? delegate().getKeyAbove?.(manager().focusedKey!)
          : delegate().getLastKey?.();
      if (nextKey == null && options.shouldFocusWrap) {
        nextKey = delegate().getLastKey?.(manager().focusedKey);
      }
      if (nextKey != null) {
        navigateToKey(e, nextKey);
        return;
      }
    }
    return false;
  };

  let home = (e: KeyboardEvent) => {
    if (delegate().getFirstKey) {
      if (manager().focusedKey === null && e.shiftKey) {
        return false;
      }
      // TODO: should Home and End also be reversed in column reverse aka Home goes to top? Or should Home always to to the "first" (bottom)
      let firstKey = delegate().getFirstKey!(manager().focusedKey, isCtrlKeyPressed(e));
      manager().setFocusedKey(firstKey ?? null);
      if (firstKey != null) {
        if (isCtrlKeyPressed(e) && e.shiftKey && manager().selectionMode === 'multiple') {
          manager().extendSelection(firstKey);
          return;
        } else if (selectOnFocus()) {
          manager().replaceSelection(firstKey);
          return;
        }
      }
    }
    return false;
  };

  let arrowLeft = (e: KeyboardEvent) => {
    if (delegate().getKeyLeftOf) {
      let nextKey: Key | undefined | null =
        manager().focusedKey != null
          ? delegate().getKeyLeftOf?.(manager().focusedKey!)
          : delegate().getFirstKey?.();
      if (nextKey == null && options.shouldFocusWrap) {
        nextKey =
          locale.direction === 'rtl'
            ? delegate().getFirstKey?.(manager().focusedKey)
            : delegate().getLastKey?.(manager().focusedKey);
      }
      if (nextKey != null) {
        navigateToKey(e, nextKey, locale.direction === 'rtl' ? 'first' : 'last');
        return;
      }
    }
    return false;
  };

  let arrowRight = (e: KeyboardEvent) => {
    if (delegate().getKeyRightOf) {
      let nextKey: Key | undefined | null =
        manager().focusedKey != null
          ? delegate().getKeyRightOf?.(manager().focusedKey!)
          : delegate().getFirstKey?.();
      if (nextKey == null && options.shouldFocusWrap) {
        nextKey =
          locale.direction === 'rtl'
            ? delegate().getLastKey?.(manager().focusedKey)
            : delegate().getFirstKey?.(manager().focusedKey);
      }
      if (nextKey != null) {
        navigateToKey(e, nextKey, locale.direction === 'rtl' ? 'last' : 'first');
        return;
      }
    }
    return false;
  };

  let end = (e: KeyboardEvent) => {
    if (delegate().getLastKey) {
      if (manager().focusedKey === null && e.shiftKey) {
        return false;
      }
      let lastKey = delegate().getLastKey!(manager().focusedKey, isCtrlKeyPressed(e));
      manager().setFocusedKey(lastKey ?? null);
      if (lastKey != null) {
        if (isCtrlKeyPressed(e) && e.shiftKey && manager().selectionMode === 'multiple') {
          manager().extendSelection(lastKey);
          return;
        } else if (selectOnFocus()) {
          manager().replaceSelection(lastKey);
          return;
        }
      }
    }
    return false;
  };

  let pageDown = (e: KeyboardEvent) => {
    if (delegate().getKeyPageBelow && manager().focusedKey != null) {
      let nextKey = delegate().getKeyPageBelow!(manager().focusedKey!);
      if (nextKey != null) {
        return navigateToKey(e, nextKey);
      }
    }
    return false;
  };

  let pageUp = (e: KeyboardEvent) => {
    if (delegate().getKeyPageAbove && manager().focusedKey != null) {
      let nextKey = delegate().getKeyPageAbove!(manager().focusedKey!);
      if (nextKey != null) {
        return navigateToKey(e, nextKey);
      }
    }
    return false;
  };

  let aHandler = () => {
    if (manager().selectionMode === 'multiple' && options.disallowSelectAll !== true) {
      manager().selectAll();
      return;
    }
    return false;
  };

  let escape = () => {
    if (
      (options.escapeKeyBehavior ?? 'clearSelection') === 'clearSelection' &&
      !options.disallowEmptySelection &&
      manager().selectedKeys.size !== 0
    ) {
      manager().clearSelection();
      return;
    }
    return false;
  };

  let tab = () => {
    if (!options.allowsTabNavigation && ref.current) {
      // There may be elements that are "tabbable" inside a collection (e.g. in a grid cell).
      // However, collections should be treated as a single tab stop, with arrow key navigation internally.
      // We don't control the rendering of these, so we can't override the tabIndex to prevent tabbing.
      // Instead, we handle the Tab key, and move focus manually to the first/last tabbable element
      // in the collection, so that the browser default behavior will apply starting from that element
      // rather than the currently focused one.

      let walker = getFocusableTreeWalker(ref.current, {tabbable: true});
      let next: FocusableElement | undefined = undefined;
      let last: FocusableElement;
      do {
        last = walker.lastChild() as FocusableElement;
        if (last) {
          next = last;
        }
      } while (last);

      // If the active element is NOT tabbable but is contained by an element that IS tabbable (aka the cell), the browser will actually move focus to
      // the containing element. We need to special case this so that tab will move focus out of the grid instead of looping between
      // focusing the containing cell and back to the non-tabbable child element
      let activeElement = getActiveElement();
      if (next && (!isFocusWithin(next) || (activeElement && !isTabbable(activeElement)))) {
        focusWithoutScrolling(next);
      }
    }
    return {shouldContinuePropagation: true, shouldPreventDefault: false};
  };

  let shiftTab = () => {
    if (!options.allowsTabNavigation && ref.current) {
      ref.current.focus();
    }
    return {shouldContinuePropagation: true, shouldPreventDefault: false};
  };

  let withShiftSel = (key: string, callback: (e: KeyboardEvent) => boolean | void) => {
    return {
      [isMac() ? key + '+Shift+Alt' : key + '+Shift+Control']: callback,
      [key + '+Shift']: callback,
      [isMac() ? key + '+Alt' : key + '+Control']: callback,
      [key]: callback
    };
  };
  // oxlint-disable react/react-compiler
  let {keyboardProps: repeatKeyboardProps} = useKeyboard({
    shortcuts: {
      ...withShiftSel('ArrowDown', arrowDown),
      ...withShiftSel('ArrowUp', arrowUp),
      ...withShiftSel('ArrowLeft', arrowLeft),
      ...withShiftSel('ArrowRight', arrowRight),
      ...withShiftSel('PageDown', pageDown),
      ...withShiftSel('PageUp', pageUp)
    },
    allowRepeats: true
  });
  // oxlint-disable react/react-compiler
  let {keyboardProps} = useKeyboard({
    shortcuts: {
      ...withShiftSel('Home', home),
      ...withShiftSel('End', end),
      'Mod+A': aHandler,
      Escape: escape,
      Tab: tab,
      'Tab+Shift': shiftTab
    }
  });
  // oxlint-enable react/react-compiler

  // Store the scroll position so we can restore it later.
  /// TODO: should this happen all the time??
  let scrollPos = {current: {top: 0, left: 0}};
  useEvent({get current() { return scrollRef().current; }}, 'scroll', () => {
    scrollPos.current = {
      top: scrollRef().current?.scrollTop ?? 0,
      left: scrollRef().current?.scrollLeft ?? 0
    };
  });

  let onFocus = useEffectEvent((e: FocusEvent) => {
    if (manager().isFocused) {
      // If a focus event bubbled through a portal, reset focus state.
      if (!nodeContains(e.currentTarget, getEventTarget(e))) {
        manager().setFocused(false);
      }
      return;
    }

    // Focus events can bubble through portals. Ignore these events.
    if (!nodeContains(e.currentTarget, getEventTarget(e))) {
      return;
    }

    let modality = getInteractionModality();
    manager().setFocused(true);
    let navigateToKey = (key: Key | undefined | null) => {
      if (key != null) {
        manager().setFocusedKey(key);
        if (selectOnFocus() && !manager().isSelected(key)) {
          manager().replaceSelection(key);
        }
      }
    };

    // we need the "virtual" modality case checks here because shift tabbing from the prompt field's attachment card back into the
    // thread is a virtual focus event (the tab handler in onKeyDown focuses the ref of the attachmentList aka TagGroup via a focus() call, hence the virtual modality)
    if (options.UNSTABLE_focusOnEntry && (modality === 'keyboard' || modality === 'virtual')) {
      // always go to the first item in the Thread when tabbing forwards/backwards into the collection
      // since it is probably more important to the user to see the new prompt reply rather than go to the last focused key
      navigateToKey(
        options.UNSTABLE_focusOnEntry === 'first' ? delegate().getFirstKey?.() : delegate().getLastKey?.()
      );
    } else if (manager().focusedKey == null) {
      // If the user hasn't yet interacted with the collection, there will be no focusedKey set.
      // Attempt to detect whether the user is tabbing forward or backward into the collection
      // and either focus the first or last item accordingly.
      let relatedTarget = e.relatedTarget as Element;
      if (
        relatedTarget &&
        e.currentTarget.compareDocumentPosition(relatedTarget) & Node.DOCUMENT_POSITION_FOLLOWING
      ) {
        navigateToKey(manager().lastSelectedKey ?? delegate().getLastKey?.());
      } else {
        navigateToKey(manager().firstSelectedKey ?? delegate().getFirstKey?.());
      }
    } else if (scrollRef().current) {
      // Restore the scroll position to what it was before.
      scrollRef().current!.scrollTop = scrollPos.current.top;
      scrollRef().current!.scrollLeft = scrollPos.current.left;
    }

    if (manager().focusedKey != null && scrollRef().current) {
      // Refocus and scroll the focused item into view if it exists within the scrollable region.
      let element = getItemElement(ref, manager().focusedKey!);
      if (element instanceof HTMLElement) {
        // This prevents a flash of focus on the first/last element in the collection, or the collection itself.
        if (!isFocusWithin(element) && !options.shouldUseVirtualFocus) {
          focusWithoutScrolling(element);
        }

        if (modality === 'keyboard' || (options.UNSTABLE_focusOnEntry && modality === 'virtual')) {
          scrollIntoViewport(element, {containingElement: ref.current});
        }
      }
    }
  });

  let onBlur = useEffectEvent((e: FocusEvent) => {
    // Don't set blurred and then focused again if moving focus within the collection.
    if (nodeContains(e.currentTarget, e.relatedTarget as HTMLElement)) {
      return;
    }
    if (e.relatedTarget == null) {
      let container = e.currentTarget as HTMLElement;
      let target = getEventTarget(e) as Element;
      // Native DOM removal emits focusout before the focused node detaches.
      // Let the collection's source focus recovery settle before distinguishing
      // that transition from an explicit blur to the body or an outside target.
      onSettled(() => settleBlur(container, target));
      return;
    }
    manager().setFocused(false);
  });
  let settleBlur = useEffectEvent((container: HTMLElement, target: Element) => {
    if (!container.isConnected) {
      return;
    }
    let activeElement = getActiveElement(container.ownerDocument);
    if (nodeContains(container, activeElement) ||
      (!target.isConnected && activeElement === container.ownerDocument.body)) {
      return;
    }
    manager().setFocused(false);
  });

  // Ref to track whether the first item in the collection should be automatically focused. Specifically used for autocomplete when user types
  // to focus the first key AFTER the collection updates.
  // TODO: potentially expand the usage of this
  let shouldVirtualFocusFirst = {current: false};
  // Add event listeners for custom virtual events. These handle updating the focused key in response to various keyboard events
  // at the autocomplete level
  // TODO: fix type later
  useEvent(
    ref,
    FOCUS_EVENT,
    (e: any) => {
           if (!options.shouldUseVirtualFocus) { return; }
          let {detail} = e;
          e.stopPropagation();
           manager().setFocused(true);
          // If the user is typing forwards, autofocus the first option in the list.
          if (detail?.focusStrategy === 'first') {
            shouldVirtualFocusFirst.current = true;
          }
        }
  );

  // update active descendant
  let firstKey = () => delegate().getFirstKey?.() ?? null;
  let focusFirstKey = createMemo(firstKey);
  let focusFirstSize = createMemo(() => manager().collection.size);
  createEffect(() => ({
    first: focusFirstKey(), size: focusFirstSize(), node: ref.current,
    // Source captures the manager for its first-key/size transition; changes
    // to isFocused must not consume a pending request on the old collection.
    manager: untrack(manager)
  }), ({first, size, manager, node}) => {
    if (shouldVirtualFocusFirst.current) {
      // If no focusable items exist in the list, make sure to clear any activedescendant that may still exist and move focus back to
      // the original active element (e.g. the autocomplete input)
      if (first == null) {
        let previousActiveElement = getActiveElement();
        moveVirtualFocus(node);
        dispatchVirtualFocus(previousActiveElement!, null);

        // If there wasn't a focusable key but the collection had items, then that means we aren't in an intermediate load state and all keys are disabled.
        // Reset shouldVirtualFocusFirst so that we don't erronously autofocus an item when the collection is filtered again.
        if (size > 0) {
          shouldVirtualFocusFirst.current = false;
        }
      } else {
        untrack(() => manager.setFocusedKey(first));
        // Only set shouldVirtualFocusFirst to false if we've successfully set the first key as the focused key
        // If there wasn't a key to focus, we might be in a temporary loading state so we'll want to still focus the first key
        // after the collection updates after load
        shouldVirtualFocusFirst.current = false;
      }
    }
  }, {defer: true});

  // reset focus first flag
  // Source resets only on a focused-key transition, not on collection size or
  // another field of the native manager's live bag changing. Capture size for
  // that transition's decision without subscribing the reset to size updates.
  let focusResetKey = createMemo(() => manager().focusedKey);
  createEffect(() => ({
    focusedKey: focusResetKey(),
    // This is the source callback's decision snapshot at the key transition,
    // not an extra trigger: source deliberately omits collection.size from deps.
    size: untrack(() => manager().collection.size)
  }), ({size}) => {
    // If user causes the focused key to change in any other way, clear shouldVirtualFocusFirst so we don't
    // accidentally move focus from under them. Skip this if the collection was empty because we might be in a load
    // state and will still want to focus the first item after load
    if (size > 0) {
      shouldVirtualFocusFirst.current = false;
    }
  }, {defer: true});

  useEvent(
    ref,
    CLEAR_FOCUS_EVENT,
    (e: any) => {
           if (!options.shouldUseVirtualFocus) { return; }
          e.stopPropagation();
           manager().setFocused(false);
          if (e.detail?.clearFocusKey) {
             manager().setFocusedKey(null);
          }
        }
  );

  const autoFocusRef = {current: untrack(() => options.autoFocus ?? false)};
  const didAutoFocusRef = {current: false};
  createEffect(() => {
    let current = manager();
    let selectedKeys = current.selectedKeys;
    let strategy = options.autoFocus;
    let focusedKey = strategy === 'first' ? delegate().getFirstKey?.() ?? null : strategy === 'last' ? delegate().getLastKey?.() ?? null : null;
    for (let key of selectedKeys) {
      if (current.canSelectItem(key)) { focusedKey = key; break; }
    }
    return {manager: current, selectedKeys, focusedKey, canSelect: focusedKey != null && current.canSelectItem(focusedKey), select: selectOnFocus(), virtual: options.shouldUseVirtualFocus, element: ref.current, size: current.collection.size};
  }, ({manager, selectedKeys, focusedKey, canSelect, select, virtual, element, size}) => {
    // React's mount effect runs after the collection ref is attached. Keep the
    // initial request pending until the tracked native ref reaches that boundary.
    if (autoFocusRef.current && element) {
      untrack(() => manager.setFocused(true));
      untrack(() => manager.setFocusedKey(focusedKey));

      if (
        focusedKey != null &&
        select &&
        !selectedKeys.size &&
        canSelect
      ) {
        untrack(() => manager.replaceSelection(focusedKey!));
      }

      // If no default focus key is selected, focus the collection itself.
      if (focusedKey == null && !virtual && element) {
        untrack(() => focusSafely(element));
      }

      // Wait until the collection has items to autofocus.
      if (size > 0) {
        autoFocusRef.current = false;
        didAutoFocusRef.current = true;
      }
    }
  });

  // Scroll the focused element into view when the focusedKey changes.
  let lastFocusedKey = {current: untrack(() => manager().focusedKey)};
  let raf = {current: null as number | null};
  let updateFocusedElement = useEffectEvent(() => {
    if (
      manager().isFocused &&
      manager().focusedKey != null &&
      (manager().focusedKey !== lastFocusedKey.current || didAutoFocusRef.current) &&
      scrollRef().current &&
      ref.current
    ) {
      let modality = getInteractionModality();
      let element = getItemElement(ref, manager().focusedKey!);
      if (!(element instanceof HTMLElement)) {
        // If item element wasn't found, return early (don't update autoFocusRef and lastFocusedKey).
        // The collection may initially be empty (e.g. virtualizer), so wait until the element exists.
        return;
      }

      if (modality === 'keyboard' || didAutoFocusRef.current) {
        if (raf.current) {
          cancelAnimationFrame(raf.current);
        }

        raf.current = requestAnimationFrame(() => {
          if (scrollRef().current) {
            scrollIntoView(scrollRef().current!, element);
            // Avoid scroll in iOS VO, since it may cause overlay to close (i.e. RAC submenu)
            if (modality !== 'virtual') {
              scrollIntoViewport(element, {containingElement: ref.current});
            }
          }
        });
      }
    }

    // If the focused key becomes null (e.g. the last item is deleted), focus the whole collection.
    if (
      !options.shouldUseVirtualFocus &&
      manager().isFocused &&
      manager().focusedKey == null &&
      lastFocusedKey.current != null &&
      ref.current
    ) {
      focusSafely(ref.current);
    }

    lastFocusedKey.current = manager().focusedKey;
    didAutoFocusRef.current = false;
  });
  createEffect(() => ({isFocused: manager().isFocused, focusedKey: manager().focusedKey, collection: manager().collection, scrollElement: scrollRef().current, element: ref.current, virtual: options.shouldUseVirtualFocus}), updateFocusedElement);

  onCleanup(() => {
      if (raf.current) {
        cancelAnimationFrame(raf.current);
      }
  });

  // Intercept FocusScope restoration since virtualized collections can reuse DOM nodes.
  useEvent(ref, 'react-aria-focus-scope-restore', e => {
    e.preventDefault();
    manager().setFocused(true);
  });

  let handlers = {
    onFocusIn: onFocus,
    onFocusOut: onBlur,
    onMouseDown(e: MouseEvent) {
      // Ignore events that bubbled through portals.
      if (scrollRef().current === getEventTarget(e)) {
        // Prevent focus going to the collection when clicking on the scrollbar.
        e.preventDefault();
      }
    }
  };

  let {typeSelectProps} = useTypeSelect({
    ref,
    get isDisabled() { return options.disallowTypeAhead; },
    get keyboardDelegate() { return delegate(); },
    get selectionManager() { return manager(); }
  });

  // If nothing is focused within the collection, make the collection itself tabbable.
  // This will be marshalled to either the first or last item depending on where focus came from.
  let collectionId = useCollectionId(() => manager().collection);
  return {
    // oxlint-disable-next-line react/react-compiler
    collectionProps: mergeProps({
      get ref() { return options.disallowTypeAhead ? undefined : typeSelectProps.ref; },
      get onKeyDown() { return options.disallowTypeAhead ? undefined : typeSelectProps.onKeyDown; }
    }, keyboardProps, repeatKeyboardProps, handlers, {
      get tabIndex() { return options.shouldUseVirtualFocus ? undefined : manager().focusedKey == null ? 0 : -1; },
      get 'data-collection'() { return collectionId(); }
    })
  };
}
