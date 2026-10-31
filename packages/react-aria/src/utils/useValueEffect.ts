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

import {createEffect, createSignal, onCleanup, onSettled, untrack, type Accessor} from 'solid-js';

type SetValueAction<S> = (prev: S) => Generator<S, void, unknown>;

// This hook works like `useState`, but when setting the value, you pass a generator function
// that can yield multiple values. Each yielded value updates the state and waits for the next
// layout effect, then continues the generator. This allows sequential updates to state to be
// written linearly.
export function useValueEffect<S>(defaultValue: S | (() => S)): [Accessor<S>, (fn: SetValueAction<S>) => void] {
  // Function defaults retain source lazy-initializer semantics, rather than
  // becoming a native writable derivation.
  let initial = untrack(() => typeof defaultValue === 'function'
    ? (defaultValue as () => S)() : defaultValue);
  let [value, setValue] = createSignal<S>(() => initial);
  // Keep an up to date copy of value in a ref so we can access the current value in the generator.
  // This allows us to maintain a stable queue function.
  let currValue = initial;
  let effect: Generator<S, void, unknown> | null = null;
  let disposed = false;

  // Store the function in a ref so we can always access the current version
  // which has the proper `value` in scope.
  let next = () => {
    while (!disposed && effect) {
    // Run the generator to the next yield.
    let newValue = effect.next();

    // If the generator is done, reset the effect.
    if (newValue.done) {
      effect = null;
      return;
    }

    // If the value is the same as the current value,
    // then continue to the next yield. Otherwise,
    // set the value in state and wait for the next layout effect.
    if (currValue !== newValue.value) {
      setValue(() => newValue.value);
      return;
    }
    }
  };

  createEffect(value, current => {
    currValue = current;
    // If there is an effect currently running, continue to the next yield.
    let active = effect;
    let cancelled = false;
    onSettled(() => {
      // Resume only after the yielded value's DOM has settled, under the
      // existing owner. Replacement/disposal cancels this continuation.
      if (!cancelled && !disposed && effect === active) {next();}
    });
    return () => {cancelled = true;};
  });

  let queue = (fn: SetValueAction<S>) => {
    if (disposed) {return;}
    effect = fn(currValue);
    next();
  };
  onCleanup(() => {disposed = true; effect = null;});

  return [value, queue];
}
