/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import type {DOMRef} from '../utils/useDOMRef';
import type {JSX} from '@solidjs/web';
import {createEffect, createSignal, merge, untrack} from 'solid-js';
import {SpectrumTableProps} from './TableView';
import {TableViewBase} from './TableViewBase';
import {useTableState} from 'react-stately/useTableState';

interface TableProps<T> extends Omit<SpectrumTableProps<T>, 'UNSTABLE_allowsExpandableRows'> {}

export const TableViewWithoutExpanding = function TableView<T extends object>(
  props: TableProps<T> & {ref?: DOMRef<HTMLDivElement>}
) {
  let [showSelectionCheckboxes, setShowSelectionCheckboxes] = createSignal(
    untrack(() => props.selectionStyle !== 'highlight')
  );
  let state = useTableState(merge(props, {
    get showSelectionCheckboxes() {return showSelectionCheckboxes();},
    get showDragButtons() {return !!props.dragAndDropHooks?.useDraggableCollectionState;},
    get selectionBehavior() {return props.selectionStyle === 'highlight' ? 'replace' as const : 'toggle' as const;}
  }));

  // If the selection behavior changes in state, we need to update showSelectionCheckboxes here due to the circular dependency...
  createEffect(() => state.selectionManager.selectionBehavior !== 'replace', shouldShowCheckboxes => {
    setShowSelectionCheckboxes(shouldShowCheckboxes);
  });

  return <TableViewBase {...props} state={state} />;
} as <T>(props: TableProps<T> & {ref?: DOMRef<HTMLDivElement>}) => JSX.Element;
