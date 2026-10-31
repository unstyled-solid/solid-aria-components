import type {ComponentProps} from '@solidjs/web';
import type {JSX} from '@solidjs/web';
import {
  Button,
  Tree as AriaTree,
  TreeItem as AriaTreeItem,
  TreeItemContent as AriaTreeItemContent,
  type TreeItemContentProps,
  type TreeItemContentRenderProps,
  type TreeItemProps as AriaTreeItemProps,
  type TreeProps,
  TreeLoadMoreItem as AriaTreeLoadMoreItem,
  type TreeLoadMoreItemProps,
  TreeSection as AriaTreeSection,
  TreeHeader as AriaTreeHeader
} from 'solid-aria-components/Tree';
import {ChevronRight, GripVertical} from './../../native-icons/solid-icons';
import {Checkbox} from './solid-Checkbox';
import {ProgressCircle} from './solid-ProgressCircle';
import './Tree.css';

export function Tree<T>(props: TreeProps<T>) {
  return <AriaTree {...props} />;
}

export function TreeItemContent(
  props: Omit<TreeItemContentProps, 'children'> & {children?: JSX.Element}
) {
  return (
    <AriaTreeItemContent>
      {({selectionBehavior, selectionMode, allowsDragging}: TreeItemContentRenderProps) => (
        <>
          {allowsDragging && (
            <Button slot="drag">
              <GripVertical size={16} />
            </Button>
          )}
          {selectionBehavior === 'toggle' && selectionMode !== 'none' && (
            <Checkbox slot="selection" />
          )}
          <Button slot="chevron">
            <ChevronRight />
          </Button>
          {props.children}
        </>
      )}
    </AriaTreeItemContent>
  );
}

export interface TreeItemProps extends Partial<AriaTreeItemProps> {
  title?: JSX.Element;
}

export function TreeItem(props: TreeItemProps) {
  let textValue = () => (typeof props.title === 'string' ? props.title : '');
  return (
    <AriaTreeItem textValue={textValue()} {...props}>
      {props.title != null ? (
        <>
          <TreeItemContent>{props.title}</TreeItemContent>
          {props.children}
        </>
      ) : (
        props.children
      )}
    </AriaTreeItem>
  );
}

export function TreeLoadMoreItem(props: TreeLoadMoreItemProps) {
  return (
    <AriaTreeLoadMoreItem {...props}>
      <ProgressCircle isIndeterminate aria-label="Loading more..." />
    </AriaTreeLoadMoreItem>
  );
}

export function TreeSection(props: ComponentProps<typeof AriaTreeSection>) {
  return <AriaTreeSection {...props} />;
}

export function TreeHeader(props: ComponentProps<typeof AriaTreeHeader>) {
  return <AriaTreeHeader {...props} />;
}
