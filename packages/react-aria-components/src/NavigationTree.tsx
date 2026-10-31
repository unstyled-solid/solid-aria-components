/*
 * Copyright 2026 Adobe. All rights reserved.
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
  ChildrenOrFunction,
  ClassNameOrFunction,
  ContextValue,
  dom,
  Provider,
  StyleRenderProps,
  useContextProps
} from './utils';
import {Collection, Key, Node, RouterOptions, RefObject} from '@react-types/shared';
import {getScrollParent} from 'react-aria/private/utils/getScrollParent';
import {LinkContext, type LinkProps} from './Link';
import {nodeContains} from 'react-aria/private/utils/shadowdom/DOMFunctions';
import {createContext, createEffect, createSignal, merge, omit, untrack, useContext, type Ref as ForwardedRef} from 'solid-js';
import type {JSX} from '@solidjs/web';
type ReactNode = JSX.Element;
import {scrollIntoView} from 'react-aria/private/utils/scrollIntoView';
import {
  Tree,
  TreeHeader,
  TreeHeaderProps,
  TreeItem,
  TreeItemContent,
  TreeItemContentRenderProps,
  TreeItemProps,
  TreeItemRenderProps,
  TreeProps,
  TreeRenderProps,
  TreeSection,
  TreeSectionProps
} from './Tree';
import {TreeState} from 'react-stately/useTreeState';
import {useObjectRef} from 'react-aria/useObjectRef';
import {attachRef, type Ref as ObjectRefInput} from 'react-aria/private/utils/useObjectRef';

export const NavigationTreeContext =
  createContext<ContextValue<NavigationTreeProps<any>, HTMLDivElement>>(null);

interface InternalNavigationTreeContextValue {
  /** The route that is currently selected. */
  selectedRoute?: string | null;
  /** The last route the focused key was synced to; dedupes the focus sync across items. */
  syncedRouteRef?: RefObject<string | undefined>;
  /** The NavigationTree's root element, used to keep current-route scrolling inside the tree. */
  treeRef?: RefObject<HTMLDivElement | null>;
}
const InternalNavigationTreeContext = createContext<InternalNavigationTreeContextValue>({});

interface NavigationTreeItemLinkContextValue {
  href?: string;
  hrefLang?: string;
  target?: LinkProps['target'];
  rel?: string;
  download?: string | boolean;
  ping?: string;
  referrerPolicy?: LinkProps['referrerPolicy'];
  routerOptions?: RouterOptions;
  isCurrent?: boolean;
  // Whether the item's link (as opposed to another focusable child such as a button) is focused.
  isLinkFocused?: boolean;
  setLinkFocused?: (isFocused: boolean) => void;
}
const NavigationTreeItemLinkContext = createContext<NavigationTreeItemLinkContextValue>({});

export const NavigationTreeItemStateContext = createContext<{isCurrentAncestor: boolean}>({
  isCurrentAncestor: false
});

export interface NavigationTreeRenderProps extends Pick<
  TreeRenderProps,
  'isEmpty' | 'isFocused' | 'isFocusVisible' | 'state'
> {}

export interface NavigationTreeProps<T>
  extends
    Omit<
      TreeProps<T>,
      | 'selectionMode'
      | 'selectionBehavior'
      | 'selectedKeys'
      | 'defaultSelectedKeys'
      | 'onSelectionChange'
      | 'disallowEmptySelection'
      | 'disabledBehavior'
      | 'keyboardNavigationBehavior'
      | 'escapeKeyBehavior'
      | 'shouldSelectOnPressUp'
      | 'dragAndDropHooks'
      | 'renderEmptyState'
      | 'onAction'
      | 'className'
      | 'style'
      | 'render'
    >,
    StyleRenderProps<NavigationTreeRenderProps> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-NavigationTree'
   */
  className?: ClassNameOrFunction<NavigationTreeRenderProps>;
  /** The route that is currently selected, matched against each item's `href`. */
  selectedRoute?: string | null;
}

/**
 * A NavigationTree provides users with a way to navigate a nested, hierarchical set of links.
 */
