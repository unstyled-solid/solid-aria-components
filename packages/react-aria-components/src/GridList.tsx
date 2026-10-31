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
  AriaGridListProps,
  useGridList,
  useGridListItem,
  useGridListSection,
  useGridListSelectionCheckbox
} from 'react-aria/useGridList';

import {ButtonContext} from './Button';
import {CheckboxContext, CheckboxFieldContext} from './Checkbox';
import {
  ClassNameOrFunction,
  ContextValue,
  DEFAULT_SLOT,
  dom,
  DOMProps,
  DOMRenderProps,
  Provider,
  RenderProps,
  SlotProps,
  StyleProps,
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
  DragAndDropContext,
  DropIndicatorContext,
  DropIndicatorProps,
  useDndPersistedKeys,
  useRenderDropIndicator
} from './DragAndDrop';
import {DragAndDropHooks} from './useDragAndDrop';
import {DraggableCollectionState} from 'react-stately/useDraggableCollectionState';
import {DraggableItemResult} from 'react-aria/useDraggableCollection';
import {DragPreviewRenderer} from '@react-types/shared';
import {DropIndicatorAria, DroppableCollectionResult} from 'react-aria/useDroppableCollection';
import {DroppableCollectionState} from 'react-stately/useDroppableCollectionState';
import {
  SelectableCollectionContext,
  SelectableCollectionContextValue
} from './SelectableCollectionContext';
import {FieldInputContext} from './FieldInputContext';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {FocusScope} from 'react-aria/FocusScope';
import {
  GlobalDOMAttributes,
  HoverEvents,
  Key,
  LinkDOMProps,
  Orientation,
  PressEvents,
  RefObject
} from '@react-types/shared';
import {
  HeaderNode,
  ItemNode,
  LoaderNode,
  SectionNode
} from 'react-aria/private/collections/BaseCollection';
import {Collection as ICollection, Node, SelectionBehavior} from '@react-types/shared';
import {inertValue} from 'react-aria/private/utils/inertValue';
import {ListKeyboardDelegate} from 'react-aria/ListKeyboardDelegate';
import {ListState, UNSTABLE_useFilteredListState, useListState} from 'react-stately/useListState';
import {ListStateContext} from './ListBox';
import {
  LoadMoreSentinelProps,
  useLoadMoreSentinel
} from 'react-aria/private/utils/useLoadMoreSentinel';
import {mergeProps} from 'react-aria/mergeProps';
import {createContext, createEffect, createMemo, merge, omit, onSettled, Show, untrack, useContext, type Ref as ForwardedRef, type Element as ReactNode} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {attachRef, type Ref as NativeRef} from 'react-aria/private/utils/useObjectRef';
type HTMLAttributes<T extends HTMLElement> = JSX.HTMLAttributes<T>;
import {SelectionIndicatorContext} from './SelectionIndicator';
import {SharedElementTransition} from './SharedElementTransition';
import {TextContext, type TextProps} from './Text';
import {useCollator} from 'react-aria/useCollator';
import {useFocusRing} from 'react-aria/useFocusRing';
import {useHover} from 'react-aria/useHover';
import {useLocale} from 'react-aria/I18nProvider';
import {useObjectRef} from 'react-aria/useObjectRef';
import {useVisuallyHidden} from 'react-aria/VisuallyHidden';

export interface GridListRenderProps {
  /**
   * Whether the list has no items and should display its empty state.
   *
   * @selector [data-empty]
   */
  isEmpty: boolean;
  /**
   * Whether the grid list is currently focused.
   *
   * @selector [data-focused]
   */
  isFocused: boolean;
  /**
   * Whether the grid list is currently keyboard focused.
   *
   * @selector [data-focus-visible]
   */
  isFocusVisible: boolean;
  /**
   * Whether the grid list is currently the active drop target.
   *
   * @selector [data-drop-target]
   */
  isDropTarget: boolean;
  /**
   * Whether the items are arranged in a stack or grid.
   *
   * @selector [data-layout="stack | grid"]
   */
  layout: 'stack' | 'grid';
  /**
   * The primary orientation of the items.
   *
   * @selector [data-orientation="vertical | horizontal"]
   */
  orientation: Orientation;
  /**
   * State of the grid list.
   */
  state: ListState<unknown>;
}

