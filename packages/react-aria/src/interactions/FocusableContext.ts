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

// Extracted from the terminal copy of useFocusable.tsx so collection context
// forwarding does not load unrelated, not-yet-adapted interaction hooks.
import {createContext} from 'solid-js';
import type {Element as Renderable} from 'solid-js';
import type {DOMAttributes, FocusableElement} from '@react-types/shared';
import type {Ref} from '../utils/useObjectRef';

export interface FocusableProviderProps extends Omit<DOMAttributes, 'ref'> {
  children?: Renderable;
}

export interface FocusableContextValue extends FocusableProviderProps {
  ref?: Ref<FocusableElement>;
}

/** @private */
export const FocusableContext = createContext<FocusableContextValue | null>(null);
