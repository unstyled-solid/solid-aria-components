import {omit} from 'solid-js';
import {
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  ListBoxSection as AriaListBoxSection,
  ListBoxLoadMoreItem as AriaListBoxLoadMoreItem,
  Header,
  type ListBoxItemProps,
  type ListBoxLoadMoreItemProps,
  type ListBoxProps,
  type ListBoxSectionProps
} from 'solid-aria-components/ListBox';
import {composeRenderProps} from 'solid-aria-components/composeRenderProps';
import {Check} from './../../native-icons/solid-icons';
import {Text} from './solid-Content';
import {ProgressCircle} from './solid-ProgressCircle';
import './ListBox.css';

export function ListBox<T>(inputProps: ListBoxProps<T>) {
  let props = omit(inputProps, "children");
  return <AriaListBox {...props}>{inputProps.children}</AriaListBox>;
}

export function ListBoxItem(props: ListBoxItemProps) {
  let textValue =
    () => (props.textValue || (typeof props.children === 'string' ? props.children : undefined));
  return (
    <AriaListBoxItem {...props} textValue={textValue()}>
      {composeRenderProps(props.children, children =>
        typeof children === 'string' ? <Text slot="label">{children}</Text> : children
      )}
    </AriaListBoxItem>
  );
}

export function ListBoxSection<T>(props: ListBoxSectionProps<T>) {
  return <AriaListBoxSection {...props} />;
}

export function ListBoxLoadMoreItem(props: ListBoxLoadMoreItemProps) {
  return (
    <AriaListBoxLoadMoreItem {...props}>
      <ProgressCircle isIndeterminate aria-label="Loading more..." />
    </AriaListBoxLoadMoreItem>
  );
}

export function DropdownListBox<T>(props: ListBoxProps<T>) {
  return <AriaListBox {...props} className="dropdown-listbox" />;
}

export function DropdownItem(props: ListBoxItemProps) {
  let textValue =
    () => (props.textValue || (typeof props.children === 'string' ? props.children : undefined));
  return (
    <ListBoxItem {...props} textValue={textValue()} className="dropdown-item">
      {composeRenderProps(props.children, (children, {isSelected}) => (
        <>
          {isSelected && <Check />}
          {typeof children === 'string' ? <Text slot="label">{children}</Text> : children}
        </>
      ))}
    </ListBoxItem>
  );
}

export {Text, Header};
