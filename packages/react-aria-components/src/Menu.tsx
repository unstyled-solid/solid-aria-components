/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {
  AriaMenuProps,
  useMenu,
  useMenuItem,
  useMenuSection,
  useMenuTrigger,
  useSubmenuTrigger
} from 'react-aria/useMenu';
import {
  BaseCollection,
  CollectionNode,
  ItemNode,
  LoaderNode,
  SectionNode
} from 'react-aria/private/collections/BaseCollection';
import {
  MenuTriggerProps as BaseMenuTriggerProps,
  useSubmenuTriggerState
} from 'react-stately/useMenuTriggerState';
import {useMenuTriggerState} from 'react-stately/private/menu/useMenuTriggerState';
import {RootMenuTriggerStateContext} from './RootMenuTriggerStateContext';
export {RootMenuTriggerStateContext} from './RootMenuTriggerStateContext';
import {
  ClassNameOrFunction,
  ContextValue,
  DEFAULT_SLOT,
  dom,
  DOMRenderProps,
  PossibleLinkDOMRenderProps,
  Provider,
  RenderProps,
  SlotProps,
  StyleProps,
  StyleRenderProps,
  useContextProps,
  useRenderProps,
  useSlot,
  useSlottedContext
} from './utils';
import {Collection} from 'react-aria/Collection';
import {
  CollectionBuilder,
  createBranchComponent,
  createLeafComponent
} from 'react-aria/CollectionBuilder';
import {
  CollectionProps,
  CollectionRendererContext,
  ItemRenderProps,
  SectionContext,
  SectionProps,
  usePersistedKeys
} from './Collection';
import {FieldInputContext} from './FieldInputContext';
import {SelectableCollectionContext, type SelectableCollectionContextValue} from './SelectableCollectionContext';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {
  FocusEvents,
  FocusStrategy,
  GlobalDOMAttributes,
  HoverEvents,
  Key,
  LinkDOMProps,
  MultipleSelection,
  PressEvents
} from '@react-types/shared';
import {FocusScope} from 'react-aria/FocusScope';
import {HeaderContext} from './HeaderContext';
import {inertValue} from 'react-aria/private/utils/inertValue';
import {KeyboardContext} from './Keyboard';
import {
  LoadMoreSentinelProps,
  useLoadMoreSentinel
} from 'react-aria/private/utils/useLoadMoreSentinel';
import {mergeProps} from 'react-aria/mergeProps';
import {MultipleSelectionState} from 'react-stately/useMultipleSelectionState';
import {Node} from '@react-types/shared';
import {OverlayTriggerStateContext} from './Dialog';
import {PopoverContext} from './PopoverContext';
import {PressResponder} from 'react-aria/private/interactions/PressResponder';
import {createContext, createMemo, merge, omit, useContext, type Ref as ForwardedRef, type Element as ReactElement, type Element as ReactNode} from 'solid-js';
import {dynamic, type JSX} from '@solidjs/web';
import type {RefObject} from '@react-types/shared';
import {SelectionIndicatorContext} from './SelectionIndicatorContext';
import {SelectionManager} from 'react-stately/private/selection/SelectionManager';
import {liveView} from 'react-stately/private/collections/useCollection';
import {SeparatorContext} from './Separator';
import {SharedElementTransition} from './SharedElementTransition';
import {TextContext} from './Text';
import {TreeState, useTreeState} from 'react-stately/useTreeState';
import {useHover} from 'react-aria/useHover';
import {useIsHidden} from 'react-aria/private/collections/Hidden';
import {useMultipleSelectionState} from 'react-stately/useMultipleSelectionState';
import {useObjectRef, type ObjectRef, type Ref as ObjectRefInput} from 'react-aria/private/utils/useObjectRef';

export const MenuContext = createContext<ContextValue<MenuProps<any>, HTMLDivElement>>(null);
export const MenuStateContext = createContext<TreeState<any> | null>(null);
const SelectionManagerContext = createContext<SelectionManager | null>(null);

export interface MenuTriggerProps extends BaseMenuTriggerProps {
  children: ReactNode;
}

