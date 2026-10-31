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

/**
 * A stable event callback. Solid setup runs once: pass a closure that reads live
 * props, or a getter for a replaceable callback as the second argument.
 * Callback lookup happens at dispatch, without subscribing the caller.
 */
import {untrack} from 'solid-js';

export function useEffectEvent<T extends (...args: any[]) => any>(
  fn?: T,
  getCallback?: () => T | null | undefined
): T {
  return ((...args: Parameters<T>) => untrack(() => (getCallback ? getCallback() : fn)?.(...args))) as T;
}
