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
  AriaListBoxOptions,
  AriaListBoxProps,
  useListBox,
  useListBoxSection,
  useOption
} from 'react-aria/useListBox';

import {
  ClassNameOrFunction,
  ContextValue,
  DEFAULT_SLOT,
  dom,
  DOMRenderProps,
  PossibleLinkDOMRenderProps,
  Provider,
  RenderProps,
  SlotProps,
  StyleProps,
  StyleRenderProps,
  useContextProps,
  useRenderProps,
  useSlot
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
  ItemRenderProps,
  SectionContext,
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
import {DroppableCollectionResult, DroppableItemResult} from 'react-aria/useDroppableCollection';
import {DroppableCollectionState} from 'react-stately/useDroppableCollectionState';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {
  FocusEvents,
  GlobalDOMAttributes,
  HoverEvents,
  Key,
  KeyboardEvents,
  LinkDOMProps,
  PressEvents,
  RefObject
} from '@react-types/shared';
import {FocusScope} from 'react-aria/FocusScope';
import {HeaderContext} from './Header';
import {inertValue} from 'react-aria/private/utils/inertValue';
import {ItemNode, LoaderNode, SectionNode} from 'react-aria/private/collections/BaseCollection';
import {ListKeyboardDelegate} from 'react-aria/ListKeyboardDelegate';
import {ListState, UNSTABLE_useFilteredListState, useListState} from 'react-stately/useListState';
import {
  LoadMoreSentinelProps,
  useLoadMoreSentinel
} from 'react-aria/private/utils/useLoadMoreSentinel';
import {mergeProps} from 'react-aria/mergeProps';
import {Node, Orientation, SelectionBehavior} from '@react-types/shared';
import {createContext, createEffect, createMemo, merge, omit, Show, untrack, useContext, type Ref as ForwardedRef} from 'solid-js';
import {dynamic, type JSX} from '@solidjs/web';
type ReactNode = JSX.Element;
import {SelectableCollectionContext, SelectableCollectionContextValue} from './SelectableCollectionContext';
import {SelectionIndicatorContext} from './SelectionIndicator';
import {SeparatorContext} from './Separator';
import {SharedElementTransition} from './SharedElementTransition';
import {TextContext} from './Text';
import {useCollator} from 'react-aria/useCollator';
import {useFocus} from 'react-aria/useFocus';
import {useFocusRing} from 'react-aria/useFocusRing';
import {useHover} from 'react-aria/useHover';
import {useKeyboard} from 'react-aria/useKeyboard';
import {useLocale} from 'react-aria/I18nProvider';
import {useObjectRef} from 'react-aria/useObjectRef';
import {attachRef, type Ref as ObjectRefInput} from 'react-aria/private/utils/useObjectRef';
import type {TextProps} from './Text';

export interface ListBoxRenderProps {
  /**
   * Whether the listbox has no items and should display its empty state.
   *
   * @selector [data-empty]
   */
  isEmpty: boolean;
  /**
   * Whether the listbox is currently focused.
   *
   * @selector [data-focused]
   */
  isFocused: boolean;
  /**
   * Whether the listbox is currently keyboard focused.
   *
   * @selector [data-focus-visible]
   */
  isFocusVisible: boolean;
  /**
   * Whether the listbox is currently the active drop target.
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
   * State of the listbox.
   */
  state: ListState<unknown>;
}

export interface ListBoxProps<T>
  extends
    Omit<AriaListBoxProps<T>, 'children' | 'label'>,
    CollectionProps<T>,
    StyleRenderProps<ListBoxRenderProps>,
    SlotProps,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-ListBox'
   */
  className?: ClassNameOrFunction<ListBoxRenderProps>;
  /**
   * How multiple selection should behave in the collection.
   *
   * @default 'toggle'
   */
  selectionBehavior?: SelectionBehavior;
  /**
   * The drag and drop hooks returned by `useDragAndDrop` used to enable drag and drop behavior for
   * the ListBox.
   */
  dragAndDropHooks?: DragAndDropHooks<NoInfer<T>>;
  /** Provides content to display when there are no items in the list. */
  renderEmptyState?: (props: ListBoxRenderProps) => ReactNode;
  /**
   * Whether the items are arranged in a stack or grid.
   *
   * @default 'stack'
   */
  layout?: 'stack' | 'grid';
  /**
   * The primary orientation of the items. Usually this is the
   * direction that the collection scrolls.
   *
   * @default 'vertical'
   */
  orientation?: Orientation;
}

