/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {ActionButton} from './ActionButton';
import {
  Breadcrumb as AriaBreadcrumb,
  BreadcrumbProps as AriaBreadcrumbItemProps,
  BreadcrumbsProps as AriaBreadcrumbsProps,
  Breadcrumbs as RACBreadcrumbs
} from 'react-aria-components/Breadcrumbs';
import {baseColor, focusRing, size, style} from '../style' with {type: 'macro'};
import ChevronIcon from '../ui-icons/Chevron';
import {
  Collection,
  DOMRefValue,
  GlobalDOMAttributes,
  LinkDOMProps,
  Node
} from '@react-types/shared';
import {
  CollectionRenderer,
  CollectionRendererContext,
  DefaultCollectionRenderer
} from 'react-aria-components/CollectionBuilder';
import {ContextValue, Provider} from 'react-aria-components/slots';
import {
  controlFont,
  controlSize,
  getAllowedOverrides,
  StyleProps
} from './style-utils' with {type: 'macro'};
import {createContext, createEffect, createMemo, createSignal, For, omit, onSettled, untrack, useContext, type Accessor, type Ref} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {useObjectRef, type ObjectRef} from 'react-aria/private/utils/useObjectRef';
import FolderIcon from '../icons/FolderBreadcrumb';
import {HeadingContext} from 'react-aria-components/Heading';
import intlMessages from '../intl/*.json';
import {Link, LinkRenderProps} from 'react-aria-components/Link';
import {Menu, MenuItem, MenuTrigger} from './Menu';
import {Text} from './Content';
import {useDOMRef} from './useDOMRef';
import {useLocale} from 'react-aria/I18nProvider';
import {useLocalizedStringFormatter} from 'react-aria/useLocalizedStringFormatter';
import {useResizeObserver} from 'react-aria/private/utils/useResizeObserver';
import {useSpectrumContextProps} from './useSpectrumContextProps';

const MIN_VISIBLE_ITEMS = 1;
const MAX_VISIBLE_ITEMS = 4;

interface BreadcrumbsStyleProps {
  /**
   * Size of the Breadcrumbs including spacing and layout.
   *
   * @default 'M'
   */
  size?: 'M' | 'L';
  /** Whether the breadcrumbs are disabled. */
  isDisabled?: boolean;
  /**
   * Whether to place the last Breadcrumb item onto a new line.
   */
  // TODO: isMultiline?: boolean
  /** Whether to always show the root item if the items are collapsed. */
  // TODO: showRoot?: boolean,
}

export interface BreadcrumbsProps<T>
  extends
    Omit<
      AriaBreadcrumbsProps<T>,
      'children' | 'style' | 'className' | 'render' | keyof GlobalDOMAttributes
    >,
    BreadcrumbsStyleProps,
    StyleProps {
  /** The children of the Breadcrumbs. */
  children: JSX.Element | ((item: T) => JSX.Element);
}

export const BreadcrumbsContext =
  createContext<ContextValue<Partial<BreadcrumbsProps<any>>, DOMRefValue<HTMLOListElement>>>(null);

const wrapper = style<BreadcrumbsStyleProps>(
  {
    position: 'relative',
    display: 'flex',
    justifyContent: 'start',
    listStyleType: 'none',
    flexWrap: 'nowrap',
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    gap: {
      size: {
        // TODO: why do these scale but other spacings don't?
        M: size(6), // breadcrumbs-text-to-separator-medium
        L: size(9) // breadcrumbs-text-to-separator-large
      }
    },
    padding: 0,
    transition: 'default',
    marginTop: 0,
    marginBottom: 0,
    marginStart: {
      size: {
        M: size(6),
        L: size(9)
      }
    }
  },
  getAllowedOverrides()
);

const InternalBreadcrumbsContext = createContext<Partial<BreadcrumbsProps<any>>>({});

