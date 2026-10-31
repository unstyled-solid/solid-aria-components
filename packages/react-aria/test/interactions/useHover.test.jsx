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

import {
  act,
  fireEvent,
  installMouseEvent,
  installPointerEvent,
  render
} from '@react-spectrum/test-utils-internal';
import {ActionButton} from '@adobe/react-spectrum/ActionButton';
import {vi as jest} from 'vitest';
import {Dialog} from '@adobe/react-spectrum/Dialog';
import {DialogTrigger} from '@adobe/react-spectrum/DialogTrigger';
import {Provider} from '@adobe/react-spectrum/Provider';
import {createSignal, omit} from 'solid-js';
import {dynamic} from '@solidjs/web';
import {defaultTheme as theme} from '@adobe/react-spectrum/defaultTheme';
import {useHover} from '../../src/interactions/useHover';

function Example(props) {
  let {hoverProps, isHovered} = useHover(props);
  return (
    <div {...hoverProps}>
      test{isHovered() && '-hovered'}
      <div data-testid="inner-target" />
    </div>
  );
}

function pointerEvent(type, opts) {
  let evt = new Event(type, {bubbles: true, cancelable: true});
  Object.assign(
    evt,
    {
      ctrlKey: false,
      metaKey: false,
      shiftKey: false,
      button: opts.button || 0
    },
    opts
  );
  return evt;
}