export interface GridListProps<T>
  extends
    Omit<AriaGridListProps<T>, 'children'>,
    CollectionProps<T>,
    StyleRenderProps<GridListRenderProps>,
    SlotProps,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-GridList'
   */
  className?: ClassNameOrFunction<GridListRenderProps>;
  /**
   * Whether typeahead navigation is disabled.
   *
   * @default false
   */
  disallowTypeAhead?: boolean;
  /**
   * How multiple selection should behave in the collection.
   *
   * @default 'toggle'
   */
  selectionBehavior?: SelectionBehavior;
  /**
   * The drag and drop hooks returned by `useDragAndDrop` used to enable drag and drop behavior for
   * the GridList.
   */
  dragAndDropHooks?: DragAndDropHooks<NoInfer<T>>;
  /** Provides content to display when there are no items in the list. */
  renderEmptyState?: (props: GridListRenderProps) => ReactNode;
  /**
   * Whether the items are arranged in a stack or grid.
   *
   * @default 'stack'
   */
  layout?: 'stack' | 'grid';
  /**
   * The primary orientation of the items. Usually this is the direction that the collection
   * scrolls.
   *
   * @default 'vertical'
   */
  orientation?: Orientation;
  /**
   * Which item in the collection to focus when tabbing into the collection. Overrides default
   * roving tab index like behavior.
   *
   * @private
   */
  UNSTABLE_focusOnEntry?: 'first' | 'last';
  ref?: ForwardedRef<HTMLDivElement>;
}

export const GridListContext =
  createContext<ContextValue<GridListProps<any>, HTMLDivElement>>(null);

/**
 * A grid list displays a list of interactive items, with support for keyboard navigation,
 * single or multiple selection, and row actions.
 */
export function GridList<T>(input: GridListProps<T>) {
  // Render the portal first so that we have the collection by the time we render the DOM in SSR.
  let [props, mergedRef] = useContextProps(input, untrack(() => input.ref), GridListContext);
  let ref = useObjectRef<HTMLDivElement>(mergedRef as NativeRef<HTMLDivElement>);

  return (
    <CollectionBuilder content={<Collection {...props} />}>
      {collection => <GridListInner props={props} collection={collection} gridListRef={ref} />}
    </CollectionBuilder>
  );
}

interface GridListInnerProps<T> {
  props: GridListProps<T> & SelectableCollectionContextValue<T>;
  collection: ICollection<Node<any>>;
  gridListRef: ForwardedRef<HTMLDivElement>;
}

