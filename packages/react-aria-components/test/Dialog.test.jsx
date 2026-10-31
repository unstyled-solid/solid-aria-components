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

import {actHook as act, pointerMap, render, within} from '@react-spectrum/test-utils-internal';
import {Button} from '../src/Button';
import {composeStories} from '../../../test/storybook/native-compose';
import {Dialog, DialogTrigger} from '../src/Dialog';
import {Heading} from '../src/Heading';
import {Input} from '../src/Input';
import {Label} from '../src/Label';
import {Menu, MenuItem, MenuTrigger} from '../src/Menu';
import {Modal, ModalOverlay} from '../src/Modal';
import {OverlayArrow} from '../src/OverlayArrow';
import {Popover} from '../src/Popover';
import {createSignal} from 'solid-js';
import {useObjectRef} from 'react-aria/useObjectRef';
import {vi as jest} from 'vitest';
import * as stories from './fixtures/p45-dialog-modal-stories';
import {Text} from '../src/Text';
import {TextField} from '../src/TextField';
import {UNSAFE_PortalProvider} from 'react-aria/PortalProvider';
import {User} from '@react-aria/test-utils';
import userEvent from '@testing-library/user-event';

let {DateRangePickerInsideModalStory: DateRangePickerInsideModal} = composeStories(stories);

