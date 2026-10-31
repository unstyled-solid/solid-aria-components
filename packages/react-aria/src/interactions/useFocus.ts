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

// Portions of the code in this file are based on code from react.
// Original licensing for the following can be found in the
// NOTICE file in the root directory of this source tree.
// See https://github.com/facebook/react/tree/cc7c1aece46a6b69b41958d731e0fd27c94bfc6c/packages/react-interactions

import {DOMAttributes, FocusableElement, FocusEvents} from '@react-types/shared';
import type {FocusEvent} from './utils';
import {getActiveElement, getEventTarget} from '../utils/shadowdom/DOMFunctions';
import {getOwnerDocument} from '../utils/domHelpers';
import {createSyntheticEvent, useSyntheticBlurEvent} from './utils';
import {useEffectEvent} from '../utils/useEffectEvent';

export interface FocusProps<Target = FocusableElement> extends FocusEvents<Target> {
  /** Whether the focus events should be disabled. */
  isDisabled?: boolean;
}

export interface FocusResult<Target = FocusableElement> {
  /** Props to spread onto the target element. */
  focusProps: DOMAttributes<Target>;
}

/**
 * Handles focus events for the immediate target.
 * Focus events on child elements will be ignored.
 */
export function useFocus<Target extends FocusableElement = FocusableElement>(
  props: FocusProps<Target>
): FocusResult<Target> {
  const onBlur: FocusProps<Target>['onBlur'] =
    useEffectEvent((e: FocusEvent<Target>) => {
      if (getEventTarget(e) === e.currentTarget) {
        if (props.onBlur) {
          props.onBlur(e);
        }

        if (props.onFocusChange) {
          props.onFocusChange(false);
        }

        return true;
      }
    });

  const onSyntheticFocus = useSyntheticBlurEvent<Target>(onBlur);

  const onFocus: FocusProps<Target>['onFocus'] =
    useEffectEvent((e: FocusEvent<Target>) => {
      // Double check that document.activeElement actually matches e.target in case a previously chained
      // focus handler already moved focus somewhere else.

      let eventTarget = getEventTarget(e);
      const ownerDocument = getOwnerDocument(eventTarget);
      const activeElement = ownerDocument ? getActiveElement(ownerDocument) : getActiveElement();
      if (eventTarget === e.currentTarget && eventTarget === activeElement) {
        if (props.onFocus) {
          props.onFocus(e);
        }

        if (props.onFocusChange) {
          props.onFocusChange(true);
        }

        onSyntheticFocus(e);
      }
    });

  const focusIn = (e: FocusEvent<Target>) => onFocus(createSyntheticEvent<FocusEvent<Target>>(e));
  const focusOut = (e: FocusEvent<Target>) => {
    // The source disabled-element fallback delivers this blur from its target
    // listener. Native focusout also bubbles, unlike React's disabled blur.
    let target = getEventTarget(e);
    if (target && 'disabled' in target && target.disabled) { return; }
    onBlur(createSyntheticEvent<FocusEvent<Target>>(e));
  };

  return {
    focusProps: {
      get onFocusIn() { return !props.isDisabled && (props.onFocus || props.onFocusChange || props.onBlur) ? focusIn : undefined; },
      get onFocusOut() { return !props.isDisabled && (props.onBlur || props.onFocusChange) ? focusOut : undefined; }
    }
  };
}
