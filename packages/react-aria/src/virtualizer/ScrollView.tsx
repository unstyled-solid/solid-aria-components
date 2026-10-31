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

import {addEvent, getOwnerDocument} from '../utils/domHelpers';
import {getEventTarget, getPropagationTargets, nodeContains} from '../utils/shadowdom/DOMFunctions';
import {getScrollLeft} from './utils';
import {Point, Rect, Size} from 'react-stately/useVirtualizerState';
import type {JSX} from '@solidjs/web';
import type {RefObject} from '@react-types/shared';
import {Accessor, createEffect, createSignal, merge, omit, onCleanup} from 'solid-js';
import {useEffectEvent} from '../utils/useEffectEvent';
import {useLocale} from '../i18n/I18nProvider';
import {Ref, useObjectRef} from '../utils/useObjectRef';
import {useResizeObserver} from '../utils/useResizeObserver';

type CSSProperties = JSX.CSSProperties;
export interface ScrollViewProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onScroll' | 'children' | 'style' | 'ref'> {
  contentSize: Size;
  onVisibleRectChange: (rect: Rect) => void;
  onSizeChange?: (size: Size) => void;
  children?: JSX.Element;
  style?: CSSProperties;
  ref?: Ref<HTMLDivElement>;
  innerStyle?: CSSProperties;
  onScrollStart?: () => void;
  onScrollEnd?: () => void;
  scrollDirection?: 'horizontal' | 'vertical' | 'both';
  onScroll?: (e: Event) => void;
  allowsWindowScrolling?: boolean;
}

export function ScrollView(props: ScrollViewProps) {
  let ref = useObjectRef(props.ref);
  let {scrollViewProps, contentProps} = useScrollView(props, ref);

  return (
    <div role="presentation" {...scrollViewProps} ref={ref}>
      <div {...contentProps}>{props.children}</div>
    </div>
  );
}

interface ScrollViewAria {
  isScrolling: Accessor<boolean>;
  scrollViewProps: JSX.HTMLAttributes<HTMLDivElement>;
  contentProps: JSX.HTMLAttributes<HTMLDivElement>;
}

