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

import {AriaLabelingProps, DOMProps, IconColorValue, StyleProps} from '@react-types/shared';
import {baseStyleProps, StyleHandlers, useStyleProps} from '../utils/styleProps';
import {classNames} from '../utils/classNames';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {ProviderContext} from '../provider/types';
import {merge, omit} from 'solid-js';
import type {JSX} from '@solidjs/web';
import clsx from 'clsx';
import styles from '@adobe/spectrum-css-temp/components/icon/vars.css';
import {useProvider} from '../provider/Provider';
import {useSlotProps} from '../utils/Slots';

export interface IconProps extends DOMProps, AriaLabelingProps, StyleProps {
  /**
   * A screen reader only label for the Icon.
   */
  'aria-label'?: string;
  /**
   * The content to display. Should be an SVG.
   */
  children: ((props: JSX.SvgSVGAttributes<SVGSVGElement>) => JSX.Element) & {className?: string};
  /**
   * Size of Icon (changes based on scale).
   */
  size?: 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  /**
   * A slot to place the icon in.
   *
   * @default 'icon'
   */
  slot?: string;
  /**
   * Indicates whether the element is exposed to an accessibility API.
   */
  'aria-hidden'?: boolean | 'false' | 'true';
  /**
   * Color of the Icon.
   */
  color?: IconColorValue;
}

export type IconPropsWithoutChildren = Omit<IconProps, 'children'>;

function iconColorValue(value: IconColorValue) {
  return `var(--spectrum-semantic-${value}-color-icon)`;
}

const iconStyleProps: StyleHandlers = {
  ...baseStyleProps,
  color: ['color', iconColorValue]
};

/**
 * Spectrum icons are clear, minimal, and consistent across platforms. They follow the focused and
 * rational principles of the design system in both metaphor and style.
 */
export function Icon(props: IconProps): JSX.Element {
  props = useSlotProps(props, 'icon');
  let otherProps = omit(props, 'children', 'size', 'aria-label', 'aria-hidden');
  let {styleProps} = useStyleProps(otherProps, iconStyleProps);

  let provider: undefined | ProviderContext;
  try {
    // oxlint-disable-next-line react/react-compiler
    provider = useProvider();
  } catch {
    // ignore
  }
  let iconProps = merge(filterDOMProps<SVGSVGElement>(otherProps), {
    get style() { return styleProps.style; },
    get hidden() { return styleProps.hidden; },
    focusable: 'false' as const,
    get 'aria-label'() { return props['aria-label']; },
    get 'aria-hidden'() {
      let hidden = props['aria-label'] ? props['aria-hidden'] || undefined : true;
      return hidden === true ? 'true' as const : hidden;
    },
    role: 'img' as const,
    get class() { return classNames(
      styles,
      props.children.className,
      'spectrum-Icon',
      `spectrum-Icon--size${props.size || (provider?.scale === 'large' ? 'L' : 'M')}`,
      clsx(styleProps.class)
    ); }
  });
  return <>{() => props.children(iconProps)}</>;
}