function GridListInner<T>(input: GridListInnerProps<T>) {
  // oxlint-disable-next-line react/react-compiler
  let [props, mergedRef] = useContextProps(input.props, element => attachRef(input.gridListRef as NativeRef<HTMLDivElement>, element as HTMLDivElement), SelectableCollectionContext);
  let ref = useObjectRef<HTMLDivElement>(mergedRef as NativeRef<HTMLDivElement>);
  let DOMCollectionProps = omit(props, 'shouldUseVirtualFocus', 'filter', 'disallowTypeAhead', 'UNSTABLE_focusOnEntry');
  // Source hook topology is fixed for this owner, with live-change warnings below.
  let dragAndDropHooks = untrack(() => props.dragAndDropHooks);
  let layout = () => props.layout ?? 'stack';
  let orientation = () => props.orientation ?? 'vertical';
  let collectionRenderer = useContext(CollectionRendererContext);
  let CollectionRoot = collectionRenderer.CollectionRoot;
  let gridlistState = useListState(merge(DOMCollectionProps, {
    get collection() {return input.collection;},
    children: undefined,
    get layoutDelegate() { return collectionRenderer.layoutDelegate; }
  }));

  // oxlint-disable-next-line react/react-compiler
  let filteredState = UNSTABLE_useFilteredListState(gridlistState as ListState<T>, undefined, () => props.filter);
  let collator = useCollator({usage: 'search', sensitivity: 'base'});
  let locale = useLocale();
  let keyboardDelegate = createMemo(
    () =>
      new ListKeyboardDelegate({
        collection: filteredState.collection,
        collator,
        ref,
         disabledKeys: filteredState.selectionManager.disabledKeys,
         disabledBehavior: filteredState.selectionManager.disabledBehavior,
        layoutDelegate: collectionRenderer.layoutDelegate,
         layout: layout(),
         orientation: orientation(),
         direction: locale.direction
       })
  );

  let {gridProps} = useGridList(
    merge(DOMCollectionProps, {
      get keyboardDelegate() {return keyboardDelegate();},
      // Only tab navigation is supported in grid layout.
      get keyboardNavigationBehavior() {return layout() === 'grid' ? 'tab' : props.keyboardNavigationBehavior ?? 'arrow';},
      get isVirtualized() { return collectionRenderer.isVirtualized; },
      get shouldSelectOnPressUp() {return props.shouldSelectOnPressUp;},
      get disallowTypeAhead() {return props.disallowTypeAhead;},
      get UNSTABLE_focusOnEntry() {return props.UNSTABLE_focusOnEntry;}
    }),
    filteredState,
    ref
  );

  let selectionManager = filteredState.selectionManager;
  let isListDraggable = !!dragAndDropHooks?.useDraggableCollectionState;
  let isListDroppable = !!dragAndDropHooks?.useDroppableCollectionState;
  let dragHooksProvided = {current: isListDraggable};
  let dropHooksProvided = {current: isListDroppable};
  createEffect(() => ({draggable: !!props.dragAndDropHooks?.useDraggableCollectionState, droppable: !!props.dragAndDropHooks?.useDroppableCollectionState}), ({draggable, droppable}) => {
    if (process.env.NODE_ENV === 'production') {
      return;
    }
    if (dragHooksProvided.current !== draggable) {
      console.warn(
        'Drag hooks were provided during one render, but not another. This should be avoided as it may produce unexpected behavior.'
      );
    }
    if (dropHooksProvided.current !== droppable) {
      console.warn(
        'Drop hooks were provided during one render, but not another. This should be avoided as it may produce unexpected behavior.'
      );
    }
  });

  let dragState: DraggableCollectionState | undefined = undefined;
  let dropState: DroppableCollectionState | undefined = undefined;
  let droppableCollection: DroppableCollectionResult | undefined = undefined;
  let isRootDropTarget = () => false;
  let dragPreview: () => JSX.Element | null = () => null;
  let preview = useObjectRef<DragPreviewRenderer>();

  if (isListDraggable && dragAndDropHooks) {
    // oxlint-disable-next-line react/react-compiler
    dragState = dragAndDropHooks.useDraggableCollectionState!({
      get collection() {return filteredState.collection;},
      selectionManager,
      preview: dragAndDropHooks.renderDragPreview ? preview : undefined
    });
    // oxlint-disable-next-line react/react-compiler
    dragAndDropHooks.useDraggableCollection!({}, dragState, ref);

    let DragPreview = dragAndDropHooks.DragPreview!;
    dragPreview = () => dragAndDropHooks.renderDragPreview ? (
      <DragPreview ref={preview}>{dragAndDropHooks.renderDragPreview}</DragPreview>
    ) : null;
  }

  if (isListDroppable && dragAndDropHooks) {
    // oxlint-disable-next-line react/react-compiler
    dropState = dragAndDropHooks.useDroppableCollectionState!({
      get collection() {return filteredState.collection;},
      selectionManager
    });

    let dropTargetDelegate = createMemo(() =>
      dragAndDropHooks.dropTargetDelegate ||
      collectionRenderer.dropTargetDelegate ||
      new dragAndDropHooks.ListDropTargetDelegate(input.collection, ref, {
        layout: layout(),
        direction: locale.direction,
        orientation: orientation()
      }));
    // oxlint-disable-next-line react/react-compiler
    droppableCollection = dragAndDropHooks.useDroppableCollection!(
      {
        get keyboardDelegate() {return keyboardDelegate();},
        get dropTargetDelegate() {return dropTargetDelegate();}
      },
      dropState,
      ref
    );

    isRootDropTarget = () => dropState!.isDropTarget({type: 'root'});
  }

  let {focusProps, isFocused, isFocusVisible} = useFocusRing();
  let isEmpty = () => filteredState.collection.size === 0;
  let renderValues = {
    get isDropTarget() {return isRootDropTarget();},
    get orientation() {return orientation();},
    get isEmpty() {return isEmpty();},
    get isFocused() {return isFocused();},
    get isFocusVisible() {return isFocusVisible();},
    get layout() {return layout();},
    state: filteredState
  };
  let renderProps = useRenderProps(merge(omit(props, 'children'), {
    children: undefined,
    defaultClassName: 'react-aria-GridList',
    values: renderValues
  }));

  let emptyState = () => isEmpty() && props.renderEmptyState ? (
      <div role="row" aria-rowindex={1} style={{display: 'contents'}}>
        <div role="gridcell" style={{display: 'contents'}}>
          {props.renderEmptyState(renderValues)}
        </div>
      </div>
    ) : null;

  let DOMProps = filterDOMProps(props, {global: true});

  return (
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
        onScroll={props.onScroll}
        data-drop-target={isRootDropTarget() || undefined}
        data-empty={isEmpty() || undefined}
        data-focused={isFocused() || undefined}
        data-focus-visible={isFocusVisible() || undefined}
        data-layout={layout()}
        data-orientation={orientation()}>
        <Provider
          values={[
            [ListStateContext, filteredState],
            [DragAndDropContext, {dragAndDropHooks, dragState, dropState}],
            [DropIndicatorContext, {render: GridListDropIndicatorWrapper}]
          ]}>
          {isListDroppable && <RootDropIndicator />}
          <SharedElementTransition>
            <CollectionRoot
              collection={filteredState.collection}
              scrollRef={ref}
              persistedKeys={useDndPersistedKeys(selectionManager, dragAndDropHooks, dropState)}
              renderDropIndicator={useRenderDropIndicator(dragAndDropHooks, dropState)}
            />
          </SharedElementTransition>
        </Provider>
        {emptyState()}
        {dragPreview()}
      </dom.div>
    </FocusScope>
  );
}

