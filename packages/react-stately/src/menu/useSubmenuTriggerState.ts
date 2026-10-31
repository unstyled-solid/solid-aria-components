/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {FocusStrategy, Key} from '@react-types/shared';
import type {OverlayTriggerState} from '../overlays/useOverlayTriggerState';
import {RootMenuTriggerState} from './useMenuTriggerState';
import {createSignal, untrack} from 'solid-js';

export interface SubmenuTriggerProps {
  /** Key of the trigger item. */
  triggerKey: Key;
}

export interface SubmenuTriggerState extends OverlayTriggerState {
  /** Whether the submenu is currently open. */
  isOpen: boolean;
  /** Controls which item will be auto focused when the submenu opens. */
  focusStrategy: FocusStrategy | null;
  /** Opens the submenu. */
  open: (focusStrategy?: FocusStrategy | null) => void;
  /** Closes the submenu. */
  close: () => void;
  /** Closes all menus and submenus in the menu tree. */
  closeAll: () => void;
  /** The level of the submenu. */
  submenuLevel: number;
  /** Toggles the submenu. */
  toggle: (focusStrategy?: FocusStrategy | null) => void;
  /** @private */
  setOpen: () => void;
}

/**
 * Manages state for a submenu trigger. Tracks whether the submenu is currently open, the level of
 * the submenu, and controls which item will receive focus when it opens.
 */
export function useSubmenuTriggerState(
  props: SubmenuTriggerProps,
  state: RootMenuTriggerState
): SubmenuTriggerState {
  let submenuLevel = untrack(() => state.expandedKeysStack.length);
  let isOpen = () => state.expandedKeysStack[submenuLevel] === props.triggerKey;
  let [focusStrategy, setFocusStrategy] = createSignal<FocusStrategy | null>(null);
  // Retain accepted local requests while Solid stages the root stack update.
  let pending: {key: Key; isOpen: boolean} | undefined;
  let request = (isOpen: boolean) => {
    let current = pending = {key: props.triggerKey, isOpen};
    queueMicrotask(() => {if (pending === current) {pending = undefined;}});
  };

  let open =
    (focusStrategy?: FocusStrategy | null) => {
      setFocusStrategy(focusStrategy ?? null);
      request(true);
      state.openSubmenu(props.triggerKey, submenuLevel);
    };

  let close = () => {
    setFocusStrategy(null);
    request(false);
    state.closeSubmenu(props.triggerKey, submenuLevel);
  };

  let toggle =
    (focusStrategy?: FocusStrategy | null) => {
      setFocusStrategy(focusStrategy ?? null);
      if (pending?.key === props.triggerKey ? pending.isOpen : isOpen()) {
        close();
      } else {
        open(focusStrategy);
      }
    };

  return {
      get focusStrategy() {return focusStrategy();},
      get isOpen() {return isOpen();},
      open,
      close,
      closeAll() {request(false); state.close();},
      submenuLevel,
      // TODO: Placeholders that aren't used but give us parity with OverlayTriggerState so we can use this in Popover. Refactor if we update Popover via
      // https://github.com/adobe/react-spectrum/pull/4976#discussion_r1336472863
      setOpen: () => {},
      toggle,
      point: null,
      setPoint: () => {}
    };
}
