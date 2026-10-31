import type { JSX } from '@solidjs/web';
import { omit } from 'solid-js';
'use client';
import { Button, Tag as AriaTag, TagGroup as AriaTagGroup, type TagGroupProps as AriaTagGroupProps, TagList, type TagListProps, type TagProps } from 'solid-aria-components';
import { Description, Label } from './Form.solid';
import { Text } from './Content.solid';
import { X } from '../native-icons/solid-icons';
import './TagGroup.css';
export interface TagGroupProps<T> extends Omit<AriaTagGroupProps, 'children'>, Pick<TagListProps<T>, 'items' | 'children' | 'renderEmptyState'> {
    label?: string;
    description?: string;
    errorMessage?: string;
}
export function TagGroup<T>(live0: TagGroupProps<T>) {
    return (<AriaTagGroup {...omit(live0, "label", "description", "errorMessage", "items", "children", "renderEmptyState")}>
      {live0.label && <Label>{live0.label}</Label>}
      <TagList items={live0.items} renderEmptyState={live0.renderEmptyState}>
        {live0.children}
      </TagList>
      {live0.description && <Description>{live0.description}</Description>}
      {live0.errorMessage && <Text slot="errorMessage">{live0.errorMessage}</Text>}
    </AriaTagGroup>);
}
export function Tag(live1: Omit<TagProps, 'children'> & {
    children?: JSX.Element;
}) {
    let textValue = typeof live1.children === 'string' ? live1.children : undefined;
    return (<AriaTag textValue={textValue} {...omit(live1, "children")} className="react-aria-Tag button-base">
      {(live2) => (<>
          {live1.children}
          {live2.allowsRemoving && (<Button slot="remove" className="remove-button">
              <X />
            </Button>)}
        </>)}
    </AriaTag>);
}