export interface GridListItemRenderProps extends ItemRenderProps {
  /** The unique id of the item. */
  id?: Key;
  /**
   * Whether the item's children have keyboard focus.
   *
   * @selector [data-focus-visible-within]
   */
  isFocusVisibleWithin: boolean;
  /**
   * State of the grid list.
   */
  state: ListState<unknown>;
}

export interface GridListItemProps<T = object>
  extends
    RenderProps<GridListItemRenderProps>,
    LinkDOMProps,
    HoverEvents,
    PressEvents,
    Omit<GlobalDOMAttributes<HTMLDivElement>, 'onClick'> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-GridListItem'
   */
  className?: ClassNameOrFunction<GridListItemRenderProps>;
  /** The unique id of the item. */
  id?: Key;
  /**
   * The object value that this item represents. When using dynamic collections, this is set
   * automatically.
   */
  value?: T;
  /** A string representation of the item's contents, used for features like typeahead. */
  textValue?: string;
  /** Whether the item is disabled. */
  isDisabled?: boolean;
  /**
   * Handler that is called when a user performs an action on the item. The exact user event depends
   * on the collection's `selectionBehavior` prop and the interaction modality.
   */
  onAction?: () => void;
  /**
   * Whether the row or its first focusable child element should be focused when navigating
   * to the row. Defaults to 'row'.
   */
  focusMode?: 'child' | 'row';
  /**
   * Whether the row should support arrow key navigation even when the containing collection uses
   * tab keyboard navigation. Allows users to navigate between rows with arrow keys while
   * focus is on an interactive child element within the row.
   */
  allowsArrowNavigation?: boolean;
}

/**
 * A GridListItem represents an individual item in a GridList.
 */