export function MenuTrigger(props: MenuTriggerProps): JSX.Element | null {
  let state = useMenuTriggerState(props);
  let ref = useObjectRef<HTMLButtonElement>();
  let {menuTriggerProps, menuProps} = useMenuTrigger(
    merge(props, {
      type: 'menu' as const
    }),
    state,
    ref
  );
  let scrollRef = useObjectRef<HTMLDivElement>();

  // If within a collection (e.g. Tabs), render nothing.
  // Not using createHideableComponent for this because that also creates a forwardRef.
  let isHidden = useIsHidden();
  if (isHidden) {
    return null;
  }

  return (
    <Provider
      values={[
        [MenuContext, merge(menuProps, {ref: scrollRef})],
        [OverlayTriggerStateContext, state],
        [RootMenuTriggerStateContext, state],
        [
          PopoverContext,
          {
            trigger: 'MenuTrigger',
            triggerRef: ref,
            scrollRef,
            placement: 'bottom start',
            get 'aria-labelledby'() { return menuProps['aria-labelledby']; },
            get offset() { return props.trigger === 'contextMenu' ? 0 : undefined; }
          }
        ]
      ]}>
      <PressResponder {...menuTriggerProps} ref={ref} isPressed={state.isOpen}>
        {props.children}
      </PressResponder>
    </Provider>
  );
}

export interface SubmenuTriggerProps {
  /**
   * The contents of the SubmenuTrigger. The first child should be an Item (the trigger) and the
   * second child should be the Popover (for the submenu).
   * Native JSX may supply a pair of factories so the trigger is constructed in the collection
   * and the Popover is constructed beneath the submenu providers.
   */
  children: ReactElement[] | [() => JSX.Element, () => JSX.Element];
  /**
   * The delay time in milliseconds for the submenu to appear after hovering over the trigger.
   *
   * @default 200
   */
  delay?: number;
}

const SubmenuTriggerContext = createContext<{
  parentMenuRef: RefObject<HTMLElement | null>;
  shouldUseVirtualFocus?: boolean;
} | null>(null);

class SubmenuTriggerNode<T> extends CollectionNode<T> {
  static readonly type = 'submenutrigger';

  filter(
    collection: BaseCollection<T>,
    newCollection: BaseCollection<T>,
    filterFn: (textValue: string, node: Node<T>) => boolean
  ): CollectionNode<T> | null {
    let triggerNode = collection.getItem(this.firstChildKey!);
    if (triggerNode && filterFn(triggerNode.textValue, this)) {
      let clone = this.clone();
      newCollection.addDescendants(clone, collection);
      return clone;
    }

    return null;
  }
}

/**
 * A submenu trigger is used to wrap a submenu's trigger item and the submenu itself.
 *
 * @version alpha
 */
export const SubmenuTrigger = /*#__PURE__*/ createBranchComponent(
  SubmenuTriggerNode,
  (props: SubmenuTriggerProps, ref: ForwardedRef<HTMLDivElement>, item) => {
    let {CollectionBranch} = useContext(CollectionRendererContext);
    let state = useContext(MenuStateContext)!;
    let rootMenuTriggerState = useContext(RootMenuTriggerStateContext)!;
    let submenuTriggerState = useSubmenuTriggerState({triggerKey: item.key}, rootMenuTriggerState);
    let submenuRef = useObjectRef<HTMLDivElement>();
    let itemRef = useObjectRef(ref as ObjectRefInput<HTMLDivElement>);
    let submenuContext = useContext(SubmenuTriggerContext)!;
    let {submenuTriggerProps, submenuProps, popoverProps} = useSubmenuTrigger(
      {
        parentMenuRef: submenuContext.parentMenuRef,
        submenuRef,
        get delay() { return props.delay; },
        get shouldUseVirtualFocus() { return submenuContext.shouldUseVirtualFocus; }
      },
      submenuTriggerState,
      itemRef
    );
    let popupRenderProps = useRenderProps<undefined, 'div'>({
      get children() { return props.children[1]; },
      values: undefined
    });

    return (
      <Provider
        values={[
          [MenuItemContext, merge(submenuTriggerProps, {onAction: undefined, ref: itemRef})],
          [
            MenuContext,
            merge({ref: submenuRef}, submenuProps)
          ],
          [OverlayTriggerStateContext, submenuTriggerState],
          [
            PopoverContext,
            merge({
              trigger: 'SubmenuTrigger',
              triggerRef: itemRef,
              placement: 'end top' as const,
              get 'aria-labelledby'() { return submenuProps['aria-labelledby']; }
            }, popoverProps)
          ]
        ]}>
        <CollectionBranch collection={state.collection} parent={item} />
        {popupRenderProps.children}
      </Provider>
    );
  },
  props => <SubmenuTriggerChild>{props.children[0]}</SubmenuTriggerChild>
);

