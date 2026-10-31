/*
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {createCalendar, parseDate} from '@internationalized/date';
import {For} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {useObjectRef} from '../../../src/utils/useObjectRef';
import {useDateField} from '../../../src/datepicker/useDateField';
import {useDateFieldState} from 'react-stately/useDateFieldState';
import {useLocale} from '../../../src/i18n/I18nProvider';

// Frozen stories/datepicker/useDatePicker.stories.tsx:20–37. The source
// renders field segment spans, not a picker or editable segment surrogate.
export function ProgrammaticSetValueExampleRender(): JSX.Element {
  let locale = useLocale();
  let state = useDateFieldState({get locale() { return locale.locale; }, createCalendar});
  let ref = useObjectRef<HTMLDivElement>();
  let {fieldProps} = useDateField({'aria-label': 'Date'}, state, ref);
  return (
    <div>
      <div {...fieldProps} ref={ref} data-testid="field">
        <For each={state.segments} keyed={false}>{seg => (
          <span>{seg().text}</span>
        )}</For>
      </div>
       <button onClick={() => state.setValue(parseDate('2020-01-01'))} data-testid="set">
        Set
      </button>
    </div>
  );
}
