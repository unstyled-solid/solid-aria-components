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

import {AriaTreeItemOptions, useTreeItem} from 'react-aria/useTree';

import {AriaTreeProps, useTree} from 'react-aria/useTree';
import {
  BaseCollection,
  CollectionNode,
  LoaderNode,
  SectionNode
} from 'react-aria/private/collections/BaseCollection';
import {ButtonContext} from './Button';
import {CheckboxContext, CheckboxFieldContext} from './Checkbox';
import {
  ChildrenOrFunction,
  ClassNameOrFunction,
  ContextValue,
  DEFAULT_SLOT,
  dom,
  DOMRenderProps,
  Provider,
  RenderProps,
  SlotProps,
  StyleRenderProps,
  useContextProps,
  useRenderProps
} from './utils';
import {Collection} from 'react-aria/Collection';
import {
  CollectionBuilder,
  createBranchComponent,
  createLeafComponent
} from 'react-aria/CollectionBuilder';
import {
  CollectionProps,
  CollectionRendererContext,
  DefaultCollectionRenderer,
  ItemRenderProps,
  SectionProps
} from './Collection';
import {
  DisabledBehavior,
  DragPreviewRenderer,
  Expandable,
  GlobalDOMAttributes,
  HoverEvents,
  Key,
  LinkDOMProps,
  MultipleSelection,
  PressEvents,
  RefObject,
  SelectionMode
} from '@react-types/shared';
import {
  DragAndDropContext,
  DropIndicatorContext,
  useDndPersistedKeys,
  useRenderDropIndicator
} from './DragAndDrop';
import {DragAndDropHooks} from './useDragAndDrop';
import {DraggableCollectionState} from 'react-stately/useDraggableCollectionState';
import {DraggableItemResult} from 'react-aria/useDraggableCollection';
import {
  DropIndicatorAria,
  DropIndicatorProps,
  DroppableCollectionResult
} from 'react-aria/useDroppableCollection';
import {DroppableCollectionState} from 'react-stately/useDroppableCollectionState';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {FocusScope} from 'react-aria/FocusScope';
import {
  GridListHeader,
  GridListHeaderContext,
  GridListHeaderInnerContext,
  GridListHeaderProps
} from './GridList';
import {inertValue} from 'react-aria/private/utils/inertValue';
import {ListKeyboardDelegate} from 'react-aria/ListKeyboardDelegate';
import {
  LoadMoreSentinelProps,
  useLoadMoreSentinel
} from 'react-aria/private/utils/useLoadMoreSentinel';
import {mergeProps} from 'react-aria/mergeProps';
import {Node, SelectionBehavior} from '@react-types/shared';
import {createContext, createEffect, createMemo, merge, omit, onSettled, untrack, useContext, type Ref as ForwardedRef, type Element as ReactNode} from 'solid-js';
import {readLiveView} from 'react-stately/private/collections/useCollection';
import type {JSX} from '@solidjs/web';
import {dynamic} from '@solidjs/web';
import type {Ref as NativeRef} from 'react-aria/private/utils/useObjectRef';
import {SelectionIndicatorContext} from './SelectionIndicator';
import {SharedElementTransition} from './SharedElementTransition';
import {TreeDropTargetDelegate} from './TreeDropTargetDelegate';
import {TreeState, useTreeState} from 'react-stately/useTreeState';
import {useCachedChildren} from 'react-aria/private/collections/useCachedChildren';
import {useCollator} from 'react-aria/useCollator';
import {useControlledState} from 'react-stately/useControlledState';
import {useFocusRing} from 'react-aria/useFocusRing';
import {useGridListSection, useGridListSelectionCheckbox} from 'react-aria/useGridList';
import {useHover} from 'react-aria/useHover';
import {useId} from 'react-aria/useId';
import {useLocale} from 'react-aria/I18nProvider';
import {useObjectRef} from 'react-aria/useObjectRef';
import {useVisuallyHidden} from 'react-aria/VisuallyHidden';

class TreeCollection<T> extends BaseCollection<T> {
  private expandedKeys: Set<Key> = new Set();

  withExpandedKeys(lastExpandedKeys: Set<Key>, expandedKeys: Set<Key>) {
    let collection = this.clone();
    collection.expandedKeys = expandedKeys;

    // Clone ancestor section nodes so React knows to re-render since the same item won't cause a new render but a clone creating a new object with the same value will
    // Without this change, the items won't expand and collapse when virtualized inside a section
    TreeCollection.cloneAncestorSections(expandedKeys, lastExpandedKeys, collection);
    TreeCollection.cloneAncestorSections(lastExpandedKeys, expandedKeys, collection);

    collection.frozen = this.frozen;
    return collection;
  }

  // diff lastExpandedKeys and expandedKeys so we only clone what has changed
  private static cloneAncestorSections<T>(
    keys: Iterable<Key>,
    excludeSet: Set<Key>,
    collection: TreeCollection<T>
  ) {
    for (let key of keys) {
      if (!excludeSet.has(key)) {
        let currentKey: Key | null = key;
        while (currentKey != null) {
          let item = collection.getItem(currentKey) as CollectionNode<T>;
          if (item?.type === 'section') {
            collection.keyMap.set(currentKey, item.clone());
            break;
          } else {
            currentKey = item?.parentKey ?? null;
          }
        }
      }
    }
  }

