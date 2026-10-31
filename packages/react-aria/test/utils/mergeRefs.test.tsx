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

import {mergeRefs} from '../../src/utils/mergeRefs';
import {onCleanup, onSettled} from 'solid-js';
import {vi} from 'vitest';
import {render} from '@react-spectrum/test-utils-internal';

describe('mergeRefs', () => {
  it('merge Refs', () => {
    let ref1;
    let ref2;

    const TextField = props => {
      let internalRef1 = {current: null};
      let internalRef2 = {current: null};
      onSettled(() => {
        ref1 = internalRef1;
        ref2 = internalRef2;
      });

      const ref = mergeRefs(internalRef1, internalRef2);
      return <input {...props} ref={ref} />;
    };

    render(() => <TextField foo="foo" />);

    expect(ref1.current).toBe(ref2.current);
    expect(ref1.current).not.toBeNull();
  });

  // Keep the source's modern cleanup case; Solid owns cleanup in setup.
  {
    it('merge Ref Cleanup', () => {
      const cleanUp = vi.fn();
      let ref1;
      let ref2;
      let target = null;

      const TextField = props => {
        let internalRef1 = {current: null};
        let internalRef2 = {current: null};
        onSettled(() => {
          ref1 = internalRef1;
          ref2 = internalRef2;
        });
        let ref3 = node => {
          target = node;
          return cleanUp;
        };

        const ref = mergeRefs(internalRef1, internalRef2, ref3);
        let dispose;
        onCleanup(() => dispose?.());
        return <input {...props} ref={node => { dispose = ref(node); }} />;
      };

      const {unmount} = render(() => <TextField foo="foo" />);

      expect(cleanUp).toHaveBeenCalledTimes(0);
      expect(ref1.current).toBe(target);
      expect(ref2.current).toBe(target);
      unmount();

      // Now cleanup has been called
      expect(cleanUp).toHaveBeenCalledTimes(1);
    });
  }
});