export const ListBoxContext = createContext<ContextValue<ListBoxProps<any>, HTMLDivElement>>(null);
export const ListStateContext = createContext<ListState<any> | null>(null);

/**
 * A listbox displays a list of options and allows a user to select one or more of them.
 */
export function ListBox<T>(input: ListBoxProps<T> & {ref?: ForwardedRef<HTMLDivElement>}) {
  let [props, ref] = useContextProps(input, element => attachRef(input.ref as ObjectRefInput<HTMLDivElement>, element as HTMLDivElement), ListBoxContext);
  let state = useContext(ListStateContext);

  // The structure of ListBox is a bit strange because it needs to work inside other components like ComboBox and Select.
  // Those components render two copies of their children so that the collection can be built even when the popover is closed.
  // The first copy sends a collection document via context which we render the collection portal into.
  // The second copy sends a ListState object via context which we use to render the ListBox without rebuilding the state.
  // Otherwise, we have a standalone ListBox, so we need to create a collection and state ourselves.
  if (state) {
    return <ListBoxInner state={state} props={props} listBoxRef={ref} />;
  }

  return (
    <CollectionBuilder content={<Collection {...props} />}>
      {collection => <StandaloneListBox props={props} listBoxRef={ref} collection={collection} />}
    </CollectionBuilder>
  );
}

function StandaloneListBox<T>(input: {props: ListBoxProps<T>; listBoxRef: ForwardedRef<HTMLDivElement>; collection: ListState<T>['collection']}) {
  let props = merge(input.props, {get collection() { return input.collection; }, children: undefined, items: undefined});
  let collectionRenderer = useContext(CollectionRendererContext);
  let state = useListState(merge(props, {get layoutDelegate() { return collectionRenderer.layoutDelegate; }}));
  return <ListBoxInner state={state} props={props} listBoxRef={input.listBoxRef} />;
}

interface ListBoxInnerProps<T> {
  state: ListState<T>;
  props: ListBoxProps<T> &
    AriaListBoxOptions<T> & {filter?: SelectableCollectionContextValue<T>['filter']};
  listBoxRef: ForwardedRef<HTMLDivElement>;
}