  *[Symbol.iterator]() {
    let firstKey = this.getFirstKey();
    let node: Node<T> | null = firstKey != null ? this.getItem(firstKey) : null;

    while (node) {
      yield node as Node<T>;
      if (node.type === 'section') {
        node = node.nextKey != null ? this.getItem(node.nextKey) : null;
      } else {
        // This will include both item and content nodes
        // We handle the content nodes in useCollectionRenderer and ListLayout
        let key = this.getKeyAfter(node.key);
        node = key != null ? this.getItem(key) : null;
      }
    }
  }

  getLastKey() {
    // Find the deepest expanded child. We don't use collection.getLastKey() here
    // because that will return the deepest child regardless of expandedKeys.
    // Instead, start from the last top-level key and walk down.
    let key = this.lastKey;
    if (key == null) {
      return null;
    }

    let node = this.getItem(key) as CollectionNode<T>;

    while (
      node?.lastChildKey != null &&
      (node.type !== 'item' || this.expandedKeys.has(node.key))
    ) {
      node = this.getItem(node.lastChildKey) as CollectionNode<T>;
    }

    return node?.key;
  }

  getKeyAfter(key: Key) {
    let node = this.getItem(key) as CollectionNode<T>;
    if (!node) {
      return null;
    }

    if ((this.expandedKeys.has(node.key) || node.type !== 'item') && node.firstChildKey != null) {
      return node.firstChildKey;
    }

    while (node) {
      if (node.nextKey != null) {
        return node.nextKey;
      }

      if (node.parentKey != null) {
        node = this.getItem(node.parentKey) as CollectionNode<T>;
      } else {
        return null;
      }
    }

    return null;
  }

  getKeyBefore(key: Key) {
    let node = this.getItem(key) as CollectionNode<T>;
    if (!node) {
      return null;
    }

    if (node.prevKey != null) {
      node = this.getItem(node.prevKey) as CollectionNode<T>;

      // If the lastChildKey is expanded, check its lastChildKey
      while (
        node &&
        (node.type !== 'item' || this.expandedKeys.has(node.key)) &&
        node.lastChildKey != null
      ) {
        node = this.getItem(node.lastChildKey) as CollectionNode<T>;
      }

      return node?.key ?? null;
    }

    return node.parentKey;
  }

  getChildren(key: Key): Iterable<Node<T>> {
    let self = this;
    return {
      *[Symbol.iterator]() {
        let parent = self.getItem(key) as CollectionNode<T> | null;
        let node =
          parent?.firstChildKey != null
            ? (self.getItem(parent.firstChildKey) as CollectionNode<T>)
            : null;
        if (parent && parent.type === 'section' && node) {
          // Stop once either the node is null or the node is the parent's sibling
          while (node && node.key !== parent.nextKey) {
            yield self.getItem(node.key)!;
            // This will include content nodes which we skip in ListLayout
            let key = self.getKeyAfter(node.key);
            node = key != null ? (self.getItem(key)! as CollectionNode<T>) : null;
          }
        } else {
          while (node) {
            yield node as Node<T>;
            node = node.nextKey != null ? (self.getItem(node.nextKey)! as CollectionNode<T>) : null;
          }
        }
      }
    };
  }

  getTextValue(key: Key): string {
    let item = this.getItem(key);
    return item ? item.textValue : '';
  }
}

export interface TreeRenderProps {
  /**
   * Whether the tree has no items and should display its empty state.
   *
   * @selector [data-empty]
   */
  isEmpty: boolean;
  /**
   * Whether the tree is currently focused.
   *
   * @selector [data-focused]
   */
  isFocused: boolean;
  /**
   * Whether the tree is currently keyboard focused.
   *
   * @selector [data-focus-visible]
   */
  isFocusVisible: boolean;
  /**
   * The type of selection that is allowed in the collection.
   *
   * @selector [data-selection-mode="single | multiple"]
   */
  selectionMode: SelectionMode;
  /**
   * Whether the tree allows dragging.
   *
   * @selector [data-allows-dragging]
   */
  allowsDragging: boolean;
  /**
   * Whether the tree is currently the active drop target.
   *
   * @selector [data-drop-target]
   */
  isDropTarget: boolean;
  /**
   * State of the tree.
   */
  state: TreeState<unknown>;
}

export interface TreeEmptyStateRenderProps extends Omit<TreeRenderProps, 'isEmpty'> {}

export interface TreeProps<T>
  extends
    Omit<AriaTreeProps<T>, 'children'>,
    MultipleSelection,
    CollectionProps<T>,
    StyleRenderProps<TreeRenderProps>,
    SlotProps,
    Expandable,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-Tree'
   */
  className?: ClassNameOrFunction<TreeRenderProps>;
  /**
   * How multiple selection should behave in the tree.
   *
   * @default 'toggle'
   */
  selectionBehavior?: SelectionBehavior;
  /** Provides content to display when there are no items in the list. */
  renderEmptyState?: (props: TreeEmptyStateRenderProps) => ReactNode;
  /**
   * Whether `disabledKeys` applies to all interactions, or only selection.
   *
   * @default 'all'
   */
  disabledBehavior?: DisabledBehavior;
  /**
   * The drag and drop hooks returned by `useDragAndDrop` used to enable drag and drop behavior for
   * the Tree.
   */
  dragAndDropHooks?: DragAndDropHooks<NoInfer<T>>;
  ref?: ForwardedRef<HTMLDivElement>;
}

export const TreeContext = createContext<ContextValue<TreeProps<any>, HTMLDivElement>>(null);
export const TreeStateContext = createContext<TreeState<any> | null>(null);

