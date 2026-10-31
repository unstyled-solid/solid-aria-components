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

import {pointerMap, render} from '@react-spectrum/test-utils-internal';
import {vi as jest} from 'vitest';
import {Pressable} from '../../src/interactions/Pressable';
import {mergeProps} from '../../src/utils/mergeProps';
import userEvent from '@testing-library/user-event';

describe('Pressable', function () {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should apply press events to child element', async function () {
    let user = userEvent.setup({delay: null, pointerMap});
    let onPress = jest.fn();
    let {getByRole} = render(() =>
      <Pressable onPress={onPress}>
        {props => <button {...props}>Button</button>}
      </Pressable>
    );

    let button = getByRole('button');
    await user.click(button);

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('should should merge with existing props, not overwrite', async function () {
    let user = userEvent.setup({delay: null, pointerMap});
    let onPress = jest.fn();
    let onClick = jest.fn();
    let {getByRole} = render(() =>
      <Pressable onPress={onPress}>
        {props => <button {...mergeProps(props, {onClick})}>Button</button>}
      </Pressable>
    );

    let button = getByRole('button');
    await user.click(button);

    expect(onPress).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should should merge with existing ref', async function () {
    let ref1 = {current: null};
    let ref2 = {current: null};
    let {getByRole} = render(() =>
      <Pressable ref={el => { ref1.current = el; }}>
        {props => <button {...mergeProps(props, {ref: el => { ref2.current = el; }})}>Button</button>}
      </Pressable>
    );

    let button = getByRole('button');
    expect(ref1.current).toBe(button);
    expect(ref2.current).toBe(button);
  });

  it('should automatically make child focusable', async function () {
    let {getByRole} = render(() =>
      <Pressable>
        {props => <span {...props} role="button">Button</span>}
      </Pressable>
    );

    let button = getByRole('button');
    expect(button).toHaveAttribute('tabindex', '0');
  });

  it('should error if component does not forward its ref', async function () {
    using spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    let Component = () => <button>Hi</button>;
    render(() =>
      <Pressable>
        {props => <Component {...props}>Button</Component>}
      </Pressable>
    );

    expect(spy).toHaveBeenCalledWith('<Pressable> child must forward its ref to a DOM element.');
  });

  it('should error if component does not forward its ref to a DOM element', async function () {
    using spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    let Component = props => {
      return <button ref={() => props.ref({something: true})}>Test</button>;
    };

    render(() =>
      <Pressable>
        {props => <Component {...props}>Button</Component>}
      </Pressable>
    );

    expect(spy).toHaveBeenCalledWith('<Pressable> child must forward its ref to a DOM element.');
  });

  it('should warn if child is not focusable', async function () {
    using spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    let Component = props => (
      <span role="button" ref={props.ref}>
        Hi
      </span>
    );
    render(() =>
      <Pressable>
        {props => <Component {...props}>Button</Component>}
      </Pressable>
    );

    expect(spy).toHaveBeenCalledWith(
      '<Pressable> child must be focusable. Please ensure the tabIndex prop is passed through.'
    );
  });

  it('should not warn if focusable child is inside a hidden subtree', async function () {
    using spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(() =>
      <div hidden>
        <Pressable>
          {props => <span {...props} role="button">Button</span>}
        </Pressable>
      </div>
    );

    expect(spy).not.toHaveBeenCalledWith(
      '<Pressable> child must be focusable. Please ensure the tabIndex prop is passed through.'
    );
  });

  it('supports isDisabled', async function () {
    using spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    let {getByRole} = render(() =>
      <Pressable isDisabled>
        {props => <span {...props} role="button">Button</span>}
      </Pressable>
    );

    let button = getByRole('button');
    expect(button).not.toHaveAttribute('tabindex');
    expect(spy).not.toHaveBeenCalled();
  });

  it('should warn if child does not have a role', async function () {
    using spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(() =>
      <Pressable>
        {props => <span {...props}>Trigger</span>}
      </Pressable>
    );

    expect(spy).toHaveBeenCalledWith('<Pressable> child must have an interactive ARIA role.');
  });

  it('should warn if child does not have an interactive role', async function () {
    using spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(() =>
      <Pressable>
        {props => <span {...props} role="presentation">Trigger</span>}
      </Pressable>
    );

    expect(spy).toHaveBeenCalledWith(
      '<Pressable> child must have an interactive ARIA role. Got "presentation".'
    );
  });
});