export const GridListItem = /*#__PURE__*/ createLeafComponent(ItemNode, function GridListItem<
  T
>(props: GridListItemProps<T>, forwardedRef: ForwardedRef<HTMLDivElement>, item: Node<T>) {
  let state = useContext(ListStateContext)!;
  let {dragAndDropHooks, dragState, dropState} = useContext(DragAndDropContext);
  let ref = useObjectRef<HTMLDivElement>(forwardedRef as NativeRef<HTMLDivElement>);
  let {isVirtualized} = useContext(CollectionRendererContext);
  let isDraggable = () =>
    dragState && !(dragState.isDisabled || dragState.selectionManager.isDisabled(item.key));
  let {rowProps, gridCellProps, descriptionProps, ...states} = useGridListItem(
    {
      node: item,
      shouldSelectOnPressUp: !!dragState,
      isVirtualized,
      get focusMode() {return props.focusMode;},
      get allowsArrowNavigation() {return props.allowsArrowNavigation;}
    },
    state,
    ref
  );

  let {hoverProps, isHovered} = useHover({
    // because of https://bugs.webkit.org/show_bug.cgi?id=214609, supporting hover styles when a item is ONLY isDraggable
    // results in hover styles sticking around after a reorder/drop operation...
    get isDisabled() {return !states.allowsSelection() && !states.hasAction() && !isDraggable();},
    get onHoverStart() {return item.props.onHoverStart;},
    get onHoverChange() {return item.props.onHoverChange;},
    get onHoverEnd() {return item.props.onHoverEnd;}
  });

  let {isFocusVisible, focusProps} = useFocusRing();
  let {isFocusVisible: isFocusVisibleWithin, focusProps: focusWithinProps} = useFocusRing({
    within: true
  });
  let {checkboxProps} = useGridListSelectionCheckbox({key: item.key}, state);

  let buttonProps = {
    get isDisabled() {return state.selectionManager.disabledBehavior === 'all' && states.isDisabled() ? true : undefined;}
  };

  let draggableItem: DraggableItemResult | null = null;
  if (dragState && dragAndDropHooks) {
    draggableItem = dragAndDropHooks.useDraggableItem!(
      {key: item.key, hasDragButton: true},
      dragState
    );
  }

  let dropIndicator: DropIndicatorAria | null = null;
  let dropIndicatorRef = useObjectRef<HTMLDivElement>();
  let {visuallyHiddenProps} = useVisuallyHidden();
  if (dropState && dragAndDropHooks) {
    dropIndicator = dragAndDropHooks.useDropIndicator!(
      {
        target: {type: 'item', key: item.key, dropPosition: 'on'}
      },
      dropState,
      dropIndicatorRef
    );
  }

  let isDragging = () => dragState && dragState.isDragging(item.key);
  let renderProps = useRenderProps(merge(omit(props, 'children', 'id'), {
    id: undefined,
    get children() {return item.rendered;},
    defaultClassName: 'react-aria-GridListItem',
    values: {
      get isSelected() {return states.isSelected();},
      get isDisabled() {return states.isDisabled();},
      get isFocused() {return states.isFocused();},
      get isPressed() {return states.isPressed();},
      get allowsSelection() {return states.allowsSelection();},
      get hasAction() {return states.hasAction();},
      get isHovered() {return isHovered();},
      get isFocusVisible() {return isFocusVisible();},
      get isFocusVisibleWithin() {return isFocusVisibleWithin();},
      get selectionMode() {return state.selectionManager.selectionMode;},
      get selectionBehavior() {return state.selectionManager.selectionBehavior;},
      allowsDragging: !!dragState,
      get isDragging() {return isDragging();},
      get isDropTarget() {return dropIndicator?.isDropTarget();},
      id: item.key,
      state
    }
  }));

  let dragButtonRef = useObjectRef<HTMLButtonElement>();
  onSettled(() => {
    if (dragState && !dragButtonRef.current) {
      console.warn(
        'Draggable items in a GridList must contain a <Button slot="drag"> element so that keyboard and screen reader users can drag them.'
      );
    }
    // eslint-disable-next-line
  });

  createEffect(() => item.textValue, textValue => {
    if (!textValue && process.env.NODE_ENV !== 'production') {
      console.warn(
        'A `textValue` prop is required for <GridListItem> elements with non-plain text children in order to support accessibility features such as type to select.'
      );
    }
  });

  let DOMProps = omit(filterDOMProps(props as any, {global: true}), 'id', 'onClick');
  let selectionMode = () => state.selectionManager.selectionMode === 'none'
    ? undefined
    : state.selectionManager.selectionMode;

  return (
    <>
      {dropIndicator && !dropIndicator.isHidden() && (
        <div role="row" style={{position: 'absolute'}}>
          <div role="gridcell">
            <div
              role="button"
              {...visuallyHiddenProps}
              {...dropIndicator?.dropIndicatorProps}
              ref={dropIndicatorRef}
            />
          </div>
        </div>
      )}
      <dom.div
        {...mergeProps(
          DOMProps,
          renderProps,
          rowProps,
          focusProps,
          focusWithinProps,
          hoverProps,
          draggableItem?.dragProps
        )}
        ref={ref}
        data-selected={states.isSelected() || undefined}
        data-disabled={states.isDisabled() || undefined}
        data-hovered={isHovered() || undefined}
        data-focused={states.isFocused() || undefined}
        data-focus-visible={isFocusVisible() || undefined}
        data-focus-visible-within={isFocusVisibleWithin() || undefined}
        data-pressed={states.isPressed() || undefined}
        data-allows-dragging={!!dragState || undefined}
        data-dragging={isDragging() || undefined}
        data-drop-target={dropIndicator?.isDropTarget() || undefined}
        data-selection-mode={selectionMode()}>
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
              [
                ButtonContext,
                {
                  slots: {
                    [DEFAULT_SLOT]: buttonProps,
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
                TextContext,
                {
                  slots: {
                    [DEFAULT_SLOT]: {},
                    description: descriptionProps as TextProps
                  }
                }
              ],
              [CollectionRendererContext, DefaultCollectionRenderer],
              [ListStateContext, null],
              [SelectableCollectionContext, null],
              [FieldInputContext, null],
               [SelectionIndicatorContext, {get isSelected() {return states.isSelected();}}]
            ]}>
            {renderProps.children}
          </Provider>
        </div>
      </dom.div>
    </>
  );
});