export function NavigationTree<T>(input: NavigationTreeProps<T> & {ref?: ForwardedRef<HTMLDivElement>}) {
  let [props, ref] = useContextProps(input, element => attachRef(input.ref as ObjectRefInput<HTMLDivElement>, element as HTMLDivElement), NavigationTreeContext);
  let rest = omit(props, 'className', 'style', 'children', 'selectedRoute', 'ref');
  let syncedRouteRef = {current: undefined as string | undefined};
  let treeRef = useObjectRef<HTMLDivElement>(ref as ObjectRefInput<HTMLDivElement>);
  let context = {get selectedRoute() { return props.selectedRoute; }, syncedRouteRef, treeRef};

  return (
    <InternalNavigationTreeContext value={context}>
      <Tree
        {...rest}
        ref={treeRef}
        className={props.className ?? 'react-aria-NavigationTree'}
        style={props.style}
        selectionMode="none"
        keyboardNavigationBehavior="tab">
        {props.children}
      </Tree>
    </InternalNavigationTreeContext>
  );
}

export interface NavigationTreeItemRenderProps extends TreeItemRenderProps {
  /**
   * Whether this item is the current route (its `href` matches the NavigationTree's
   * `selectedRoute`).
   *
   * @selector [data-current]
   */
  isCurrent: boolean;
  /**
   * Whether this item is an ancestor of the current-route item (at any level, regardless of whether
   * it is expanded or collapsed).
   *
   * @selector [data-current-ancestor]
   */
  isCurrentAncestor: boolean;
}

export interface NavigationTreeItemProps<T = object>
  extends
    Omit<
      TreeItemProps<T>,
      'className' | 'style' | 'render' | 'onAction' | 'allowsArrowNavigation' | 'value'
    >,
    StyleRenderProps<NavigationTreeItemRenderProps> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-NavigationTreeItem'
   */
  className?: ClassNameOrFunction<NavigationTreeItemRenderProps>;
  /**
   * The content of the side nav item along with any nested children. Supports static nested side
   * nav items or use of a Collection to dynamically render nested side nav items.
   */
  children: ReactNode;
}

/**
 * A NavigationTreeItem represents an individual item in a NavigationTree.
 */
export function NavigationTreeItem<T extends object>(props: NavigationTreeItemProps<T> & {ref?: ForwardedRef<HTMLDivElement>}) {
    let rest = omit(props, 'href', 'hrefLang', 'target', 'rel', 'download', 'ping', 'referrerPolicy', 'routerOptions', 'className', 'style', 'render', 'ref');
    let context = useContext(InternalNavigationTreeContext);
    let hasLink = () => props.href != null && props.href.length > 0;
    let isCurrent = () => hasLink() && props.href === context.selectedRoute;
    let [isLinkFocused, setLinkFocused] = createSignal(false);
    // Additional render props NavigationTreeItem adds to what TreeItem already provides.
    let getItemRenderProps = <R extends TreeItemRenderProps>(
      renderProps: R
    ): R & {isCurrent: boolean; isCurrentAncestor: boolean} => merge(renderProps, {
      get isCurrent() { return isCurrent(); },
      get isCurrentAncestor() { return hasSelectedDescendant(renderProps.id, renderProps.state, context.selectedRoute); },
      get isFocusVisible() {
        return renderProps.isFocusVisible || (renderProps.isFocusVisibleWithin && isLinkFocused());
      }
    }) as R & {isCurrent: boolean; isCurrentAncestor: boolean};

    let objRef = useObjectRef<HTMLDivElement>(element => attachRef(props.ref as ObjectRefInput<HTMLDivElement>, element));
    createEffect(() => ({current: isCurrent(), element: objRef.current, treeRoot: context.treeRef?.current}), ({current, element, treeRoot}) => {
      if (current && element) {
        let scrollParent = getScrollParent(element, true) as HTMLElement;
        // Only scroll the tree's own scroll container into view — never an outer ancestor such as the
        // page. When the tree isn't its own scroll container the nearest scroll parent is outside the
        // tree, so we skip rather than hijack the surrounding scroll position.
        if (treeRoot && nodeContains(treeRoot, scrollParent)) {
          scrollIntoView(scrollParent, element, {block: 'center'});
        }
      }
    });

    return (
      <NavigationTreeItemLinkContext
        value={{
          get href() { return props.href; },
          get hrefLang() { return props.hrefLang; },
          get target() { return props.target; },
          get rel() { return props.rel; },
          get download() { return props.download; },
          get ping() { return props.ping; },
          get referrerPolicy() { return props.referrerPolicy; },
          get routerOptions() { return props.routerOptions; },
          get isCurrent() { return isCurrent(); },
          get isLinkFocused() { return isLinkFocused(); },
          setLinkFocused
        }}>
        <TreeItem
          {...rest}
          ref={objRef}
          href={props.href}
          focusMode={hasLink() ? 'child' : undefined}
          allowsArrowNavigation
           data-current={isCurrent() ? 'true' : undefined}
          className={
            typeof props.className === 'function'
              ? renderProps => (props.className as Exclude<typeof props.className, string | undefined>)(getItemRenderProps(renderProps))
              : (props.className ?? 'react-aria-NavigationTreeItem')
          }
          style={
            typeof props.style === 'function'
              ? renderProps => (props.style as Exclude<typeof props.style, JSX.CSSProperties | undefined>)(getItemRenderProps(renderProps))
              : props.style
          }
          render={(domProps, renderProps) => {
            let values = getItemRenderProps(renderProps);
            let domRest = omit(domProps, 'children');
            let dataProps = {
              get 'data-focus-visible'() { return values.isFocusVisible ? 'true' : undefined; },
              get 'data-current-ancestor'() { return values.isCurrentAncestor ? 'true' : undefined; }
            };
            let content = () => (
              <NavigationTreeItemStateContext
                value={{get isCurrentAncestor() { return values.isCurrentAncestor; }}}>
                {domProps.children}
              </NavigationTreeItemStateContext>
            );
            return typeof props.render === 'function' ? (
              props.render(merge(domRest, dataProps, {get children() { return content(); }}), values)
            ) : (
              <div {...domRest} {...dataProps}>
                {content()}
              </div>
            );
          }}
        />
      </NavigationTreeItemLinkContext>
    );
}

