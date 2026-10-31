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

import {act, pointerMap, render} from '@react-spectrum/test-utils-internal';
import {Button} from '../src/Button';
import {FieldError} from '../src/FieldError';
import {Form} from '../src/Form';
import {Input} from '../src/Input';
import {Label} from '../src/Label';
import {createSignal} from 'solid-js';
import {TextField} from '../src/TextField';
import userEvent from '@testing-library/user-event';

describe('Form', () => {
  /** @type {ReturnType<typeof userEvent.setup>} */
  let user;
  beforeAll(() => {
    user = userEvent.setup({delay: null, pointerMap});
  });

  it('supports server validation errors', async () => {
    function Test() {
      let [serverErrors, setServerErrors] = createSignal({});
      /** @type {NonNullable<import('../src/Form').FormProps['onSubmit']>} */
      let onSubmit = e => {
        e.preventDefault();
        setServerErrors({
          name: 'Invalid name.'
        });
      };

      return (
        <Form data-testid="form" onSubmit={onSubmit} validationErrors={serverErrors()}>
          <TextField name="name">
            <Label>Name</Label>
            <Input />
            <FieldError />
          </TextField>
          <Button type="submit">Submit</Button>
        </Form>
      );
    }

    let {getByTestId, getByRole} = render(() => <Test />);

    let form = getByTestId('form');
    if (!(form instanceof HTMLFormElement)) throw new Error('Expected source Form to render a form element.');
    expect(form).toHaveClass('react-aria-Form');

    let input = getByRole('textbox');
    if (!(input instanceof HTMLInputElement)) throw new Error('Expected source Input to render an input element.');
    expect(input).not.toHaveAttribute('aria-describedby');

    await user.click(getByRole('button'));
    act(() => {
      form.checkValidity();
    });

    expect(input).toHaveAttribute('aria-describedby');
    const firstDescriptionId = input.getAttribute('aria-describedby');
    if (firstDescriptionId === null) throw new Error('Expected source validation description ID.');
    expect(document.getElementById(firstDescriptionId)).toHaveTextContent(
      'Invalid name.'
    );
    expect(input.validity.valid).toBe(false);
    expect(document.activeElement).toBe(input);

    // Clicking twice doesn't clear server errors.
    await user.click(getByRole('button'));
    act(() => {
      form.checkValidity();
    });

    expect(input).toHaveAttribute('aria-describedby');
    const secondDescriptionId = input.getAttribute('aria-describedby');
    if (secondDescriptionId === null) throw new Error('Expected source validation description ID after repeat submit.');
    expect(document.getElementById(secondDescriptionId)).toHaveTextContent(
      'Invalid name.'
    );
    expect(input.validity.valid).toBe(false);
    expect(document.activeElement).toBe(input);

    await user.clear(input);
    await user.keyboard('Devon');
    await user.tab();

    expect(input).not.toHaveAttribute('aria-describedby');
    expect(input.validity.valid).toBe(true);
  });

  it('should use validationBehavior="native" by default', async () => {
    function Test() {
      return (
        <Form data-testid="form">
          <TextField name="name" isRequired>
            <Label>Name</Label>
            <Input />
            <FieldError />
          </TextField>
          <Button type="submit">Submit</Button>
        </Form>
      );
    }

    let {getByTestId, getByRole} = render(() => <Test />);

    let form = getByTestId('form');
    expect(form).toHaveClass('react-aria-Form');
    expect(form).not.toHaveAttribute('novalidate');

    let input = getByRole('textbox');
    expect(input).toHaveAttribute('required');
    expect(input).not.toHaveAttribute('aria-required');
  });

  it('supports validationBehavior="aria"', async () => {
    function Test() {
      return (
        <Form data-testid="form" validationBehavior="aria">
          <TextField name="name" isRequired>
            <Label>Name</Label>
            <Input />
            <FieldError />
          </TextField>
          <Button type="submit">Submit</Button>
        </Form>
      );
    }

    let {getByTestId, getByRole} = render(() => <Test />);

    let form = getByTestId('form');
    expect(form).toHaveClass('react-aria-Form');
    expect(form).toHaveAttribute('novalidate');

    let input = getByRole('textbox');
    expect(input).not.toHaveAttribute('required');
    expect(input).toHaveAttribute('aria-required');
  });

  it('Form element\'s validationBehavior="aria" should override Form\'s default validationBehavior="native"', async () => {
    function Test() {
      return (
        <Form data-testid="form">
          <TextField name="name" isRequired validationBehavior="aria">
            <Label>Name</Label>
            <Input />
            <FieldError />
          </TextField>
          <Button type="submit">Submit</Button>
        </Form>
      );
    }

    let {getByTestId, getByRole} = render(() => <Test />);

    let form = getByTestId('form');
    expect(form).toHaveClass('react-aria-Form');
    expect(form).not.toHaveAttribute('novalidate');

    let input = getByRole('textbox');
    expect(input).not.toHaveAttribute('required');
    expect(input).toHaveAttribute('aria-required');
  });

  it('Form element\'s validationBehavior="native" should override Form\'s validationBehavior="aria"', async () => {
    function Test() {
      return (
        <Form data-testid="form" validationBehavior="aria">
          <TextField name="name" isRequired validationBehavior="native">
            <Label>Name</Label>
            <Input />
            <FieldError />
          </TextField>
          <Button type="submit">Submit</Button>
        </Form>
      );
    }

    let {getByTestId, getByRole} = render(() => <Test />);

    let form = getByTestId('form');
    expect(form).toHaveClass('react-aria-Form');
    expect(form).toHaveAttribute('novalidate');

    let input = getByRole('textbox');
    expect(input).toHaveAttribute('required');
    expect(input).not.toHaveAttribute('aria-required');
  });

  it('should support custom render function', () => {
    let {getByTestId} = render(() =>
      <Form data-testid="form" render={props => <form {...props} data-custom="true" />}>
        Test
      </Form>
    );
    let form = getByTestId('form');
    expect(form).toHaveAttribute('data-custom', 'true');
  });

  // The source React>=19 gate selects this browser focus contract, not a
  // function-valued form action. Native Input/Button retain the full contract;
  // register it directly without fabricating a React version or adding a skip.
  it(
    'shows focus-visible when a form library moves focus to the first invalid field on submit',
    async () => {
      function Test() {
        return (
          <form data-testid="form">
            <Input aria-label="Name" name="name" required />
            <Button type="submit">Submit</Button>
          </form>
        );
      }

      let {getByRole} = render(() => <Test />);
      let input = getByRole('textbox');
      if (!(input instanceof HTMLInputElement)) throw new Error('Expected source Input to render an input element.');
      let button = getByRole('button');

      await user.click(button);
      expect(input).not.toHaveAttribute('data-focus-visible');

      // On submit the form is invalid, so the browser fires an invalid event on
      // the required field. react-hook-form (shouldFocusError) then moves focus
      // to the first invalid field with a plain ref.focus().
      act(() => {
        input.checkValidity();
        input.focus();
      });
      await act(async () => {
        await Promise.resolve();
      });

      expect(document.activeElement).toBe(input);
      expect(input).toHaveAttribute('data-focus-visible');
    }
  );

  it('should not throw when form contains elements without validity property', async () => {
    function Test() {
      return (
        <Form data-testid="form">
          <TextField name="name" isRequired>
            <Label>Name</Label>
            <Input />
            <FieldError />
          </TextField>
          <Button type="submit">Submit</Button>
        </Form>
      );
    }

    let {getByTestId, getByRole} = render(() => <Test />);
    let form = getByTestId('form');
    let input = getByRole('textbox');

    // Mock form.elements to include an element without validity property (simulates Web Component)
    if (!(form instanceof HTMLFormElement)) throw new Error('Expected source Form to render a form element.');
    let originalElements = form.elements;
    let mockElement = {name: 'custom-element'}; // No validity property
    Object.defineProperty(form, 'elements', {
      get: () => ({
        length: originalElements.length + 1,
        [Symbol.iterator]: function* () {
          yield mockElement;
          yield* originalElements;
        },
        0: mockElement,
        ...Array.from(originalElements).reduce((acc, el, i) => ({...acc, [i + 1]: el}), {})
      }),
      configurable: true
    });

    // Should not throw when iterating form.elements with element lacking validity
    await user.click(getByRole('button'));

    expect(document.activeElement).toBe(input);

    // Restore original elements
    Object.defineProperty(form, 'elements', {
      get: () => originalElements,
      configurable: true
    });
  });
});
