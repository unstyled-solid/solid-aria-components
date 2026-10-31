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

import {isRTL} from './utils';
import {Locale} from './I18nProvider';
import {createSignal, isHydrating, onSettled} from 'solid-js';
import {isServer} from '@solidjs/web';

// Locale passed from server by PackageLocalizationProvider.
const localeSymbol = Symbol.for('react-aria.i18n.locale');
declare global { interface Window { [localeSymbol]?: string } }

/**
 * Gets the locale setting of the browser.
 */
export function getDefaultLocale(): Locale {
  let locale =
    (typeof window !== 'undefined' && window[localeSymbol]) ||
    // @ts-ignore
    (typeof navigator !== 'undefined' && (navigator.language || navigator.userLanguage)) ||
    'en-US';

  try {
    Intl.DateTimeFormat.supportedLocalesOf([locale]);
  } catch {
    locale = 'en-US';
  }
  return {
    locale,
    direction: isRTL(locale) ? 'rtl' : 'ltr'
  };
}

let currentLocale = getDefaultLocale();
let listeners = new Set<(locale: Locale) => void>();

function updateLocale() {
  currentLocale = getDefaultLocale();
  for (let listener of listeners) {
    listener(currentLocale);
  }
}

/**
 * Returns the current browser/system language, and updates when it changes.
 */
export function useDefaultLocale(): Locale {
  let [isSSR, setSSR] = createSignal(isServer || isHydrating());
  let [defaultLocale, setDefaultLocale] = createSignal(currentLocale);

  onSettled(() => {
    setSSR(false);
    if (listeners.size === 0) {
      window.addEventListener('languagechange', updateLocale);
    }

    listeners.add(setDefaultLocale);

    return () => {
      listeners.delete(setDefaultLocale);
      if (listeners.size === 0) {
        window.removeEventListener('languagechange', updateLocale);
      }
    };
  });

  // We cannot determine the browser's language on the server, so default to
  // en-US. This will be updated after hydration on the client to the correct value.
  return {
    get locale() {
      return isSSR() ? ((typeof window !== 'undefined' && window[localeSymbol]) || 'en-US') : defaultLocale().locale;
    },
    get direction() { return isSSR() ? 'ltr' : defaultLocale().direction; }
  };
}
