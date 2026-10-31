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

import {AriaBaseButtonProps, ButtonProps, useButton} from 'react-aria/useButton';

import {classNames} from '../utils/classNames';
import {StyleProps} from '@react-types/shared';
import {FocusRing} from 'react-aria/FocusRing';
import {mergeProps} from 'react-aria/mergeProps';
import {merge, omit} from 'solid-js';
import styles from '@adobe/spectrum-css-temp/components/button/vars.css';
import {useFocusableRef, type FocusableRef} from '../utils/useDOMRef';
import {useHover} from 'react-aria/useHover';
import {useProviderProps} from '../provider/Provider';
import {useStyleProps} from '../utils/styleProps';

export interface SpectrumLogicButtonProps
  extends AriaBaseButtonProps, Omit<ButtonProps, 'onClick'>, StyleProps {
  /** The type of boolean sequence to be represented by the LogicButton. */
  variant: 'and' | 'or';
}

/**
 * A LogicButton displays an operator within a boolean logic sequence.
 */
export function LogicButton(input: SpectrumLogicButtonProps & {ref?: FocusableRef<HTMLButtonElement>}) {
  let props = useProviderProps(input);
  let otherProps = omit(props, 'variant', 'children', 'isDisabled', 'autoFocus', 'ref');
  let domRef = useFocusableRef(input.ref);
  let {buttonProps, isPressed} = useButton(props, domRef);
  let {hoverProps, isHovered} = useHover({get isDisabled() {return props.isDisabled;}});
  let {styleProps} = useStyleProps(otherProps);

  return (
    <FocusRing focusRingClass={classNames(styles, 'focus-ring')} autoFocus={props.autoFocus}>
      {compose => <button
        {...compose(merge(styleProps, mergeProps(buttonProps, hoverProps), {
        ref: domRef,
        get class() {return classNames(
          styles,
          'spectrum-LogicButton',
          {
            [`spectrum-LogicButton--${props.variant}`]: props.variant,
            'is-disabled': props.isDisabled,
            'is-active': isPressed(),
            'is-hovered': isHovered()
          },
          styleProps.class as string | undefined
        );}
        }))}>
        <span class={classNames(styles, 'spectrum-Button-label')}>{props.children}</span>
      </button>}
    </FocusRing>
  );
}
