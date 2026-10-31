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

import {createEffect, type Accessor} from 'solid-js';
import {useEffectEvent} from './useEffectEvent';

// Like useEffect, but only called for updates after the initial render.
export function useUpdateEffect(
  cb: () => void | (() => void),
  dependencies: readonly unknown[] | Accessor<readonly unknown[]>
): void {
  let isInitialMount = true;
  let lastDeps: readonly unknown[] | null = null;
  let cbEvent = useEffectEvent(cb);

  createEffect(
    () => [...(typeof dependencies === 'function' ? dependencies() : dependencies)],
    currentDeps => {
      let prevDeps = lastDeps;
      if (isInitialMount) {
        isInitialMount = false;
      } else if (!prevDeps || currentDeps.some((dep, i) => !Object.is(dep, prevDeps[i]))) {
        // Source invokes cbEvent without returning its result: callback-returned
        // disposers are not registered as effect cleanup. Preserve that behavior.
        cbEvent();
      }
      lastDeps = currentDeps;
    }
  );
}
