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
  DOMAttributesWithRef,
  FocusableDOMProps,
  InputDOMProps,
  PressEvents,
  RefObject,
  ValidationResult
} from '@react-types/shared';
import type {JSX} from '@solidjs/web';
import {Accessor, createEffect, createSignal, merge, untrack} from 'solid-js';
import {filterDOMProps} from '../utils/filterDOMProps';
import {getEventTarget} from '../utils/shadowdom/DOMFunctions';
import {mergeProps} from '../utils/mergeProps';
import {
  privateValidationStateProp,
  FormValidationState,
  useFormValidationState
} from 'react-stately/private/form/useFormValidationState';
import {ToggleProps, ToggleState} from 'react-stately/useToggleState';
import {useFocusable} from '../interactions/useFocusable';
import {useFormReset} from '../utils/useFormReset';
import {useFormValidation} from '../form/useFormValidation';
import {usePress} from '../interactions/usePress';
import {useSlotId2} from '../utils/useSlot';

export interface AriaToggleProps
  extends
    ToggleProps,
    FocusableDOMProps,
    AriaLabelingProps,
    AriaValidationProps,
    InputDOMProps,
    PressEvents {
  /**
   * Identifies the element (or elements) whose contents or presence are controlled by the current
   * element.
   */
  'aria-controls'?: string;
}

export interface ToggleAria extends Omit<ValidationResult, 'isInvalid'> {
  /** Props to be spread on the label element. */
  labelProps: JSX.LabelHTMLAttributes<HTMLLabelElement>;
  /** Props to be spread on the input element. */
  inputProps: JSX.InputHTMLAttributes<HTMLInputElement>;
  /** Props for the checkbox description element, if any. */
  descriptionProps: DOMAttributesWithRef<HTMLElement>;
  /** Props for the checkbox error message element, if any. */
  errorMessageProps: DOMAttributesWithRef<HTMLElement>;
  /** Whether the toggle is selected. */
  isSelected: Accessor<boolean>;
  /** Whether the toggle is in a pressed state. */
  isPressed: Accessor<boolean>;
  /** Whether the toggle is disabled. */
  isDisabled: Accessor<boolean>;
  /** Whether the toggle is read only. */
  isReadOnly: Accessor<boolean>;
  /** Whether the toggle is invalid. */
  isInvalid: Accessor<boolean>;
}

/**
 * Handles interactions for toggle elements, e.g. Checkboxes and Switches.
 */
