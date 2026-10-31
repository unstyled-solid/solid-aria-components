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
import {ClassNameOrFunction, RenderProps, useRenderProps} from './utils';
import {Dialog, DialogProps, DialogTrigger, DialogTriggerProps} from './Dialog';
import {filterDOMProps} from 'react-aria/filterDOMProps';
import {GlobalDOMAttributes} from '@react-types/shared';
import {
  InternalModalContext,
  Modal,
  ModalOverlay,
  ModalOverlayProps,
  ModalRenderProps
} from './Modal';
import {isIOS, isSafari} from 'react-aria/private/utils/platform';
import {OverlayTriggerStateContext} from './Dialog';
import {PressResponder} from 'react-aria/private/interactions/PressResponder';
import {Accessor, createContext, createEffect, createSignal, For, merge, omit, onSettled, useContext} from 'solid-js';
import type {JSX} from '@solidjs/web';
import type {ObjectRef} from 'react-aria/private/utils/useObjectRef';
import {mergeRefs} from 'react-aria/mergeRefs';
type CSSProperties = JSX.CSSProperties;
import {useEffectEvent} from 'react-aria/private/utils/useEffectEvent';
import {useId} from 'react-aria/useId';
import {useLocale} from 'react-aria/I18nProvider';
import {useObjectRef} from 'react-aria/useObjectRef';
import {useOverlayTriggerState} from 'react-stately/useOverlayTriggerState';

type SheetPosition = 'bottom' | 'top' | 'left' | 'right' | 'center';
type SheetSwipeDirection = 'bottom' | 'top' | 'vertical' | 'left' | 'right' | 'horizontal';

function useSheetRef(forwarded: () => ModalOverlayProps['ref']) {
  let ref = useObjectRef<HTMLDivElement>();
  createEffect(() => ({element: ref.current, forwarded: forwarded()}), ({element, forwarded}) => {
    if (!element) { return; }
    let deliver = mergeRefs(forwarded);
    let cleanup = deliver(element);
    return typeof cleanup === 'function' ? cleanup : () => { deliver(null); };
  });
  return ref;
}

export interface SheetRenderProps extends ModalRenderProps {
  /**
   * The placement of the sheet on the screen. `start` and `end` are resolved to `left` or `right`
   * based on the locale direction.
   *
   * @selector [data-position="bottom | top | left | right | center"]
   */
  position: SheetPosition;
  /**
   * The direction the sheet can be swiped. `start` and `end` are resolved to `left` or `right`
   * based on the locale direction.
   *
   * @selector [data-swipe-direction="bottom | top | vertical | left | right | horizontal"]
   */
  swipeDirection: SheetSwipeDirection;
  /**
   * The index of the sheet in the stack.
   *
   * @selector [data-stack-index="0 | 1 | 2 | ..."]
   */
  stackIndex: number;
  /**
   * Whether the sheet has descendants.
   *
   * @selector [data-has-descendants]
   */
  hasDescendants: boolean;
  /**
   * Whether the sheet is fully expanded to its last snap point.
   *
   * @selector [data-expanded]
   */
  isExpanded: boolean;
}

export interface SheetOverlayProps
  extends
    Omit<
      ModalOverlayProps,
      | 'className'
      | 'style'
      | 'children'
      | 'render'
      | 'onEnter'
      | 'onExit'
      | 'isEntering'
      | 'isExiting'
      | 'isDismissable'
      | 'isKeyboardDismissDisabled'
    >,
    RenderProps<SheetRenderProps> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-SheetOverlay'
   */
  className?: ClassNameOrFunction<SheetRenderProps>;
  /**
   * The placement of the sheet on the screen. `start` and `end` are mirrored in right-to-left
   * locales.
   *
   * @default 'bottom'
   */
  position?: 'bottom' | 'top' | 'left' | 'right' | 'start' | 'end' | 'center';
  /**
   * The direction the sheet can be swiped. `start` and `end` are mirrored in right-to-left locales.
   * Defaults to the same direction as `position`.
   */
  swipeDirection?:
    | 'bottom'
    | 'top'
    | 'vertical'
    | 'left'
    | 'right'
    | 'start'
    | 'end'
    | 'horizontal';
  /**
   * Snap points the sheet will stop at, expressed as the amount of the sheet that is visible.
   * Numbers are pixels, and percentages are relative to the size of the sheet. Sheets initially
   * open to the first snap point.
   */
  snapPoints?: Array<number | string>;
  /**
   * Whether to prevent the user from closing the sheet by swiping, pressing Escape, or interacting
   * outside it.
   *
   * @default false
   */
  preventDismissal?: boolean;
}

type SheetValues = Omit<SheetRenderProps, keyof ModalRenderProps>;

interface InternalSheetContextValue extends Omit<SheetOverlayProps, 'position' | 'swipeDirection'> {
  position: SheetPosition;
  swipeDirection: SheetSwipeDirection;
  index: number;
  descendants: SheetStackEntry[];
  isEntering: boolean;
  isExiting: boolean;
  values: SheetValues;
}

const InternalSheetContext = createContext<InternalSheetContextValue | null>(null);

interface SheetStackEntry {
  id: string;
  range: string;
  direction: string;
  iterations: number;
}

let sheetStack: SheetStackEntry[] = [];
let stackListeners = new Set<() => void>();

function emitStackChange() {
  // Hoist every mounted sheet's timeline name to the root so a parent
  // can still resolve the child's timeline by name.
  // TODO: don't override existing timelines declared in CSS or inline styles.
  let names = Array.from({length: sheetStack.length})
    .map((_, i) => `--sheet-timeline-${i}`)
    .join(', ');
  document.documentElement.style.setProperty('timeline-scope', names);
  stackListeners.forEach(listener => listener());
}

