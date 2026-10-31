/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {AriaButtonProps} from '../button/useButton';

import {DisclosureState} from 'react-stately/useDisclosureState';
import type {JSX} from '@solidjs/web';
import type {RefObject} from '@react-types/shared';
import {createEffect, onCleanup} from 'solid-js';
import {useEvent} from '../utils/useEvent';
import {useId} from '../utils/useId';
import {useIsSSR} from '../ssr/SSRProvider';

export interface AriaDisclosureProps {
  /** Whether the disclosure is disabled. */
  isDisabled?: boolean;
  /** Handler that is called when the disclosure's expanded state changes. */
  onExpandedChange?: (isExpanded: boolean) => void;
  /** Whether the disclosure is expanded (controlled). */
  isExpanded?: boolean;
  /** Whether the disclosure is expanded by default (uncontrolled). */
  defaultExpanded?: boolean;
}

export interface DisclosureAria {
  /** Props for the disclosure button. */
  buttonProps: AriaButtonProps;
  /** Props for the disclosure panel. */
  panelProps: Omit<JSX.HTMLAttributes<HTMLElement>, 'aria-hidden'> & {'aria-hidden': boolean};
}

/**
 * Provides the behavior and accessibility implementation for a disclosure component.
 *
 * @param props - Props for the disclosure.
 * @param state - State for the disclosure, as returned by `useDisclosureState`.
 * @param ref - A ref for the disclosure panel.
 */
export function useDisclosure(
  props: AriaDisclosureProps,
  state: DisclosureState,
  ref: RefObject<HTMLElement | null>
): DisclosureAria {
  let isDisabled = () => props.isDisabled;
  let triggerId = useId();
  let panelId = useId();
  let isSSR = useIsSSR();

  let raf: number | null = null;

  let handleBeforeMatch = () => {
    // Wait a frame to revert browser's removal of hidden attribute
    raf = requestAnimationFrame(() => {
      if (ref.current) {
        ref.current.setAttribute('hidden', 'until-found');
      }
    });
    state.toggle();
  };

  // @ts-ignore https://github.com/facebook/react/pull/24741
  useEvent(ref, 'beforematch', handleBeforeMatch);

  let previousExpanded: boolean | null = null;
  createEffect(() => ({panel: ref.current, expanded: state.isExpanded, ssr: isSSR(), disabled: isDisabled()}), ({panel, expanded, ssr}) => {
    // Cancel any pending RAF to prevent stale updates
    if (raf != null) {
      cancelAnimationFrame(raf);
      raf = null;
    }
    if (panel && !ssr) {
      let active = true;

      if (previousExpanded == null || typeof panel.getAnimations !== 'function') {
        // On initial render (and in tests), set attributes without animation.
        if (expanded) {
          panel.removeAttribute('hidden');
          panel.style.setProperty('--disclosure-panel-width', 'auto');
          panel.style.setProperty('--disclosure-panel-height', 'auto');
        } else {
          panel.setAttribute('hidden', 'until-found');
          panel.style.setProperty('--disclosure-panel-width', '0px');
          panel.style.setProperty('--disclosure-panel-height', '0px');
        }
      } else if (expanded !== previousExpanded) {
        if (expanded) {
          panel.removeAttribute('hidden');

          // Set the width and height as pixels so they can be animated.
          panel.style.setProperty('--disclosure-panel-width', panel.scrollWidth + 'px');
          panel.style.setProperty('--disclosure-panel-height', panel.scrollHeight + 'px');

          Promise.all(panel.getAnimations().map(a => a.finished))
            .then(() => {
              // After the animations complete, switch back to auto so the content can resize.
              if (!active) return;
              panel.style.setProperty('--disclosure-panel-width', 'auto');
              panel.style.setProperty('--disclosure-panel-height', 'auto');
            })
            .catch(() => {});
        } else {
          panel.style.setProperty('--disclosure-panel-width', panel.scrollWidth + 'px');
          panel.style.setProperty('--disclosure-panel-height', panel.scrollHeight + 'px');

          // Force style re-calculation to trigger animations.
          window.getComputedStyle(panel).height;

          // Animate to zero size.
          panel.style.setProperty('--disclosure-panel-width', '0px');
          panel.style.setProperty('--disclosure-panel-height', '0px');

          // Wait for animations to apply the hidden attribute.
          Promise.all(panel.getAnimations().map(a => a.finished))
            .then(() => { if (active) panel.setAttribute('hidden', 'until-found'); })
            .catch(() => {});
        }
      }

      previousExpanded = expanded;
      return () => { active = false; };
    }
  });

  onCleanup(() => {
    if (raf != null) cancelAnimationFrame(raf);
  });

  return {
    buttonProps: {
      get id() { return triggerId(); },
      get 'aria-expanded'() { return state.isExpanded; },
      get 'aria-controls'() { return panelId(); },
      onPress: e => {
        if (!isDisabled() && e.pointerType !== 'keyboard') {
          state.toggle();
        }
      },
      get isDisabled() { return isDisabled(); },
      onPressStart(e) {
        if (e.pointerType === 'keyboard' && !isDisabled()) {
          state.toggle();
        }
      }
    },
    panelProps: {
      get id() { return panelId(); },
      // This can be overridden at the panel element level.
      role: 'group',
      get 'aria-labelledby'() { return triggerId(); },
      get 'aria-hidden'() { return !state.isExpanded; },
      get hidden() { return isSSR() ? !state.isExpanded : undefined; }
    }
  };
}
