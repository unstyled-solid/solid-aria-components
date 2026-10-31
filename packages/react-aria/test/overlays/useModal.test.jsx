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

import {OverlayContainer, OverlayProvider, useModal} from '../../src/overlays/useModal';
import {createSignal, Errored} from 'solid-js';
import {vi as jest} from 'vitest';
import {act, render as renderNative, within} from '@react-spectrum/test-utils-internal';

// OverlayContainer portals to the body, outside the native root container.
const render = fixture => ({...renderNative(fixture), ...within(document.body)});

function ModalDOM(props) {
  let {modalProps} = useModal();
  return (
    <div data-testid={props.modalId || 'modal'} {...modalProps}>
      {props.children}
    </div>
  );
}

function Modal(props) {
  return (
    <OverlayContainer
      portalContainer={props.container}
      data-testid={props.providerId || 'modal-provider'}>
      <ModalDOM modalId={props.modalId}>{props.children}</ModalDOM>
    </OverlayContainer>
  );
}

function Example(props) {
  return (
    <OverlayProvider data-testid="root-provider">
      This is the root provider.
      {props.showModal && <Modal container={props.container}>{props.children}</Modal>}
    </OverlayProvider>
  );
}

describe('useModal', function () {
  it('should set aria-hidden on parent providers on mount and remove on unmount', function () {
    let setShowModal;
    let res = render(() => {
      let [showModal, set] = createSignal(false);
      setShowModal = set;
      return <Example showModal={showModal()} />;
    });
    let rootProvider = res.getByTestId('root-provider');

    expect(rootProvider).not.toHaveAttribute('aria-hidden');

    act(() => setShowModal(true));

    let modalProvider = res.getByTestId('modal-provider');

    expect(rootProvider).toHaveAttribute('aria-hidden', 'true');
    expect(modalProvider).not.toHaveAttribute('aria-hidden');

    act(() => setShowModal(false));
    expect(rootProvider).not.toHaveAttribute('aria-hidden');
  });

  it('should work with nested modals', function () {
    let setShowModal, setShowInner;
    let res = render(() => {
      let [showModal, set] = createSignal(false);
      let [showInner, setInner] = createSignal(false);
      setShowModal = set;
      setShowInner = setInner;
      return <Example showModal={showModal()}>
        {showInner() && <Modal providerId="inner-modal-provider" modalId="inner-modal" />}
      </Example>;
    });
    let rootProvider = res.getByTestId('root-provider');

    expect(rootProvider).not.toHaveAttribute('aria-hidden');

    act(() => setShowModal(true));

    let modalProvider = res.getByTestId('modal-provider');

    expect(rootProvider).toHaveAttribute('aria-hidden', 'true');
    expect(modalProvider).not.toHaveAttribute('aria-hidden');

    act(() => setShowInner(true));

    let innerModalProvider = res.getByTestId('inner-modal-provider');

    expect(rootProvider).toHaveAttribute('aria-hidden', 'true');
    expect(modalProvider).toHaveAttribute('aria-hidden');
    expect(innerModalProvider).not.toHaveAttribute('aria-hidden');

    act(() => setShowInner(false));
    expect(rootProvider).toHaveAttribute('aria-hidden', 'true');
    expect(modalProvider).not.toHaveAttribute('aria-hidden');

    act(() => setShowModal(false));
    expect(rootProvider).not.toHaveAttribute('aria-hidden');
  });

  it('can specify a different container from the default document.body', function () {
    let setShowModal, setShowInner;
    let res = render(() => {
      let [showModal, set] = createSignal(false);
      let [showInner, setInner] = createSignal(false);
      setShowModal = set;
      setShowInner = setInner;
      return (
      <div id="alternateContainer" data-testid="alternate-container">
        <Example showModal={showModal()} container={document.getElementById('alternateContainer')}>
          {showInner() && <Modal providerId="inner-modal-provider" modalId="inner-modal">Inner</Modal>}
        </Example>
      </div>
      );
    });
    let rootProvider = res.getByTestId('root-provider');

    expect(rootProvider).not.toHaveAttribute('aria-hidden');

    act(() => setShowModal(true));

    let modalProvider = res.getByTestId('modal-provider');

    expect(rootProvider).toHaveAttribute('aria-hidden', 'true');
    expect(modalProvider).not.toHaveAttribute('aria-hidden');

    act(() => setShowInner(true));

    let innerModalProvider = res.getByTestId('inner-modal-provider');

    expect(rootProvider).toHaveAttribute('aria-hidden', 'true');
    expect(modalProvider).toHaveAttribute('aria-hidden');
    expect(innerModalProvider).not.toHaveAttribute('aria-hidden');

    act(() => setShowModal(false));
    expect(rootProvider).not.toHaveAttribute('aria-hidden');
  });

  describe('error state', function () {
    const consoleError = console.error;
    beforeEach(() => {
      console.error = jest.fn();
    });

    afterEach(() => {
      console.error = consoleError;
    });
    it('if inside another container, throws an error', function () {
      let setShowModal, setShowInner;
      let caughtError;
      let res = render(() => {
        let [showModal, set] = createSignal(false);
        let [showInner, setInner] = createSignal(false);
        setShowModal = set;
        setShowInner = setInner;
        return (
        <div id="alternateContainer" data-testid="alternate-container">
          <Example showModal={showModal()} container={document.getElementById('alternateContainer')}>
            <div id="nestedContainer" />
            {showInner() && <Errored fallback={error => { caughtError = error(); return null; }}><Modal
              container={document.getElementById('nestedContainer')}
              providerId="inner-modal-provider"
              modalId="inner-modal">Inner</Modal></Errored>}
          </Example>
        </div>
        );
      });
      let rootProvider = res.getByTestId('root-provider');

      expect(rootProvider).not.toHaveAttribute('aria-hidden');

      act(() => setShowModal(true));

      let modalProvider = res.getByTestId('modal-provider');

      expect(rootProvider).toHaveAttribute('aria-hidden', 'true');
      expect(modalProvider).not.toHaveAttribute('aria-hidden');
      expect(() => {
        act(() => setShowInner(true));
        // Native boundaries own reactive failures; surface the actual source error
        // at the test's imperative assertion without halting all later updates.
        if (caughtError) throw caughtError;
      }).toThrow();
    });
  });
});