/**
 * A tree provides users with a way to navigate nested hierarchical information, with support for
 * keyboard navigation and selection.
 */
export function Tree<T>(input: TreeProps<T>) {
  // Render the portal first so that we have the collection by the time we render the DOM in SSR.
  let [props, mergedRef] = useContextProps(input, untrack(() => input.ref), TreeContext);
  let ref = useObjectRef<HTMLDivElement>(mergedRef as NativeRef<HTMLDivElement>);

  return (
    <CollectionBuilder
      content={<Collection {...props} />}
      createCollection={() => new TreeCollection<T>()}>
      {collection => <TreeInner props={props} collection={collection} treeRef={ref} />}
    </CollectionBuilder>
  );
}

const EXPANSION_KEYS = {
  expand: {
    ltr: 'ArrowRight',
    rtl: 'ArrowLeft'
  },
  collapse: {
    ltr: 'ArrowLeft',
    rtl: 'ArrowRight'
  }
};

interface TreeInnerProps<T> {
  props: TreeProps<T>;
  collection: TreeCollection<T>;
  treeRef: ForwardedRef<HTMLDivElement>;
}

function TreeInner<T>(input: TreeInnerProps<T>) {
  let props = input.props;
  let ref = useObjectRef<HTMLDivElement>(untrack(() => input.treeRef) as NativeRef<HTMLDivElement>);
  const dragAndDropHooks = untrack(() => props.dragAndDropHooks);
  let locale = useLocale();
  let collator = useCollator({usage: 'search', sensitivity: 'base'});
  let hasDragHooks = !!dragAndDropHooks?.useDraggableCollectionState;
  let hasDropHooks = !!dragAndDropHooks?.useDroppableCollectionState;
  let dragHooksProvided = {current: hasDragHooks};
  let dropHooksProvided = {current: hasDropHooks};

  createEffect(() => ({drag: !!props.dragAndDropHooks?.useDraggableCollectionState, drop: !!props.dragAndDropHooks?.useDroppableCollectionState}), ({drag, drop}) => {
    if (dragHooksProvided.current !== drag) {
      console.warn(
        'Drag hooks were provided during one render, but not another. This should be avoided as it may produce unexpected behavior.'
      );
    }
    if (dropHooksProvided.current !== drop) {
      console.warn(
        'Drop hooks were provided during one render, but not another. This should be avoided as it may produce unexpected behavior.'
      );
    }
  });
  let collectionRenderer = useContext(CollectionRendererContext);
  let CollectionRoot = dynamic(() => collectionRenderer.CollectionRoot);

  // Kinda annoying that we have to replicate this code here as well as in useTreeState, but don't want to add
  // flattenCollection stuff to useTreeState. Think about this later
  let [expandedKeys, setExpandedKeys] = useControlledState<Set<Key>>(
    () => props.expandedKeys ? new Set(props.expandedKeys) : undefined,
    untrack(() => props.defaultExpandedKeys ? new Set(props.defaultExpandedKeys) : new Set<Key>()),
    keys => props.onExpandedChange?.(keys)
  );

  // Source transition history preserves ancestor clones and collection identity.
  let projection = createMemo<{collection: TreeCollection<T>; keys: Set<Key>; flattened: TreeCollection<T>}>((previous) => {
    let collection = readLiveView(input.collection);
    let keys = expandedKeys();
    if (previous && collection === previous.collection && areSetsEqual(previous.keys, keys)) {
      return previous;
    }
    return {collection, keys, flattened: collection.withExpandedKeys(previous?.keys ?? keys, keys)};
  });

  let state = useTreeState(merge(() => omit(props, 'children'), {
    get selectionMode() {return props.selectionMode ?? 'none';},
    get expandedKeys() {return expandedKeys();},
    onExpandedChange: setExpandedKeys,
    get collection() {return projection().flattened;},
    children: undefined,
    get disabledBehavior() {return props.disabledBehavior ?? 'all';}
  }));

  let {gridProps} = useTree(
    merge(() => props, {
      get isVirtualized() {return collectionRenderer.isVirtualized;},
      get layoutDelegate() {return collectionRenderer.layoutDelegate;}
    }),
    state,
    ref
  );

  let dragState: DraggableCollectionState | undefined = undefined;
  let dropState: DroppableCollectionState | undefined = undefined;
  let droppableCollection: DroppableCollectionResult | undefined = undefined;
  let isRootDropTarget = () => false;
  let dragPreview: () => JSX.Element | null = () => null;
  let preview = useObjectRef<DragPreviewRenderer>();

  if (hasDragHooks && dragAndDropHooks) {
    // oxlint-disable-next-line react/react-compiler
    dragState = dragAndDropHooks.useDraggableCollectionState!({
      get collection() {return state.collection;},
      selectionManager: state.selectionManager,
      preview: dragAndDropHooks.renderDragPreview ? preview : undefined
    });
    // oxlint-disable-next-line react/react-compiler
    dragAndDropHooks.useDraggableCollection!({}, dragState, ref);

    let DragPreview = dragAndDropHooks.DragPreview!;
    dragPreview = () => dragAndDropHooks.renderDragPreview ? (
      <DragPreview ref={preview}>{dragAndDropHooks.renderDragPreview}</DragPreview>
    ) : null;
  }

  let treeDropTargetDelegate = new TreeDropTargetDelegate();
  if (hasDropHooks && dragAndDropHooks) {
    // oxlint-disable-next-line react/react-compiler
    dropState = dragAndDropHooks.useDroppableCollectionState!({
      get collection() {return state.collection;},
      selectionManager: state.selectionManager
    });
    let preparedDropTargetDelegate = createMemo(() => {
      let dropTargetDelegate =
      dragAndDropHooks.dropTargetDelegate ||
       collectionRenderer.dropTargetDelegate ||
      new dragAndDropHooks.ListDropTargetDelegate(state.collection, ref, {direction: locale.direction});
      treeDropTargetDelegate.setup(dropTargetDelegate, state, locale.direction);
      return treeDropTargetDelegate;
    });

    let keyboardDelegate = createMemo(() => new ListKeyboardDelegate({
      collection: state.collection,
      collator,
      ref,
      disabledKeys: state.selectionManager.disabledKeys,
      disabledBehavior: state.selectionManager.disabledBehavior,
      direction: locale.direction,
      layoutDelegate: collectionRenderer.layoutDelegate
    }));

    // oxlint-disable-next-line react/react-compiler
    droppableCollection = dragAndDropHooks.useDroppableCollection!(
      {
        get keyboardDelegate() {return keyboardDelegate();},
        get dropTargetDelegate() {return preparedDropTargetDelegate();},
        onDropActivate: e => {
          // Expand collapsed item when dragging over. For keyboard, allow collapsing.
          if (e.target.type === 'item') {
            let key = e.target.key;
            let item = state.collection.getItem(key);
            let isExpanded = expandedKeys().has(key);
            if (
              item &&
              item.hasChildNodes &&
              (!isExpanded || dragAndDropHooks?.isVirtualDragging?.())
            ) {
              state.toggleKey(key);
            }
          }
        },
        onKeyDown: e => {
          let target = dropState?.target;
          if (target && target.type === 'item' && target.dropPosition === 'on') {
            let item = state.collection.getItem(target.key);
            if (
              e.key === EXPANSION_KEYS['expand'][locale.direction] &&
              item?.hasChildNodes &&
              !state.expandedKeys.has(target.key)
            ) {
              state.toggleKey(target.key);
            } else if (
              e.key === EXPANSION_KEYS['collapse'][locale.direction] &&
              item?.hasChildNodes &&
              state.expandedKeys.has(target.key)
            ) {
              state.toggleKey(target.key);
            }
          }
        }
      },
      dropState,
      ref
    );

    isRootDropTarget = () => dropState!.isDropTarget({type: 'root'});
  }

  let isTreeDraggable = () => !!(hasDragHooks && !dragState?.isDisabled);

  let {focusProps, isFocused, isFocusVisible} = useFocusRing();
  let renderValues = {
    get isEmpty() {return state.collection.size === 0;},
    get isFocused() {return isFocused();},
    get isFocusVisible() {return isFocusVisible();},
    get isDropTarget() {return isRootDropTarget();},
    get selectionMode() {return state.selectionManager.selectionMode;},
    get allowsDragging() {return isTreeDraggable();},
    state
  };

  let renderProps = useRenderProps(merge(omit(props, 'children'), {
    children: undefined,
    defaultClassName: 'react-aria-Tree',
    values: renderValues
  }));

  let emptyState = () => {
    if (state.collection.size !== 0 || !props.renderEmptyState) {return null;}
    let treeGridRowProps = {
      'aria-level': 1
    };

    return (
      <div role="row" style={{display: 'contents'}} {...treeGridRowProps}>
        <div role="gridcell" style={{display: 'contents'}}>
          {props.renderEmptyState(omit(renderValues, 'isEmpty'))}
        </div>
      </div>
    );
  };

  let DOMProps = filterDOMProps(props, {global: true});

  let dataSelectionMode = () => state.selectionManager.selectionMode === 'none' ? undefined : state.selectionManager.selectionMode;
  return (
    <>
      <FocusScope>
        <dom.div
          {...mergeProps(
            DOMProps,
            renderProps,
            gridProps,
            focusProps,
            droppableCollection?.collectionProps
          )}
          ref={ref}
          slot={props.slot || undefined}
          data-empty={state.collection.size === 0 || undefined}
          data-focused={isFocused() || undefined}
          data-drop-target={isRootDropTarget() || undefined}
          data-focus-visible={isFocusVisible() || undefined}
          data-selection-mode={dataSelectionMode()}
          data-allows-dragging={isTreeDraggable() || undefined}>
          <Provider
            values={[
              [TreeStateContext, state],
              [DragAndDropContext, {dragAndDropHooks, dragState, dropState}],
              [DropIndicatorContext, {render: TreeDropIndicatorWrapper}]
            ]}>
            {hasDropHooks && <RootDropIndicator />}
            <SharedElementTransition>
              <CollectionRoot
                collection={state.collection}
                persistedKeys={useDndPersistedKeys(
                  state.selectionManager,
                  dragAndDropHooks,
                  dropState
                )}
                scrollRef={ref}
                renderDropIndicator={useRenderDropIndicator(dragAndDropHooks, dropState)}
              />
            </SharedElementTransition>
          </Provider>
          {emptyState()}
        </dom.div>
      </FocusScope>
      {dragPreview()}
    </>
  );
}

