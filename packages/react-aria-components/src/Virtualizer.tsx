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

import {
  CollectionBranchProps,
  CollectionRenderer,
  CollectionRendererContext,
  CollectionRootProps,
  renderAfterDropIndicators
} from './Collection';
import {DropTargetDelegate, ItemDropTarget, Node} from '@react-types/shared';
import {
  Layout,
  ReusableView,
  useVirtualizerState,
  VirtualizerState
} from 'react-stately/useVirtualizerState';
import {createContext, createMemo, For, merge, untrack, useContext, type Accessor, type Element as ReactNode} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {useScrollView} from 'react-aria/private/virtualizer/ScrollView';
import {VirtualizerItem} from 'react-aria/private/virtualizer/VirtualizerItem';

type RenderedView = ReactNode | ((current: Node<unknown>) => ReactNode);
type View = ReusableView<Node<unknown>, RenderedView>;

export interface LayoutOptionsDelegate<O> {
  useLayoutOptions?(): O;
}

interface ILayout<O>
  extends Layout<Node<unknown>, O>, Partial<DropTargetDelegate>, LayoutOptionsDelegate<O> {}

interface LayoutClass<O> {
  new (): ILayout<O>;
}

export interface VirtualizerProps<O> {
  /** The child collection to virtualize (e.g. ListBox, GridList, or Table). */
  children: ReactNode;
  /** The layout object that determines the position and size of the visible elements. */
  layout: LayoutClass<O> | ILayout<O>;
  /** Options for the layout. */
  layoutOptions?: O;
  /**
   * Whether to observe each item's size with a ResizeObserver and re-measure when it changes.
   */
  shouldObserveItemSize?: boolean;
}

interface VirtualizerOptionsContextValue {
  layout: ILayout<any>;
  layoutOptions?: any;
  shouldObserveItemSize?: boolean;
}

const VirtualizerContext = createContext<VirtualizerState<any, any> | null>(null);
const VirtualizerOptionsContext = createContext<VirtualizerOptionsContextValue | null>(null);

/**
 * A Virtualizer renders a scrollable collection of data using customizable layouts.
 * It supports very large collections by only rendering visible items to the DOM, reusing
 * them as the user scrolls.
 */
export function Virtualizer<O>(props: VirtualizerProps<O>): JSX.Element {
  let layout = createMemo(() => typeof props.layout === 'function' ? new props.layout() : props.layout);
  let renderer: CollectionRenderer = {
      isVirtualized: true,
      get layoutDelegate() { return layout(); },
      get dropTargetDelegate() { return layout().getDropTargetFromPoint ? layout() as DropTargetDelegate : undefined; },
      CollectionRoot,
      CollectionBranch
  };
  let options = {
    get layout() { return layout(); },
    get layoutOptions() { return props.layoutOptions; },
    get shouldObserveItemSize() { return props.shouldObserveItemSize; }
  };

  return (
    <CollectionRendererContext value={renderer}>
      <VirtualizerOptionsContext value={options}>
        {props.children}
      </VirtualizerOptionsContext>
    </CollectionRendererContext>
  );
}

function CollectionRoot(props: CollectionRootProps) {
  let options = useContext(VirtualizerOptionsContext)!;
  // oxlint-disable-next-line react/react-compiler
  let layoutOptions2 = createMemo(() => options.layout.useLayoutOptions?.());
  let layoutOptions = createMemo(() => {
    let first = options.layoutOptions;
    let second = layoutOptions2();
    return first && second ? {...first, ...second} : first || second;
  });
  let state = useVirtualizerState({
    allowsWindowScrolling: true,
    get layout() { return options.layout; },
    get collection() { return props.collection; },
    renderView: (type, item) => {
      // The engine caches content outside DOM rendering. Native collection JSX
      // must instantiate only when a reusable row consumes it under its owner.
      return (current: Node<unknown> = item!) => untrack(() => current?.render)?.(current);
    },
    onVisibleRectChange(rect) {
      let element = props.scrollRef?.current;
      if (element) {
        // oxlint-disable-next-line react/react-compiler
        element.scrollLeft = rect.x;
        element.scrollTop = rect.y;
      }
    },
    get persistedKeys() { return props.persistedKeys; },
    get layoutOptions() { return layoutOptions(); }
  });

  let {contentProps} = useScrollView(
    {
      onVisibleRectChange: state.setVisibleRect,
      onSizeChange: state.setSize,
      get contentSize() { return state.contentSize; },
      onScrollStart: state.startScrolling,
      onScrollEnd: state.endScrolling,
      allowsWindowScrolling: true
    },
    props.scrollRef!
  );

  return (
    <div {...contentProps}>
      <VirtualizerContext value={state}>
        {renderChildren(() => null, () => state.visibleViews, () => props.renderDropIndicator, () => options.shouldObserveItemSize)}
      </VirtualizerContext>
    </div>
  );
}

