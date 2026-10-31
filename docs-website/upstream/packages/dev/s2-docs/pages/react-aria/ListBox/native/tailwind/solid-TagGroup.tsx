import {omit} from 'solid-js';
import {XIcon} from './../../native-icons/solid-icons';
import {createContext, useContext} from 'solid-js';
import {
  Tag as AriaTag,
  TagGroup as AriaTagGroup,
  type TagGroupProps as AriaTagGroupProps,
  type TagProps as AriaTagProps,
  Button,
  TagList,
  type TagListProps,
  Text
} from 'solid-aria-components/TagGroup';
import {composeRenderProps} from 'solid-aria-components/composeRenderProps';
import {twMerge} from 'tailwind-merge';
import {tv} from 'tailwind-variants';
import {Description, Label} from './solid-Field';
import {focusRing} from './utils';

const colors = {
  gray: 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-600 dark:hover:border-neutral-500',
  green:
    'bg-green-100 text-green-700 border-green-200 hover:border-green-300 dark:bg-green-300/20 dark:text-green-400 dark:border-green-300/10 dark:hover:border-green-300/20',
  yellow:
    'bg-yellow-100 text-yellow-700 border-yellow-200 hover:border-yellow-300 dark:bg-yellow-300/20 dark:text-yellow-400 dark:border-yellow-300/10 dark:hover:border-yellow-300/20',
  blue: 'bg-blue-100 text-blue-700 border-blue-200 hover:border-blue-300 dark:bg-blue-400/20 dark:text-blue-300 dark:border-blue-400/10 dark:hover:border-blue-400/20'
};

type Color = keyof typeof colors;
const ColorContext = createContext<Color>('gray');

const tagStyles = tv({
  extend: focusRing,
  base: 'transition cursor-default text-xs rounded-full border px-3 py-0.5 flex items-center max-w-fit gap-1 font-sans [-webkit-tap-highlight-color:transparent]',
  variants: {
    color: {
      gray: '',
      green: '',
      yellow: '',
      blue: ''
    },
    allowsRemoving: {
      true: 'pr-1'
    },
    isSelected: {
      true: 'bg-blue-600 text-white border-transparent forced-colors:bg-[Highlight] forced-colors:text-[HighlightText] forced-color-adjust-none'
    },
    isDisabled: {
      true: 'bg-neutral-100 dark:bg-transparent dark:border-white/20 text-neutral-300 dark:text-neutral-600 forced-colors:text-[GrayText]'
    }
  },
  compoundVariants: (Object.keys(colors) as Color[]).map(color => ({
    isSelected: false,
    isDisabled: false,
    color,
    class: colors[color]
  }))
});

export interface TagGroupProps<T>
  extends
    Omit<AriaTagGroupProps, 'children'>,
    Pick<TagListProps<T>, 'items' | 'children' | 'renderEmptyState'> {
  color?: Color;
  label?: string;
  description?: string;
  errorMessage?: string;
}

export interface TagProps extends AriaTagProps {
  color?: Color;
}

export function TagGroup<T>(inputProps: TagGroupProps<T>) {
  let props = omit(inputProps, "label", "description", "errorMessage", "items", "children", "renderEmptyState");
  return (
    <AriaTagGroup {...props} className={twMerge('flex flex-col gap-2 font-sans', props.className)}>
      <Label>{inputProps.label}</Label>
      <ColorContext value={props.color || 'gray'}>
        <TagList items={inputProps.items} renderEmptyState={inputProps.renderEmptyState} className="flex flex-wrap gap-1">
          {inputProps.children}
        </TagList>
      </ColorContext>
      {inputProps.description && <Description>{inputProps.description}</Description>}
      {inputProps.errorMessage && (
        <Text slot="errorMessage" class="text-sm text-red-600">
          {inputProps.errorMessage}
        </Text>
      )}
    </AriaTagGroup>
  );
}

const removeButtonStyles = tv({
  extend: focusRing,
  base: 'cursor-default rounded-full transition-[background-color] p-0.5 flex items-center justify-center bg-transparent text-[inherit] border-0 hover:bg-black/10 dark:hover:bg-white/10 pressed:bg-black/20 dark:pressed:bg-white/20'
});

export function Tag(inputProps: TagProps) {
  let props = omit(inputProps, "children", "color");
  let textValue = () => (typeof inputProps.children === 'string' ? inputProps.children : undefined);
  let groupColor = useContext(ColorContext);
  return (
    <AriaTag
      textValue={textValue()}
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        tagStyles({...renderProps, className, color: inputProps.color || groupColor})
      )}>
      {composeRenderProps(inputProps.children, (children, {allowsRemoving}) => (
        <>
          {children}
          {allowsRemoving && (
            <Button slot="remove" className={removeButtonStyles}>
              <XIcon aria-hidden="true" className="w-3 h-3" />
            </Button>
          )}
        </>
      ))}
    </AriaTag>
  );
}
