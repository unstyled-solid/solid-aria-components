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

import {chain} from 'react-aria/chain';
import {createEffect, merge, omit, untrack} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {useObjectRef, type Ref} from 'react-aria/private/utils/useObjectRef';
import {useSyncRef} from 'react-aria/private/utils/useSyncRef';
import {
  SpectrumFieldValidation,
  SpectrumLabelableProps,
  SpectrumTextInputBase,
  StyleProps
} from '@react-types/shared';
import {TextFieldBase} from './TextFieldBase';
import {TextFieldRef} from './TextField';
import {useControlledState} from 'react-stately/useControlledState';
import {useFormProps} from '../form/Form';
import {useProviderProps} from '../provider/Provider';

export interface SpectrumTextAreaProps
  extends
    SpectrumTextInputBase,
    Omit<
      AriaTextFieldProps<HTMLTextAreaElement>,
      'isInvalid' | 'validationState' | 'type' | 'pattern'
    >,
    SpectrumFieldValidation<string>,
    SpectrumLabelableProps,
    StyleProps {
  /** An icon to display at the start of the input. */
  icon?: JSX.Element;
  /** Whether the input should be displayed with a quiet style. */
  isQuiet?: boolean;
  ref?: Ref<TextFieldRef<HTMLTextAreaElement>>;
}

/**
 * TextAreas are multiline text inputs, useful for cases where users have
 * a sizable amount of text to enter. They allow for all customizations that
 * are available to text fields.
 */
export function TextArea(props: SpectrumTextAreaProps) {
  // oxlint-disable-next-line react/react-compiler
  props = useProviderProps(props);
  props = useFormProps(props);
  let otherProps = omit(props, 'isDisabled', 'isQuiet', 'isReadOnly', 'isRequired', 'onChange', 'ref');

  // not in stately because this is so we know when to re-measure, which is a spectrum design
  let [inputValue, setInputValue] = useControlledState<string>(
    () => props.value,
    untrack(() => props.defaultValue ?? ''),
    () => {}
  );
  let inputRef = useObjectRef<HTMLTextAreaElement>();
  let forwardedRef = useObjectRef<TextFieldRef<HTMLTextAreaElement>>();
  useSyncRef(props, forwardedRef);

  // oxlint-disable-next-line react/react-compiler
  let onHeightChange = (input: HTMLTextAreaElement, isQuiet: boolean | undefined, height: SpectrumTextAreaProps['height']) => {
    // Quiet textareas always grow based on their text content.
    // Standard textareas also grow by default, unless an explicit height is set.
    if (isQuiet || !height) {
      let prevAlignment = input.style.alignSelf;
      let prevOverflow = input.style.overflow;
      // Firefox scroll position is lost when overflow: 'hidden' is applied so we skip applying it.
      // The measure/applied height is also incorrect/reset if we turn on and off
      // overflow: hidden in Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1787062
      let isFirefox = 'MozAppearance' in input.style;
      if (!isFirefox) {
        input.style.overflow = 'hidden';
      }
      input.style.alignSelf = 'start';
      input.style.height = 'auto';
      // offsetHeight - clientHeight accounts for the border/padding.
      input.style.height = `${input.scrollHeight + (input.offsetHeight - input.clientHeight)}px`;
      input.style.overflow = prevOverflow;
      input.style.alignSelf = prevAlignment;
    }
  };

  createEffect(() => ({element: inputRef.current, value: inputValue(), quiet: props.isQuiet, height: props.height}), ({element, quiet, height}) => {
    if (element) {
      onHeightChange(element, quiet, height);
    }
  });

  let hasWarned = false;
  createEffect(() => props.placeholder, placeholder => {
    if (placeholder && !hasWarned && process.env.NODE_ENV !== 'production') {
      console.warn(
        'Placeholders are deprecated due to accessibility issues. Please use help text instead. See the docs for details: https://react-spectrum.adobe.com/react-spectrum/TextArea.html#help-text'
      );
      hasWarned = true;
    }
  });

  let result = useTextField(
    merge(props, {
      get onChange() {return chain(props.onChange, setInputValue);},
      inputElementType: 'textarea' as const
    }),
    inputRef
  );

  return (
    <TextFieldBase
      {...merge(otherProps, result)}
      ref={forwardedRef}
      inputRef={inputRef}
      multiLine
      isDisabled={props.isDisabled ?? false}
      isQuiet={props.isQuiet ?? false}
      isReadOnly={props.isReadOnly ?? false}
      isRequired={props.isRequired ?? false}
    />
  );
}
