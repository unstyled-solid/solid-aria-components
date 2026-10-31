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

import {AriaButtonProps} from '../button/useButton';

import {
  AriaLabelingProps,
  DOMAttributes,
  DOMProps,
  FocusableDOMProps,
  KeyboardDelegate,
  RefObject,
  ValidationResult
} from '@react-types/shared';
import {AriaListBoxOptions} from '../listbox/useListBox';
import {chain} from '../utils/chain';
import {filterDOMProps} from '../utils/filterDOMProps';
import {createMemo, merge, omit, type Accessor} from 'solid-js';
import type {FocusEvent} from '@react-types/shared';
import {HiddenSelectProps} from './HiddenSelect';
import {ListKeyboardDelegate} from '../selection/ListKeyboardDelegate';
import {mergeProps} from '../utils/mergeProps';
import {nodeContains} from '../utils/shadowdom/DOMFunctions';
import {SelectionMode, SelectProps, SelectState} from 'react-stately/useSelectState';
import {setInteractionModality} from '../interactions/useFocusVisible';
import {useCollator} from '../i18n/useCollator';
import {useField} from '../label/useField';
import {useId} from '../utils/useId';
import {useKeyboard} from '../interactions/useKeyboard';
import {useMenuTrigger} from '../menu/useMenuTrigger';
import {useTypeSelect} from '../selection/useTypeSelect';

export interface AriaSelectProps<T, M extends SelectionMode = 'single'>
  extends SelectProps<T, M>, DOMProps, AriaLabelingProps, FocusableDOMProps {
  /**
   * Describes the type of autocomplete functionality the input should provide if any. See
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautocomplete).
   */
  autoComplete?: string;
  /**
   * The name of the input, used when submitting an HTML form.
   */
  name?: string;
  /**
   * The `<form>` element to associate the input with.
   * The value of this attribute must be the id of a `<form>` in the same document.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#form).
   */
  form?: string;
}

export interface AriaSelectOptions<T, M extends SelectionMode = 'single'> extends Omit<
  AriaSelectProps<T, M>,
  'children'
> {
  /**
   * An optional keyboard delegate implementation for type to select,
   * to override the default.
   */
  keyboardDelegate?: KeyboardDelegate;
}

export interface SelectAria<T, M extends SelectionMode = 'single'> {
  isInvalid: Accessor<boolean>;
  validationErrors: Accessor<ValidationResult['validationErrors']>;
  validationDetails: Accessor<ValidationResult['validationDetails']>;
  /** Props for the label element. */
  labelProps: DOMAttributes;

  /** Props for the popup trigger element. */
  triggerProps: AriaButtonProps;

  /** Props for the element representing the selected value. */
  valueProps: DOMAttributes;

  /** Props for the popup. */
  menuProps: AriaListBoxOptions<T>;

  /** Props for the select's description element, if any. */
  descriptionProps: DOMAttributes<HTMLElement>;

  /** Props for the select's error message element, if any. */
  errorMessageProps: DOMAttributes<HTMLElement>;

  /** Props for the hidden select element. */
  hiddenSelectProps: HiddenSelectProps<T, M>;
}

interface SelectData {
  isDisabled?: boolean;
  isRequired?: boolean;
  name?: string;
  form?: string;
  validationBehavior?: 'aria' | 'native';
}

export const selectData: WeakMap<SelectState<any, any>, SelectData> = new WeakMap<
  SelectState<any>,
  SelectData
>();

/**
 * Provides the behavior and accessibility implementation for a select component.
 * A select displays a collapsible list of options and allows a user to select one of them.
 *
 * @param props - Props for the select.
 * @param state - State for the select, as returned by `useListState`.
 */
