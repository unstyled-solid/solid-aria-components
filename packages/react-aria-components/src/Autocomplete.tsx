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

import {AriaAutocompleteProps, useAutocomplete} from 'react-aria/useAutocomplete';
import {
  AriaLabelingProps,
  DOMProps,
  FocusableElement,
  FocusEvents,
  KeyboardEvents,
  Node,
  ValueBase
} from '@react-types/shared';
import {AriaTextFieldProps} from 'react-aria/useTextField';
import {
  AutocompleteState,
  useAutocompleteState
} from 'react-stately/private/autocomplete/useAutocompleteState';
import {
  ContextValue,
  Provider,
  removeDataAttributes,
  SlotProps,
  SlottedContextValue,
  useSlottedContext
} from './utils';
import {mergeProps} from 'react-aria/mergeProps';
import {createContext, createMemo, merge} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {useObjectRef} from 'react-aria/useObjectRef';
import {FieldInputContext} from './FieldInputContext';
export {FieldInputContext} from './FieldInputContext';

export interface AutocompleteProps<T = object> extends AriaAutocompleteProps<T>, SlotProps {}
export const AutocompleteContext =
  createContext<SlottedContextValue<Partial<AutocompleteProps<any>>>>(null);
export const AutocompleteStateContext = createContext<AutocompleteState | null>(null);

import {SelectableCollectionContext} from './SelectableCollectionContext';
export {SelectableCollectionContext} from './SelectableCollectionContext';
export type {SelectableCollectionContextValue} from './SelectableCollectionContext';

/**
 * An autocomplete allows users to search or filter a list of suggestions.
 */
export function Autocomplete<T>(props: AutocompleteProps<T>): JSX.Element {
  let input = props;
  let ctx = createMemo(() => useSlottedContext(AutocompleteContext, input.slot));
  props = mergeProps(merge(() => ctx() ?? {}), input);
  let state = useAutocompleteState(props);
  let inputRef = useObjectRef<HTMLInputElement>();
  let collectionRef = useObjectRef<HTMLElement>();
  // The shared field context is focusable-element-wide; this autocomplete's
  // actual field is the input required by the aria hook.
  let fieldInputRef = (element: FocusableElement | null) => inputRef(element as HTMLInputElement | null);
  let aria = useAutocomplete(
    merge(removeDataAttributes(props), {
      get filter() { return props.filter; },
      get disableAutoFocusFirst() { return props.disableAutoFocusFirst; },
      inputRef,
      collectionRef
    }),
    state
  );

  return (
    <Provider
      values={[
        [AutocompleteStateContext, state],
        [
          FieldInputContext,
          merge(aria.inputProps, {
            ref: fieldInputRef
          })
        ],
        [
          SelectableCollectionContext,
          merge(aria.collectionProps, {
            get filter() { return aria.filter; },
            get ref() { return aria.collectionRef; }
          })
        ]
      ]}>
      {props.children}
    </Provider>
  );
}
