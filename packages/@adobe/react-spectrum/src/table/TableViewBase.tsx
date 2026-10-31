/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import ArrowDownSmall from '@spectrum-icons/ui/ArrowDownSmall';
import {Checkbox} from '../checkbox/Checkbox';
import ChevronDownMedium from '@spectrum-icons/ui/ChevronDownMedium';
import ChevronLeftMedium from '@spectrum-icons/ui/ChevronLeftMedium';
import ChevronRightMedium from '@spectrum-icons/ui/ChevronRightMedium';
import {classNames} from '../utils/classNames';
import {ColumnSize} from 'react-stately/useTableState';
import {
  DropTarget,
  FocusableElement,
  Key,
  RefObject
} from '@react-types/shared';
import type {DragAndDropHooks} from '../dnd/useDragAndDrop';
import type {DraggableCollectionState} from 'react-stately/useDraggableCollectionState';
import type {DraggableItemResult} from 'react-aria/useDraggableCollection';
import type {DropIndicatorAria, DroppableCollectionResult} from 'react-aria/useDroppableCollection';
import type {DroppableCollectionState} from 'react-stately/useDroppableCollectionState';
import {FocusRing} from 'react-aria/FocusRing';
import {FocusScope} from 'react-aria/FocusScope';
import {getActiveElement, isFocusWithin} from 'react-aria/private/utils/shadowdom/DOMFunctions';
import {
  getInteractionModality,
  isFocusVisible
} from 'react-aria/private/interactions/useFocusVisible';
import {GridNode} from 'react-stately/private/grid/GridCollection';
import {HoverProps, useHover} from 'react-aria/useHover';
import {InsertionIndicator} from './InsertionIndicator';
import intlMessages from '../../intl/table/*.json';
import {isAndroid} from 'react-aria/private/utils/platform';
import {Item} from 'react-stately/Item';
import {LayoutInfo, Rect, ReusableView} from 'react-stately/useVirtualizerState';
import {layoutInfoToStyle, VirtualizerItem} from 'react-aria/private/virtualizer/VirtualizerItem';
import ListGripper from '@spectrum-icons/ui/ListGripper';
import {ListKeyboardDelegate} from 'react-aria/ListKeyboardDelegate';
import {Menu} from '../menu/Menu';
import {MenuTrigger} from '../menu/MenuTrigger';
import {mergeProps} from 'react-aria/mergeProps';
import {Nubbin} from './Nubbin';
import {ProgressCircle} from '../progress/ProgressCircle';
import {createContext, createEffect, createMemo, createSignal, For, merge, omit, untrack, useContext, type Accessor} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {attachRef, useObjectRef, type Ref} from 'react-aria/private/utils/useObjectRef';
import {Resizer, ResizeStateContext} from './Resizer';
import {RootDropIndicator} from './RootDropIndicator';
import {scrollIntoView, scrollIntoViewport} from 'react-aria/private/utils/scrollIntoView';
import {ScrollView} from 'react-aria/private/virtualizer/ScrollView';
import {setScrollLeft} from 'react-aria/private/virtualizer/utils';
import {SpectrumColumnProps} from './types';
import {DragPreview as SpectrumDragPreview} from './DragPreview';
import {SpectrumTableProps} from './TableView';
import styles from '@adobe/spectrum-css-temp/components/table/vars.css';
import stylesOverrides from './table.css';
import {ITableCollection as TableCollection} from 'react-stately/private/table/TableCollection';
import {TableState, useTableColumnResizeState} from 'react-stately/useTableState';
import {TableViewLayout} from './TableViewLayout';
import {Tooltip} from '../tooltip/Tooltip';
import {TooltipTrigger} from '../tooltip/TooltipTrigger';
import {TreeGridState} from 'react-stately/private/table/useTreeGridState';
import {useButton} from 'react-aria/useButton';
import {useDOMRef, useFocusableRef, useUnwrapDOMRef, type DOMRef, type FocusableRef} from '../utils/useDOMRef';
import {useFocusRing} from 'react-aria/useFocusRing';
import {useLoadMore} from 'react-aria/private/utils/useLoadMore';
import {useLocale} from 'react-aria/I18nProvider';
import {useLocalizedStringFormatter} from 'react-aria/useLocalizedStringFormatter';
import {usePress} from 'react-aria/usePress';
import {useProvider, useProviderProps} from '../provider/Provider';
import {useStyleProps} from '../utils/styleProps';
import {
  useTable,
  useTableCell,
  useTableColumnHeader,
  useTableHeaderRow,
  useTableRow,
  useTableRowGroup,
  useTableSelectAllCheckbox,
  useTableSelectionCheckbox
} from 'react-aria/useTable';
import {useVirtualizerState} from 'react-stately/useVirtualizerState';
import {useVisuallyHidden, VisuallyHidden} from 'react-aria/VisuallyHidden';

const DEFAULT_HEADER_HEIGHT = {
  medium: 34,
  large: 40
};

const DEFAULT_HIDE_HEADER_CELL_WIDTH = {
  medium: 38,
  large: 46
};

const ROW_HEIGHTS = {
  compact: {
    medium: 32,
    large: 40
  },
  regular: {
    medium: 40,
    large: 50
  },
  spacious: {
    medium: 48,
    large: 60
  }
};

const SELECTION_CELL_DEFAULT_WIDTH = {
  medium: 38,
  large: 48
};

const DRAG_BUTTON_CELL_DEFAULT_WIDTH = {
  medium: 16,
  large: 20
};

const LEVEL_OFFSET_WIDTH = {
  medium: 16,
  large: 20
};

export interface TableContextValue<T> {
  state: TableState<T>;
  dragState: DraggableCollectionState | null;
  dropState: DroppableCollectionState | null;
  dragAndDropHooks?: DragAndDropHooks<T>['dragAndDropHooks'];
  isTableDraggable: boolean;
  isTableDroppable: boolean;
  layout: TableViewLayout<T>;
  headerRowHovered: boolean;
  isInResizeMode: boolean;
  setIsInResizeMode: (val: boolean) => void;
  isEmpty: boolean;
  onFocusedResizer: () => void;
  onResizeStart?: (widths: Map<Key, ColumnSize>) => void;
  onResize?: (widths: Map<Key, ColumnSize>) => void;
  onResizeEnd?: (widths: Map<Key, ColumnSize>) => void;
  headerMenuOpen: boolean;
  setHeaderMenuOpen: (val: boolean) => void;
  renderEmptyState?: () => JSX.Element;
}

export const TableContext = createContext<TableContextValue<unknown> | null>(null);
export function useTableContext(): TableContextValue<unknown> {
  return useContext(TableContext)!;
}

export const VirtualizerContext = createContext<{width: number; key: Key | null} | null>(
  null
);
export function useVirtualizerContext(): {
  width: number;
  key: Key | null;
} | null {
  return useContext(VirtualizerContext);
}

interface TableBaseProps<T> extends SpectrumTableProps<T> {
  state: TableState<T> | TreeGridState<T>;
}

type View = ReusableView<GridNode<unknown>, JSX.Element>;

