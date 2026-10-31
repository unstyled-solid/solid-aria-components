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

import {AriaSearchFieldProps, useSearchField} from 'react-aria/useSearchField';

import {classNames} from '../utils/classNames';
import {ClearButton} from '../button/ClearButton';
import Magnifier from '@spectrum-icons/ui/Magnifier';
import {createEffect, merge, omit} from 'solid-js';
import {useObjectRef} from 'react-aria/private/utils/useObjectRef';
import {useSyncRef} from 'react-aria/private/utils/useSyncRef';
import {SpectrumTextFieldProps, TextFieldRef} from '../textfield/TextField';
import {SpectrumTextInputBase} from '@react-types/shared';
import styles from '@adobe/spectrum-css-temp/components/search/vars.css';
import {TextFieldBase} from '../textfield/TextFieldBase';
import {useFormProps} from '../form/Form';
import {useProviderProps} from '../provider/Provider';
import {useSearchFieldState} from 'react-stately/useSearchFieldState';
import {useSlotProps} from '../utils/Slots';

export interface SpectrumSearchFieldProps
  extends
    SpectrumTextInputBase,
    Omit<AriaSearchFieldProps, 'isInvalid' | 'validationState'>,
    SpectrumTextFieldProps {}

/**
 * A SearchField is a text field designed for searches.
 */
export function SearchField(props: SpectrumSearchFieldProps) {
  props = useSlotProps(props, 'searchfield');
  props = useProviderProps(props);
  props = useFormProps(props);
  let otherProps = omit(props, 'icon', 'isDisabled', 'UNSAFE_className', 'placeholder', 'ref');

  let hasWarned = false;
  createEffect(() => props.placeholder, placeholder => {
    if (placeholder && !hasWarned && process.env.NODE_ENV !== 'production') {
      console.warn(
        'Placeholders are deprecated due to accessibility issues. Please use help text instead. See the docs for details: https://react-spectrum.adobe.com/react-spectrum/SearchField.html#help-text'
      );
      hasWarned = true;
    }
  });

  let state = useSearchFieldState(props);
  let inputRef = useObjectRef<HTMLInputElement>();
  let forwardedRef = useObjectRef<TextFieldRef>();
  useSyncRef(props, forwardedRef);
  let aria = useSearchField(props, state, inputRef);
  let result = omit(aria, 'clearButtonProps', 'isInvalid', 'validationErrors', 'validationDetails');

  let clearButton = () => (
    <ClearButton
      {...aria.clearButtonProps}
      preventFocus
      UNSAFE_className={classNames(styles, 'spectrum-ClearButton')}
      isDisabled={props.isDisabled}
    />
  );

  let validationState = () => props.validationState || (aria.isInvalid() ? 'invalid' : undefined);

  return (
    <TextFieldBase
      {...merge(otherProps, result)}
      isInvalid={aria.isInvalid()}
      validationErrors={aria.validationErrors()}
      validationDetails={aria.validationDetails()}
      validationState={validationState()}
      UNSAFE_className={classNames(
        styles,
        'spectrum-Search',
        'spectrum-Textfield',
        {
          'is-disabled': props.isDisabled,
          'is-quiet': props.isQuiet,
          'spectrum-Search--invalid': validationState() === 'invalid' && !props.isDisabled,
          'spectrum-Search--valid': validationState() === 'valid' && !props.isDisabled
        },
        props.UNSAFE_className
      )}
      inputClassName={classNames(styles, 'spectrum-Search-input')}
      ref={forwardedRef}
      inputRef={inputRef}
      isDisabled={props.isDisabled}
      icon={props.icon === undefined ? <Magnifier data-testid="searchicon" /> : props.icon}
      wrapperChildren={state.value !== '' && !props.isReadOnly ? clearButton() : undefined}
    />
  );
}