function GridListDropIndicatorWrapper(props: DropIndicatorProps, ref: ForwardedRef<HTMLElement>) {
  let objectRef = useObjectRef(ref as NativeRef<HTMLElement>);
  let {dragAndDropHooks, dropState} = useContext(DragAndDropContext);
  let buttonRef = useObjectRef<HTMLDivElement>();
  // oxlint-disable-next-line react/react-compiler
  let {dropIndicatorProps, isHidden, isDropTarget} = dragAndDropHooks!.useDropIndicator!(
    props,
    dropState!,
    buttonRef
  );

  return (
    <Show when={!isHidden()}>{_visible => <GridListDropIndicatorForwardRef
      {...props}
      dropIndicatorProps={dropIndicatorProps as JSX.HTMLAttributes<HTMLDivElement>}
      isDropTarget={isDropTarget()}
      buttonRef={buttonRef}
      ref={objectRef}
    />}</Show>
  );
}

interface GridListDropIndicatorProps extends DropIndicatorProps {
  dropIndicatorProps: JSX.HTMLAttributes<HTMLDivElement>;
  isDropTarget: boolean;
  buttonRef: ForwardedRef<HTMLDivElement>;
}

function GridListDropIndicator(props: GridListDropIndicatorProps & {ref?: ForwardedRef<HTMLElement>}) {
  let otherProps = omit(props, 'dropIndicatorProps', 'isDropTarget', 'buttonRef', 'ref');

  let {visuallyHiddenProps} = useVisuallyHidden();
  let renderProps = useRenderProps(merge(otherProps, {
    defaultClassName: 'react-aria-DropIndicator',
    values: {
      get isDropTarget() {return props.isDropTarget;}
    }
  }));

  return (
    <dom.div
      {...renderProps}
      role="row"
      ref={props.ref as ForwardedRef<HTMLDivElement>}
      data-drop-target={props.isDropTarget || undefined}>
      <div role="gridcell">
        <div {...visuallyHiddenProps} role="button" {...props.dropIndicatorProps} ref={props.buttonRef} />
        {renderProps.children}
      </div>
    </dom.div>
  );
}

