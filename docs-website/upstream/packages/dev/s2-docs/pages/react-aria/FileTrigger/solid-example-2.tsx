import {render} from '@solidjs/web';
import { createSignal, Show, omit, flush } from 'solid-js';
import type { JSX } from '@solidjs/web';
"use client";
import { Pressable, FileTrigger } from "solid-aria-components/FileTrigger";
export const title = "FileTrigger upstream example 2";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <FileTrigger>
  {/*- begin highlight -*/}
  <Pressable>
    {pressableProps => <span {...pressableProps} role="button">Custom trigger</span>}
  </Pressable>
  {/*- end highlight -*/}
</FileTrigger>, element); }
