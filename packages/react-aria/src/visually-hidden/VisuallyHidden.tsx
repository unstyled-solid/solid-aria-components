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

import {DOMAttributes} from '@react-types/shared';
import {mergeProps} from '../utils/mergeProps';
import {createMemo, createSignal, omit} from 'solid-js';
import {Dynamic, JSX} from '@solidjs/web';
import {useFocusWithin} from '../interactions/useFocusWithin';

export interface VisuallyHiddenProps extends DOMAttributes {
  /** The content to visually hide. */
  children?: JSX.Element;

  /**
   * The element type for the container.
   *
   * @default 'div'
   */
  elementType?: keyof JSX.IntrinsicElements | ((props: any) => JSX.Element);

  /** Whether the element should become visible on focus, for example skip links. */
  isFocusable?: boolean;
}

const styles: JSX.CSSProperties = {
  border: 0,
  clip: 'rect(0 0 0 0)',
  'clip-path': 'inset(50%)',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  width: '1px',
  'white-space': 'nowrap'
};

export interface VisuallyHiddenAria {
  visuallyHiddenProps: DOMAttributes;
}

/**
 * Provides props for an element that hides its children visually
 * but keeps content visible to assistive technology.
 */
export function useVisuallyHidden(props: VisuallyHiddenProps = {}): VisuallyHiddenAria {
  let [isFocused, setFocused] = createSignal(false);
  let {focusWithinProps} = useFocusWithin({
    get isDisabled() { return !props.isFocusable; },
    onFocusWithinChange: val => setFocused(val)
  });

  // If focused, don't hide the element.
  let combinedStyles = createMemo(() => {
    let style = props.style;
    if (isFocused()) {
      // oxlint-disable-next-line react/react-compiler
      // Whitespace is an empty declaration block but remains truthy for the
      // native renderer, clearing cssText rather than removing the attribute.
      // This also clears longhands expanded from hidden shorthand declarations.
      return style ?? ' ';
    } else if (style) {
      return {...styles, ...style};
    } else {
      return styles;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return {
    visuallyHiddenProps: mergeProps(focusWithinProps, {
      get style() { return combinedStyles(); }
    })
  };
}

/**
 * VisuallyHidden hides its children visually, while keeping content visible
 * to screen readers.
 */
export function VisuallyHidden(props: VisuallyHiddenProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let otherProps = omit(props, 'children', 'elementType', 'isFocusable', 'style');
  let {visuallyHiddenProps} = useVisuallyHidden(props);

  return <Dynamic component={props.elementType ?? 'div'} {...mergeProps(otherProps, visuallyHiddenProps)}>{props.children}</Dynamic>;
}
