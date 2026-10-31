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

import {LayoutInfo} from 'react-stately/useVirtualizerState';
import {layoutInfoToStyle} from 'react-aria/private/virtualizer/VirtualizerItem';
import {ListBoxContext} from './ListBoxContext';
import {Node} from '@react-types/shared';
import {useContext} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {useObjectRef} from 'react-aria/private/utils/useObjectRef';
import styles from '@adobe/spectrum-css-temp/components/menu/vars.css';
import {useListBoxSection} from 'react-aria/useListBox';
import {useLocale} from 'react-aria/I18nProvider';
import {
  useVirtualizerItem,
  VirtualizerItemOptions
} from 'react-aria/private/virtualizer/useVirtualizerItem';

interface ListBoxSectionProps<T> extends Omit<VirtualizerItemOptions, 'ref' | 'layoutInfo'> {
  layoutInfo: LayoutInfo;
  headerLayoutInfo: LayoutInfo | null;
  item: Node<T>;
  children?: JSX.Element;
}

/** @private */
export function ListBoxSection<T>(props: ListBoxSectionProps<T>): JSX.Element {
  let {headingProps, groupProps} = useListBoxSection({
    get heading() { return props.item.rendered; },
    get 'aria-label'() { return props.item['aria-label']; }
  });

  let headerRef = useObjectRef<HTMLDivElement>();
  useVirtualizerItem({
    get layoutInfo() { return props.headerLayoutInfo; },
    get virtualizer() { return props.virtualizer; },
    ref: headerRef
  });

  let locale = useLocale();
  let context = useContext(ListBoxContext)!;

  return (
    <>
      {props.headerLayoutInfo && (
        <div
          role="presentation"
          ref={headerRef}
          style={layoutInfoToStyle(props.headerLayoutInfo, locale.direction)}>
          {props.item.key !== context.state.collection.getFirstKey() && (
            <div role="presentation" class={classNames(styles, 'spectrum-Menu-divider')} />
          )}
          {props.item.rendered && (
            <div {...headingProps as JSX.HTMLAttributes<HTMLDivElement>} class={classNames(styles, 'spectrum-Menu-sectionHeading')}>
              {props.item.rendered}
            </div>
          )}
        </div>
      )}
      <div
        {...groupProps as JSX.HTMLAttributes<HTMLDivElement>}
        style={layoutInfoToStyle(props.layoutInfo, locale.direction)}
        class={classNames(styles, 'spectrum-Menu')}>
        {props.children}
      </div>
    </>
  );
}