/** Breadcrumbs show hierarchy and navigational context for a user's location within an application. */
export function Breadcrumbs<T>(
  inputProps: BreadcrumbsProps<T> & {ref?: Ref<DOMRefValue<HTMLOListElement>>}
) {
  let [props, ref] = useSpectrumContextProps(inputProps, untrack(() => inputProps.ref), BreadcrumbsContext);
  let domRef = useDOMRef(ref);
  let otherProps = omit(props, 'UNSAFE_className', 'UNSAFE_style', 'styles', 'size', 'children', 'isDisabled', 'ref');
  let context = {get size() {return props.size ?? 'M';}, get isDisabled() {return props.isDisabled;}};

  return (
    <Provider values={[[InternalBreadcrumbsContext, context]]}>
      <CollapsingCollection containerRef={domRef} onAction={props.onAction}>
        <RACBreadcrumbs
          {...otherProps}
          isDisabled={props.isDisabled}
          ref={domRef}
          style={props.UNSAFE_style}
          className={
            (props.UNSAFE_className ?? '') +
            wrapper(
              {
                size: props.size ?? 'M'
              },
              props.styles
            )
          }>
          {props.children}
        </RACBreadcrumbs>
      </CollapsingCollection>
    </Provider>
  );
}

let BreadcrumbMenu = (props: {
  items: Array<Node<any>>;
  onAction: BreadcrumbsProps<unknown>['onAction'];
}) => {
  let stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-spectrum/s2');
  let locale = useLocale();
  let context = useContext(InternalBreadcrumbsContext);
  return (
    <CollectionRendererContext value={DefaultCollectionRenderer}>
      <li class={breadcrumbStyles({size: context.size, isDisabled: context.isDisabled, isMenu: true})}>
        <MenuTrigger>
          <ActionButton isDisabled={context.isDisabled} isQuiet aria-label={stringFormatter.format('breadcrumbs.more')}>
            <FolderIcon />
          </ActionButton>
          <Menu items={props.items} onAction={props.onAction}>
            {(item: Node<any>) => (
              <MenuItem {...item.props.originalProps} key={item.key}>
                <Text slot="label">
                   {item.props.children({size: context.size, isCurrent: false, isMenu: true})}
                </Text>
              </MenuItem>
            )}
          </Menu>
        </MenuTrigger>
        <ChevronIcon size={context.size} className={chevronStyles({direction: locale.direction, isMenu: true})} />
      </li>
    </CollectionRendererContext>
  );
};

let HiddenBreadcrumbs = function (props: {
  listRef: ObjectRef<HTMLDivElement>;
  items: Array<Node<any>>;
  size: string;
}) {
  return (
    <div
      inert={true}
      ref={props.listRef}
      class={style({
        display: 'inherit',
        gap: 'inherit',
        flexWrap: 'inherit',
        position: 'absolute',
        top: 0,
        bottom: 0,
        start: 0,
        end: 0,
        visibility: 'hidden',
        overflow: 'hidden',
        opacity: 0
      })}>
      <For each={props.items} keyed={item => item.key}>{(item, idx) => {
        // pull off individual props as an allow list, don't want refs or other props getting through
        return (
          <div
            data-hidden-breadcrumb
            style={item().props.UNSAFE_style}
            class={item().props.className({size: props.size, isCurrent: idx() === props.items.length - 1})}>
            {item().props.children({size: props.size, isCurrent: idx() === props.items.length - 1})}
          </div>
        );
      }}</For>
      <ActionButton data-hidden-button isQuiet>
        <FolderIcon />
      </ActionButton>
    </div>
  );
};

const breadcrumbStyles = style<BreadcrumbsStyleProps & {isMenu?: boolean; isCurrent?: boolean}>({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  height: controlSize(),
  transition: 'default',
  position: 'relative',
  flexShrink: 0,
  color: {
    default: 'neutral',
    isDisabled: 'disabled',
    forcedColors: {
      default: 'ButtonText',
      isDisabled: 'GrayText'
    }
  },
  borderStyle: 'none',
  marginStart: {
    // adjusts with the parent flex gap
    isMenu: size(-6)
  }
});

const chevronStyles = style({
  scale: {
    direction: {
      rtl: -1
    }
  },
  marginStart: {
    default: 'text-to-visual',
    isMenu: 0
  },
  color: {
    default: 'neutral',
    forcedColors: {
      default: 'LinkText'
    }
  },
  '--iconPrimary': {
    type: 'fill',
    value: 'currentColor'
  }
});

