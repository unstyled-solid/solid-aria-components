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

import {actHook as act, pointerMap, render, renderHook, waitFor} from '@react-spectrum/test-utils-internal';
import {action, createEffect, createOptimistic, createSignal, isPending, lazy, Loading, untrack, type Component, type Accessor} from 'solid-js';
import {vi} from 'vitest';
import {useControlledState} from '../../src/utils/useControlledState';
import userEvent from '@testing-library/user-event';

const jest = vi;
interface NumericProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
}

describe('useControlledState tests', function () {
  let user: ReturnType<typeof userEvent.setup>;
  beforeAll(() => {
    user = userEvent.setup({delay: null, pointerMap});
  });

  it('can handle default setValue behavior, wont invoke onChange for the same value twice in a row', () => {
    let onChangeSpy = jest.fn();
    let {result} = renderHook(() =>
      useControlledState<string>(undefined, 'defaultValue', onChangeSpy)
    );
    let [value, setValue] = result.current;
    expect(value()).toBe('defaultValue');
    expect(onChangeSpy).not.toHaveBeenCalled();
    act(() => setValue('newValue'));
    [value, setValue] = result.current;
    expect(value()).toBe('newValue');
    expect(onChangeSpy).toHaveBeenLastCalledWith('newValue');

    act(() => setValue('newValue2'));
    [value, setValue] = result.current;
    expect(value()).toBe('newValue2');
    expect(onChangeSpy).toHaveBeenLastCalledWith('newValue2');

    // clear it so we can check more easily that it's not called in the next expect
    onChangeSpy.mockClear();

    act(() => setValue('newValue2'));
    [value, setValue] = result.current;
    expect(value()).toBe('newValue2');
    expect(onChangeSpy).not.toHaveBeenCalled();

    // it should call onChange with a new but not immediately previously run value
    act(() => setValue('newValue'));
    [value, setValue] = result.current;
    expect(value()).toBe('newValue');
    expect(onChangeSpy).toHaveBeenLastCalledWith('newValue');
  });

  it('using NaN will only trigger onChange once', () => {
    let onChangeSpy = jest.fn();
    let {result} = renderHook(() =>
      useControlledState<number | null>(undefined, null, onChangeSpy)
    );
    let [value, setValue] = result.current;
    expect(value()).toBe(null);
    expect(onChangeSpy).not.toHaveBeenCalled();
    act(() => setValue(NaN));
    [value, setValue] = result.current;
    expect(value()).toBe(NaN);
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
    expect(onChangeSpy).toHaveBeenLastCalledWith(NaN);

    act(() => setValue(NaN));
    [value, setValue] = result.current;
    expect(value()).toBe(NaN);
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });

  it('can handle callback setValue behavior', () => {
    let onChangeSpy = jest.fn();
    let {result} = renderHook(() =>
      useControlledState<string>(undefined, 'defaultValue', onChangeSpy)
    );
    let [value, setValue] = result.current;
    expect(value()).toBe('defaultValue');
    expect(onChangeSpy).not.toHaveBeenCalled();
    act(() =>
      setValue(prevValue => {
        expect(prevValue).toBe('defaultValue');
        return 'newValue';
      })
    );
    [value, setValue] = result.current;
    expect(value()).toBe('newValue');
    expect(onChangeSpy).toHaveBeenLastCalledWith('newValue');
  });

  it('does not trigger too many renders', async () => {
    let renderSpy = jest.fn();

    let TestComponent = (props: NumericProps) => {
      let [state, setState] = useControlledState<number>(() => props.value!, props.defaultValue, value => props.onChange?.(value));
      createEffect(state, () => { renderSpy(); });
      return <button onClick={() => setState(state() + 1)} data-testid={state()} />;
    };

    let TestComponentWrapper = (props: NumericProps) => {
      let [state, setState] = createSignal(untrack(() => props.defaultValue));
      return <TestComponent onChange={value => setState(value)} value={state()} />;
    };

    let {getByRole, getByTestId} = render(() => <TestComponentWrapper defaultValue={5} />);
    let button = getByRole('button');
    getByTestId('5');
    if (!process.env.STRICT_MODE) {
      expect(renderSpy).toHaveBeenCalledTimes(1);
    }
    await user.click(button);
    getByTestId('6');
    if (!process.env.STRICT_MODE) {
      expect(renderSpy).toHaveBeenCalledTimes(2);
    }
  });

  it('can handle controlled setValue behavior', () => {
    let onChangeSpy = jest.fn();
    let {result} = renderHook(() =>
      useControlledState<string>('controlledValue', 'defaultValue', onChangeSpy)
    );
    let [value, setValue] = result.current;
    expect(value()).toBe('controlledValue');
    expect(onChangeSpy).not.toHaveBeenCalled();

    act(() => setValue('newValue'));
    [value, setValue] = result.current;
    expect(value()).toBe('controlledValue');
    expect(onChangeSpy).toHaveBeenLastCalledWith('newValue');

    onChangeSpy.mockClear();

    act(() => setValue('controlledValue'));
    [value, setValue] = result.current;
    expect(value()).toBe('controlledValue');
    expect(onChangeSpy).not.toHaveBeenCalled();
  });

  it('can handle controlled callback setValue behavior', () => {
    let onChangeSpy = jest.fn();
    let {result} = renderHook(() =>
      useControlledState('controlledValue', 'defaultValue', onChangeSpy)
    );
    let [value, setValue] = result.current;
    expect(value()).toBe('controlledValue');
    expect(onChangeSpy).not.toHaveBeenCalled();

    act(() =>
      setValue(prevValue => {
        expect(prevValue).toBe('controlledValue');
        return 'newValue';
      })
    );
    [value, setValue] = result.current;
    expect(value()).toBe('controlledValue');
    expect(onChangeSpy).toHaveBeenLastCalledWith('newValue');

    onChangeSpy.mockClear();

    act(() =>
      setValue(prevValue => {
        expect(prevValue).toBe('controlledValue');
        return 'controlledValue';
      })
    );
    [value, setValue] = result.current;
    expect(value()).toBe('controlledValue');
    expect(onChangeSpy).not.toHaveBeenCalled();
  });

  it('can handle controlled callback setValue behavior called multiple times within a single act', async () => {
    let onChangeSpy = jest.fn();
    let TestComponent = () => {
      let [val, setVal] = createSignal('controlledValue');
      let [value, setValue] = useControlledState<string>(val, 'defaultValue', newval => {
        setVal(newval);
        onChangeSpy(newval);
      });
      return (
        <button
          onClick={() => {
            setValue(prevValue => {
              return prevValue + '-newValue';
            });
            setValue(prevValue => {
              return prevValue + '-wombat';
            });
          }}>
          {value()}
        </button>
      );
    };
    let {getByRole} = render(() => <TestComponent />);
    let button = getByRole('button');
    expect(button).toHaveTextContent('controlledValue');
    expect(onChangeSpy).not.toHaveBeenCalled();
    await user.click(button);
    expect(button).toHaveTextContent('controlledValue-newValue-wombat');
    expect(onChangeSpy).toHaveBeenCalledTimes(2);
    expect(onChangeSpy).toHaveBeenNthCalledWith(1, 'controlledValue-newValue');
    expect(onChangeSpy).toHaveBeenNthCalledWith(2, 'controlledValue-newValue-wombat');
  });
  it('can handle controlled callback setValue behavior after prop change', () => {
    let onChangeSpy = jest.fn();
    let setPropValue!: (value: string) => void;
    let {result} = renderHook(() => {
      let [propValue, set] = createSignal('controlledValue');
      setPropValue = set;
      return useControlledState<string>(propValue, 'defaultValue', onChangeSpy);
    });
    let [value, setValue] = result.current;
    expect(value()).toBe('controlledValue');
    expect(onChangeSpy).not.toHaveBeenCalled();

    act(() => setPropValue('updated'));
    [value, setValue] = result.current;

    act(() =>
      setValue(prevValue => {
        expect(prevValue).toBe('updated');
        return 'newValue';
      })
    );
    [value, setValue] = result.current;
    expect(value()).toBe('updated');
    expect(onChangeSpy).toHaveBeenLastCalledWith('newValue');

    onChangeSpy.mockClear();

    act(() =>
      setValue(prevValue => {
        expect(prevValue).toBe('updated');
        return 'newValue';
      })
    );
    [value, setValue] = result.current;
    expect(value()).toBe('updated');
    expect(onChangeSpy).toHaveBeenLastCalledWith('newValue');

    onChangeSpy.mockClear();

    act(() =>
      setValue(prevValue => {
        expect(prevValue).toBe('updated');
        return 'updated';
      })
    );
    [value, setValue] = result.current;
    expect(value()).toBe('updated');
    expect(onChangeSpy).not.toHaveBeenCalled();
  });

  it('will console warn if the programmer tries to switch from controlled to uncontrolled', () => {
    let onChangeSpy = jest.fn();
    let consoleWarnSpy = jest
      .spyOn(console, 'warn')
      .mockImplementation(() => {});
    try {
    let changeValue!: (value: string | undefined) => void;
    let {result} = renderHook(() => {
      let [value, setValue] = createSignal<string | undefined>('controlledValue');
      changeValue = setValue;
      return useControlledState<string>(value, 'defaultValue', onChangeSpy);
    });
    let [value] = result.current;
    expect(value()).toBe('controlledValue');
    expect(onChangeSpy).not.toHaveBeenCalled();
    act(() => changeValue(undefined));
    expect(consoleWarnSpy).toHaveBeenLastCalledWith(
      'WARN: A component changed from controlled to uncontrolled.'
    );
    } finally { consoleWarnSpy.mockRestore(); }
  });

  it('will console warn if the programmer tries to switch from uncontrolled to controlled', () => {
    let onChangeSpy = jest.fn();
    let consoleWarnSpy = jest
      .spyOn(console, 'warn')
      .mockImplementation(() => {});
    try {
    let changeValue!: (value: string | undefined) => void;
    let {result} = renderHook(() => {
      let [value, setValue] = createSignal<string | undefined>(undefined);
      changeValue = setValue;
      return useControlledState<string>(value, 'defaultValue', onChangeSpy);
    });
    let [value] = result.current;
    expect(value()).toBe('defaultValue');
    expect(onChangeSpy).not.toHaveBeenCalled();
    act(() => changeValue('controlledValue'));
    expect(consoleWarnSpy).toHaveBeenLastCalledWith(
      'WARN: A component changed from uncontrolled to controlled.'
    );
    } finally { consoleWarnSpy.mockRestore(); }
  });

  it('should work with suspense when controlled', async () => {
    const childModule = new Promise<{default: Component}>(() => {});
    const AsyncChild = lazy(() => childModule);
    function Test(props: NumericProps) {
      let [value, setValue] = createSignal(1);
      let [showChild, setShowChild] = createSignal(false);
      // React's urgent parent write is distinct from its suspended transition.
      // Native optimistic state exposes that write while the real lazy load waits.
      let [urgentValue, setUrgentValue] = createOptimistic(value);
      let acceptUrgentValue = action(function* (nextValue: number) {
        setUrgentValue(nextValue);
        setValue(nextValue);
        if (isPending(showChild)) {
          yield childModule;
        }
      });

      return (
        <>
          <TransitionButton
            pending={() => isPending(showChild)}
            onClick={() => {
              setValue(3);
              setShowChild(true);
            }}
          />
          <Child
            value={urgentValue()}
            onChange={v => {
              void acceptUrgentValue(v);
              props.onChange?.(v);
            }}
          />
          <Loading>{showChild() && <AsyncChild />}</Loading>
        </>
      );
    }

    function Child(props: NumericProps) {
      let [value, setValue] = useControlledState<number>(() => props.value!, props.defaultValue, v => props.onChange?.(v));
      return (
        <button data-testid="value" onClick={() => setValue(value() + 1)}>
          {value()}
        </button>
      );
    }

    function TransitionButton(props: {onClick: () => void; pending: Accessor<boolean>}) {
      return (
        <button
          data-testid="show"
          onClick={() => {
            props.onClick();
          }}>
          {props.pending() ? 'Loading' : 'Show'}
        </button>
      );
    }

    let onChange = jest.fn();
    let tree = render(() => <Test onChange={onChange} />);
    let value = tree.getByTestId('value');
    let show = tree.getByTestId('show');

    expect(value).toHaveTextContent('1');
    await user.click(value);

    // Clicking the button should update the value as normal.
    expect(value).toHaveTextContent('2');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith(2);

    // Clicking the show button starts a transition. The new value of 3
    // will be thrown away by React since the component suspended.
    expect(show).toHaveTextContent('Show');
    await user.click(show);
    expect(show).toHaveTextContent('Loading');
    expect(value).toHaveTextContent('2');
    // Since the previous render was thrown away, the current value shown
    // to the user is still 2. Clicking the button should bump it to 3 again.
    await user.click(value);
    expect(value).toHaveTextContent('3');
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenLastCalledWith(3);
  });

  it('should work with suspense when controlled with function set state', async () => {
    const childModule = new Promise<{default: Component}>(() => {});
    const AsyncChild = lazy(() => childModule);
    function Test(props: NumericProps) {
      let [value, setValue] = createSignal(1);
      let [showChild, setShowChild] = createSignal(false);
      // React's urgent parent write is distinct from its suspended transition.
      // Native optimistic state exposes that write while the real lazy load waits.
      let [urgentValue, setUrgentValue] = createOptimistic(value);
      let acceptUrgentValue = action(function* (nextValue: number) {
        setUrgentValue(nextValue);
        setValue(nextValue);
        if (isPending(showChild)) {
          yield childModule;
        }
      });
      return (
        <>
          <TransitionButton
            pending={() => isPending(showChild)}
            onClick={() => {
              setValue(3);
              setShowChild(true);
            }}
          />
          <Child
            value={urgentValue()}
            onChange={v => {
              void acceptUrgentValue(v);
              props.onChange?.(v);
            }}
          />
          <Loading>{showChild() && <AsyncChild />}</Loading>
        </>
      );
    }
    function Child(props: NumericProps) {
      let [value, setValue] = useControlledState<number>(() => props.value!, props.defaultValue, v => props.onChange?.(v));
      return (
        <button data-testid="value" onClick={() => setValue(value => value + 1)}>
          {value()}
        </button>
      );
    }
    function TransitionButton(props: {onClick: () => void; pending: Accessor<boolean>}) {
      return (
        <button
          data-testid="show"
          onClick={() => {
            props.onClick();
          }}>
          {props.pending() ? 'Loading' : 'Show'}
        </button>
      );
    }
    let onChange = jest.fn();
    let tree = render(() => <Test onChange={onChange} />);
    let value = tree.getByTestId('value');
    let show = tree.getByTestId('show');
    expect(value).toHaveTextContent('1');
    await user.click(value);
    // Clicking the button should update the value as normal.
    expect(value).toHaveTextContent('2');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith(2);
    // Clicking the show button starts a transition. The new value of 3
    // will be thrown away by React since the component suspended.
    expect(show).toHaveTextContent('Show');
    await user.click(show);
    expect(show).toHaveTextContent('Loading');
    expect(value).toHaveTextContent('2');
    // Since the previous render was thrown away, the current value shown
    // to the user is still 2. Clicking the button should bump it to 3 again.
    await user.click(value);
    expect(value).toHaveTextContent('3');
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenLastCalledWith(3);
  });

  it('should work with suspense when uncontrolled', async () => {
    let resolve!: (module: {default: Component}) => void;
    const AsyncChild = lazy(
      () =>
        new Promise<{default: Component}>(r => {
          resolve = r;
        })
    );
    function Test(props: NumericProps) {
      let [value, setValue] = useControlledState<number>(undefined, 1, props.onChange);
      let [showChild, setShowChild] = createSignal(false);

      return (
        <>
          <button
            data-testid="value"
            onClick={() => {
                setValue(value() + 1);
                setShowChild(true);
            }}>
            {value()}
            {isPending(showChild) ? ' (Loading)' : ''}
          </button>
          <Loading>{showChild() && <AsyncChild />}</Loading>
        </>
      );
    }

    function LoadedComponent() {
      return <div>Hello</div>;
    }

    let onChange = jest.fn();
    let tree = render(() => <Test onChange={onChange} />);
    let value = tree.getByTestId('value');

    expect(value).toHaveTextContent('1');
    await user.click(value);

    // React aborts the render, so the value stays at 1.
    expect(value).toHaveTextContent('1 (Loading)');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith(2);

    // Attempting to change the value will be aborted again.
    await user.click(value);
    expect(value).toHaveTextContent('1 (Loading)');
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenLastCalledWith(2);

    // Now resolve the suspended component.
    // Value should now update to the latest one.
    resolve({default: LoadedComponent});
    await act(() => Promise.resolve());
    await waitFor(() => expect(value).toHaveTextContent('2'));

    // Now incrementing works again.
    await user.click(value);
    expect(value).toHaveTextContent('3');
    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onChange).toHaveBeenLastCalledWith(3);
  });

  it('should work with suspense when uncontrolled with function set state', async () => {
    let resolve!: (module: {default: Component}) => void;
    const AsyncChild = lazy(
      () =>
        new Promise<{default: Component}>(r => {
          resolve = r;
        })
    );
    function Test(props: NumericProps) {
      let [value, setValue] = useControlledState<number>(undefined, 1, props.onChange);
      let [showChild, setShowChild] = createSignal(false);
      return (
        <>
          <button
            data-testid="value"
            onClick={() => {
                setValue(value => value + 1);
                setShowChild(true);
            }}>
            {value()}
            {isPending(showChild) ? ' (Loading)' : ''}
          </button>
          <Loading>{showChild() && <AsyncChild />}</Loading>
        </>
      );
    }
    function LoadedComponent() {
      return <div>Hello</div>;
    }
    let onChange = jest.fn();
    let tree = render(() => <Test onChange={onChange} />);
    let value = tree.getByTestId('value');
    expect(value).toHaveTextContent('1');
    await user.click(value);
    // React aborts the render, so the value stays at 1.
    expect(value).toHaveTextContent('1 (Loading)');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith(2);
    // Attempting to change the value will be aborted again.
    await user.click(value);
    expect(value).toHaveTextContent('1 (Loading)');
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenLastCalledWith(2);
    // Now resolve the suspended component.
    // Value should now update to the latest one.
    resolve({default: LoadedComponent});
    await act(() => Promise.resolve());
    await waitFor(() => expect(value).toHaveTextContent('2'));
    // Now incrementing works again.
    await user.click(value);
    expect(value).toHaveTextContent('3');
    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onChange).toHaveBeenLastCalledWith(3);
  });
});
