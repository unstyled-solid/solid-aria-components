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

import {screen, testSSR} from '@react-spectrum/test-utils-internal';
import {resolve} from 'node:path';
import {ViewportEmpty, ViewportDimensions} from '../../../../test/ssr-harness/p03-f-viewport.fixture';

const filename = resolve(process.cwd(), 'test/ssr-harness/p03-f-viewport.fixture.tsx');

describe('useViewportSize SSR', () => {
  // Original scripts/setupTests.js:119–129 browser-dimension projection.
  let width: PropertyDescriptor | undefined;
  let height: PropertyDescriptor | undefined;
  beforeEach(() => {
    width = Object.getOwnPropertyDescriptor(document.documentElement, 'clientWidth');
    height = Object.getOwnPropertyDescriptor(document.documentElement, 'clientHeight');
    Object.defineProperty(document.documentElement, 'clientWidth', {get: () => window.innerWidth, configurable: true});
    Object.defineProperty(document.documentElement, 'clientHeight', {get: () => window.innerHeight, configurable: true});
  });
  afterEach(() => {
    if (width) Object.defineProperty(document.documentElement, 'clientWidth', width);
    else Reflect.deleteProperty(document.documentElement, 'clientWidth');
    if (height) Object.defineProperty(document.documentElement, 'clientHeight', height);
    else Reflect.deleteProperty(document.documentElement, 'clientHeight');
  });
  it('should render without errors', async () => {
    await testSSR(
      filename, 'ViewportEmpty', () => <ViewportEmpty />
    );
  });

  it('should update dimensions after hydration', async () => {
    await testSSR(
      filename, 'ViewportDimensions', () => <ViewportDimensions />,
      () => {
        expect(screen.getByTestId('viewport')).toHaveTextContent('0x0');
      },
      () => {
        expect(screen.getByTestId('viewport')).not.toHaveTextContent('0x0');
      }
    );

  });
});