export interface NavigationTreeItemContentRenderProps extends NavigationTreeItemRenderProps {}

export interface NavigationTreeItemContentProps {
  /**
   * The children of the component. A function may be provided to alter the children based on
   * component state.
   */
  children: ChildrenOrFunction<NavigationTreeItemContentRenderProps>;
}

// The collection key of the item whose href matches `route`, or null.
function findKeyForRoute(collection: Collection<Node<unknown>>, route: string): Key | null {
  for (let key of collection.getKeys()) {
    if (collection.getItem(key)?.props?.href === route) {
      return key;
    }
  }
  return null;
}

// Walks up from `key` to the closest ancestor that is actually rendered (all ancestors expanded).
// Returns `key` unchanged when already visible. A collapsed ancestor hides everything beneath it,
// so the highest collapsed ancestor is the closest visible row.
function closestVisibleKey(
  collection: Collection<Node<unknown>>,
  expandedKeys: Set<Key>,
  key: Key
): Key {
  let target = key;
  let node = collection.getItem(key);
  while (node?.parentKey != null) {
    let parent = collection.getItem(node.parentKey);
    if (parent?.type === 'item' && !expandedKeys.has(node.parentKey)) {
      target = node.parentKey;
    }
    node = parent;
  }
  return target;
}

// Moves the tree's focused key to the item matching selectedRoute. Runs when the route or the
// collection changes; the shared syncedRouteRef dedupes across items so it fires once per change.
function useRouteFocusSync(input: {state: TreeState<unknown>}): void {
  let context = useContext(InternalNavigationTreeContext);
  createEffect(() => {
    let selectedRoute = context.selectedRoute;
    let collection = input.state.collection;
    let key = selectedRoute == null ? null : findKeyForRoute(collection, selectedRoute);
    return {
      selectedRoute,
      key: key == null ? null : closestVisibleKey(collection, input.state.expandedKeys, key),
      setFocusedKey: input.state.selectionManager.setFocusedKey.bind(input.state.selectionManager)
    };
  }, ({selectedRoute, key, setFocusedKey}) => {
    let syncedRouteRef = context.syncedRouteRef;
    if (
      selectedRoute == null ||
      syncedRouteRef == null ||
      syncedRouteRef.current === selectedRoute
    ) {
      return;
    }
    if (key != null) {
      syncedRouteRef.current = selectedRoute;
      untrack(() => setFocusedKey(key));
    }
  });
}

// Cache so each row doesn't have to walk up the tree every time.
let selectedAncestorsCache = new WeakMap<
  Collection<Node<unknown>>,
  {selection: unknown; ancestors: Set<Key>}
>();