function TableViewBase<T extends object>(input: TableBaseProps<T> & {ref?: DOMRef<HTMLDivElement>}) {
  // oxlint-disable-next-line react/react-compiler
  let props = useProviderProps(input);
  // The wrapper creates one native state engine for this component lifetime.
  // Capture its identity, not a snapshot of its live state fields.
  let state = untrack(() => props.state);
  // Hook presence is setup-owned, as in source. Live presence changes still
  // report the original warnings rather than allocating hooks from an effect.
  let dragAndDropHooks = untrack(() => props.dragAndDropHooks);
  let isTableDraggable = () => !!props.dragAndDropHooks?.useDraggableCollectionState;
  let isTableDroppable = () => !!props.dragAndDropHooks?.useDroppableCollectionState;
  let dragHooksProvided = {current: untrack(isTableDraggable)};
  let dropHooksProvided = {current: untrack(isTableDroppable)};
  createEffect(() => ({draggable: isTableDraggable(), droppable: isTableDroppable(), state: props.state}), ({draggable, droppable, state}) => {
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
    if ('keyMap' in state && (draggable || droppable)) {
      console.warn(
        'Drag and drop is not yet fully supported with expandable rows and may produce unexpected results.'
      );
    }
  });

  let {styleProps} = useStyleProps(props);
  let provider = useProvider();

  // Starts when the user selects resize from the menu, ends when resizing ends
  // used to control the visibility of the resizer Nubbin
  let [isInResizeMode, setIsInResizeMode] = createSignal(false);
  // Starts when the resizer is actually moved
  // entering resizing/exiting resizing doesn't trigger a render
  // with table layout, so we need to track it here
  let [, setIsResizing] = createSignal(false);

  let domRef = useDOMRef<HTMLDivElement>(handle => attachRef(input.ref, handle));
  let headerRef = useObjectRef<HTMLDivElement>();
  let bodyRef = useObjectRef<HTMLDivElement>();

  let density = () => props.density || 'regular';
  let layout = createMemo(
    () =>
      new TableViewLayout<T>({
        // If props.rowHeight is auto, then use estimated heights based on scale, otherwise use fixed heights.
        rowHeight: props.overflowMode === 'wrap' ? undefined : ROW_HEIGHTS[density()][provider.scale],
        estimatedRowHeight: props.overflowMode === 'wrap' ? ROW_HEIGHTS[density()][provider.scale] : undefined,
        headingHeight: props.overflowMode === 'wrap' ? undefined : DEFAULT_HEADER_HEIGHT[provider.scale],
        estimatedHeadingHeight:
          props.overflowMode === 'wrap' ? DEFAULT_HEADER_HEIGHT[provider.scale] : undefined
      })
    // don't recompute when state.collection changes, only used for initial value

  );

  let dragState: DraggableCollectionState | null = null;
  let preview = useObjectRef<import('react-aria/useDrag').DragPreviewRenderer>();
  if (dragHooksProvided.current && dragAndDropHooks) {
    // oxlint-disable-next-line react/react-compiler
    dragState = dragAndDropHooks.useDraggableCollectionState!({
      get collection() {return state.collection;},
      get selectionManager() {return state.selectionManager;},
      preview
    });
    // oxlint-disable-next-line react/react-compiler
    dragAndDropHooks.useDraggableCollection!({}, dragState, domRef);
  }

  let DragPreview = dragAndDropHooks?.DragPreview;
  let dropState: DroppableCollectionState | null = null;
  let droppableCollection: DroppableCollectionResult | null = null;
  let isRootDropTarget = () => dropState?.isDropTarget({type: 'root'}) ?? false;
  if (dropHooksProvided.current && dragAndDropHooks) {
    // oxlint-disable-next-line react/react-compiler
    dropState = dragAndDropHooks.useDroppableCollectionState!({
      get collection() {return state.collection;},
      get selectionManager() {return state.selectionManager;}
    });
    // oxlint-disable-next-line react/react-compiler
    let keyboardDelegate = createMemo(() => new ListKeyboardDelegate({
      collection: state.collection,
      disabledKeys: state.selectionManager.disabledKeys,
      ref: domRef,
      layoutDelegate: layout()
    }));
    droppableCollection = dragAndDropHooks.useDroppableCollection!(
      {
        get keyboardDelegate() {return keyboardDelegate();},
        get dropTargetDelegate() {return layout();}
      },
      dropState,
      domRef
    );

  }

  let {gridProps} = useTable(
    merge(props, {
      isVirtualized: true,
      get layoutDelegate() {return layout();},
      get onRowAction() {return props.onAction;},
      scrollRef: bodyRef
    }),
    state,
    domRef
  );
  let [headerMenuOpen, setHeaderMenuOpen] = createSignal(false);
  let [headerRowHovered, setHeaderRowHovered] = createSignal(false);

  // This overrides collection view's renderWrapper to support DOM hierarchy.
  let renderWrapper =
    (
      parent: View | null,
      reusableView: View,
      children: View[],
      renderChildren: (views: View[]) => JSX.Element
    ): JSX.Element => {
      if (reusableView.viewType === 'rowgroup') {
        return (
          <TableRowGroup
            layoutInfo={reusableView.layoutInfo!}
            parent={parent?.layoutInfo ?? null}
            // Override the default role="rowgroup" with role="presentation",
            // in favor or adding role="rowgroup" to the ScrollView with
            // ref={bodyRef} in the TableVirtualizer below.
            role="presentation">
            {renderChildren(children)}
          </TableRowGroup>
        );
      }

      if (reusableView.viewType === 'header') {
        return (
          <TableHeader
            layoutInfo={reusableView.layoutInfo!}
            parent={parent?.layoutInfo ?? null}>
            {renderChildren(children)}
          </TableHeader>
        );
      }

      if (reusableView.viewType === 'row') {
        return (
          <TableRow
            item={reusableView.content!}
            layoutInfo={reusableView.layoutInfo!}
            parent={parent?.layoutInfo ?? null}>
            {renderChildren(children)}
          </TableRow>
        );
      }

      if (reusableView.viewType === 'headerrow') {
        return (
          <TableHeaderRow
            onHoverChange={setHeaderRowHovered}
            layoutInfo={reusableView.layoutInfo!}
            parent={parent?.layoutInfo ?? null}
            item={reusableView.content!}>
            {renderChildren(children)}
          </TableHeaderRow>
        );
      }

      return (
        <TableCellWrapper
          layoutInfo={reusableView.layoutInfo!}
          virtualizer={reusableView.virtualizer}
          parent={parent!}>
          {reusableView.rendered}
        </TableCellWrapper>
      );
    };

  let renderView = (type: string, item: GridNode<T> | null): JSX.Element => {
    // The source engine caches rendered values. Cache an owned JSX factory,
    // never a mounted cell created under the projection computation.
    return <>{(() => {
    if (!item) {return null;}
    switch (type) {
      case 'header':
      case 'rowgroup':
      case 'section':
      case 'row':
      case 'headerrow':
        return null;
      case 'cell': {
        if (item.props.isSelectionCell) {
          return <TableCheckboxCell cell={item} />;
        }

        if (item.props.isDragButtonCell) {
          return <TableDragCell cell={item} />;
        }

        return <TableCell cell={item} />;
      }
      case 'placeholder':
        // TODO: move to react-aria?
        return (
          <div
            role="gridcell"
            aria-colindex={item.index + 1}
            aria-colspan={item.colSpan != null && item.colSpan > 1 ? item.colSpan : undefined}
          />
        );
      case 'column':
        if (item.props.isSelectionCell) {
          return <TableSelectAllCell column={item} />;
        }

        if (item.props.isDragButtonCell) {
          return <TableDragHeaderCell column={item} />;
        }

        // TODO: consider this case, what if we have hidden headers and a empty table
        if (item.props.hideHeader) {
          return (
            <TooltipTrigger placement="top" trigger="focus">
              <TableColumnHeader column={item} />
              <Tooltip placement="top">{item.rendered}</Tooltip>
            </TooltipTrigger>
          );
        }

        if (item.props.allowsResizing && !item.hasChildNodes) {
          return <ResizableTableColumnHeader column={item} />;
        }

        return <TableColumnHeader column={item} />;
      case 'loader':
        return <LoadingState />;
      case 'empty': {
        return <EmptyState />;
      }
    }
    return null;
    })()}</>;
  };

  let [isVerticalScrollbarVisible, setVerticalScollbarVisible] = createSignal(false);
  let [isHorizontalScrollbarVisible, setHorizontalScollbarVisible] = createSignal(false);
  let viewport = {current: {x: 0, y: 0, width: 0, height: 0}};
  let onVisibleRectChange = (e: Rect) => {
    if (viewport.current.width === e.width && viewport.current.height === e.height) {
      return;
    }
    viewport.current = e;
    if (bodyRef.current) {
      setVerticalScollbarVisible(bodyRef.current.clientWidth + 2 < bodyRef.current.offsetWidth);
      setHorizontalScollbarVisible(bodyRef.current.clientHeight + 2 < bodyRef.current.offsetHeight);
    }
  };
  let {isFocusVisible, focusProps} = useFocusRing();
  let isEmpty = () => state.collection.size === 0;

  let onFocusedResizer = () => {
    if (bodyRef.current && headerRef.current) {
      bodyRef.current.scrollLeft = headerRef.current.scrollLeft;
    }
  };

  let onResizeStart =
    (widths: Map<Key, ColumnSize>) => {
      setIsResizing(true);
      props.onResizeStart?.(widths);
    };
  let onResizeEnd =
    (widths: Map<Key, ColumnSize>) => {
      setIsInResizeMode(false);
      setIsResizing(false);
      props.onResizeEnd?.(widths);
    };

  let focusedKey = () => state.selectionManager.focusedKey;
  let dropTargetKey = (): Key | null => {
  let dropTargetKey: Key | null = null;
  if (dropState?.target?.type === 'item') {
    dropTargetKey = dropState.target.key;
    if (
      dropState.target.dropPosition === 'before' &&
      dropTargetKey !== state.collection.getFirstKey()
    ) {
      // Normalize to the "after" drop position since we only render those in the DOM.
      // The exception to this is for the first row in the table, where we also render the "before" position.
      dropTargetKey = state.collection.getKeyBefore(dropTargetKey);
    }
  }
  return dropTargetKey;
  };

  let persistedKeys = createMemo(() => new Set([focusedKey(), dropTargetKey()].filter((k): k is Key => k != null)));

  let mergedProps = mergeProps(
    merge(() => isTableDroppable() ? droppableCollection?.collectionProps ?? {} : {}),
    gridProps,
    focusProps
  );

  mergedProps = merge(mergedProps, {get tabIndex() {return props.dragAndDropHooks?.isVirtualDragging?.() ? undefined : gridProps.tabIndex;}});

  return (
    <TableContext
      value={{
        state: state as TableState<unknown>,
        dragState,
        dropState,
        get dragAndDropHooks() {return props.dragAndDropHooks;},
        get isTableDraggable() {return isTableDraggable();},
        get isTableDroppable() {return isTableDroppable();},
        get layout() {return layout() as TableViewLayout<unknown>;},
        onResizeStart,
        get onResize() {return props.onResize;},
        onResizeEnd,
        get headerRowHovered() {return headerRowHovered();},
        get isInResizeMode() {return isInResizeMode();},
        setIsInResizeMode,
        get isEmpty() {return isEmpty();},
        onFocusedResizer,
        get headerMenuOpen() {return headerMenuOpen();},
        setHeaderMenuOpen,
        get renderEmptyState() {return props.renderEmptyState;}
      }}>
      <TableVirtualizer
        {...mergedProps as JSX.HTMLAttributes<HTMLDivElement>}
        {...styleProps as unknown as JSX.HTMLAttributes<HTMLDivElement>}
        class={classNames(
          styles,
          'spectrum-Table',
          `spectrum-Table--${density()}`,
          {
            'spectrum-Table--quiet': props.isQuiet,
            'spectrum-Table--wrap': props.overflowMode === 'wrap',
            'spectrum-Table--loadingMore':
              state.collection.body.props.loadingState === 'loadingMore',
            'spectrum-Table--isVerticalScrollbarVisible': isVerticalScrollbarVisible(),
            'spectrum-Table--isHorizontalScrollbarVisible': isHorizontalScrollbarVisible()
          },
          classNames(stylesOverrides, 'react-spectrum-Table'),
          styleProps.class as string | undefined
        )}
        tableState={state as TableState<T>}
        layout={layout()}
        collection={state.collection}
        persistedKeys={persistedKeys()}
        renderView={renderView}
        renderWrapper={renderWrapper}
        onVisibleRectChange={onVisibleRectChange}
        domRef={domRef}
        headerRef={headerRef}
        bodyRef={bodyRef}
        isFocusVisible={isFocusVisible()}
        isVirtualDragging={dragAndDropHooks?.isVirtualDragging?.() || false}
        isRootDropTarget={isRootDropTarget()}
      />
      {DragPreview && isTableDraggable() && dragAndDropHooks && dragState && (
        <DragPreview ref={preview}>
          {() => {
            if (dragState.draggedKey == null) {
              return null;
            }
            if (dragAndDropHooks.renderPreview) {
              return dragAndDropHooks.renderPreview(dragState.draggingKeys, dragState.draggedKey);
            }
            let itemCount = dragState.draggingKeys.size;
            let maxWidth = bodyRef.current!.getBoundingClientRect().width;
            let height = ROW_HEIGHTS[density()][provider.scale];
            let itemText = state.collection.getTextValue!(dragState.draggedKey);
            return (
              <SpectrumDragPreview
                itemText={itemText}
                itemCount={itemCount}
                height={height}
                maxWidth={maxWidth}
              />
            );
          }}
        </DragPreview>
      )}
    </TableContext>
  );
}

