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

import {getScrollParent} from '../utils/getScrollParent';

import {isIOS, isWebKit} from '../utils/platform';
import {isScrollable} from '../utils/isScrollable';
import {RefObject} from '@react-types/shared';
import {createEffect, onCleanup} from 'solid-js';

const AUTOSCROLL_AREA_SIZE = 20;

interface AutoScrollAria {
  move(x: number, y: number): void;
  stop(): void;
}

export function useAutoScroll(ref: RefObject<Element | null>): AutoScrollAria {
  let scrollableRef = {current: null as Element | null};
  let scrollableX = {current: true};
  let scrollableY = {current: true};
  createEffect(() => ref.current, element => {
    if (element) {
      scrollableRef.current = isScrollable(element)
        ? element
        : getScrollParent(element);
      let style = window.getComputedStyle(scrollableRef.current);
      scrollableX.current = /(auto|scroll)/.test(style.overflowX);
      scrollableY.current = /(auto|scroll)/.test(style.overflowY);
    }
    return () => { scrollableRef.current = null; };
  });

  // oxlint-disable-next-line react/react-compiler
  let state: {
    timer: ReturnType<typeof requestAnimationFrame> | undefined;
    dx: number;
    dy: number;
  } = {
    timer: undefined,
    dx: 0,
    dy: 0
  };

  onCleanup(() => {
    if (state.timer) {
      cancelAnimationFrame(state.timer);
      state.timer = undefined;
    }
  });

  let scroll = () => {
    if (scrollableX.current && scrollableRef.current) {
      scrollableRef.current.scrollLeft += state.dx;
    }
    if (scrollableY.current && scrollableRef.current) {
      scrollableRef.current.scrollTop += state.dy;
    }

    if (state.timer) {
      // oxlint-disable-next-line react/react-compiler
      state.timer = requestAnimationFrame(scroll);
    }
  };

  return {
    move(x, y) {
      // Most browsers auto scroll natively, but WebKit on macOS does not (iOS does 🤷‍♂️).
      // https://bugs.webkit.org/show_bug.cgi?id=222636
      if (!isWebKit() || isIOS() || !scrollableRef.current) {
        return;
      }

      let box = scrollableRef.current.getBoundingClientRect();
      let left = AUTOSCROLL_AREA_SIZE;
      let top = AUTOSCROLL_AREA_SIZE;
      let bottom = box.height - AUTOSCROLL_AREA_SIZE;
      let right = box.width - AUTOSCROLL_AREA_SIZE;
      if (x < left || x > right || y < top || y > bottom) {
        if (x < left) {
          state.dx = x - left;
        } else if (x > right) {
          state.dx = x - right;
        }
        if (y < top) {
          state.dy = y - top;
        } else if (y > bottom) {
          state.dy = y - bottom;
        }

        if (!state.timer) {
          state.timer = requestAnimationFrame(scroll);
        }
      } else {
        this.stop();
      }
    },
    stop() {
      if (state.timer) {
        cancelAnimationFrame(state.timer);
        state.timer = undefined;
      }
    }
  };
}