// TODO: readd the rest of the render props when tree supports them
export interface TreeItemRenderProps extends ItemRenderProps {
  /**
   * Whether the tree item is expanded.
   *
   * @selector [data-expanded]
   */
  isExpanded: boolean;
  /**
   * Whether the tree item has child tree items.
   *
   * @selector [data-has-child-items]
   */
  hasChildItems: boolean;
  /**
   * What level the tree item has within the tree.
   *
   * @selector [data-level="number"]
   */
  level: number;
  /**
   * Whether the tree item's children have keyboard focus.
   *
   * @selector [data-focus-visible-within]
   */
  isFocusVisibleWithin: boolean;
  /** The state of the tree. */
  state: TreeState<unknown>;
  /** The unique id of the tree row. */
  id: Key;
}

export interface TreeItemContentRenderProps extends TreeItemRenderProps {}

// The TreeItemContent is the one that accepts RenderProps because we would get much more complicated logic in TreeItem otherwise since we'd
// need to do a bunch of check to figure out what is the Content and what are the actual collection elements (aka child rows) of the TreeItem
export interface TreeItemContentProps {
  /**
   * The children of the component. A function may be provided to alter the children based on
   * component state.
   */
  children: ChildrenOrFunction<TreeItemContentRenderProps>;
}

class TreeContentNode extends CollectionNode<any> {
  static readonly type = 'content';
}

