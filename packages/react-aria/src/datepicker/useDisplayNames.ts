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

import intlMessages from '../../intl/datepicker/*.json';
import {LocalizedString, LocalizedStringDictionary} from '@internationalized/string';
import {useLocale} from '../i18n/I18nProvider';
import {useLocalizedStringDictionary} from '../i18n/useLocalizedStringFormatter';
import {createMemo} from 'solid-js';

type Field = Intl.DateTimeFormatPartTypes;
interface DisplayNames {
  of(field: Field): string | undefined;
}

/** @private */
export function useDisplayNames(): DisplayNames {
  let locale = useLocale();
  let dictionary = useLocalizedStringDictionary(intlMessages, '@react-aria/datepicker');
  let names = createMemo<DisplayNames>(() => {
    // Try to use Intl.DisplayNames if possible. It may be supported in browsers, but not support the dateTimeField
    // type as that was only added in v2. https://github.com/tc39/intl-displaynames-v2
    try {
      return new Intl.DisplayNames(locale.locale, {type: 'dateTimeField'});
    } catch {
      return new DisplayNamesPolyfill(locale.locale, dictionary);
    }
  });
  return {of: field => names().of(field)};
}

class DisplayNamesPolyfill implements DisplayNames {
  private locale: string;
  private dictionary: LocalizedStringDictionary<string, LocalizedString>;

  constructor(locale: string, dictionary: LocalizedStringDictionary<string, LocalizedString>) {
    this.locale = locale;
    this.dictionary = dictionary;
  }

  of(field: Field): string {
    let value = this.dictionary.getStringForLocale(field, this.locale);
    if (typeof value !== 'string') {
      throw new TypeError(`Expected a display name string for ${field}`);
    }
    return value;
  }
}
