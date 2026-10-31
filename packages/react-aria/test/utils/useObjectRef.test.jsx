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

import {onSettled, omit} from 'solid-js';
import {vi as jest} from 'vitest';
import {render, renderHook, screen} from '@react-spectrum/test-utils-internal';


import {useObjectRef} from '../../src/utils/useObjectRef';

describe('useObjectRef', () => {
  it('returns an empty object ref by default', () => {
    const {result} = renderHook(() => useObjectRef());

    expect(result.current).toBeDefined();
    expect(result.current).not.toBeNull();
    expect(result.current.current).toBeNull();
  });

  it('should support native forwarding for an object ref', () => {
    const TextField = props => {
      const ref = useObjectRef(props.ref);

      return <input {...omit(props, 'ref')} ref={ref} />;
    };

    const textFieldRef = {current: null};

    render(() => <TextField placeholder="Foo" ref={textFieldRef} />);

    expect(textFieldRef.current.placeholder).toBe('Foo');
  });

  it('should support native forwarding for a function ref', () => {
    const TextField = props => {
      const ref = useObjectRef(props.ref);

      return <input {...omit(props, 'ref')} ref={ref} />;
    };

    let inputElem;

    render(() => <TextField placeholder="Foo" ref={el => (inputElem = el)} />);

    expect(inputElem.placeholder).toBe('Foo');
  });

  it('should only be called once', () => {
    const TextField = props => {
      const ref = useObjectRef(props.ref);
      return <input {...omit(props, 'ref')} ref={ref} />;
    };

    let ref = jest.fn();
    render(() => <TextField ref={ref} />);
    expect(ref).toHaveBeenCalledTimes(1);
  });

  /**
   * This describe would completely fail if `useObjectRef` did not account
   * for order of execution and rendering, especially when other components
   * or Hooks utilize the `useLayoutEffect` Hook. In other words, it guards
   * against use-cases where the returned `ref` value may not be up to date.
   */
  describe('when considering rendering order', () => {
    const LeaderTextField = props => {
      const inputRef = useObjectRef(props.ref);

      return <input {...omit(props, 'ref')} ref={inputRef} />;
    };

    it('takes precedence over useEffect', () => {
      const FollowerTextField = props => {
        const inputRef = useObjectRef();
        const forwardedRef = props.ref;

        onSettled(() => {
          forwardedRef.current && (inputRef.current.placeholder = forwardedRef.current.placeholder);
        });

        return <input {...omit(props, 'ref')} ref={inputRef} />;
      };

      const Example = () => {
        const outerRef = {current: null};

        /**
         * Order of the following should not matter. So, even though the first
         * component has a "Bar" placeholder, both will end up having the same
         * placeholder text "Foo" because `outerRef` was forwarded to
         * `LeaderTextField` and got updated by `useObjectRef` before
         * `FollowerTextField` executed its `useEffect`.
         */
        return (
          <>
            <FollowerTextField placeholder="Bar" ref={outerRef} />
            <LeaderTextField placeholder="Foo" ref={outerRef} />
          </>
        );
      };

      render(() => <Example />);

      expect(screen.getAllByPlaceholderText(/foo/i)).toHaveLength(2);
    });

    it('batches up with useLayoutEffect', () => {
      const FollowerTextField = props => {
        const inputRef = useObjectRef();
        const forwardedRef = props.ref;

        onSettled(() => {
          forwardedRef.current && (inputRef.current.placeholder = forwardedRef.current.placeholder);
        });

        return <input {...omit(props, 'ref')} ref={inputRef} />;
      };

      const Example = () => {
        const outerRef = {current: null};

        /**
         * Order of the following _does_ matter because `FollowerTextField`
         * this time has a `useLayoutEffect`, which is synchronous and is
         * executed in the order it was called. But, still, both will end
         * up having the same placeholder text "Foo" because `outerRef` is
         * forwarded to `LeaderTextField`, which, in this test, comes _before_
         * `FollowerTextField`. Hence, `outerRef` gets updated by
         * `useObjectRef`, so `FollowerTextField` gets the updated `ref` value.
         */
        return (
          <>
            <LeaderTextField placeholder="Foo" ref={outerRef} />
            <FollowerTextField placeholder="Bar" ref={outerRef} />
          </>
        );
      };

      render(() => <Example />);

      expect(screen.getAllByPlaceholderText(/foo/i)).toHaveLength(2);
    });
  });

  it('calls cleanup function on unmount', () => {
    const cleanUp = jest.fn();
    const setup = jest.fn();
    const nullHandler = jest.fn();

    function ref(_ref) {
      if (_ref) {
        setup();
      } else {
        nullHandler();
      }
      return cleanUp;
    }

    const TextField = props => {
      const ref = useObjectRef(props.forwardedRef);
      return <input {...omit(props, 'ref', 'forwardedRef')} ref={ref} />;
    };

    // Carry the callback as data so the native JSX ref directive does not
    // discard its return value. The bridge's owner executes that cleanup.
    const {unmount} = render(() => <TextField forwardedRef={ref} />);

    expect(setup).toHaveBeenCalledTimes(1);
    expect(cleanUp).toHaveBeenCalledTimes(0);
    expect(nullHandler).toHaveBeenCalledTimes(0);

    unmount();

    expect(setup).toHaveBeenCalledTimes(1);
    // Now cleanup has been called
    expect(cleanUp).toHaveBeenCalledTimes(1);
    // Ref callback never called with null when cleanup is returned
    expect(nullHandler).toHaveBeenCalledTimes(0);
  });
});