export function useScrollView(
  props: ScrollViewProps,
  ref: RefObject<HTMLElement | null>
): ScrollViewAria {
  let otherProps = omit(props, 'contentSize', 'onVisibleRectChange', 'onSizeChange', 'innerStyle', 'onScrollStart', 'onScrollEnd', 'scrollDirection', 'onScroll', 'allowsWindowScrolling', 'ref', 'children');
  let state = {
    // Internal scroll position of the scroll view.
    scrollPosition: new Point(),
    // Size of the scroll view.
    size: new Size(),
    // Offset of the scroll view relative to the window viewport.
    viewportOffset: new Point(),
    // Size of the window viewport.
    viewportSize: new Size(),
    scrollEndTime: 0,
    scrollTimeout: null as ReturnType<typeof setTimeout> | null,
    isScrolling: false,
    lastVisibleRect: new Rect()
  };
  let locale = useLocale();
  let disposed = false;

  let updateVisibleRect = () => {
    // Intersect the window viewport with the scroll view itself to find the actual visible rectangle.
    // This allows virtualized components to have unbounded height but still virtualize when scrolled with the page.
    // While there may be other scrollable elements between the <body> and the scroll view, we do not take
    // their sizes into account for performance reasons. Their scroll positions are accounted for in viewportOffset
    // though (due to getBoundingClientRect). This may result in more rows than absolutely necessary being rendered,
    // but no more than the entire height of the viewport which is good enough for virtualization use cases.
    let visibleRect = props.allowsWindowScrolling
      ? new Rect(
          state.viewportOffset.x + state.scrollPosition.x,
          state.viewportOffset.y + state.scrollPosition.y,
          Math.max(
            0,
            Math.min(state.size.width - state.viewportOffset.x, state.viewportSize.width)
          ),
          Math.max(
            0,
            Math.min(state.size.height - state.viewportOffset.y, state.viewportSize.height)
          )
        )
      : new Rect(
          state.scrollPosition.x,
          state.scrollPosition.y,
          state.size.width,
          state.size.height
        );
    // Don't emit updates if the visible area is zero and the last emitted area was also zero.
    if (visibleRect.area > 0 || state.lastVisibleRect.area > 0) {
      props.onVisibleRectChange(visibleRect);
      state.lastVisibleRect = visibleRect;
    }
  };

  let [isScrolling, setScrolling] = createSignal(false);
  let [measuredSize, setMeasuredSize] = createSignal(state.size);

  let onScroll = (e: Event) => {
      if (disposed || !ref.current) { return; }
      let target = getEventTarget(e) as Element;
      if (!nodeContains(target, ref.current!)) {
        return;
      }

      if (props.onScroll && target === ref.current) {
        props.onScroll(e);
      }

      if (target !== ref.current) {
        // An ancestor element or the window was scrolled. Update the position of the scroll view relative to the viewport.
        let boundingRect = ref.current!.getBoundingClientRect();
        let x = boundingRect.x < 0 ? -boundingRect.x : 0;
        let y = boundingRect.y < 0 ? -boundingRect.y : 0;
        if (x === state.viewportOffset.x && y === state.viewportOffset.y) {
          return;
        }

        state.viewportOffset = new Point(x, y);
      } else {
        // The scroll view itself was scrolled. Update the local scroll position.
        // Prevent rubber band scrolling from shaking when scrolling out of bounds
        let scrollTop = target.scrollTop;
        let scrollLeft = getScrollLeft(target, locale.direction);
        state.scrollPosition = new Point(
          Math.max(0, Math.min(scrollLeft, props.contentSize.width - state.size.width)),
          Math.max(0, Math.min(scrollTop, props.contentSize.height - state.size.height))
        );
      }

      // Carry the explicit scroll observation through this transaction. Reactive
      // writes settle normally; no synchronous production renderer flush is needed.
        updateVisibleRect();

        if (!state.isScrolling) {
          state.isScrolling = true;
          setScrolling(true);

          // Pause typekit MutationObserver during scrolling.
          window.dispatchEvent(new Event('tk.disconnect-observer'));
          if (props.onScrollStart) {
            props.onScrollStart();
          }
        }

        // So we don't constantly call clearTimeout and setTimeout,
        // keep track of the current timeout time and only reschedule
        // the timer when it is getting close.
        let now = Date.now();
        if (state.scrollEndTime <= now + 50) {
          state.scrollEndTime = now + 300;

          if (state.scrollTimeout != null) {
            clearTimeout(state.scrollTimeout);
          }

          state.scrollTimeout = setTimeout(() => {
            state.isScrolling = false;
            setScrolling(false);
            state.scrollTimeout = null;

            window.dispatchEvent(new Event('tk.connect-observer'));
            if (props.onScrollEnd) {
              props.onScrollEnd();
            }
          }, 300);
        }
  };

  // Attach a document-level capturing scroll listener so we can account for scrollable ancestors.
  createEffect(() => ref.current, element => {
    if (!element) { return; }
    return addEvent(
      getPropagationTargets(element, getOwnerDocument(element)),
      'scroll',
      onScroll,
      true
    );
  });

  onCleanup(() => {
      disposed = true;
      if (state.scrollTimeout != null) {
        clearTimeout(state.scrollTimeout);
      }

      if (state.isScrolling) {
        window.dispatchEvent(new Event('tk.connect-observer'));
      }
  });

  let isUpdatingSize = false;
  let updateSize = useEffectEvent(() => {
      let dom = ref.current;
      if (!dom || disposed || isUpdatingSize) {
        return;
      }

      // Prevent reentrancy when resize observer fires, triggers re-layout that results in
      // content size update, causing below layout effect to fire. This avoids infinite loops.
      isUpdatingSize = true;

      let isTestEnv = process.env.NODE_ENV === 'test' && !process.env.VIRT_ON;
      let isClientWidthMocked = Object.getOwnPropertyNames(window.HTMLElement.prototype).includes(
        'clientWidth'
      );
      let isClientHeightMocked = Object.getOwnPropertyNames(window.HTMLElement.prototype).includes(
        'clientHeight'
      );
      let clientWidth = dom.clientWidth;
      let clientHeight = dom.clientHeight;
      let w = isTestEnv && !isClientWidthMocked ? Infinity : clientWidth;
      let h = isTestEnv && !isClientHeightMocked ? Infinity : clientHeight;

      // Update the window viewport size.
      let viewportWidth = window.innerWidth;
      let viewportHeight = window.innerHeight;
      let viewportSizeChanged =
        state.viewportSize.width !== viewportWidth || state.viewportSize.height !== viewportHeight;
      if (viewportSizeChanged) {
        state.viewportSize = new Size(viewportWidth, viewportHeight);
      }

      if (state.size.width !== w || state.size.height !== h || viewportSizeChanged) {
        state.size = new Size(w, h);
        setMeasuredSize(state.size);
        updateVisibleRect();
        props.onSizeChange?.(state.size);

        // If the clientWidth or clientHeight changed, scrollbars appeared or disappeared as
        // a result of the layout update. In this case, re-layout again to account for the
        // adjusted space. In very specific cases this might result in the scrollbars disappearing
        // again, resulting in extra padding. We stop after a maximum of two layout passes to avoid
        // an infinite loop. This matches how browsers behavior with native CSS grid layout.
        // Measure the second pass only after the first publication's DOM work
        // has settled. Keep the source guard held across that boundary.
        queueMicrotask(() => {
          if (disposed || ref.current !== dom) { isUpdatingSize = false; return; }
          if ((!isTestEnv && clientWidth !== dom.clientWidth) || clientHeight !== dom.clientHeight) {
            state.size = new Size(dom.clientWidth, dom.clientHeight);
            setMeasuredSize(state.size);
            updateVisibleRect();
            props.onSizeChange?.(state.size);
          }
          // No third scrollbar-size layout pass is permitted.
          isUpdatingSize = false;
        });
        return;
      }

      isUpdatingSize = false;
  });

  // Track the size of the entire window viewport, which is used to bound the size of the virtualizer's visible rectangle.
  createEffect(() => ref.current, element => {
    if (!element) { return; }
    // Initialize viewportRect before updating size for the first time.
    state.viewportSize = new Size(window.innerWidth, window.innerHeight);

    let onWindowResize = () => {
      updateSize();
    };

    window.addEventListener('resize', onWindowResize);
    return () => window.removeEventListener('resize', onWindowResize);
  });

  // Update visible rect when the content size changes, in case scrollbars need to appear or disappear.
  let lastContentSize: Size | null = null;
  let lastElement: HTMLElement | null = null;
  createEffect(() => ({contentSize: props.contentSize, element: ref.current}), ({contentSize, element}) => {
    if (element !== lastElement || lastContentSize == null || !contentSize.equals(lastContentSize)) {
      // The terminal effect follows committed host styles and attached refs.
      updateSize();
    }
    lastElement = element;
    lastContentSize = contentSize;
  });

  let onResize = () => updateSize();

  // Watch border-box instead of of content-box so that we don't go into
  // an infinite loop when scrollbars appear or disappear.
  useResizeObserver({ref, box: 'border-box', onResize});

  let style = (): CSSProperties => {
    let result: CSSProperties = {
    // Reset padding so that relative positioning works correctly. Padding will be done in JS layout.
    padding: 0,
    ...otherProps.style
    };

  if (props.scrollDirection === 'horizontal') {
    result['overflow-x'] = 'auto';
    result['overflow-y'] = 'hidden';
    // oxlint-disable-next-line react/react-compiler
  } else if (props.scrollDirection === 'vertical' || props.contentSize.width === measuredSize().width) {
    // Set overflow-x: hidden if content size is equal to the width of the scroll view.
    // This prevents horizontal scrollbars from flickering during resizing due to resize observer
    // firing slower than the frame rate, which may cause an infinite re-render loop.
    result['overflow-y'] = 'auto';
    result['overflow-x'] = 'hidden';
  } else {
    result.overflow = 'auto';
  }
    return result;
  };

  let innerStyle = (): CSSProperties => ({
    width: Number.isFinite(props.contentSize.width) ? `${props.contentSize.width}px` : undefined,
    height: Number.isFinite(props.contentSize.height) ? `${props.contentSize.height}px` : undefined,
    'pointer-events': isScrolling() ? 'none' : 'auto',
    position: 'relative',
    ...props.innerStyle
  });

  return {
    isScrolling,
    scrollViewProps: merge(otherProps, {get style() { return style(); }}),
    contentProps: {
      role: 'presentation',
      get style() { return innerStyle(); }
    }
  };
}
