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

import {act, render} from '@react-spectrum/test-utils-internal';
import {createSignal} from 'solid-js';
import {vi} from 'vitest';
import {useObjectRef} from '../../src/utils/useObjectRef';
import {useEvent} from '../../src/utils/useEvent';

interface ExampleProps {
  event: string;
  listener?: (e: Event) => void;
  options?: boolean | AddEventListenerOptions;
}

const jest = vi;
function Example(props: ExampleProps) {
  let ref = useObjectRef<HTMLDivElement>();
  useEvent(ref, () => props.event, undefined, () => props.options, () => props.listener);
  return <div ref={ref} data-testid="target" />;
}

describe('useEvent', () => {
  it('subscribes on mount and unsubscribes on unmount', () => {
    let listener = jest.fn();
    let {getByTestId, unmount} = render(() => <Example event="customevent" listener={listener} />);
    let target = getByTestId('target');

    act(() => {
      target.dispatchEvent(new Event('customevent'));
    });
    expect(listener).toHaveBeenCalledTimes(1);

    unmount();
    act(() => {
      target.dispatchEvent(new Event('customevent'));
    });
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('removes the listener when it becomes undefined', () => {
    let listener = jest.fn();
    let update: (listener: ExampleProps['listener']) => void = () => {};
    let {getByTestId} = render(() => {
      let [currentListener, setListener] = createSignal<{listener?: ExampleProps['listener']}>({listener});
      update = listener => { setListener({listener}); };
      return <Example event="customevent" listener={currentListener().listener} />;
    });
    let target = getByTestId('target');

    act(() => update(undefined));
    act(() => {
      target.dispatchEvent(new Event('customevent'));
    });

    expect(listener).not.toHaveBeenCalled();
  });

  it('re-subscribes when the event name changes', () => {
    let listener = jest.fn();
    let update: (event: string) => void = () => {};
    let {getByTestId} = render(() => {
      let [event, setEvent] = createSignal('first');
      update = value => { setEvent(value); };
      return <Example event={event()} listener={listener} />;
    });
    let target = getByTestId('target');

    // Change the event name we're listening for to "second" and re-render the component
    act(() => update('second'));

    act(() => {
      target.dispatchEvent(new Event('first'));
    });
    expect(listener).not.toHaveBeenCalled();

    act(() => {
      target.dispatchEvent(new Event('second'));
    });
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('forwards listener options such as once', () => {
    let listener = jest.fn();
    let {getByTestId} = render(() =>
      <Example event="customevent" listener={listener} options={{once: true}} />
    );
    let target = getByTestId('target');

    act(() => {
      target.dispatchEvent(new Event('customevent'));
    });
    act(() => {
      target.dispatchEvent(new Event('customevent'));
    });

    expect(listener).toHaveBeenCalledTimes(1);
  });
});
