/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {baseColor, focusRing, style} from '../style' with {type: 'macro'};
import {ContextValue} from 'react-aria-components/slots';
import {createContext, createRenderEffect} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {FocusableRef, FocusableRefValue, GlobalDOMAttributes} from '@react-types/shared';
import {getAllowedOverrides, staticColor, StyleProps} from './style-utils' with {type: 'macro'};
import {
  LinkRenderProps,
  Link as RACLink,
  LinkProps as RACLinkProps
} from 'react-aria-components/Link';
import {useIsSkeleton, useSkeletonText} from './Skeleton';
import {useFocusableRef} from './useDOMRef';
import {useSpectrumContextProps} from './useSpectrumContextProps';

interface LinkStyleProps {
  /**
   * The [visual style](https://spectrum.adobe.com/web/rsp/components/link#component-options) of the
   * link.
   *
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary';
  /** The static color style to apply. Useful when the link appears over a color background. */
  staticColor?: 'white' | 'black' | 'auto';
  /** Whether the link is on its own vs inside a longer string of text. */
  isStandalone?: boolean;
  /** Whether the link should be displayed with a quiet style. */
  isQuiet?: boolean;
}

export interface LinkProps
  extends
    Omit<
      RACLinkProps,
      | 'isDisabled'
      | 'className'
      | 'style'
      | 'render'
      | 'children'
      | 'onHover'
      | 'onHoverStart'
      | 'onHoverEnd'
      | 'onHoverChange'
      | 'onClick'
      | keyof GlobalDOMAttributes
    >,
    StyleProps,
    LinkStyleProps {
  children: JSX.Element;
}

export const LinkContext =
  createContext<ContextValue<Partial<LinkProps>, FocusableRefValue<HTMLAnchorElement>>>(null);

const link = style<
  LinkRenderProps & LinkStyleProps & {isSkeleton: boolean; isStaticColor: boolean}
>(
  {
    ...focusRing(),
    ...staticColor(),
    borderRadius: 'sm',
    font: {
      isStandalone: 'ui'
    },
    color: {
      variant: {
        primary: baseColor('accent'),
        secondary: baseColor('neutral') // TODO: should there be an option to inherit from the paragraph? What about hover states?
      },
      isStaticColor: 'transparent-overlay-1000',
      forcedColors: 'LinkText'
    },
    transition: 'default',
    fontWeight: {
      isStandalone: 'medium'
    },
    textDecoration: {
      default: 'underline',
      isStandalone: {
        // Inline links must always have an underline for accessibility.
        isQuiet: {
          default: 'none',
          isHovered: 'underline',
          isFocusVisible: 'underline'
        }
      }
    },
    outlineColor: {
      default: 'focus-ring',
      isStaticColor: 'transparent-overlay-1000',
      forcedColors: 'Highlight'
    },
    disableTapHighlight: true
  },
  getAllowedOverrides()
);

/**
 * Links allow users to navigate to a different location.
 * They can be presented inline inside a paragraph or as standalone text.
 */
export function Link(inputProps: LinkProps & {ref?: FocusableRef<HTMLAnchorElement>}) {
  let [props, ref] = useSpectrumContextProps(inputProps, inputProps.ref, LinkContext);
  let domRef = useFocusableRef(ref);
  let isSkeleton = useIsSkeleton();
  let [children, unsafeStyle] = useSkeletonText(() => props.children, () => props.UNSAFE_style);

  createRenderEffect(() => ({element: domRef.current, isSkeleton: isSkeleton()}), ({element, isSkeleton}) => {
    if (element) {
      // TODO: should RAC Link pass through inert?
      element.inert = isSkeleton;
    }
  });

  return (
    <RACLink
      {...props}
      ref={domRef}
      style={unsafeStyle()}
      className={renderProps =>
        (props.UNSAFE_className ?? '') +
        link(
          {
            ...renderProps,
            variant: props.variant ?? 'primary',
            staticColor: props.staticColor,
            isStaticColor: !!props.staticColor,
            isQuiet: props.isQuiet,
            isStandalone: props.isStandalone,
            isSkeleton: isSkeleton()
          },
          props.styles
        )
      }>
      {children()}
    </RACLink>
  );
}