function ListBoxInner<T>(input: ListBoxInnerProps<T>) {
  // oxlint-disable-next-line react/react-compiler
  let [props, mergedRef] = useContextProps(input.props, element => attachRef(input.listBoxRef as ObjectRefInput<HTMLDivElement>, element as HTMLDivElement), SelectableCollectionContext);
  let listBoxRef = useObjectRef<HTMLDivElement>(mergedRef as ObjectRefInput<HTMLDivElement>);
  // Hook topology is fixed for this owner, as required by the source warnings below.
  let dragAndDropHooks = untrack(() => props.dragAndDropHooks);
  let layout = () => props.layout ?? 'stack';
  let orientation = () => props.orientation ?? 'vertical';
  // oxlint-disable-next-line react/react-compiler
  let state = UNSTABLE_useFilteredListState(input.state, undefined, () => props.filter);
  let selectionManager = state.selectionManager;
  let isListDraggable = !!dragAndDropHooks?.useDraggableCollectionState;
  let isListDroppable = !!dragAndDropHooks?.useDroppableCollectionState;
  let locale = useLocale();
  let collator = useCollator({usage: 'search', sensitivity: 'base'});
  let collectionRenderer = useContext(CollectionRendererContext);
  let CollectionRoot = collectionRenderer.CollectionRoot;
  let keyboardDelegate = createMemo(
    // oxlint-disable-next-line react/react-compiler
    () =>
      props.keyboardDelegate ||
      new ListKeyboardDelegate({
        collection: state.collection,
        collator,
        ref: listBoxRef,
        disabledKeys: selectionManager.disabledKeys,
        disabledBehavior: selectionManager.disabledBehavior,
        layout: layout(),
        orientation: orientation(),
        direction: locale.direction,
        layoutDelegate: collectionRenderer.layoutDelegate
      })
  );

  let {listBoxProps} = useListBox(
    merge(props, {
      get shouldSelectOnPressUp() { return isListDraggable || props.shouldSelectOnPressUp; },
      get keyboardDelegate() { return keyboardDelegate(); },
      get isVirtualized() { return collectionRenderer.isVirtualized; }
    }),
    state,
    listBoxRef
  );

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
      get collection() { return state.collection; },
      selectionManager,
      preview: dragAndDropHooks.renderDragPreview ? preview : undefined
    });
    // oxlint-disable-next-line react/react-compiler
    dragAndDropHooks.useDraggableCollection!({}, dragState, listBoxRef);

    let DragPreview = dragAndDropHooks.DragPreview!;
    dragPreview = () => dragAndDropHooks.renderDragPreview ? (
      <DragPreview ref={preview}>{dragAndDropHooks.renderDragPreview}</DragPreview>
    ) : null;
  }

  if (isListDroppable && dragAndDropHooks) {
    // oxlint-disable-next-line react/react-compiler
    dropState = dragAndDropHooks.useDroppableCollectionState!({
      get collection() { return state.collection; },
      selectionManager
    });

    let dropTargetDelegate = createMemo(() =>
      dragAndDropHooks.dropTargetDelegate ||
      collectionRenderer.dropTargetDelegate ||
      new dragAndDropHooks.ListDropTargetDelegate(state.collection, listBoxRef, {
        orientation: orientation(),
        layout: layout(),
        direction: locale.direction
       }));
    // oxlint-disable-next-line react/react-compiler
    droppableCollection = dragAndDropHooks.useDroppableCollection!(
      {
        get keyboardDelegate() { return keyboardDelegate(); },
        get dropTargetDelegate() { return dropTargetDelegate(); }
      },
      dropState,
      listBoxRef
    );

    isRootDropTarget = () => dropState!.isDropTarget({type: 'root'});
  }

  let {focusProps, isFocused, isFocusVisible} = useFocusRing();
  let isEmpty = () => state.collection.size === 0;
  let renderValues = {
    get isDropTarget() { return isRootDropTarget(); },
    get isEmpty() { return isEmpty(); },
    get isFocused() { return isFocused(); },
    get isFocusVisible() { return isFocusVisible(); },
    get layout() { return layout(); },
    get orientation() { return orientation(); },
    state
  };
  let renderProps = useRenderProps(merge(omit(props, 'children'), {
    children: undefined,
    defaultClassName: 'react-aria-ListBox',
    values: renderValues
  }));

  let emptyState = () => isEmpty() && props.renderEmptyState ? (
      <div
        // eslint-disable-next-line
        role="option"
        style={{display: 'contents'}}>
        {props.renderEmptyState(renderValues)}
      </div>
    ) : null;

  let DOMProps = filterDOMProps(props, {global: true});

  return (
    <FocusScope>
      <dom.div
        {...mergeProps(
          DOMProps,
          renderProps,
          listBoxProps,
          focusProps,
          droppableCollection?.collectionProps
        )}
        ref={listBoxRef}
        slot={props.slot || undefined}
        onScroll={props.onScroll}
        data-drop-target={isRootDropTarget() || undefined}
        data-empty={isEmpty() || undefined}
        data-focused={isFocused() || undefined}
        data-focus-visible={isFocusVisible() || undefined}
        data-layout={props.layout || 'stack'}
        data-orientation={orientation()}>
        <Provider
          values={[
            [ListBoxContext, props],
            [ListStateContext, state],
            [DragAndDropContext, {dragAndDropHooks, dragState, dropState}],
            [SeparatorContext, {elementType: 'div'}],
            [DropIndicatorContext, {render: ListBoxDropIndicatorWrapper}],
            [SectionContext, {name: 'ListBoxSection', render: ListBoxSectionInner}]
          ]}>
          <SharedElementTransition>
            <CollectionRoot
              collection={state.collection}
              scrollRef={listBoxRef}
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

export interface ListBoxSectionProps<T>
  extends SectionProps<T>, DOMRenderProps<'section', undefined> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element.
   *
   * @default 'react-aria-ListBoxSection'
   */
  className?: string;
}