function SubmenuTriggerChild(props: {children: ReactElement | (() => JSX.Element)}) {
  let renderProps = useRenderProps<undefined, 'div'>({
    get children() { return props.children; },
    values: undefined
  });
  return <>{renderProps.children}</>;
}

export interface MenuRenderProps {
  /**
   * Whether the menu has no items and should display its empty state.
   *
   * @selector [data-empty]
   */
  isEmpty: boolean;
}

export interface MenuProps<T>
  extends
    Omit<AriaMenuProps<T>, 'children'>,
    CollectionProps<T>,
    StyleRenderProps<MenuRenderProps>,
    SlotProps,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-Menu'
   */
  className?: ClassNameOrFunction<MenuRenderProps>;
  /** Provides content to display when there are no items in the menu. */
  renderEmptyState?: () => ReactNode;
  /** Whether the menu should close when the menu item is selected. */
  shouldCloseOnSelect?: boolean;
  ref?: ForwardedRef<HTMLDivElement>;
}

/**
 * A menu displays a list of actions or options that a user can choose.
 */
export function Menu<T>(originalProps: MenuProps<T>) {
  let [props, mergedRef] = useContextProps(originalProps, undefined, MenuContext);
  let ref = useObjectRef<HTMLDivElement>(mergedRef as ObjectRefInput<HTMLDivElement>);

  // Delay rendering the actual menu until we have the collection so that auto focus works properly.
  return (
    <CollectionBuilder content={<Collection {...props} />}>
      {collection => <MenuInner props={props} collection={collection} menuRef={ref} forwardedRef={originalProps.ref} />}
    </CollectionBuilder>
  );
}

interface MenuInnerProps<T> {
  // For now we append filter and other autocomplete context props here for typescript, but eventually we can consider exposing these
  // as top level props for users to use with standalone Menus
  props: MenuProps<T> & {
    filter?: SelectableCollectionContextValue<object>['filter'];
    shouldUseVirtualFocus?: boolean;
  };
  collection: BaseCollection<any>;
  menuRef: ObjectRef<HTMLDivElement>;
  forwardedRef?: ForwardedRef<HTMLDivElement>;
}

