'use client';
import {
  Button,
  Link,
  type LinkProps,
  NavigationTree as AriaNavigationTree,
  NavigationTreeHeader as AriaNavigationTreeHeader,
  type NavigationTreeHeaderProps,
  NavigationTreeItem as AriaNavigationTreeItem,
  NavigationTreeItemContent as AriaNavigationTreeItemContent,
  type NavigationTreeItemContentRenderProps,
  type NavigationTreeItemProps as AriaNavigationTreeItemProps,
  type NavigationTreeProps,
  NavigationTreeSection as AriaNavigationTreeSection,
  type NavigationTreeSectionProps
} from 'solid-aria-components/NavigationTree';
import {ChevronRight} from '../../../ListBox/native-icons/solid-icons';
import {createContext, useContext, omit} from 'solid-js';
import type {JSX} from '@solidjs/web';
import './NavigationTree.css';

const RenderLinkContext = createContext<LinkProps['render'] | undefined>(undefined);

export function NavigationTree<T>(input: NavigationTreeProps<T> & {renderLink?: LinkProps['render']}) {
  const props = omit(input, 'renderLink');
  return (
    <RenderLinkContext value={input.renderLink}>
      <AriaNavigationTree {...props} />
    </RenderLinkContext>
  );
}

export function NavigationTreeItemContent(props: {children?: JSX.Element}) {
  return (
    <AriaNavigationTreeItemContent>
      {(live: NavigationTreeItemContentRenderProps) => (
        <>
          {props.children}
          <Button
            slot="chevron"
             isDisabled={!live.hasChildItems}
             style={{visibility: live.hasChildItems ? undefined : 'hidden'}}>
            <ChevronRight aria-hidden="true" />
          </Button>
        </>
      )}
    </AriaNavigationTreeItemContent>
  );
}

export function NavigationTreeItem(props: AriaNavigationTreeItemProps) {
  return <AriaNavigationTreeItem {...props} />;
}

export function NavigationTreeSection<T extends object>(props: NavigationTreeSectionProps<T>) {
  return <AriaNavigationTreeSection {...props} />;
}

export function NavigationTreeHeader(props: NavigationTreeHeaderProps) {
  return <AriaNavigationTreeHeader {...props} />;
}

export function NavigationTreeItemLink(input: LinkProps) {
  const props = omit(input, 'render');
  const contextRender = useContext(RenderLinkContext);
  return <Link render={input.render ?? contextRender} {...props} />;
}
