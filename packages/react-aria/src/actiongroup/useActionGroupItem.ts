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
import {ListState} from 'react-stately/useListState';
import {mergeProps} from '../utils/mergeProps';
import {PressProps} from '../interactions/usePress';
import {onCleanup, untrack} from 'solid-js';

export interface AriaActionGroupItemProps {
  key: Key;
}

export interface ActionGroupItemAria {
  buttonProps: DOMAttributes & PressProps;
}

const BUTTON_ROLES = {
  none: undefined,
  single: 'radio',
  multiple: 'checkbox'
} as const;

export function useActionGroupItem<T>(
  props: AriaActionGroupItemProps,
  state: ListState<T>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ref?: RefObject<FocusableElement | null>
): ActionGroupItemAria {
  let isFocused = () => props.key === state.selectionManager.focusedKey;
  onCleanup(() => untrack(() => {
    if (isFocused()) {
      state.selectionManager.setFocusedKey(null);
    }
  }));

  return {
    buttonProps: mergeProps({
      get role() {return BUTTON_ROLES[state.selectionManager.selectionMode];},
      get 'aria-checked'() {
        return state.selectionManager.selectionMode !== 'none'
          ? state.selectionManager.isSelected(props.key) ? 'true' as const : 'false' as const : undefined;
      },
      get tabIndex() {return isFocused() || state.selectionManager.focusedKey == null ? 0 : -1;},
      onFocus() {
        state.selectionManager.setFocusedKey(props.key);
      },
      onPress() {
        state.selectionManager.select(props.key);
      }
    })
  };
}
