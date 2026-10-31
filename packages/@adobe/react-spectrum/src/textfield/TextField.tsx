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

import {AriaTextFieldProps, useTextField} from 'react-aria/useTextField';
import {
  FocusableRefValue,
  SpectrumFieldValidation,
  SpectrumLabelableProps,
  SpectrumTextInputBase,
  StyleProps
} from '@react-types/shared';
import {createEffect, merge, omit} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {useObjectRef, type Ref} from 'react-aria/private/utils/useObjectRef';
import {useSyncRef} from 'react-aria/private/utils/useSyncRef';
import {TextFieldBase} from './TextFieldBase';
import {useFormProps} from '../form/Form';
import {useProviderProps} from '../provider/Provider';

export interface SpectrumTextFieldProps
  extends
    SpectrumTextInputBase,
    Omit<AriaTextFieldProps, 'isInvalid' | 'validationState'>,
    SpectrumFieldValidation<string>,
    SpectrumLabelableProps,
    StyleProps {
  /** An icon to display at the start of the input. */
  icon?: JSX.Element;
  /** Whether the input should be displayed with a quiet style. */
  isQuiet?: boolean;
  ref?: Ref<TextFieldRef>;
}

export interface TextFieldRef<
  T extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement
> extends FocusableRefValue<T, HTMLDivElement> {
  select(): void;
  getInputElement(): T | null;
}

/**
 * TextFields are text inputs that allow users to input custom text entries
 * with a keyboard. Various decorations can be displayed around the field to
 * communicate the entry requirements.
 */
export function TextField(props: SpectrumTextFieldProps) {
  // oxlint-disable-next-line react/react-compiler
  props = useProviderProps(props);
  props = useFormProps(props);

  let inputRef = useObjectRef<HTMLInputElement>();
  let forwardedRef = useObjectRef<TextFieldRef>();
  useSyncRef(props, forwardedRef);
  let result = useTextField(props, inputRef);

  let hasWarned = false;
  createEffect(() => props.placeholder, placeholder => {
    if (placeholder && !hasWarned && process.env.NODE_ENV !== 'production') {
      console.warn(
        'Placeholders are deprecated due to accessibility issues. Please use help text instead. See the docs for details: https://react-spectrum.adobe.com/react-spectrum/TextField.html#help-text'
      );
      hasWarned = true;
    }
  });

  return <TextFieldBase {...merge(omit(props, 'ref'), result)} ref={forwardedRef} inputRef={inputRef} />;
}