export const TreeItemContent = /*#__PURE__*/ createLeafComponent(
  TreeContentNode,
  function TreeItemContent(props: TreeItemContentProps) {
    let values = useContext(TreeItemContentContext)!;
    let renderProps = useRenderProps({
      get children() {return props.children;},
      values
    });
    return (
      <CollectionRendererContext value={DefaultCollectionRenderer}>
        {renderProps.children}
      </CollectionRendererContext>
    );
  }
);

export const TreeItemContentContext = createContext<TreeItemContentRenderProps | null>(null);

export interface TreeItemProps<T = object>
  extends
    StyleRenderProps<TreeItemRenderProps>,
    LinkDOMProps,
    HoverEvents,
    PressEvents,
    Pick<AriaTreeItemOptions, 'hasChildItems' | 'focusMode' | 'allowsArrowNavigation'>,
    Omit<GlobalDOMAttributes<HTMLDivElement>, 'onClick'> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-TreeItem'
   */
  className?: ClassNameOrFunction<TreeItemRenderProps>;
  /** The unique id of the tree row. */
  id?: Key;
  /**
   * The object value that this tree item represents. When using dynamic collections, this is set
   * automatically.
   */
  value?: T;
  /** A string representation of the tree item's contents, used for features like typeahead. */
  textValue: string;
  /** An accessibility label for this tree item. */
  'aria-label'?: string;
  /**
   * The content of the tree item along with any nested children. Supports static nested tree items
   * or use of a Collection to dynamically render nested tree items.
   */
  children: ReactNode;
  /** Whether the item is disabled. */
  isDisabled?: boolean;
  /**
   * Handler that is called when a user performs an action on this tree item. The exact user event
   * depends on the collection's `selectionBehavior` prop and the interaction modality.
   */
  onAction?: () => void;
}

class TreeItemNode extends CollectionNode<any> {
  static readonly type = 'item';
}

/**
 * A TreeItem represents an individual item in a Tree.
 */
