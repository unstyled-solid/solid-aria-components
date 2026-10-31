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
import {chain} from '../../src/utils/chain';

import {classNames} from '@adobe/react-spectrum/private/utils/classNames';
import dndStyles from './dnd.css';
import {DragPreview} from '../../src/dnd/DragPreview';
import {FocusRing} from '../../src/focus/FocusRing';
import Folder from '@spectrum-icons/workflow/Folder';
import {GridCollection} from 'react-stately/private/grid/GridCollection';
import {Item} from 'react-stately/Item';
import {mergeProps} from '../../src/utils/mergeProps';
import {JSX} from '@solidjs/web';
import {createMemo, For, merge} from 'solid-js';
import {DragPreviewRenderer, Node} from '@react-types/shared';
import {useObjectRef} from '../../src/utils/useObjectRef';
import ShowMenu from '@spectrum-icons/workflow/ShowMenu';
import {useButton} from '../../src/button/useButton';
import {useDraggableCollection} from '../../src/dnd/useDraggableCollection';
import {useDraggableCollectionState} from 'react-stately/useDraggableCollectionState';
import {useDraggableItem} from '../../src/dnd/useDraggableItem';
import {useGrid} from '../../src/grid/useGrid';
import {useGridCell} from '../../src/grid/useGridCell';
import {useGridRow} from '../../src/grid/useGridRow';
import {useGridState} from 'react-stately/private/grid/useGridState';
import {useId} from '../../src/utils/useId';
import {useListData} from 'react-stately/useListData';
import {useListState} from 'react-stately/useListState';

interface ItemValue {
  id: string;
  type: string;
  text: string;
}

export function DraggableCollectionExample(props: any): JSX.Element {
  let list = useListData({
    initialItems: [
      {id: 'foo', type: 'folder', text: 'Foo'},
      {id: 'bar', type: 'folder', text: 'Bar'},
      {id: 'baz', type: 'item', text: 'Baz'}
    ]
  });

  let onDragEnd = (e: import('@react-types/shared').DraggableCollectionEndEvent) => {
    if (e.dropOperation === 'move') {
      list.remove(...e.keys);
    }
  };

  return (
    <DraggableCollection
      {...props}
      items={list.items}
      selectedKeys={list.selectedKeys}
      onSelectionChange={list.setSelectedKeys}
      onDragEnd={chain(onDragEnd, props.onDragEnd)}>
      {(item: ItemValue) => (
        <Item textValue={item.text}>
          {item.type === 'folder' && <Folder size="S" />}
          <span>{item.text}</span>
        </Item>
      )}
    </DraggableCollection>
  );
}

function DraggableCollection(props: any) {
  let ref = useObjectRef<HTMLDivElement>();
  let state = useListState<ItemValue>(props);
  let collection = createMemo(
      () =>
        new GridCollection<ItemValue>({
          columnCount: 1,
          items: [...state.collection].map(item => ({
            ...item,
            childNodes: [
              {
                key: `cell-${item.key}`,
                type: 'cell',
                index: 0,
                value: null,
                level: 0,
                rendered: null,
                textValue: item.textValue,
                hasChildNodes: false,
                childNodes: []
              }
            ]
          }))
        }),
    );
  let gridState = useGridState({
    selectionMode: 'multiple',
    get collection() { return collection(); }
  });

  let preview = useObjectRef<DragPreviewRenderer>();
  let dragState = useDraggableCollectionState({
    get collection() { return gridState.collection; },
    get selectionManager() { return gridState.selectionManager; },
    getItems(keys) {
      return [...keys]
        .map(key => {
          let item = gridState.collection.getItem(key)!;

          return {
            [item.value!.type]: item.textValue,
            'text/plain': item.textValue
          };
        })
        .filter(item => item != null);
    },
    preview,
    get onDragStart() { return props.onDragStart; },
    get onDragMove() { return props.onDragMove; },
    get onDragEnd() { return props.onDragEnd; }
  });
  useDraggableCollection({}, dragState, ref);

  let {gridProps} = useGrid(
    merge(props, {
      'aria-label': 'Draggable list',
      focusMode: 'cell' as const
    }),
    gridState,
    ref
  );

  return (
    <div
      {...gridProps}
      ref={ref}
      style={{
        display: 'flex',
        'flex-direction': 'column'
      }}>
      <For each={[...gridState.collection]} keyed={item => item.key}>{item => (
        <DraggableCollectionItem
          item={item()}
          state={gridState}
          dragState={dragState}
        />
      )}</For>
      <DragPreview ref={preview}>
        {() => {
          let item =
            dragState.draggedKey == null ? null : state.collection.getItem(dragState.draggedKey);
          return (
            <div
              class={classNames(dndStyles, 'draggable', 'is-drag-preview', {
                'is-dragging-multiple': dragState.draggingKeys.size > 1
              })}>
              <div class={classNames(dndStyles, 'drag-handle')}>
                <ShowMenu size="XS" />
              </div>
              {item && <span>{item.rendered}</span>}
              {dragState.draggingKeys.size > 1 && (
                <div class={classNames(dndStyles, 'badge')}>{dragState.draggingKeys.size}</div>
              )}
            </div>
          );
        }}
      </DragPreview>
    </div>
  );
}

function DraggableCollectionItem(props: {item: Node<any>, state: ReturnType<typeof useGridState>, dragState: ReturnType<typeof useDraggableCollectionState>}) {
  let state = props.state;
  let dragState = props.dragState;
  let rowRef = useObjectRef<HTMLDivElement>();
  let cellRef = useObjectRef<HTMLDivElement>();
  let cellNode = () => [...props.item.childNodes][0];
  let isSelected = () => state.selectionManager.isSelected(props.item.key);

  let {rowProps} = useGridRow({get node() { return props.item; }}, state, rowRef);
  let {gridCellProps} = useGridCell(
    {
      get node() { return cellNode(); },
      focusMode: 'cell',
      shouldSelectOnPressUp: true
    },
    state,
    cellRef
  );

  let {dragProps, dragButtonProps} = useDraggableItem(
    {get key() { return props.item.key; }, hasDragButton: true},
    dragState
  );

  let buttonRef = useObjectRef<HTMLDivElement>();
  let {buttonProps} = useButton(
    merge(dragButtonProps, {
      elementType: 'div'
    }),
    buttonRef
  );
  let id = useId();

  return (
    <div {...rowProps} ref={rowRef} aria-labelledby={id()}>
      <FocusRing focusRingClass={classNames(dndStyles, 'focus-ring')}>
        {compose => {
          let hostProps = compose(mergeProps(gridCellProps, dragProps, {
            get 'aria-labelledby'() { return id(); },
            ref: cellRef,
            get class() {
              return classNames(dndStyles, 'draggable', {
                'is-dragging': dragState.isDragging(props.item.key),
                'is-selected': isSelected()
              });
            }
          }));
          return <div {...hostProps}>
          <FocusRing focusRingClass={classNames(dndStyles, 'focus-ring')}>
            {composeButton => {
              let hostProps = composeButton(mergeProps(buttonProps, {
                ref: buttonRef,
                class: classNames(dndStyles, 'drag-handle')
              }));
              return <div {...hostProps}>
              <ShowMenu size="XS" />
              </div>;
            }}
          </FocusRing>
          <span id={id()}>{props.item.rendered}</span>
          </div>;
        }}
      </FocusRing>
    </div>
  );
}
