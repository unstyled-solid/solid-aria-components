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

import {BaseEvent} from '@react-types/shared';
/** Native events may carry the source adapter's query/propagation methods. */
export interface SourceEvent extends Event {
  nativeEvent?: SourceEvent;
  isDefaultPrevented?: () => boolean;
  isPropagationStopped?: () => boolean;
  continuePropagation?: () => void;
}

/**
 * This function wraps a native/source event handler to make stopPropagation the default, and support
 * continuePropagation instead.
 */
export function createEventHandler<T extends SourceEvent>(
  handler?: (e: BaseEvent<T>) => void
): ((e: T) => void) | undefined {
  if (!handler) {
    return undefined;
  }

  return (e: T) => {
    let shouldStopPropagation = true;
    let event: BaseEvent<T> = {
      ...e,
      preventDefault() {
        e.preventDefault();
      },
      isDefaultPrevented() {
        return e.isDefaultPrevented?.() ?? e.defaultPrevented;
      },
      stopPropagation() {
        if (shouldStopPropagation && process.env.NODE_ENV !== 'production') {
          console.error(
            'stopPropagation is now the default behavior for events in React Spectrum. You can use continuePropagation() to revert this behavior.'
          );
        } else {
          shouldStopPropagation = true;
        }
      },
      continuePropagation() {
        shouldStopPropagation = false;
        // nested createEventHandler might have set continue propagation so we should continue
        // propagation on wrappers
        if (typeof e.continuePropagation === 'function') {
          e.continuePropagation();
        }
      },
      isPropagationStopped() {
        return shouldStopPropagation;
      }
    };

    handler(event);

    // A native useKeyboard boundary may adapt an existing source wrapper.
    // Its nativeEvent is then that wrapper, whose live propagation policy must
    // take precedence over the adapter's snapshot of DOM cancelBubble.
    let propagationEvent = typeof e.nativeEvent?.continuePropagation === 'function'
      ? e.nativeEvent
      : e;
    // nested createEventHandler calls may already have stopped propagation
    if (
      shouldStopPropagation &&
      !(typeof propagationEvent.isPropagationStopped === 'function' && propagationEvent.isPropagationStopped())
    ) {
      propagationEvent.stopPropagation();
    }
  };
}
