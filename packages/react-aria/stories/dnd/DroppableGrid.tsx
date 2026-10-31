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

import {classNames} from '@adobe/react-spectrum/private/utils/classNames';

import dndStyles from './dnd.css';
import dropIndicatorStyles from '@adobe/spectrum-css-temp/components/dropindicator/vars.css';
import {DroppableCollectionDropEvent, Node} from '@react-types/shared';
import {FocusRing} from '../../src/focus/FocusRing';
import Folder from '@spectrum-icons/workflow/Folder';
import {GridCollection} from 'react-stately/private/grid/GridCollection';
import {Item} from 'react-stately/Item';
import {ListDropTargetDelegate} from '../../src/dnd/ListDropTargetDelegate';
import {ListKeyboardDelegate} from '../../src/selection/ListKeyboardDelegate';
import {mergeProps} from '../../src/utils/mergeProps';
import {JSX} from '@solidjs/web';
import {createMemo, For, merge, omit, onSettled} from 'solid-js';
import {Ref, useObjectRef} from '../../src/utils/useObjectRef';
import {useClipboard} from '../../src/dnd/useClipboard';
import {useDropIndicator} from '../../src/dnd/useDropIndicator';
import {useDroppableCollection} from '../../src/dnd/useDroppableCollection';
import {useDroppableCollectionState} from 'react-stately/useDroppableCollectionState';
import {useGrid} from '../../src/grid/useGrid';
import {useGridCell} from '../../src/grid/useGridCell';
import {useGridRow} from '../../src/grid/useGridRow';
import {useGridState} from 'react-stately/private/grid/useGridState';
import {useListData} from 'react-stately/useListData';
import {useListState} from 'react-stately/useListState';
import {useVisuallyHidden} from '../../src/visually-hidden/VisuallyHidden';

interface ListItem {
  id: string;
  type: string;
  text: string;
}

export function DroppableGridExample(props: any): JSX.Element {
  let id = {current: props.items?.length || 3};
  let list = useListData<ListItem>({
    initialItems: props.items || [
      {id: '1', type: 'folder', text: 'One'},
      {id: '2', type: 'item', text: 'Two'},
      {id: '3', type: 'folder', text: 'Three'}
    ]
  });

  let ref = useObjectRef<DroppableGridHandle>();

  let onDrop = async (e: DroppableCollectionDropEvent) => {
    if (props.onDrop) {
      props.onDrop(e);
    }

    if (e.target.type === 'root' || e.target.dropPosition !== 'on') {
      let items: ListItem[] = [];
      for (let item of e.items) {
        let type: string | undefined;
        if (item.kind === 'text') {
          if (item.types.has('folder')) {
            type = 'folder';
          } else if (item.types.has('item')) {
            type = 'item';
          } else if (item.types.has('text/plain')) {
            type = 'text/plain';
          }

          if (!type) {
            continue;
          }

          items.push({
            id: String(++id.current),
            type,
            text: await item.getText(type)
          });
        } else if (item.kind === 'file') {
          items.push({
            id: String(++id.current),
            type: 'file',
            text: item.name
          });
        } else if (item.kind === 'directory') {
          for await (let entry of item.getEntries()) {
            items.push({
              id: String(++id.current),
              type: entry.kind === 'directory' ? 'folder' : 'file',
              text: entry.name
            });
          }
        }
      }

      if (e.target.type === 'root') {
        list.prepend(...items);
      } else if (e.target.dropPosition === 'before') {
        list.insertBefore(e.target.key, ...items);
      } else {
        list.insertAfter(e.target.key, ...items);
      }
    }
  };

  return (
    <DroppableGrid {...props} items={list.items} onDrop={onDrop} ref={ref}>
      {(item: ListItem) => (
        <Item textValue={item.text}>
          {item.type === 'folder' && <Folder size="S" />}
          <span>{item.text}</span>
        </Item>
      )}
    </DroppableGrid>
  );
}

