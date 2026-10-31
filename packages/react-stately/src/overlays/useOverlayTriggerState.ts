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

import {createSignal, untrack} from 'solid-js';
import {useControlledState} from '../utils/useControlledState';

export interface OverlayTriggerProps {
  /** Whether the overlay is open by default (controlled). */
  isOpen?: boolean;
  /** Whether the overlay is open by default (uncontrolled). */
  defaultOpen?: boolean;
  /** Handler that is called when the overlay's open state changes. */
  onOpenChange?: (isOpen: boolean) => void;
}

interface Point {
  x: number;
  y: number;
}

export interface OverlayTriggerState {
  /** Whether the overlay is currently open. */
  readonly isOpen: boolean;
  /** Sets whether the overlay is open. */
  setOpen(isOpen: boolean): void;
  /** Opens the overlay. */
  open(): void;
  /** Closes the overlay. */
  close(): void;
  /** Toggles the overlay's visibility. */
  toggle(): void;
  /** The cursor position when the overlay was triggered, relative to the window viewport. */
  readonly point: Point | null;
  /** Sets the cursor position relative to the window viewport. */
  setPoint(point: Point): void;
}

/**
 * Manages state for an overlay trigger. Tracks whether the overlay is open, and provides
 * methods to toggle this state.
 */
export function useOverlayTriggerState(props: OverlayTriggerProps): OverlayTriggerState {
  let [isOpen, setOpen] = useControlledState<boolean>(
    () => props.isOpen,
    untrack(() => props.defaultOpen || false),
    value => props.onOpenChange?.(value)
  );
  let [point, setPoint] = createSignal<Point | null>(null);

  const open = () => {
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
  };

  const toggle = () => {
    // Match the source render snapshot. Several composed handlers can propose
    // the same toggle before Solid commits; a functional updater would instead
    // invert the pending proposal again and cancel the activation.
    setOpen(!isOpen());
  };

  return {
    get isOpen() { return isOpen(); },
    setOpen,
    open,
    close,
    toggle,
    get point() { return point(); },
    setPoint
  };
}
