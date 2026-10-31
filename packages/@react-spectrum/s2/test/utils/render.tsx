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

import '../../page.css';
import {Provider, type ProviderProps} from '../../src/Provider';
import type {JSX} from '@solidjs/web';
import {render as vitestBrowserRender} from '../../../../../test/browser/render';

export interface S2RenderOptions {
  /**
   * Options to pass to the Provider.
   */
  providerOptions?: Omit<ProviderProps, 'children'>;
}

/**
 * Custom render function that wraps components in the S2 Provider.
 * Uses vitest-browser-react for browser mode testing.
 */
export async function render(ui: () => JSX.Element, options: S2RenderOptions = {}) {
  const {providerOptions = {}} = options;
  const {locale = 'en-US', colorScheme = 'light', ...restProviderOptions} = providerOptions;

  function Wrapper(props: {children: JSX.Element}) {
    return (
      <Provider locale={locale} colorScheme={colorScheme} {...restProviderOptions}>
        {props.children}
      </Provider>
    );
  }

  return await vitestBrowserRender(() => <Wrapper>{ui()}</Wrapper>);
}
