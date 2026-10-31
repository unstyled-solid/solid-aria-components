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
import {
  CollectionBase,
  DropTargetDelegate,
  GlobalDOMAttributes,
  ItemDropTarget,
  Key,
  LayoutDelegate,
  RefObject
} from '@react-types/shared';
import {createBranchComponent} from 'react-aria/CollectionBuilder';
import {
  Collection as ICollection,
  Node,
  SelectionBehavior,
  SelectionMode,
  SectionProps as SharedSectionProps
} from '@react-types/shared';

import {createContext, createMemo, For, merge, untrack, useContext, type Accessor, type Component, type Ref as ForwardedRef, type Element as ReactElement, type Element as ReactNode} from 'solid-js';
import type {JSX} from '@solidjs/web';
type HTMLAttributes<T extends HTMLElement> = JSX.HTMLAttributes<T>;

import {StyleProps} from './utils';

export interface CollectionProps<T> extends Omit<CollectionBase<T>, 'children'> {
  /** The contents of the collection. */
  children?: ReactNode | ((item: T) => ReactNode);
  /** Values that should invalidate the item cache when using dynamic collections. */
  dependencies?: ReadonlyArray<any>;
}

export interface ItemRenderProps {
  /**
   * Whether the item is currently hovered with a mouse.
   *
   * @selector [data-hovered]
   */
  isHovered: boolean;
  /**
   * Whether the item is currently in a pressed state.
   *
   * @selector [data-pressed]
   */
  isPressed: boolean;
  /**
   * Whether the item is currently selected.
   *
   * @selector [data-selected]
   */
  isSelected: boolean;
  /**
   * Whether the item is currently focused.
   *
   * @selector [data-focused]
   */
  isFocused: boolean;
  /**
   * Whether the item is currently keyboard focused.
   *
   * @selector [data-focus-visible]
   */
  isFocusVisible: boolean;
  /**
   * Whether the item is non-interactive, i.e. both selection and actions are disabled and the item
   * may not be focused. Dependent on `disabledKeys` and `disabledBehavior`.
   *
   * @selector [data-disabled]
   */
  isDisabled: boolean;
  /**
   * The type of selection that is allowed in the collection.
   *
   * @selector [data-selection-mode="single | multiple"]
   */
  selectionMode: SelectionMode;
  /** The selection behavior for the collection. */
  selectionBehavior: SelectionBehavior;
  /**
   * Whether the item allows dragging.
   *
   * @note This property is only available in collection components that support drag and drop.
   * @selector [data-allows-dragging]
   */
  allowsDragging?: boolean;
  /**
   * Whether the item is currently being dragged.
   *
   * @note This property is only available in collection components that support drag and drop.
   * @selector [data-dragging]
   */
  isDragging?: boolean;
  /**
   * Whether the item is currently an active drop target.
   *
   * @note This property is only available in collection components that support drag and drop.
   * @selector [data-drop-target]
   */
  isDropTarget?: boolean;
}

export interface SectionProps<T>
  extends
    Omit<SharedSectionProps<T>, 'children' | 'title'>,
    StyleProps,
    GlobalDOMAttributes<HTMLElement> {
  /** The unique id of the section. */
  id?: Key;
  /**
   * The object value that this section represents. When using dynamic collections, this is set
   * automatically.
   */
  value?: T;
  /** Static child items or a function to render children. */
  children?: ReactNode | ((item: T) => ReactElement);
  /** Values that should invalidate the item cache when using dynamic collections. */
  dependencies?: ReadonlyArray<any>;
}

interface SectionContextValue {
  name: string;
  render: (
    props: SectionProps<any>,
    ref: ForwardedRef<HTMLElement>,
    section: Node<any>,
    className?: string
  ) => ReactElement;
}

export const SectionContext = createContext<SectionContextValue | null>(null);

/** @deprecated */
export const Section = /*#__PURE__*/ createBranchComponent(
  'section',
  <T extends any>(
    props: SectionProps<T>,
    ref: ForwardedRef<HTMLElement>,
    section: Node<T>
  ): JSX.Element => {
    let {name, render} = useContext(SectionContext)!;
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`<Section> is deprecated. Please use <${name}> instead.`);
    }
    return render(props, ref, section, 'react-aria-Section');
  }
);

export interface CollectionBranchProps {
  /** The collection of items to render. */
  collection: ICollection<Node<unknown>>;
  /** The parent node of the items to render. */
  parent: Node<unknown>;
  /** A function that renders a drop indicator between items. */
  renderDropIndicator?: (target: ItemDropTarget) => ReactNode;
}

export interface CollectionRootProps extends HTMLAttributes<HTMLElement> {
  /** The collection of items to render. */
  collection: ICollection<Node<unknown>>;
  /** A set of keys for items that should always be persisted in the DOM. */
  persistedKeys?: Set<Key> | null;
  /** A ref to the scroll container for the collection. */
  scrollRef?: RefObject<HTMLElement | null>;
  /** A function that renders a drop indicator between items. */
  renderDropIndicator?: (target: ItemDropTarget) => ReactNode;
}