function MenuInner<T>(input: MenuInnerProps<T>) {
  let [props, mergedRef] = useContextProps(input.props, element => input.menuRef(element as HTMLDivElement), SelectableCollectionContext);
  let ref = useObjectRef<HTMLElement>(mergedRef as ObjectRefInput<HTMLElement>);
  let filteredCollection = createMemo(() => props.filter ? input.collection.filter(props.filter) : input.collection);
  let state = useTreeState(merge(props, {
    get collection() { return filteredCollection(); },
    children: undefined
  }));
  let triggerState = useContext(RootMenuTriggerStateContext);
  let {isVirtualized, CollectionRoot} = useContext(CollectionRendererContext);
  let {menuProps} = useMenu(
    merge(props, {isVirtualized, get onClose() { return props.onClose || triggerState?.close; }}),
    state,
    ref
  );
  let renderProps = useRenderProps(merge(omit(props, 'children'), {
    children: undefined,
    defaultClassName: 'react-aria-Menu',
    values: {
      get isEmpty() { return state.collection.size === 0; }
    }
  }));

  let emptyState = () => state.collection.size === 0 && props.renderEmptyState ? (
      <div role="menuitem" style={{display: 'contents'}}>
        {props.renderEmptyState()}
      </div>
    ) : null;
  let persistedKeys = usePersistedKeys(() => state.selectionManager.focusedKey);
  let rootTriggerState = triggerState ?? useMenuTriggerState({});

  let DOMProps = filterDOMProps(props, {global: true});

  return (
    <FocusScope>
      <dom.div
        {...mergeProps(DOMProps, renderProps, menuProps)}
        ref={[ref, input.forwardedRef]}
        slot={props.slot || undefined}
        data-empty={state.collection.size === 0 ? 'true' : undefined}
        onScroll={props.onScroll}>
        <Provider
          values={[
            [MenuStateContext, state],
            [SeparatorContext, {elementType: 'div'}],
            [SectionContext, {name: 'MenuSection', render: MenuSectionInner}],
            [
              SubmenuTriggerContext,
              {
                parentMenuRef: ref,
                get shouldUseVirtualFocus() { return props.shouldUseVirtualFocus; }
              }
            ],
            [MenuItemContext, {get shouldCloseOnSelect() { return props.shouldCloseOnSelect; }}],
            [SelectableCollectionContext, null],
            [FieldInputContext, null],
            [SelectionManagerContext, state.selectionManager],
            /* Ensure root MenuTriggerState is defined, in case Menu is rendered outside a MenuTrigger. */
            /* We assume the context can never change between defined and undefined. */
            // oxlint-disable-next-line react/react-compiler, react-hooks/rules-of-hooks
            [RootMenuTriggerStateContext, rootTriggerState]
          ]}>
          <SharedElementTransition>
            <CollectionRoot
              collection={state.collection}
              persistedKeys={persistedKeys()}
              scrollRef={ref}
            />
          </SharedElementTransition>
        </Provider>
        {emptyState()}
      </dom.div>
    </FocusScope>
  );
}

export interface MenuSectionProps<T>
  extends
    SectionProps<T>,
    Omit<MultipleSelection, 'disabledKeys'>,
    DOMRenderProps<'section', undefined> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element.
   *
   * @default 'react-aria-MenuSection'
   */
  className?: string;
  /** Whether the menu should close when the menu item is selected. */
  shouldCloseOnSelect?: boolean;
}

// A subclass of SelectionManager that forwards focus-related properties to the parent,
// but has its own local selection state.
class GroupSelectionManager extends SelectionManager {
  private parent: SelectionManager;

  constructor(parent: SelectionManager, state: MultipleSelectionState) {
    super(parent.collection, state);
    this.parent = parent;
  }

  get focusedKey() {
    return this.parent.focusedKey;
  }

  get isFocused() {
    return this.parent.isFocused;
  }

  setFocusedKey(key: Key | null, childFocusStrategy?: FocusStrategy): void {
    return this.parent.setFocusedKey(key, childFocusStrategy);
  }

  setFocused(isFocused: boolean): void {
    this.parent.setFocused(isFocused);
  }

  get childFocusStrategy() {
    return this.parent.childFocusStrategy;
  }
}

function MenuSectionInner<T>(
  props: MenuSectionProps<T>,
  ref: ForwardedRef<HTMLElement>,
  section: Node<T>,
  className = 'react-aria-MenuSection'
) {
  let state = useContext(MenuStateContext)!;
  let {CollectionBranch} = useContext(CollectionRendererContext);
  let [headingRef, heading] = useSlot();
  let {headingProps, groupProps} = useMenuSection({
    get heading() { return heading(); },
    get 'aria-label'() { return section.props['aria-label'] ?? undefined; }
  });
  let renderProps = useRenderProps(merge(omit(props, 'id', 'children'), {
    id: undefined,
    children: undefined,
    defaultClassName: className,
    get className() { return section.props?.className; },
    get style() { return section.props?.style; },
    values: undefined
  }));

  let parent = useContext(SelectionManagerContext)!;
  let selectionState = useMultipleSelectionState(props);
  let manager = liveView(createMemo(() => props.selectionMode != null ? new GroupSelectionManager(parent, selectionState) : parent));

  let parentItemContext = useSlottedContext(MenuItemContext);

  let DOMProps = omit(filterDOMProps(props as any, {global: true}), 'id');

  return (
    <dom.section {...mergeProps(DOMProps, renderProps, groupProps)} ref={ref}>
      <Provider
        values={[
          [HeaderContext, merge(headingProps, {ref: headingRef})],
          [SelectionManagerContext, manager],
          [MenuItemContext, {get shouldCloseOnSelect() { return props.shouldCloseOnSelect ?? parentItemContext?.shouldCloseOnSelect; }}]
        ]}>
        <CollectionBranch collection={state.collection} parent={section} />
      </Provider>
    </dom.section>
  );
}

