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

import {classNames} from '../utils/classNames';

import {Flex} from '../layout/Flex';
import {HelpText} from './HelpText';
import {Label, SpectrumLabelPropsBase} from './Label';
import {
  LabelPosition,
  SpectrumFieldValidation,
  SpectrumHelpTextProps,
  Validation,
  ValidationResult
} from '@react-types/shared';
import labelStyles from '@adobe/spectrum-css-temp/components/fieldlabel/vars.css';
import {mergeProps} from 'react-aria/mergeProps';
import {merge, omit} from 'solid-js';
import {useObjectRef, type Ref} from 'react-aria/private/utils/useObjectRef';
import {useSyncRef} from 'react-aria/private/utils/useSyncRef';
import type {JSX} from '@solidjs/web';
import {SlotProvider} from '../utils/Slots';
import {useFormProps} from '../form/Form';
import {useId} from 'react-aria/useId';
import {useStyleProps} from '../utils/styleProps';

export interface SpectrumFieldProps
  extends
    Omit<SpectrumLabelPropsBase, 'children'>,
    SpectrumHelpTextProps,
    Omit<Validation<any>, 'validationState'>,
    SpectrumFieldValidation<any>,
    Partial<ValidationResult> {
  children: (compose: FieldCompose) => JSX.Element;
  label?: JSX.Element;
  contextualHelp?: JSX.Element;
  labelProps?: JSX.LabelHTMLAttributes<HTMLLabelElement>;
  descriptionProps?: JSX.HTMLAttributes<HTMLElement>;
  errorMessageProps?: JSX.HTMLAttributes<HTMLElement>;
  wrapperClassName?: string;
  wrapperProps?: JSX.HTMLAttributes<HTMLElement>;
}

export type FieldCompose = <T extends object>(props: T) => T & {class: string};

export function Field(input: SpectrumFieldProps & {ref?: Ref<HTMLElement>}) {
  let domRef = useObjectRef<HTMLDivElement>();
  useSyncRef({get ref() {return input.ref;}}, domRef);
  let props = useFormProps(input);
  let isInForm = props !== input;
  let labelPosition = () => props.labelPosition ?? 'top';
  let otherProps = omit(props, 'label', 'labelPosition', 'labelAlign', 'isRequired', 'necessityIndicator', 'includeNecessityIndicatorInAccessibilityName', 'validationState', 'isInvalid', 'description', 'errorMessage', 'validationErrors', 'validationDetails', 'isDisabled', 'showErrorIcon', 'contextualHelp', 'children', 'labelProps', 'descriptionProps', 'errorMessageProps', 'elementType', 'wrapperClassName', 'wrapperProps', 'ref');
  let {styleProps} = useStyleProps(otherProps);
  let errorMessageString = () => {
    let errorMessage = props.errorMessage === undefined ? ((e: ValidationResult) => e.validationErrors.join(' ')) : props.errorMessage;
    return typeof errorMessage === 'function'
      ? props.isInvalid != null && props.validationErrors != null && props.validationDetails != null
        ? errorMessage({isInvalid: props.isInvalid, validationErrors: props.validationErrors, validationDetails: props.validationDetails}) : null
      : errorMessage;
  };
  let hasHelpText = () => !!props.description || (errorMessageString() && (props.isInvalid || props.validationState === 'invalid'));
  let contextualHelpId = useId();

  let fallbackLabelPropsId = useId();
  let labelProps = merge(() => props.labelProps ?? {}, {
    get id() {return props.label && props.contextualHelp && !props.labelProps?.id ? fallbackLabelPropsId() : props.labelProps?.id;}
  });

  let labelWrapperClass = () => classNames(
    labelStyles,
    'spectrum-Field',
    {
      'spectrum-Field--positionTop': labelPosition() === 'top',
      'spectrum-Field--positionSide': labelPosition() === 'side',
      'spectrum-Field--alignEnd': props.labelAlign === 'end',
      'spectrum-Field--hasContextualHelp': !!props.contextualHelp
    },
    styleProps.class as string | undefined,
    props.wrapperClassName
  );

  let compose: FieldCompose = hostProps => mergeProps(hostProps, {
    class: classNames(labelStyles, 'spectrum-Field-field')
  }) as ReturnType<FieldCompose> & typeof hostProps;

  let renderHelpText = () => (
    <HelpText
      descriptionProps={props.descriptionProps}
      errorMessageProps={props.errorMessageProps}
      description={props.description}
      errorMessage={errorMessageString()}
      validationState={props.validationState}
      isInvalid={props.isInvalid}
      isDisabled={props.isDisabled}
      showErrorIcon={props.showErrorIcon}
      gridArea={labelStyles.helpText}
    />
  );

  let renderChildren = () => {
    if (labelPosition() === 'side') {
      return (
        <Flex
          direction="column"
          UNSAFE_className={classNames(labelStyles, 'spectrum-Field-wrapper')}>
          {props.children(compose)}
          {hasHelpText() && renderHelpText()}
        </Flex>
      );
    }

    return (
      <>
        {props.children(compose)}
        {hasHelpText() && renderHelpText()}
      </>
    );
  };

  let labelAndContextualHelp = () => (
    <>
      {props.label && (
        <Label
          {...labelProps as unknown as import('@solidjs/web').ComponentProps<typeof Label>}
          labelPosition={labelPosition()}
          labelAlign={props.labelAlign}
          isRequired={props.isRequired}
          necessityIndicator={props.necessityIndicator}
          includeNecessityIndicatorInAccessibilityName={
            props.includeNecessityIndicatorInAccessibilityName
          }
          elementType={props.elementType}>
          {props.label}
        </Label>
      )}
      {props.label && props.contextualHelp && (
        <SlotProvider
          slots={{
            actionButton: {
              UNSAFE_className: classNames(labelStyles, 'spectrum-Field-contextualHelp'),
              get id() {return contextualHelpId();},
              get 'aria-labelledby'() {return labelProps.id ? `${labelProps.id} ${contextualHelpId()}` : undefined;}
            }
          }}>
          {props.contextualHelp}
        </SlotProvider>
      )}
    </>
  );

  // Need to add an extra wrapper for the label and contextual help if labelPosition is side,
  // so that the table layout works inside forms.

  return (
    <div
      {...styleProps}
      {...props.wrapperProps}
      ref={domRef}
      class={labelWrapperClass()}>
      {isInForm && labelPosition() === 'side' && props.label && props.contextualHelp ? (
        <div class={classNames(labelStyles, 'spectrum-Field-labelCell')}>
          <div class={classNames(labelStyles, 'spectrum-Field-labelWrapper')}>{labelAndContextualHelp()}</div>
        </div>
      ) : labelAndContextualHelp()}
      {renderChildren()}
    </div>
  );
}