function subscribeStack(listener: () => void) {
  stackListeners.add(listener);
  return () => {
    stackListeners.delete(listener);
  };
}

function registerSheet(config: SheetStackEntry) {
  sheetStack = [...sheetStack, config];
  emitStackChange();
  return () => {
    sheetStack = sheetStack.filter(e => e.id !== config.id);
    emitStackChange();
  };
}

function getSheetStack() {
  return sheetStack;
}

const supportsViewTimeline =
  typeof CSS !== 'undefined' &&
  typeof CSS.supports === 'function' &&
  CSS.supports('animation-timeline: view()');

export interface SheetTriggerProps extends DialogTriggerProps {}

/**
 * A SheetTrigger opens a sheet when a trigger element is pressed.
 */
export function SheetTrigger(props: SheetTriggerProps) {
  return (
    <DialogTrigger {...props}>
      {/* Prevent the trigger element from appearing stuck while the sheet is open. */}
      <PressResponder isPressed={false}>{props.children}</PressResponder>
    </DialogTrigger>
  );
}

// Additional padding added to the viewport to account for browser toolbar.
// More content than 100lvh is actually visible on iOS, even when the toolbar is collapsed.
const VIEWPORT_PADDING = isIOS() && isSafari() ? 'calc(100lvh - 100svh + 58px)' : '0px';
const viewportPadding = (after: boolean, axis: Axis) =>
  after && axis === 'y' ? VIEWPORT_PADDING : '0px';

/**
 * A SheetOverlay is a container for a SheetBackdrop and a Sheet.
 */
