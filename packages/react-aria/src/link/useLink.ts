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

import {
  AriaLabelingProps,
  DOMAttributes,
  FocusableElement,
  FocusableProps,
  LinkDOMProps,
  PressEvents,
  RefObject
} from '@react-types/shared';
import {filterDOMProps} from '../utils/filterDOMProps';
import {handleLinkClick, useLinkProps, useRouter} from '../utils/openLink';
import {mergeProps} from '../utils/mergeProps';
import {omit} from 'solid-js';
import type {Accessor} from 'solid-js';
import {useFocusable} from '../interactions/useFocusable';
import {usePress} from '../interactions/usePress';
import {useObjectRef} from '../utils/useObjectRef';

export interface LinkProps extends PressEvents, FocusableProps {}

export interface AriaLinkProps extends LinkProps, LinkDOMProps, AriaLabelingProps {
  /**
   * Indicates whether this element represents the current item within a container or set of related
   * elements.
   */
  'aria-current'?: boolean | 'true' | 'false' | 'page' | 'step' | 'location' | 'date' | 'time';
}

export interface AriaLinkOptions extends AriaLinkProps {
  /** Whether the link is disabled. */
  isDisabled?: boolean;
  /**
   * The HTML element used to render the link, e.g. 'a', or 'span'.
   *
   * @default 'a'
   */
  elementType?: string;
}

export interface LinkAria {
  /** Props for the link element. */
  linkProps: DOMAttributes;
  /** Whether the link is currently pressed. */
  isPressed: Accessor<boolean>;
}

/**
 * Provides the behavior and accessibility implementation for a link component.
 * A link allows a user to navigate to another page or resource within a web page
 * or application.
 */
export function useLink(props: AriaLinkOptions, ref?: RefObject<FocusableElement | null>): LinkAria {
  let domRef = ref ?? useObjectRef<FocusableElement>();
  let linkProps: DOMAttributes = {
    get role() { return (props.elementType ?? 'a') !== 'a' ? 'link' : undefined; },
    get tabIndex() { return (props.elementType ?? 'a') !== 'a' && !props.isDisabled ? 0 : undefined; }
  };
  let {focusableProps} = useFocusable(props, domRef);
  let {pressProps, isPressed} = usePress({
    get onPress() { return props.onPress; },
    get onPressStart() { return props.onPressStart; },
    get onPressEnd() { return props.onPressEnd; },
    get onPressChange() { return props.onPressChange; },
    get onClick() { return props.onClick; },
    get isDisabled() { return props.isDisabled; },
    ref: domRef
  });
  let domProps = filterDOMProps(props, {labelable: true});
  let interactionHandlers = mergeProps(focusableProps, pressProps);
  let router = useRouter();
  let routerLinkProps = useLinkProps(props);

  return {
    isPressed, // Used to indicate press state for visual
    linkProps: mergeProps(omit(domProps, 'onClick'), routerLinkProps, omit(interactionHandlers, 'onClick'), linkProps, {
      get 'aria-disabled'() { return props.isDisabled || undefined; },
      get 'aria-current'() { return props['aria-current']; },
      onClick: (e: MouseEvent & {currentTarget: FocusableElement; target: Element}) => {
        let handler = pressProps.onClick;
        if (typeof handler === 'function') {
          handler(e);
        } else if (handler) {
          handler[0](handler[1], e);
        }
        handleLinkClick(e, router, props.href, props.routerOptions);
      }
    })
  };
}
