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

import {createContext, useContext, createEffect, createMemo, createSignal, onCleanup, onSettled, untrack} from 'solid-js';
import {
  Validation,
  ValidationErrors,
  ValidationFunction,
  ValidationResult
} from '@react-types/shared';

export const VALID_VALIDITY_STATE: ValidityState = {
  badInput: false,
  customError: false,
  patternMismatch: false,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: false,
  valueMissing: false,
  valid: true
};

const CUSTOM_VALIDITY_STATE: ValidityState = {
  ...VALID_VALIDITY_STATE,
  customError: true,
  valid: false
};

export const DEFAULT_VALIDATION_RESULT: ValidationResult = {
  isInvalid: false,
  validationDetails: VALID_VALIDITY_STATE,
  validationErrors: []
};

export const FormValidationContext = createContext<ValidationErrors>({});

// Private props that we pass from useFormValidationState to children.
// Ideally we'd use a Symbol for this, but React doesn't support them: https://github.com/facebook/react/issues/7552
// This needs to be stable across server and client module evaluation for SSR hydration.
export const privateValidationStateProp: string = '__reactAriaFormValidationState';

interface FormValidationProps<T> extends Validation<T> {
  [privateValidationStateProp]?: FormValidationState;
  builtinValidation?: ValidationResult;
  name?: string | string[];
  value: T | null;
}

export interface FormValidationState {
  /** Realtime validation results, updated as the user edits the value. */
  realtimeValidation: ValidationResult;
  /** Currently displayed validation results, updated when the user commits their changes. */
  displayValidation: ValidationResult;
  /**
   * Updates the current validation result. Not displayed to the user until `commitValidation` is
   * called.
   */
  updateValidation(result: ValidationResult): void;
  /** Resets the displayed validation state to valid when the user resets the form. */
  resetValidation(): void;
  /** Commits the realtime validation so it is displayed to the user. */
  commitValidation(): void;
}

export function useFormValidationState<T>(props: FormValidationProps<T>): FormValidationState {
  // Private prop for parent components to pass state to children.
  let inherited = untrack(() => props[privateValidationStateProp]);
  if (inherited) {
    return {
      get realtimeValidation() { return inherited.realtimeValidation; },
      get displayValidation() { return inherited.displayValidation; },
      updateValidation: inherited.updateValidation,
      resetValidation: inherited.resetValidation,
      commitValidation: inherited.commitValidation
    };
  }

  return useFormValidationStateImpl(props);
}