// The set of collection keys that are ancestors of the item matching `selectedRoute`.
function getSelectedAncestors(state: TreeState<unknown>, selectedRoute: string): Set<Key> {
  let {collection} = state;
  let cached = selectedAncestorsCache.get(collection);
  if (cached && cached.selection === selectedRoute) {
    return cached.ancestors;
  }
  let matchKey = findKeyForRoute(collection, selectedRoute);
  let ancestors = new Set<Key>();
  let node = matchKey != null ? collection.getItem(matchKey) : null;
  while (node?.parentKey != null && !ancestors.has(node.parentKey)) {
    ancestors.add(node.parentKey);
    node = collection.getItem(node.parentKey);
  }
  selectedAncestorsCache.set(collection, {selection: selectedRoute, ancestors});
  return ancestors;
}

// Whether the row `id` is an ancestor of the item matching `selectedRoute`.
function hasSelectedDescendant(
  id: Key | undefined,
  state: TreeState<unknown>,
  selectedRoute: string | undefined | null
): boolean {
  if (id == null || selectedRoute == null || !state) {
    return false;
  }
  return getSelectedAncestors(state, selectedRoute).has(id);
}

export function NavigationTreeItemContent(props: NavigationTreeItemContentProps): ReactNode {
  let linkCtx = useContext(NavigationTreeItemLinkContext);
  return (
    <TreeItemContent {...props}>
      {(treeRenderProps: TreeItemContentRenderProps & {defaultChildren: ReactNode | undefined}) => (
        <NavigationTreeItemContentInner
          treeRenderProps={treeRenderProps}
          linkCtx={linkCtx}
          children={props.children}
        />
      )}
    </TreeItemContent>
  );
}

interface NavigationTreeItemContentInnerProps {
  treeRenderProps: TreeItemContentRenderProps & {defaultChildren: ReactNode | undefined};
  linkCtx: NavigationTreeItemLinkContextValue;
  children: ChildrenOrFunction<NavigationTreeItemContentRenderProps>;
}

function NavigationTreeItemContentInner(props: NavigationTreeItemContentInnerProps): ReactNode {
  let itemState = useContext(NavigationTreeItemStateContext);
  let linkProps = omit(props.linkCtx, 'isCurrent', 'isLinkFocused', 'setLinkFocused');

  useRouteFocusSync({get state() { return props.treeRenderProps.state; }});

  // isFocusVisible follows the link: true when the row itself is keyboard focused, or when a child
  // is keyboard focused and that child is the link (not another button/action).
  let linkFocusVisible = () => props.treeRenderProps.isFocusVisible || (props.treeRenderProps.isFocusVisibleWithin && !!props.linkCtx.isLinkFocused);
  let values: NavigationTreeItemContentRenderProps & {defaultChildren: ReactNode | undefined} = merge(props.treeRenderProps, {
    get isCurrent() { return !!props.linkCtx.isCurrent; },
    get isCurrentAncestor() { return itemState.isCurrentAncestor; },
    get isFocusVisible() { return linkFocusVisible(); }
  });
  // Provide onFocusChange so the link reports its focus up to NavigationTreeItem.
  let linkContextValue = merge(linkProps, {
    get 'aria-current'() { return props.linkCtx.isCurrent ? ('page' as const) : undefined; },
    get onFocusChange() { return props.linkCtx.setLinkFocused; },
    get onPress() { return linkProps.href == null && props.treeRenderProps.hasChildItems ? () => props.treeRenderProps.state.toggleKey(props.treeRenderProps.id) : undefined; }
  });
  return <Provider values={[[LinkContext, linkContextValue]]}>{typeof props.children === 'function' ? props.children(values) : props.children}</Provider>;
}

export interface NavigationTreeSectionProps<T> extends Omit<TreeSectionProps<T>, 'value'> {}

/**
 * A NavigationTreeSection represents a section within a NavigationTree.
 */
export function NavigationTreeSection<T extends object>(
  props: NavigationTreeSectionProps<T>
): ReactNode {
  return (
    <TreeSection className="react-aria-NavigationTreeSection" {...props}>
      {props.children}
    </TreeSection>
  );
}

export interface NavigationTreeHeaderProps extends TreeHeaderProps {}

/**
 * A NavigationTreeHeader renders the header of a NavigationTreeSection.
 */
export function NavigationTreeHeader(props: NavigationTreeHeaderProps): ReactNode {
  return (
    <TreeHeader className="react-aria-NavigationTreeHeader" {...props}>
      {props.children}
    </TreeHeader>
  );
}