export function SheetOverlay(props: SheetOverlayProps) {
  let locale = useLocale();
  let position = () => resolveDirection(props.position ?? 'bottom', locale.direction);
  let swipeDirection = () => props.swipeDirection
    ? resolveDirection(props.swipeDirection, locale.direction)
    : position() === 'center'
      ? 'vertical'
      : position() as SheetSwipeDirection;
  // Resolve the state the same way ModalOverlay does, so that swiping to close works
  // both inside a SheetTrigger and when the open state is passed directly to SheetOverlay.
  let contextState = useContext(OverlayTriggerStateContext);
  let localState = useOverlayTriggerState(props);
  let state = () =>
    props.isOpen != null || props.defaultOpen != null || !contextState ? localState : contextState;
  let onCloseEvent = useEffectEvent(() => {
    state().close();
  });

  let config = () => getSwipeConfig(swipeDirection());

  let id = useId();
  let [isExpanded, setExpanded] = createSignal(false);
  let isVisible = false;
  let ref = useSheetRef(() => props.ref);
  // Own the external subscription and the attachment lifecycle in setup, not in
  // a callback-ref return value (which the native renderer ignores).
  let [stack, setStack] = createSignal(getSheetStack());
  onSettled(() => {
    let unsubscribe = subscribeStack(() => setStack(getSheetStack()));
    setStack(getSheetStack());
    return unsubscribe;
  });
  createEffect(
    () => ({element: ref.current, id: id(), ...config()}),
    ({element, id, axis, after, maxScroll, enteredScroll, viewRange, viewDirection, viewIterations}) => {
      if (!element) {
        return;
      }

      // Sheets that rest at scroll 0 (top/left) mount already entered. Move them to the exit position
      // before observing, since onEnter may be deferred (e.g. while waiting for the software keyboard),
      // and the observer would otherwise see the sheet as entered and then close it once onEnter
      // jumps to the exit position.
      if (enteredScroll === 0) {
        let scroller = element.querySelector<HTMLElement>('[data-sheet-scroll]');
        if (scroller) {
          let vp = axis === 'y' ? window.innerHeight : window.innerWidth;
          scrollAlongAxis(scroller, axis, (maxScroll / 100) * vp);
        }
      }

      // iOS displays content outside the reported viewport, e.g. behind the browser toolbar.
      // Add additional margin to account for that so that the sheet disappears only when it is entirely invisible.
      let rootMargin = `0px 0px ${calcToPx(viewportPadding(after, axis))} 0px`;

      let hasEntered = false;
      let observer = new IntersectionObserver(
        entries => {
          let entry = entries[0];

          // Expose whether the sheet is resting at its fully-entered detent (all of it revealed). Apps
          // can use `[data-expanded]` to only make the sheet's inner content scrollable once expanded,
          // so that at a partial detent a swipe on the content expands the sheet instead (like iOS).
          setExpanded(entry.intersectionRatio >= 1);
          isVisible = entry.intersectionRatio > 0;

          hasEntered ||= entry.intersectionRatio > 0;
          if (hasEntered && entry.intersectionRatio <= 0) {
            // eslint-disable-next-line react/react-compiler
            onCloseEvent();
            element.dispatchEvent(new CustomEvent('react-aria-sheet-close'));
          }
        },
        {threshold: [0, 1], rootMargin}
      );

      let el = element.querySelector('[data-sheet-content]');
      if (el) {
        observer.observe(el);
      }

      let removeSheet = registerSheet({id, range: viewRange, direction: viewDirection, iterations: viewIterations});

      return () => {
        observer.disconnect();
        removeSheet();
      };
    }
  );

  let index = () => Math.max(
    0,
    stack().findIndex(e => e.id === id())
  );
  let descendants = () => stack().slice(index() + 1);
  let values: SheetValues = {
    get position() { return position(); },
    get swipeDirection() { return swipeDirection(); },
    get isExpanded() { return isExpanded(); },
    get stackIndex() { return index(); },
    get hasDescendants() { return descendants().length > 0; }
  };
  let sheetProps = useSheetRenderProps(props, values, 'react-aria-SheetOverlay', {
    // absolute rather than fixed so the modal is not clipped by iOS Safari.
    position: 'absolute',
    top: 0,
    left: 0,
    width: 'max(var(--page-width), 100vw)',
    height: 'max(var(--page-height), 100dvh)',
    overflow: 'clip',
    // @ts-ignore
    '--sheet-scroll-padding-x': 'calc(100vw - var(--visual-viewport-width))',
    '--sheet-scroll-padding-y': 'calc(100dvh - var(--visual-viewport-height))'
  });
  const SheetOverlayChildren = (input: {modalValues: ModalRenderProps}) => {
    let rendered = useRenderProps({
      get children() { return props.children; },
      values: merge(input.modalValues, values)
    });
    return <>{rendered.children}</>;
  };

  return (
    <ModalOverlay
      {...props}
      isOpen={state().isOpen}
      defaultOpen={undefined}
      onOpenChange={isOpen => state().setOpen(isOpen)}
      ref={ref}
      isDismissable={!props.preventDismissal}
      isKeyboardDismissDisabled={props.preventDismissal || false}
      // Moving the VoiceOver cursor into the sheet (via focus, or by making the content behind it
      // inert) scrolls, which interrupts the enter scroll animation on iOS. Wait until it has entered.
      UNSTABLE_deferUntilEntered
      UNSTABLE_overrideFocus
      {...sheetProps}
      onEnter={element => {
        let {axis, after, maxScroll, enteredScroll} = config();
        // The overlay is the document-anchored wrapper; the swipe gesture scrolls the inner container.
        let scroller = element.querySelector<HTMLElement>('[data-sheet-scroll]')!;
        let vp =
          axis === 'y'
            ? window.innerHeight + parseFloat(calcToPx(viewportPadding(after, axis)))
            : window.innerWidth;
        // Open at the first custom detent when provided, otherwise the fully-entered position.
        let initial = element.querySelector<HTMLElement>('[data-sheet-initial]');
        let scrollToRest = (smooth: boolean) => {
          if (initial) {
            scrollDetentIntoView(scroller, initial, axis, after ? 'start' : 'end', smooth);
          } else {
            scrollAlongAxis(scroller, axis, (enteredScroll / 100) * vp, smooth);
          }
        };
        if (enteredScroll === 0) {
          // The rest position is at scroll 0, so the sheet mounts already entered. Jump to the exit
          // first, then animate back in on the next frame — doing both in the same task can leave
          // the browser stuck at the jumped-to position instead of running the smooth scroll.
          scrollAlongAxis(scroller, axis, (maxScroll / 100) * vp);
          requestAnimationFrame(() => scrollToRest(true));
        } else {
          scrollToRest(true);
        }

        return new Promise<void>(resolve => {
          // eslint-disable-next-line rsp-rules/no-non-composing-event-listener
          scroller.addEventListener('scrollend', () => resolve(), {once: true});
        });
      }}
      onExit={element => {
        let {axis, after, before, maxScroll, enteredScroll} = config();
        let scroller = element.querySelector<HTMLElement>('[data-sheet-scroll]')!;
        if (!isVisible) {
          // Wait for the end of the scroll gesture in Safari to avoid momentum scrolling re-targeting to the sheet behind.
          if (isSafari() && !isIOS()) {
            return new Promise<void>(resolve => {
              // eslint-disable-next-line rsp-rules/no-non-composing-event-listener
              scroller.addEventListener(
                'scrollend',
                () => {
                  setTimeout(() => resolve(), 50);
                },
                {once: true}
              );
            });
          }
          return;
        }

        let vp =
          axis === 'y'
            ? window.innerHeight + parseFloat(calcToPx(viewportPadding(after, axis)))
            : window.innerWidth;
        let maxScrollPx = (maxScroll / 100) * vp;
        let current = axis === 'y' ? scroller.scrollTop : scroller.scrollLeft;
        let target: number;
        if (after && !before) {
          target = 0;
        } else if (before && !after) {
          target = maxScrollPx;
        } else {
          // Dual direction: exit toward whichever edge is nearest the current position.
          target = current > (enteredScroll / 100) * vp ? maxScrollPx : 0;
        }
        scrollAlongAxis(scroller, axis, target, true);

        // The close event is dispatched on the overlay wrapper by the IntersectionObserver below.
        return new Promise<void>(resolve => {
          element.addEventListener('react-aria-sheet-close', () => resolve(), {once: true});
        });
      }}>
      {renderProps => (
        <InternalSheetContext
          value={merge(props, {
            get position() { return position(); },
            get swipeDirection() { return swipeDirection(); },
            get index() { return index(); },
            get descendants() { return descendants(); },
            get isEntering() { return renderProps.isEntering; },
            get isExiting() { return renderProps.isExiting; },
            values
          })}>
          <SheetOverlayChildren modalValues={renderProps} />
        </InternalSheetContext>
      )}
    </ModalOverlay>
  );
}

function getDataAttributes(values: SheetValues) {
  return {
    get 'data-position'() { return values.position; },
    get 'data-swipe-direction'() { return values.swipeDirection; },
    get 'data-expanded'() { return values.isExpanded ? 'true' : undefined; },
    get 'data-stack-index'() { return values.stackIndex; },
    get 'data-has-descendants'() { return values.hasDescendants ? 'true' : undefined; }
  };
}

