import {omit} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {
  Button,
  Tag as AriaTag,
  TagGroup as AriaTagGroup,
  type TagGroupProps as AriaTagGroupProps,
  TagList,
  type TagListProps,
  type TagProps
} from 'solid-aria-components/TagGroup';
import {Description, Label} from './solid-Form';
import {Text} from './solid-Content';
import {X} from './../../native-icons/solid-icons';
import './TagGroup.css';

export interface TagGroupProps<T>
  extends
    Omit<AriaTagGroupProps, 'children'>,
    Pick<TagListProps<T>, 'items' | 'children' | 'renderEmptyState'> {
  label?: string;
  description?: string;
  errorMessage?: string;
}

export function TagGroup<T>(inputProps: TagGroupProps<T>) {
  let props = omit(inputProps, "label", "description", "errorMessage", "items", "children", "renderEmptyState");
  return (
    <AriaTagGroup {...props}>
      {inputProps.label && <Label>{inputProps.label}</Label>}
      <TagList items={inputProps.items} renderEmptyState={inputProps.renderEmptyState}>
        {inputProps.children}
      </TagList>
      {inputProps.description && <Description>{inputProps.description}</Description>}
      {inputProps.errorMessage && <Text slot="errorMessage">{inputProps.errorMessage}</Text>}
    </AriaTagGroup>
  );
}

export function Tag(inputProps: Omit<TagProps, 'children'> & {
  children?: JSX.Element;
}) {
  let props = omit(inputProps, "children");
  let textValue = () => (typeof inputProps.children === 'string' ? inputProps.children : undefined);
  return (
    <AriaTag textValue={textValue()} {...props} className="react-aria-Tag button-base">
      {({allowsRemoving}) => (
        <>
          {inputProps.children}
          {allowsRemoving && (
            <Button slot="remove" className="remove-button">
              <X />
            </Button>
          )}
        </>
      )}
    </AriaTag>
  );
}
