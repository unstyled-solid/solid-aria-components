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

import {
  AriaLabelingProps,
  AriaValidationProps,
  DOMAttributes,
  DOMProps,
  InputDOMProps,
  ValidationResult
} from '@react-types/shared';
import {filterDOMProps} from '../utils/filterDOMProps';
import {getEventTarget} from '../utils/shadowdom/DOMFunctions';
import {getFocusableTreeWalker} from '../focus/FocusScope';
import {getOwnerWindow} from '../utils/domHelpers';
import {mergeProps} from '../utils/mergeProps';
import {radioGroupData} from './utils';
import {RadioGroupProps, RadioGroupState} from 'react-stately/useRadioGroupState';
import {useField} from '../label/useField';
import {useFocusWithin} from '../interactions/useFocusWithin';
import {useId} from '../utils/useId';
import {useKeyboard} from '../interactions/useKeyboard';
import {useLocale} from '../i18n/I18nProvider';
import {merge, type Accessor} from 'solid-js';

export interface AriaRadioGroupProps
  extends RadioGroupProps, InputDOMProps, DOMProps, AriaLabelingProps, AriaValidationProps {}

export interface RadioGroupAria extends Omit<ValidationResult, 'isInvalid'> {
  isInvalid: Accessor<boolean>;
  /** Props for the radio group wrapper element. */
  radioGroupProps: DOMAttributes;
  /** Props for the radio group's visible label (if any). */
  labelProps: DOMAttributes<HTMLElement>;
  /** Props for the radio group description element, if any. */
  descriptionProps: DOMAttributes<HTMLElement>;
  /** Props for the radio group error message element, if any. */
  errorMessageProps: DOMAttributes<HTMLElement>;
}

/**
 * Provides the behavior and accessibility implementation for a radio group component.
 * Radio groups allow users to select a single item from a list of mutually exclusive options.
 *
 * @param props - Props for the radio group.
 * @param state - State for the radio group, as returned by `useRadioGroupState`.
 */
export function useRadioGroup(props: AriaRadioGroupProps, state: RadioGroupState): RadioGroupAria {
  let orientation = () => props.orientation ?? 'vertical';
  let validationBehavior = () => props.validationBehavior ?? 'aria';
  let locale = useLocale();

  let {labelProps, fieldProps, descriptionProps, errorMessageProps} = useField(merge(props, {
    // Radio group is not an HTML input element so it
    // shouldn't be labeled by a <label> element.
    labelElementType: 'span',
    get isInvalid() {return state.isInvalid;},
    get errorMessage() {return props.errorMessage || state.displayValidation.validationErrors;}
  }));

  let domProps = filterDOMProps(props, {labelable: true});

  // When the radio group loses focus, reset the focusable radio to null if
  // there is no selection. This allows tabbing into the group from either
  // direction to go to the first or last radio.
  let {focusWithinProps} = useFocusWithin({
    onBlurWithin(e) {
      props.onBlur?.(e);
      if (!state.selectedValue) {
        state.setLastFocusedValue(null);
      }
    },
    get onFocusWithin() {return props.onFocus;},
    get onFocusWithinChange() {return props.onFocusChange;}
  });

  function getNextElement(nextDir: 'next' | 'prev', e: KeyboardEvent) {
    let root = e.currentTarget as HTMLElement;
    let walker = getFocusableTreeWalker(root, {
      from: getEventTarget(e) as Element,
      accept: node => node instanceof getOwnerWindow(node).HTMLInputElement && node.type === 'radio'
    });
    let nextElem;
    if (nextDir === 'next') {
      nextElem = walker.nextNode();
      if (!nextElem) {
        walker.currentNode = root;
        nextElem = walker.firstChild();
      }
    } else {
      nextElem = walker.previousNode();
      if (!nextElem) {
        walker.currentNode = root;
        nextElem = walker.lastChild();
      }
    }

    if (nextElem) {
      // Call focus on nextElem so that keyboard navigation scrolls the radio into view
      (nextElem as HTMLInputElement).focus();
      state.setSelectedValue((nextElem as HTMLInputElement).value);
      return true;
    }
    return false;
  }

  let {keyboardProps} = useKeyboard({
    shortcuts: {
      ArrowRight: e => {
        let nextDir: 'next' | 'prev' =
          locale.direction === 'rtl' && orientation() !== 'vertical' ? 'prev' : 'next';
        return getNextElement(nextDir, e);
      },
      ArrowLeft: e => {
        let nextDir: 'next' | 'prev' =
          locale.direction === 'rtl' && orientation() !== 'vertical' ? 'next' : 'prev';
        return getNextElement(nextDir, e);
      },
      ArrowDown: e => {
        return getNextElement('next', e);
      },
      ArrowUp: e => {
        return getNextElement('prev', e);
      }
    },
    allowRepeats: true
  });

  let groupName = useId(() => props.name);
  radioGroupData.set(state, {
    get name() {return groupName();},
    get form() {return props.form;},
    get descriptionId() {return typeof descriptionProps.id === 'string' ? descriptionProps.id : undefined;},
    get errorMessageId() {return typeof errorMessageProps.id === 'string' ? errorMessageProps.id : undefined;},
    get validationBehavior() {return validationBehavior();}
  });

  return {
    radioGroupProps: mergeProps(domProps, {
      // https://www.w3.org/TR/wai-aria-1.2/#radiogroup
      role: 'radiogroup',
      get 'aria-invalid'() {return state.isInvalid ? 'true' : undefined;},
      get 'aria-errormessage'() {return props['aria-errormessage'];},
      get 'aria-readonly'() {return props.isReadOnly ? 'true' : undefined;},
      get 'aria-required'() {return props.isRequired ? 'true' : undefined;},
      get 'aria-disabled'() {return props.isDisabled ? 'true' : undefined;},
      get 'aria-orientation'() {return orientation();}
    }, keyboardProps, fieldProps, focusWithinProps),
    labelProps,
    descriptionProps,
    errorMessageProps,
    isInvalid: () => state.displayValidation.isInvalid,
    get validationErrors() {return state.displayValidation.validationErrors;},
    get validationDetails() {return state.displayValidation.validationDetails;}
  };
}