// Merges the sheet-specific values into the render props, className, and style of a Modal or ModalOverlay.
function useSheetRenderProps(
  props: RenderProps<SheetRenderProps>,
  values: SheetValues,
  defaultClassName: string,
  defaultStyle: CSSProperties,
  overrideStyle?: Accessor<CSSProperties>
) {
  return merge(getDataAttributes(values), {
    get render() { return props.render
      ? (domProps: JSX.IntrinsicElements['div'], renderProps: ModalRenderProps) =>
          props.render!(domProps, merge(renderProps, values))
      : undefined; },
    className: (renderProps: ModalRenderProps & {defaultClassName: string | undefined}) =>
      typeof props.className === 'function'
         ? props.className(merge(renderProps, values))
        : props.className || defaultClassName,
    style: (renderProps: ModalRenderProps & {defaultStyle: CSSProperties}) => ({
      ...defaultStyle,
      ...(typeof props.style === 'function'
        ? props.style(merge(renderProps, values))
        : props.style),
      ...overrideStyle?.()
    })
  });
}

function resolveDirection<T extends string>(
  value: T | 'start' | 'end',
  direction: 'ltr' | 'rtl'
): T | 'left' | 'right' {
  if (value === 'start') {
    return direction === 'rtl' ? 'right' : 'left';
  }
  if (value === 'end') {
    return direction === 'rtl' ? 'left' : 'right';
  }
  return value as T;
}

type Axis = 'x' | 'y';

interface SwipeConfig {
  /** Scroll axis: 'y' for top/bottom/vertical, 'x' for left/right/horizontal. */
  axis: Axis;
  /** Whether the sheet may be swiped off the start edge (top/left). */
  before: boolean;
  /** Whether the sheet may be swiped off the end edge (bottom/right). */
  after: boolean;
  /** Distance in viewport percent between the two extreme scroll positions. */
  maxScroll: number;
  /** Scroll position (viewport percent) at which the sheet is fully entered. */
  enteredScroll: number;
  /** Offset of the scroll container along the swipe axis, in viewport percent. */
  containerOffset: number;
  /** CSS animation range. */
  viewRange: 'cover' | 'exit' | 'entry';
  /** CSS animation direction. */
  viewDirection: 'normal' | 'reverse' | 'alternate';
  /** CSS animation iteration count. */
  viewIterations: number;
}

// The sheet lives inside an oversized scroll container. Scrolling slides a viewport-sized "stage"
// (which holds the sheet) on and off screen along the swipe axis, so the browser drives the swipe
// gesture natively. The container is always 2 viewports along the axis; a fixed 1-viewport window
// (the actual browser viewport) looks onto it. The stage always sits 1 viewport into the content,
// and snap markers at the content extremes define the entered/exited resting positions.
function getSwipeConfig(swipeDirection: SheetSwipeDirection): SwipeConfig {
  let axis: Axis =
    swipeDirection === 'top' || swipeDirection === 'bottom' || swipeDirection === 'vertical'
      ? 'y'
      : 'x';
  let before =
    swipeDirection === 'top' ||
    swipeDirection === 'left' ||
    swipeDirection === 'vertical' ||
    swipeDirection === 'horizontal';
  let after =
    swipeDirection === 'bottom' ||
    swipeDirection === 'right' ||
    swipeDirection === 'vertical' ||
    swipeDirection === 'horizontal';
  // Each exitable side adds a viewport of scroll travel.
  let maxScroll = (Number(before) + Number(after)) * 100;
  // When the sheet can only exit toward the start edge (top/left), it rests at scroll 0 and is
  // swiped toward maxScroll to dismiss. Otherwise it rests 1 viewport in.
  let enteredScroll = before && !after ? 0 : 100;
  // Position the container so the rest position lands in the real viewport.
  let containerOffset = before && !after ? -100 : 0;

  // The sheet crosses a single viewport edge (the swipe edge), so map the animation to just that
  // crossing. In view-timeline terms `entry` is the scrollport's end edge (bottom/right, where the
  // sheet appears from) and `exit` is the start edge (top/left). Direction is chosen so progress 0
  // is the exited state and 1 is entered, matching keyframes authored from exited -> entered:
  // `entry` already runs gone -> entered, while `exit` runs entered -> gone and is reversed.
  //
  // Dual directions cross both edges, so run the same keyframe over the full `cover` range twice
  // (iteration count 2) with `alternate`: the view timeline splits its progress across the two
  // iterations, so it plays exited -> entered -> exited around the centered rest position. This
  // reuses a single exited -> entered keyframe rather than requiring an author to also write a
  // symmetric (0%/50%/100%) variant.
  const viewRange = before && after ? 'cover' : before ? 'exit' : 'entry';
  const viewDirection = before && after ? 'alternate' : before ? 'reverse' : 'normal';
  const viewIterations = before && after ? 2 : 1;

  return {
    axis,
    before,
    after,
    maxScroll,
    enteredScroll,
    containerOffset,
    viewRange,
    viewDirection,
    viewIterations
  };
}

// The resting [x, y] flex alignment for each sheet position, independent of the swipe direction.
const POSITION_ALIGNMENT: Record<SheetPosition, [string, string]> = {
  top: ['center', 'flex-start'],
  bottom: ['center', 'flex-end'],
  left: ['flex-start', 'center'],
  right: ['flex-end', 'center'],
  center: ['center', 'center']
};

interface SnapPointProps {
  point: number | string;
  align: 'start' | 'end' | 'none';
  axis: Axis;
}

// Converts a snap point value to a CSS length: numbers are pixels.
function toLength(point: number | string): string {
  return typeof point === 'number' ? `${point}px` : point;
}