const GridListDropIndicatorForwardRef = GridListDropIndicator;

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

export interface GridListLoadMoreItemProps
  extends
    Omit<LoadMoreSentinelProps, 'collection' | 'direction'>,
    StyleProps,
    DOMRenderProps<'div', undefined>,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element.
   *
   * @default 'react-aria-GridListLoadingIndicator'
   */
  className?: string;
  /**
   * The load more spinner to render when loading additional items.
   */
  children?: ReactNode;
  /**
   * Whether or not the loading spinner should be rendered or not.
   */
  isLoading?: boolean;
}

export const GridListLoadMoreItem = createLeafComponent(
  LoaderNode,
  function GridListLoadingIndicator(
    props: GridListLoadMoreItemProps,
    ref: ForwardedRef<HTMLDivElement>,
    item: Node<object>
  ) {
    let state = useContext(ListStateContext)!;
    let {isVirtualized} = useContext(CollectionRendererContext);
    let otherProps = omit(props, 'isLoading', 'onLoadMore', 'scrollOffset');

    let sentinelRef = useObjectRef<HTMLDivElement>();
    let memoedLoadMoreProps = {
      get onLoadMore() {return props.onLoadMore;},
      get collection() {return state.collection;},
      sentinelRef,
      get scrollOffset() {return props.scrollOffset;}
    };
    useLoadMoreSentinel(memoedLoadMoreProps, sentinelRef);

    let renderProps = useRenderProps(merge(omit(otherProps, 'children'), {
      id: undefined,
      get children() {return item.rendered;},
      defaultClassName: 'react-aria-GridListLoadingIndicator',
      values: undefined
    }));
    // For now don't include aria-posinset and aria-setsize on loader since they aren't keyboard focusable
    // Arguably shouldn't include them ever since it might be confusing to the user to include the loaders as part of the
    // item count

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
          <dom.div {...renderProps} {...filterDOMProps(props, {global: true})} role="row" ref={ref}>
            <div aria-colindex={isVirtualized ? 1 : undefined} role="gridcell">
              {renderProps.children}
            </div>
          </dom.div>
        )}
      </>
    );
  }
);

export interface GridListSectionProps<T> extends SectionProps<T>, DOMRenderProps<'div', undefined> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element.
   *
   * @default 'react-aria-GridListSection'
   */
  className?: string;
}

/**
 * A GridListSection represents a section within a GridList.
 */
export const GridListSection = /*#__PURE__*/ createBranchComponent(
  SectionNode,
  <T extends any>(
    props: GridListSectionProps<T>,
    ref: ForwardedRef<HTMLDivElement>,
    item: Node<T>
  ) => {
    let state = useContext(ListStateContext)!;
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
      defaultClassName: 'react-aria-GridListSection',
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

export interface GridListHeaderProps
  extends DOMRenderProps<'div', undefined>, DOMProps, GlobalDOMAttributes<HTMLElement> {}

export const GridListHeaderContext = createContext<
  ContextValue<GridListHeaderProps, HTMLDivElement>
>({});
export const GridListHeaderInnerContext = createContext<HTMLAttributes<HTMLDivElement> | null>(null);

export const GridListHeader = /*#__PURE__*/ createLeafComponent(
  HeaderNode,
  function Header(props: GridListHeaderProps, ref: ForwardedRef<HTMLDivElement>) {
    [props, ref] = useContextProps(props, ref, GridListHeaderContext);
    let rowHeaderProps = useContext(GridListHeaderInnerContext);
    let renderProps = useRenderProps({
      get children() {return props.children;},
      values: undefined
    });

    return (
      <dom.div render={props.render} className="react-aria-GridListHeader" ref={ref} {...props}>
        <div {...rowHeaderProps} style={{display: 'contents'}}>
          {renderProps.children}
        </div>
      </dom.div>
    );
  }
);
