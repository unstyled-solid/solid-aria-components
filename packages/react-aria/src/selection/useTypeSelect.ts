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

import {DOMAttributes, Key, KeyboardDelegate} from '@react-types/shared';
import {getEventTarget, nodeContains} from '../utils/shadowdom/DOMFunctions';
import {RefObject, FocusableElement} from '@react-types/shared';
import {createEffect, onCleanup} from 'solid-js';
import {useObjectRef} from '../utils/useObjectRef';
import {MultipleSelectionManager} from 'react-stately/useMultipleSelectionState';

/**
 * Controls how long to wait before clearing the typeahead buffer.
 */
const TYPEAHEAD_DEBOUNCE_WAIT_MS = 1000; // 1 second

export interface AriaTypeSelectOptions {
  /** Collection host used for the native capture-phase listener. */
  ref?: RefObject<HTMLElement | null>;
  isDisabled?: boolean;
  /**
   * A delegate that returns collection item keys with respect to visual layout.
   */
  keyboardDelegate: KeyboardDelegate;
  /**
   * An interface for reading and updating multiple selection state.
   */
  selectionManager: MultipleSelectionManager;
  /**
   * Called when an item is focused by typing.
   */
  onTypeSelect?: (key: Key) => void;
}

export interface TypeSelectAria {
  /**
   * Props to be spread on the owner of the options.
   */
  typeSelectProps: DOMAttributes;
}

/**
 * Handles typeahead interactions with collections.
 */
export function useTypeSelect(options: AriaTypeSelectOptions): TypeSelectAria {
  let captureRef = useObjectRef<FocusableElement>();
  let state = {current: {
    search: '',
    timeout: undefined as ReturnType<typeof setTimeout> | undefined
  }};

  let onKeyDownCapture = (e: KeyboardEvent) => {
    if (options.isDisabled) { return; }
    // if we're in the middle of a search, then a spacebar should be treated as a search and we should not propagate the event
    // since we handle this one in a capture phase, we should ignore it in the bubble phase
    if (state.current.search.length > 0 && e.key === ' ') {
      e.preventDefault();
      if (
        !('continuePropagation' in e) ||
          ('continuePropagation' in e && !(e as unknown as KeyboardEvent & {isPropagationStopped(): boolean}).isPropagationStopped())
      ) {
        e.stopPropagation();
      }
      state.current.search += ' ';

      if (options.keyboardDelegate.getKeyForSearch != null) {
        // Use the delegate to find a key to focus.
        // Prioritize items after the currently focused item, falling back to searching the whole list.
        let key = options.keyboardDelegate.getKeyForSearch(
          state.current.search,
          options.selectionManager.focusedKey
        );

        // If no key found, search from the top.
        if (key == null) {
          key = options.keyboardDelegate.getKeyForSearch(state.current.search);
        }

        if (key != null) {
          options.selectionManager.setFocusedKey(key);
          if (options.onTypeSelect) {
            options.onTypeSelect(key);
          }
        }
      }

      clearTimeout(state.current.timeout);
      state.current.timeout = setTimeout(() => {
        state.current.search = '';
      }, TYPEAHEAD_DEBOUNCE_WAIT_MS);
    }
  };

  let onKeyDown = (e: KeyboardEvent) => {
    if (options.isDisabled) { return; }
    let character = getStringForKey(e.key);
    if (
      !character ||
      e.ctrlKey ||
      e.metaKey ||
      e.altKey ||
      !nodeContains(e.currentTarget as Node | null, getEventTarget(e) as HTMLElement) ||
      (state.current.search.length === 0 && character === ' ')
    ) {
      return;
    }

    state.current.search += character;

    if (options.keyboardDelegate.getKeyForSearch != null) {
      // Use the delegate to find a key to focus.
      // Prioritize items after the currently focused item, falling back to searching the whole list.
      let key = options.keyboardDelegate.getKeyForSearch(state.current.search, options.selectionManager.focusedKey);

      if (key == null) {
        key = options.keyboardDelegate.getKeyForSearch(state.current.search);
      }

      if (key != null) {
        options.selectionManager.setFocusedKey(key);
        if (options.onTypeSelect) {
          options.onTypeSelect(key);
        }
        e.preventDefault();
        if (!('continuePropagation' in e)) {
          e.stopPropagation();
        }
      } else {
        // if still nothing then the type to select is done and everything is reset
        state.current.search = '';
        clearTimeout(state.current.timeout);
        state.current.timeout = undefined;
        return;
      }
    }

    clearTimeout(state.current.timeout);
    state.current.timeout = setTimeout(() => {
      state.current.search = '';
    }, TYPEAHEAD_DEBOUNCE_WAIT_MS);
  };

  onCleanup(() => clearTimeout(state.current.timeout));
  createEffect(() => ({element: options.ref?.current ?? captureRef.current, enabled: !options.isDisabled && Boolean(options.keyboardDelegate.getKeyForSearch)}), ({element, enabled}) => {
    if (!element || !enabled) { return; }
    element.addEventListener('keydown', onKeyDownCapture as EventListener, true);
    return () => element.removeEventListener('keydown', onKeyDownCapture as EventListener, true);
  });

  return {
    typeSelectProps: {
      // Using a capturing listener to catch the keydown event before
      // other hooks in order to handle the Spacebar event.
      ref: captureRef,
      get onKeyDown() { return options.keyboardDelegate.getKeyForSearch ? onKeyDown : undefined; }
    }
  };
}

function getStringForKey(key: string) {
  // If the key is of length 1, it is an ASCII value.
  // Otherwise, if there are no ASCII characters in the key name,
  // it is a Unicode character.
  // See https://www.w3.org/TR/uievents-key/
  if (key.length === 1 || !/^[A-Z]/i.test(key)) {
    return key;
  }

  return '';
}
