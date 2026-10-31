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
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {merge, omit} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {useSlotProps} from '../utils/Slots';
import {useStyleProps} from '../utils/styleProps';

export interface IllustrationProps extends DOMProps, AriaLabelingProps, StyleProps {
  /**
   * A screen reader only label for the Illustration.
   */
  'aria-label'?: string;
  /**
   * The content to display. Should be an SVG.
   */
  children: (props: JSX.SvgSVGAttributes<SVGSVGElement>) => JSX.Element;
  /**
   * A slot to place the illustration in.
   *
   * @default 'illustration'
   */
  slot?: string;
  /**
   * Indicates whether the element is exposed to an accessibility API.
   */
  'aria-hidden'?: boolean | 'false' | 'true';
}

export type IllustrationPropsWithoutChildren = Omit<IllustrationProps, 'children'>;

/**
 * Wrapper component for illustrations. Use this to wrap your svg element for a custom illustration.
 */
export function Illustration(props: IllustrationProps): JSX.Element {
  props = useSlotProps(props, 'illustration');
  let otherProps = omit(props, 'children', 'aria-label', 'aria-labelledby', 'aria-hidden');
  let {styleProps} = useStyleProps(otherProps);

  // The style helper declares HTML host attributes, but produces only these
  // style fields. Do not widen the actual SVG's ref to an HTML element ref.
  let illustrationProps = merge(filterDOMProps<SVGSVGElement>(otherProps), {
    get style() { return styleProps.style; },
    get class() { return styleProps.class; },
    get hidden() { return styleProps.hidden; },
    focusable: 'false' as const,
    get 'aria-label'() { return props['aria-label']; },
    get 'aria-labelledby'() { return props['aria-labelledby']; },
    get 'aria-hidden'() {
      let hidden = props['aria-hidden'] || undefined;
      return hidden === true ? 'true' as const : hidden;
    },
    get role() { return props['aria-label'] || props['aria-labelledby'] ? 'img' as const : undefined; }
  });
  return <>{() => props.children(illustrationProps)}</>;
}
