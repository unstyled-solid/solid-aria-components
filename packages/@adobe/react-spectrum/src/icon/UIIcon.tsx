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

import {AriaLabelingProps, DOMProps, StyleProps} from '@react-types/shared';
import {classNames} from '../utils/classNames';
import clsx from 'clsx';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {ProviderContext} from '../provider/types';
import {merge, omit} from 'solid-js';
import type {JSX} from '@solidjs/web';
import styles from '@adobe/spectrum-css-temp/components/icon/vars.css';
import {useProvider} from '../provider/Provider';
import {useSlotProps} from '../utils/Slots';
import {useStyleProps} from '../utils/styleProps';

export interface UIIconProps extends DOMProps, AriaLabelingProps, StyleProps {
  children: ((props: JSX.SvgSVGAttributes<SVGSVGElement>) => JSX.Element) & {displayName?: string};
  slot?: string;
  /**
   * Indicates whether the element is exposed to an accessibility API.
   */
  'aria-hidden'?: boolean | 'false' | 'true';
}

export type UIIconPropsWithoutChildren = Omit<UIIconProps, 'children'>;

export function UIIcon(props: UIIconProps): JSX.Element {
  props = useSlotProps(props, 'icon');
  let otherProps = omit(props, 'children', 'aria-label', 'aria-hidden');

  let {styleProps} = useStyleProps(otherProps);
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
    get scale() { return provider?.scale === 'large' ? 'L' : 'M'; },
    focusable: 'false' as const,
    get 'aria-label'() { return props['aria-label']; },
    get 'aria-hidden'() {
      let hidden = props['aria-label'] ? props['aria-hidden'] || undefined : true;
      return hidden === true ? 'true' as const : hidden;
    },
    role: 'img' as const,
    get class() { return classNames(
      styles,
      'spectrum-Icon',
      {
        [`spectrum-UIIcon-${props.children.displayName}`]: props.children.displayName
      },
      clsx(styleProps.class)
    ); }
  });
  return <>{() => props.children(iconProps)}</>;
}
