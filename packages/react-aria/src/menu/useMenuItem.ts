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
  DOMAttributes,
  DOMProps,
  FocusableElement,
  FocusEvents,
  HoverEvents,
  Key,
  KeyboardEvents,
  PressEvent,
  PressEvents,
  RefObject
} from '@react-types/shared';
import {filterDOMProps} from '../utils/filterDOMProps';
import {getEventTarget} from '../utils/shadowdom/DOMFunctions';
import {getItemCount} from 'react-stately/private/collections/getItemCount';
import {handleLinkClick, useLinkProps, useRouter} from '../utils/openLink';
import {isFocusVisible, setInteractionModality} from '../interactions/useFocusVisible';
import {menuData} from './utils';
import {mergeProps} from '../utils/mergeProps';
import {merge, omit, type Accessor} from 'solid-js';
import {SelectionManager} from 'react-stately/private/selection/SelectionManager';
import {TreeState} from 'react-stately/useTreeState';
import {useFocusable} from '../interactions/useFocusable';
import {useHover} from '../interactions/useHover';
import {useKeyboard} from '../interactions/useKeyboard';
import {usePress} from '../interactions/usePress';
import {useSelectableItem} from '../selection/useSelectableItem';
import {useSlotId} from '../utils/useId';

export interface MenuItemAria {
  /** Props for the menu item element. */
  menuItemProps: DOMAttributes;

  /** Props for the main text element inside the menu item. */
  labelProps: DOMAttributes;

  /** Props for the description text element inside the menu item, if any. */
  descriptionProps: DOMAttributes;

  /** Props for the keyboard shortcut text element inside the item, if any. */
  keyboardShortcutProps: DOMAttributes;

  /** Whether the item is currently focused. */
  isFocused: Accessor<boolean>;
  /** Whether the item is keyboard focused. */
  isFocusVisible: Accessor<boolean>;
  /** Whether the item is currently selected. */
  isSelected: Accessor<boolean>;
  /** Whether the item is currently in a pressed state. */
  isPressed: Accessor<boolean>;
  /** Whether the item is disabled. */
  isDisabled: Accessor<boolean>;
}

export interface AriaMenuItemProps
  extends DOMProps, PressEvents, HoverEvents, KeyboardEvents, FocusEvents {
  /**
   * Whether the menu item is disabled.
   *
   * @deprecated - pass disabledKeys to useTreeState instead.
   */
  isDisabled?: boolean;

  /**
   * Whether the menu item is selected.
   *
   * @deprecated - pass selectedKeys to useTreeState instead.
   */
  isSelected?: boolean;

  /** A screen reader only label for the menu item. */
  'aria-label'?: string;

  /** The unique key for the menu item. */
  key: Key;

  /**
   * Handler that is called when the menu should close after selecting an item.
   *
   * @deprecated - pass to the menu instead.
   */
  onClose?: () => void;

  /**
   * Whether the menu should close when the menu item is selected.
   *
   * @deprecated - use shouldCloseOnSelect instead.
   */
  closeOnSelect?: boolean;

  /** Whether the menu should close when the menu item is selected. */
  shouldCloseOnSelect?: boolean;

  /** Whether the menu item is contained in a virtual scrolling menu. */
  isVirtualized?: boolean;

  /**
   * Handler that is called when the user activates the item.
   *
   * @deprecated - pass to the menu instead.
   */
  onAction?: (key: Key) => void;

  /** What kind of popup the item opens. */
  'aria-haspopup'?: 'menu' | 'dialog';

  /** Indicates whether the menu item's popup element is expanded or collapsed. */
  'aria-expanded'?: boolean | 'true' | 'false';

  /**
   * Identifies the menu item's popup element whose contents or presence is controlled by the menu
   * item.
   */
  'aria-controls'?: string;

  /** Identifies the element(s) that describe the menu item. */
  'aria-describedby'?: string;

  /** Override of the selection manager. By default, `state.selectionManager` is used. */
  selectionManager?: SelectionManager;
}

/**
 * Provides the behavior and accessibility implementation for an item in a menu.
 * See `useMenu` for more details about menus.
 *
 * @param props - Props for the item.
 * @param state - State for the menu, as returned by `useTreeState`.
 */
