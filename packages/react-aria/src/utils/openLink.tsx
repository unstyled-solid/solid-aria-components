/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {focusWithoutScrolling} from './focusWithoutScrolling';
import {Href, LinkDOMProps, RouterOptions} from '@react-types/shared';
import {isIPad, isMac, isWebKit} from './platform';
import {createContext, useContext} from 'solid-js';
import type {Element as Child} from 'solid-js';
import type {DOMAttributes} from '@react-types/shared';
import type {JSX} from '@solidjs/web';

interface Router {
  isNative: boolean;
  open: (
    target: Element,
    modifiers: Modifiers,
    href: Href,
    routerOptions: RouterOptions | undefined
  ) => void;
  useHref: (href: Href) => string;
}

const RouterContext = createContext<Router>({
  isNative: true,
  open: openSyntheticLink,
  useHref: href => href
});

interface RouterProviderProps {
  navigate: (path: Href, routerOptions: RouterOptions | undefined) => void;
  useHref?: (href: Href) => string;
  children: Child;
}

/**
 * A RouterProvider accepts a `navigate` function from a framework or client side router,
 * and provides it to all nested React Aria links to enable client side navigation.
 */
export function RouterProvider(props: RouterProviderProps): JSX.Element {
  let ctx: Router = {
    isNative: false,
    open: (
      target: Element,
      modifiers: Modifiers,
      href: Href,
      routerOptions: RouterOptions | undefined
    ) => {
      getSyntheticLink(target, link => {
        if (shouldClientNavigate(link, modifiers)) {
          props.navigate(href, routerOptions);
        } else {
          openLink(link, modifiers);
        }
      });
    },
    useHref: href => props.useHref ? props.useHref(href) : href
  };

  return <RouterContext value={ctx}>{props.children}</RouterContext>;
}

export function useRouter(): Router {
  return useContext(RouterContext);
}

interface Modifiers {
  metaKey?: boolean;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
}

export function shouldClientNavigate(link: HTMLAnchorElement, modifiers: Modifiers): boolean {
  // Use getAttribute here instead of link.target. Firefox will default link.target to "_parent" when inside an iframe.
  let target = link.getAttribute('target');
  return (
    (!target || target === '_self') &&
    link.origin === location.origin &&
    !link.hasAttribute('download') &&
    !modifiers.metaKey && // open in new tab (mac)
    !modifiers.ctrlKey && // open in new tab (windows)
    !modifiers.altKey && // download
    !modifiers.shiftKey
  );
}

export function openLink(target: HTMLAnchorElement, modifiers: Modifiers, setOpening = true): void {
  let {metaKey, ctrlKey, altKey, shiftKey} = modifiers;

  // WebKit does not support firing click events with modifier keys, but does support keyboard events.
  // https://github.com/WebKit/WebKit/blob/c03d0ac6e6db178f90923a0a63080b5ca210d25f/Source/WebCore/html/HTMLAnchorElement.cpp#L184
  let event =
    isWebKit() && isMac() && !isIPad() && process.env.NODE_ENV !== 'test'
      ? // @ts-ignore - keyIdentifier is a non-standard property, but it's what webkit expects
        new KeyboardEvent('keydown', {keyIdentifier: 'Enter', metaKey, ctrlKey, altKey, shiftKey})
      : new MouseEvent('click', {
          metaKey,
          ctrlKey,
          altKey,
          shiftKey,
          detail: 1,
          bubbles: true,
          cancelable: true
        });
  (openLink as any).isOpening = setOpening;
  focusWithoutScrolling(target);
  target.dispatchEvent(event);
  (openLink as any).isOpening = false;
}
// https://github.com/parcel-bundler/parcel/issues/8724
(openLink as any).isOpening = false;

function getSyntheticLink(target: Element, open: (link: HTMLAnchorElement) => void) {
  if (target instanceof HTMLAnchorElement) {
    open(target);
  } else if (target.hasAttribute('data-href')) {
    let link = document.createElement('a');
    link.href = target.getAttribute('data-href')!;
    if (target.hasAttribute('data-target')) {
      link.target = target.getAttribute('data-target')!;
    }
    if (target.hasAttribute('data-rel')) {
      link.rel = target.getAttribute('data-rel')!;
    }
    if (target.hasAttribute('data-download')) {
      link.download = target.getAttribute('data-download')!;
    }
    if (target.hasAttribute('data-ping')) {
      link.ping = target.getAttribute('data-ping')!;
    }
    if (target.hasAttribute('data-referrer-policy')) {
      link.referrerPolicy = target.getAttribute('data-referrer-policy')!;
    }
    target.appendChild(link);
    open(link);
    target.removeChild(link);
  }
}

function openSyntheticLink(target: Element, modifiers: Modifiers) {
  getSyntheticLink(target, link => openLink(link, modifiers));
}

export function useSyntheticLinkProps(props: LinkDOMProps): DOMAttributes<HTMLElement> {
  let router = useRouter();
  return {
    get 'data-href'() { return props.href ? router.useHref(props.href) : undefined; },
    get 'data-target'() { return props.target; },
    get 'data-rel'() { return props.rel; },
    get 'data-download'() { return props.download; },
    get 'data-ping'() { return props.ping; },
    get 'data-referrer-policy'() { return props.referrerPolicy; }
  } as DOMAttributes<HTMLElement>;
}

/** @deprecated - For backward compatibility. */
export function getSyntheticLinkProps(props: LinkDOMProps): DOMAttributes<HTMLElement> {
  return {
    get 'data-href'() { return props.href; },
    get 'data-target'() { return props.target; },
    get 'data-rel'() { return props.rel; },
    get 'data-download'() { return props.download; },
    get 'data-ping'() { return props.ping; },
    get 'data-referrer-policy'() { return props.referrerPolicy; }
  } as DOMAttributes<HTMLElement>;
}

export function useLinkProps(props?: LinkDOMProps): LinkDOMProps {
  let router = useRouter();
  const keys = ['href', 'target', 'rel', 'download', 'ping', 'referrerPolicy'] as const;
  const isLinkKey = (key: PropertyKey): key is typeof keys[number] => keys.some(value => value === key);
  return new Proxy({} as LinkDOMProps, {
    get: (_, key) => isLinkKey(key) && props && props[key] !== undefined
      ? key === 'href' ? router.useHref(props.href ?? '') : props[key] : undefined,
    ownKeys: () => keys.filter(key => props && key in props && props[key] !== undefined),
    has: (_, key) => isLinkKey(key) && !!props && key in props && props[key] !== undefined,
    getOwnPropertyDescriptor: (_, key) => isLinkKey(key) && props && key in props && props[key] !== undefined
      ? {enumerable: true, configurable: true} : undefined
  });
}

export function handleLinkClick(
  e: MouseEvent,
  router: Router,
  href: Href | undefined,
  routerOptions: RouterOptions | undefined
): void {
  // If a custom router is provided, prevent default and forward if this link should client navigate.
  if (
    !router.isNative &&
    e.currentTarget instanceof HTMLAnchorElement &&
    e.currentTarget.href &&
    // If props are applied to a router Link component, it may have already prevented default.
    !e.defaultPrevented &&
    shouldClientNavigate(e.currentTarget, e) &&
    href
  ) {
    e.preventDefault();
    router.open(e.currentTarget, e, href, routerOptions);
  }
}