/**
 * A MenuSection represents a section within a Menu.
 */
export const MenuSection = /*#__PURE__*/ createBranchComponent(SectionNode, MenuSectionInner);

export interface MenuItemRenderProps extends ItemRenderProps {
  /**
   * Whether the item has a submenu.
   *
   * @selector [data-has-submenu]
   */
  hasSubmenu: boolean;
  /**
   * Whether the item's submenu is open.
   *
   * @selector [data-open]
   */
  isOpen: boolean;
}

export interface MenuItemProps<T = object>
  extends
    Omit<RenderProps<MenuItemRenderProps>, 'render'>,
    PossibleLinkDOMRenderProps<'div', MenuItemRenderProps>,
    LinkDOMProps,
    HoverEvents,
    FocusEvents,
    PressEvents,
    Omit<GlobalDOMAttributes<HTMLDivElement>, 'onClick'> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-MenuItem'
   */
  className?: ClassNameOrFunction<MenuItemRenderProps>;
  /** The unique id of the item. */
  id?: Key;
  /**
   * The object value that this item represents. When using dynamic collections, this is set
   * automatically.
   */
  value?: T;
  /** A string representation of the item's contents, used for features like typeahead. */
  textValue?: string;
  /** An accessibility label for this item. */
  'aria-label'?: string;
  /** Whether the item is disabled. */
  isDisabled?: boolean;
  /** Handler that is called when the item is selected. */
  onAction?: () => void;
  /** Whether the menu should close when the menu item is selected. */
  shouldCloseOnSelect?: boolean;
}

const MenuItemContext = createContext<ContextValue<MenuItemProps, HTMLDivElement>>(null);

/**
 * A MenuItem represents an individual action in a Menu.
 */
export const MenuItem = /*#__PURE__*/ createLeafComponent(ItemNode, function MenuItem<
  T
>(props: MenuItemProps<T>, forwardedRef: ForwardedRef<HTMLDivElement>, item: Node<T>) {
  [props, forwardedRef] = useContextProps(props, forwardedRef, MenuItemContext);
  let itemContext = useSlottedContext(MenuItemContext);
  let state = useContext(MenuStateContext)!;
  let ref = useObjectRef<HTMLDivElement>(forwardedRef as ObjectRefInput<HTMLDivElement>);
  let selectionManager = useContext(SelectionManagerContext)!;
  let {isVirtualized} = useContext(CollectionRendererContext);
  let {menuItemProps, labelProps, descriptionProps, keyboardShortcutProps, ...states} = useMenuItem(
    merge(omit(props, 'id'), {
      get id() { return itemContext?.id as string; },
      key: item.key,
      selectionManager,
      isVirtualized: isVirtualized
    }),
    state,
    ref
  );

  let {hoverProps, isHovered} = useHover({
    get isDisabled() { return states.isDisabled(); }
  });
  let triggerProps = props as MenuItemProps<T> & Pick<JSX.HTMLAttributes<HTMLDivElement>, 'aria-haspopup' | 'aria-expanded'>;
  let renderProps = useRenderProps<MenuItemRenderProps, any>(merge(omit(props, 'id', 'children'), {
    id: undefined,
    get children() { return item.rendered; },
    defaultClassName: 'react-aria-MenuItem',
    values: {
      get isDisabled() { return states.isDisabled(); },
      get isPressed() { return states.isPressed(); },
      get isSelected() { return states.isSelected(); },
      get isFocused() { return states.isFocused(); },
      get isHovered() { return isHovered(); },
      get isFocusVisible() { return states.isFocusVisible(); },
      get selectionMode() { return selectionManager.selectionMode; },
      get selectionBehavior() { return selectionManager.selectionBehavior; },
      get hasSubmenu() { return !!triggerProps['aria-haspopup']; },
      get isOpen() { return triggerProps['aria-expanded'] === 'true'; }
    }
  }));

  let ElementType = dynamic(() => props.href ? dom.a : dom.div);
  let DOMProps = omit(filterDOMProps(props as any, {global: true}), 'id', 'onClick');

  return (
    <ElementType
      {...mergeProps(DOMProps, renderProps, menuItemProps, hoverProps)}
      ref={ref}
      data-disabled={states.isDisabled() ? 'true' : undefined}
      data-hovered={isHovered() ? 'true' : undefined}
      data-focused={states.isFocused() ? 'true' : undefined}
      data-focus-visible={states.isFocusVisible() ? 'true' : undefined}
      data-pressed={states.isPressed() ? 'true' : undefined}
      data-selected={states.isSelected() ? 'true' : undefined}
      data-selection-mode={
        selectionManager.selectionMode === 'none' ? undefined : selectionManager.selectionMode
      }
      data-has-submenu={triggerProps['aria-haspopup'] ? 'true' : undefined}
      data-open={triggerProps['aria-expanded'] === 'true' ? 'true' : undefined}>
      <Provider
        values={[
          [
            TextContext,
            {
              slots: {
                [DEFAULT_SLOT]: labelProps as Pick<typeof labelProps, 'id'>,
                label: labelProps as Pick<typeof labelProps, 'id'>,
                description: descriptionProps as Pick<typeof descriptionProps, 'id'>
              }
            }
          ],
          [KeyboardContext, keyboardShortcutProps as Pick<typeof keyboardShortcutProps, 'id'>],
          [SelectionIndicatorContext, {get isSelected() { return states.isSelected(); }}]
        ]}>
        {renderProps.children}
      </Provider>
    </ElementType>
  );
});

