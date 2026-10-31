/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import {testSSR} from '@react-spectrum/test-utils-internal';
import {resolve} from 'node:path';
import {Basic, StrictOwnership, NestedStrictOwnership} from './SSRProvider.fixture';

const filename = resolve(process.cwd(), 'packages/react-aria/test/ssr/SSRProvider.fixture.tsx');

describe('SSRProvider SSR', function () {
  it('should render without errors', async function () {
    await testSSR(filename, 'Basic', () => <Basic />);
  });

  it('should render without errors in StrictMode', async function () {
    await testSSR(filename, 'StrictOwnership', () => <StrictOwnership />);
  });

  it('should render without errors in StrictMode with nested SSRProviders', async function () {
    await testSSR(filename, 'NestedStrictOwnership', () => <NestedStrictOwnership />);
  });
});