function ListBoxSectionInner<T>(
  props: ListBoxSectionProps<T>,
  ref: ForwardedRef<HTMLElement>,
  section: Node<T>,
  className = 'react-aria-ListBoxSection'
) {
  let state = useContext(ListStateContext)!;
  let {dragAndDropHooks, dropState} = useContext(DragAndDropContext)!;
  let {CollectionBranch} = useContext(CollectionRendererContext);
  let [headingRef, heading] = useSlot();
  let {headingProps, groupProps} = useListBoxSection({
    get heading() { return heading(); },
    get 'aria-label'() { return props['aria-label'] ?? undefined; }
  });
  let renderProps = useRenderProps(merge(omit(props, 'id', 'children'), {
    id: undefined,
    children: undefined,
    defaultClassName: className,
    values: undefined
  }));

  let DOMProps = omit(filterDOMProps(props as any, {global: true}), 'id');

  return (
    <dom.section {...mergeProps(DOMProps, renderProps, groupProps)} ref={ref}>
      <HeaderContext value={mergeProps(headingProps, {ref: headingRef})}>
        <CollectionBranch
          collection={state.collection}
          parent={section}
          renderDropIndicator={useRenderDropIndicator(dragAndDropHooks, dropState)}
        />
      </HeaderContext>
    </dom.section>
  );
}

/**
 * A ListBoxSection represents a section within a ListBox.
 */
export const ListBoxSection = /*#__PURE__*/ createBranchComponent(SectionNode, ListBoxSectionInner);

export interface ListBoxItemRenderProps extends ItemRenderProps {}

export interface ListBoxItemProps<T = object>
  extends
    Omit<RenderProps<ListBoxItemRenderProps>, 'render'>,
    PossibleLinkDOMRenderProps<'div', ListBoxItemRenderProps>,
    LinkDOMProps,
    HoverEvents,
    PressEvents,
    KeyboardEvents,
    FocusEvents<HTMLDivElement>,
    Omit<GlobalDOMAttributes<HTMLDivElement>, 'onClick'> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-ListBoxItem'
   */
  className?: ClassNameOrFunction<ListBoxItemRenderProps>;
  /** The unique id of the item. */
  id?: Key;
  /**
   * The object value that this item represents. When using dynamic collections, this is set
   * automatically.
   */
  value?: T;
  /** A string representation of the item's contents, used for features like typeahead. */
  textValue?: string;
  /** An accessibility label for this item. */
  'aria-label'?: string;
  /** Whether the item is disabled. */
  isDisabled?: boolean;
  /**
   * Handler that is called when a user performs an action on the item. The exact user event depends
   * on the collection's `selectionBehavior` prop and the interaction modality.
   */
  onAction?: () => void;
}

/**
 * A ListBoxItem represents an individual option in a ListBox.
 */