function SnapPoint(props: SnapPointProps) {
  let mainUnit = () => props.axis === 'y' ? 'dvh' : 'dvw';
  let offset = () => toLength(props.point);
  return (
    <div
      style={{
        position: 'absolute',
        top: props.axis === 'y' ? offset() : 0,
        left: props.axis === 'x' ? offset() : 0,
        'scroll-snap-align': props.align,
        // A full viewport along the swipe axis so its start/end edge lands at the snap position.
        width: props.axis === 'x' ? `100${mainUnit()}` : '1px',
        height: props.axis === 'y' ? `100${mainUnit()}` : '1px'
      }}
    />
  );
}

interface DetentPointProps {
  point: number | string;
  axis: Axis;
  after: boolean;
  isInitial?: boolean;
}

// A snap marker placed inside the sheet, `point` in from its leading edge. Because it moves with
// the sheet, snapping it with a `scroll-margin` of one viewport rests the marker at the edge of the
// visible viewport, leaving exactly `point` of the sheet on screen. Since `point` is an inset rather
// than part of the margin, percentages resolve relative to the sheet's size.
function DetentPoint(props: DetentPointProps) {
  let viewport = () => props.axis === 'y' ? '100dvh' : '100dvw';
  let offset = () => toLength(props.point);
  let common = (): CSSProperties => ({
    position: 'absolute',
    width: '1px',
    height: '1px',
    'scroll-snap-align': props.after ? 'start' : 'end'
  });
  let edge = (): CSSProperties =>
    props.axis === 'y'
      ? props.after
        ? {top: offset(), left: 0, 'scroll-margin-top': viewport()}
        : {bottom: offset(), left: 0, 'scroll-margin-bottom': viewport()}
      : props.after
        ? {top: 0, left: offset(), 'scroll-margin-left': viewport()}
        : {top: 0, right: offset(), 'scroll-margin-right': viewport()};
  return (
    <div
      data-sheet-detent
      data-sheet-initial={props.isInitial || undefined}
      style={{...common(), ...edge()}}
    />
  );
}

export interface SheetProps
  extends
    Omit<
      ModalOverlayProps,
      | 'className'
      | 'style'
      | 'children'
      | 'render'
      | 'onEnter'
      | 'onExit'
      | 'isEntering'
      | 'isExiting'
      | 'isDismissable'
      | 'isOpen'
      | 'defaultOpen'
      | 'onOpenChange'
      | 'isKeyboardDismissDisabled'
      | 'shouldCloseOnInteractOutside'
    >,
    RenderProps<SheetRenderProps> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-Sheet'
   */
  className?: ClassNameOrFunction<SheetRenderProps>;
  /** CSS `@keyframes` name for the animation that occurs while the user swipes. */
  swipeAnimation?: string;
  /**
   * The snap point indices between which the swipe animation occurs. If omitted, the animation will
   * occur over the full range of the sheet's movement.
   */
  swipeAnimationRange?: {start?: number; end?: number};
  /** CSS `@keyframes` name for the animation that occurs when a sheet has descendants. */
  stackAnimation?: string;
  /** Whether to add padding to the sheet so that it appears to continue outside the viewport. */
  overscrollPadding?: boolean;
}

/**
 * A Sheet is a swipeable overlay that slides in from the edge of the viewport.
 */
