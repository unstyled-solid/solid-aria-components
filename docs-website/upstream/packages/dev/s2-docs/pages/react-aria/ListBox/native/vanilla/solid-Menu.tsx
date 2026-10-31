import type {JSX} from '@solidjs/web';
import {Check, ChevronRight, Dot} from './../../native-icons/solid-icons';
import {
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  MenuLoadMoreItem as AriaMenuLoadMoreItem,
  MenuSection as AriaMenuSection,
  MenuTrigger as AriaMenuTrigger,
  SubmenuTrigger as AriaSubmenuTrigger,
  Header,
  Separator,
  Keyboard,
  type MenuItemProps,
  type MenuLoadMoreItemProps,
  type MenuProps,
  type MenuSectionProps,
  type MenuTriggerProps,
  type SubmenuTriggerProps
} from 'solid-aria-components/Menu';
import {Popover} from './solid-Popover';
import {ProgressCircle} from './solid-ProgressCircle';
import {Text} from './solid-Content';
import './Menu.css';

export function MenuTrigger(props: Omit<MenuTriggerProps, 'children'> & {children: [() => JSX.Element, () => JSX.Element]}) {
  return (
    <AriaMenuTrigger {...props}>
      {props.children[0]()}
      <Popover>{props.children[1]()}</Popover>
    </AriaMenuTrigger>
  );
}

export function Menu<T>(props: MenuProps<T>) {
  return <AriaMenu {...props}>{props.children}</AriaMenu>;
}

export function MenuLoadMoreItem(props: MenuLoadMoreItemProps) {
  return (
    <AriaMenuLoadMoreItem {...props}>
      <ProgressCircle isIndeterminate aria-label="Loading more..." />
    </AriaMenuLoadMoreItem>
  );
}

export function MenuItem(props: Omit<MenuItemProps, 'children'> & {children?: JSX.Element}) {
  let textValue =
    () => (props.textValue || (typeof props.children === 'string' ? props.children : undefined));
  return (
    <AriaMenuItem {...props} textValue={textValue()}>
      {({hasSubmenu, isSelected, selectionMode}) => (
        <>
          {isSelected && selectionMode === 'multiple' ? <Check /> : null}
          {isSelected && selectionMode === 'single' ? <Dot /> : null}
          {typeof props.children === 'string' ? (
            <Text slot="label">{props.children}</Text>
          ) : (
            props.children
          )}
          {hasSubmenu && <ChevronRight />}
        </>
      )}
    </AriaMenuItem>
  );
}

export function MenuSection<T>(props: MenuSectionProps<T>) {
  return <AriaMenuSection {...props} />;
}

export function SubmenuTrigger(props: Omit<SubmenuTriggerProps, 'children'> & {children: [() => JSX.Element, () => JSX.Element]}) {
  return (
    <AriaSubmenuTrigger {...props} children={[props.children[0], () => (<Popover hideArrow offset={-2} crossOffset={-4}>
        {props.children[1]()}
      </Popover>)]} />
  );
}

export {Text, Header, Separator, Keyboard};
