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

import {Collection, Key} from '@react-types/shared';
import {Layout, Rect, ReusableView, useVirtualizerState} from 'react-stately/useVirtualizerState';
import {mergeProps} from '../utils/mergeProps';
import {For, omit, untrack, type Accessor} from 'solid-js';
import type {JSX} from '@solidjs/web';
import type {Ref} from '../utils/useObjectRef';
import {ScrollView} from './ScrollView';
import {useLoadMore} from '../utils/useLoadMore';
import {useObjectRef} from '../utils/useObjectRef';
import {VirtualizerItem} from './VirtualizerItem';

type RenderWrapper<T extends object, V> = (
  parent: ReusableView<T, V> | null,
  reusableView: ReusableView<T, V>,
  children: ReusableView<T, V>[],
  renderChildren: (views: ReusableView<T, V>[]) => JSX.Element
) => JSX.Element;

interface VirtualizerProps<T extends object, O> extends Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  'children' | 'onScroll' | 'ref' | 'style'
> {
  children: (type: string, content: T | null) => JSX.Element;
  renderWrapper?: RenderWrapper<T, JSX.Element>;
  style?: JSX.CSSProperties;
  autoFocus?: boolean;
  layout: Layout<T, O>;
  collection: Collection<T>;
  persistedKeys?: Set<Key> | null;
  scrollDirection?: 'horizontal' | 'vertical' | 'both';
  isLoading?: boolean;
  onLoadMore?: () => void;
  layoutOptions?: O;
  onScroll?: (e: Event) => void;
}

export function Virtualizer<
  T extends object,
  O
>(props: VirtualizerProps<T, O> & {ref?: Ref<HTMLDivElement>}) {
  let otherProps = untrack(() => omit(props, 'children', 'renderWrapper', 'layout', 'collection', 'scrollDirection', 'isLoading', 'onLoadMore', 'persistedKeys', 'layoutOptions', 'ref', 'autoFocus'));
  let ref = useObjectRef(props.ref);

  let state = useVirtualizerState<T, JSX.Element, O>({
    get layout() {return props.layout;},
    get collection() {return props.collection;},
    renderView: (type, content) => <>{props.children(type, content)}</>,
    onVisibleRectChange(rect: Rect) {
      if (ref.current) {
        ref.current.scrollLeft = rect.x;
        ref.current.scrollTop = rect.y;
      }
    },
    get persistedKeys() {return props.persistedKeys;},
    get layoutOptions() {return props.layoutOptions;}
  });

  useLoadMore({get isLoading() {return props.isLoading;}, get onLoadMore() {return props.onLoadMore;}, scrollOffset: 1}, ref);
  let onVisibleRectChange =
    (rect: Rect) => {
      state.setVisibleRect(rect);
    };

  return (
    <ScrollView
      {...mergeProps(otherProps, {onVisibleRectChange})}
      ref={ref}
      autofocus={props.autoFocus ?? props.autofocus}
      contentSize={state.contentSize}
      onScrollStart={state.startScrolling}
      onScrollEnd={state.endScrolling}
      scrollDirection={props.scrollDirection}>
      {renderChildren(null, () => state.visibleViews, () => props.renderWrapper || defaultRenderWrapper, () => state.visibleViews)}
    </ScrollView>
  );
}

function renderChildren<T extends object, V>(
  parent: ReusableView<T, V> | null,
  views: Accessor<ReusableView<T, V>[]>,
  renderWrapper: Accessor<RenderWrapper<T, V>>,
  readProjection: () => unknown
) {
  return <For each={views()}>{view => {
    // Pooled views retain identity while their fields change. Subscribe each
    // live field read to the engine's projection without replacing row owners.
    let liveView = new Proxy(view, {
      get(target, key) {readProjection(); return Reflect.get(target, key, target);}
    });
    let childViews: ReusableView<T, V>[] = [];
    let children = new Proxy(childViews, {
      get(_target, key) {
        let current = liveView.children ? Array.from(liveView.children) : [];
        return Reflect.get(current, key, current);
      }
    });
    return renderWrapper()(parent, liveView, children, childViews =>
      renderChildren(liveView, () => childViews, renderWrapper, readProjection)
    );
  }}</For>;
}

function defaultRenderWrapper<T extends object, V extends JSX.Element>(
  parent: ReusableView<T, V> | null,
  reusableView: ReusableView<T, V>
) {
  return (
    <VirtualizerItem
      layoutInfo={reusableView.layoutInfo!}
      virtualizer={reusableView.virtualizer}
      parent={parent?.layoutInfo}>
      {reusableView.rendered}
    </VirtualizerItem>
  );
}
