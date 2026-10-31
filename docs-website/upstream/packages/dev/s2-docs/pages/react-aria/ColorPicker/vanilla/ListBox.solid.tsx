import { omit } from 'solid-js';
'use client';
import { ListBox as AriaListBox, ListBoxItem as AriaListBoxItem, ListBoxSection as AriaListBoxSection, ListBoxLoadMoreItem as AriaListBoxLoadMoreItem, Header, type ListBoxItemProps, type ListBoxLoadMoreItemProps, type ListBoxProps, type ListBoxSectionProps } from 'solid-aria-components';
import { composeRenderProps } from 'solid-aria-components';
import { Check } from './icons.solid';
import { Text } from './Content.solid';
import { ProgressCircle } from './ProgressCircle.solid';
import './ListBox.css';
export function ListBox<T>(live0: ListBoxProps<T>) {
    return <AriaListBox {...omit(live0, "children")}>{live0.children}</AriaListBox>;
}
export function ListBoxItem(props: ListBoxItemProps) {
    return (<AriaListBoxItem {...props}>
      {composeRenderProps(props.children, children => typeof children === 'string' ? <Text slot="label">{children}</Text> : children)}
    </AriaListBoxItem>);
}
export function ListBoxSection<T>(props: ListBoxSectionProps<T>) {
    return <AriaListBoxSection {...props}/>;
}
export function ListBoxLoadMoreItem(props: ListBoxLoadMoreItemProps) {
    return (<AriaListBoxLoadMoreItem {...props}>
      <ProgressCircle isIndeterminate aria-label="Loading more..."/>
    </AriaListBoxLoadMoreItem>);
}
export function DropdownListBox<T>(props: ListBoxProps<T>) {
    return <AriaListBox {...props} className="dropdown-listbox"/>;
}
export function DropdownItem(props: ListBoxItemProps) {
    return (<ListBoxItem {...props} className="dropdown-item">
      {composeRenderProps(props.children, (children, live1) => (<>
          {live1.isSelected && <Check />}
          {typeof children === 'string' ? <Text slot="label">{children}</Text> : children}
        </>))}
    </ListBoxItem>);
}
export { Text, Header };
