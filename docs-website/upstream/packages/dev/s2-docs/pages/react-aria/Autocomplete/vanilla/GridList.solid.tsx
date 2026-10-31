import type { JSX } from '@solidjs/web';
import { omit } from 'solid-js';
'use client';
import { Button, GridList as AriaGridList, GridListItem as AriaGridListItem, GridListLoadMoreItem as AriaGridListLoadMoreItem, Text, GridListSection, GridListHeader, type GridListItemProps, type GridListProps, type GridListLoadMoreItemProps } from 'solid-aria-components';
import { Checkbox } from './Checkbox.solid';
import { GripVertical } from '../native-icons/solid-icons';
import { ProgressCircle } from './ProgressCircle.solid';
import './GridList.css';
export function GridList<T>(live0: GridListProps<T>) {
    return (<AriaGridList {...omit(live0, "children", "layout")} layout={live0.layout ?? 'grid'}>
      {live0.children}
    </AriaGridList>);
}
export function GridListItem(live1: Omit<GridListItemProps, 'children'> & {
    children?: JSX.Element;
}) {
    let textValue = typeof live1.children === 'string' ? live1.children : undefined;
    return (<AriaGridListItem textValue={textValue} {...omit(live1, "children")}>
      {(live2) => (<>
          {/* Add elements for drag and drop and selection. */}
          {live2.allowsDragging && (<Button slot="drag">
              <GripVertical size={16}/>
            </Button>)}
          {live2.selectionMode === 'multiple' && live2.selectionBehavior === 'toggle' && (<Checkbox slot="selection"/>)}
          {live1.children}
        </>)}
    </AriaGridListItem>);
}
export function GridListLoadMoreItem(props: GridListLoadMoreItemProps) {
    return (<AriaGridListLoadMoreItem {...props}>
      <ProgressCircle isIndeterminate aria-label="Loading more..."/>
    </AriaGridListLoadMoreItem>);
}
export { GridListSection, GridListHeader, Text };