interface TableVirtualizerProps<T> extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onScroll'> {
  tabIndex?: number;
  tableState: TableState<T>;
  layout: TableViewLayout<T>;
  collection: TableCollection<T>;
  persistedKeys: Set<Key> | null;
  renderView: (type: string, content: GridNode<T> | null) => JSX.Element;
  renderWrapper: (
    parent: View | null,
    reusableView: View,
    children: View[],
    renderChildren: (views: View[]) => JSX.Element
  ) => JSX.Element;
  domRef: RefObject<HTMLDivElement | null>;
  bodyRef: RefObject<HTMLDivElement | null>;
  headerRef: RefObject<HTMLDivElement | null>;
  onVisibleRectChange: (rect: Rect) => void;
  isFocusVisible: boolean;
  isVirtualDragging: boolean;
  isRootDropTarget: boolean;
}

// This is a custom Virtualizer that also has a header that syncs its scroll position with the body.
function TableVirtualizer<T>(props: TableVirtualizerProps<T>) {
  let tableState = untrack(() => props.tableState);
  let domRef = {get current() {return props.domRef.current;}};
  let bodyRef = {get current() {return props.bodyRef.current;}};
  let headerRef = {get current() {return props.headerRef.current;}};
  let otherProps = omit(props, 'tableState', 'layout', 'collection', 'persistedKeys', 'renderView', 'renderWrapper', 'domRef', 'bodyRef', 'headerRef', 'onVisibleRectChange', 'isFocusVisible', 'isVirtualDragging', 'isRootDropTarget');
  let locale = useLocale();
  let loadingState = () => props.collection.body.props.loadingState;
  let isLoading = () => loadingState() === 'loading' || loadingState() === 'loadingMore';
  let [tableWidth, setTableWidth] = createSignal(0);
  let provider = useProvider();

  const getDefaultWidth =
    ({
      props: {hideHeader, isSelectionCell, showDivider, isDragButtonCell}
    }: GridNode<T>): ColumnSize | null | undefined => {
      if (hideHeader) {
        let width = DEFAULT_HIDE_HEADER_CELL_WIDTH[provider.scale];
        return showDivider ? width + 1 : width;
      } else if (isSelectionCell) {
        return SELECTION_CELL_DEFAULT_WIDTH[provider.scale];
      } else if (isDragButtonCell) {
        return DRAG_BUTTON_CELL_DEFAULT_WIDTH[provider.scale];
      }
    };

  const getDefaultMinWidth =
    ({
      props: {hideHeader, isSelectionCell, showDivider, isDragButtonCell}
    }: GridNode<T>): ColumnSize | null | undefined => {
      if (hideHeader) {
        let width = DEFAULT_HIDE_HEADER_CELL_WIDTH[provider.scale];
        return showDivider ? width + 1 : width;
      } else if (isSelectionCell) {
        return SELECTION_CELL_DEFAULT_WIDTH[provider.scale];
      } else if (isDragButtonCell) {
        return DRAG_BUTTON_CELL_DEFAULT_WIDTH[provider.scale];
      }
      return 75;
    };

  let columnResizeState = useTableColumnResizeState(
    {
      get tableWidth() {return tableWidth();},
      getDefaultWidth,
      getDefaultMinWidth
    },
    tableState
  );

  let layoutOptions = createMemo(() => ({columnWidths: columnResizeState.columnWidths}));
  let state = useVirtualizerState<GridNode<unknown>, JSX.Element>({
    get layout() {return props.layout as TableViewLayout<unknown>;},
    get collection() {return props.collection as TableCollection<unknown>;},
    renderView: (type, item) => props.renderView(type, item as GridNode<T> | null),
    onVisibleRectChange(rect) {
      if (bodyRef.current) {
        bodyRef.current.scrollTop = rect.y;
        setScrollLeft(bodyRef.current, locale.direction, rect.x);
      }
    },
    get persistedKeys() {return props.persistedKeys;},
    get layoutOptions() {return layoutOptions();}
  });

  useLoadMore({get isLoading() {return isLoading();}, get onLoadMore() {return props.collection.body.props.onLoadMore;}, scrollOffset: 1}, bodyRef);
  let onVisibleRectChange =
    (rect: Rect) => {
      state.setVisibleRect(rect);
    };

  let onVisibleRectChangeMemo =
    (rect: Rect) => {
      setTableWidth(rect.width);
      onVisibleRectChange(rect);
      props.onVisibleRectChange(rect);
    };

  // this effect runs whenever the contentSize changes, it doesn't matter what the content size is
  // only that it changes in a resize, and when that happens, we want to sync the body to the
  // header scroll position
  createEffect(() => ({contentSize: state.contentSize, header: headerRef.current, body: bodyRef.current, dom: domRef.current}), ({header, body, dom}) => {
    if (
      getInteractionModality() === 'keyboard' &&
      header &&
      isFocusWithin(header) &&
      body
    ) {
      let activeElement = getActiveElement() as HTMLElement;
      scrollIntoView(header, activeElement);
      scrollIntoViewport(activeElement, {containingElement: dom});
      body.scrollLeft = header.scrollLeft;
    }
  });

  let headerHeight = () => {state.contentSize; return props.layout.getLayoutInfo('header')?.rect.height || 0;};

  // Sync the scroll position from the table body to the header container.
  let onScroll = () => {
    if (headerRef.current && bodyRef.current) {
      headerRef.current.scrollLeft = bodyRef.current.scrollLeft;
    }
  };

  let resizerPosition = () => {
    // LayoutInfo and Virtualizer fields are mutable source-engine data. Read
    // its live projection before consuming them, including scroll-only changes.
    state.visibleViews;
    return columnResizeState.resizingColumn != null
      ? props.layout.getLayoutInfo(columnResizeState.resizingColumn)!.rect.maxX - 2
      : 0;
  };

  let resizerAtEdge = () =>
    resizerPosition() >
    Math.max(state.virtualizer.contentSize.width, state.virtualizer.visibleRect.width) - 3;
  // this should be fine, every movement of the resizer causes a rerender
  // scrolling can cause it to lag for a moment, but it's always updated
  let resizerInVisibleRegion = () => resizerPosition() < state.virtualizer.visibleRect.maxX;
  let shouldHardCornerResizeCorner = () => resizerAtEdge() && resizerInVisibleRegion();

  // minimize re-render caused on Resizers by memoing this
  let resizingColumnWidth = () =>
    columnResizeState.resizingColumn != null
      ? columnResizeState.getColumnWidth(columnResizeState.resizingColumn)
      : 0;
  let resizingColumn = createMemo(
    () => ({
      width: resizingColumnWidth(),
      key: columnResizeState.resizingColumn
    })
  );

  otherProps = merge(otherProps, {get tabIndex() {return props.isVirtualDragging ? undefined : props.tabIndex;}});

  let scrollPadding = () => {
  let firstColumn = props.collection.columns[0];
  let scrollPadding = 0;
  if (firstColumn.props.isSelectionCell || firstColumn.props.isDragButtonCell) {
    scrollPadding = columnResizeState.getColumnWidth(firstColumn.key);
  }
  return scrollPadding;
  };

  // Keep both source branches under their ResizeState/ScrollView owners.
  let headerViews = () => renderChildren(null, () => state.visibleViews.slice(0, 1), () => props.renderWrapper, () => state.visibleViews);
  let bodyViews = () => renderChildren(null, () => state.visibleViews.slice(1, 2), () => props.renderWrapper, () => state.visibleViews);

  return (
    <VirtualizerContext value={merge(() => resizingColumn())}>
      <FocusScope>
        <div {...otherProps} ref={element => attachRef(props.domRef, element)}>
          <div
            role="presentation"
            class={classNames(styles, 'spectrum-Table-headWrapper')}
            style={{
              height: `${headerHeight()}px`,
              overflow: 'hidden',
              position: 'relative',
              'will-change': state.isScrolling ? 'scroll-position' : undefined,
              'scroll-padding-inline-start': `${scrollPadding()}px`
            }}
            ref={element => attachRef(props.headerRef, element)}>
            <ResizeStateContext value={columnResizeState}>
              {headerViews()}
            </ResizeStateContext>
          </div>
          <ScrollView
            class={classNames(
              styles,
              'spectrum-Table-body',
              {
                'focus-ring': props.isFocusVisible,
                'spectrum-Table-body--resizerAtTableEdge': shouldHardCornerResizeCorner()
              },
              classNames(stylesOverrides, 'react-spectrum-Table-body', {
                'react-spectrum-Table-body--dropTarget': !!props.isRootDropTarget
              })
            )}
            //  Firefox and Chrome make generic elements using CSS overflow 'scroll' or 'auto' tabbable,
            //  including them within the accessibility tree, which breaks the table structure in Firefox.
            //  Using tabIndex={-1} prevents the ScrollView from being tabbable, and using role="rowgroup"
            //  here and role="presentation" on the table body content fixes the table structure.
            role="rowgroup"
            tabindex={props.isVirtualDragging ? undefined : -1}
            style={{
              flex: 1,
              'scroll-padding-inline-start': `${scrollPadding()}px`
            }}
            innerStyle={{overflow: 'visible'}}
            ref={element => attachRef(props.bodyRef, element)}
            contentSize={state.contentSize}
            onVisibleRectChange={onVisibleRectChangeMemo}
            onScrollStart={state.startScrolling}
            onScrollEnd={state.endScrolling}
            onScroll={onScroll}>
            {bodyViews()}
            <div
              class={classNames(styles, 'spectrum-Table-bodyResizeIndicator')}
              style={{
                [locale.direction === 'ltr' ? 'left' : 'right']: `${resizerPosition()}px`,
                height: `${Math.max(state.virtualizer.contentSize.height, state.virtualizer.visibleRect.height)}px`,
                display: columnResizeState.resizingColumn ? 'block' : 'none'
              }}
            />
          </ScrollView>
        </div>
      </FocusScope>
    </VirtualizerContext>
  );
}