export function useToggle(
  props: AriaToggleProps,
  state: ToggleState,
  ref: RefObject<HTMLInputElement | null>
): ToggleAria {
  let isDisabled = () => props.isDisabled ?? false;
  let isReadOnly = () => props.isReadOnly ?? false;
  let validationBehavior = () => props.validationBehavior ?? 'aria';

  // Create validation state here because it doesn't make sense to add to general useToggleState.
  let validationState = useFormValidationState(merge(props, {
    get value() { return state.isSelected; }
  }));
  let isInvalid = () => validationState.displayValidation.isInvalid || props.validationState === 'invalid';

  // Validation consumes boolean selection; the unrelated HTML submission value
  // remains a string. Preserve the same live props object at runtime.
  useFormValidation<boolean>(props as Omit<AriaToggleProps, 'value'>, validationState, ref);

  let onChange: JSX.EventHandler<HTMLInputElement, Event> = e => {
    // since we spread props on label, onChange will end up there as well as in here.
    // so we have to stop propagation at the lowest level that we care about
    e.stopPropagation();
    let input = getEventTarget(e) as HTMLInputElement;
    state.setSelected(input.checked);
    // Native checkbox activation changes checked even when readonly selection
    // is refused. Restore the accepted state as React's controlled input did.
    // Do not sample/restore an accepted staged write before it commits.
    if (isReadOnly()) {
      input.checked = state.isSelected;
    } else if (props.isSelected !== undefined) {
      // React restores controlled inputs after dispatch. Let accepted staged
      // parent writes commit first, then restore the actual accepted selection
      // (which may still be unchanged when the parent refuses the request).
      queueMicrotask(() => {
        if (ref.current === input) {
          input.checked = untrack(() => state.isSelected);
        }
      });
    }
  };

  createEffect(() => props.children != null || props['aria-label'] != null || props['aria-labelledby'] != null, hasLabel => {
    if (!hasLabel && process.env.NODE_ENV !== 'production') {
      console.warn('If you do not provide children, you must specify an aria-label for accessibility');
    }
  });

  // Handle press state for keyboard interactions and cases where labelProps is not used.
  let {pressProps, isPressed} = usePress({
    get onPressStart() { return props.onPressStart; },
    get onPressEnd() { return props.onPressEnd; },
    get onPressChange() { return props.onPressChange; },
    get onPress() { return props.onPress; },
    get onPressUp() { return props.onPressUp; },
    get onClick() { return props.onClick; },
    get isDisabled() { return isDisabled(); }
  });

  // Handle press state on the label.
  let [isLabelPressed, setLabelPressed] = createSignal(false);
  let {pressProps: labelProps} = usePress({
    onPressStart(e) {
      // Keyboard interactions are handled directly on the input.
      if (e.pointerType === 'keyboard' || e.pointerType === 'virtual') {
        e.continuePropagation();
        return;
      }

      props.onPressStart?.(e);
      props.onPressChange?.(true);
      setLabelPressed(true);
    },
    onPressEnd(e) {
      // Keyboard interactions are handled directly on the input.
      if (e.pointerType === 'keyboard' || e.pointerType === 'virtual') {
        e.continuePropagation();
        return;
      }

      props.onPressEnd?.(e);
      props.onPressChange?.(false);
      setLabelPressed(false);
    },
    onPressUp(e) {
      if (e.pointerType === 'keyboard' || e.pointerType === 'virtual') {
        e.continuePropagation();
        return;
      }

      props.onPressUp?.(e);
    },
    get onClick() { return props.onClick; },
    onPress(e) {
      if (e.pointerType === 'keyboard' || e.pointerType === 'virtual') {
        e.continuePropagation();
        return;
      }

      props.onPress?.(e);
      state.toggle();
      ref.current?.focus();

      let groupValidationState = (props as unknown as Record<string, FormValidationState | undefined>)[privateValidationStateProp];

      // oxlint-disable-next-line react/react-compiler
      let {commitValidation} = groupValidationState ? groupValidationState : validationState;

      commitValidation();
    },
    get isDisabled() { return isDisabled() || isReadOnly(); }
  });

  let {focusableProps} = useFocusable(props, ref);
  let interactions = mergeProps(pressProps, focusableProps);
  let domProps = filterDOMProps(props, {labelable: true});

  useFormReset(ref, () => state.defaultSelected, state.setSelected);

  // Copied from useField because we don't want the label behavior that provides.
  let descriptionProps = useSlotId2();
  let errorMessageProps = useSlotId2();

  return {
    // Shared interaction bags are element-generic; these are bound to the
    // concrete label/input hosts of a toggle.
    labelProps: mergeProps(labelProps, {onClick: (e: MouseEvent) => e.preventDefault()}) as JSX.LabelHTMLAttributes<HTMLLabelElement>,
    inputProps: new Proxy(mergeProps(domProps, {
      get checked() { return state.isSelected; },
      get 'aria-required'() { return (props.isRequired && validationBehavior() === 'aria') ? 'true' : undefined; },
      get required() { return props.isRequired && validationBehavior() === 'native'; },
      get 'aria-invalid'() { return isInvalid() ? 'true' : undefined; },
      get 'aria-errormessage'() { return props['aria-errormessage']; },
      get 'aria-controls'() { return props['aria-controls']; },
      get 'aria-readonly'() { return isReadOnly() ? 'true' : undefined; },
      get 'aria-describedby'() {
        return [descriptionProps.id, errorMessageProps.id, props['aria-describedby']].filter(Boolean).join(' ') || undefined;
      },
      onChange,
      get disabled() { return isDisabled(); },
      get value() { return props.value ?? undefined; },
      get name() { return props.name; },
      get form() { return props.form; },
      type: 'checkbox',
    }, interactions) as JSX.InputHTMLAttributes<HTMLInputElement>, {
      // An absent checkbox value must stay absent from the native spread:
      // assigning undefined to input.value clears the browser's default "on".
      ownKeys(target) {
        return Reflect.ownKeys(target).filter(key => key !== 'value' || props.value != null);
      },
      has(target, key) {
        return key === 'value' && props.value == null ? false : Reflect.has(target, key);
      },
      getOwnPropertyDescriptor(target, key) {
        return key === 'value' && props.value == null ? undefined : Reflect.getOwnPropertyDescriptor(target, key);
      }
    }),
    descriptionProps,
    errorMessageProps,
    isSelected: () => state.isSelected,
    isPressed: () => isPressed() || isLabelPressed(),
    isDisabled,
    isReadOnly,
    isInvalid,
    get validationErrors() { return validationState.displayValidation.validationErrors; },
    get validationDetails() { return validationState.displayValidation.validationDetails; }
  };
}