export interface CollectionRenderer {
  /** Whether this is a virtualized collection. */
  isVirtualized?: boolean;
  /** A delegate object that provides layout information for items in the collection. */
  layoutDelegate?: LayoutDelegate;
  /** A delegate object that provides drop targets for pointer coordinates within the collection. */
  dropTargetDelegate?: DropTargetDelegate;
  /** A component that renders the root collection items. */
  CollectionRoot: Component<CollectionRootProps>;
  /** A component that renders the child collection items. */
  CollectionBranch: Component<CollectionBranchProps>;
}

export const DefaultCollectionRenderer: CollectionRenderer = {
  CollectionRoot(props) {
    return useCollectionRender(() => props.collection, () => null, () => props.renderDropIndicator);
  },
  CollectionBranch(props) {
    return useCollectionRender(() => props.collection, () => props.parent, () => props.renderDropIndicator);
  }
};

function useCollectionRender(
  collection: Accessor<ICollection<Node<unknown>>>,
  parent: Accessor<Node<unknown> | null>,
  dropIndicator: Accessor<((target: ItemDropTarget) => ReactNode) | undefined>
) {
  let nodes = () => {
    let node = parent();
    return Array.from(node ? collection().getChildren!(node.key) : collection());
  };
  return <For each={nodes()} keyed={node => JSON.stringify([node.type, node.key])}>
    {current => {
      // These two fields define this owner's lifetime; other fields stay live.
      let identity = untrack(() => ({key: current().key, type: current().type}));
      let node = merge(current, identity);
      // Return a empty fragment since we don't want to render the content twice
      // If we don't skip the content node here, we end up rendering them twice in a Tree since we also render the content node in TreeItem
      if (untrack(() => node.type) === 'content') {
        return <></>;
      }

      // Type is part of this row's key. Select its construction callback once;
      // all changing node fields are delivered through the live node view.
      let render = untrack(() => node.render);
      let rendered = render!(node);
      return (
        <>
          <For each={node.type === 'item' && dropIndicator()
            ? [{type: 'item' as const, key: node.key, dropPosition: 'before' as const}]
            : []} keyed={target => JSON.stringify([target.key, target.dropPosition])}>
            {target => {
              let renderIndicator = untrack(dropIndicator)!;
              return renderIndicator(merge(target, {type: 'item' as const}));
            }}
          </For>
          {rendered}
          <For each={node.type === 'item' && dropIndicator()
            ? getAfterDropIndicatorTargets(collection(), node)
            : []} keyed={target => JSON.stringify([target.key, target.dropPosition])}>
            {target => {
              let renderIndicator = untrack(dropIndicator)!;
              return renderIndicator(merge(target, {type: 'item' as const}));
            }}
          </For>
        </>
      );
    }}
  </For>;
}

export function renderAfterDropIndicators(
  collection: ICollection<Node<unknown>>,
  node: Node<unknown>,
  renderDropIndicator: (target: ItemDropTarget) => ReactNode
): ReactNode {
  return getAfterDropIndicatorTargets(collection, node).map(target => renderDropIndicator(target))
    .filter(indicator => indicator != null && typeof indicator !== 'boolean');
}

function getAfterDropIndicatorTargets(
  collection: ICollection<Node<unknown>>,
  node: Node<unknown>
): ItemDropTarget[] {
  let key = node.key;
  let keyAfter = collection.getKeyAfter(key);
  let nextItemInFlattenedCollection = keyAfter != null ? collection.getItem(keyAfter) : null;
  while (nextItemInFlattenedCollection != null && nextItemInFlattenedCollection.type !== 'item') {
    keyAfter = collection.getKeyAfter(nextItemInFlattenedCollection.key);
    nextItemInFlattenedCollection = keyAfter != null ? collection.getItem(keyAfter) : null;
  }

  let nextItemInSameLevel = node.nextKey != null ? collection.getItem(node.nextKey) : null;
  while (nextItemInSameLevel != null && nextItemInSameLevel.type !== 'item') {
    nextItemInSameLevel =
      nextItemInSameLevel.nextKey != null ? collection.getItem(nextItemInSameLevel.nextKey) : null;
  }

  // Render one or more "after" drop indicators when the next item in the flattened collection
  // has a smaller level, is not an item, or there are no more items in the collection.
  // Otherwise, the "after" position is equivalent to the next item's "before" position.
  let afterIndicators: ItemDropTarget[] = [];
  if (nextItemInSameLevel == null) {
    let current: Node<unknown> | null = node;
    while (
      current?.type === 'item' &&
      (!nextItemInFlattenedCollection ||
        (current.parentKey !== nextItemInFlattenedCollection.parentKey &&
          nextItemInFlattenedCollection.level < current.level))
    ) {
      afterIndicators.push({
        type: 'item',
        key: current.key,
        dropPosition: 'after'
      });
      current = current.parentKey != null ? collection.getItem(current.parentKey) : null;
    }
  }

  return afterIndicators;
}

export const CollectionRendererContext =
  createContext<CollectionRenderer>(DefaultCollectionRenderer);

type PersistedKeysReturnValue = Set<Key> | null;
export function usePersistedKeys(focusedKey: Key | null | Accessor<Key | null>): Accessor<PersistedKeysReturnValue> {
  return createMemo(() => {
    let key = typeof focusedKey === 'function' ? focusedKey() : focusedKey;
    return key != null ? new Set([key]) : null;
  });
}