export function useSelect<T, M extends SelectionMode = 'single'>(
  props: AriaSelectOptions<T, M>,
  state: SelectState<T, M>,
  ref: RefObject<HTMLElement | null>
): SelectAria<T, M> {

  // By default, a KeyboardDelegate is provided which uses the DOM to query layout information (e.g. for page up/page down).
  // When virtualized, the layout object will be passed in as a prop and override this.
  let collator = useCollator({usage: 'search', sensitivity: 'base'});
  let delegate = createMemo(
    () =>
      props.keyboardDelegate ||
      new ListKeyboardDelegate(state.collection, state.disabledKeys, ref, collator)
  );

  let {menuTriggerProps, menuProps} = useMenuTrigger<T>(
    {
      get isDisabled() {return props.isDisabled;},
      type: 'listbox'
    },
    state,
    ref
  );

  let {keyboardProps} = useKeyboard({
    shortcuts: {
      ArrowLeft: () => {
        if (state.selectionManager.selectionMode === 'multiple') {
          return false;
        }
        let key =
          state.selectedKey != null
            ? delegate().getKeyAbove?.(state.selectedKey)
            : delegate().getFirstKey?.();
        if (key != null) {
          state.setSelectedKey(key);
        }
      },
      ArrowRight: () => {
        if (state.selectionManager.selectionMode === 'multiple') {
          return false;
        }
        let key =
          state.selectedKey != null
            ? delegate().getKeyBelow?.(state.selectedKey)
            : delegate().getFirstKey?.();
        if (key != null) {
          state.setSelectedKey(key);
        }
      }
    },
    allowRepeats: true,
    get onKeyDown() {return props.onKeyDown;},
    get onKeyUp() {return props.onKeyUp;}
  });

  let {typeSelectProps} = useTypeSelect({
    get keyboardDelegate() {return delegate();},
    get selectionManager() {return state.selectionManager;},
    onTypeSelect(key) {
      state.setSelectedKey(key);
    }
  });

  let {labelProps, fieldProps, descriptionProps, errorMessageProps} = useField(merge(props, {
    labelElementType: 'span',
    get isInvalid() {return state.displayValidation.isInvalid;},
    get errorMessage() {return props.errorMessage || state.displayValidation.validationErrors;}
  }));

  let domProps = filterDOMProps(props, {labelable: true});
  let triggerProps = mergeProps(omit(typeSelectProps, () => state.selectionManager.selectionMode === 'multiple'), menuTriggerProps, fieldProps);

  let valueId = useId();

  selectData.set(state, {
    get isDisabled() {return props.isDisabled;},
    get isRequired() {return props.isRequired;},
    get name() {return props.name;},
    get form() {return props.form;},
    get validationBehavior() {return props.validationBehavior ?? 'aria';}
  });

  return {
    labelProps: merge(labelProps, {
      onClick: () => {
        if (!props.isDisabled) {
          ref.current?.focus();

          // Show the focus ring so the user knows where focus went
          setInteractionModality('keyboard');
        }
      }
    }),
    triggerProps: mergeProps(domProps, merge(triggerProps, {
      get isDisabled() {return props.isDisabled;},
      get onKeyDown() {return chain(triggerProps.onKeyDown, keyboardProps.onKeyDown);},
      get onKeyUp() {return keyboardProps.onKeyUp as AriaButtonProps['onKeyUp'];},
      get 'aria-labelledby'() {return [
        valueId(),
        triggerProps['aria-labelledby'],
        triggerProps['aria-label'] && !triggerProps['aria-labelledby'] ? triggerProps.id : null
      ]
        .filter(Boolean)
        .join(' ');},
      onFocus(e: FocusEvent) {
        if (state.isFocused) {
          return;
        }

        if (props.onFocus) {
          props.onFocus(e);
        }

        if (props.onFocusChange) {
          props.onFocusChange(true);
        }

        state.setFocused(true);
      },
      onBlur(e: FocusEvent) {
        if (state.isOpen) {
          return;
        }

        if (props.onBlur) {
          props.onBlur(e);
        }

        if (props.onFocusChange) {
          props.onFocusChange(false);
        }

        state.setFocused(false);
      }
    })),
    valueProps: {
      get id() {return valueId();}
    },
    menuProps: merge(menuProps, {
      onAction: undefined,
      get autoFocus() {return state.focusStrategy || true;},
      shouldSelectOnPressUp: true,
      shouldFocusOnHover: true,
      disallowEmptySelection: true,
      linkBehavior: 'selection' as const,
      onBlur: (e: FocusEvent) => {
        if (nodeContains(e.currentTarget, e.relatedTarget as Node)) {
          return;
        }

        if (props.onBlur) {
          props.onBlur(e);
        }

        if (props.onFocusChange) {
          props.onFocusChange(false);
        }

        state.setFocused(false);
      },
      get 'aria-labelledby'() {return [
        fieldProps['aria-labelledby'],
        triggerProps['aria-label'] && !fieldProps['aria-labelledby'] ? triggerProps.id : null
      ]
        .filter(Boolean)
        .join(' ');}
    }) as AriaListBoxOptions<T>,
    descriptionProps,
    errorMessageProps,
    isInvalid: () => state.displayValidation.isInvalid,
    validationErrors: () => state.displayValidation.validationErrors,
    validationDetails: () => state.displayValidation.validationDetails,
    hiddenSelectProps: {
      get isDisabled() {return props.isDisabled;},
      get name() {return props.name;},
      get label() {return props.label;},
      state,
      triggerRef: ref,
      get form() {return props.form;}
    }
  };
}
