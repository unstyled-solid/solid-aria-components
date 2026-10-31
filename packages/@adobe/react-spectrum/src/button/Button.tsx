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
import {StyleProps} from '@react-types/shared';
import {FocusRing} from 'react-aria/FocusRing';
import intlMessages from '../../intl/button/*.json';
import {isAppleDevice, isFirefox, isWebKit} from 'react-aria/private/utils/platform';
import {mergeProps} from 'react-aria/mergeProps';
import {ProgressCircle} from '../progress/ProgressCircle';
import {createEffect, createSignal, merge, omit} from 'solid-js';
import {dynamic, type ValidComponent as ElementType} from '@solidjs/web';
import {SlotProvider, useSlotProps} from '../utils/Slots';
import styles from '@adobe/spectrum-css-temp/components/button/vars.css';
import {Text} from '../text/Text';
import {useFocus} from 'react-aria/useFocus';
import {useFocusableRef, type FocusableRef} from '../utils/useDOMRef';
import {useHasChild} from '../utils/useHasChild';
import {useHover} from 'react-aria/useHover';
import {useId} from 'react-aria/useId';
import {useLocalizedStringFormatter} from 'react-aria/useLocalizedStringFormatter';
import {useProviderProps} from '../provider/Provider';
import {useStyleProps} from '../utils/styleProps';

/** @deprecated */
type LegacyButtonVariant = 'cta' | 'overBackground';
export interface SpectrumButtonProps<T extends ElementType = 'button'>
  extends Omit<AriaButtonProps<T>, 'onClick'>, StyleProps {
  /** The [visual style](https://spectrum.adobe.com/page/button/#Options) of the button. */
  variant: 'accent' | 'primary' | 'secondary' | 'negative' | LegacyButtonVariant;
  /** The background style of the button. */
  style?: 'fill' | 'outline';
  /** The static color style to apply. Useful when the button appears over a color background. */
  staticColor?: 'white' | 'black';
  /**
   * Whether to disable events immediately and display a loading spinner after a 1 second delay.
   */
  isPending?: boolean;
  /**
   * Whether the button should be displayed with a quiet style.
   *
   * @deprecated
   */
  isQuiet?: boolean;
}

function disablePendingProps<T extends {isPending?: boolean}>(props: T): T {
  // Don't allow interaction while isPending is true
  let disabledKeys = new Set<PropertyKey>(['onPress', 'onPressStart', 'onPressEnd', 'onPressChange',
    'onPressUp', 'onKeyDown', 'onKeyUp', 'onClick', 'href']);
  return new Proxy(props, {
    get(target, key) {
      return disabledKeys.has(key) && target.isPending ? undefined : Reflect.get(target, key);
    }
  });
}

/**
 * Buttons allow users to perform an action or to navigate to another page.
 * They have multiple styles for various needs, and are ideal for calling attention to
 * where a user needs to do something in order to move forward in a flow.
 */