function CollectionBranch(props: CollectionBranchProps) {
  let virtualizer = useContext(VirtualizerContext);
  let parentView = () => {
    // The engine mutates pooled views without necessarily changing identity.
    // Subscribe before reading the parent and its layout/children fields.
    virtualizer!.visibleViews;
    return virtualizer!.virtualizer.getVisibleView(props.parent.key)!;
  };
  let options = useContext(VirtualizerOptionsContext)!;
  return renderChildren(
    parentView,
    () => {
      virtualizer!.visibleViews;
      return Array.from(parentView().children);
    },
    () => props.renderDropIndicator,
    () => options.shouldObserveItemSize
  );
}

function renderChildren(
  parent: Accessor<View | null>,
  children: Accessor<View[]>,
  renderDropIndicator: Accessor<((target: ItemDropTarget) => ReactNode) | undefined>,
  shouldObserveItemSize: Accessor<boolean | undefined>
) {
  return <For each={children()} keyed={view => view.key}>{view =>
    renderWrapper(parent, () => {
      // Engine views are pooled/mutable. Subscribe to their published render
      // projection without replacing a keyed row's native owner.
      children();
      return view();
    }, renderDropIndicator, shouldObserveItemSize)
  }</For>;
}

function renderWrapper(
  parent: Accessor<View | null>,
  reusableView: Accessor<View>,
  renderDropIndicator: Accessor<((target: ItemDropTarget) => ReactNode) | undefined>,
  shouldObserveItemSize: Accessor<boolean | undefined>
): ReactNode {
  let rendered = (
    <VirtualizerItem
      layoutInfo={reusableView().layoutInfo!}
      virtualizer={reusableView().virtualizer}
      parent={parent()?.layoutInfo}
      shouldObserveItemSize={shouldObserveItemSize()}>
      <For each={reusableView().content ? [reusableView().content!] : []} keyed={node => JSON.stringify([node.type, node.key])}>
        {current => {
          // A pool view may publish new data for the same item or be reassigned.
          // Item setup survives the former and is disposed for the latter.
          let identity = untrack(() => ({key: current().key, type: current().type}));
          let node = merge(current, identity);
          let render = untrack(() => reusableView().rendered);
          return typeof render === 'function' ? render(node) : render;
        }}
      </For>
    </VirtualizerItem>
  );

  return <>{reusableView().content?.type === 'item' && renderDropIndicator() && reusableView().virtualizer.layout.getDropTargetLayoutInfo ? (
      <>
        {renderDropIndicatorWrapper(
          parent,
          reusableView,
           {type: 'item', key: reusableView().content!.key, dropPosition: 'before'},
           renderDropIndicator()!
        )}
        {rendered}
        {renderAfterDropIndicators(reusableView().virtualizer.collection, reusableView().content!, target =>
          renderDropIndicatorWrapper(parent, reusableView, target, renderDropIndicator()!)
        )}
      </>
    ) : rendered}</>;
}

function renderDropIndicatorWrapper(
  parent: Accessor<View | null>,
  reusableView: Accessor<View>,
  target: ItemDropTarget,
  renderDropIndicator: (target: ItemDropTarget) => ReactNode
) {
  let indicator = renderDropIndicator(target);
  if (indicator) {
    let layoutInfo = () => reusableView().virtualizer.layout.getDropTargetLayoutInfo!(target);
    let child = indicator;
    return (
      <VirtualizerItem
        layoutInfo={layoutInfo()}
        virtualizer={reusableView().virtualizer}
        parent={parent()?.layoutInfo}>
        {child}
      </VirtualizerItem>
    );
  }

  return indicator;
}
