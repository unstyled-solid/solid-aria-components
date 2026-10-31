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

import {AriaButtonProps, useButton} from 'react-aria/useButton';

import {classNames} from '../utils/classNames';
import CrossSmall from '@spectrum-icons/ui/CrossSmall';
import {DOMProps, StyleProps} from '@react-types/shared';
import {FocusRing} from 'react-aria/FocusRing';
import {mergeProps} from 'react-aria/mergeProps';
import {merge, omit, untrack} from 'solid-js';
import {dynamic, type ValidComponent as ElementType} from '@solidjs/web';
import styles from '@adobe/spectrum-css-temp/components/button/vars.css';
import {useFocusableRef, type FocusableRef} from '../utils/useDOMRef';
import {useHover} from 'react-aria/useHover';
import {useStyleProps} from '../utils/styleProps';

interface ClearButtonProps<T extends ElementType = 'button'>
  extends AriaButtonProps<T>, DOMProps, StyleProps {
  focusClassName?: string;
  variant?: 'overBackground';
  excludeFromTabOrder?: boolean;
  preventFocus?: boolean;
  inset?: boolean;
  ref?: FocusableRef<HTMLButtonElement>;
}

export function ClearButton<T extends ElementType = 'button'>(props: ClearButtonProps<T>) {
  let elementType = () => props.elementType ?? (props.preventFocus ? 'div' : 'button');
  let otherProps = omit(props, 'children', 'focusClassName', 'variant', 'autoFocus', 'isDisabled', 'preventFocus', 'elementType', 'inset', 'ref');
  let domRef = useFocusableRef(untrack(() => props.ref));
  let {buttonProps, isPressed} = useButton(merge(props, {get elementType() {return elementType();}}), domRef);
  let {hoverProps, isHovered} = useHover({get isDisabled() {return props.isDisabled;}});
  let {styleProps} = useStyleProps(otherProps);

  // For cases like the clear button in a search field, remove the tabIndex so
  // iOS 14 with VoiceOver doesn't focus the button and hide the keyboard when
  // moving the cursor over the clear button.
  let clearButtonProps = omit(buttonProps, key => !!props.preventFocus && key === 'tabindex');

  let Element = dynamic(elementType);
  return (
    <FocusRing
      focusRingClass={classNames(styles, 'focus-ring', props.focusClassName)}
      autoFocus={props.autoFocus}>
      {compose => <Element {...compose(merge(styleProps, mergeProps(clearButtonProps, hoverProps), {
        ref: domRef,
        get class() {return classNames(
          styles,
          'spectrum-ClearButton',
          {
            [`spectrum-ClearButton--${props.variant}`]: props.variant,
            'is-disabled': props.isDisabled,
            'is-active': isPressed(),
            'is-hovered': isHovered(),
            'spectrum-ClearButton--inset': props.inset ?? false
          },
          styleProps.class as string | undefined
        );}
      }))}>
        {props.children === undefined ? <CrossSmall UNSAFE_className={styles['spectrum-Icon']} /> : props.children}
      </Element>}
    </FocusRing>
  );
}
