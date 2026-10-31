import type {JSX} from '@solidjs/web';
import {Check, ChevronRight} from './../../native-icons/solid-icons';
import {
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  type MenuProps,
  type MenuItemProps,
  MenuSection as AriaMenuSection,
  type MenuSectionProps as AriaMenuSectionProps,
  MenuTrigger as AriaMenuTrigger,
  SubmenuTrigger as AriaSubmenuTrigger,
  Separator,
  type SeparatorProps,
  Header,
  Collection,
  type SubmenuTriggerProps,
  type MenuTriggerProps as AriaMenuTriggerProps
} from 'solid-aria-components/Menu';
import {composeRenderProps} from 'solid-aria-components/composeRenderProps';
import {dropdownItemStyles} from './solid-ListBox';
import {Popover, type PopoverProps} from './solid-Popover';

export function Menu<T>(props: MenuProps<T>) {
  return (
    <AriaMenu
      {...props}
      className="font-sans p-1 outline outline-0 max-h-[inherit] overflow-auto [clip-path:inset(0_0_0_0_round_.75rem)] empty:text-center empty:pb-2"
    />
  );
}

export function MenuItem(props: MenuItemProps) {
  let textValue =
    () => (props.textValue || (typeof props.children === 'string' ? props.children : undefined));
  return (
    <AriaMenuItem textValue={textValue()} {...props} className={dropdownItemStyles}>
      {composeRenderProps(props.children, (children, {selectionMode, isSelected, hasSubmenu}) => (
        <>
          {selectionMode !== 'none' && (
            <span class="flex items-center w-4">
              {isSelected && <Check aria-hidden="true" className="w-4 h-4" />}
            </span>
          )}
          <span class="flex items-center flex-1 gap-2 font-normal truncate group-selected:font-semibold">
            {children}
          </span>
          {hasSubmenu && <ChevronRight aria-hidden="true" className="absolute w-4 h-4 right-2" />}
        </>
      ))}
    </AriaMenuItem>
  );
}

export function MenuSeparator(props: SeparatorProps) {
  return (
    <Separator
      {...props}
      className="mx-3 my-1 border-b border-neutral-300 dark:border-neutral-700"
    />
  );
}

export interface MenuSectionProps<T> extends AriaMenuSectionProps<T> {
  title?: string;
  items?: any;
}

export function MenuSection<T>(props: MenuSectionProps<T>) {
  return (
    <AriaMenuSection
      {...props}
      className="first:-mt-[5px] after:content-[''] after:block after:h-[5px]">
      {props.title && (
        <Header class="text-sm font-semibold text-neutral-500 dark:text-neutral-300 px-4 py-1 truncate sticky -top-[5px] -mt-px -mx-1 z-10 bg-neutral-100/60 dark:bg-neutral-700/60 backdrop-blur-md supports-[-moz-appearance:none]:bg-neutral-100 border-y border-y-neutral-200 dark:border-y-neutral-700 [&+*]:mt-1">
          {props.title}
        </Header>
      )}
      <Collection items={props.items}>{props.children}</Collection>
    </AriaMenuSection>
  );
}

interface MenuTriggerProps extends AriaMenuTriggerProps {
  placement?: PopoverProps['placement'];
}

export function MenuTrigger(props: Omit<MenuTriggerProps, 'children'> & {children: [() => JSX.Element, () => JSX.Element]}) {
  return (
    <AriaMenuTrigger {...props}>
      {props.children[0]()}
      <Popover placement={props.placement} className="min-w-[150px]">
        {props.children[1]()}
      </Popover>
    </AriaMenuTrigger>
  );
}

export function SubmenuTrigger(props: Omit<SubmenuTriggerProps, 'children'> & {children: [() => JSX.Element, () => JSX.Element]}) {
  return (
    <AriaSubmenuTrigger {...props} children={[props.children[0], () => (<Popover offset={-2} crossOffset={-4}>
        {props.children[1]()}
      </Popover>)]} />
  );
}
