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

import {mergeProps} from 'react-aria/mergeProps';
import {createContext, useContext} from 'solid-js';
import type {JSX} from '@solidjs/web';

interface SlotProps {
  slot?: string;
}

type Slots = {[slot: string]: object};
let SlotContext = createContext<Slots | null>(null);

function liveView<T extends object>(read: () => T): T {
  return new Proxy({} as T, {
    ownKeys: () => Reflect.ownKeys(read()),
    has: (_, key) => key in read(),
    get: (_, key) => Reflect.get(read(), key),
    getOwnPropertyDescriptor: (_, key) => key in read()
      ? {enumerable: true, configurable: true, get: () => Reflect.get(read(), key)}
      : undefined
  });
}

export function useSlotProps<T>(props: T & {id?: string}, defaultSlot?: string): T {
  let slots = useContext(SlotContext);
  let empty = {};
  let slotProps = liveView(() => slots?.[(props as SlotProps).slot || defaultSlot || ''] || empty);

  // oxlint-disable-next-line react/react-compiler
  return mergeProps(props, mergeProps(slotProps, {get id() { return props.id; }})) as T;
}

export function cssModuleToSlots(cssModule: {[cssmodule: string]: string}): {
  [slot: string]: {UNSAFE_className: string};
} {
  return Object.keys(cssModule).reduce((acc, slot) => {
    acc[slot] = {UNSAFE_className: cssModule[slot]};
    return acc;
  }, {} as {[slot: string]: {UNSAFE_className: string}});
}

export function SlotProvider(props: {
  slots?: {[slot: string]: object};
  children?: JSX.Element;
}): JSX.Element {
  const emptyObj: Slots = {};
  let parentSlots = useContext(SlotContext) || emptyObj;
  let merged = new Map<string, object>();
  let value: Slots = new Proxy(emptyObj, {
    ownKeys: () => [...new Set([...Object.keys(parentSlots), ...Object.keys(props.slots || emptyObj)])],
    has: (_, key) => key in parentSlots || key in (props.slots || emptyObj),
    get: (_, key) => {
      if (typeof key !== 'string') return undefined;
      if (!merged.has(key)) {
        merged.set(key, mergeProps(
          liveView(() => parentSlots[key] || emptyObj),
          liveView(() => props.slots?.[key] || emptyObj)
        ));
      }
      return merged.get(key);
    },
    getOwnPropertyDescriptor: (_, key) => key in parentSlots || key in (props.slots || emptyObj)
      ? {enumerable: true, configurable: true, get: () => value[key as string]}
      : undefined
  });
  return <SlotContext value={value}>{props.children}</SlotContext>;
}

export function ClearSlots(props: {children?: JSX.Element}): JSX.Element {
  const emptyObj = {};
  return <SlotContext value={emptyObj}>{props.children}</SlotContext>;
}
