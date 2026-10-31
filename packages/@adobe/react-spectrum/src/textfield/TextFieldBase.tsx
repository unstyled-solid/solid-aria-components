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

import AlertMedium from '@spectrum-icons/ui/AlertMedium';
import CheckmarkMedium from '@spectrum-icons/ui/CheckmarkMedium';
import {classNames} from '../utils/classNames';
import {createFocusableRef} from '../utils/useDOMRef';
import {Field} from '../label/Field';
import intlMessages from '../../intl/textfield/*.json';
import {mergeProps} from 'react-aria/mergeProps';
import {DOMAttributes, PressEvents, RefObject, ValidationResult} from '@react-types/shared';
import type {AriaTextFieldProps} from 'react-aria/useTextField';
import {merge, omit, onSettled} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {Dynamic} from '@solidjs/web';
import {useObjectRef, attachRef, type Ref} from 'react-aria/private/utils/useObjectRef';
import {SlotProvider} from '../utils/Slots';
import {SpectrumTextFieldProps, TextFieldRef} from './TextField';
import styles from '@adobe/spectrum-css-temp/components/textfield/vars.css';
import {useFocusRing} from 'react-aria/useFocusRing';
import {useHover} from 'react-aria/useHover';
import {useId} from 'react-aria/useId';
import {useLocalizedStringFormatter} from 'react-aria/useLocalizedStringFormatter';

interface TextFieldBaseProps<T extends HTMLInputElement | HTMLTextAreaElement>
  extends
    Omit<SpectrumTextFieldProps, keyof AriaTextFieldProps | 'ref'>,
    Omit<AriaTextFieldProps<T>, 'onChange' | 'validate' | 'isInvalid' | 'validationState'>,
    PressEvents,
    Partial<ValidationResult> {
  wrapperChildren?: JSX.Element;
  inputClassName?: string;
  validationIconClassName?: string;
  multiLine?: boolean;
  labelProps?: DOMAttributes | JSX.LabelHTMLAttributes<HTMLLabelElement>;
  inputProps: JSX.InputHTMLAttributes<HTMLInputElement> | JSX.TextareaHTMLAttributes<HTMLTextAreaElement>;
  descriptionProps?: DOMAttributes | JSX.HTMLAttributes<HTMLElement>;
  errorMessageProps?: DOMAttributes | JSX.HTMLAttributes<HTMLElement>;
  inputRef?: RefObject<T | null>;
  loadingIndicator?: JSX.Element;
  isLoading?: boolean;
  disableFocusRing?: boolean;
  validationState?: SpectrumTextFieldProps['validationState'];
  ref?: Ref<TextFieldRef<T>>;
}

export function TextFieldBase<T extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement>(props: TextFieldBaseProps<T>) {
  let validationState = () => props.validationState ?? (props.isInvalid ? 'invalid' : null);
  let isInvalid = () => validationState() === 'invalid' && !props.isDisabled;
  let {hoverProps, isHovered} = useHover({get isDisabled() {return props.isDisabled;}});
  let domRef = useObjectRef<HTMLDivElement>();
  let defaultInputRef = useObjectRef<T>();
  let inputRef = useObjectRef<T>(instance => {
    let target = props.inputRef;
    if (target) {
      target.current = instance;
    } else {
      defaultInputRef(instance);
    }
  });
  let handle: TextFieldRef<T> = {
    ...createFocusableRef(domRef, inputRef),
    select() {inputRef.current?.select();},
    getInputElement() {return inputRef.current;}
  };
  onSettled(() => attachRef(props.ref, handle));

  let stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-spectrum/textfield');
  let validId = useId();
  let inputProps = merge(() => props.inputProps, {
    get 'aria-describedby'() {
      let describedBy = props.inputProps['aria-describedby'];
      if (!isInvalid() && validationState() === 'valid' && !props.isLoading && !props.isDisabled &&
          (!describedBy || !describedBy.includes(validId()))) {
        return [describedBy, validId()].join(' ').trim();
      }
      return describedBy;
    }
  });
  let {focusProps, isFocusVisible} = useFocusRing({
    isTextInput: true,
    get autoFocus() {return props.autoFocus;}
  });
  let fieldProps = omit(props, 'ref');

  return (
    <Field
      {...fieldProps}
      labelProps={props.labelProps as JSX.LabelHTMLAttributes<HTMLLabelElement>}
      descriptionProps={props.descriptionProps as JSX.HTMLAttributes<HTMLElement>}
      errorMessageProps={props.errorMessageProps as JSX.HTMLAttributes<HTMLElement>}
      wrapperClassName={classNames(styles, 'spectrum-Textfield-wrapper', {
        'spectrum-Textfield-wrapper--quiet': props.isQuiet
      })}
      showErrorIcon={false}
      ref={node => domRef(node as HTMLDivElement)}>
      {compose => <SlotProvider slots={{icon: {size: 'S', UNSAFE_className: classNames(styles, 'spectrum-Textfield-icon')}}}>
      <div {...compose({get class() {return classNames(styles, 'spectrum-Textfield', {
        'spectrum-Textfield--invalid': isInvalid(),
        'spectrum-Textfield--valid': validationState() === 'valid' && !props.isDisabled,
        'spectrum-Textfield--loadable': !!props.loadingIndicator,
        'spectrum-Textfield--quiet': props.isQuiet,
        'spectrum-Textfield--multiline': props.multiLine,
        'focus-ring': !props.disableFocusRing && isFocusVisible()
      });}})}>
        <Dynamic component={props.multiLine ? 'textarea' : 'input'}
          {...mergeProps(inputProps, hoverProps, focusProps)}
          ref={(node: HTMLInputElement | HTMLTextAreaElement) => inputRef(node as T)}
          rows={props.multiLine ? 1 : undefined}
          class={classNames(styles, 'spectrum-Textfield-input', {
            'spectrum-Textfield-inputIcon': !!props.icon,
            'is-hovered': isHovered()
          }, props.inputClassName)} />
        {props.icon}
        {validationState() && !props.isLoading && !props.isDisabled && (isInvalid()
          ? <AlertMedium UNSAFE_className={classNames(styles, 'spectrum-Textfield-validationIcon', props.validationIconClassName)} />
          : <CheckmarkMedium id={validId()} aria-hidden="true" aria-label={stringFormatter.format('valid')}
              UNSAFE_className={classNames(styles, 'spectrum-Textfield-validationIcon', props.validationIconClassName)} />)}
        {props.isLoading && props.loadingIndicator}
        {props.wrapperChildren}
      </div>
      </SlotProvider>}
    </Field>
  );
}