interface DroppableGridHandle { focusItem(key: import('@react-types/shared').Key): void; }

function DroppableGrid(props: any & {ref?: Ref<DroppableGridHandle>}) {
  let domRef = useObjectRef<HTMLDivElement>();
  let state = useListState(props);
  let keyboardDelegate = createMemo(() => new ListKeyboardDelegate(state.collection, new Set(), domRef));
  let collection = createMemo(
      () =>
        new GridCollection<object>({
          columnCount: 1,
          items: [...state.collection].map(
            item =>
              ({
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
              }) as Node<any>
          )
        }),
    );
  let gridState = useGridState({
    selectionMode: 'multiple',
    focusMode: 'cell',
    get selectedKeys() { return props.selectedKeys; },
    get onSelectionChange() { return props.onSelectionChange; },
    get collection() { return collection(); }
  });

  let imperativeRef = useObjectRef<DroppableGridHandle>(props.ref);
  onSettled(() => {
    imperativeRef({focusItem(key) {
      gridState.selectionManager.setFocusedKey(`cell-${key}`);
      gridState.selectionManager.setFocused(true);
    }});
    return () => imperativeRef(null);
  });

  let defaultGetDropOperation: NonNullable<import('@react-types/shared').DroppableCollectionProps['getDropOperation']> = (target, items, allowedOperations) => {
    if (target.type === 'root') {
      return 'move';
    }

    if (target.key === '2' && target.dropPosition === 'on') {
      return 'cancel';
    }

    return target.dropPosition !== 'on' ? allowedOperations[0] : 'copy';
  };

  let dropState = useDroppableCollectionState({
    get collection() { return gridState.collection; },
    get selectionManager() { return gridState.selectionManager; },
    get getDropOperation() { return props.getDropOperation || defaultGetDropOperation; },
    get onDropEnter() { return props.onDropEnter; },
    get onDropExit() { return props.onDropExit; },
    get onDrop() { return props.onDrop; }
  });

  let dropTargetDelegate = createMemo(() => new ListDropTargetDelegate(gridState.collection, domRef));
  let {collectionProps} = useDroppableCollection(
    {
      get keyboardDelegate() { return keyboardDelegate(); },
      get dropTargetDelegate() { return dropTargetDelegate(); },
      get onDropActivate() { return props.onDropActivate; },
      get onDrop() { return props.onDrop; }
    },
    dropState,
    domRef
  );

  let {gridProps} = useGrid(
    merge(omit(props, 'ref'), {
      'aria-label': 'List',
      focusMode: 'cell' as const
    }),
    gridState,
    domRef
  );

  let isDropTarget = () => dropState.isDropTarget({type: 'root'});
  let dropRef = useObjectRef<HTMLDivElement>();
  let {dropIndicatorProps} = useDropIndicator(
    {
      target: {type: 'root'}
    },
    dropState,
    dropRef
  );
  let {visuallyHiddenProps} = useVisuallyHidden();

  return (
    <div
      {...mergeProps(collectionProps, gridProps)}
      ref={domRef}
      class={classNames(dndStyles, 'droppable-collection', {'is-drop-target': isDropTarget()})}
      style={props.style}
      data-droptarget={isDropTarget()}
      role="grid">
      {!dropIndicatorProps['aria-hidden'] && (
        <div role="row">
          <div role="gridcell" aria-selected="false">
            <div
              {...visuallyHiddenProps}
              role="button"
              tabindex={-1}
              {...dropIndicatorProps}
              ref={dropRef}
            />
          </div>
        </div>
      )}
      <For each={[...gridState.collection]} keyed={item => item.key}>{item => (
        <>
          <InsertionIndicator
            collectionRef={domRef}
            target={{type: 'item', key: item().key, dropPosition: 'before'}}
            dropState={dropState}
          />
          <CollectionItem
            item={item()}
            state={gridState}
            dropState={dropState}
            onPaste={items =>
              props.onDrop({target: {type: 'item', key: item().key, dropPosition: 'before'}, items})
            }
          />
          {state.collection.getKeyAfter(item().key) == null && (
            <InsertionIndicator
              target={{type: 'item', key: item().key, dropPosition: 'after'}}
              collectionRef={domRef}
              dropState={dropState}
            />
          )}
        </>
      )}</For>
    </div>
  );
}

