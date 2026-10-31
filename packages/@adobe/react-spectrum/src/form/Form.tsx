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
  Alignment,
  DOMProps,
  FormProps,
  FormEvent,
  LabelPosition,
  SpectrumLabelableProps,
  StyleProps,
  ValidationState
} from '@react-types/shared';
import {classNames} from '../utils/classNames';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {FormValidationContext} from 'react-stately/private/form/useFormValidationState';
import {Provider, useProviderProps} from '../provider/Provider';
import {createContext, createEffect, merge, omit, useContext} from 'solid-js';
import {useEffectEvent} from 'react-aria/private/utils/useEffectEvent';
import type {JSX} from '@solidjs/web';
import styles from '@adobe/spectrum-css-temp/components/fieldlabel/vars.css';
import {useDOMRef, type DOMRef} from '../utils/useDOMRef';
import {useStyleProps} from '../utils/styleProps';

export interface SpectrumFormProps
  extends
    FormProps,
    DOMProps,
    StyleProps,
    Omit<SpectrumLabelableProps, 'contextualHelp' | 'label'> {
  /** The contents of the Form. */
  children: JSX.Element;
  /** Whether the Form elements are displayed with their quiet style. */
  isQuiet?: boolean;
  /** Whether the Form elements are rendered with their emphasized style. */
  isEmphasized?: boolean;
  /** Whether the Form elements are disabled. */
  isDisabled?: boolean;
  /** Whether user input is required on each of the Form elements before Form submission. */
  isRequired?: boolean;
  /** Whether the Form elements can be selected but not changed by the user. */
  isReadOnly?: boolean;
  /**
   * Whether the Form elements should display their "valid" or "invalid" visual styling.
   *
   * @default 'valid'
   */
  validationState?: ValidationState;
  /**
   * Whether to use native HTML form validation to prevent form submission
   * when a field value is missing or invalid, or mark fields as required
   * or invalid via ARIA.
   *
   * @default 'aria'
   */
  validationBehavior?: 'aria' | 'native';
}

interface FormContextValue extends SpectrumLabelableProps {
  validationBehavior?: 'aria' | 'native';
}

let FormContext = createContext<FormContextValue | null>(null);
export function useFormProps<T extends SpectrumLabelableProps>(props: T): T {
  let ctx = useContext(FormContext);
  if (ctx) {
    return merge(ctx, props) as T;
  }

  return props;
}

const formPropNames = new Set([
  'action',
  'autoComplete',
  'encType',
  'method',
  'target',
  'onSubmit',
  'onReset',
]);

/**
 * Forms allow users to enter data that can be submitted while providing alignment and styling for
 * form fields.
 */
export function Form(input: SpectrumFormProps & {ref?: DOMRef<HTMLFormElement>}) {
  let props = useProviderProps(input);
  let otherProps = omit(props, 'children', 'labelPosition', 'labelAlign', 'isRequired', 'necessityIndicator', 'isQuiet', 'isEmphasized', 'isDisabled', 'isReadOnly', 'validationState', 'validationBehavior', 'validationErrors', 'onInvalid', 'ref');
  let labelPosition = () => props.labelPosition ?? 'top';

  let {styleProps} = useStyleProps(otherProps);
  let domRef = useDOMRef(input.ref);
  let validationErrors = merge(() => props.validationErrors || {});
  let onInvalid = useEffectEvent((event: Event) => props.onInvalid?.(event as FormEvent<HTMLFormElement>));
  createEffect(() => domRef.current, form => {
    if (!form) return;
    // Native invalid events do not bubble. Deliver the source form callback
    // before the field listener decides whether to focus the invalid input.
    form.addEventListener('invalid', onInvalid, true);
    return () => form.removeEventListener('invalid', onInvalid, true);
  });

  let ctx = {
    get labelPosition() {return labelPosition();},
    get labelAlign() {return props.labelAlign ?? 'start';},
    get necessityIndicator() {return props.necessityIndicator;},
    get validationBehavior() {return props.validationBehavior;}
  };

  return (
    <form
      {...filterDOMProps(otherProps, {labelable: true, propNames: formPropNames})}
      {...styleProps}
      novalidate={props.validationBehavior !== 'native'}
      ref={domRef}
      class={classNames(
        styles,
        'spectrum-Form',
        {
          'spectrum-Form--positionSide': labelPosition() === 'side',
          'spectrum-Form--positionTop': labelPosition() === 'top'
        },
        styleProps.class as string | undefined
      )}>
      <FormContext value={ctx}>
        <Provider
          isQuiet={props.isQuiet}
          isEmphasized={props.isEmphasized}
          isDisabled={props.isDisabled}
          isReadOnly={props.isReadOnly}
          isRequired={props.isRequired}
          validationState={props.validationState}>
          <FormValidationContext value={validationErrors}>
            {props.children}
          </FormValidationContext>
        </Provider>
      </FormContext>
    </form>
  );
}
