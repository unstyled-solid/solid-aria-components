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
import {AriaBreadcrumbsProps, useBreadcrumbs} from 'react-aria/useBreadcrumbs';

import {AriaLabelingProps, GlobalDOMAttributes, Key} from '@react-types/shared';
import {
  ClassNameOrFunction,
  ContextValue,
  dom,
  DOMRenderProps,
  RenderProps,
  SlotProps,
  StyleProps,
  useContextProps,
  useRenderProps,
  useSlottedContext
} from './utils';
import {Collection} from 'react-aria/Collection';
import {CollectionBuilder, createLeafComponent} from 'react-aria/CollectionBuilder';
import {CollectionNode} from 'react-aria/private/collections/BaseCollection';
import {CollectionProps, CollectionRendererContext} from './Collection';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {LinkContext} from './Link';
import {mergeProps} from 'react-aria/mergeProps';
import {useObjectRef} from 'react-aria/useObjectRef';
import {mergeRefs} from 'react-aria/mergeRefs';
import {useSyncRef} from 'react-aria/private/utils/useSyncRef';
import {Node} from '@react-types/shared';
import {createContext, omit, useContext, type Ref as ForwardedRef} from 'solid-js';
import type {JSX} from '@solidjs/web';

export interface BreadcrumbsProps<T>
  extends
    Omit<CollectionProps<T>, 'disabledKeys'>,
    AriaBreadcrumbsProps,
    StyleProps,
    SlotProps,
    AriaLabelingProps,
    DOMRenderProps<'ol', undefined>,
    GlobalDOMAttributes<HTMLOListElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element.
   *
   * @default 'react-aria-Breadcrumbs'
   */
  className?: string;
  /** Whether the breadcrumbs are disabled. */
  isDisabled?: boolean;
  /** Handler that is called when a breadcrumb is clicked. */
  onAction?: (key: Key) => void;
  ref?: JSX.Ref<HTMLOListElement>;
}

export const BreadcrumbsContext =
  createContext<ContextValue<BreadcrumbsProps<any>, HTMLOListElement>>(null);

/**
 * Breadcrumbs display a hierarchy of links to the current page or resource in an application.
 */
export function Breadcrumbs<T>(originalProps: BreadcrumbsProps<T>) {
  let localRef = useObjectRef<HTMLOListElement>();
  useSyncRef({get ref() { return mergeRefs(originalProps.ref); }}, localRef);
  let [props, ref] = useContextProps(originalProps, localRef, BreadcrumbsContext);
  let {CollectionRoot} = useContext(CollectionRendererContext);
  let {navProps} = useBreadcrumbs(props);
  let DOMProps = filterDOMProps(props, {global: true, labelable: true});

  return (
    <CollectionBuilder content={<Collection {...props} />}>
      {collection => (
        <dom.ol
          render={props.render}
          {...mergeProps(DOMProps, navProps)}
          {...{ref}}
          slot={props.slot || undefined}
          style={props.style}
          className={props.className ?? 'react-aria-Breadcrumbs'}>
           <BreadcrumbsContext value={props}>
            <CollectionRoot collection={collection} />
           </BreadcrumbsContext>
        </dom.ol>
      )}
    </CollectionBuilder>
  );
}

export interface BreadcrumbRenderProps {
  /**
   * Whether the breadcrumb is for the current page.
   *
   * @selector [data-current]
   */
  isCurrent: boolean;
  /**
   * Whether the breadcrumb is disabled.
   *
   * @selector [data-disabled]
   */
  isDisabled: boolean;
}

export interface BreadcrumbProps
  extends
    RenderProps<BreadcrumbRenderProps, 'li'>,
    AriaLabelingProps,
    GlobalDOMAttributes<HTMLLIElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-Breadcrumb'
   */
  className?: ClassNameOrFunction<BreadcrumbRenderProps>;
  /**
   * A unique id for the breadcrumb, which will be passed to `onAction` when the breadcrumb is
   * pressed.
   */
  id?: Key;
}

class BreadcrumbNode extends CollectionNode<unknown> {
  static readonly type = 'item';
}

/**
 * A Breadcrumb represents an individual item in a `<Breadcrumbs>` list.
 */
export const Breadcrumb = /*#__PURE__*/ createLeafComponent(
  BreadcrumbNode,
  function Breadcrumb(
    props: BreadcrumbProps,
    ref: ForwardedRef<HTMLLIElement>,
    node: Node<unknown>
  ) {
    // Recreating useBreadcrumbItem because we want to use composition instead of having the link builtin.
    let isCurrent = () => node.nextKey == null;
    let context = useSlottedContext(BreadcrumbsContext, () => undefined)!;
    let isDisabled = () => context.isDisabled || isCurrent();
    let linkProps = {
      get 'aria-current'() { return isCurrent() ? ('page' as const) : undefined; },
      get isDisabled() { return isDisabled(); },
      onPress: () => context.onAction?.(node.key)
    };

    let renderProps = useRenderProps(mergeProps(omit(props, 'id'), {
      get children() { return node.rendered; },
      values: {get isDisabled() { return !!isDisabled(); }, get isCurrent() { return isCurrent(); }},
      defaultClassName: 'react-aria-Breadcrumb'
    }));

    let DOMProps = omit(filterDOMProps(props as any, {global: true, labelable: true}), 'id');

    return (
      <dom.li
        {...DOMProps}
        {...renderProps}
        ref={ref}
        data-disabled={isDisabled() ? 'true' : undefined}
        data-current={isCurrent() ? 'true' : undefined}>
        <LinkContext value={linkProps}>{renderProps.children}</LinkContext>
      </dom.li>
    );
  }
);
