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
import {Fixture} from '../../../test/ssr-harness/p10-tabs-basic';

describe('Tabs SSR', function () {
  it('should render without errors', async function () {
    await testSSR(
      resolve('test/ssr-harness/p10-tabs-basic.tsx'),
      'Fixture',
      Fixture,
      () => {
        // Assert that server rendered stuff into the HTML.
        let tabs = screen.getAllByRole('tab');
        expect(tabs.map(o => o.textContent)).toEqual(['Left', 'Middle', 'Right']);
        let tabpanel = screen.getByRole('tabpanel');
        expect(tabpanel).toHaveTextContent('Left content');
        expect(tabpanel).toHaveAttribute('aria-labelledby', tabs[0].id);
      },
      () => {
    // Assert that hydrated UI matches what we expect.
    let tabs = screen.getAllByRole('tab');
    expect(tabs.map(o => o.textContent)).toEqual(['Left', 'Middle', 'Right']);
    let tabpanel = screen.getByRole('tabpanel');
    expect(tabpanel).toHaveTextContent('Left content');
    expect(tabpanel).toHaveAttribute('aria-labelledby', tabs[0].id);
      }
    );
  });
});