const linkStyles = style<LinkRenderProps & {size?: 'M' | 'L'; isCurrent?: boolean}>({
  ...focusRing(),
  borderRadius: 'sm',
  font: controlFont(),
  color: {
    default: baseColor('neutral-subdued'),
    isDisabled: 'disabled',
    isCurrent: baseColor('neutral'),
    forcedColors: {
      default: 'LinkText',
      isDisabled: 'GrayText',
      isCurrent: 'GrayText'
    }
  },
  transition: 'default',
  textDecoration: {
    default: 'none',
    isHovered: 'underline',
    isFocusVisible: 'underline',
    isDisabled: 'none'
  },
  cursor: {
    default: 'pointer',
    isDisabled: 'default'
  },
  outlineColor: {
    default: 'focus-ring',
    forcedColors: 'Highlight'
  },
  disableTapHighlight: true
});

const currentStyles = style<{size: string}>({
  font: controlFont(),
  fontWeight: 'bold',
  color: {
    default: 'neutral',
    forcedColors: 'ButtonText'
  }
});

// TODO: support user heading size customization, for now just set it to large
const heading = style({
  margin: 0,
  font: 'heading-lg',
  fontWeight: 'extra-bold'
});

export interface BreadcrumbProps
  extends
    Omit<
      AriaBreadcrumbItemProps,
      | 'children'
      | 'style'
      | 'className'
      | 'render'
      | 'autoFocus'
      | 'onClick'
      | keyof GlobalDOMAttributes
    >,
    LinkDOMProps {
  /** The children of the breadcrumb item. */
  children: JSX.Element;
}

/** An individual Breadcrumb for Breadcrumbs. */
export function Breadcrumb(
  inputProps: BreadcrumbProps & {ref?: Ref<DOMRefValue<HTMLLIElement>>}
) {
  let props = omit(inputProps, 'children', 'ref');
  let context = useContext(InternalBreadcrumbsContext);
  let size = () => context.size ?? 'M';
  let domRef = useDOMRef<HTMLLIElement>(untrack(() => inputProps.ref));
  let locale = useLocale();
  return (
    <AriaBreadcrumb
      {...props}
      ref={domRef}
      // @ts-ignore
      originalProps={props}
      className={({isCurrent, isDisabled}) => breadcrumbStyles({size: size(), isCurrent, isDisabled})}>
      {({
        isCurrent,
        isDisabled,
        // @ts-ignore
        isMenu
      }) => {
        if (isMenu) {
          return inputProps.children;
        }
        return isCurrent ? (
          <div class={currentStyles({size: size()})}>
            <Provider values={[[HeadingContext, {className: heading}]]}>{inputProps.children}</Provider>
          </div>
        ) : (
          <>
            <Link
              style={({isFocusVisible}) => ({clipPath: isFocusVisible ? 'none' : 'margin-box'})}
              href={props.href}
              target={props.target}
              rel={props.rel}
              download={props.download}
              ping={props.ping}
              referrerPolicy={props.referrerPolicy}
              isDisabled={isDisabled || isCurrent}
              className={({isFocused, isFocusVisible, isHovered, isDisabled, isPressed}) =>
                linkStyles({
                  isFocused,
                  isFocusVisible,
                  isHovered,
                  isDisabled,
                  size: size(),
                  isPressed,
                  isCurrent
                })
              }>
              {inputProps.children}
            </Link>
            <ChevronIcon size="M" className={chevronStyles({direction: locale.direction})} />
          </>
        );
      }}
    </AriaBreadcrumb>
  );
}

// Context for passing the count for the custom renderer
let CollapseContext = createContext<{
  containerRef: ObjectRef<HTMLOListElement>;
  onAction: BreadcrumbsProps<unknown>['onAction'];
} | null>(null);

function CollapsingCollection(props: {children: JSX.Element; containerRef: ObjectRef<HTMLOListElement>; onAction: BreadcrumbsProps<unknown>['onAction']}) {
  let value = {get containerRef() {return props.containerRef;}, get onAction() {return props.onAction;}};
  return (
    <CollapseContext value={value}>
      <CollectionRendererContext value={CollapsingCollectionRenderer}>
        {props.children}
      </CollectionRendererContext>
    </CollapseContext>
  );
}