function useFormValidationStateImpl<T>(props: FormValidationProps<T>): FormValidationState {
  let validationBehavior = () => props.validationBehavior ?? 'aria';

  // If the isInvalid prop is controlled, update validation result in realtime.
  let controlledError = createMemo((): ValidationResult | null => {
    let isInvalid = props.isInvalid;
    if (props.validationState) {
      isInvalid ||= props.validationState === 'invalid';
    }
    return isInvalid !== undefined
      ? {
          isInvalid,
          validationErrors: [],
          validationDetails: CUSTOM_VALIDITY_STATE
        }
      : null;
  });

  // Perform custom client side validation.
  let clientError = createMemo((): ValidationResult | null => {
    let {validate, value} = props;
    if (!validate || value == null) {
      return null;
    }
    let validateErrors = runValidate(validate, value);
    return getValidationResult(validateErrors);
  });

  let builtinValidation = () => props.builtinValidation?.validationDetails.valid ? undefined : props.builtinValidation;

  // Get relevant server errors from the form.
  let serverResponse = createMemo(() => ({errors: {...useContext(FormValidationContext)}}));
  let serverErrors = () => serverResponse().errors;
  let serverErrorMessages = createMemo(() => {
    let {name} = props;
    if (name) {
      return Array.isArray(name)
        ? name.flatMap(name => asArray(serverErrors()[name]))
        : asArray(serverErrors()[name]);
    }
    return [];
  });

  // Show server errors when the form gets a new value, and clear when the user changes the value.
  // Store which server response was cleared, so a new response is visible immediately.
  let [clearedServerErrors, setClearedServerErrors] = createSignal<ReturnType<typeof serverResponse> | null>(null);

  let serverError = createMemo(
    () => getValidationResult(clearedServerErrors() === serverResponse() ? [] : serverErrorMessages())
  );

  // Track the next validation state in a ref until commitValidation is called.
  let nextValidation = DEFAULT_VALIDATION_RESULT;
  let [currentValidity, setCurrentValidity] = createSignal(DEFAULT_VALIDATION_RESULT);
  // Imperative methods compare against the accepted same-turn proposal, not a
  // reactive read from their caller's effect or an older committed signal value.
  let acceptedValidity = DEFAULT_VALIDATION_RESULT;
  let publishValidity = (value: ValidationResult) => {
    acceptedValidity = value;
    setCurrentValidity(value);
  };

  let lastError = DEFAULT_VALIDATION_RESULT;
  let [commitQueued, setCommitQueued] = createSignal(false);
  let commitGeneration = 0;
  let disposed = false;
  onCleanup(() => { disposed = true; });
  createEffect(() => ({queued: commitQueued(), value: props.value, client: clientError(), builtin: builtinValidation()}), result => {
    if (!result.queued) return;
    let generation = commitGeneration;
    // Preserve the source's layout-observation → passive-commit order. Native
    // validity observers first settle the DOM value bindings; the following
    // settlement commits their result, including value+commit in one action.
    onSettled(() => {
      onSettled(() => {
        if (disposed || generation !== commitGeneration || !untrack(commitQueued)) return;
        setCommitQueued(false);
        let error = untrack(clientError) || untrack(builtinValidation) || nextValidation;
        if (!isEqualValidation(error, lastError)) {
          lastError = error;
          publishValidity(error);
        }
      });
    });
  });

  // realtimeValidation is used to update the native input element's state based on custom validation logic.
  // displayValidation is the currently displayed validation state that the user sees (e.g. on input change/form submit).
  // With validationBehavior="aria", all errors are displayed in realtime rather than on submit.
  let realtimeValidation = () => {
    // The source layout effect remeasures native validity after each value render,
    // even when client validation still resolves to the same (e.g. valid) result.
    props.value;
    return controlledError() || serverError() || clientError() || builtinValidation() || DEFAULT_VALIDATION_RESULT;
  };
  let displayValidation = () =>
    validationBehavior() === 'native'
      ? controlledError() || serverError() || currentValidity()
      : controlledError() || serverError() || clientError() || builtinValidation() || currentValidity();

  return {
    get realtimeValidation() { return realtimeValidation(); },
    get displayValidation() { return displayValidation(); },
    updateValidation(value) {
      // If validationBehavior is 'aria', update in realtime. Otherwise, store in a ref until commit.
      if (validationBehavior() === 'aria' && !isEqualValidation(acceptedValidity, value)) {
        publishValidity(value);
      } else {
        nextValidation = value;
      }
    },
    resetValidation() {
      // Update the currently displayed validation state to valid on form reset,
      // even if the native validity says it isn't. It'll show again on the next form submit.
      let error = DEFAULT_VALIDATION_RESULT;
      if (!isEqualValidation(error, lastError)) {
        lastError = error;
        publishValidity(error);
      }

      // Do not commit validation after the next render. This avoids a condition where
      // useSelect calls commitValidation inside an onReset handler.
      if (validationBehavior() === 'native') {
        commitGeneration++;
        setCommitQueued(false);
      }

      setClearedServerErrors(serverResponse());
    },
    commitValidation() {
      // Commit validation state so the user sees it on blur/change/submit. Also clear any server errors.
      // Wait until after the next render to commit so that the latest value has been validated.
      if (validationBehavior() === 'native') {
        setCommitQueued(true);
      }
      setClearedServerErrors(serverResponse());
    }
  };
}

function asArray<T>(v: T | T[]): T[] {
  if (!v) {
    return [];
  }

  return Array.isArray(v) ? v : [v];
}

function runValidate<T>(validate: ValidationFunction<T>, value: T): string[] {
  if (typeof validate === 'function') {
    let e = validate(value);
    if (e && typeof e !== 'boolean') {
      return asArray(e);
    }
  }

  return [];
}

function getValidationResult(errors: string[]): ValidationResult | null {
  return errors.length
    ? {
        isInvalid: true,
        validationErrors: errors,
        validationDetails: CUSTOM_VALIDITY_STATE
      }
    : null;
}

function isEqualValidation(a: ValidationResult | null, b: ValidationResult | null): boolean {
  if (a === b) {
    return true;
  }

  return (
    !!a &&
    !!b &&
    a.isInvalid === b.isInvalid &&
    a.validationErrors.length === b.validationErrors.length &&
    a.validationErrors.every((a, i) => a === b.validationErrors[i]) &&
    Object.entries(a.validationDetails).every(([k, v]) => b.validationDetails[k as keyof ValidityState] === v)
  );
}

export function mergeValidation(...results: ValidationResult[]): ValidationResult {
  let errors = new Set<string>();
  let isInvalid = false;
  let validationDetails = {
    ...VALID_VALIDITY_STATE
  };

  for (let v of results) {
    for (let e of v.validationErrors) {
      errors.add(e);
    }

    // Only these properties apply for checkboxes.
    isInvalid ||= v.isInvalid;
    for (let key in validationDetails) {
      let validityKey = key as keyof ValidityState;
      validationDetails[validityKey] ||= v.validationDetails[validityKey];
    }
  }

  validationDetails.valid = !isInvalid;
  return {
    isInvalid,
    validationErrors: [...errors],
    validationDetails
  };
}