export const ListBoxItem = /*#__PURE__*/ createLeafComponent(ItemNode, function ListBoxItem<
  T
>(props: ListBoxItemProps<T>, forwardedRef: ForwardedRef<HTMLDivElement>, item: Node<T>) {
  let ref = useObjectRef<HTMLDivElement>(forwardedRef as ObjectRefInput<HTMLDivElement>);
  let state = useContext(ListStateContext)!;
  let {dragAndDropHooks, dragState, dropState} = useContext(DragAndDropContext)!;
  let isDraggable = () =>
    dragState && !(dragState.isDisabled || dragState.selectionManager.isDisabled(item.key));
  let option = useOption(
    {get key() { return item.key; }, get 'aria-label'() { return props['aria-label']; }},
    state,
    ref
  );
  let {optionProps, labelProps, descriptionProps} = option;
  let states = omit(option, 'optionProps', 'labelProps', 'descriptionProps');

  let {hoverProps, isHovered} = useHover({
    get isDisabled() { return !states.allowsSelection() && !states.hasAction() && !isDraggable(); },
    get onHoverStart() { return item.props.onHoverStart; },
    get onHoverChange() { return item.props.onHoverChange; },
    get onHoverEnd() { return item.props.onHoverEnd; }
  });

  let {keyboardProps} = useKeyboard(props);
  let {focusProps} = useFocus(props);

  let draggableItem: DraggableItemResult | null = null;
  if (dragState && dragAndDropHooks) {
    draggableItem = dragAndDropHooks.useDraggableItem!(
      {get key() { return item.key; }, get hasAction() { return states.hasAction(); }},
      dragState
    );
  }

  let droppableItem: DroppableItemResult | null = null;
  if (dropState && dragAndDropHooks) {
    droppableItem = dragAndDropHooks.useDroppableItem!(
      {
        target: {type: 'item', key: item.key, dropPosition: 'on'}
      },
      dropState,
      ref
    );
  }

  let isDragging = () => dragState && dragState.isDragging(item.key);
  let renderProps = useRenderProps<ListBoxItemRenderProps, any>(merge(omit(props, 'id'), {
    id: undefined,
    get children() { return props.children; },
    defaultClassName: 'react-aria-ListBoxItem',
    values: {
      get isSelected() { return states.isSelected(); },
      get isDisabled() { return states.isDisabled(); },
      get isFocused() { return states.isFocused(); },
      get isFocusVisible() { return states.isFocusVisible(); },
      get isPressed() { return states.isPressed(); },
      get allowsSelection() { return states.allowsSelection(); },
      get hasAction() { return states.hasAction(); },
      get isHovered() { return isHovered(); },
      get selectionMode() { return state.selectionManager.selectionMode; },
      get selectionBehavior() { return state.selectionManager.selectionBehavior; },
      allowsDragging: !!dragState,
      get isDragging() { return isDragging(); },
      get isDropTarget() { return droppableItem?.isDropTarget(); }
    }
  }));

  createEffect(() => item.textValue, textValue => {
    if (!textValue && process.env.NODE_ENV !== 'production') {
      console.warn(
        'A `textValue` prop is required for <ListBoxItem> elements with non-plain text children in order to support accessibility features such as type to select.'
      );
    }
  });

  let ElementType = dynamic(() => props.href ? dom.a : dom.div);
  let DOMProps = omit(filterDOMProps(props as any, {global: true}), 'id', 'onClick');
  let linkOptionProps = merge(optionProps, {get tabIndex() {
    return props.href && optionProps.tabIndex == null ? -1 : optionProps.tabIndex;
  }});

  return (
    <ElementType
      {...mergeProps(
        DOMProps,
        renderProps,
        linkOptionProps,
        hoverProps,
        keyboardProps,
        focusProps,
        draggableItem?.dragProps,
        droppableItem?.dropProps,
        // Keep the drag hook's native capture-listener ref alongside the item ref.
        {ref}
      )}
      data-allows-dragging={!!dragState || undefined}
      data-selected={states.isSelected() || undefined}
      data-disabled={states.isDisabled() || undefined}
      data-hovered={isHovered() || undefined}
      data-focused={states.isFocused() || undefined}
      data-focus-visible={states.isFocusVisible() || undefined}
      data-pressed={states.isPressed() || undefined}
      data-dragging={isDragging() || undefined}
      data-drop-target={droppableItem?.isDropTarget() || undefined}
      data-selection-mode={
        state.selectionManager.selectionMode === 'none'
          ? undefined
          : state.selectionManager.selectionMode
      }>
      <Provider
        values={[
          [
            TextContext,
            {
              slots: {
                [DEFAULT_SLOT]: labelProps as TextProps,
                label: labelProps as TextProps,
                description: descriptionProps as TextProps
              }
            }
          ],
           [SelectionIndicatorContext, {get isSelected() { return states.isSelected(); }}]
        ]}>
        {renderProps.children}
      </Provider>
    </ElementType>
  );
});

