/*
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {AriaLabelingProps, DOMAttributes, FocusableElement, RefObject} from '@react-types/shared';
import {focusWithoutScrolling} from '../utils/focusWithoutScrolling';
import {getEventTarget} from '../utils/shadowdom/DOMFunctions';
import {getInteractionModality} from '../interactions/useFocusVisible';
import intlMessages from '../../intl/toast/*.json';
import {mergeProps} from '../utils/mergeProps';
import {ToastState} from 'react-stately/useToastState';
import {createEffect, onCleanup, untrack} from 'solid-js';
import {useFocusWithin} from '../interactions/useFocusWithin';
import {useHover} from '../interactions/useHover';
import {useLandmark} from '../landmark/useLandmark';
import {useLocalizedStringFormatter} from '../i18n/useLocalizedStringFormatter';
import {useEffectEvent} from '../utils/useEffectEvent';

export interface AriaToastRegionProps extends AriaLabelingProps {
  /**
   * An accessibility label for the toast region.
   *
   * @default 'Notifications'
   */
  'aria-label'?: string;
}

export interface ToastRegionAria {
  /** Props for the landmark region element. */
  regionProps: DOMAttributes;
}

/**
 * Provides the behavior and accessibility implementation for a toast region containing one or more
 * toasts. Toasts display brief, temporary notifications of actions, errors, or other events in an
 * application.
 */
export function useToastRegion<T>(
  props: AriaToastRegionProps,
  state: ToastState<T>,
  ref: RefObject<HTMLElement | null>
): ToastRegionAria {
  let stringFormatter = useLocalizedStringFormatter(intlMessages, '@react-aria/toast');
  let {landmarkProps} = useLandmark(
    {
      role: 'region',
      get 'aria-label'() {return props['aria-label'] ||
        stringFormatter.format('notifications', {count: state.visibleToasts.length});}
    },
    ref
  );

  let isHovered = {current: false};
  let isFocused = {current: false};
  let updateTimers = useEffectEvent(() => {
    if (isHovered.current || isFocused.current) {
      state.pauseAll();
    } else {
      state.resumeAll();
    }
  });

  let {hoverProps} = useHover({
    onHoverStart: () => {
      isHovered.current = true;
      updateTimers();
    },
    onHoverEnd: () => {
      isHovered.current = false;
      updateTimers();
    }
  });

  // Manage focus within the toast region.
  // If a focused containing toast is removed, move focus to the next toast, or the previous toast if there is no next toast.
  let toasts = {current: [] as FocusableElement[]};
  let prevVisibleToasts = {current: untrack(() => state.visibleToasts)};
  let focusedToast = {current: null as number | null};
  createEffect(() => ({visibleToasts: state.visibleToasts, element: ref.current}), ({visibleToasts, element}) => {
    // If no toast has focus, then don't do anything.
    if (focusedToast.current === -1 || visibleToasts.length === 0 || !element) {
      toasts.current = [];
      prevVisibleToasts.current = visibleToasts;
      return;
    }
    toasts.current = [
      ...element.querySelectorAll('[role="alertdialog"]')
    ] as FocusableElement[];
    // If the visible toasts haven't changed, we don't need to do anything.
    if (
      prevVisibleToasts.current.length === visibleToasts.length &&
      visibleToasts.every((t, i) => t.key === prevVisibleToasts.current[i].key)
    ) {
      prevVisibleToasts.current = visibleToasts;
      return;
    }
    // Get a list of all toasts by index and add info if they are removed.
    let allToasts = prevVisibleToasts.current.map((t, i) => ({
      ...t,
      i,
      isRemoved: !visibleToasts.some(t2 => t.key === t2.key)
    }));

    let removedFocusedToastIndex = allToasts.findIndex(
      t => t.i === focusedToast.current && t.isRemoved
    );

    // If the focused toast was removed, focus the next or previous toast.
    if (removedFocusedToastIndex > -1) {
      // In pointer modality, move focus out of the toast region.
      // Otherwise auto-dismiss timers will appear "stuck".
      // oxlint-disable-next-line react/react-compiler
      if (getInteractionModality() === 'pointer' && lastFocused.current?.isConnected) {
        focusWithoutScrolling(lastFocused.current);
      } else {
        let i = 0;
        let nextToast;
        let prevToast;
        while (i <= removedFocusedToastIndex) {
          if (!allToasts[i].isRemoved) {
            prevToast = Math.max(0, i - 1);
          }
          i++;
        }
        while (i < allToasts.length) {
          if (!allToasts[i].isRemoved) {
            nextToast = i - 1;
            break;
          }
          i++;
        }

        // in the case where it's one toast at a time, both will be undefined, but we know the index must be 0
        if (prevToast === undefined && nextToast === undefined) {
          prevToast = 0;
        }

        // prioritize going to newer toasts
        if (prevToast !== undefined && prevToast >= 0 && prevToast < toasts.current.length) {
          focusWithoutScrolling(toasts.current[prevToast]);
        } else if (nextToast !== undefined && nextToast >= 0 && nextToast < toasts.current.length) {
          focusWithoutScrolling(toasts.current[nextToast]);
        }
      }
    }

    prevVisibleToasts.current = visibleToasts;
  });

  let lastFocused = {current: null as FocusableElement | null};
  let {focusWithinProps} = useFocusWithin({
    onFocusWithin: e => {
      isFocused.current = true;
      // oxlint-disable-next-line react/react-compiler
      lastFocused.current = e.relatedTarget as FocusableElement;
      updateTimers();
    },
    onBlurWithin: () => {
      isFocused.current = false;
      // oxlint-disable-next-line react/react-compiler
      lastFocused.current = null;
      updateTimers();
    }
  });

  // When the number of visible toasts becomes 0 or the region unmounts,
  // restore focus to the last element that had focus before the user moved focus
  // into the region. FocusScope restore focus doesn't update whenever the focus
  // moves in, it only happens once, so we correct it.
  // Because we're in a hook, we can't control if the user unmounts or not.
  createEffect(() => state.visibleToasts.length, length => {
    if (length === 0 && lastFocused.current?.isConnected) {
      if (getInteractionModality() === 'pointer') {
        focusWithoutScrolling(lastFocused.current);
      } else {
        lastFocused.current.focus();
      }
      // oxlint-disable-next-line react/react-compiler
      lastFocused.current = null;
    }
  });

  onCleanup(() => {
      if (lastFocused.current?.isConnected) {
        if (getInteractionModality() === 'pointer') {
          focusWithoutScrolling(lastFocused.current);
        } else {
          lastFocused.current.focus();
        }
        lastFocused.current = null;
      }
  });

  return {
    // oxlint-disable-next-line react/react-compiler
    regionProps: mergeProps(landmarkProps, hoverProps, focusWithinProps, {
      tabindex: -1,
      // Mark the toast region as a "top layer", so that it:
      //   - is not aria-hidden when opening an overlay
      //   - allows focus even outside a containing focus scope
      //   - doesn’t dismiss overlays when clicking on it, even though it is outside
      // @ts-ignore
      'data-react-aria-top-layer': true,
      // listen to focus events separate from focuswithin because that will only fire once
      // and we need to follow all focus changes
      onFocusIn: (e: FocusEvent) => {
        let target = (getEventTarget(e) as Element).closest('[role="alertdialog"]');
        focusedToast.current = toasts.current.findIndex(t => t === target);
      },
      onFocusOut: () => {
        focusedToast.current = -1;
      }
    })
  };
}
