import type {ComponentProps} from '@solidjs/web';
import {omit} from 'solid-js';
import {
  GridList as AriaGridList,
  GridListItem as AriaGridListItem,
  GridListHeader as AriaGridListHeader,
  Button,
  type GridListItemProps,
  type GridListProps
} from 'solid-aria-components/GridList';
import {composeRenderProps} from 'solid-aria-components/composeRenderProps';
import {tv} from 'tailwind-variants';
import {Checkbox} from './solid-Checkbox';
import {composeTailwindRenderProps, focusRing} from './utils';
import type {JSX} from '@solidjs/web';
import {twMerge} from 'tailwind-merge';

export function GridList<T>(inputProps: GridListProps<T>) {
  let props = omit(inputProps, "children");
  let isHorizontal = () =>
    (props as {orientation?: 'horizontal' | 'vertical'}).orientation === 'horizontal';
  return (
    <AriaGridList
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        isHorizontal()
          ? 'flex flex-row flex-nowrap overflow-x-auto relative w-full max-w-[500px] bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg font-sans empty:flex empty:items-center empty:justify-center empty:italic empty:text-sm'
          : 'overflow-auto w-[200px] relative bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg font-sans empty:flex empty:items-center empty:justify-center empty:italic empty:text-sm'
      )}>
      {inputProps.children}
    </AriaGridList>
  );
}

const itemStyles = tv({
  extend: focusRing,
  base: [
    'relative flex gap-3 cursor-default select-none py-2 px-3 text-sm text-neutral-900 dark:text-neutral-200 border-transparent -outline-offset-2',
    '[[data-orientation=vertical]_&]:border-t [[data-orientation=vertical]_&]:dark:border-t-neutral-700 [[data-orientation=vertical]_&]:first:border-t-0 [[data-orientation=vertical]_&]:first:rounded-t-lg [[data-orientation=vertical]_&]:last:rounded-b-lg',
    '[[data-orientation=horizontal]_&]:border-l [[data-orientation=horizontal]_&]:dark:border-l-neutral-700 [[data-orientation=horizontal]_&]:first:border-l-0 [[data-orientation=horizontal]_&]:first:rounded-s-lg [[data-orientation=horizontal]_&]:last:rounded-e-lg [[data-orientation=horizontal]_&]:flex-shrink-0'
  ].join(' '),
  variants: {
    isSelected: {
      false:
        'hover:bg-neutral-100 pressed:bg-neutral-100 dark:hover:bg-neutral-700/60 dark:pressed:bg-neutral-700/60',
      true: [
        'bg-blue-100 dark:bg-blue-700/30 hover:bg-blue-200 pressed:bg-blue-200 dark:hover:bg-blue-700/40 dark:pressed:bg-blue-700/40 z-20',
        '[[data-orientation=vertical]_&]:border-y-blue-200 [[data-orientation=vertical]_&]:dark:border-y-blue-900',
        '[[data-orientation=horizontal]_&]:border-x-blue-200 [[data-orientation=horizontal]_&]:dark:border-x-blue-900 '
      ].join(' ')
    },
    isDisabled: {
      true: 'text-neutral-300 dark:text-neutral-600 forced-colors:text-[GrayText] z-10'
    }
  }
});

export function GridListItem(inputProps: GridListItemProps) {
  let props = omit(inputProps, "children");
  let textValue = () => (typeof inputProps.children === 'string' ? inputProps.children : undefined);
  return (
    <AriaGridListItem textValue={textValue()} {...props} className={itemStyles}>
      {composeRenderProps(
        inputProps.children,
        (children, {selectionMode, selectionBehavior, allowsDragging}) => (
          <>
            {/* Add elements for drag and drop and selection. */}
            {allowsDragging && <Button slot="drag">≡</Button>}
            {selectionMode !== 'none' && selectionBehavior === 'toggle' && (
              <Checkbox slot="selection" />
            )}
            {children}
          </>
        )
      )}
    </AriaGridListItem>
  );
}

export function GridListHeader(inputProps: ComponentProps<typeof AriaGridListHeader>) {
  let props = omit(inputProps, "children");
  return (
    <AriaGridListHeader
      {...props}
      className={twMerge(
        'text-sm font-semibold text-neutral-500 dark:text-neutral-300 px-4 py-1 -mt-px z-10 bg-neutral-100/60 dark:bg-neutral-700/60 backdrop-blur-md supports-[-moz-appearance:none]:bg-neutral-100 border-y border-y-neutral-200 dark:border-y-neutral-700',
        props.className
      )}>
      {inputProps.children}
    </AriaGridListHeader>
  );
}