export interface MenuLoadMoreItemProps
  extends
    Omit<LoadMoreSentinelProps, 'collection' | 'direction'>,
    StyleProps,
    DOMRenderProps<'div', undefined>,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element.
   *
   * @default 'react-aria-MenuLoadingIndicator'
   */
  className?: string;
  /**
   * The load more spinner to render when loading additional items.
   */
  children?: ReactNode;
  /**
   * Whether or not the loading spinner should be rendered or not.
   */
  isLoading?: boolean;
}

export const MenuLoadMoreItem = createLeafComponent(
  LoaderNode,
  function MenuLoadingIndicator(
    props: MenuLoadMoreItemProps,
    ref: ForwardedRef<HTMLDivElement>,
    item: Node<object>
  ) {
    let state = useContext(MenuStateContext)!;
    let otherProps = omit(props, 'isLoading', 'onLoadMore', 'scrollOffset');

    let sentinelRef = useObjectRef<HTMLDivElement>();
    let memoedLoadMoreProps = {
      get onLoadMore() { return props.onLoadMore; },
      get collection() { return state?.collection; },
      sentinelRef,
      get scrollOffset() { return props.scrollOffset; }
    };
    useLoadMoreSentinel(memoedLoadMoreProps, sentinelRef);
    let renderProps = useRenderProps(merge(otherProps, {
      id: undefined,
      get children() { return item.rendered; },
      defaultClassName: 'react-aria-MenuLoadingIndicator',
      values: undefined
    }));

    let itemProps = {
      // For Android talkback
      tabIndex: -1
    };

    return (
      <>
        {/* Always render the sentinel. For now onus is on the user for styling when using flex + gap (this would introduce a gap even though it doesn't take room) */}
        {/* @ts-ignore - compatibility with React < 19 */}
        <div style={{position: 'relative', width: 0, height: 0}} inert={inertValue(true)}>
          <div
            data-testid="loadMoreSentinel"
            ref={sentinelRef}
            style={{position: 'absolute', height: '1px', width: '1px'}}
          />
        </div>
        {props.isLoading && renderProps.children && (
          <>
            {/* oxlint-disable jsx-a11y/role-has-required-aria-props -- loader row is not selectable */}
            <dom.div
              {...mergeProps(filterDOMProps(props, {global: true}), itemProps)}
              {...renderProps}
              role="menuitem"
              ref={ref as ForwardedRef<HTMLDivElement>}>
              {renderProps.children}
            </dom.div>
            {/* oxlint-enable jsx-a11y/role-has-required-aria-props */}
          </>
        )}
      </>
    );
  }
);