export function useMenuItem<T>(
  props: AriaMenuItemProps,
  state: TreeState<T>,
  ref: RefObject<FocusableElement | null>
): MenuItemAria {
  let selectionManager = () => props.selectionManager ?? state.selectionManager;
  let hasPopup = () => props['aria-haspopup'];
  let isTrigger = () => !!hasPopup();
  let isTriggerExpanded = () => isTrigger() && props['aria-expanded'] === 'true';
  let isDisabled = () => props.isDisabled ?? selectionManager().isDisabled(props.key);
  let isSelected = () => props.isSelected ?? selectionManager().isSelected(props.key);
  let data = menuData.get(state)!;
  let item = () => state.collection.getItem(props.key);
  let onClose = () => props.onClose || data.onClose;
  let router = useRouter();
  let performAction = () => {
    if (isTrigger()) {
      return;
    }

    if (item()?.props?.onAction) {
      item()!.props.onAction();
    } else if (props.onAction) {
      props.onAction(props.key);
    }

    if (data.onAction) {
      // Must reassign to variable otherwise `this` binding gets messed up. Something to do with WeakMap.
      let onAction = data.onAction;
      onAction(props.key, item()?.value);
    }
  };

  let role = () => {
  let role = 'menuitem';
  if (!isTrigger()) {
    if (selectionManager().selectionMode === 'single') {
      role = 'menuitemradio';
    } else if (selectionManager().selectionMode === 'multiple') {
      role = 'menuitemcheckbox';
    }
  }
  return role;
  };

  let labelId = useSlotId();
  let descriptionId = useSlotId();
  let keyboardId = useSlotId();

  let ariaProps = {
    get id() {return props.id;},
    get 'aria-disabled'() {return isDisabled() ? 'true' : undefined;},
    get role() {return role();},
    get 'aria-label'() {return props['aria-label'];},
    get 'aria-labelledby'() {return labelId();},
    get 'aria-describedby'() {return [props['aria-describedby'], descriptionId(), keyboardId()].filter(Boolean).join(' ') || undefined;},
    get 'aria-controls'() {return props['aria-controls'];},
    get 'aria-haspopup'() {return hasPopup();},
    get 'aria-expanded'() {let value = props['aria-expanded']; return typeof value === 'boolean' ? String(value) as 'true' | 'false' : value;},
    get 'aria-checked'() {return selectionManager().selectionMode !== 'none' && !isTrigger() ? isSelected() ? 'true' : 'false' : undefined;},
    get 'aria-posinset'() {let index = Number(item()?.index); return props.isVirtualized && !Number.isNaN(index) ? index + 1 : undefined;},
    get 'aria-setsize'() {return props.isVirtualized ? getItemCount(state.collection) : undefined;}
  };

  let isPressedRef = {current: false};
  let onPressChange = (isPressed: boolean) => {
    props.onPressChange?.(isPressed);
    isPressedRef.current = isPressed;
  };

  let interaction: {current: {pointerType: string; key?: string} | null} = {current: null};
  let onPressUp = (e: PressEvent) => {
    if (e.pointerType !== 'keyboard') {
      interaction.current = {pointerType: e.pointerType};
    }

    // If interacting with mouse, allow the user to mouse down on the trigger button,
    // drag, and release over an item (matching native behavior).
    if (e.pointerType === 'mouse') {
      if (!isPressedRef.current) {
        (e.target as HTMLElement).click();
      }
    }

    props.onPressUp?.(e);
  };

  let onClick = (e: import('@react-types/shared').MouseEvent<FocusableElement>) => {
    props.onClick?.(e);
    performAction();
    handleLinkClick(e, router, item()!.props.href, item()?.props.routerOptions);

    let shouldClose =
      interaction.current?.pointerType === 'keyboard'
        ? // Always close when pressing Enter key, or if item is not selectable.
          interaction.current?.key === 'Enter' ||
           selectionManager().selectionMode === 'none' ||
           selectionManager().isLink(props.key)
        : // Close except if multi-select is enabled.
           selectionManager().selectionMode !== 'multiple' || selectionManager().isLink(props.key);

    shouldClose = props.shouldCloseOnSelect ?? props.closeOnSelect ?? shouldClose;

    if (onClose() && !isTrigger() && shouldClose) {
      onClose()!();
    }

    interaction.current = null;
  };

  let {itemProps, isFocused} = useSelectableItem({
    get id() {return props.id;},
    get selectionManager() {return selectionManager();},
    get key() {return props.key;},
    ref,
    shouldSelectOnPressUp: true,
    allowsDifferentPressOrigin: true,
    // Disable all handling of links in useSelectable item
    // because we handle it ourselves. The behavior of menus
    // is slightly different from other collections because
    // actions are performed on key down rather than key up.
    linkBehavior: 'none',
    get shouldUseVirtualFocus() {return data.shouldUseVirtualFocus;}
  });

  let {pressProps, isPressed} = usePress({
    get onPressStart() {return props.onPressStart;},
    get onPress() {return props.onPress;},
    onPressUp,
    onPressChange,
    get onPressEnd() {return props.onPressEnd;},
    get isDisabled() {return isDisabled();}
  });
  let {hoverProps} = useHover({
    get isDisabled() {return isDisabled();},
    onHoverStart(e) {
      // Hovering over an already expanded sub dialog trigger should keep focus in the dialog.
      if (!isFocusVisible() && !(isTriggerExpanded() && hasPopup())) {
        selectionManager().setFocused(true);
        selectionManager().setFocusedKey(props.key);
      }
      props.onHoverStart?.(e);
    },
    get onHoverChange() {return props.onHoverChange;},
    get onHoverEnd() {return props.onHoverEnd;}
  });

  let {keyboardProps} = useKeyboard({
    shortcuts: {
      ' ': e => {
        interaction.current = {pointerType: 'keyboard', key: ' '};
        (getEventTarget(e) as HTMLElement).click();

        // click above sets modality to "virtual", need to set interaction modality back to 'keyboard' so focusSafely calls properly move focus
        // to the newly opened submenu's first item.
        setInteractionModality('keyboard');
      },
      Enter: e => {
        interaction.current = {pointerType: 'keyboard', key: 'Enter'};
        let target = getEventTarget(e) as HTMLElement;

        // Trigger click unless this is a link. Links with real DOM focus activate on Enter natively.
        // With virtual focus (e.g. Autocomplete) focus stays on the input and useAutocomplete dispatches
        // keydown here then follows with a synthetic click only if dispatchEvent was not canceled—so
        // links must not preventDefault on that keydown.
        if (target.tagName !== 'A') {
          target.click();
          setInteractionModality('keyboard');
          return;
        }

        setInteractionModality('keyboard');
        return {shouldPreventDefault: false, shouldContinuePropagation: false};
      }
    },
    get onKeyDown() {return props.onKeyDown;},
    get onKeyUp() {return props.onKeyUp;}
  });

  let {focusableProps} = useFocusable({get onBlur() {return props.onBlur;}, get onFocus() {return props.onFocus;}, get onFocusChange() {return props.onFocusChange;}}, ref);
  let itemDOMProps = new Proxy({}, {
    get(_target, key) {return item()?.props?.[key];},
    has(_target, key) {return key in (item()?.props ?? {});},
    ownKeys() {return Reflect.ownKeys(item()?.props ?? {});},
    getOwnPropertyDescriptor(_target, key) {return key in (item()?.props ?? {}) ? {enumerable: true, configurable: true} : undefined;}
  });
  let domProps = omit(filterDOMProps(itemDOMProps), 'id');
  let linkProps = useLinkProps(itemDOMProps);

  return {
    menuItemProps: merge(mergeProps(ariaProps,
        domProps,
        linkProps,
        omit(itemProps, key => isTrigger() && !['onFocus', 'data-collection', 'data-key'].includes(String(key))),
        pressProps,
        hoverProps,
        keyboardProps,
        focusableProps,
        // Prevent DOM focus from moving on mouse down when using virtual focus or this is a submenu/subdialog trigger.
        {get onMouseDown() {return data.shouldUseVirtualFocus || isTrigger() ? (e: MouseEvent) => e.preventDefault() : undefined;}},
        // oxlint-disable-next-line react/react-compiler
        {get onClick() {return isDisabled() ? undefined : onClick;}}), {
      // If a submenu is expanded, set the tabIndex to -1 so that shift tabbing goes out of the menu instead of the parent menu item.
       get tabIndex() {return (
         itemProps.tabIndex != null && isTriggerExpanded() && !data.shouldUseVirtualFocus
          ? -1
           : itemProps.tabIndex);}
    }),
    labelProps: {
      get id() {return labelId();}
    },
    descriptionProps: {
      get id() {return descriptionId();}
    },
    keyboardShortcutProps: {
      get id() {return keyboardId();}
    },
    isFocused,
    isFocusVisible: () => isFocused() && selectionManager().isFocused && isFocusVisible() && !isTriggerExpanded(),
    isSelected,
    isPressed,
    isDisabled
  };
}
