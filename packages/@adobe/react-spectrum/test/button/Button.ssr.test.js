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

import {testSSR} from '@react-spectrum/test-utils-internal';
import {resolve} from 'node:path';
import {Fixture as ActionButtonFixture} from '../../../../../test/ssr-harness/p30-button-action';
import {Fixture as ButtonFixture} from '../../../../../test/ssr-harness/p30-button-standard';
import {Fixture as LogicButtonFixture} from '../../../../../test/ssr-harness/p30-button-logic';
import {Fixture as FieldButtonFixture} from '../../../../../test/ssr-harness/p30-button-field';

let fixtures = {
  ActionButton: {filename: 'test/ssr-harness/p30-button-action.tsx', Fixture: ActionButtonFixture},
  Button: {filename: 'test/ssr-harness/p30-button-standard.tsx', Fixture: ButtonFixture},
  LogicButton: {filename: 'test/ssr-harness/p30-button-logic.tsx', Fixture: LogicButtonFixture}
};

describe('Button SSR', function () {
  it.each`
    Name              | props
    ${'ActionButton'} | ${{}}
    ${'Button'}       | ${{}}
    ${'LogicButton'}  | ${{}}
  `('$Name should render without errors', async function ({Name, props}) {
    let {filename, Fixture} = fixtures[Name];
    await testSSR(resolve(filename), 'Fixture', Fixture);
  });

  it('FieldButton', async function () {
    await testSSR(resolve('test/ssr-harness/p30-button-field.tsx'), 'Fixture', FieldButtonFixture);
  });
});