export const TreeItem = /*#__PURE__*/ createBranchComponent(
  TreeItemNode,
  <T extends any>(props: TreeItemProps<T>, ref: ForwardedRef<HTMLDivElement>, item: Node<T>) => {
    let state = useContext(TreeStateContext)!;
    let objectRef = useObjectRef<HTMLDivElement>(ref as NativeRef<HTMLDivElement>);
    let {dragAndDropHooks, dragState, dropState} = useContext(DragAndDropContext)!;
    let isDraggable = () =>
      dragState && !(dragState.isDisabled || dragState.selectionManager.isDisabled(item.key));

    // TODO: remove this when we support description in tree row
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let {rowProps, gridCellProps, expandButtonProps, descriptionProps, ...states} = useTreeItem(
      {
        node: item,
        shouldSelectOnPressUp: !!dragState,
        get focusMode() {return props.focusMode;},
        get allowsArrowNavigation() {return props.allowsArrowNavigation;}
      },
      state,
      objectRef
    );
    let isExpanded = () => rowProps['aria-expanded'] === 'true';
    let hasChildItems = () =>
      props.hasChildItems || [...state.collection.getChildren!(item.key)]?.length > 1;
    let level = () => Number(rowProps['aria-level'] || 1);

    let {hoverProps, isHovered} = useHover({
      // because of https://bugs.webkit.org/show_bug.cgi?id=214609, supporting hover styles when a item is ONLY isDraggable
      // results in hover styles sticking around after a reorder/drop operation...
      get isDisabled() {return !states.allowsSelection() && !states.hasAction() && !isDraggable();},
      get onHoverStart() {return props.onHoverStart;},
      get onHoverChange() {return props.onHoverChange;},
      get onHoverEnd() {return props.onHoverEnd;}
    });

    let {isFocusVisible, focusProps} = useFocusRing();
    let {isFocusVisible: isFocusVisibleWithin, focusProps: focusWithinProps} = useFocusRing({
      within: true
    });
    let {checkboxProps} = useGridListSelectionCheckbox({key: item.key}, state);

    let draggableItem: DraggableItemResult | null = null;
    if (dragState && dragAndDropHooks) {
      draggableItem = dragAndDropHooks.useDraggableItem!(
        {key: item.key, hasDragButton: true},
        dragState
      );
    }

    let dropIndicator: DropIndicatorAria | null = null;
    let expandButtonRef = useObjectRef<HTMLButtonElement>();
    let dropIndicatorRef = useObjectRef<HTMLDivElement>();
    let activateButtonRef = useObjectRef<HTMLDivElement>();
    let {visuallyHiddenProps} = useVisuallyHidden();
    if (dropState && dragAndDropHooks) {
      dropIndicator = dragAndDropHooks.useDropIndicator!(
        {
          target: {type: 'item', key: item.key, dropPosition: 'on'},
          activateButtonRef
        },
        dropState,
        dropIndicatorRef
      );
    }

    let isDragging = () => dragState && dragState.isDragging(item.key);
    let isDropTarget = () => dropIndicator?.isDropTarget();
    let renderPropValues = {
        get isSelected() {return states.isSelected();},
        get isDisabled() {return states.isDisabled();},
        get isFocused() {return states.isFocused();},
        get isPressed() {return states.isPressed();},
        get allowsSelection() {return states.allowsSelection();},
        get hasAction() {return states.hasAction();},
        get isHovered() {return isHovered();},
        get isFocusVisible() {return isFocusVisible();},
        get isExpanded() {return isExpanded();},
        get hasChildItems() {return !!hasChildItems();},
        get level() {return level();},
        get selectionMode() {return state.selectionManager.selectionMode;},
        get selectionBehavior() {return state.selectionManager.selectionBehavior;},
        get isFocusVisibleWithin() {return isFocusVisibleWithin();},
        state,
        id: item.key,
        allowsDragging: !!dragState,
        get isDragging() {return !!isDragging();},
        get isDropTarget() {return !!isDropTarget();}
    };

    let renderProps = useRenderProps(merge(omit(props, 'children', 'id'), {
      id: undefined,
      get children() {return item.rendered;},
      defaultClassName: 'react-aria-TreeItem',
      defaultStyle: {
        // @ts-ignore
        get '--tree-item-level'() {return level();}
      },
      values: renderPropValues
    }));

    createEffect(() => item.textValue, textValue => {
      if (!textValue && process.env.NODE_ENV !== 'production') {
        console.warn(
          'A `textValue` prop is required for <TreeItem> elements in order to support accessibility features such as type to select.'
        );
      }
    });

    onSettled(() => {
      if (hasChildItems() && !expandButtonRef.current && process.env.NODE_ENV !== 'production') {
        console.warn(
          'Expandable tree items must contain a expand button so screen reader users can expand/collapse the item.'
        );
      }
      // eslint-disable-next-line
    });

    let dragButtonRef = useObjectRef<HTMLButtonElement>();
    onSettled(() => {
      if (dragState && !dragButtonRef.current && process.env.NODE_ENV !== 'production') {
        console.warn(
          'Draggable items in a Tree must contain a <Button slot="drag"> element so that keyboard and screen reader users can drag them.'
        );
      }
      // eslint-disable-next-line
    });

    let Children = () => useCachedChildren({
      get items() {return state.collection.getChildren!(item.key);},
      children: item => {
        switch (item.type) {
          case 'content': {
            return item.render!(item);
          }
          // Skip item since we don't render the nested rows as children of the parent row, the flattened collection
          // will render them each as siblings instead
          case 'loader':
          case 'item':
            return <></>;
          default:
            throw new Error('Unsupported element type in TreeRow: ' + item.type);
        }
      }
    });

    let activateButtonId = useId();
    let DOMProps = omit(filterDOMProps(props as any, {global: true}), 'id', 'onClick');
    let dataExpanded = () => hasChildItems() && isExpanded() ? 'true' : undefined;
    let dataHasChildItems = () => hasChildItems() ? 'true' : undefined;
    let dataSelectionMode = () => state.selectionManager.selectionMode === 'none' ? undefined : state.selectionManager.selectionMode;

    return (
      <>
        {dropIndicator && !dropIndicator.isHidden() && (
          <div
            role="row"
            aria-level={rowProps['aria-level']}
            aria-expanded={rowProps['aria-expanded']}
            aria-label={dropIndicator.dropIndicatorProps['aria-label']}>
            <div role="gridcell" aria-colindex={1} style={{display: 'contents'}}>
              <div
                role="button"
                {...visuallyHiddenProps}
                {...dropIndicator.dropIndicatorProps}
                ref={dropIndicatorRef}
              />
              {rowProps['aria-expanded'] != null ? (
                // Button to allow touch screen reader users to expand the item while dragging.
                <div
                  role="button"
                  {...visuallyHiddenProps}
                  id={activateButtonId()}
                  aria-label={expandButtonProps['aria-label']}
                  aria-labelledby={`${activateButtonId()} ${rowProps.id}`}
                  tabindex={-1}
                  ref={activateButtonRef}
                />
              ) : null}
            </div>
          </div>
        )}
        <dom.div
          {...mergeProps(
            DOMProps,
            rowProps,
            focusProps,
            hoverProps,
            focusWithinProps,
            draggableItem?.dragProps
          )}
          {...renderProps}
          ref={objectRef}
          // TODO: missing selectionBehavior, hasAction and allowsSelection data attribute equivalents (available in renderProps). Do we want those?
          data-expanded={dataExpanded()}
          data-has-child-items={dataHasChildItems()}
          data-level={level()}
          data-selected={states.isSelected() || undefined}
          data-disabled={states.isDisabled() || undefined}
          data-hovered={isHovered() || undefined}
          data-focused={states.isFocused() || undefined}
          data-focus-visible={isFocusVisible() || undefined}
          data-pressed={states.isPressed() || undefined}
          data-selection-mode={dataSelectionMode()}
          data-allows-dragging={!!dragState || undefined}
          data-dragging={isDragging() || undefined}
          data-drop-target={isDropTarget() || undefined}>
          <div {...gridCellProps as JSX.HTMLAttributes<HTMLDivElement>} style={{display: 'contents'}}>
            <Provider
              values={[
                [
                  CheckboxContext,
                  {
                    slots: {
                      [DEFAULT_SLOT]: {},
                      selection: checkboxProps
                    }
                  }
                ],
                [
                  CheckboxFieldContext,
                  {
                    slots: {
                      [DEFAULT_SLOT]: {},
                      selection: checkboxProps
                    }
                  }
                ],
                // TODO: support description in the tree row
                // TODO: don't think I need to pass isExpanded to the button here since it can be sourced from the renderProps? Might be worthwhile passing it down?
                [
                  ButtonContext,
                  {
                    slots: {
                      [DEFAULT_SLOT]: {},
                      chevron: merge(expandButtonProps, {
                        ref: expandButtonRef
                      }),
                      drag: merge(draggableItem?.dragButtonProps || {}, {
                        ref: dragButtonRef,
                        style: {
                          pointerEvents: 'none'
                        }
                      })
                    }
                  }
                ],
                [
                  TreeItemContentContext,
                  renderPropValues
                ],
                [SelectionIndicatorContext, {get isSelected() {return states.isSelected();}}]
              ]}>
              <Children />
            </Provider>
          </div>
        </dom.div>
      </>
    );
  }
);