describe('Dialog', () => {
  /** @type {ReturnType<typeof userEvent.setup>} */
  let user;
  let testUtilUser = new User({advanceTimer: jest.advanceTimersByTime});
  beforeAll(() => {
    user = userEvent.setup({delay: null, pointerMap});
    jest.useFakeTimers();
  });

  it('should have a base default set of attributes', () => {
    let {getByRole} = render(() =>
      <Dialog>
        <Heading slot="title">Title</Heading>
      </Dialog>
    );

    let dialog = getByRole('dialog');
    expect(dialog).toHaveClass('react-aria-Dialog');
    expect(dialog).toHaveAttribute('data-rac');
  });

  it('works with modal', async () => {
    let {getByRole} = render(() =>
      <DialogTrigger>
        <Button>Delete…</Button>
        <Modal data-test="modal">
          <Dialog role="alertdialog" data-test="dialog">
            {values => (
              <>
                <Heading slot="title">Alert</Heading>
                <Text slot="description">This is the alert message.</Text>
                <Button onPress={values.close}>Close</Button>
              </>
            )}
          </Dialog>
        </Modal>
      </DialogTrigger>
    );

    let button = getByRole('button');
    let dialogTester = testUtilUser.createTester('Dialog', {root: button, overlayType: 'modal'});
    await dialogTester.open();
    // open() establishes the mounted dialog used by the source assertions below.
    let dialog = /** @type {HTMLElement} */ (dialogTester.getDialog());
    expect(dialog).toHaveAttribute('role', 'alertdialog');
    let heading = getByRole('heading');
    expect(dialog).toHaveAttribute('aria-labelledby', heading.id);
    expect(dialog).toHaveAttribute('data-test', 'dialog');
    expect(dialog.closest('.react-aria-Modal')).toHaveAttribute('data-test', 'modal');
    expect(dialog.closest('.react-aria-ModalOverlay')).toBeInTheDocument();

    let close = within(dialog).getByRole('button');
    await user.click(close);

    expect(dialog).not.toBeInTheDocument();
  });

  it('should set aria-describedby when Text slot="description" is used in alertdialog', async () => {
    let {getByRole} = render(() =>
      <DialogTrigger>
        <Button>Open</Button>
        <Modal>
          <Dialog role="alertdialog">
            {values => (
              <>
                <Heading slot="title">Alert Title</Heading>
                <Text slot="description">This is the alert message.</Text>
                <Button onPress={values.close}>OK</Button>
              </>
            )}
          </Dialog>
        </Modal>
      </DialogTrigger>
    );

    let button = getByRole('button');
    let dialogTester = testUtilUser.createTester('Dialog', {root: button, overlayType: 'modal'});
    await dialogTester.open();
    let dialog = /** @type {HTMLElement} */ (dialogTester.getDialog());
    expect(dialog).toHaveAttribute('role', 'alertdialog');
    expect(dialog).toHaveAttribute('aria-describedby');
    let descId = /** @type {string} */ (dialog.getAttribute('aria-describedby'));
    let descEl = /** @type {HTMLElement} */ (document.getElementById(descId));
    expect(descEl).not.toBeNull();
    expect(descEl.textContent).toBe('This is the alert message.');
  });

  it('works with modal and custom underlay', async () => {
    let {getByRole} = render(() =>
      <DialogTrigger>
        <Button>Delete…</Button>
        <ModalOverlay className="underlay" data-test="underlay">
          <Modal className="modal" data-test="modal">
            <Dialog role="alertdialog" data-test="dialog">
              {values => (
                <>
                  <Heading slot="title">Alert</Heading>
                  <Text slot="description">This is the alert message.</Text>
                  <Button onPress={values.close}>Close</Button>
                </>
              )}
            </Dialog>
          </Modal>
        </ModalOverlay>
      </DialogTrigger>
    );

    let button = getByRole('button');
    await user.click(button);

    let dialog = getByRole('alertdialog');
    let heading = getByRole('heading');
    expect(dialog).toHaveAttribute('aria-labelledby', heading.id);
    expect(dialog).toHaveAttribute('data-test', 'dialog');

    expect(dialog.closest('.modal')).toHaveAttribute('data-test', 'modal');
    expect(dialog.closest('.underlay')).toHaveAttribute('data-test', 'underlay');

    let close = within(dialog).getByRole('button');
    await user.click(close);

    expect(dialog).not.toBeInTheDocument();
  });

  it('has dismiss button when isDismissable', async () => {
    let {getByRole, getByLabelText} = render(() =>
      <DialogTrigger>
        <Button>Delete…</Button>
        <Modal data-test="modal" isDismissable>
          <Dialog role="alertdialog" data-test="dialog">
            {values => (
              <>
                <Heading slot="title">Alert</Heading>
                <Text slot="description">This is the alert message.</Text>
                <Button onPress={values.close}>Close</Button>
              </>
            )}
          </Dialog>
        </Modal>
      </DialogTrigger>
    );

    let button = getByRole('button');
    await user.click(button);

    let dialog = getByRole('alertdialog');

    let dismiss = getByLabelText('Dismiss');
    await user.click(dismiss);

    expect(dialog).not.toBeInTheDocument();
  });

  it('works with popover', async () => {
    let {getByRole} = render(() =>
      <DialogTrigger>
        <Button aria-label="Help">?⃝</Button>
        <Popover data-test="popover">
          <OverlayArrow data-test="arrow">
            <svg width={12} height={12}>
              <path d="M0 0,L6 6,L12 0" />
            </svg>
          </OverlayArrow>
          <Dialog data-test="dialog">
            <Heading slot="title">Help</Heading>
            <p>For help accessing your account, please contact support.</p>
          </Dialog>
        </Popover>
      </DialogTrigger>
    );

    let button = getByRole('button');
    expect(button).not.toHaveAttribute('data-pressed');

    let dialogTester = testUtilUser.createTester('Dialog', {root: button, overlayType: 'popover'});
    await dialogTester.open();
    expect(button).toHaveAttribute('data-pressed');

    let dialog = /** @type {HTMLElement} */ (dialogTester.getDialog());
    let heading = getByRole('heading');
    expect(dialog).toHaveAttribute('aria-labelledby', heading.id);
    expect(dialog).toHaveAttribute('data-test', 'dialog');
    expect(dialog).toHaveClass('react-aria-Dialog');

    let popover = /** @type {HTMLElement} */ (dialog.closest('.react-aria-Popover'));
    expect(popover).toHaveStyle('position: absolute');
    expect(popover).toHaveAttribute('data-test', 'popover');

    let arrow = popover.querySelector('.react-aria-OverlayArrow');
    expect(arrow).toHaveStyle('position: absolute');
    expect(arrow).toHaveAttribute('data-test', 'arrow');

    await user.click(document.body);

    expect(dialog).not.toBeInTheDocument();
  });

  it('should get default aria label from trigger', async () => {
    let {getByRole} = render(() =>
      <DialogTrigger>
        <Button>Settings</Button>
        <Popover>
          <Dialog>Test</Dialog>
        </Popover>
      </DialogTrigger>
    );

    let button = getByRole('button');
    await user.click(button);

    let dialog = getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-labelledby', button.id);

    await user.click(document.body);
    expect(dialog).not.toBeInTheDocument();
  });

  it('should support render props', async () => {
    let {getByRole} = render(() =>
      <DialogTrigger>
        <Button aria-label="Help">?⃝</Button>
        <Popover>
          <Dialog>
            {values => (
              <>
                <Heading slot="title">Help</Heading>
                <p>For help accessing your account, please contact support.</p>
                <Button onPress={() => values.close()}>Dismiss</Button>
              </>
            )}
          </Dialog>
        </Popover>
      </DialogTrigger>
    );

    let button = getByRole('button');

    await user.click(button);

    let dialog = getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    let dismiss = within(dialog).getByRole('button');

    await user.click(dismiss);

    expect(dialog).not.toBeInTheDocument();
  });

  it('should support Modal being used standalone', async () => {
    let onOpenChange = jest.fn();
    let {getByRole} = render(() =>
      <Modal isDismissable isOpen onOpenChange={onOpenChange}>
        <Dialog aria-label="Modal">A modal</Dialog>
      </Modal>
    );

    let dialog = getByRole('dialog');
    expect(dialog).toHaveTextContent('A modal');

    await user.click(document.body);
    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('isOpen and defaultOpen should override state from context', async () => {
    let onOpenChange = jest.fn();
    let {getByRole} = render(() =>
      <>
        <DialogTrigger>
          <Button />
          <Modal isDismissable isOpen onOpenChange={onOpenChange}>
            <Dialog aria-label="Modal">A modal</Dialog>
          </Modal>
        </DialogTrigger>
      </>
    );

    let dialog = getByRole('dialog');
    expect(dialog).toHaveTextContent('A modal');

    await user.click(document.body);
    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('supports isEntering and isExiting props', async () => {
    /** @param {import('../src/Modal').ModalOverlayProps} props */
    function TestModal(props) {
      return (
        <DialogTrigger>
          <Button />
          <Modal {...props}>
            <Dialog aria-label="Modal">A modal</Dialog>
          </Modal>
        </DialogTrigger>
      );
    }

    let [modalProps, setModalProps] = createSignal(/** @type {import('../src/Modal').ModalOverlayProps} */ ({isEntering: true}));
    let {getByRole} = render(() => <TestModal isEntering={modalProps().isEntering} isExiting={modalProps().isExiting} />);

    let button = getByRole('button');
    await user.click(button);

    let modal = getByRole('dialog').closest('.react-aria-ModalOverlay');
    expect(modal).toHaveAttribute('data-entering');

    await act(() => {setModalProps({});});
    expect(modal).not.toHaveAttribute('data-entering');

    await act(() => {setModalProps({isExiting: true});});
    await user.click(button);

    expect(modal).toBeInTheDocument();
    expect(modal).toHaveAttribute('data-exiting');

    await act(() => {setModalProps({});});
    expect(modal).not.toBeInTheDocument();
  });

  describe('onEnter and onExit', () => {
    beforeEach(() => {
      // jsdom skips enter and exit animations unless getAnimations is implemented.
      Element.prototype.getAnimations = () => [];
    });

    afterEach(() => {
      delete (/** @type {{getAnimations?: Element['getAnimations']}} */ (Element.prototype)).getAnimations;
    });

    function deferred() {
      /** @type {(() => void) | undefined} */
      let resolve;
      /** @type {Promise<void>} */
      let promise = new Promise(r => (resolve = r));
      // Promise executors run synchronously, assigning resolve before this return.
      return {promise, resolve: /** @type {() => void} */ (resolve)};
    }

    /** @param {{overlayProps?: import('../src/Modal').ModalOverlayProps, modalProps?: import('../src/Modal').ModalOverlayProps}} props */
    function TestModal(props) {
      return (
        <DialogTrigger>
          <Button>Open</Button>
          <ModalOverlay data-testid="overlay" onEnter={props.overlayProps?.onEnter} onExit={props.overlayProps?.onExit}>
            <Modal data-testid="modal" onEnter={props.modalProps?.onEnter} onExit={props.modalProps?.onExit}>
              <Dialog aria-label="Modal">
                <Button slot="close">Close</Button>
              </Dialog>
            </Modal>
          </ModalOverlay>
        </DialogTrigger>
      );
    }

    it('calls onEnter on ModalOverlay and Modal with their elements when opening', async () => {
      let onOverlayEnter = jest.fn();
      let onModalEnter = jest.fn();
      let {getByRole, getByTestId} = render(() =>
        <TestModal overlayProps={{onEnter: onOverlayEnter}} modalProps={{onEnter: onModalEnter}} />
      );

      expect(onOverlayEnter).not.toHaveBeenCalled();
      expect(onModalEnter).not.toHaveBeenCalled();

      await user.click(getByRole('button'));

      let overlay = getByTestId('overlay');
      let modal = getByTestId('modal');
      expect(onOverlayEnter).toHaveBeenCalledTimes(1);
      expect(onOverlayEnter).toHaveBeenCalledWith(overlay);
      expect(onModalEnter).toHaveBeenCalledTimes(1);
      expect(onModalEnter).toHaveBeenCalledWith(modal);

      // Synchronous callbacks complete the entry immediately.
      expect(overlay).not.toHaveAttribute('data-entering');
      expect(modal).not.toHaveAttribute('data-entering');
    });

    it('remains entering until the promise returned by ModalOverlay onEnter resolves', async () => {
      let {promise, resolve} = deferred();
      let onEnter = jest.fn(() => promise);
      let {getByRole, getByTestId} = render(() => <TestModal overlayProps={{onEnter}} />);

      await user.click(getByRole('button'));

      let overlay = getByTestId('overlay');
      expect(onEnter).toHaveBeenCalledTimes(1);
      expect(overlay).toHaveAttribute('data-entering');
      expect(getByTestId('modal')).not.toHaveAttribute('data-entering');

      await act(async () => resolve());
      expect(overlay).not.toHaveAttribute('data-entering');
      expect(onEnter).toHaveBeenCalledTimes(1);
    });

    it('remains entering until the promise returned by Modal onEnter resolves', async () => {
      let {promise, resolve} = deferred();
      let onEnter = jest.fn(() => promise);
      let {getByRole, getByTestId} = render(() => <TestModal modalProps={{onEnter}} />);

      await user.click(getByRole('button'));

      let modal = getByTestId('modal');
      expect(onEnter).toHaveBeenCalledTimes(1);
      expect(modal).toHaveAttribute('data-entering');
      expect(getByTestId('overlay')).not.toHaveAttribute('data-entering');

      await act(async () => resolve());
      expect(modal).not.toHaveAttribute('data-entering');
      expect(onEnter).toHaveBeenCalledTimes(1);
    });

    it('calls onExit on ModalOverlay and Modal with their elements when closing', async () => {
      let onOverlayExit = jest.fn();
      let onModalExit = jest.fn();
      let {getByRole, getByTestId, queryByTestId} = render(() =>
        <TestModal overlayProps={{onExit: onOverlayExit}} modalProps={{onExit: onModalExit}} />
      );

      await user.click(getByRole('button'));
      let overlay = getByTestId('overlay');
      let modal = getByTestId('modal');
      expect(onOverlayExit).not.toHaveBeenCalled();
      expect(onModalExit).not.toHaveBeenCalled();

      await user.click(getByRole('button', {name: 'Close'}));

      expect(onOverlayExit).toHaveBeenCalledTimes(1);
      expect(onOverlayExit).toHaveBeenCalledWith(overlay);
      expect(onModalExit).toHaveBeenCalledTimes(1);
      expect(onModalExit).toHaveBeenCalledWith(modal);

      // Synchronous callbacks complete the exit immediately.
      expect(queryByTestId('overlay')).toBeNull();
    });

    it('remains mounted until the promise returned by ModalOverlay onExit resolves', async () => {
      let {promise, resolve} = deferred();
      let onExit = jest.fn(() => promise);
      let {getByRole, getByTestId} = render(() => <TestModal overlayProps={{onExit}} />);

      await user.click(getByRole('button'));
      let overlay = getByTestId('overlay');
      let modal = getByTestId('modal');

      await user.click(getByRole('button', {name: 'Close'}));
      expect(onExit).toHaveBeenCalledTimes(1);
      expect(onExit).toHaveBeenCalledWith(overlay);
      expect(overlay).toBeInTheDocument();
      expect(overlay).toHaveAttribute('data-exiting');
      expect(modal).toHaveAttribute('data-exiting');

      await act(async () => resolve());
      expect(overlay).not.toBeInTheDocument();
      expect(onExit).toHaveBeenCalledTimes(1);
    });

    it('remains mounted until the promise returned by Modal onExit resolves', async () => {
      let {promise, resolve} = deferred();
      let onExit = jest.fn(() => promise);
      let {getByRole, getByTestId} = render(() => <TestModal modalProps={{onExit}} />);

      await user.click(getByRole('button'));
      let overlay = getByTestId('overlay');
      let modal = getByTestId('modal');

      await user.click(getByRole('button', {name: 'Close'}));
      expect(onExit).toHaveBeenCalledTimes(1);
      expect(onExit).toHaveBeenCalledWith(modal);
      expect(overlay).toBeInTheDocument();
      expect(overlay).toHaveAttribute('data-exiting');
      expect(modal).toHaveAttribute('data-exiting');

      await act(async () => resolve());
      expect(overlay).not.toBeInTheDocument();
      expect(onExit).toHaveBeenCalledTimes(1);
    });

    it('waits for both ModalOverlay and Modal onExit promises before unmounting', async () => {
      let overlayExit = deferred();
      let modalExit = deferred();
      let {getByRole, getByTestId} = render(() =>
        <TestModal
          overlayProps={{onExit: () => overlayExit.promise}}
          modalProps={{onExit: () => modalExit.promise}}
        />
      );

      await user.click(getByRole('button'));
      let overlay = getByTestId('overlay');

      await user.click(getByRole('button', {name: 'Close'}));
      await act(async () => overlayExit.resolve());
      expect(overlay).toBeInTheDocument();
      expect(overlay).toHaveAttribute('data-exiting');

      await act(async () => modalExit.resolve());
      expect(overlay).not.toBeInTheDocument();
    });

    it('calls the latest onEnter and onExit callbacks', async () => {
      let enterPromise = deferred();
      let exitPromise = deferred();
      let initialEnter = jest.fn(() => enterPromise.promise);
      let initialExit = jest.fn(() => exitPromise.promise);
      let [callbacks, setCallbacks] = createSignal(/** @type {Pick<import('../src/Modal').ModalOverlayProps, 'onEnter' | 'onExit'>} */ ({onEnter: initialEnter, onExit: initialExit}));
      let {getByRole, getByTestId, queryByTestId} = render(() =>
        <TestModal modalProps={callbacks()} />
      );

      await user.click(getByRole('button'));
      expect(initialEnter).toHaveBeenCalledTimes(1);

      // Re-rendering during the entry does not restart it.
      let onEnter = jest.fn();
      let onExit = jest.fn();
      await act(() => {setCallbacks({onEnter, onExit});});
      expect(onEnter).not.toHaveBeenCalled();
      expect(getByTestId('modal')).toHaveAttribute('data-entering');

      await act(async () => enterPromise.resolve());
      expect(getByTestId('modal')).not.toHaveAttribute('data-entering');

      await user.click(getByRole('button', {name: 'Close'}));
      expect(initialExit).not.toHaveBeenCalled();
      expect(onExit).toHaveBeenCalledTimes(1);
      expect(queryByTestId('overlay')).toBeNull();
    });

    it('supports onEnter and onExit on a standalone Modal', async () => {
      let enter = deferred();
      let exit = deferred();
      let onEnter = jest.fn(() => enter.promise);
      let onExit = jest.fn(() => exit.promise);
      /** @param {import('../src/Modal').ModalOverlayProps} props */
      function StandaloneModal(props) {
        return (
          <Modal data-testid="modal" onEnter={onEnter} onExit={onExit} {...props}>
            <Dialog aria-label="Modal">A modal</Dialog>
          </Modal>
        );
      }

      let [isOpen, setOpen] = createSignal(true);
      let {getByTestId} = render(() => <StandaloneModal isOpen={isOpen()} />);
      let modal = getByTestId('modal');
      expect(onEnter).toHaveBeenCalledTimes(1);
      expect(onEnter).toHaveBeenCalledWith(modal);
      expect(modal).toHaveAttribute('data-entering');

      await act(async () => enter.resolve());
      expect(modal).not.toHaveAttribute('data-entering');

      await act(() => {setOpen(false);});
      expect(onExit).toHaveBeenCalledTimes(1);
      expect(onExit).toHaveBeenCalledWith(modal);
      expect(modal).toBeInTheDocument();
      expect(modal).toHaveAttribute('data-exiting');

      await act(async () => exit.resolve());
      expect(modal).not.toBeInTheDocument();
    });
  });

  describe('portalProvider', () => {
    /** @param {{container?: import('../../react-aria/src/utils/useObjectRef').ObjectRef<HTMLDivElement>}} props */
    function InfoDialog(props) {
      return (
        <DialogTrigger>
          <Button>Delete…</Button>
          <Modal data-test="modal">
            <Dialog role="alertdialog" data-test="dialog">
              {values => (
                <>
                  <Heading slot="title">Alert</Heading>
                  <Text slot="description">This is the alert message.</Text>
                  <Button onPress={values.close}>Close</Button>
                </>
              )}
            </Dialog>
          </Modal>
        </DialogTrigger>
      );
    }
    function App() {
      /** @type {import('../../react-aria/src/utils/useObjectRef').ObjectRef<HTMLDivElement>} */
      let container = useObjectRef();
      return (
        <>
          <UNSAFE_PortalProvider getContainer={() => container.current}>
            <InfoDialog container={container} />
          </UNSAFE_PortalProvider>
          <div ref={container} data-testid="custom-container" />
        </>
      );
    }
    it('should render the dialog in the portal container provided by the PortalProvider', async () => {
      let {getByRole, getByTestId} = render(() => <App />);
      let button = getByRole('button');
      await user.click(button);

      expect(getByRole('alertdialog').closest('[data-testid="custom-container"]')).toBe(
        getByTestId('custom-container')
      );
      await user.click(document.body);
    });
  });

  // TODO: delete this test when we get rid of the deprecated prop
  describe('portalContainer', () => {
    /** @param {{container?: Element}} props */
    function InfoDialog(props) {
      return (
        <DialogTrigger>
          <Button>Delete…</Button>
          <Modal UNSTABLE_portalContainer={props.container} data-test="modal">
            <Dialog role="alertdialog" data-test="dialog">
              {values => (
                <>
                  <Heading slot="title">Alert</Heading>
                  <Text slot="description">This is the alert message.</Text>
                  <Button onPress={values.close}>Close</Button>
                </>
              )}
            </Dialog>
          </Modal>
        </DialogTrigger>
      );
    }
    function App() {
      let [container, setContainer] = createSignal(/** @type {HTMLDivElement | undefined} */ (undefined));
      return (
        <>
          <InfoDialog container={container()} />
          <div ref={element => {setContainer(element);}} data-testid="custom-container" />
        </>
      );
    }
    it('should render the dialog in the portal container', async () => {
      let {getByRole, getByTestId} = render(() => <App />);
      let button = getByRole('button');
      await user.click(button);

      expect(getByRole('alertdialog').closest('[data-testid="custom-container"]')).toBe(
        getByTestId('custom-container')
      );
      await user.click(document.body);
    });
  });

  it('ensure Input autoFocus works when opening Modal from MenuItem via keyboard', async () => {
    function App() {
      const [isOpen, setOpen] = createSignal(false);
      return (
        <>
          <MenuTrigger>
            <Button>Open menu</Button>
            <Popover>
              <Menu>
                <MenuItem onAction={() => setOpen(true)}>Add account</MenuItem>
                <MenuItem>Sign out</MenuItem>
              </Menu>
            </Popover>
          </MenuTrigger>
          <ModalOverlay isDismissable isOpen={isOpen()} onOpenChange={setOpen}>
            <Modal>
              <Dialog>
                <form>
                  <Heading slot="title">Sign up</Heading>
                  <TextField autoFocus>
                    <Label>Email</Label>
                    <Input data-testid="email" />
                  </TextField>
                  <TextField>
                    <Label>Password</Label>
                    <Input />
                  </TextField>
                </form>
              </Dialog>
            </Modal>
          </ModalOverlay>
        </>
      );
    }

    const {getAllByRole, getByRole, getByTestId} = render(() => <App />);
    const button = getByRole('button');
    await user.tab();
    expect(document.activeElement).toBe(button);
    await user.keyboard('{Enter}');
    act(() => {
      jest.runAllTimers();
    });

    const menuitem = getAllByRole('menuitem')[0];
    expect(document.activeElement).toBe(menuitem);
    await user.keyboard('{Enter}');
    act(() => {
      jest.runAllTimers();
    });

    const input = getByTestId('email');
    expect(document.activeElement).toBe(input);
  });

  it('should not close Modal when DateRangePicker is dismissed by outside click', async () => {
    let {getAllByRole, getByRole} = render(() => <DateRangePickerInsideModal />);
    await user.click(getByRole('button'));

    let modal = getByRole('dialog').closest('.react-aria-ModalOverlay');
    expect(modal).toBeInTheDocument();

    // The selected source DateRangePicker example contains this calendar trigger.
    let button = /** @type {HTMLButtonElement} */ (getByRole('group').querySelector('.react-aria-Button'));
    expect(button).toHaveAttribute('aria-label', 'Calendar');
    await user.click(button);

    let popover = getByRole('dialog').closest('.react-aria-Popover');
    expect(popover).toBeInTheDocument();
    expect(popover).toHaveAttribute('data-trigger', 'DateRangePicker');

    let cells = getAllByRole('gridcell');
    await user.click(cells[5].children[0]);
    await user.click(document.body);
    expect(popover).not.toBeInTheDocument();
    expect(modal).toBeInTheDocument();
  });
});
