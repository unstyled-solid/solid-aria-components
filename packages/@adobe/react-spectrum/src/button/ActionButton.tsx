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
import clsx from 'clsx';
import {ClearSlots, SlotProvider, useSlotProps} from '../utils/Slots';
import CornerTriangle from '@spectrum-icons/ui/CornerTriangle';
import {StyleProps} from '@react-types/shared';
import {useFocusRing} from 'react-aria/useFocusRing';
import {mergeProps} from 'react-aria/mergeProps';
import {children as resolveChildren, omit} from 'solid-js';
import type {JSX} from '@solidjs/web';
import styles from '@adobe/spectrum-css-temp/components/button/vars.css';
import {Text} from '../text/Text';
import {useFocusableRef, type FocusableRef} from '../utils/useDOMRef';
import {useHover} from 'react-aria/useHover';
import {useProviderProps} from '../provider/Provider';
import {useStyleProps} from '../utils/styleProps';

export interface SpectrumActionButtonProps
  extends AriaBaseButtonProps, Omit<ButtonProps, 'onClick'>, StyleProps {
  /**
   * Whether the button should be displayed with a [quiet
   * style](https://spectrum.adobe.com/page/action-button/#Quiet).
   */
  isQuiet?: boolean;
  /** The static color style to apply. Useful when the button appears over a color background. */
  staticColor?: 'white' | 'black';
  ref?: FocusableRef<HTMLButtonElement>;
}

/**
 * ActionButtons allow users to perform an action. They’re used for similar, task-based options
 * within a workflow, and are ideal for interfaces where buttons aren’t meant to draw a lot of
 * attention.
 */
export function ActionButton(props: SpectrumActionButtonProps) {
  let ref = props.ref;
  props = useProviderProps(props);
  props = useSlotProps(props, 'actionButton');
  let textProps = useSlotProps(
    {UNSAFE_className: classNames(styles, 'spectrum-ActionButton-label')},
    'text'
  );

  let privateProps = props as SpectrumActionButtonProps & {holdAffordance?: boolean; hideButtonText?: boolean};
  let otherProps = omit(privateProps, 'isQuiet', 'isDisabled', 'staticColor', 'children', 'autoFocus', 'holdAffordance', 'hideButtonText', 'ref');

  let domRef = useFocusableRef(ref);
  let {buttonProps, isPressed} = useButton(props, domRef);
  let {hoverProps, isHovered} = useHover({get isDisabled() { return props.isDisabled; }});
  let {styleProps} = useStyleProps(otherProps);
  let {focusProps, isFocusVisible} = useFocusRing(props);
  let slots = {
    icon: {
      size: 'S',
      get UNSAFE_className() { return classNames(styles, 'spectrum-Icon', {'spectrum-ActionGroup-itemIcon': privateProps.hideButtonText}); }
    },
    text: textProps
  };

  return (
      <button
        {...styleProps}
        {...mergeProps(buttonProps, hoverProps, focusProps)}
        ref={domRef}
        class={classNames(
          styles,
          'spectrum-ActionButton',
          {
            'spectrum-ActionButton--quiet': props.isQuiet,
            'spectrum-ActionButton--staticColor': !!props.staticColor,
            'spectrum-ActionButton--staticWhite': props.staticColor === 'white',
            'spectrum-ActionButton--staticBlack': props.staticColor === 'black',
            'is-active': isPressed(),
            'is-disabled': props.isDisabled,
            'is-hovered': isHovered(),
            'focus-ring': isFocusVisible()
          },
          clsx(styleProps.class)
        )}>
        {privateProps.holdAffordance && (
          <CornerTriangle UNSAFE_className={classNames(styles, 'spectrum-ActionButton-hold')} />
        )}
        <ClearSlots>
          <SlotProvider slots={slots}>
            <ActionButtonContent>{props.children}</ActionButtonContent>
          </SlotProvider>
        </ClearSlots>
      </button>
  );
}

function ActionButtonContent(props: {children?: JSX.Element}): JSX.Element {
  let content = resolveChildren(() => props.children);
  return <>{() => content.toArray().every(child => typeof child !== 'object' || child === null)
    ? <Text>{content()}</Text> : content()}</>;
}
