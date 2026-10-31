/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {AriaLabelingProps, DOMProps, StyleProps} from '@react-types/shared';
import {classNames} from '../utils/classNames';
import {ClearSlots, SlotProvider} from '../utils/Slots';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {children, omit, untrack} from 'solid-js';
import type {JSX} from '@solidjs/web';
import styles from '@adobe/spectrum-css-temp/components/badge/vars.css';
import {Text} from '../text/Text';
import {useDOMRef, type DOMRef} from '../utils/useDOMRef';
import {useProviderProps} from '../provider/Provider';
import {useStyleProps} from '../utils/styleProps';

export interface SpectrumBadgeProps extends DOMProps, StyleProps, AriaLabelingProps {
  /** The content to display in the badge. */
  children: JSX.Element;
  /**
   * The variant changes the background color of the badge.
   * When badge has a semantic meaning, they should use the variant for semantic colors.
   */
  variant:
    | 'neutral'
    | 'info'
    | 'positive'
    | 'negative'
    | 'indigo'
    | 'yellow'
    | 'magenta'
    | 'fuchsia'
    | 'purple'
    | 'seafoam';
}

/**
 * Badges are used for showing a small amount of color-categorized metadata, ideal for getting a
 * user's attention.
 */
export function Badge(props: SpectrumBadgeProps & {ref?: DOMRef<HTMLSpanElement>}) {
  props = useProviderProps(props);
  let otherProps = omit(props, 'children', 'variant', 'ref');
  let domRef = useDOMRef(untrack(() => props.ref));
  let {styleProps} = useStyleProps(otherProps);

  return (
    <span
      {...filterDOMProps(otherProps)}
      {...styleProps}
      role="presentation"
      class={classNames(
        styles,
        'spectrum-Badge',
        {
          [`spectrum-Badge--${props.variant}`]: props.variant
        },
        styleProps.class as string | undefined
      )}
      ref={domRef}>
      <ClearSlots>
        <SlotProvider
          slots={{
            icon: {
              size: 'S',
              UNSAFE_className: classNames(styles, 'spectrum-Badge-icon')
            },
            text: {
              UNSAFE_className: classNames(styles, 'spectrum-Badge-label')
            }
          }}>
          <BadgeContent>{props.children}</BadgeContent>
        </SlotProvider>
      </ClearSlots>
    </span>
  );
}

function BadgeContent(props: {children: JSX.Element}): JSX.Element {
  // Resolve only beneath the source ClearSlots/SlotProvider ownership so icon
  // and text children consume the badge slots, rather than their outer slots.
  let resolved = children(() => props.children);
  return <>{() => resolved.toArray().every(child => typeof child !== 'object')
    ? <Text>{resolved()}</Text>
    : resolved()}</>;
}