export function Button<T extends ElementType = 'button'>(input: SpectrumButtonProps<T> & {ref?: FocusableRef<HTMLElement>}) {
  let props = disablePendingProps(useSlotProps(useProviderProps(input), 'button'));
  let Element = dynamic(() => props.elementType ?? 'button');
  let children = () => props.children;
  let variant = () => props.variant === 'cta' ? 'accent' : props.variant === 'overBackground' ? 'primary' : props.variant;
  let style = () => props.style ?? (props.variant === 'accent' || props.variant === 'cta' ? 'fill' : 'outline');
  let staticColor = () => props.variant === 'overBackground' ? 'white' : props.staticColor;
  let isPending = () => props.isPending;
  let otherProps = omit(props, 'elementType', 'children', 'variant', 'style', 'staticColor', 'isDisabled', 'isPending', 'autoFocus', 'ref');
  let domRef = useFocusableRef(input.ref);
  let {buttonProps, isPressed} = useButton(props, domRef);
  let {hoverProps, isHovered} = useHover({get isDisabled() {return props.isDisabled;}});
  let [isFocused, onFocusChange] = createSignal(false);
  let {focusProps} = useFocus({onFocusChange, get isDisabled() {return props.isDisabled;}});
  let stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-spectrum/button');
  let {styleProps} = useStyleProps(otherProps);
  let hasLabel = useHasChild(`.${styles['spectrum-Button-label']}`, domRef);
  let hasIcon = useHasChild(`.${styles['spectrum-Icon']}`, domRef);
  // an aria label will block children and their labels from being read, this is undesirable for pending state
  let hasAriaLabel = () => !!buttonProps['aria-label'] || !!buttonProps['aria-labelledby'];
  let [isProgressVisible, setIsProgressVisible] = createSignal(false);
  let backupButtonId = useId();
  let buttonId = () => buttonProps.id || backupButtonId();
  let iconId = useId();
  let textId = useId();
  let spinnerId = useId();

  createEffect(isPending, pending => {
    let timeout: ReturnType<typeof setTimeout>;

    if (pending) {
      // Start timer when isPending is set to true.
      timeout = setTimeout(() => {
        setIsProgressVisible(true);
      }, 1000);
    } else {
      // Exit loading state when isPending is set to false. */
      // oxlint-disable-next-line react/react-compiler
      setIsProgressVisible(false);
    }
    return () => {
      // Clean up on unmount or when user removes isPending prop before entering loading state.
      clearTimeout(timeout);
    };
  });

  const isPendingAriaLiveLabel = () =>
    `${hasAriaLabel() ? buttonProps['aria-label'] : ''} ${stringFormatter.format('pending')}`.trim();
  const isPendingAriaLiveLabelledby = () => {
    let labelledby = buttonProps['aria-labelledby'];
    return hasAriaLabel()
      ? (typeof labelledby === 'string' ? labelledby.replace(buttonId(), spinnerId()) : spinnerId())
      : `${hasIcon() ? iconId() : ''} ${hasLabel() ? textId() : ''} ${spinnerId()}`.trim();
  };

  let ariaLive = () => isAppleDevice() && (!hasAriaLabel() || (!isWebKit() && isFirefox())) ? 'off' as const : 'polite' as const;

  let isPendingProps = merge(() => isPending()
    ? {
        onClick: (e: MouseEvent) => {
          if (e.currentTarget instanceof HTMLButtonElement) {
            e.preventDefault();
          }
        }
      }
    : {
        // no-op.
        // Not sure why, but TypeScript wouldn't allow to have an empty object `{}`.
        onClick: () => {}
      });

  return (
    <FocusRing focusRingClass={classNames(styles, 'focus-ring')} autoFocus={props.autoFocus}>
      {compose => <Element
        {...compose(merge(styleProps, mergeProps(buttonProps, hoverProps, focusProps, isPendingProps), {
        get id() {return buttonId();},
        ref: domRef,
        get 'data-variant'() {return variant();},
        get 'data-style'() {return style();},
        get 'data-static-color'() {return staticColor() || undefined;},
        get 'aria-disabled'() {return isPending() ? 'true' : undefined;},
        get 'aria-label'() {return isPending() ? isPendingAriaLiveLabel() : buttonProps['aria-label'];},
        get 'aria-labelledby'() {return isPending() ? isPendingAriaLiveLabelledby() : buttonProps['aria-labelledby'];},
        get class() {return classNames(
          styles,
          'spectrum-Button',
          {
            'spectrum-Button--iconOnly': hasIcon() && !hasLabel(),
            'is-disabled': props.isDisabled || isProgressVisible(),
            'is-active': isPressed(),
            'is-hovered': isHovered(),
            'spectrum-Button--pending': isProgressVisible()
          },
          styleProps.class as string | undefined
        );}
        }))}>
        <SlotProvider
          slots={{
            icon: {
              get id() {return iconId();},
              size: 'S',
              UNSAFE_className: classNames(styles, 'spectrum-Icon')
            },
            text: {
              get id() {return textId();},
              UNSAFE_className: classNames(styles, 'spectrum-Button-label')
            }
          }}>
          {typeof children() === 'string' ? <Text>{children()}</Text> : children()}
          {isPending() && (
            <div
              aria-hidden="true"
              style={{visibility: isProgressVisible() ? 'visible' : 'hidden'}}
              class={classNames(styles, 'spectrum-Button-circleLoader')}>
              <ProgressCircle
                aria-label={isPendingAriaLiveLabel()}
                isIndeterminate
                size="S"
                staticColor={staticColor()}
              />
            </div>
          )}
          {isPending() && (
            <>
              <div aria-live={isFocused() ? ariaLive() : 'off'}>
                {isProgressVisible() && (
                  <div role="img" aria-labelledby={isPendingAriaLiveLabelledby()} />
                )}
              </div>
              {/* Adding the element here with the same labels as the button itself causes aria-live to pick up the change in Safari.
              Safari with VO unfortunately doesn't announce changes to *all* of its labels specifically for button
              https://a11ysupport.io/tests/tech__html__button-name-change#assertion-aria-aria-label_attribute-convey_name_change-html-button_element-vo_macos-safari
              The aria-live may cause extra announcements in other browsers. */}
              <div id={spinnerId()} role="img" aria-label={isPendingAriaLiveLabel()} />
            </>
          )}
        </SlotProvider>
      </Element>}
    </FocusRing>
  );
}
