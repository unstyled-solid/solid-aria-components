/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {DOMAttributes} from '@react-types/shared';
import {createContext, createEffect, createMemo, createSignal, useContext} from 'solid-js';
import {Portal, type JSX} from '@solidjs/web';
import {useIsSSR} from '../ssr/SSRProvider';
import {useUNSAFE_PortalContext} from './PortalProvider';

export interface ModalProviderProps extends DOMAttributes<HTMLDivElement> {
  children: JSX.Element;
}

interface ModalContext {
  parent: ModalContext | null;
  modalCount: number;
  addModal: () => void;
  removeModal: () => void;
}

const Context = createContext<ModalContext | null>(null);

/**
 * Each ModalProvider tracks how many modals are open in its subtree. On mount, the modals trigger
 * `addModal` to increment the count, and trigger `removeModal` on unmount to decrement it. This is
 * done recursively so that all parent providers are incremented and decremented. If the modal count
 * is greater than zero, we add `aria-hidden` to this provider to hide its subtree from screen
 * readers. This is done using React context in order to account for things like portals, which can
 * cause the React tree and the DOM tree to differ significantly in structure.
 */
export function ModalProvider(props: ModalProviderProps): JSX.Element {
  let parent = useContext(Context);
  let [modalCount, setModalCount] = createSignal(0);
  let context: ModalContext = {
      parent,
      get modalCount() { return modalCount(); },
      addModal() {
        setModalCount(count => count + 1);
        if (parent) {
          parent.addModal();
        }
      },
      removeModal() {
        setModalCount(count => count - 1);
        if (parent) {
          parent.removeModal();
        }
      }
    };

  return <Context value={context}>{props.children}</Context>;
}

export interface ModalProviderAria {
  /**
   * Props to be spread on the container element.
   */
  modalProviderProps: Pick<JSX.HTMLAttributes<HTMLDivElement>, 'aria-hidden'>;
}

/**
 * Used to determine if the tree should be aria-hidden based on how many
 * modals are open.
 */
export function useModalProvider(): ModalProviderAria {
  let context = useContext(Context);
  return {
    modalProviderProps: {
      get 'aria-hidden'() { return context && context.modalCount > 0 ? 'true' : undefined; }
    }
  };
}

/**
 * Creates a root node that will be aria-hidden if there are other modals open.
 */
function OverlayContainerDOM(props: ModalProviderProps) {
  let {modalProviderProps} = useModalProvider();
  return <div data-overlay-container="true" {...props} {...modalProviderProps} />;
}

/**
 * An OverlayProvider acts as a container for the top-level application.
 * Any application that uses modal dialogs or other overlays should
 * be wrapped in a `<OverlayProvider>`. This is used to ensure that
 * the main content of the application is hidden from screen readers
 * if a modal or other overlay is opened. Only the top-most modal or
 * overlay should be accessible at once.
 */
export function OverlayProvider(props: ModalProviderProps): JSX.Element {
  return (
    <ModalProvider>
      <OverlayContainerDOM {...props} />
    </ModalProvider>
  );
}

export interface OverlayContainerProps extends ModalProviderProps {
  /**
   * The container element in which the overlay portal will be placed.
   *
   * @deprecated - Use a parent UNSAFE_PortalProvider to set your portal container instead.
   * @default document.body
   */
  portalContainer?: Element;
}

/**
 * A container for overlays like modals and popovers. Renders the overlay
 * into a Portal which is placed at the end of the document body.
 * Also ensures that the overlay is hidden from screen readers if a
 * nested modal is opened. Only the top-most modal or overlay should
 * be accessible at once.
 */
export function OverlayContainer(props: OverlayContainerProps): JSX.Element {
  let isSSR = useIsSSR();
  let portalContext = useUNSAFE_PortalContext();
  // Only a different resolved mount should recreate the portal, not unrelated
  // updates to the props object from which portalContainer is read.
  let portalContainer = createMemo(() => {
    if (!props.portalContainer && portalContext.getContainer) {
      return portalContext.getContainer();
    }
    return props.portalContainer === undefined ? (isSSR() ? null : document.body) : props.portalContainer;
  });
  let rest = new Proxy(props, {
    get(target, key) { return key === 'portalContainer' ? undefined : Reflect.get(target, key, target); },
    ownKeys(target) { return Reflect.ownKeys(target).filter(key => key !== 'portalContainer'); },
    getOwnPropertyDescriptor(target, key) {
      return key === 'portalContainer' ? undefined : Object.getOwnPropertyDescriptor(target, key);
    }
  });

  createEffect(portalContainer, container => {
    if (container?.closest('[data-overlay-container]')) {
      throw new Error(
        'An OverlayContainer must not be inside another container. Please change the portalContainer prop.'
      );
    }
  });

  return <>{() => {
    let mount = portalContainer();
    return mount ? <Portal mount={mount}><OverlayProvider {...rest} /></Portal> : null;
  }}</>;
}

interface ModalAriaProps extends DOMAttributes {
  /** Data attribute marks the dom node as a modal for the aria-modal-polyfill. */
  'data-ismodal': 'true' | 'false';
}

export interface AriaModalOptions {
  isDisabled?: boolean;
}

export interface ModalAria {
  /** Props for the modal content element. */
  modalProps: ModalAriaProps;
}

/**
 * Hides content outside the current `<OverlayContainer>` from screen readers
 * on mount and restores it on unmount. Typically used by modal dialogs and
 * other types of overlays to ensure that only the top-most modal is
 * accessible at once.
 */
export function useModal(options?: AriaModalOptions): ModalAria {
  // Add aria-hidden to all parent providers on mount, and restore on unmount.
  let context = useContext(Context);
  if (!context) {
    throw new Error('Modal is not contained within a provider');
  }

  createEffect(() => options?.isDisabled, isDisabled => {
    if (isDisabled || !context.parent) {
      return;
    }

    // The immediate context is from the provider containing this modal, so we only
    // want to trigger aria-hidden on its parents not on the modal provider itself.
    context.parent.addModal();
    return () => {
      if (context && context.parent) {
        context.parent.removeModal();
      }
    };
  });

  return {
    modalProps: {
      get 'data-ismodal'(): 'true' | 'false' { return options?.isDisabled ? 'false' : 'true'; }
    }
  };
}
