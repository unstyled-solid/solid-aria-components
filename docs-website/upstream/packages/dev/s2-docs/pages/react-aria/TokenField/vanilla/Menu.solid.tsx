import type { JSX } from '@solidjs/web';
import { createMemo, omit } from 'solid-js';
'use client';
import { Check, ChevronRight, Dot } from '../native-icons/solid-icons';
import { Menu as AriaMenu, MenuItem as AriaMenuItem, MenuLoadMoreItem as AriaMenuLoadMoreItem, MenuSection as AriaMenuSection, MenuTrigger as AriaMenuTrigger, SubmenuTrigger as AriaSubmenuTrigger, Header, Separator, Keyboard, type MenuItemProps, type MenuLoadMoreItemProps, type MenuProps, type MenuSectionProps, type MenuTriggerProps, type SubmenuTriggerProps } from 'solid-aria-components';
import { Popover } from './Popover.solid';
import { ProgressCircle } from './ProgressCircle.solid';
import { Text } from './Content.solid';
import './Menu.css';
export function MenuTrigger(props: MenuTriggerProps) {
      return <AriaMenuTrigger {...omit(props, 'children')}><MenuTriggerContents source={() => props.children} /></AriaMenuTrigger>;
  }
  function MenuTriggerContents(props: {source: () => JSX.Element}) {
      const parts = createMemo(() => {
        const value = props.source();
        return Array.isArray(value) ? value : [value];
      });
      return <>{parts()[0]}<Popover>{parts()[1]}</Popover></>;
  }
export function Menu<T>(props: MenuProps<T>) {
  return <AriaMenu {...props}>{props.children}</AriaMenu>;
}
export function MenuLoadMoreItem(props: MenuLoadMoreItemProps) {
  return <AriaMenuLoadMoreItem {...props}><ProgressCircle isIndeterminate aria-label="Loading more..." /></AriaMenuLoadMoreItem>;
}
export function MenuItem(props: Omit<MenuItemProps, 'children'> & {
    children?: JSX.Element;
}) {
    return (<AriaMenuItem {...props}>
      {(live0) => (<>
          {live0.isSelected && live0.selectionMode === 'multiple' ? <Check /> : null}
          {live0.isSelected && live0.selectionMode === 'single' ? <Dot /> : null}
          {typeof props.children === 'string' ? (<Text slot="label">{props.children}</Text>) : (props.children)}
          {live0.hasSubmenu && <ChevronRight />}
        </>)}
    </AriaMenuItem>);
}
export function MenuSection<T>(props: MenuSectionProps<T>) {
    return <AriaMenuSection {...props}/>;
}
export function SubmenuTrigger(props: SubmenuTriggerProps) {
    const part = (index: number) => { let value = props.children[index]; return typeof value === 'function' ? value() : value; };
    return <AriaSubmenuTrigger {...props} children={[
            () => part(0),
            () => <Popover hideArrow offset={-2} crossOffset={-4}>{part(1)}</Popover>
        ]}/>;
}
export { Text, Header, Separator, Keyboard };