export interface TreeLoadMoreItemRenderProps {
  /**
   * What level the tree item has within the tree.
   *
   * @selector [data-level]
   */
  level: number;
}

export interface TreeLoadMoreItemProps
  extends
    Omit<LoadMoreSentinelProps, 'collection' | 'direction'>,
    RenderProps<TreeLoadMoreItemRenderProps> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-TreeLoader'
   */
  className?: ClassNameOrFunction<TreeLoadMoreItemRenderProps>;
  /**
   * The load more spinner to render when loading additional items.
   */
  children?: ChildrenOrFunction<TreeLoadMoreItemRenderProps>;
  /**
   * Whether or not the loading spinner should be rendered or not.
   */
  isLoading?: boolean;
}

export const TreeLoadMoreItem = createLeafComponent(LoaderNode, function TreeLoadingSentinel<
  T
>(props: TreeLoadMoreItemProps, ref: ForwardedRef<HTMLDivElement>, item: Node<T>) {
  let collectionRenderer = useContext(CollectionRendererContext);
  let state = useContext(TreeStateContext)!;
  let otherProps = omit(props, 'isLoading', 'onLoadMore', 'scrollOffset');
  let sentinelRef = useObjectRef<HTMLDivElement>();
  let memoedLoadMoreProps = {
      get onLoadMore() {return props.onLoadMore;},
      // this collection will update anytime a row is expanded/collapsed becaused the flattenedRows will change.
      // This means onLoadMore will trigger but that might be ok cause the user should have logic to handle multiple loadMore calls
      get collection() {return state.collection;},
      sentinelRef,
      get scrollOffset() {return props.scrollOffset;}
  };
  useLoadMoreSentinel(memoedLoadMoreProps, sentinelRef);

  let objectRef = useObjectRef<HTMLDivElement>(ref as NativeRef<HTMLDivElement>);
  let {rowProps, gridCellProps} = useTreeItem({node: item}, state, objectRef);
  let level = () => Number(rowProps['aria-level'] || 1);

  // For now don't include aria-posinset and aria-setsize on loader since they aren't keyboard focusable
  // Arguably shouldn't include them ever since it might be confusing to the user to include the loaders as part of the
  // item count
  let ariaProps = {
    role: 'row' as const,
    get 'aria-level'() {return rowProps['aria-level'];}
  };

  let renderProps = useRenderProps(merge(omit(otherProps, 'children'), {
    id: undefined,
    get children() {return item.rendered;},
    defaultClassName: 'react-aria-TreeLoader',
    values: {
      get level() {return level();}
    }
  }));
  return (
    <>
      {/* Alway render the sentinel. For now onus is on the user for styling when using flex + gap (this would introduce a gap even though it doesn't take room) */}
      {/* @ts-ignore - compatibility with React < 19 */}
      <div style={{position: 'relative', width: 0, height: 0}} inert={inertValue(true)}>
        <div
          data-testid="loadMoreSentinel"
          ref={sentinelRef}
          style={{position: 'absolute', height: '1px', width: '1px'}}
        />
      </div>
      {props.isLoading && renderProps.children && (
        <dom.div
          ref={objectRef}
          {...mergeProps(filterDOMProps(props as any), ariaProps)}
          {...renderProps}
          data-level={level()}>
          <div {...gridCellProps as JSX.HTMLAttributes<HTMLDivElement>} style={collectionRenderer.isVirtualized ? {display: 'contents'} : {}}>
            {renderProps.children}
          </div>
        </dom.div>
      )}
    </>
  );
});