function CollectionItem(props: {item: Node<any>, state: ReturnType<typeof useGridState>, dropState: ReturnType<typeof useDroppableCollectionState>, onPaste: NonNullable<import('../../src/dnd/useClipboard').ClipboardProps['onPaste']>}) {
  let state = props.state;
  let dropState = props.dropState;
  let rowRef = useObjectRef<HTMLDivElement>();
  let cellRef = useObjectRef<HTMLDivElement>();
  let cellNode = () => [...props.item.childNodes][0];

  let {rowProps} = useGridRow({get node() { return props.item; }}, state, rowRef);
  let {gridCellProps} = useGridCell(
    {
      get node() { return cellNode(); },
      focusMode: 'cell'
    },
    state,
    cellRef
  );

  let dropIndicatorRef = useObjectRef<HTMLDivElement>();
  let {dropIndicatorProps} = useDropIndicator(
    {
      get target() { return {type: 'item' as const, key: props.item.key, dropPosition: 'on' as const}; }
    },
    dropState,
    dropIndicatorRef
  );
  let {visuallyHiddenProps} = useVisuallyHidden();

  let {clipboardProps} = useClipboard({
    get onPaste() { return props.onPaste; }
  });

  return (
    <div {...rowProps} ref={rowRef} style={{outline: 'none'}}>
      <FocusRing focusRingClass={classNames(dndStyles, 'focus-ring')}>
        {compose => {
          let hostProps = compose(mergeProps(gridCellProps, clipboardProps, {
            ref: cellRef,
            get class() {
              return classNames(dndStyles, 'droppable', {
                'is-drop-target': dropState.isDropTarget({
                  type: 'item',
                  key: props.item.key,
                  dropPosition: 'on'
                }),
                'is-selected': state.selectionManager.isSelected(props.item.key)
              });
            }
          }));
          return <div {...hostProps}>
          {props.item.rendered}
          {!dropIndicatorProps['aria-hidden'] && (
            <div
              {...visuallyHiddenProps}
              role="button"
              {...dropIndicatorProps}
              ref={dropIndicatorRef}
            />
          )}
          </div>;
        }}
      </FocusRing>
    </div>
  );
}

function InsertionIndicator(props: import('../../src/dnd/useDropIndicator').DropIndicatorProps & {collectionRef: import('@react-types/shared').RefObject<HTMLElement | null>, dropState: ReturnType<typeof useDroppableCollectionState>}) {
  let ref = useObjectRef<HTMLDivElement>();
  let {dropIndicatorProps} = useDropIndicator(props, props.dropState, ref);
  let {visuallyHiddenProps} = useVisuallyHidden();

  // If aria-hidden, we are either not in a drag session or the drop target is invalid.
  // In that case, there's no need to render anything at all unless we need to show the indicator visually.
  // This can happen when dragging using the native DnD API as opposed to keyboard dragging.
  return (
    <>{(props.dropState.isDropTarget(props.target) || !dropIndicatorProps['aria-hidden']) && (
    <div role="row" aria-hidden={dropIndicatorProps['aria-hidden']} style={{margin: '-5px 0'}}>
      <div
        role="gridcell"
        aria-selected="false"
        class={
          props.dropState.isDropTarget(props.target)
            ? classNames(
                dropIndicatorStyles,
                'spectrum-DropIndicator',
                'spectrum-DropIndicator--horizontal'
              )
            : undefined
        }
        style={{
          width: '100%',
          'margin-left': 0,
          height: '2px',
          outline: 'none'
        }}>
        <div {...visuallyHiddenProps} role="button" {...dropIndicatorProps} ref={ref} />
      </div>
    </div>
    )}</>
  );
}
