/*
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {vi} from 'vitest';
import {createSignal} from 'solid-js';
import {act, render} from '@react-spectrum/test-utils-internal';

describe('useId', function () {
  let OriginalFinalizationRegistry = global.FinalizationRegistry;

  afterEach(() => {
    global.FinalizationRegistry = OriginalFinalizationRegistry;
    vi.resetModules();
  });

  it('registers once per mounted id and uses an unregister token', async function () {
    let register = vi.fn();
    let unregister = vi.fn();

    global.FinalizationRegistry = vi.fn(function () {
      this.register = register;
      this.unregister = unregister;
    });

    vi.resetModules();
    {
      let {useId} = await import('../../src/utils/useId');

      function Test(props) {
        let id = useId();
        return <div data-id={id()}>{props.tick}</div>;
      }

      let container = document.createElement('div');
      document.body.appendChild(container);

      // Native setup is owned once; subsequent prop writes update the same host.
      let setTick;
      let {unmount} = render(() => {
        let [tick, write] = createSignal(0);
        setTick = write;
        return <Test tick={tick()} />;
      }, {container});

      act(() => {
        setTick(1);
      });

      act(() => {
        setTick(2);
      });

      // Re-rendering the same mounted hook should not add more registry entries.
      expect(register).toHaveBeenCalledTimes(1);
      // The held value should be the generated id string, and the unregister token should match
      // the target object so useId can remove the same registration during cleanup.
      expect(register.mock.calls[0][1]).toEqual(expect.any(String));
      expect(register.mock.calls[0][2]).toBe(register.mock.calls[0][0]);

      act(() => {
        unmount();
      });

      document.body.removeChild(container);

      // Unmount should remove the specific registration created for this hook instance.
      expect(unregister).toHaveBeenCalledTimes(1);
      expect(unregister).toHaveBeenCalledWith(register.mock.calls[0][2]);
    }
  });

  it('unregisters the previous id and re-registers when the id changes', async function () {
    let register = vi.fn();
    let unregister = vi.fn();

    global.FinalizationRegistry = vi.fn(function () {
      this.register = register;
      this.unregister = unregister;
    });

    vi.resetModules();
    {
      let {useId, mergeIds} = await import('../../src/utils/useId');

      function Test(props) {
        let id = useId();
        return <div data-id={id()}>{props.tick}</div>;
      }

      let container = document.createElement('div');
      document.body.appendChild(container);

      let setTick;
      let {unmount} = render(() => {
        let [tick, write] = createSignal(0);
        setTick = write;
        return <Test tick={tick()} />;
      }, {container});

      expect(register).toHaveBeenCalledTimes(1);
      let firstToken = register.mock.calls[0][2];
      // The held value passed to FinalizationRegistry.register is the id string.
      let firstId = register.mock.calls[0][1];

      // mergeIds sets the internal nextId ref and the next render's useEffect flushes that
      // through setValue, producing a new res and exercising the id-change branch.
      act(() => {
        mergeIds(firstId, 'changed-id');
        setTick(1);
      });

      // The previous registration should be unregistered with the original token, and the new id
      // should be registered once.
      expect(unregister).toHaveBeenCalledWith(firstToken);
      expect(register).toHaveBeenCalledTimes(2);
      expect(register.mock.calls[1][1]).toBe('changed-id');
      // Re-using the same target object means the WeakMap key is stable across re-registrations.
      expect(register.mock.calls[1][0]).toBe(register.mock.calls[0][0]);

      act(() => {
        unmount();
      });

      document.body.removeChild(container);
    }
  });
});
