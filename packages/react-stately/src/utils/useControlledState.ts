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

import {Accessor, createEffect, createRenderEffect, createSignal, untrack} from 'solid-js';

type SetStateAction<T> = T | ((previous: T) => T);

export function useControlledState<T, C = T>(
  value: Exclude<T, undefined> | Accessor<Exclude<T, undefined>>,
  defaultValue: Exclude<T, undefined> | undefined,
  onChange?: (v: C, ...args: any[]) => void
): [Accessor<T>, (value: SetStateAction<T>, ...args: any[]) => void];
export function useControlledState<T, C = T>(
  value: Exclude<T, undefined> | undefined | Accessor<Exclude<T, undefined> | undefined>,
  defaultValue: Exclude<T, undefined>,
  onChange?: (v: C, ...args: any[]) => void
): [Accessor<T>, (value: SetStateAction<T>, ...args: any[]) => void];
export function useControlledState<T, C = T>(
  value: T | undefined | Accessor<T | undefined>,
  defaultValue: T | undefined,
  onChange?: (v: C, ...args: any[]) => void
): [Accessor<T>, (value: SetStateAction<T>, ...args: any[]) => void] {
  // Store the value in both state and a ref. The state value will only be used when uncontrolled.
  // The ref is used to track the most current value, which is passed to the function setState callback.
  let externalValue = typeof value === 'function' ? value as Accessor<T | undefined> : () => value;
  let initialValue = untrack(externalValue);
  let [stateValue, setStateValue] = createSignal<T>((initialValue || defaultValue) as Exclude<T, Function>);
  let currentValue = () => {
    let value = externalValue();
    return value !== undefined ? value as T : stateValue();
  };
  let valueRef = untrack(currentValue);

  let wasControlled = initialValue !== undefined;
  createEffect(() => externalValue() !== undefined, isControlled => {
    if (wasControlled !== isControlled && process.env.NODE_ENV !== 'production') {
      console.warn(
        `WARN: A component changed from ${wasControlled ? 'controlled' : 'uncontrolled'} to ${isControlled ? 'controlled' : 'uncontrolled'}.`
      );
    }
    wasControlled = isControlled;
  });

  // Reset proposals when an external value or a local request commits.
  let [revision, setRevision] = createSignal(0);
  createRenderEffect(() => {
    revision();
    return currentValue();
  }, value => { valueRef = value; });

  let setValue =
    (value: SetStateAction<T>, ...args: any[]) => {
      let newValue = typeof value === 'function' ? (value as (previous: T) => T)(valueRef) : value;
      if (!Object.is(valueRef, newValue)) {
        // Update the ref so that the next setState callback has the most recent value.
        valueRef = newValue;

        setStateValue(() => newValue);

        // Also invalidate the reset effect when a controlled parent refuses the request.
        setRevision(previous => previous + 1);
        // Held updates need the same next-turn reset as an abandoned source render.
        // Keep proposals only for the current synchronous event.
        queueMicrotask(() => { valueRef = untrack(currentValue); });

        // Trigger onChange. Note that if setState is called multiple times in a single event,
        // onChange will be called for each one instead of only once.
        onChange?.(newValue as unknown as C, ...args);
      }
    };

  return [currentValue, setValue];
}
