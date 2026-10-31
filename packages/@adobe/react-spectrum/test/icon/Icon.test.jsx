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

import {Icon} from '../../src/icon/Icon';
import {createSignal} from 'solid-js';
import {act, render} from '@react-spectrum/test-utils-internal';

let FakeIcon = props => (
  <svg {...props}>
    <path d="M 10,150 L 70,10 L 130,150 z" />
  </svg>
);

describe('Icon', function () {
  it.each`
    Name      | Component
    ${'Icon'} | ${Icon}
  `('$Name handles aria label', function ({Component}) {
    let update;
    let {getByRole} = render(() => {
      let [label, setLabel] = createSignal('workflow icon');
      update = setLabel;
      return <Component aria-label={label()}>{iconProps => <FakeIcon {...iconProps} />}</Component>;
    });

    let icon = getByRole('img');
    expect(icon).toHaveAttribute('focusable', 'false');
    expect(icon).toHaveAttribute('aria-label', 'workflow icon');

    act(() => update(undefined));
    icon = getByRole('img', {hidden: true});
    expect(icon).not.toHaveAttribute('aria-label');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  it.each`
    Name      | Component
    ${'Icon'} | ${Icon}
  `('$Name handles user provided size', function ({Component}) {
    let tree = render(() =>
      <Component size="XL">
        {iconProps => <FakeIcon {...iconProps} />}
      </Component>
    );
    let icon = tree.getByRole('img', {hidden: true});
    expect(icon).toHaveAttribute('class', expect.stringContaining('XL'));
  });

  it.each`
    Name      | Component
    ${'Icon'} | ${Icon}
  `('$Name supports aria-hidden prop', function ({Component}) {
    let update;
    let {getByRole} = render(() => {
      let [hidden, setHidden] = createSignal(true);
      update = setHidden;
      return <Component aria-label={hidden() ? 'explicitly hidden aria-label' : 'explicitly not hidden aria-label'} aria-hidden={hidden()}>
        {iconProps => <FakeIcon {...iconProps} />}
      </Component>;
    });

    let icon = getByRole('img', {hidden: true});
    expect(icon).toHaveAttribute('aria-label', 'explicitly hidden aria-label');
    expect(icon).toHaveAttribute('aria-hidden', 'true');

    act(() => update(false));
    icon = getByRole('img');
    expect(icon).toHaveAttribute('aria-label', 'explicitly not hidden aria-label');
    expect(icon).not.toHaveAttribute('aria-hidden');
  });
});
