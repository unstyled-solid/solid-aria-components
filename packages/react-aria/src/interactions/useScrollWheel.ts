/*
 * Copyright 2021 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {RefObject, ScrollEvents} from '@react-types/shared';
import {createEffect} from 'solid-js';

export interface ScrollWheelProps extends ScrollEvents {
  /** Whether the scroll listener should be disabled. */
  isDisabled?: boolean;
}

// scroll wheel needs to be added not passively so it's cancelable, small helper hook to remember that
export function useScrollWheel(props: ScrollWheelProps, ref: RefObject<HTMLElement | null>): void {
  let onScrollHandler = (e: WheelEvent) => {
      // If the ctrlKey is pressed, this is a zoom event, do nothing.
      if (e.ctrlKey) {
        return;
      }

      // stop scrolling the page
      e.preventDefault();
      e.stopPropagation();

      if (props.onScroll) {
        props.onScroll({deltaX: e.deltaX, deltaY: e.deltaY});
      }
    };

  createEffect(() => ({element: ref.current, disabled: props.isDisabled}), ({element, disabled}) => {
    if (!element || disabled) {return;}
    element.addEventListener('wheel', onScrollHandler, {passive: false});
    return () => element.removeEventListener('wheel', onScrollHandler);
  });
}