function ListBoxDropIndicatorWrapper(props: DropIndicatorProps, ref: ForwardedRef<HTMLElement>) {
  let objectRef = useObjectRef(ref as ObjectRefInput<HTMLElement>);
  let {dragAndDropHooks, dropState} = useContext(DragAndDropContext)!;
  // oxlint-disable-next-line react/react-compiler
  let {dropIndicatorProps, isHidden, isDropTarget} = dragAndDropHooks!.useDropIndicator!(
    props,
    dropState!,
    objectRef
  );

  return (
    <Show when={!isHidden()}>{_visible => <ListBoxDropIndicatorForwardRef
      {...props}
      dropIndicatorProps={dropIndicatorProps as JSX.HTMLAttributes<HTMLElement>}
      isDropTarget={isDropTarget()}
      ref={objectRef}
    />}</Show>
  );
}

interface ListBoxDropIndicatorProps extends DropIndicatorProps {
  dropIndicatorProps: JSX.HTMLAttributes<HTMLElement>;
  isDropTarget: boolean;
}

function ListBoxDropIndicator(props: ListBoxDropIndicatorProps & {ref?: ForwardedRef<HTMLElement>}) {
  let otherProps = omit(props, 'dropIndicatorProps', 'isDropTarget', 'ref');

  let renderProps = useRenderProps(merge(otherProps, {
    defaultClassName: 'react-aria-DropIndicator',
    values: {
      get isDropTarget() { return props.isDropTarget; }
    }
  }));

  return (
    <>
      {/* oxlint-disable jsx-a11y/role-has-required-aria-props -- drop indicator is not selectable */}
      <dom.div
        {...props.dropIndicatorProps}
        {...renderProps}
        role="option"
        ref={props.ref as ForwardedRef<HTMLDivElement>}
        data-drop-target={props.isDropTarget || undefined}
      />
      {/* oxlint-enable jsx-a11y/role-has-required-aria-props */}
    </>
  );
}

const ListBoxDropIndicatorForwardRef = ListBoxDropIndicator;

export interface ListBoxLoadMoreItemProps
  extends
    Omit<LoadMoreSentinelProps, 'collection' | 'direction'>,
    StyleProps,
    DOMRenderProps<'div', undefined>,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element.
   *
   * @default 'react-aria-ListBoxLoadingIndicator'
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

export const ListBoxLoadMoreItem = createLeafComponent(
  LoaderNode,
  function ListBoxLoadingIndicator(
    props: ListBoxLoadMoreItemProps,
    ref: ForwardedRef<HTMLDivElement>,
    item: Node<object>
  ) {
    let state = useContext(ListStateContext)!;
    let otherProps = omit(props, 'isLoading', 'onLoadMore', 'scrollOffset');

    let sentinelRef = useObjectRef<HTMLDivElement>();
    let memoedLoadMoreProps = {
        get onLoadMore() { return props.onLoadMore; },
        get collection() { return state.collection; },
        sentinelRef,
        get scrollOffset() { return props.scrollOffset; }
      };
    useLoadMoreSentinel(memoedLoadMoreProps, sentinelRef);
    let renderProps = useRenderProps(merge(omit(otherProps, 'children'), {
      id: undefined,
      get children() { return item.rendered; },
      defaultClassName: 'react-aria-ListBoxLoadingIndicator',
      values: undefined
    }));

    let optionProps = {
      // For Android talkback
      tabIndex: -1
      // For now don't include aria-posinset and aria-setsize on loader since they aren't keyboard focusable
      // Arguably shouldn't include them ever since it might be confusing to the user to include the loaders as part of the
      // item count
    };

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
          <>
            {/* oxlint-disable jsx-a11y/role-has-required-aria-props -- loader row is not selectable */}
            <dom.div
              {...mergeProps(filterDOMProps(props, {global: true}), optionProps)}
              {...renderProps}
              // aria-selected isn't needed here since this option is not selectable.
              role="option"
              ref={ref as ForwardedRef<HTMLDivElement>}>
              {renderProps.children}
            </dom.div>
            {/* oxlint-enable jsx-a11y/role-has-required-aria-props */}
          </>
        )}
      </>
    );
  }
);
