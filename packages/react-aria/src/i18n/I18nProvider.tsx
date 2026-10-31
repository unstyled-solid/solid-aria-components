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

import {Direction} from '@react-types/shared';
import {isRTL} from './utils';
import {createContext, useContext} from 'solid-js';
import type {JSX} from '@solidjs/web';
type ReactNode = JSX.Element;
import {useDefaultLocale} from './useDefaultLocale';

export interface Locale {
  /** The [BCP47](https://www.ietf.org/rfc/bcp/bcp47.txt) language code for the locale. */
  locale: string;
  /** The writing direction for the locale. */
  direction: Direction;
}

export interface I18nProviderProps {
  /** Contents that should have the locale applied. */
  children: ReactNode;
  /** The locale to apply to the children. */
  locale?: string;
}

const I18nContext = createContext<Locale | null>(null);

interface I18nProviderWithLocaleProps extends I18nProviderProps {
  locale: string;
}

/**
 * Internal component that handles the case when locale is provided.
 */
function I18nProviderWithLocale(props: I18nProviderWithLocaleProps): JSX.Element {
  let value: Locale = {
    get locale() { return props.locale; },
    get direction() { return isRTL(props.locale) ? 'rtl' : 'ltr'; }
  };

  return <I18nContext value={value}>{props.children}</I18nContext>;
}

interface I18nProviderWithDefaultLocaleProps {
  children: ReactNode;
}

/**
 * Internal component that handles the case when no locale is provided.
 */
function I18nProviderWithDefaultLocale(props: I18nProviderWithDefaultLocaleProps): JSX.Element {
  let defaultLocale = useDefaultLocale();

  return <I18nContext value={defaultLocale}>{props.children}</I18nContext>;
}

/**
 * Provides the locale for the application to all child components.
 */
export function I18nProvider(props: I18nProviderProps): JSX.Element {
  return <>{props.locale
    ? <I18nProviderWithLocale locale={props.locale} children={props.children} />
    : <I18nProviderWithDefaultLocale children={props.children} />}</>;
}

/**
 * Returns the current locale and layout direction.
 */
export function useLocale(): Locale {
  let defaultLocale = useDefaultLocale();
  let context = useContext(I18nContext);
  return context || defaultLocale;
}
