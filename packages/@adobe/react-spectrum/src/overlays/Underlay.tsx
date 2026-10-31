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

import {classNames} from '../utils/classNames';
import {isScrollable} from 'react-aria/private/utils/isScrollable';
import {omit} from 'solid-js';
import type {JSX} from '@solidjs/web';
import underlayStyles from '@adobe/spectrum-css-temp/components/underlay/vars.css';

interface UnderlayProps extends JSX.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
  isTransparent?: boolean;
}

export function Underlay(props: UnderlayProps): JSX.Element {
  let otherProps = omit(props, 'isOpen', 'isTransparent');
  let style = () => {
      // Re-measure when the source would rerender for the transition's open state.
      props.isOpen;
      if (typeof document === 'undefined') return {height: undefined};
      let scrollingElement = isScrollable(document.body)
        ? document.body
        : document.scrollingElement || document.documentElement;
      // Prevent Firefox from adding scrollbars when the page has a fractional height.
      let fractionalHeightDifference = scrollingElement.getBoundingClientRect().height % 1;
      return {height: `${scrollingElement.scrollHeight - fractionalHeightDifference}px`};
  };

  return (
    <div
      data-testid="underlay"
      {...otherProps}
      // Cover the entire document so iOS 26 Safari doesn't clip the underlay to the inner viewport.
      style={style()}
      class={classNames(underlayStyles, 'spectrum-Underlay', {
        'is-open': props.isOpen,
        'spectrum-Underlay--transparent': props.isTransparent
      })}
    />
  );
}