export function Sheet(props: SheetProps) {
  let ref = useSheetRef(() => props.ref);
  let scrollRef = useObjectRef<HTMLDivElement>();
  let stageRef = useObjectRef<HTMLDivElement>();
  let context = useContext(InternalSheetContext)!;
  let position = () => context.position;
  let swipeDirection = () => context.swipeDirection;
  let snapPoints = () => context.snapPoints;
  let index = () => context.index;
  let descendants = () => context.descendants;
  let preventDismissal = () => context.preventDismissal || false;
  let values = context.values;
  // The ModalOverlay may defer its enter animation (e.g. until the software keyboard opens), during
  // which isEntering is false. The sheet is not settled until it has opened, so treat it as entering.
  let modalContext = useContext(InternalModalContext);
  let isTransitioning = () => !(modalContext?.isOpen ?? true) || context.isEntering || context.isExiting;
  let locale = useLocale();
  let config = () => getSwipeConfig(swipeDirection());
  let axis = () => config().axis;
  let after = () => config().after;
  let before = () => config().before;
  let containerOffset = () => config().containerOffset;
  let viewport = () => axis() === 'y' ? '100dvh' : '100dvw';

  // A non-dismissable sheet can still be swiped between its snap points, but not past the smallest
  // one. Enter/exit animations still need the exit space, so only clamp while settled.
  let hasSnapPoints = () => !!snapPoints()?.length && before() !== after();
  let isClamped = () => preventDismissal() && !isTransitioning();
  let snapTravel = useSnapPointTravel(
    stageRef,
    ref,
    axis,
    after,
    () => preventDismissal() && hasSnapPoints() ? snapPoints()!.join(' ') : null
  );

  // Scroll travel between the smallest snap point and the fully revealed sheet. It is at least 1px
  // so the scroll container remains scrollable, which lets the browser show its native overscroll
  // bounce even when there is nowhere to snap to.
  let clampedTravel = () => `${hasSnapPoints() ? Math.max(1, snapTravel()) : 1}px`;

  // The stage normally sits 1 viewport in so the sheet can scroll fully off screen toward the start
  // edge. When clamped, sheets exiting toward the end edge move it so scroll 0 rests at the smallest
  // snap point. Sheets exiting toward the start edge rest at scroll 0 already, so only the end of
  // the scroll content (the smallest snap point) moves. Dual direction sheets get 1px either side.
  // viewportPadding pushes bottom sheets down so that they can scroll beyond the viewport behind the iOS toolbar.
  let stageStart = () =>
    isClamped() && after() ? clampedTravel() : `calc(${viewport()} + ${viewportPadding(after(), axis())})`;
  let endMarker = () => {
    if (isClamped() && before() && after()) {
      return `calc(${stageStart()} + ${viewport()} + 1px)`;
    } else if (isClamped() && before()) {
      return `calc(${clampedTravel()} + ${viewport()})`;
    } else {
      return `calc(${stageStart()} + ${viewport()}${before() && after() ? ` + ${viewport()}` : ''})`;
    }
  };

  // Keep the sheet visually in place when switching between the clamped and unclamped geometry.
  // Scroll snapping is disabled while a non-dismissable sheet enters and exits so the browser
  // doesn't re-snap when the geometry changes, which would otherwise differ between browsers.
  let prevStageOffset: number | null = null;
  let prevClamped: boolean | undefined;
  createEffect(() => ({stage: stageRef.current, scroller: scrollRef.current, axis: axis(), clamped: isClamped(), stageStart: stageStart()}), ({stage, scroller, axis, clamped}) => {
    if (!stage || !scroller) {
      return;
    }
    let offset = axis === 'y' ? stage.offsetTop : stage.offsetLeft;
    if (prevClamped !== clamped && prevStageOffset != null) {
      let delta = offset - prevStageOffset;
      if (delta !== 0) {
        if (axis === 'y') {
          scroller.scrollTop += delta;
        } else {
          scroller.scrollLeft += delta;
        }
      }
    }
    prevClamped = clamped;
    prevStageOffset = offset;
  });

  let swipeAnimation = useSwipeAnimation(props);
  let overscrollInset = () => props.overscrollPadding && position() === swipeDirection()
    ? axis() === 'y' ? '100vh' : '100vw'
    : undefined;
  let style = (): CSSProperties => {
  let style: Record<string, string | number | undefined> = {
    // Positioned so the detent markers below anchor to the sheet's own box.
    position: 'relative',
    ...swipeAnimation()
  };

  if (props.overscrollPadding && position() === swipeDirection()) {
    // Extra padding to allow overscrolling, and a negative margin to offset it.
    switch (position()) {
      case 'top':
        style['padding-top'] = '100vh';
        style['margin-top'] = '-100vh';
        break;
      case 'bottom':
        style['padding-bottom'] = '100vh';
        style['margin-bottom'] = '-100vh';
        break;
      case 'left':
        style['padding-left'] = '100vw';
        style['margin-left'] = '-100vw';
        break;
      case 'right':
        style['padding-right'] = '100vw';
        style['margin-right'] = '-100vw';
        break;
    }
  }

  if (props.stackAnimation && descendants().length > 0 && supportsViewTimeline) {
    // Append one animation per descendant sheet, driven by that descendant's view timeline.
    let stackStyle: Record<string, (d: SheetStackEntry, i: number) => string> = {
      'animation-name': () => props.stackAnimation!,
      'animation-timeline': (_, i) => `--sheet-timeline-${index() + 1 + i}`,
      'animation-direction': d => d.direction,
      'animation-iteration-count': d => String(d.iterations),
      'animation-fill-mode': () => 'both',
      'animation-range': d => d.range,
      'animation-composition': () => 'accumulate',
      'animation-timing-function': () => 'linear'
    };
    for (let [key, value] of Object.entries(stackStyle)) {
      style[key] = [style[key], ...descendants().map(value)].filter(Boolean).join(', ');
    }
  }
  return style as CSSProperties;
  };

  let sheetProps = useSheetRenderProps(props, values, 'react-aria-Sheet', {get direction() { return locale.direction; }}, style);
  let alignment = () => POSITION_ALIGNMENT[position()];
  let justifyContent = () => axis() === 'y' ? alignment()[1] : alignment()[0];
  let alignItems = () => axis() === 'y' ? alignment()[0] : alignment()[1];
  let {scrollX, scrollY} = typeof window !== 'undefined' ? window : {scrollX: 0, scrollY: 0};
  const SheetChildren = (input: {modalValues: ModalRenderProps}) => {
    let rendered = useRenderProps({
      get children() { return props.children; },
      values: merge(input.modalValues, values)
    });
    return <>{rendered.children}</>;
  };

  return (
    <div
      ref={scrollRef}
      data-sheet-scroll
      style={{
        position: 'absolute',
        top: axis() === 'y' ? `calc(${scrollY}px + ${containerOffset()}dvh)` : `${scrollY}px`,
        left: axis() === 'x' ? `calc(${scrollX}px + ${containerOffset()}dvw)` : `${scrollX}px`,
        // The container is 2 viewports along the swipe axis and 1 viewport on the cross axis.
        height: axis() === 'y' ? '200dvh' : '100dvh',
        width: axis() === 'x' ? '200dvw' : '100dvw',
        'overflow-x': axis() === 'x' ? 'auto' : 'hidden',
        'overflow-y': axis() === 'y' ? 'auto' : 'hidden',
        // Snapping is only disabled when the geometry changes. Changing it during a swipe to dismiss
        // cancels the momentum scroll in Safari without firing scrollend, which onExit waits for.
        'scroll-snap-type': preventDismissal() && isTransitioning() ? 'none' : `${axis()} mandatory`,
        'overscroll-behavior-y': axis() === 'y' ? 'contain' : 'none',
        'overscroll-behavior-x': axis() === 'x' ? 'contain' : 'none',
        'scrollbar-width': 'none',
        // The scroll geometry is physical, so keep the scroll origin and flex alignment
        // left-to-right regardless of the document direction.
        direction: 'ltr'
      }}>
      {/* Snap marker for the exit at scroll 0 (also the rest position for top/left).
        When clamped, the exit positions are unreachable so they are not snap targets. */}
      <SnapPoint point={0} align={isClamped() && after() ? 'none' : 'start'} axis={axis()} />
      {/* When the sheet can exit both ways, add a center snap for the rest position. */}
      {before() && after() && <SnapPoint point={stageStart()} align="start" axis={axis()} />}
      <div
        ref={stageRef}
        style={{
          position: 'absolute',
          // The stage normally sits 1 viewport into the content along the swipe axis.
          top: axis() === 'y' ? stageStart() : 0,
          left: axis() === 'x' ? stageStart() : 0,
          height: '100dvh',
          width: '100dvw',
          display: 'flex',
          'flex-direction': axis() === 'y' ? 'column' : 'row',
          'align-items': alignItems(),
          'justify-content': justifyContent()
        }}>
        <Modal {...props} ref={ref} {...sheetProps}>
          {renderProps => (
            <>
              {snapPoints() && (
                // Excludes the overscroll padding so percentages are relative to the visible sheet.
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    ...(overscrollInset() ? {[position()]: overscrollInset()} : null),
                    'pointer-events': 'none'
                  }}>
                  <For each={snapPoints()} keyed={false}>{(point, i) => (
                    <DetentPoint
                      point={point()}
                      axis={axis()}
                      after={after()}
                      isInitial={i === 0}
                    />
                  )}</For>
                </div>
              )}
              <SheetChildren modalValues={renderProps} />
            </>
          )}
        </Modal>
      </div>
      {/* Snap marker for the exit at the far end of the scroll content. */}
      <SnapPoint point={endMarker()} align={isClamped() && before() ? 'none' : 'end'} axis={axis()} />
    </div>
  );
}