function renderChildren<T extends object>(
  parent: View | null,
  views: Accessor<View[]>,
  renderWrapper: Accessor<NonNullable<TableVirtualizerProps<T>['renderWrapper']>>,
  readProjection: () => unknown
) {
  return <For each={views()}>{view => {
    let liveView = new Proxy(view, {
      get(target, key) {readProjection(); return Reflect.get(target, key, target);}
    });
    let children = new Proxy([] as View[], {
      get(_target, key) {
        let current = liveView.children ? Array.from(liveView.children) : [];
        return Reflect.get(current, key, current);
      }
    });
    return <>{renderWrapper()(parent, liveView, children, childViews =>
      renderChildren(liveView, () => childViews, renderWrapper, readProjection)
    )}</>;
  }}</For>;
}

function useStyle(layoutInfo: () => LayoutInfo, parent: () => LayoutInfo | null) {
  let locale = useLocale();
  return () => {
  let style = layoutInfoToStyle(layoutInfo(), locale.direction, parent());
  if (style.overflow === 'hidden') {
    style.overflow = 'visible'; // needed to support position: sticky
  }
  return style;
  };
}

function TableHeader(props: {
  children: JSX.Element;
  layoutInfo: LayoutInfo;
  parent: LayoutInfo | null;
}) {
  let otherProps = omit(props, 'children', 'layoutInfo', 'parent');
  let {rowGroupProps} = useTableRowGroup();
  let style = useStyle(() => props.layoutInfo, () => props.parent);

  return (
    <div
      {...rowGroupProps as JSX.HTMLAttributes<HTMLDivElement>}
      {...otherProps}
      class={classNames(styles, 'spectrum-Table-head')}
      style={style()}>
      {props.children}
    </div>
  );
}

