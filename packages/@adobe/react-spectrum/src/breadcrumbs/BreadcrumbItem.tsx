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

import {BreadcrumbItemProps, useBreadcrumbItem} from 'react-aria/useBreadcrumbs';
import ChevronRightSmall from '@spectrum-icons/ui/ChevronRightSmall';
import {classNames} from '../utils/classNames';
import {FocusRing} from 'react-aria/FocusRing';
import {mergeProps} from 'react-aria/mergeProps';
import {dynamic, type JSX} from '@solidjs/web';
import {useObjectRef} from 'react-aria/useObjectRef';
import styles from '@adobe/spectrum-css-temp/components/breadcrumb/vars.css';
import {useHover} from 'react-aria/useHover';
import {useLocale} from 'react-aria/I18nProvider';

interface SpectrumBreadcrumbItemProps extends BreadcrumbItemProps {
  isMenu?: boolean;
}

export function BreadcrumbItem(props: SpectrumBreadcrumbItemProps): JSX.Element {
  let locale = useLocale();
  let ref = useObjectRef<HTMLElement>();
  let elementType = () => props.href ? 'a' as const : 'span' as const;
  let ElementType = dynamic(elementType);
  let {itemProps} = useBreadcrumbItem(
    mergeProps(props, {get elementType() { return elementType(); }}),
    ref
  );
  let {hoverProps, isHovered} = useHover(props);

  // If this item contains a menu button, then it shouldn't be a link.
  let empty = {};
  let effectiveItemProps = new Proxy(itemProps, {
    ownKeys: () => Reflect.ownKeys(props.isMenu ? empty : itemProps),
    has: (_, key) => key in (props.isMenu ? empty : itemProps),
    get: (_, key) => Reflect.get(props.isMenu ? empty : itemProps, key),
    getOwnPropertyDescriptor: (_, key) => key in (props.isMenu ? empty : itemProps)
      ? {enumerable: true, configurable: true, get: () => Reflect.get(itemProps, key)}
      : undefined
  });
  let hostProps = mergeProps(effectiveItemProps, hoverProps, {
    ref,
    get 'aria-disabled'() {
      let disabled = effectiveItemProps['aria-disabled'];
      return typeof disabled === 'boolean' ? String(disabled) : disabled;
    },
    get class() {
      return classNames(styles, {
        'spectrum-Breadcrumbs-itemLink': !props.isMenu,
        'is-disabled': !props.isCurrent && props.isDisabled,
        'is-hovered': isHovered()
      });
    }
  });

  return (
    <>
      <FocusRing focusRingClass={classNames(styles, 'focus-ring')}>
        {compose => <ElementType {...compose(hostProps)}>{props.children}</ElementType>}
      </FocusRing>
      <ChevronRightSmall
        UNSAFE_className={classNames(styles, 'spectrum-Breadcrumbs-itemSeparator', {
          'is-reversed': locale.direction === 'rtl'
        })}
      />
    </>
  );
}
