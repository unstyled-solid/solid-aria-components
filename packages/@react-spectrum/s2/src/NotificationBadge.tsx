/*
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {AriaLabelingProps, DOMProps, DOMRefValue} from '@react-types/shared';
import {ContextValue, SlotProps} from 'react-aria-components/slots';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {fontRelative, style} from '../style' with {type: 'macro'};
import {getAllowedOverrides, StyleProps} from './style-utils' with {type: 'macro'};
import intlMessages from '../intl/*.json';
import {NumberFormatter} from '@internationalized/number';
import {createContext, createMemo, omit, untrack, type Ref} from 'solid-js';
import {useDOMRef} from './useDOMRef';
import {useLocale} from 'react-aria/I18nProvider';
import {useLocalizedStringFormatter} from 'react-aria/useLocalizedStringFormatter';
import {useSpectrumContextProps} from './useSpectrumContextProps';

export interface NotificationBadgeStyleProps {
  /**
   * The size of the notification badge.
   *
   * @default 'S'
   */
  size?: 'S' | 'M' | 'L' | 'XL';
}

export interface NotificationBadgeProps
  extends DOMProps, AriaLabelingProps, StyleProps, NotificationBadgeStyleProps, SlotProps {
  /**
   * The value to be displayed in the notification badge.
   */
  value?: number | null;
}

interface NotificationBadgeContextProps extends Partial<NotificationBadgeProps> {
  isDisabled?: boolean;
  staticColor?: 'black' | 'white' | 'auto';
}

export const NotificationBadgeContext =
  createContext<ContextValue<Partial<NotificationBadgeContextProps>, DOMRefValue<HTMLDivElement>>>(
    null
  );

const badge = style(
  {
    display: {
      default: 'flex',
      isDisabled: 'none'
    },
    font: 'ui',
    color: {
      default: 'white',
      isStaticColor: 'auto',
      forcedColors: 'ButtonText'
    },
    fontSize: {
      size: {
        S: 'ui-xs',
        M: 'ui-xs',
        L: 'ui-sm',
        XL: 'ui'
      }
    },
    borderStyle: {
      forcedColors: 'solid'
    },
    borderWidth: {
      forcedColors: '[1px]'
    },
    borderColor: {
      forcedColors: 'ButtonBorder'
    },
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: {
      default: 'accent',
      isStaticColor: 'transparent-overlay-1000',
      forcedColors: 'ButtonFace'
    },
    height: {
      size: {
        S: {
          default: 12,
          isIndicatorOnly: 8
        },
        M: {
          default: '1lh', // sort of arbitrary? tried to get as close to the figma designs as possible
          isIndicatorOnly: 8
        },
        L: {
          default: 16,
          isIndicatorOnly: fontRelative(12)
        },
        XL: {
          default: 18,
          isIndicatorOnly: fontRelative(12)
        }
      }
    },
    aspectRatio: {
      isIndicatorOnly: 'square',
      isSingleDigit: 'square'
    },
    width: 'max',
    paddingX: {
      isDoubleDigit: 'edge-to-text'
    },
    borderRadius: 'pill'
  },
  getAllowedOverrides()
);

/**
 * Notification badges are used to indicate new or pending activity .
 */
export function NotificationBadge(
  inputProps: NotificationBadgeProps & {ref?: Ref<DOMRefValue<HTMLDivElement>>}
) {
  let stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-spectrum/s2');
  let [input, ref] = useSpectrumContextProps(inputProps, untrack(() => inputProps.ref), NotificationBadgeContext);
  let props = input as NotificationBadgeContextProps;
  let otherProps = omit(props, 'size', 'value', 'isDisabled', 'staticColor');
  let domRef = useDOMRef(ref);
  let locale = useLocale();
  let valueInfo = createMemo(() => {
  let value = props.value;
  let formattedValue = '';

  let isIndicatorOnly = false;
  let isSingleDigit = false;
  let isDoubleDigit = false;

  if (value == null) {
    isIndicatorOnly = true;
  } else if (value <= 0) {
    throw new Error('Value cannot be negative or zero');
  } else if (!Number.isInteger(value)) {
    throw new Error('Value must be a positive integer');
  } else {
    formattedValue = new NumberFormatter(locale.locale).format(Math.min(value, 99));
    let length = (Math.log(value <= 99 ? value : 99) * Math.LOG10E + 1) | 0; // for positive integers (https://stackoverflow.com/questions/14879691/get-number-of-digits-with-javascript)
    if (length === 1) {
      isSingleDigit = true;
    } else if (length === 2) {
      isDoubleDigit = true;
    }

    if (value > 99) {
      formattedValue = stringFormatter.format('notificationbadge.plus', {
        notifications: formattedValue
      });
    }
  }

  return {formattedValue, isIndicatorOnly, isSingleDigit, isDoubleDigit};
  });
  let ariaLabel = () => props['aria-label'] || (valueInfo().isIndicatorOnly ? stringFormatter.format('notificationbadge.indicatorOnly') : undefined);

  return (
    <span
      {...filterDOMProps(otherProps, {labelable: true})}
      role={ariaLabel() ? 'img' : undefined}
      aria-label={ariaLabel()}
      class={
        (props.UNSAFE_className || '') +
        badge(
          {
            size: props.size ?? 'S',
            isIndicatorOnly: valueInfo().isIndicatorOnly,
            isSingleDigit: valueInfo().isSingleDigit,
            isDoubleDigit: valueInfo().isDoubleDigit,
            isDisabled: props.isDisabled ?? false,
            isStaticColor: !!props.staticColor
          },
          props.styles
        )
      }
      style={props.UNSAFE_style}
      ref={node => domRef(node as HTMLDivElement)}>
      {valueInfo().formattedValue}
    </span>
  );
}