function TableColumnHeader(props: {column: GridNode<unknown>}) {
  let column = merge(() => props.column);
  let ref = useObjectRef<HTMLDivElement>();
  let context = useTableContext();
  let state = context.state;
  let {pressProps, isPressed} = usePress({get isDisabled() {return context.isEmpty;}});
  let columnProps = merge(() => column.props as SpectrumColumnProps<unknown>);
  createEffect(() => ({hasChildNodes: column.hasChildNodes, key: column.key, allowsResizing: columnProps.allowsResizing}), ({hasChildNodes, key, allowsResizing}) => {
    if (
      hasChildNodes &&
      allowsResizing &&
      process.env.NODE_ENV !== 'production'
    ) {
      console.warn(`Column key: ${key}. Columns with child columns don't allow resizing.`);
    }
  });

  let {columnHeaderProps} = useTableColumnHeader(
    {
      get node() {return props.column;},
      isVirtualized: true
    },
    state,
    ref
  );

  let {hoverProps, isHovered} = useHover({get isDisabled() {return context.isEmpty;}});

  const allProps = [columnHeaderProps, hoverProps, pressProps];

  return (
    <FocusRing focusRingClass={classNames(styles, 'focus-ring')}>
      {compose => (
      <div
        {...compose(mergeProps(...allProps, {get class() {return classNames(
          styles,
          'spectrum-Table-headCell',
          {
            'is-active': isPressed(),
            'is-sortable': columnProps.allowsSorting,
            'is-sorted-desc': state.sortDescriptor?.column === column.key && state.sortDescriptor?.direction === 'descending',
            'is-sorted-asc': state.sortDescriptor?.column === column.key && state.sortDescriptor?.direction === 'ascending',
            'is-hovered': isHovered(),
            'spectrum-Table-cell--hideHeader': columnProps.hideHeader
          },
          classNames(stylesOverrides, 'react-spectrum-Table-cell', {
            'react-spectrum-Table-cell--alignCenter': columnProps.align === 'center' || (column.colSpan ?? 0) > 1,
            'react-spectrum-Table-cell--alignEnd': columnProps.align === 'end'
          })
        );}})) as JSX.HTMLAttributes<HTMLDivElement>}
        ref={ref}
        >
        {columnProps.allowsSorting && (
          <ArrowDownSmall UNSAFE_className={classNames(styles, 'spectrum-Table-sortedIcon')} />
        )}
        {columnProps.hideHeader ? (
          <VisuallyHidden>{column.rendered}</VisuallyHidden>
        ) : (
          <div class={classNames(styles, 'spectrum-Table-headCellContents')}>
            {column.rendered}
          </div>
        )}
      </div>
      )}
    </FocusRing>
  );
}

let TableColumnHeaderButton = (props: Parameters<typeof useButton>[0] & {
  children?: JSX.Element;
  focusProps: import('@react-types/shared').DOMAttributes;
  alignment: string;
  ref?: FocusableRef<HTMLDivElement>;
}) => {
  let otherProps = omit(props, 'focusProps', 'alignment', 'ref', 'children');
  let context = useTableContext();
  let domRef = useFocusableRef<HTMLDivElement>(handle => attachRef(props.ref, handle));
  let {buttonProps} = useButton(merge(otherProps, {elementType: 'div', get isDisabled() {return context.isEmpty;}}), domRef);
  let {hoverProps, isHovered} = useHover(merge(otherProps, {get isDisabled() {return context.isEmpty;}}));

  return (
    <div
      class={classNames(styles, 'spectrum-Table-headCellContents', {
        'is-hovered': isHovered()
      })}
      {...hoverProps as JSX.HTMLAttributes<HTMLDivElement>}>
      <div
        class={classNames(styles, 'spectrum-Table-headCellButton', {
          'spectrum-Table-headCellButton--alignStart': props.alignment === 'start',
          'spectrum-Table-headCellButton--alignCenter': props.alignment === 'center',
          'spectrum-Table-headCellButton--alignEnd': props.alignment === 'end'
        })}
        {...mergeProps(buttonProps, merge(() => props.focusProps))}
        ref={domRef}>
        {props.children}
      </div>
    </div>
  );
};

