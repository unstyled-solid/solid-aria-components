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

import {SeparatorProps as AriaSeparatorProps, useSeparator} from 'react-aria/useSeparator';

import {BaseCollection, CollectionNode} from 'react-aria/private/collections/BaseCollection';
import {ContextValue, dom, DOMRenderProps, SlotProps, StyleProps, useContextProps} from './utils';
import {createLeafComponent} from 'react-aria/CollectionBuilder';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {GlobalDOMAttributes} from '@react-types/shared';
import {mergeProps} from 'react-aria/mergeProps';
import {createContext} from 'solid-js';
import type {Ref as ForwardedRef} from 'solid-js';
import {dynamic} from '@solidjs/web';

export interface SeparatorProps
  extends
    AriaSeparatorProps,
    StyleProps,
    SlotProps,
    DOMRenderProps<'hr' | 'div', undefined>,
    GlobalDOMAttributes<HTMLElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element.
   *
   * @default 'react-aria-Separator'
   */
  className?: string;
}

export const SeparatorContext = createContext<ContextValue<SeparatorProps, HTMLElement>>({});

export class SeparatorNode extends CollectionNode<any> {
  static readonly type = 'separator';

  filter(
    collection: BaseCollection<any>,
    newCollection: BaseCollection<any>
  ): CollectionNode<any> | null {
    let prevItem = newCollection.getItem(this.prevKey!);
    if (prevItem && prevItem.type !== 'separator') {
      let clone = this.clone();
      newCollection.addDescendants(clone, collection);
      return clone;
    }

    return null;
  }
}

/**
 * A separator is a visual divider between two groups of content, e.g. groups of menu items or
 * sections of a page.
 */
export const Separator = /*#__PURE__*/ createLeafComponent(
  SeparatorNode,
  function Separator(props: SeparatorProps, ref: ForwardedRef<HTMLElement>) {
    [props, ref] = useContextProps(props, ref, SeparatorContext);

    let ElementType = () => {
      let element = props.elementType || 'hr';
      return dom[(element === 'hr' && props.orientation === 'vertical' ? 'div' : element) as 'hr' | 'div'];
    };
    let {separatorProps} = useSeparator(props);

    let DOMProps = filterDOMProps(props, {global: true});

    let hostProps = mergeProps(DOMProps, separatorProps, {
      get render() { return props.render; },
      get style() { return props.style; },
      get className() { return props.className ?? 'react-aria-Separator'; },
      // useContextProps composes native refs into a callback accepting either host.
      ref: ref as (element: HTMLElement) => void,
      get slot() { return props.slot || undefined; }
    });
    let Host = dynamic(ElementType);
    return <Host {...hostProps} />;
  }
);
