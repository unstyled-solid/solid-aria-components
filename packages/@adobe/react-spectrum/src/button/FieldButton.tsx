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

import {ButtonProps, useButton} from 'react-aria/useButton';

import {classNames} from '../utils/classNames';
import {DOMProps, StyleProps} from '@react-types/shared';
import {FocusRing} from 'react-aria/FocusRing';
import {mergeProps} from 'react-aria/mergeProps';
import {merge, omit, untrack} from 'solid-js';
import {SlotProvider, useSlotProps} from '../utils/Slots';
import styles from '@adobe/spectrum-css-temp/components/button/vars.css';
import {useFocusableRef, type FocusableRef} from '../utils/useDOMRef';
import {useHover} from 'react-aria/useHover';
import {useStyleProps} from '../utils/styleProps';

interface FieldButtonProps extends ButtonProps, DOMProps, StyleProps {
  isQuiet?: boolean;
  isActive?: boolean;
  validationState?: 'valid' | 'invalid';
  isInvalid?: boolean;
  focusRingClass?: string;
  ref?: FocusableRef;
}

// @private
export function FieldButton(input: FieldButtonProps) {
  let props = useSlotProps(input, 'button');
  let otherProps = omit(props, 'isQuiet', 'isDisabled', 'validationState', 'isInvalid', 'children', 'autoFocus', 'isActive', 'focusRingClass', 'ref');
  let domRef = useFocusableRef<HTMLButtonElement>(untrack(() => input.ref) as FocusableRef<HTMLButtonElement> | undefined);
  let {buttonProps, isPressed} = useButton(props, domRef);
  let {hoverProps, isHovered} = useHover({get isDisabled() {return props.isDisabled;}});
  let {styleProps} = useStyleProps(otherProps);

  return (
    <FocusRing
      focusRingClass={classNames(styles, 'focus-ring', props.focusRingClass)}
      autoFocus={props.autoFocus}>
      {compose => <button {...compose(merge(mergeProps(buttonProps, hoverProps), {
        ref: domRef,
        get class() {return classNames(
          styles,
          'spectrum-FieldButton',
          {
            'spectrum-FieldButton--quiet': props.isQuiet,
            'is-active': props.isActive || isPressed(),
            'is-disabled': props.isDisabled,
            'spectrum-FieldButton--invalid': props.isInvalid || props.validationState === 'invalid',
            'is-hovered': isHovered()
          },
          styleProps.class as string | undefined
        );}
      }))}>
        <SlotProvider
          slots={{
            icon: {
              size: 'S',
              UNSAFE_className: classNames(styles, 'spectrum-Icon')
            }
          }}>
          {props.children}
        </SlotProvider>
      </button>}
    </FocusRing>
  );
}