function ResizableTableColumnHeader(props: {column: GridNode<unknown>}) {
  let column = merge(() => props.column);
  let ref = useObjectRef<HTMLDivElement>();
  let triggerRef = useObjectRef<import('@react-types/shared').FocusableRefValue<HTMLDivElement>>();
  let resizingRef = useObjectRef<HTMLDivElement>();
  let context = useTableContext();
  let state = context.state;
  let columnResizeState = useContext(ResizeStateContext)!;
  let stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-spectrum/table');
  let {pressProps, isPressed} = usePress({get isDisabled() {return context.isEmpty;}});
  let {columnHeaderProps} = useTableColumnHeader(
    {
      get node() {return props.column;},
      isVirtualized: true
    },
    state,
    ref
  );

  let {hoverProps, isHovered} = useHover({get isDisabled() {return context.isEmpty || context.headerMenuOpen;}});

  const allProps = [columnHeaderProps, pressProps, hoverProps];

  let columnProps = merge(() => column.props as SpectrumColumnProps<unknown>);

  let {isFocusVisible, focusProps} = useFocusRing();

  const onMenuSelect = (key: Key) => {
    switch (key) {
      case 'sort-asc':
        state.sort(column.key, 'ascending');
        break;
      case 'sort-desc':
        state.sort(column.key, 'descending');
        break;
      case 'resize':
        columnResizeState.startResize(column.key);
        context.setIsInResizeMode(true);
        state.setKeyboardNavigationDisabled(true);
        break;
    }
  };
  let allowsSorting = () => column.props?.allowsSorting;
  let items = createMemo(() => {
    let options: {label: string; id: string}[] = [];
    if (allowsSorting()) {
      options.push({
        // oxlint-disable-next-line react/react-compiler
        label: stringFormatter.format('sortAscending'),
        id: 'sort-asc'
      });
      options.push({
        label: stringFormatter.format('sortDescending'),
        id: 'sort-desc'
      });
    }
    options.push({
      label: stringFormatter.format('resizeColumn'),
      id: 'resize'
    });
    return options;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  let resizingColumn = () => columnResizeState.resizingColumn;
  let showResizer = () =>
    !context.isEmpty &&
    ((context.headerRowHovered && getInteractionModality() !== 'keyboard') || resizingColumn() != null);
  let alignment = () => {
  let alignment = 'start';
  let menuAlign = 'start' as 'start' | 'end';
  if (columnProps.align === 'center' || (column.colSpan ?? 0) > 1) {
    alignment = 'center';
  } else if (columnProps.align === 'end') {
    alignment = 'end';
    menuAlign = 'end';
  }
  return {alignment, menuAlign};
  };

  return (
    <FocusRing focusRingClass={classNames(styles, 'focus-ring')}>
      {compose => (
      <div
        {...compose(mergeProps(...allProps, {get class() {return classNames(
          styles, 'spectrum-Table-headCell', {
            'is-active': isPressed(),
            'is-resizable': columnProps.allowsResizing,
            'is-sortable': columnProps.allowsSorting,
            'is-sorted-desc': state.sortDescriptor?.column === column.key && state.sortDescriptor?.direction === 'descending',
            'is-sorted-asc': state.sortDescriptor?.column === column.key && state.sortDescriptor?.direction === 'ascending',
            'is-hovered': isHovered(),
            'focus-ring': isFocusVisible(),
            'spectrum-Table-cell--hideHeader': columnProps.hideHeader
          },
          classNames(stylesOverrides, 'react-spectrum-Table-cell', {
            'react-spectrum-Table-cell--alignCenter': alignment().alignment === 'center',
            'react-spectrum-Table-cell--alignEnd': alignment().alignment === 'end'
          })
        );}})) as JSX.HTMLAttributes<HTMLDivElement>}
        ref={ref}
        >
        <MenuTrigger onOpenChange={context.setHeaderMenuOpen} align={alignment().menuAlign}>
          <TableColumnHeaderButton alignment={alignment().alignment} ref={triggerRef} focusProps={focusProps}>
            {columnProps.allowsSorting && (
              <ArrowDownSmall UNSAFE_className={classNames(styles, 'spectrum-Table-sortedIcon')} />
            )}
            {columnProps.hideHeader ? (
              <VisuallyHidden>{column.rendered}</VisuallyHidden>
            ) : (
              <div class={classNames(styles, 'spectrum-Table-headerCellText')}>
                {column.rendered}
              </div>
            )}
            {columnProps.allowsResizing && (
              <ChevronDownMedium
                UNSAFE_className={classNames(styles, 'spectrum-Table-menuChevron')}
              />
            )}
          </TableColumnHeaderButton>
          <Menu onAction={onMenuSelect} minWidth="size-2000" items={items()}>
            {item => <Item>{item.label}</Item>}
          </Menu>
        </MenuTrigger>
        <Resizer
          ref={resizingRef}
          column={column}
          showResizer={showResizer()}
          onResizeStart={context.onResizeStart}
          onResize={context.onResize}
          onResizeEnd={context.onResizeEnd}
          triggerRef={useUnwrapDOMRef(triggerRef)}
        />
        <div
          aria-hidden="true"
          class={classNames(styles, 'spectrum-Table-colResizeIndicator', {
            'spectrum-Table-colResizeIndicator--visible': resizingColumn() != null,
            'spectrum-Table-colResizeIndicator--resizing': resizingColumn() === column.key
          })}>
          <div
            class={classNames(styles, 'spectrum-Table-colResizeNubbin', {
              'spectrum-Table-colResizeNubbin--visible':
                context.isInResizeMode && resizingColumn() === column.key
            })}>
            <Nubbin />
          </div>
        </div>
      </div>
      )}
    </FocusRing>
  );
}

function TableSelectAllCell(props: {column: GridNode<unknown>}) {
  let column = merge(() => props.column);
  let ref = useObjectRef<HTMLDivElement>();
  let {state} = useTableContext();
  let isSingleSelectionMode = () => state.selectionManager.selectionMode === 'single';
  let {columnHeaderProps} = useTableColumnHeader(
    {
      get node() {return props.column;},
      isVirtualized: true
    },
    state,
    ref
  );

  let {checkboxProps} = useTableSelectAllCheckbox(state);
  let {hoverProps, isHovered} = useHover({});

  return (
    <FocusRing focusRingClass={classNames(styles, 'focus-ring')}>
      {compose => (
      <div
        {...compose(mergeProps(columnHeaderProps, hoverProps, {get class() {return classNames(styles, 'spectrum-Table-headCell', 'spectrum-Table-checkboxCell', {'is-hovered': isHovered()});}})) as JSX.HTMLAttributes<HTMLDivElement>}
        ref={ref}
        >
        {
          /*
            In single selection mode, the checkbox will be hidden.
            So to avoid leaving a column header with no accessible content,
            we use a VisuallyHidden component to include the aria-label from the checkbox,
            which for single selection will be "Select."
          */
          isSingleSelectionMode() && <VisuallyHidden>{checkboxProps['aria-label']}</VisuallyHidden>
        }
        <Checkbox
          {...checkboxProps}
          data-testid="selectAll"
          isEmphasized
          UNSAFE_style={isSingleSelectionMode() ? {visibility: 'hidden'} : undefined}
          UNSAFE_className={classNames(styles, 'spectrum-Table-checkbox')}
        />
      </div>
      )}
    </FocusRing>
  );
}

function TableDragHeaderCell(props: {column: GridNode<unknown>}) {
  let ref = useObjectRef<HTMLDivElement>();
  let {state} = useTableContext();
  let {columnHeaderProps} = useTableColumnHeader(
    {
      get node() {return props.column;},
      isVirtualized: true
    },
    state,
    ref
  );
  let stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-spectrum/table');

  return (
    <FocusRing focusRingClass={classNames(styles, 'focus-ring')}>
      {compose => (
      <div
        {...compose(mergeProps(columnHeaderProps, {get class() {return classNames(styles, 'spectrum-Table-headCell', classNames(stylesOverrides, 'react-spectrum-Table-headCell', 'react-spectrum-Table-dragButtonHeadCell'));}})) as JSX.HTMLAttributes<HTMLDivElement>}
        ref={ref}
        >
        <VisuallyHidden>{stringFormatter.format('drag')}</VisuallyHidden>
      </div>
      )}
    </FocusRing>
  );
}

function TableRowGroup(props: {
  children: JSX.Element;
  layoutInfo: LayoutInfo;
  parent: LayoutInfo | null;
  role: JSX.HTMLAttributes<HTMLDivElement>['role'];
}) {
  let otherProps = omit(props, 'children', 'layoutInfo', 'parent');
  let {rowGroupProps} = useTableRowGroup();
  let context = useContext(TableContext)!;
  let style = useStyle(() => props.layoutInfo, () => props.parent);

  return (
    <div {...rowGroupProps as JSX.HTMLAttributes<HTMLDivElement>} style={style()} {...otherProps}>
      {context.isTableDroppable && <RootDropIndicator />}
      {props.children}
    </div>
  );
}

function DragButton() {
  let context = useTableRowContext();
  let {visuallyHiddenProps} = useVisuallyHidden();
  return (
    <FocusRing focusRingClass={classNames(stylesOverrides, 'focus-ring')}>
      {compose => (
      <div
        {...compose(merge(context.dragButtonProps, {get class() {return classNames(stylesOverrides, 'react-spectrum-Table-dragButton');}})) as JSX.HTMLAttributes<HTMLDivElement>}
        style={!context.isFocusVisibleWithin ? {...visuallyHiddenProps.style} : {}}
        ref={element => attachRef(context.dragButtonRef, element)}
        draggable="true">
        <ListGripper UNSAFE_className={classNames(stylesOverrides)} />
      </div>
      )}
    </FocusRing>
  );
}

interface TableRowContextValue {
  dragButtonProps: JSX.HTMLAttributes<HTMLDivElement>;
  dragButtonRef: RefObject<HTMLDivElement | null>;
  isFocusVisibleWithin: boolean;
}

const TableRowContext = createContext<TableRowContextValue | null>(null);
export function useTableRowContext(): TableRowContextValue {
  return useContext(TableRowContext)!;
}

function TableRow(input: {
  item: GridNode<unknown>;
  children: JSX.Element;
  layoutInfo: LayoutInfo;
  parent: LayoutInfo | null;
}) {
  let otherProps = omit(input, 'item', 'children', 'layoutInfo', 'parent');
  let item = merge(() => input.item);
  let ref = useObjectRef<HTMLDivElement>();
  let context = useTableContext();
  let {state, dragAndDropHooks, dragState, dropState} = untrack(() => ({state: context.state, dragAndDropHooks: context.dragAndDropHooks, dragState: context.dragState, dropState: context.dropState}));
  let isSelected = () => state.selectionManager.isSelected(item.key);
  let {rowProps, hasAction, allowsSelection} = useTableRow(
    {
      get node() {return input.item;},
      isVirtualized: true,
      get shouldSelectOnPressUp() {return context.isTableDraggable;}
    },
    state,
    ref
  );

  let isDisabled = () => state.selectionManager.isDisabled(item.key);
  let isInteractive = () => !isDisabled() && (hasAction() || allowsSelection() || context.isTableDraggable);
  let {pressProps, isPressed} = usePress({get isDisabled() {return !isInteractive();}});

  // The row should show the focus background style when any cell inside it is focused.
  // If the row itself is focused, then it should have a blue focus indicator on the left.
  let {isFocusVisible: isFocusVisibleWithin, focusProps: focusWithinProps} = useFocusRing({
    within: true
  });
  let {isFocusVisible, focusProps} = useFocusRing();
  let {hoverProps, isHovered} = useHover({get isDisabled() {return !isInteractive();}});
  let isFirstRow = () =>
    state.collection.rows.find(row => row.type === 'item' && row.level === 0)?.key === item.key;
  let isLastRow = () => item.nextKey == null;
  // Figure out if the TableView content is equal or greater in height to the container. If so, we'll need to round the bottom
  // border corners of the last row when selected.
  let isFlushWithContainerBottom = () => {
  let isFlushWithContainerBottom = false;
  if (isLastRow()) {
    if (context.layout.getContentSize()?.height >= (context.layout.virtualizer?.visibleRect.height ?? 0)) {
      isFlushWithContainerBottom = true;
    }
  }
  return isFlushWithContainerBottom;
  };

  let draggableItem: DraggableItemResult | null = null;
  if (untrack(() => context.isTableDraggable) && dragAndDropHooks && dragState) {
    // oxlint-disable-next-line react/react-compiler
    draggableItem = dragAndDropHooks.useDraggableItem!(
      {get key() {return item.key;}, hasDragButton: true},
      dragState
    );
  }
  let isDropTarget = () => dropState?.isDropTarget({type: 'item', key: item.key, dropPosition: 'on'}) ?? false;
  let dropIndicator: DropIndicatorAria | null = null;
  let dropIndicatorRef = useObjectRef<HTMLDivElement>();
  if (untrack(() => context.isTableDroppable) && dragAndDropHooks && dropState) {
    let target = {type: 'item', get key() {return item.key;}, dropPosition: 'on'} as DropTarget;

    // oxlint-disable-next-line react/react-compiler
    dropIndicator = dragAndDropHooks.useDropIndicator!({target}, dropState, dropIndicatorRef);
  }

  let dragButtonRef = useObjectRef<HTMLDivElement>();
  let {buttonProps: dragButtonProps} = useButton(
    merge(() => !isDisabled() ? draggableItem?.dragButtonProps ?? {} : {}, {
      elementType: 'div'
    }),
    dragButtonRef
  );

  let style = useStyle(() => input.layoutInfo, () => input.parent);

  let props = mergeProps(
    rowProps,
    otherProps,
    {get style() {return style();}},
    focusWithinProps,
    focusProps,
    hoverProps,
    pressProps,
    merge(() => !isDisabled() ? draggableItem?.dragProps ?? {} : {}),
    // Remove tab index from list row if performing a screenreader drag. This prevents TalkBack from focusing the row,
    // allowing for single swipe navigation between row drop indicator
    merge(() => context.dragAndDropHooks?.isVirtualDragging?.() ? {tabIndex: undefined} : {})
  ) as JSX.HTMLAttributes<HTMLDivElement>;

  let {visuallyHiddenProps} = useVisuallyHidden();

  return (
    <TableRowContext value={{dragButtonProps: dragButtonProps as JSX.HTMLAttributes<HTMLDivElement>, dragButtonRef, get isFocusVisibleWithin() {return isFocusVisibleWithin();}}}>
      {context.isTableDroppable && isFirstRow() && (
        <InsertionIndicator
          rowProps={props as Parameters<typeof InsertionIndicator>[0]['rowProps']}
          target={{key: item.key, type: 'item', dropPosition: 'before'}}
        />
      )}
      {context.isTableDroppable && !dropIndicator?.isHidden() && (
        <div role="row" {...visuallyHiddenProps as JSX.HTMLAttributes<HTMLDivElement>}>
          <div role="gridcell">
            <div role="button" {...dropIndicator?.dropIndicatorProps} ref={dropIndicatorRef} />
          </div>
        </div>
      )}
      <div
        {...props}
        ref={ref}
        class={classNames(
          styles,
          'spectrum-Table-row',
          {
            'is-active': isPressed(),
            'is-selected': isSelected(),
            'spectrum-Table-row--highlightSelection':
              state.selectionManager.selectionBehavior === 'replace',
            'is-next-selected':
              item.nextKey != null && state.selectionManager.isSelected(item.nextKey),
            'is-focused': isFocusVisibleWithin(),
            'focus-ring': isFocusVisible(),
            'is-hovered': isHovered(),
            'is-disabled': isDisabled(),
            'spectrum-Table-row--firstRow': isFirstRow(),
            'spectrum-Table-row--lastRow': isLastRow(),
            'spectrum-Table-row--isFlushBottom': isFlushWithContainerBottom()
          },
          classNames(stylesOverrides, 'react-spectrum-Table-row', {
            'react-spectrum-Table-row--dropTarget': isDropTarget()
          })
        )}>
        {input.children}
      </div>
      {context.isTableDroppable && (
        <InsertionIndicator
          rowProps={props as Parameters<typeof InsertionIndicator>[0]['rowProps']}
          target={{key: item.key, type: 'item', dropPosition: 'after'}}
        />
      )}
    </TableRowContext>
  );
}

function TableHeaderRow(props: {
  item: GridNode<unknown>;
  children: JSX.Element;
  layoutInfo: LayoutInfo;
  parent: LayoutInfo | null;
} & HoverProps) {
  let context = useTableContext();
  let ref = useObjectRef<HTMLDivElement>();
  let {rowProps} = useTableHeaderRow({get node() {return props.item;}, isVirtualized: true}, context.state, ref);
  let {hoverProps} = useHover(merge(props, {get isDisabled() {return context.headerMenuOpen;}}));
  let style = useStyle(() => props.layoutInfo, () => props.parent);

  return (
    <div {...mergeProps(rowProps, hoverProps) as JSX.HTMLAttributes<HTMLDivElement>} ref={ref} style={style()}>
      {props.children}
    </div>
  );
}

function TableDragCell(props: {cell: GridNode<unknown>}) {
  let cell = merge(() => props.cell);
  let ref = useObjectRef<HTMLDivElement>();
  let context = useTableContext();
  let state = context.state;
  let isDisabled = () => state.selectionManager.isDisabled(cell.parentKey!);
  let {gridCellProps} = useTableCell(
    {
      get node() {return props.cell;},
      isVirtualized: true
    },
    state,
    ref
  );

  return (
    <FocusRing focusRingClass={classNames(styles, 'focus-ring')}>
      {compose => (
      <div
        {...compose(mergeProps(gridCellProps, {get class() {return classNames(styles, 'spectrum-Table-cell', {'is-disabled': isDisabled()}, classNames(stylesOverrides, 'react-spectrum-Table-cell', 'react-spectrum-Table-dragButtonCell'));}})) as JSX.HTMLAttributes<HTMLDivElement>}
        ref={ref}
        >
        {context.isTableDraggable && !isDisabled() && <DragButton />}
      </div>
      )}
    </FocusRing>
  );
}

function TableCheckboxCell(props: {cell: GridNode<unknown>}) {
  let cell = merge(() => props.cell);
  let ref = useObjectRef<HTMLDivElement>();
  let {state} = useTableContext();
  // The TableCheckbox should always render its disabled status if the row is disabled, regardless of disabledBehavior,
  // but the cell itself should not render its disabled styles if disabledBehavior="selection" because the row might have actions on it.
  let isSelectionDisabled = () => state.disabledKeys.has(cell.parentKey!);
  let isDisabled = () => state.selectionManager.isDisabled(cell.parentKey!);
  let {gridCellProps} = useTableCell(
    {
      get node() {return props.cell;},
      isVirtualized: true
    },
    state,
    ref
  );

  let {checkboxProps} = useTableSelectionCheckbox({get key() {return cell.parentKey!;}}, state);

  return (
    <FocusRing focusRingClass={classNames(styles, 'focus-ring')}>
      {compose => (
      <div
        {...compose(mergeProps(gridCellProps, {get class() {return classNames(styles, 'spectrum-Table-cell', 'spectrum-Table-checkboxCell', {'is-disabled': isDisabled()}, classNames(stylesOverrides, 'react-spectrum-Table-cell'));}})) as JSX.HTMLAttributes<HTMLDivElement>}
        ref={ref}
        >
        {state.selectionManager.selectionMode !== 'none' && (
          <Checkbox
            {...checkboxProps}
            isEmphasized
            isDisabled={isSelectionDisabled()}
            UNSAFE_className={classNames(styles, 'spectrum-Table-checkbox')}
          />
        )}
      </div>
      )}
    </FocusRing>
  );
}

function TableCell(props: {cell: GridNode<unknown>}) {
  let cell = merge(() => props.cell);
  let provider = useProvider();
  let state = useTableContext().state as TableState<unknown> | TreeGridState<unknown>;
  let isExpandableTable = 'keyMap' in state;
  let ref = useObjectRef<HTMLDivElement>();
  let columnProps = merge(() => cell.column!.props as SpectrumColumnProps<unknown>);
  let isDisabled = () => state.selectionManager.isDisabled(cell.parentKey!);
  let {gridCellProps} = useTableCell(
    {
      get node() {return props.cell;},
      isVirtualized: true
    },
    state as TableState<unknown>,
    ref
  );
  let otherGridCellProps = omit(gridCellProps, 'id');
  let isFirstRowHeaderCell = () =>
    state.collection.rowHeaderColumnKeys.keys().next().value === cell.column!.key;
  let expansion = () => {
  let isRowExpandable = false;
  let showExpandCollapseButton = false;
  let levelOffset = 0;

  if ('keyMap' in state) {
    isRowExpandable =
      state.keyMap.get(cell.parentKey!)?.props.UNSTABLE_childItems?.length > 0 ||
      state.keyMap.get(cell.parentKey!)?.props?.children?.length > state.userColumnCount;
    showExpandCollapseButton = isFirstRowHeaderCell() && isRowExpandable;
    // Offset based on level, and add additional offset if there is no expand/collapse button on a row
    levelOffset =
      (cell.level - 1) * LEVEL_OFFSET_WIDTH[provider.scale] +
      (!showExpandCollapseButton ? LEVEL_OFFSET_WIDTH[provider.scale] * 2 : 0);
  }
  return {showExpandCollapseButton, levelOffset};
  };

  return (
    <FocusRing focusRingClass={classNames(styles, 'focus-ring')}>
      {compose => (
      <div
        {...compose(mergeProps(otherGridCellProps, {get class() {return classNames(
          styles,
          'spectrum-Table-cell',
          {
            'spectrum-Table-cell--divider': columnProps.showDivider && cell.column!.nextKey !== null,
            'spectrum-Table-cell--hideHeader': columnProps.hideHeader,
            'spectrum-Table-cell--hasExpandCollapseButton': expansion().showExpandCollapseButton,
            'is-disabled': isDisabled()
          },
          classNames(stylesOverrides, 'react-spectrum-Table-cell', {
            'react-spectrum-Table-cell--alignStart': columnProps.align === 'start',
            'react-spectrum-Table-cell--alignCenter': columnProps.align === 'center',
            'react-spectrum-Table-cell--alignEnd': columnProps.align === 'end'
          })
        );}})) as JSX.HTMLAttributes<HTMLDivElement>}
        aria-labelledby={gridCellProps.id}
        ref={ref}
        style={isExpandableTable && isFirstRowHeaderCell() ? {'padding-inline-start': `${expansion().levelOffset}px`} : {}}
        >
        {expansion().showExpandCollapseButton && <ExpandableRowChevron cell={cell} />}
        <span id={gridCellProps.id} class={classNames(styles, 'spectrum-Table-cellContents')}>
          {cell.rendered}
        </span>
      </div>
      )}
    </FocusRing>
  );
}

function TableCellWrapper(props: {
  layoutInfo: LayoutInfo;
  virtualizer: any;
  parent: ReusableView<any, any>;
  children: JSX.Element;
}) {
  let context = useContext(TableContext)!;
  let dropTargets = () => {
  let isDropTarget = false;
  let isRootDroptarget = false;
  if (context.isTableDroppable && context.dropState) {
    if (props.parent.content) {
      isDropTarget = context.dropState.isDropTarget({
        type: 'item',
        dropPosition: 'on',
        key: props.parent.content.key
      });
    }
    isRootDroptarget = context.dropState.isDropTarget({type: 'root'});
  }
  return {isDropTarget, isRootDroptarget};
  };

  return (
    <VirtualizerItem
      layoutInfo={props.layoutInfo}
      virtualizer={props.virtualizer}
      parent={props.parent?.layoutInfo}
      className={
          classNames(
            styles,
            'spectrum-Table-cellWrapper',
            classNames(stylesOverrides, {
              'react-spectrum-Table-cellWrapper': !props.layoutInfo.estimatedSize,
              'react-spectrum-Table-cellWrapper--dropTarget': dropTargets().isDropTarget || dropTargets().isRootDroptarget
            })
          )}>
      {props.children}
    </VirtualizerItem>
  );
}

function ExpandableRowChevron(props: {cell: GridNode<unknown>}) {
  let cell = merge(() => props.cell);
  // TODO: move some/all of the chevron button setup into a separate hook?
  let locale = useLocale();
  let state = useTableContext().state as TableState<unknown> | TreeGridState<unknown>;
  let expandButtonRef = useObjectRef<HTMLSpanElement>();
  let stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-spectrum/table');
  let isExpanded = () => 'keyMap' in state && (state.expandedKeys === 'all' || state.expandedKeys.has(cell.parentKey!));

  // Will need to keep the chevron as a button for iOS VO at all times since VO doesn't focus the cell. Also keep as button if cellAction is defined by the user in the future
  let {buttonProps} = useButton(
    {
      // Desktop and mobile both toggle expansion of a native expandable row on mouse/touch up
      onPress: () => {
        (state as TreeGridState<unknown>).toggleKey(cell.parentKey!);
        if (!isFocusVisible()) {
          state.selectionManager.setFocused(true);
          state.selectionManager.setFocusedKey(cell.parentKey!);
        }
      },
      elementType: 'span',
      get 'aria-label'() {return isExpanded()
        ? stringFormatter.format('collapse')
        : stringFormatter.format('expand');}
    },
    expandButtonRef
  );

  return (
    <span
      {...buttonProps}
      ref={expandButtonRef}
      // Override tabindex so that grid keyboard nav skips over it. Needs -1 so android talkback can actually "focus" it
      tabindex={isAndroid() ? -1 : undefined}
      class={classNames(styles, 'spectrum-Table-expandButton', {
        'is-open': isExpanded()
      })}>
      {locale.direction === 'ltr' ? <ChevronRightMedium /> : <ChevronLeftMedium />}
    </span>
  );
}

function LoadingState() {
  let {state} = useContext(TableContext)!;
  let stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-spectrum/table');
  return (
    <CenteredWrapper>
      <ProgressCircle
        isIndeterminate
        aria-label={
          state.collection.size > 0
            ? stringFormatter.format('loadingMore')
            : stringFormatter.format('loading')
        }
      />
    </CenteredWrapper>
  );
}

function EmptyState() {
  let context = useContext(TableContext)!;
  let emptyState = createMemo(() => context.renderEmptyState?.() ?? null);
  return <>{emptyState() == null ? null : <CenteredWrapper>{emptyState()}</CenteredWrapper>}</>;
}

function CenteredWrapper(props: {children?: JSX.Element}) {
  let state = useTableContext().state as TableState<unknown> | TreeGridState<unknown>;
  let rowProps = merge(() => {

  if ('keyMap' in state) {
    let topLevelRowCount = [...state.collection.body.childNodes].length;
    return {
      'aria-level': 1,
      'aria-posinset': topLevelRowCount + 1,
      'aria-setsize': topLevelRowCount + 1
    };
  } else {
    return {
      'aria-rowindex': state.collection.headerRows.length + state.collection.size + 1
    };
  }
  });

  return (
    <div
      role="row"
      {...rowProps}
      class={classNames(stylesOverrides, 'react-spectrum-Table-centeredWrapper')}>
      <div role="rowheader" aria-colspan={state.collection.columns.length}>
        {props.children}
      </div>
    </div>
  );
}

const ForwardTableViewBase = TableViewBase as <T>(
  props: TableBaseProps<T> & {ref?: DOMRef<HTMLDivElement>}
) => JSX.Element;

export {ForwardTableViewBase as TableViewBase};
