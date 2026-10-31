/*
 * Copyright 2021 Adobe. All rights reserved.
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
import {classNames} from '../utils/classNames';
import {
  SpectrumFieldValidation,
  SpectrumHelpTextProps,
  StyleProps,
  Validation
} from '@react-types/shared';
import type {JSX} from '@solidjs/web';
import styles from '@adobe/spectrum-css-temp/components/helptext/vars.css';
import {useDOMRef, type DOMRef} from '../utils/useDOMRef';
import {useStyleProps} from '../utils/styleProps';

interface HelpTextProps
  extends
    Omit<SpectrumHelpTextProps, 'errorMessage'>,
    Omit<Validation<any>, 'validationState'>,
    SpectrumFieldValidation<any>,
    StyleProps {
  /** Props for the help text description element. */
  descriptionProps?: JSX.HTMLAttributes<HTMLElement>;
  /** Props for the help text error message element. */
  errorMessageProps?: JSX.HTMLAttributes<HTMLElement>;
  /** An error message for the field. */
  errorMessage?: JSX.Element;
}

/**
 * Help text provides either an informative description or an error message that gives more context
 * about what a user needs to input. It's commonly used in forms.
 */
export function HelpText(props: HelpTextProps & {ref?: DOMRef<HTMLDivElement>}) {
  let domRef = useDOMRef(props.ref);
  let isErrorMessage = () => props.errorMessage && (props.isInvalid || props.validationState === 'invalid');
  let {styleProps} = useStyleProps(props);

  return (
    <div
      {...styleProps}
      class={classNames(
        styles,
        'spectrum-HelpText',
        `spectrum-HelpText--${isErrorMessage() ? 'negative' : 'neutral'}`,
        {'is-disabled': props.isDisabled},
        styleProps.class as string | undefined
      )}
      ref={domRef}>
      {isErrorMessage() ? (
        <>
          {props.showErrorIcon && (
            <AlertMedium
              UNSAFE_className={classNames(styles, 'spectrum-HelpText-validationIcon')}
            />
          )}
          <div {...props.errorMessageProps as unknown as JSX.HTMLAttributes<HTMLDivElement>} class={classNames(styles, 'spectrum-HelpText-text')}>
            {props.errorMessage}
          </div>
        </>
      ) : (
        <div {...props.descriptionProps as unknown as JSX.HTMLAttributes<HTMLDivElement>} class={classNames(styles, 'spectrum-HelpText-text')}>
          {props.description}
        </div>
      )}
    </div>
  );
}
