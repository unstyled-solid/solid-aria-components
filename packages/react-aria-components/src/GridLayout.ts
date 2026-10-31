/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {GridLayout as BaseGridLayout, GridLayoutOptions} from 'react-stately/useVirtualizerState';
import type {LayoutOptionsDelegate} from './Virtualizer';
import {useLocale} from 'react-aria/I18nProvider';
import {createMemo} from 'solid-js';

export class GridLayout<T, O extends GridLayoutOptions = GridLayoutOptions>
  extends BaseGridLayout<T, O>
  implements LayoutOptionsDelegate<GridLayoutOptions>
{
  // Automatically determine the layout direction from the current locale.
  useLayoutOptions(): GridLayoutOptions {
    let locale = useLocale();
    // Virtualizer invokes this delegate in its owned layout-options memo. Read
    // the native memo here so locale changes invalidate that projection and
    // produce a new options snapshot for the existing layout invalidation logic.
    return createMemo(() => ({direction: locale.direction}))();
  }
}
