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
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {createEffect, omit, untrack} from 'solid-js';
import type {JSX} from '@solidjs/web';
import styles from '@adobe/spectrum-css-temp/components/well/vars.css';
import {useDOMRef, type DOMRef} from '../utils/useDOMRef';
import {useStyleProps} from '../utils/styleProps';

export interface SpectrumWellProps extends DOMProps, AriaLabelingProps, StyleProps {
  /**
   * The contents of the Well.
   */
  children: JSX.Element;
  /**
   * An accessibility role for the well. Use `'region'` when the contents of the well
   * is important enough to be included in the page table of contents, and `'group'` otherwise.
   * If a role is provided, then an aria-label or aria-labelledby must also be provided.
   */
  role?: 'region' | 'group';
}

/**
 * A Well is a content container that displays non-editable content separate from other content on
 * the screen. Often this is used to display preformatted text, such as code/markup examples on a
 * documentation page.
 */
export function Well(props: SpectrumWellProps & {ref?: DOMRef<HTMLDivElement>}) {
  let otherProps = omit(props, 'children', 'role', 'ref');
  let domRef = useDOMRef(untrack(() => props.ref));
  let {styleProps} = useStyleProps(otherProps);

  createEffect(() => ({role: props.role, label: props['aria-label'], labelledby: props['aria-labelledby']}), ({role, label, labelledby}) => {
    if (!role && (label || labelledby) && process.env.NODE_ENV !== 'production') {
      console.warn('A labelled Well must have a role.');
    }
  });

  return (
    <div
      {...filterDOMProps(otherProps, {get labelable() {return !!props.role;}})}
      {...styleProps}
      role={props.role}
      ref={domRef}
      class={classNames(styles, 'spectrum-Well', styleProps.class as string | undefined)}>
      {props.children}
    </div>
  );
}
