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

import {screen, testSSR} from '@react-spectrum/test-utils-internal';
import {resolve} from 'node:path';
import {Fixture} from '../../../test/ssr-harness/p11-select-default';

describe('Select SSR', function () {
  it('should render text of default selected key', async function () {
    await testSSR(
      resolve('test/ssr-harness/p11-select-default.tsx'),
      'Fixture',
      Fixture,
      () => {
        // Assert that server rendered stuff into the HTML.
        let button = screen.getByRole('button');
        expect(button.textContent).toBe('Dog');
      },
      () => {
    // Assert that hydrated UI matches what we expect.
    let button = screen.getByRole('button');
    expect(button.textContent).toBe('Dog');
      }
    );
  });
});