function TreeDropIndicatorWrapper(
  props: DropIndicatorProps,
  ref: ForwardedRef<HTMLElement>
): JSX.Element | null {
  let objectRef = useObjectRef(ref as NativeRef<HTMLElement>);
  let {dragAndDropHooks, dropState} = useContext(DragAndDropContext)!;
  let buttonRef = useObjectRef<HTMLDivElement>();
  // oxlint-disable-next-line react/react-compiler
  let {dropIndicatorProps, isHidden, isDropTarget} = dragAndDropHooks!.useDropIndicator!(
    props,
    dropState!,
    buttonRef
  );

  let level = () =>
    dropState && props.target.type === 'item'
      ? (dropState.collection.getItem(props.target.key)?.level || 0) + 1
      : 1;
  return (
    <>{!isHidden() && <TreeDropIndicatorForwardRef
      {...props}
      dropIndicatorProps={dropIndicatorProps as JSX.HTMLAttributes<HTMLDivElement>}
      isDropTarget={isDropTarget()}
      ref={objectRef}
      buttonRef={buttonRef}
      level={level()}
    />}</>
  );
}

interface TreeDropIndicatorProps extends DropIndicatorProps {
  dropIndicatorProps: JSX.HTMLAttributes<HTMLDivElement>;
  isDropTarget: boolean;
  buttonRef: ForwardedRef<HTMLDivElement>;
  level: number;
}

function TreeDropIndicator(props: TreeDropIndicatorProps & {ref?: ForwardedRef<HTMLElement>}) {
  let otherProps = omit(props, 'dropIndicatorProps', 'isDropTarget', 'buttonRef', 'level', 'ref');
  let {visuallyHiddenProps} = useVisuallyHidden();
  let renderProps = useRenderProps(merge(otherProps, {
    defaultClassName: 'react-aria-DropIndicator',
    defaultStyle: {
      position: 'relative' as const,
      // @ts-ignore
      get '--tree-item-level'() {return props.level;}
    },
    values: {
      get isDropTarget() {return props.isDropTarget;}
    }
  }));

  return (
    <dom.div
      {...renderProps}
      role="row"
      aria-level={props.level}
      ref={props.ref as ForwardedRef<HTMLDivElement>}
      data-drop-target={props.isDropTarget || undefined}>
      <div role="gridcell">
        <div {...visuallyHiddenProps} role="button" {...props.dropIndicatorProps} ref={props.buttonRef} />
        {renderProps.children}
      </div>
    </dom.div>
  );
}

const TreeDropIndicatorForwardRef = TreeDropIndicator;

function RootDropIndicator() {
  let {dragAndDropHooks, dropState} = useContext(DragAndDropContext);
  let ref = useObjectRef<HTMLDivElement>();
  // oxlint-disable-next-line react/react-compiler
  let {dropIndicatorProps} = dragAndDropHooks!.useDropIndicator!(
    {
      target: {type: 'root'}
    },
    dropState!,
    ref
  );
  let isDropTarget = () => dropState!.isDropTarget({type: 'root'});
  let {visuallyHiddenProps} = useVisuallyHidden();

  return (
    <>{(isDropTarget() || !dropIndicatorProps['aria-hidden']) && <div role="row" aria-hidden={dropIndicatorProps['aria-hidden']} style={{position: 'absolute'}}>
      <div role="gridcell">
        <div role="button" {...visuallyHiddenProps} {...dropIndicatorProps} ref={ref} />
      </div>
    </div>}</>
  );
}

export interface TreeSectionProps<T> extends SectionProps<T>, DOMRenderProps<'div', undefined> {}

/**
 * A TreeSection represents a section within a Tree.
 */
export const TreeSection = /*#__PURE__*/ createBranchComponent(
  SectionNode,
  <T extends any>(props: TreeSectionProps<T>, ref: ForwardedRef<HTMLDivElement>, item: Node<T>) => {
    let state = useContext(TreeStateContext)!;
    let {CollectionBranch} = useContext(CollectionRendererContext);
    let headingRef = useObjectRef<HTMLDivElement>();
    let objectRef = useObjectRef<HTMLDivElement>(ref as NativeRef<HTMLDivElement>);
    let {rowHeaderProps, rowProps, rowGroupProps} = useGridListSection(
      {
        get 'aria-label'() {return props['aria-label'] ?? undefined;}
      },
      state,
      objectRef
    );
    let renderProps = useRenderProps(merge(omit(props, 'children', 'id'), {
      id: undefined,
      children: undefined,
      defaultClassName: 'react-aria-TreeSection',
      values: undefined
    }));

    let DOMProps = omit(filterDOMProps(props as any, {global: true}), 'id');

    return (
      <dom.div {...mergeProps(DOMProps, renderProps, rowGroupProps)} ref={objectRef}>
        <Provider
          values={[
            [GridListHeaderContext, merge(rowProps, {ref: headingRef}) as GridListHeaderProps & {ref: ForwardedRef<HTMLDivElement>}],
            [GridListHeaderInnerContext, rowHeaderProps as JSX.HTMLAttributes<HTMLDivElement>]
          ]}>
          <CollectionBranch collection={state.collection} parent={item} />
        </Provider>
      </dom.div>
    );
  }
);

export interface TreeHeaderProps extends GridListHeaderProps {}

export const TreeHeader = (props: TreeHeaderProps): ReactNode => {
  return (
    <GridListHeader className="react-aria-TreeHeader" {...props}>
      {props.children}
    </GridListHeader>
  );
};

function areSetsEqual<T>(a: Set<T>, b: Set<T>) {
  if (a.size !== b.size) {
    return false;
  }

  for (let item of a) {
    if (!b.has(item)) {
      return false;
    }
  }
  return true;
}
