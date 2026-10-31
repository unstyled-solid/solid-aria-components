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

import {AriaLabelingProps, Orientation, RefObject} from '@react-types/shared';
import {createFocusManager} from '../focus/FocusScope';
import {filterDOMProps} from '../utils/filterDOMProps';
import {createEffect, createSignal, merge} from 'solid-js';
import type {JSX} from '@solidjs/web';
import {getActiveElement, getEventTarget, nodeContains} from '../utils/shadowdom/DOMFunctions';
import {useLocale} from '../i18n/I18nProvider';

export interface AriaToolbarProps extends AriaLabelingProps {
  /**
   * The orientation of the entire toolbar.
   *
   * @default 'horizontal'
   */
  orientation?: Orientation;
}

export interface ToolbarAria {
  /**
   * Props for the toolbar container.
   */
  toolbarProps: JSX.HTMLAttributes<HTMLElement>;
}

/**
 * Provides the behavior and accessibility implementation for a toolbar.
 * A toolbar is a container for a set of interactive controls with arrow key navigation.
 *
 * @param props - Props to be applied to the toolbar.
 * @param ref - A ref to a DOM element for the toolbar.
 */
export function useToolbar(
  props: AriaToolbarProps,
  ref: RefObject<HTMLElement | null>
): ToolbarAria {
  let orientation = () => props.orientation ?? 'horizontal';
  let [isInToolbar, setInToolbar] = createSignal(false);
  // should be safe because re-calling set state with the same value it already has is a no-op
  // this will allow us to react should a parent re-render and change its role though
  // eslint-disable-next-line react-hooks/exhaustive-deps
  createEffect(() => ref.current, element => {
    let update = () => setInToolbar(!!element?.parentElement?.closest('[role="toolbar"]'));
    update();
    if (!element) return;
    // Native components do not rerun when an ancestor's role changes. Observe
    // exactly those role attributes the source's repeated layout read depends on.
    let observer = new MutationObserver(update);
    for (let ancestor = element.parentElement; ancestor; ancestor = ancestor.parentElement) {
      observer.observe(ancestor, {attributes: true, attributeFilter: ['role']});
    }
    return () => observer.disconnect();
  });
  const locale = useLocale();
  const shouldReverse = () => locale.direction === 'rtl' && orientation() === 'horizontal';
  // oxlint-disable-next-line react/react-compiler
  let focusManager = createFocusManager(ref);

  const onKeyDown: JSX.EventHandler<HTMLElement, KeyboardEvent> = e => {
    // don't handle portalled events
    if (!nodeContains(e.currentTarget, getEventTarget(e) as HTMLElement)) {
      return;
    }
    if (
      (orientation() === 'horizontal' && e.key === 'ArrowRight') ||
      (orientation() === 'vertical' && e.key === 'ArrowDown')
    ) {
      if (shouldReverse()) {
        focusManager.focusPrevious();
      } else {
        focusManager.focusNext();
      }
    } else if (
      (orientation() === 'horizontal' && e.key === 'ArrowLeft') ||
      (orientation() === 'vertical' && e.key === 'ArrowUp')
    ) {
      if (shouldReverse()) {
        focusManager.focusNext();
      } else {
        focusManager.focusPrevious();
      }
    } else if (e.key === 'Tab') {
      // When the tab key is pressed, we want to move focus
      // out of the entire toolbar. To do this, move focus
      // to the first or last focusable child, and let the
      // browser handle the Tab key as usual from there.
      lastFocused.current = getActiveElement() as HTMLElement;
      if (e.shiftKey) {
        focusManager.focusFirst();
      } else {
        focusManager.focusLast();
      }
      return;
    } else {
      // if we didn't handle anything, return early so we don't preventDefault
      return;
    }

    // Prevent arrow keys from being handled by nested action groups.
    e.stopPropagation();
    e.preventDefault();
  };

  // Record the last focused child when focus moves out of the toolbar.
  const lastFocused: {current: HTMLElement | null} = {current: null};
  const onBlur: JSX.EventHandler<HTMLElement, FocusEvent> = e => {
    if (!nodeContains(e.currentTarget, e.relatedTarget as Node | null) && !lastFocused.current) {
      lastFocused.current = getEventTarget(e) as HTMLElement;
    }
  };

  // Restore focus to the last focused child when focus returns into the toolbar.
  // If the element was removed, do nothing, either the first item in the first group,
  // or the last item in the last group will be focused, depending on direction.
  const onFocus: JSX.EventHandler<HTMLElement, FocusEvent> = e => {
    if (
      lastFocused.current &&
      !nodeContains(e.currentTarget, e.relatedTarget as Node | null) &&
      nodeContains(ref.current, getEventTarget(e))
    ) {
      lastFocused.current?.focus();
      lastFocused.current = null;
    }
  };

  return {
    // Source object spread overrides even with undefined. Unlike interaction
    // merging, an explicit label must remove the earlier aria-labelledby.
    toolbarProps: merge(filterDOMProps(props, {labelable: true}), {
      get role() { return !isInToolbar() ? 'toolbar' : 'group'; },
      get 'aria-orientation'() { return orientation(); },
      get 'aria-label'() { return props['aria-label']; },
      get 'aria-labelledby'() { return props['aria-label'] == null ? props['aria-labelledby'] : undefined; },
      get onKeyDownCapture() { return !isInToolbar() ? onKeyDown : undefined; },
      get onFocusCapture() { return !isInToolbar() ? onFocus : undefined; },
      get onBlurCapture() { return !isInToolbar() ? onBlur : undefined; }
    })
  };
}
