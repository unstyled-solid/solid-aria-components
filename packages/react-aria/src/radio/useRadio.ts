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
  DOMAttributesWithRef,
  DOMProps,
  FocusableProps,
  PressEvents,
  RefObject
} from '@react-types/shared';
import {filterDOMProps} from '../utils/filterDOMProps';
import type {JSX} from '@solidjs/web';
import {createEffect, type Accessor} from 'solid-js';
type InputHTMLAttributes<T> = JSX.InputHTMLAttributes<T>;
type LabelHTMLAttributes<T> = JSX.LabelHTMLAttributes<T>;
type ReactNode = JSX.Element;
import {mergeProps} from '../utils/mergeProps';
import {radioGroupData} from './utils';
import {RadioGroupState} from 'react-stately/useRadioGroupState';
import {useFocusable} from '../interactions/useFocusable';
import {useFormReset} from '../utils/useFormReset';
import {useFormValidation} from '../form/useFormValidation';
import {usePress} from '../interactions/usePress';
import {useSlotId2} from '../utils/useSlot';

export interface RadioProps extends FocusableProps {
  /**
   * The value of the radio button, used when submitting an HTML form.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio#Value).
   */
  value: string;
  /**
   * The label for the Radio. Accepts any renderable node.
   */
  children?: ReactNode;
  /**
   * Whether the radio button is disabled or not.
   * Shows that a selection exists, but is not available in that circumstance.
   */
  isDisabled?: boolean;
}

export interface AriaRadioProps extends RadioProps, DOMProps, AriaLabelingProps, PressEvents {}

export interface RadioAria {
  /** Props for the label wrapper element. */
  labelProps: LabelHTMLAttributes<HTMLLabelElement>;
  /** Props for the input element. */
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  /** Props for the checkbox description element, if any. */
  descriptionProps: DOMAttributesWithRef<HTMLElement>;
  /** Whether the radio is disabled. */
  isDisabled: Accessor<boolean>;
  /** Whether the radio is currently selected. */
  isSelected: Accessor<boolean>;
  /** Whether the radio is in a pressed state. */
  isPressed: Accessor<boolean>;
}

/**
 * Provides the behavior and accessibility implementation for an individual
 * radio button in a radio group.
 *
 * @param props - Props for the radio.
 * @param state - State for the radio group, as returned by `useRadioGroupState`.
 * @param ref - Ref to the HTML input element.
 */
export function useRadio(
  props: AriaRadioProps,
  state: RadioGroupState,
  ref: RefObject<HTMLInputElement | null>
): RadioAria {
  const isDisabled = () => !!(props.isDisabled || state.isDisabled);
  createEffect(() => props.children != null || props['aria-label'] != null || props['aria-labelledby'] != null, hasLabel => {
  if (!hasLabel && process.env.NODE_ENV !== 'production') {
    console.warn(
      'If you do not provide children, you must specify an aria-label for accessibility'
    );
  }
  });

  let checked = () => state.selectedValue === props.value;

  let onChange = (e: Event) => {
    e.stopPropagation();
    state.setSelectedValue(props.value);
  };

  // Handle press state for keyboard interactions and cases where labelProps is not used.
  let {pressProps, isPressed} = usePress({
    get onPressStart() {return props.onPressStart;},
    get onPressEnd() {return props.onPressEnd;},
    get onPressChange() {return props.onPressChange;},
    get onPress() {return props.onPress;},
    get onPressUp() {return props.onPressUp;},
    get onClick() {return props.onClick;},
    get isDisabled() {return isDisabled();}
  });

  // Handle press state on the label.
  let {pressProps: labelProps, isPressed: isLabelPressed} = usePress({
    get onPressStart() {return props.onPressStart;},
    get onPressEnd() {return props.onPressEnd;},
    get onPressChange() {return props.onPressChange;},
    get onPressUp() {return props.onPressUp;},
    get onClick() {return props.onClick;},
    get isDisabled() {return isDisabled();},
    onPress(e) {
      props.onPress?.(e);
      state.setSelectedValue(props.value);
      ref.current?.focus();
    }
  });

  let {focusableProps} = useFocusable(
    mergeProps(props, {
      onFocus: () => state.setLastFocusedValue(props.value)
    }),
    ref
  );
  let interactions = mergeProps(pressProps, focusableProps);
  let domProps = filterDOMProps(props, {labelable: true});
  let tabIndex = (): number | undefined => {
  let index: number | undefined = -1;
  if (state.selectedValue != null) {
    if (state.selectedValue === props.value) {
      index = 0;
    }
  } else if (state.lastFocusedValue === props.value || state.lastFocusedValue == null) {
    index = 0;
  }
  if (isDisabled()) {
    index = undefined;
  }
  return index;
  };

  let group = radioGroupData.get(state)!;
  useFormReset(ref, () => state.defaultSelectedValue, state.setSelectedValue);
  useFormValidation({get validationBehavior() {return group.validationBehavior;}}, state, ref);

  let descriptionProps = useSlotId2();

  return {
    labelProps: mergeProps(
      labelProps,
      {
          onClick: (e: MouseEvent) => e.preventDefault(),

          // Prevent label from being focused when mouse down on it.
          // Note, this does not prevent the input from being focused in the `click` event.
          onMouseDown: (e: MouseEvent) => e.preventDefault()
      }
    ) as JSX.LabelHTMLAttributes<HTMLLabelElement>,
    inputProps: mergeProps(domProps, interactions, {
      type: 'radio',
      get name() {return group.name;},
      get form() {return group.form;},
      get tabIndex() {return tabIndex();},
      get disabled() {return isDisabled();},
      get required() {return state.isRequired && group.validationBehavior === 'native';},
      get checked() {return checked();},
      get value() {return props.value;},
      onChange,
      get 'aria-describedby'() {return (
        [
          props['aria-describedby'],
          descriptionProps.id,
          state.isInvalid ? group.errorMessageId : null,
          group.descriptionId
        ]
          .filter(Boolean)
           .join(' ') || undefined);}
    }) as JSX.InputHTMLAttributes<HTMLInputElement>,
    descriptionProps,
    isDisabled,
    isSelected: checked,
    isPressed: () => isPressed() || isLabelPressed()
  };
}
