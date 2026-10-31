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

import {AriaCheckboxProps} from '../checkbox/useCheckbox';
import {getRowLabelledBy} from './utils';
import intlMessages from '../../intl/table/*.json';
import {Key} from '@react-types/shared';
import {TableState} from 'react-stately/useTableState';
import {useGridSelectionCheckbox} from '../grid/useGridSelectionCheckbox';
import {useLocalizedStringFormatter} from '../i18n/useLocalizedStringFormatter';
import {merge} from 'solid-js';

export interface AriaTableSelectionCheckboxProps {
  /** A unique key for the checkbox. */
  key: Key;
}

export interface TableSelectionCheckboxAria {
  /** Props for the row selection checkbox element. */
  checkboxProps: AriaCheckboxProps;
}

export interface TableSelectAllCheckboxAria {
  /** Props for the select all checkbox element. */
  checkboxProps: AriaCheckboxProps;
}

/**
 * Provides the behavior and accessibility implementation for a selection checkbox in a table.
 *
 * @param props - Props for the selection checkbox.
 * @param state - State of the table, as returned by `useTableState`.
 */
export function useTableSelectionCheckbox<T>(
  props: AriaTableSelectionCheckboxProps,
  state: TableState<T>
): TableSelectionCheckboxAria {
  const {checkboxProps} = useGridSelectionCheckbox(props, state);

  return {
    checkboxProps: merge(checkboxProps, {
      get 'aria-labelledby'() { return `${checkboxProps.id} ${getRowLabelledBy(state, props.key)}`; }
    })
  };
}

/**
 * Provides the behavior and accessibility implementation for the select all checkbox in a table.
 *
 * @param props - Props for the select all checkbox.
 * @param state - State of the table, as returned by `useTableState`.
 */
export function useTableSelectAllCheckbox<T>(state: TableState<T>): TableSelectAllCheckboxAria {
  const stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-aria/table');

  return {
    checkboxProps: {
      get 'aria-label'() { return stringFormatter.format(state.selectionManager.selectionMode === 'single' ? 'select' : 'selectAll'); },
      get isSelected() { return state.selectionManager.isSelectAll; },
      get isDisabled() { return (
        state.selectionManager.selectionMode !== 'multiple' ||
        state.collection.size === 0 ||
        (state.collection.rows.length === 1 && state.collection.rows[0].type === 'loader')); },
      get isIndeterminate() { return !state.selectionManager.isEmpty && !state.selectionManager.isSelectAll; },
      onChange: () => state.selectionManager.toggleSelectAll()
    }
  };
}
