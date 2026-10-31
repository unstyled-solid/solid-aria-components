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

import {AriaLinkOptions, useLink} from 'react-aria/useLink';

import {
  ClassNameOrFunction,
  ContextValue,
  dom,
  PossibleLinkDOMRenderProps,
  RenderProps,
  SlotProps,
  useContextProps,
  useRenderProps
} from './utils';
import {DOMProps, GlobalDOMAttributes} from '@react-types/shared';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {HoverEvents} from '@react-types/shared';
import {mergeProps} from 'react-aria/mergeProps';
import {createContext, merge, omit} from 'solid-js';
import type {Ref} from 'solid-js';
import {dynamic} from '@solidjs/web';
import {useObjectRef} from 'react-aria/private/utils/useObjectRef';
import {useFocusRing} from 'react-aria/useFocusRing';
import {useHover} from 'react-aria/useHover';

export interface LinkProps
  extends
    Omit<AriaLinkOptions, 'elementType'>,
    HoverEvents,
    Omit<RenderProps<LinkRenderProps>, 'render'>,
    PossibleLinkDOMRenderProps<'span', LinkRenderProps>,
    SlotProps,
    DOMProps,
    Omit<GlobalDOMAttributes<HTMLAnchorElement>, 'onClick'> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-Link'
   */
  className?: ClassNameOrFunction<LinkRenderProps>;
}

export interface LinkRenderProps {
  /**
   * Whether the link is the current item within a list.
   *
   * @selector [data-current]
   */
  isCurrent: boolean;
  /**
   * Whether the link is currently hovered with a mouse.
   *
   * @selector [data-hovered]
   */
  isHovered: boolean;
  /**
   * Whether the link is currently in a pressed state.
   *
   * @selector [data-pressed]
   */
  isPressed: boolean;
  /**
   * Whether the link is focused, either via a mouse or keyboard.
   *
   * @selector [data-focused]
   */
  isFocused: boolean;
  /**
   * Whether the link is keyboard focused.
   *
   * @selector [data-focus-visible]
   */
  isFocusVisible: boolean;
  /**
   * Whether the link is disabled.
   *
   * @selector [data-disabled]
   */
  isDisabled: boolean;
}

export const LinkContext = createContext<ContextValue<LinkProps, HTMLAnchorElement>>(null);

/**
 * A link allows a user to navigate to another page or resource within a web page
 * or application.
 */
export function Link(inputProps: LinkProps & {ref?: Ref<HTMLAnchorElement>}) {
  let [props, contextRef] = useContextProps(inputProps, inputProps.ref, LinkContext);
  // useContextProps composes renderer refs into a callable attachment handle.
  let ref = useObjectRef<HTMLElement>(contextRef as (element: HTMLElement | null) => void);

  let elementType = () => props.href && !props.isDisabled ? 'a' : 'span';
  let {linkProps, isPressed} = useLink(merge(props, {get elementType() { return elementType(); }}), ref);
  let ElementType = dynamic(() => dom[elementType()]);

  let {hoverProps, isHovered} = useHover(props);
  let {focusProps, isFocused, isFocusVisible} = useFocusRing();

  let renderProps = useRenderProps<LinkRenderProps, 'span' | 'a'>(merge(omit(props, 'render'), {
    defaultClassName: 'react-aria-Link',
    values: {
      get isCurrent() { return !!props['aria-current']; },
      get isDisabled() { return props.isDisabled || false; },
      get isPressed() { return isPressed(); },
      get isHovered() { return isHovered(); },
      get isFocused() { return isFocused(); },
      get isFocusVisible() { return isFocusVisible(); }
    }
  }));

  let DOMProps = omit(filterDOMProps(props, {global: true}), 'onClick');

  return (
    <ElementType
      ref={ref}
      slot={props.slot || undefined}
      {...omit(mergeProps(DOMProps, renderProps, linkProps, hoverProps, focusProps), 'ref')}
      render={props.render}
      aria-disabled={props.isDisabled ? 'true' : undefined}
      data-focused={isFocused() ? 'true' : undefined}
      data-hovered={isHovered() ? 'true' : undefined}
      data-pressed={isPressed() ? 'true' : undefined}
      data-focus-visible={isFocusVisible() ? 'true' : undefined}
      data-current={props['aria-current'] ? 'true' : undefined}
      data-disabled={props.isDisabled ? 'true' : undefined}>
      {renderProps.children}
    </ElementType>
  );
}