describe('useHover', function () {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  it('does not handle hover events if disabled', function () {
    let events = [];
    let addEvent = e => events.push(e);
    let res = render(() =>
      <Example
        isDisabled
        onHoverEnd={addEvent}
        onHoverChange={isHovering => addEvent({type: 'hoverchange', isHovering})}
        onHoverStart={addEvent}
      />
    );

    let el = res.getByText('test');
    act(() => fireEvent.mouseOver(el));
    act(() => fireEvent.mouseOut(el));

    expect(events).toEqual([]);
  });

  describe('pointer events', function () {
    installPointerEvent();

    it('should fire hover events based on pointer events', function () {
      let events = [];
      let addEvent = e => events.push(e);
      let res = render(() =>
        <Example
          onHoverStart={addEvent}
          onHoverEnd={addEvent}
          onHoverChange={isHovering => addEvent({type: 'hoverchange', isHovering})}
        />
      );

      let el = res.getByText('test');
      act(() => fireEvent(el, pointerEvent('pointerover', {pointerType: 'mouse'})));
      act(() => fireEvent(el, pointerEvent('pointerout', {pointerType: 'mouse'})));

      expect(events).toEqual([
        {
          type: 'hoverstart',
          target: el,
          pointerType: 'mouse'
        },
        {
          type: 'hoverchange',
          isHovering: true
        },
        {
          type: 'hoverend',
          target: el,
          pointerType: 'mouse'
        },
        {
          type: 'hoverchange',
          isHovering: false
        }
      ]);
    });

    it('hover event target should be the same element we attached listeners to even if we hover over inner elements', function () {
      let events = [];
      let addEvent = e => events.push(e);
      let res = render(() =>
        <Example
          onHoverStart={addEvent}
          onHoverEnd={addEvent}
          onHoverChange={isHovering => addEvent({type: 'hoverchange', isHovering})}
        />
      );

      let el = res.getByText('test');
      let inner = res.getByTestId('inner-target');
      act(() => fireEvent(inner, pointerEvent('pointerover', {pointerType: 'mouse'})));
      act(() => fireEvent(inner, pointerEvent('pointerout', {pointerType: 'mouse'})));

      expect(events).toEqual([
        {
          type: 'hoverstart',
          target: el,
          pointerType: 'mouse'
        },
        {
          type: 'hoverchange',
          isHovering: true
        },
        {
          type: 'hoverend',
          target: el,
          pointerType: 'mouse'
        },
        {
          type: 'hoverchange',
          isHovering: false
        }
      ]);
    });

    it('should not fire hover events when pointerType is touch', function () {
      let events = [];
      let addEvent = e => events.push(e);
      let res = render(() =>
        <Example
          onHoverStart={addEvent}
          onHoverEnd={addEvent}
          onHoverChange={isHovering => addEvent({type: 'hoverchange', isHovering})}
        />
      );

      let el = res.getByText('test');
      act(() => fireEvent(el, pointerEvent('pointerover', {pointerType: 'touch'})));
      act(() => fireEvent(el, pointerEvent('pointerout', {pointerType: 'touch'})));

      expect(events).toEqual([]);
    });

    it('ignores emulated mouse events following touch events', function () {
      let events = [];
      let addEvent = e => events.push(e);
      let res = render(() =>
        <Example
          onHoverStart={addEvent}
          onHoverEnd={addEvent}
          onHoverChange={isHovering => addEvent({type: 'hoverchange', isHovering})}
        />
      );

      let el = res.getByText('test');
      act(() => fireEvent(el, pointerEvent('pointerdown', {pointerType: 'touch'})));
      act(() => fireEvent(el, pointerEvent('pointerover', {pointerType: 'touch'})));
      act(() => fireEvent(el, pointerEvent('pointerout', {pointerType: 'touch'})));
      act(() => fireEvent(el, pointerEvent('pointerup', {pointerType: 'touch'})));

      // Safari on iOS has a bug that fires a pointer event with pointerType="mouse" on focus.
      // See https://bugs.webkit.org/show_bug.cgi?id=214609.
      act(() => fireEvent(el, pointerEvent('pointerover', {pointerType: 'mouse'})));
      act(() => fireEvent(el, pointerEvent('pointerout', {pointerType: 'mouse'})));

      expect(events).toEqual([]);
    });

    it('ignores supports mouse events following touch events after a delay', function () {
      let events = [];
      let addEvent = e => events.push(e);
      let res = render(() =>
        <Example
          onHoverStart={addEvent}
          onHoverEnd={addEvent}
          onHoverChange={isHovering => addEvent({type: 'hoverchange', isHovering})}
        />
      );

      let el = res.getByText('test');
      act(() => fireEvent(el, pointerEvent('pointerdown', {pointerType: 'touch'})));
      act(() => fireEvent(el, pointerEvent('pointerover', {pointerType: 'touch'})));
      act(() => fireEvent(el, pointerEvent('pointerout', {pointerType: 'touch'})));
      act(() => fireEvent(el, pointerEvent('pointerup', {pointerType: 'touch'})));

      act(() => {
        jest.advanceTimersByTime(600);
      });

      // Safari on iOS has a bug that fires a pointer event with pointerType="mouse" on focus.
      // See https://bugs.webkit.org/show_bug.cgi?id=214609.
      act(() => fireEvent(el, pointerEvent('pointerover', {pointerType: 'mouse'})));
      act(() => fireEvent(el, pointerEvent('pointerout', {pointerType: 'mouse'})));

      expect(events).toEqual([
        {
          type: 'hoverstart',
          target: el,
          pointerType: 'mouse'
        },
        {
          type: 'hoverchange',
          isHovering: true
        },
        {
          type: 'hoverend',
          target: el,
          pointerType: 'mouse'
        },
        {
          type: 'hoverchange',
          isHovering: false
        }
      ]);
    });

    it('should visually change component with pointer events', function () {
      let res = render(() => <Example />);
      let el = res.getByText('test');

      act(() => fireEvent(el, pointerEvent('pointerover', {pointerType: 'mouse'})));
      expect(el.textContent).toBe('test-hovered');

      act(() => fireEvent(el, pointerEvent('pointerout', {pointerType: 'mouse'})));
      expect(el.textContent).toBe('test');
    });

    it('should not visually change component when pointerType is touch', function () {
      let res = render(() => <Example />);
      let el = res.getByText('test');

      act(() => fireEvent(el, pointerEvent('pointerover', {pointerType: 'touch'})));
      expect(el.textContent).toBe('test');

      act(() => fireEvent(el, pointerEvent('pointerout', {pointerType: 'touch'})));
      expect(el.textContent).toBe('test');
    });

    it('should end hover when disabled', function () {
      let events = [];
      let addEvent = e => events.push(e);
      let setDisabled;
      let res = render(() => {
        let [disabled, set] = createSignal(false);
        setDisabled = set;
        return <Example
          isDisabled={disabled()}
          onHoverStart={addEvent}
          onHoverEnd={addEvent}
          onHoverChange={isHovering => addEvent({type: 'hoverchange', isHovering})}
        />;
      });
      let el = res.getByText('test');

      act(() => fireEvent(el, pointerEvent('pointerover', {pointerType: 'mouse'})));
      expect(el.textContent).toBe('test-hovered');
      expect(events).toEqual([
        {
          type: 'hoverstart',
          target: el,
          pointerType: 'mouse'
        },
        {
          type: 'hoverchange',
          isHovering: true
        }
      ]);
      events.pop();
      events.pop();

      act(() => setDisabled(true));
      el = res.getByText('test');
      expect(el.textContent).toBe('test');
      expect(events).toEqual([
        {
          type: 'hoverend',
          target: el,
          pointerType: 'mouse'
        },
        {
          type: 'hoverchange',
          isHovering: false
        }
      ]);
      act(() => fireEvent(el, pointerEvent('pointerout', {pointerType: 'mouse'})));
    });

    it('should trigger onHoverEnd after an element is removed', async function () {
      function Test(props) {
        let {hoverProps, isHovered} = useHover(props);
        return (
          <div {...hoverProps} data-testid="test" data-hovered={isHovered() ? 'true' : undefined}>
            {props.children}
          </div>
        );
      }

      function Inner() {
        let [show, setShow] = createSignal(true);
        return <>{show() ? <button onClick={() => setShow(false)}>hide</button> : null}</>;
      }

      let events = [];
      let addEvent = e => events.push(e);
      let res = render(() =>
        <Test
          onHoverStart={addEvent}
          onHoverEnd={addEvent}
          onHoverChange={isHovering => addEvent({type: 'hoverchange', isHovering})}>
          <Inner />
        </Test>
      );

      let el = res.getByTestId('test');
      act(() => fireEvent(el, pointerEvent('pointerover', {pointerType: 'mouse'})));
      expect(el).toHaveAttribute('data-hovered', 'true');

      let button = res.getByRole('button');
      act(() => button.click());
      expect(button).not.toBeInTheDocument();

      // browser does not fire pointerout/pointerleave here.
      // but it does fire pointerover on the new target.
      act(() => fireEvent(document.body, pointerEvent('pointerover', {pointerType: 'mouse'})));
      expect(el).not.toHaveAttribute('data-hovered');

      expect(events).toEqual([
        {
          type: 'hoverstart',
          target: el,
          pointerType: 'mouse'
        },
        {
          type: 'hoverchange',
          isHovering: true
        },
        {
          type: 'hoverend',
          target: el,
          pointerType: 'mouse'
        },
        {
          type: 'hoverchange',
          isHovering: false
        }
      ]);
    });
  });

  describe('mouse events', function () {
    it('should fire hover events based on mouse events', function () {
      let events = [];
      let addEvent = e => events.push(e);
      let res = render(() =>
        <Example
          onHoverEnd={addEvent}
          onHoverChange={isHovering => addEvent({type: 'hoverchange', isHovering})}
          onHoverStart={addEvent}
        />
      );

      let el = res.getByText('test');
      act(() => fireEvent.mouseOver(el));
      act(() => fireEvent.mouseOut(el));

      expect(events).toEqual([
        {
          type: 'hoverstart',
          target: el,
          pointerType: 'mouse'
        },
        {
          type: 'hoverchange',
          isHovering: true
        },
        {
          type: 'hoverend',
          target: el,
          pointerType: 'mouse'
        },
        {
          type: 'hoverchange',
          isHovering: false
        }
      ]);
    });

    it('should visually change component with mouse events', function () {
      let res = render(() => <Example />);
      let el = res.getByText('test');

      act(() => fireEvent.mouseOver(el));
      expect(el.textContent).toBe('test-hovered');

      act(() => fireEvent.mouseOut(el));
      expect(el.textContent).toBe('test');
    });

    it('ignores emulated mouse events following touch events', function () {
      let events = [];
      let addEvent = e => events.push(e);
      let res = render(() =>
        <Example
          onHoverStart={addEvent}
          onHoverEnd={addEvent}
          onHoverChange={isHovering => addEvent({type: 'hoverchange', isHovering})}
        />
      );

      let el = res.getByText('test');
      act(() => fireEvent.touchStart(el));
      act(() => fireEvent.mouseOver(el));
      act(() => fireEvent.mouseOut(el));
      act(() => fireEvent.touchEnd(el));

      // Safari on iOS has a bug that fires a mouse event on focus.
      // See https://bugs.webkit.org/show_bug.cgi?id=214609.
      act(() => fireEvent.mouseOver(el));
      act(() => fireEvent.mouseOut(el));

      expect(events).toEqual([]);
    });

    it('ignores supports mouse events following touch events after a delay', function () {
      let events = [];
      let addEvent = e => events.push(e);
      let res = render(() =>
        <Example
          onHoverStart={addEvent}
          onHoverEnd={addEvent}
          onHoverChange={isHovering => addEvent({type: 'hoverchange', isHovering})}
        />
      );

      let el = res.getByText('test');
      act(() => fireEvent.touchStart(el));
      act(() => fireEvent.mouseOver(el));
      act(() => fireEvent.mouseOut(el));
      act(() => fireEvent.touchEnd(el));

      act(() => {
        jest.advanceTimersByTime(600);
      });

      // Safari on iOS has a bug that fires a mouse event on focus.
      // See https://bugs.webkit.org/show_bug.cgi?id=214609.
      act(() => fireEvent.mouseOver(el));
      act(() => fireEvent.mouseOut(el));

      expect(events).toEqual([
        {
          type: 'hoverstart',
          target: el,
          pointerType: 'mouse'
        },
        {
          type: 'hoverchange',
          isHovering: true
        },
        {
          type: 'hoverend',
          target: el,
          pointerType: 'mouse'
        },
        {
          type: 'hoverchange',
          isHovering: false
        }
      ]);
    });

    it('should end hover when disabled', function () {
      let events = [];
      let addEvent = e => events.push(e);
      let setDisabled;
      let res = render(() => {
        let [disabled, set] = createSignal(false);
        setDisabled = set;
        return <Example
          isDisabled={disabled()}
          onHoverStart={addEvent}
          onHoverEnd={addEvent}
          onHoverChange={isHovering => addEvent({type: 'hoverchange', isHovering})}
        />;
      });
      let el = res.getByText('test');

      act(() => fireEvent.mouseOver(el));
      expect(el.textContent).toBe('test-hovered');
      expect(events).toEqual([
        {
          type: 'hoverstart',
          target: el,
          pointerType: 'mouse'
        },
        {
          type: 'hoverchange',
          isHovering: true
        }
      ]);
      events.pop();
      events.pop();

      act(() => setDisabled(true));
      el = res.getByText('test');
      expect(el.textContent).toBe('test');
      expect(events).toEqual([
        {
          type: 'hoverend',
          target: el,
          pointerType: 'mouse'
        },
        {
          type: 'hoverchange',
          isHovering: false
        }
      ]);
      act(() => fireEvent.mouseOut(el));
    });
  });

  describe('touch events', function () {
    it('should not fire hover events based on touch events', function () {
      let events = [];
      let addEvent = e => events.push(e);
      let res = render(() =>
        <Example
          onHoverEnd={addEvent}
          onHoverChange={isHovering => addEvent({type: 'hoverchange', isHovering})}
          onHoverStart={addEvent}
        />
      );

      let el = res.getByText('test');
      act(() => fireEvent.touchStart(el));
      act(() => fireEvent.touchMove(el));
      act(() => fireEvent.touchEnd(el));
      act(() => fireEvent.mouseOver(el));
      act(() => fireEvent.mouseOut(el));

      expect(events).toEqual([]);
    });

    it('should not visually change component with touch events', function () {
      let res = render(() => <Example />);
      let el = res.getByText('test');

      act(() => fireEvent.touchStart(el));
      expect(el.textContent).toBe('test');

      act(() => fireEvent.touchMove(el));
      expect(el.textContent).toBe('test');

      act(() => fireEvent.touchEnd(el));
      expect(el.textContent).toBe('test');

      act(() => fireEvent.mouseOver(el));
      expect(el.textContent).toBe('test');

      act(() => fireEvent.mouseOut(el));
      expect(el.textContent).toBe('test');
    });
  });

  describe('portal event bubbling', () => {
    function PortalExample(props) {
      let ElementType = dynamic(() => props.elementType ?? 'div');
      let {hoverProps} = useHover(omit(props, 'elementType'));
      return (
        <Provider theme={theme}>
          <ElementType {...hoverProps} tabIndex="0">
            <DialogTrigger children={[
              () => <ActionButton>open</ActionButton>,
              () => <Dialog aria-label="Test dialog">test</Dialog>
            ]} />
          </ElementType>
        </Provider>
      );
    }

    beforeAll(() => {
      jest.useFakeTimers();
    });

    beforeEach(() => {
      // this needs to be a setTimeout so that the dialog can be removed from the dom before the callback is invoked
      jest
        .spyOn(window, 'requestAnimationFrame')
        .mockImplementation(cb => setTimeout(() => cb(), 0));
    });

    afterEach(() => {
      // Ensure we close any dialogs before unmounting to avoid warning.
      let dialog = document.querySelector('[role="dialog"]');
      if (dialog) {
        act(() => fireEvent.keyDown(dialog, {key: 'Escape'}));
        act(() => fireEvent.keyUp(dialog, {key: 'Escape'}));
        act(() => {
          jest.runAllTimers();
        });
      }
      window.requestAnimationFrame.mockRestore();
    });

    describe.each`
      type                | prepare                | actions
      ${'Mouse Events'}   | ${installMouseEvent}   | ${[el => act(() => fireEvent.mouseOver(el, {button: 0})), el => act(() => fireEvent.mouseOut(el, {button: 0}))]}
      ${'Pointer Events'} | ${installPointerEvent} | ${[el => act(() => fireEvent(el, pointerEvent('pointerover', {button: 0}))), el => act(() => fireEvent(el, pointerEvent('pointerout', {button: 0})))]}
    `('$type', ({actions: [start, end], prepare}) => {
      prepare();
      it('stop event bubbling through portal', () => {
        const hoverMock = jest.fn();
        let res = render(() =>
          <PortalExample
            onHoverStart={hoverMock}
            onHoverEnd={hoverMock}
            onHoverChange={hoverMock}
          />
        );

        act(() => fireEvent.click(res.getByText('open')));

        act(() => {
          jest.runAllTimers();
        });

        let el = res.getByText('test');
        start(el);
        end(el);
        expect(hoverMock.mock.calls).toHaveLength(0);
      });
    });
  });
});
