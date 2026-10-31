/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {getFocusableTreeWalker} from './FocusScope';
import {RefObject} from '@react-types/shared';
import {Accessor, createEffect, createSignal} from 'solid-js';
import {getOwnerWindow} from '../utils/domHelpers';

interface AriaHasTabbableChildOptions {
  isDisabled?: boolean;
}

// This was created for a special empty case of a component that can have child or
// be empty, like Collection/Virtualizer/Table/ListView/etc. When these components
// are empty they can have a message with a tabbable element, which is like them
// being not empty, when it comes to focus and tab order.

/**
 * Returns whether an element has a tabbable child, and updates as children change.
 *
 * @private
 */
export function useHasTabbableChild(
  ref: RefObject<Element | null>,
  options?: AriaHasTabbableChildOptions
): Accessor<boolean> {
  let [hasTabbableChild, setHasTabbableChild] = createSignal(false);

  createEffect(() => ({element: ref?.current, isDisabled: options?.isDisabled}), ({element, isDisabled}) => {
    if (element && !isDisabled) {
      let active = true;
      let update = () => {
        if (active) {
          let walker = getFocusableTreeWalker(element, {tabbable: true});
          setHasTabbableChild(!!walker.nextNode());
        }
      };

      update();

      // Update when new elements are inserted, or the tabIndex/disabled attribute updates.
      let observer = new (getOwnerWindow(element).MutationObserver)(update);
      observer.observe(element, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ['tabIndex', 'disabled']
      });

      return () => {
        // Retired observers must not publish into a replacement host or owner.
        active = false;
        observer.disconnect();
      };
    }
  });

  return () => options?.isDisabled ? false : hasTabbableChild();
}
