/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import {classNames} from '../utils/classNames';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {createEffect, omit, untrack} from 'solid-js';
import styles from '@adobe/spectrum-css-temp/components/statuslight/vars.css';
import {useDOMRef, type DOMRef} from '../utils/useDOMRef';
import {useProviderProps} from '../provider/Provider';
import {useStyleProps} from '../utils/styleProps';
import type {SpectrumStatusLightProps} from './StatusLightTypes';
export type {SpectrumStatusLightProps} from './StatusLightTypes';

/** Status lights color code categories and labels, using semantic variants when appropriate. */
export function StatusLight(input: SpectrumStatusLightProps & {ref?: DOMRef<HTMLDivElement>}) {
  let props = useProviderProps(input);
  let otherProps = omit(props, 'variant', 'children', 'isDisabled', 'role', 'ref');
  let domRef = useDOMRef(untrack(() => input.ref));
  let {styleProps} = useStyleProps(otherProps);

  createEffect(() => ({children: props.children, label: input['aria-label'], labelledby: input['aria-labelledby'], role: props.role}), ({children, label, labelledby, role}) => {
    if (!children && !label && process.env.NODE_ENV !== 'production') {
      console.warn('If no children are provided, an aria-label must be specified');
    }
    if (!role && (label || labelledby) && process.env.NODE_ENV !== 'production') {
      console.warn('A labelled StatusLight must have a role.');
    }
  });

  return (
    <div
      {...filterDOMProps(otherProps, {get labelable() {return !!props.role;}})}
      {...styleProps}
      role={props.role}
      class={classNames(styles, 'spectrum-StatusLight', `spectrum-StatusLight--${props.variant}`, {'is-disabled': props.isDisabled}, styleProps.class as string | undefined)}
      ref={domRef}>
      {props.children}
    </div>
  );
}