let CollapsingCollectionRenderer: CollectionRenderer = {
  CollectionRoot(props) {
    return useCollectionRender(() => props.collection);
  },
  CollectionBranch(props) {
    return useCollectionRender(() => props.collection);
  }
};

let useCollectionRender = (getCollection: Accessor<Collection<Node<unknown>>>) => {
  let collapse = useContext(CollapseContext);
  let [visibleItems, setVisibleItems] = createSignal(untrack(() => getCollection().size));
  let context = useContext(InternalBreadcrumbsContext);

  let children = createMemo(() => {
    let collection = getCollection();
    let result: Node<any>[] = [];
    for (let key of collection.getKeys()) {
      result.push(collection.getItem(key)!);
    }
    return result;
  });

  let listRef = useObjectRef<HTMLDivElement>();
  let updateOverflow = () => {
    let collection = getCollection();
    let currListRef: HTMLDivElement | null = listRef.current;
    if (!currListRef) {
      setVisibleItems(collection.size);
      return;
    }
    let container = currListRef.parentElement;
    if (!container) {
      setVisibleItems(collection.size);
      return;
    }

    let listItems = Array.from(
      currListRef.querySelectorAll('[data-hidden-breadcrumb]')
    ) as HTMLLIElement[];
    let folder = currListRef.querySelector('button') as HTMLButtonElement;
    if (listItems.length <= 0) {
      setVisibleItems(collection.size);
      return;
    }
    let containerWidth = container.offsetWidth;
    let containerGap = parseInt(getComputedStyle(container).gap, 10);
    let folderGap = parseInt(getComputedStyle(folder).marginInlineStart, 10);
    let newVisibleItems = 0;
    let maxVisibleItems = MAX_VISIBLE_ITEMS;

    let widths: Array<number> = [];
    let totalWidth = 0;
    for (let breadcrumb of listItems) {
      let width = breadcrumb.offsetWidth + 1; // offsetWidth is rounded down
      widths.push(width);
      totalWidth += width;
    }

    // can we fit all the items without collapsing
    if (
      totalWidth <= containerWidth - collection.size * containerGap &&
      collection.size <= MAX_VISIBLE_ITEMS
    ) {
      setVisibleItems(collection.size);
      return;
    }

    // we know there is always at least one item because of the listItems.length check up above
    let widthOfFirst = widths.shift()!;
    let availableWidth =
      containerWidth - widthOfFirst - folderGap - folder.offsetWidth - containerGap;
    maxVisibleItems -= 2; // account for the first item and folder
    for (let width of widths.reverse()) {
      availableWidth -= width;
      if (availableWidth <= 0) {
        break;
      }
      availableWidth -= containerGap;
      newVisibleItems++;
    }

    setVisibleItems(Math.max(MIN_VISIBLE_ITEMS, Math.min(maxVisibleItems, newVisibleItems)));
  };

  // making bad assumption that i can listen to containerRef when it's declared in the parent?
  useResizeObserver({get ref() {return collapse?.containerRef;}, onResize: updateOverflow});

  createEffect(() => getCollection().size, count => {
    if (count > 0) {
      queueMicrotask(updateOverflow);
    }
  });

  onSettled(() => {
    // Recalculate visible tags when fonts are loaded.
    document.fonts?.ready.then(() => updateOverflow());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });
  let sliceIndex = () => getCollection().size - visibleItems();

  return (
    <>
      <HiddenBreadcrumbs items={children()} size={context.size ?? 'M'} listRef={listRef} />
      {visibleItems() < getCollection().size && getCollection().size > 2 ? (
        <>
          {children()[0].render?.(children()[0])}
          <BreadcrumbMenu items={children().slice(1, sliceIndex())} onAction={collapse?.onAction} />
          <For each={children().slice(sliceIndex())} keyed={node => node.key}>{node => node().render?.(node())}</For>
        </>
      ) : (
        <>
          <For each={children()} keyed={node => node.key}>{node => node().render?.(node())}</For>
        </>
      )}
    </>
  );
};