// Measures how far the sheet must scroll from its smallest snap point to be fully revealed, i.e. the
// distance from that snap point's marker to the stage's exit edge. Measuring the rendered markers
// means snap points can use any CSS length, including percentages of the sheet. Uses layout offsets
// rather than bounding rects so swipe/stack animation transforms don't affect it.
function useSnapPointTravel(
  stageRef: ObjectRef<HTMLDivElement>,
  sheetRef: ObjectRef<HTMLDivElement>,
  axis: Accessor<Axis>,
  after: Accessor<boolean>,
  // Space-separated snap points, so markers are re-measured when they change. Null to disable.
  snapPointsKey: Accessor<string | null>
): Accessor<number> {
  let [travel, setTravel] = createSignal(0);
  createEffect(() => ({stage: stageRef.current, sheet: sheetRef.current, axis: axis(), after: after(), snapPointsKey: snapPointsKey()}), ({stage, sheet, axis, after, snapPointsKey}) => {
    if (snapPointsKey == null || !stage || !sheet) {
      return;
    }

    let measure = () => {
      let stageSize = axis === 'y' ? stage.clientHeight : stage.clientWidth;
      let max = 0;
      for (let marker of sheet.querySelectorAll<HTMLElement>('[data-sheet-detent]')) {
        let offset = 0;
        let el: HTMLElement | null = marker;
        while (el && el !== stage) {
          offset += axis === 'y' ? el.offsetTop : el.offsetLeft;
          el = el.offsetParent as HTMLElement | null;
        }
        // Markers sit at the snap point's start edge for sheets exiting toward the end edge, and at
        // its end edge for sheets exiting toward the start edge. The smallest snap point travels most.
        let size = axis === 'y' ? marker.offsetHeight : marker.offsetWidth;
        max = Math.max(max, after ? stageSize - offset : offset + size);
      }
      setTravel(max);
    };

    measure();
    let observer = new ResizeObserver(measure);
    observer.observe(stage);
    observer.observe(sheet);
    return () => observer.disconnect();
  });

  return travel;
}

export interface SheetBackdropProps
  extends RenderProps<SheetRenderProps>, GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for
   * the element. A function may be provided to compute the class based on component state.
   *
   * @default 'react-aria-SheetBackdrop'
   */
  className?: ClassNameOrFunction<SheetRenderProps>;
  /** CSS `@keyframes` name for the animation that occurs while the user swipes. */
  swipeAnimation?: string;
  /**
   * The snap point indices between which the swipe animation occurs. If omitted, the animation will
   * occur over the full range of the sheet's movement.
   */
  swipeAnimationRange?: {start?: number; end?: number};
  ref?: JSX.Ref<HTMLDivElement>;
}

/**
 * The backdrop behind a sheet.
 */
export function SheetBackdrop(props: SheetBackdropProps) {
  let ref = useSheetRef(() => props.ref);
  let style = useSwipeAnimation(props);
  let context = useContext(InternalSheetContext)!;
  let values = context.values;
  let state = useContext(OverlayTriggerStateContext)!;
  let renderProps = useRenderProps(merge(props, {
    defaultClassName: 'react-aria-SheetBackdrop',
    get defaultStyle(): CSSProperties { return {...style(), position: 'absolute', inset: 0}; },
    values: merge(values, {
      get isEntering() { return context.isEntering; },
      get isExiting() { return context.isExiting; },
      state
    })
  }));

  return (
    <div
      ref={ref}
      {...filterDOMProps(props, {global: true})}
      {...omit(renderProps, 'className')}
      class={renderProps.className}
      {...getDataAttributes(values)}
      data-entering={context.isEntering || undefined}
      data-exiting={context.isExiting || undefined}
    />
  );
}

