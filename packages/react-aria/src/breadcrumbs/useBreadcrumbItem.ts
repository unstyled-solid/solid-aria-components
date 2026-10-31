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

import {AriaLinkProps, useLink} from '../link/useLink';
import {
  DOMAttributes,
  DOMProps,
  FocusableElement,
  LinkDOMProps,
  RefObject
} from '@react-types/shared';
import type {JSX} from '@solidjs/web';
import {omit} from 'solid-js';
import {mergeProps} from '../utils/mergeProps';

export interface BreadcrumbItemProps extends AriaLinkProps, LinkDOMProps {
  /** Whether the breadcrumb item represents the current page. */
  isCurrent?: boolean;
  /**
   * The type of current location the breadcrumb item represents, if `isCurrent` is true.
   *
   * @default 'page'
   */
  'aria-current'?: 'page' | 'step' | 'location' | 'date' | 'time' | boolean | 'true' | 'false';
  /** Whether the breadcrumb item is disabled. */
  isDisabled?: boolean;
  /** The contents of the breadcrumb item. */
  children: JSX.Element;
}

export interface AriaBreadcrumbItemProps extends BreadcrumbItemProps, DOMProps {
  /**
   * The HTML element used to render the breadcrumb link, e.g. 'a', or 'span'.
   *
   * @default 'a'
   */
  elementType?: string;
}

export interface BreadcrumbItemAria {
  /** Props for the breadcrumb item link element. */
  itemProps: DOMAttributes;
}

/**
 * Provides the behavior and accessibility implementation for an in a breadcrumbs component.
 * See `useBreadcrumbs` for details about breadcrumbs.
 */
export function useBreadcrumbItem(
  props: AriaBreadcrumbItemProps,
  ref?: RefObject<FocusableElement | null>
): BreadcrumbItemAria {
  let otherProps = omit(props, 'isCurrent', 'isDisabled', 'aria-current', 'elementType');
  let {linkProps} = useLink(mergeProps(otherProps, {
    get isDisabled() { return props.isDisabled || props.isCurrent; },
    get elementType() { return props.elementType ?? 'a'; }
  }), ref);
  let isHeading = () => /^h[1-6]$/.test(props.elementType ?? 'a');
  let empty = {};
  let itemProps = new Proxy({} as DOMAttributes, {
    ownKeys: () => Reflect.ownKeys(isHeading() ? empty : linkProps),
    has: (_, key) => key in (isHeading() ? empty : linkProps),
    get: (_, key) => Reflect.get(isHeading() ? empty : linkProps, key),
    getOwnPropertyDescriptor: (_, key) => key in (isHeading() ? empty : linkProps)
      ? {enumerable: true, configurable: true, get: () => Reflect.get(isHeading() ? empty : linkProps, key)} : undefined
  });

  return {
    itemProps: mergeProps({get 'aria-disabled'() { return props.isDisabled; }}, itemProps, {
      get 'aria-current'() { return props.isCurrent ? props['aria-current'] || 'page' : undefined; },
      // Restore current-item tabIndex to support autofocus, exactly as source.
      get tabIndex() { return props.isCurrent ? props.autoFocus ? -1 : undefined : itemProps.tabIndex; }
    })
  };
}
