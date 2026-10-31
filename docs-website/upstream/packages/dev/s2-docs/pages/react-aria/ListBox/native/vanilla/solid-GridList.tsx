import {omit} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {
  Button,
  GridList as AriaGridList,
  GridListItem as AriaGridListItem,
  GridListLoadMoreItem as AriaGridListLoadMoreItem,
  Text,
  GridListSection,
  GridListHeader,
  type GridListItemProps,
  type GridListProps,
  type GridListLoadMoreItemProps
} from 'solid-aria-components/GridList';
import {Checkbox} from './solid-Checkbox';
import {GripVertical} from './../../native-icons/solid-icons';
import {ProgressCircle} from './solid-ProgressCircle';
import './GridList.css';

export function GridList<T>(inputProps: GridListProps<T>) {
  let props = omit(inputProps, "children", "layout");
  return (
    <AriaGridList {...props} layout={(inputProps.layout === undefined ? 'grid' : inputProps.layout)}>
      {inputProps.children}
    </AriaGridList>
  );
}

export function GridListItem(inputProps: Omit<GridListItemProps, 'children'> & {
  children?: JSX.Element;
}) {
  let props = omit(inputProps, "children");
  let textValue = () => (typeof inputProps.children === 'string' ? inputProps.children : undefined);
  return (
    <AriaGridListItem textValue={textValue()} {...props}>
      {({selectionMode, selectionBehavior, allowsDragging}) => (
        <>
          {/* Add elements for drag and drop and selection. */}
          {allowsDragging && (
            <Button slot="drag">
              <GripVertical size={16} />
            </Button>
          )}
          {selectionMode === 'multiple' && selectionBehavior === 'toggle' && (
            <Checkbox slot="selection" />
          )}
          {inputProps.children}
        </>
      )}
    </AriaGridListItem>
  );
}

export function GridListLoadMoreItem(props: GridListLoadMoreItemProps) {
  return (
    <AriaGridListLoadMoreItem {...props}>
      <ProgressCircle isIndeterminate aria-label="Loading more..." />
    </AriaGridListLoadMoreItem>
  );
}

export {GridListSection, GridListHeader, Text};
