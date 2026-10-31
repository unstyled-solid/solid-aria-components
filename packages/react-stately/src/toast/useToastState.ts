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

import {Accessor, createMemo, createRenderEffect, createSignal, untrack} from 'solid-js';

type ToastAction = 'add' | 'remove' | 'clear';
export interface ToastStateProps {
  /** The maximum number of toasts to display at a time. */
  maxVisibleToasts?: number;
  /** Function to wrap updates in (i.e. document.startViewTransition()). */
  wrapUpdate?: (fn: () => void, action: ToastAction) => void;
}

export interface ToastOptions {
  /** Handler that is called when the toast is closed, either by the user or after a timeout. */
  onClose?: () => void;
  /** A timeout to automatically close the toast after, in milliseconds. */
  timeout?: number;
}

export interface QueuedToast<T> extends ToastOptions {
  /** The content of the toast. */
  content: T;
  /** A unique key for the toast. */
  key: string;
  /** A timer for the toast, if a timeout was set. */
  timer?: Timer;
}

export interface ToastState<T> {
  /** Adds a new toast to the queue. */
  add(content: T, options?: ToastOptions): string;
  /**
   * Closes a toast.
   */
  close(key: string): void;
  /** Pauses the timers for all visible toasts. */
  pauseAll(): void;
  /** Resumes the timers for all visible toasts. */
  resumeAll(): void;
  /** The visible toasts. */
  visibleToasts: QueuedToast<T>[];
}

/**
 * Provides state management for a toast queue. Toasts display brief, temporary notifications
 * of actions, errors, or other events in an application.
 */
export function useToastState<T>(props: ToastStateProps = {}): ToastState<T> {
  let queue = createMemo(() => new ToastQueue<T>({
    maxVisibleToasts: props.maxVisibleToasts ?? 1,
    wrapUpdate: props.wrapUpdate
  }));
  return useToastQueueState(queue);
}

/**
 * Subscribes to a provided toast queue and provides methods to update it.
 * Pass an accessor when the queue may be replaced. An ordinary queue is fixed.
 */
export function useToastQueue<T>(queue: ToastQueue<T> | Accessor<ToastQueue<T>>): ToastState<T> {
  return useToastQueueState(typeof queue === 'function' ? queue : () => queue);
}

function useToastQueueState<T>(queue: Accessor<ToastQueue<T>>): ToastState<T> {
  let initialQueue = untrack(queue);
  // External queue notifications may arrive synchronously under an owner (for
  // example during owned setup). This internal snapshot bridge deliberately
  // permits those writes; it does not defer or alter the queue transaction.
  let [snapshot, setSnapshot] = createSignal(
    {queue: initialQueue, visibleToasts: initialQueue.visibleToasts},
    {ownedWrite: true}
  );
  // Publish only through the queue subscription, so wrapUpdate retains its
  // source notification ordering. Replacing a queue disposes the old observer.
  createRenderEffect(queue, currentQueue => {
    let publish = () => setSnapshot(previous =>
      previous.queue === currentQueue && previous.visibleToasts === currentQueue.visibleToasts
        ? previous
        : {queue: currentQueue, visibleToasts: currentQueue.visibleToasts}
    );
    let unsubscribe = currentQueue.subscribe(publish);
    publish();
    return unsubscribe;
  });

  return {
    get visibleToasts() { return snapshot().visibleToasts; },
    add: (content, options) => snapshot().queue.add(content, options),
    close: key => snapshot().queue.close(key),
    pauseAll: () => snapshot().queue.pauseAll(),
    resumeAll: () => snapshot().queue.resumeAll()
  };
}

/**
 * A ToastQueue manages the order of toasts.
 */
export class ToastQueue<T> {
  private queue: QueuedToast<T>[] = [];
  private subscriptions: Set<() => void> = new Set();
  private maxVisibleToasts: number;
  private wrapUpdate?: (fn: () => void, action: ToastAction) => void;
  /** The currently visible toasts. */
  visibleToasts: QueuedToast<T>[] = [];

  constructor(options?: ToastStateProps) {
    this.maxVisibleToasts = options?.maxVisibleToasts ?? Infinity;
    this.wrapUpdate = options?.wrapUpdate;
  }

  private runWithWrapUpdate(fn: () => void, action: ToastAction): void {
    if (this.wrapUpdate) {
      this.wrapUpdate(fn, action);
    } else {
      fn();
    }
  }

  /** Subscribes to updates to the visible toasts. */
  subscribe(fn: () => void): () => void {
    this.subscriptions.add(fn);
    return () => this.subscriptions.delete(fn);
  }

  /** Adds a new toast to the queue. */
  add(content: T, options: ToastOptions = {}): string {
    let toastKey = '_' + Math.random().toString(36).slice(2);
    let toast: QueuedToast<T> = {
      ...options,
      content,
      key: toastKey,
      timer: options.timeout ? new Timer(() => this.close(toastKey), options.timeout) : undefined
    };

    this.queue.unshift(toast);

    this.updateVisibleToasts('add');
    return toastKey;
  }

  /**
   * Closes a toast.
   */
  close(key: string): void {
    let index = this.queue.findIndex(t => t.key === key);
    if (index >= 0) {
      this.queue[index].onClose?.();
      this.queue.splice(index, 1);
    }

    this.updateVisibleToasts('remove');
  }

  private updateVisibleToasts(action: ToastAction) {
    this.visibleToasts = this.queue.slice(0, this.maxVisibleToasts);

    this.runWithWrapUpdate(() => {
      for (let fn of this.subscriptions) {
        fn();
      }
    }, action);
  }

  /** Pauses the timers for all visible toasts. */
  pauseAll(): void {
    for (let toast of this.visibleToasts) {
      if (toast.timer) {
        toast.timer.pause();
      }
    }
  }

  /** Resumes the timers for all visible toasts. */
  resumeAll(): void {
    for (let toast of this.visibleToasts) {
      if (toast.timer) {
        toast.timer.resume();
      }
    }
  }

  clear(): void {
    this.queue = [];
    this.updateVisibleToasts('clear');
  }
}

class Timer {
  private timerId: ReturnType<typeof setTimeout> | null = null;
  private startTime: number | null = null;
  private remaining: number;
  private callback: () => void;

  constructor(callback: () => void, delay: number) {
    this.remaining = delay;
    this.callback = callback;
  }

  reset(delay: number): void {
    this.remaining = delay;
    this.resume();
  }

  pause(): void {
    if (this.timerId == null) {
      return;
    }

    clearTimeout(this.timerId);
    this.timerId = null;
    this.remaining -= Date.now() - this.startTime!;
  }

  resume(): void {
    if (this.remaining <= 0) {
      return;
    }

    this.startTime = Date.now();
    this.timerId = setTimeout(() => {
      this.timerId = null;
      this.remaining = 0;
      this.callback();
    }, this.remaining);
  }
}