function useSwipeAnimation(props: SheetBackdropProps) {
  let context = useContext(InternalSheetContext)!;
  return (): CSSProperties => {
  let {swipeDirection, snapPoints, index, isEntering, isExiting} =
    context;
  let {viewRange, viewDirection, viewIterations} = getSwipeConfig(swipeDirection);

  if (props.swipeAnimation) {
    let rangeStart =
      props.swipeAnimationRange?.start != null
        ? toLength(snapPoints?.[props.swipeAnimationRange.start] ?? '0%')
        : '0%';
    let rangeEnd =
      props.swipeAnimationRange?.end != null
        ? toLength(snapPoints?.[props.swipeAnimationRange.end] ?? '100%')
        : '100%';
    if (swipeDirection === 'top' || swipeDirection === 'left') {
      rangeStart = `calc(100% - ${rangeStart})`;
      rangeEnd = `calc(100% - ${rangeEnd})`;
      [rangeStart, rangeEnd] = [rangeEnd, rangeStart];
    }

    // TODO: fix cover with range

    if (supportsViewTimeline) {
      return {
        'animation-name': props.swipeAnimation,
        'animation-timeline': `--sheet-timeline-${index}`,
        'animation-direction': viewDirection,
        'animation-iteration-count': viewIterations,
        'animation-fill-mode': 'both',
        'animation-range': `${viewRange} ${rangeStart} ${viewRange} ${rangeEnd}`,
        'animation-timing-function': 'linear',
        'animation-composition': 'replace'
      };
    } else if (isEntering || isExiting) {
      // Fallback for Firefox, which doesn't support view timelines.
      return {
        'animation-name': props.swipeAnimation,
        'animation-direction': isExiting ? 'reverse' : 'normal',
        'animation-duration': '300ms',
        'animation-iteration-count': '1',
        'animation-fill-mode': 'both',
        'animation-timing-function': 'linear',
        'animation-composition': 'replace'
      };
    }
  }

  return {};
  };
}

export interface SheetContentProps extends Omit<DialogProps, 'className' | 'isEntering'> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the
   * element.
   *
   * @default 'react-aria-SheetContent'
   */
  className?: string;
}

/**
 * The scrollable content area of a sheet.
 */
export function SheetContent(props: SheetContentProps) {
  let context = useContext(InternalSheetContext)!;
  let config = () => getSwipeConfig(context.swipeDirection);
  let viewportLength = () => config().axis === 'y' ? '100dvh' : '100dvw';

  let dialogProps: DialogProps = merge(props, {
    get className() { return props.className || 'react-aria-SheetContent'; },
    'data-sheet-content': true,
    get style(): CSSProperties { return {
        ...props.style,
        width: '100%',
        height: '100%',
        // The dialog is the subject of the view-progress timeline that drives all sheet animations.
        // It is _not_ the Modal because that may have additional padding for overscroll and therefore never be entirely visible.
        // The inset crops the scroll container's scrollport down to the visible viewport.
        // @ts-ignore
        'view-timeline-name': `--sheet-timeline-${context.index}`,
        'view-timeline-axis': config().axis,
        'view-timeline-inset': config().before && !config().after ? `${viewportLength()} 0` : `0 ${viewportLength()}`
      }; }
  });
  return <Dialog {...dialogProps} />;
}

function reduceMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function scrollAlongAxis(element: HTMLElement, axis: Axis, value: number, smooth = false) {
  let behavior: ScrollBehavior | undefined = smooth && !reduceMotion() ? 'smooth' : undefined;
  element.scrollTo(axis === 'y' ? {top: value, behavior} : {left: value, behavior});
}

function scrollDetentIntoView(
  scroller: HTMLElement,
  marker: HTMLElement,
  axis: Axis,
  align: 'start' | 'end',
  smooth = false
) {
  let behavior: ScrollBehavior = smooth && !reduceMotion() ? 'smooth' : 'auto';
  let markerRect = marker.getBoundingClientRect();
  let scrollerRect = scroller.getBoundingClientRect();
  let style = getComputedStyle(marker);
  if (axis === 'y') {
    if (align === 'start') {
      let margin = parseFloat(style.scrollMarginTop) || 0;
      // Rest the marker's start edge (less its scroll-margin) at the scrollport's start.
      let top = markerRect.top - scrollerRect.top + scroller.scrollTop - margin;
      scroller.scrollTo({top, behavior});
    } else {
      let margin = parseFloat(style.scrollMarginBottom) || 0;
      // Rest the marker's end edge (plus its scroll-margin) at the scrollport's end.
      let top =
        markerRect.bottom - scrollerRect.top + scroller.scrollTop + margin - scroller.clientHeight;
      scroller.scrollTo({top, behavior});
    }
  } else {
    if (align === 'start') {
      let margin = parseFloat(style.scrollMarginLeft) || 0;
      let left = markerRect.left - scrollerRect.left + scroller.scrollLeft - margin;
      scroller.scrollTo({left, behavior});
    } else {
      let margin = parseFloat(style.scrollMarginRight) || 0;
      let left =
        markerRect.right - scrollerRect.left + scroller.scrollLeft + margin - scroller.clientWidth;
      scroller.scrollTo({left, behavior});
    }
  }
}

function calcToPx(calc: string) {
  if (!calc.startsWith('calc(')) {
    return calc;
  }

  let measure = document.createElement('div');
  measure.inert = true;
  measure.style.position = 'absolute';
  measure.style.top = '0px';
  measure.style.left = '0px';
  measure.style.contain = 'strict';
  measure.style.height = calc;
  document.body.appendChild(measure);
  let height = window.getComputedStyle(measure).height;
  measure.remove();
  return height;
}
