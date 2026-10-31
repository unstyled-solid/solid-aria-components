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

import {FormValidationState} from 'react-stately/private/form/useFormValidationState';

import {InputBase, RefObject, Validation, ValidationResult} from '@react-types/shared';
import {setInteractionModality} from '../interactions/useFocusVisible';
import {createEffect, onSettled} from 'solid-js';
import {useEffectEvent} from '../utils/useEffectEvent';

type ValidatableElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

interface FormValidationProps<T> extends Validation<T>, InputBase {
  focus?: () => void;
  value?: T;
}

export function useFormValidation<T>(
  props: FormValidationProps<T>,
  state: FormValidationState,
  ref: RefObject<ValidatableElement | null> | undefined
): void {
  // Native validity is an external observation published by an imperative
  // command. Keep its live state-method policy reads out of the effect phase;
  // the compute below still tracks every input that requires remeasurement.
  let updateNativeValidation = useEffectEvent((validation: ValidationResult) => {
    state.updateValidation(validation);
  });
  // This is a useLayoutEffect so that it runs before the useEffect in useFormValidationState, which commits the validation change.
  createEffect(() => ({
    validationBehavior: props.validationBehavior,
    validation: state.realtimeValidation,
    input: ref?.current,
    value: props.value,
    isRequired: props.isRequired,
    isDisabled: props.isDisabled
  }), ({validationBehavior, validation, input}) => {
    // Native spread bindings may project the accepted value after this effect
    // runs. Observe browser validity only once that DOM work has settled, just
    // as the source layout effect observes the completed React value render.
    let active = true;
    onSettled(() => {
      if (!active) { return; }
      if (
        validationBehavior === 'native' &&
        input &&
        'setCustomValidity' in input &&
        !input.disabled
      ) {
        let errorMessage = validation.isInvalid
          ? validation.validationErrors.join(' ') || 'Invalid value.'
          : '';
        input.setCustomValidity(errorMessage);

        // Prevent default tooltip for validation message.
        // https://bugzilla.mozilla.org/show_bug.cgi?id=605277
        if (!input.hasAttribute('title')) {
          input.title = '';
        }

        if (!validation.isInvalid) {
          updateNativeValidation(getNativeValidity(input));
        }
      }
    });
    return () => { active = false; };
  });

  let onReset = useEffectEvent(() => {
    state.resetValidation();
  });

  let onInvalid = useEffectEvent((e: Event) => {
    // Only commit validation if we are not already displaying one.
    // This avoids clearing server errors that the user didn't actually fix.
    if (!state.displayValidation.isInvalid) {
      state.commitValidation();
    }

    // Auto focus the first invalid input in a form, unless the error already had its default prevented.
    let form = ref?.current?.form;
    if (!e.defaultPrevented && ref && form && getFirstInvalidInput(form) === ref.current) {
      if (props.focus) {
        props.focus();
      } else {
        ref.current?.focus();
      }

      // Always show focus ring.
      setInteractionModality('keyboard');
    }

    // Prevent default browser error UI from appearing.
    e.preventDefault();
  });

  let onChange = useEffectEvent(() => {
    state.commitValidation();
  });

  createEffect(() => ({input: ref?.current, validationBehavior: props.validationBehavior}), ({input}) => {
    if (!input) {
      return;
    }

    let form = input.form;

    // Solid has no React action scheduler that automatically resets forms.
    // Native/programmatic reset events therefore use the ordinary reset path.

    // 'change' and 'reset' do not compose across shadow DOM boundaries, but these listeners are
    // intentionally scoped to this specific input/form element (not a global target), so shadow
    // root propagation does not apply here.
    input.addEventListener('invalid', onInvalid);
    // oxlint-disable-next-line rsp-rules/no-non-composing-event-listener
    input.addEventListener('change', onChange);
    // oxlint-disable-next-line rsp-rules/no-non-composing-event-listener
    form?.addEventListener('reset', onReset);
    return () => {
      input!.removeEventListener('invalid', onInvalid);
      input!.removeEventListener('change', onChange);
      form?.removeEventListener('reset', onReset);
    };
  });
}

function getValidity(input: ValidatableElement) {
  // The native ValidityState object is live, meaning each property is a getter that returns the current state.
  // We need to create a snapshot of the validity state at the time this function is called to avoid unpredictable React renders.
  let validity = input.validity;
  return {
    badInput: validity.badInput,
    customError: validity.customError,
    patternMismatch: validity.patternMismatch,
    rangeOverflow: validity.rangeOverflow,
    rangeUnderflow: validity.rangeUnderflow,
    stepMismatch: validity.stepMismatch,
    tooLong: validity.tooLong,
    tooShort: validity.tooShort,
    typeMismatch: validity.typeMismatch,
    valueMissing: validity.valueMissing,
    valid: validity.valid
  };
}

function getNativeValidity(input: ValidatableElement): ValidationResult {
  return {
    isInvalid: !input.validity.valid,
    validationDetails: getValidity(input),
    validationErrors: input.validationMessage ? [input.validationMessage] : []
  };
}

function getFirstInvalidInput(form: HTMLFormElement): ValidatableElement | null {
  for (let i = 0; i < form.elements.length; i++) {
    let element = form.elements[i] as ValidatableElement;
    if (element.validity?.valid === false) {
      return element;
    }
  }

  return null;
}
