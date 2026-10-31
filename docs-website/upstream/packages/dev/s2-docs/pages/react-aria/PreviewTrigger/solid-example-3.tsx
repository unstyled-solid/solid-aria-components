import {render} from '@solidjs/web';
import { createSignal, Show, omit, flush } from 'solid-js';
import type { JSX } from '@solidjs/web';
"use client";
import { PreviewTrigger } from "solid-aria-components/PreviewTrigger";
import { Focusable } from "solid-aria-components/Tooltip";
import { Popover } from "../ListBox/native/vanilla/solid-Popover";
export const title = "PreviewTrigger upstream example 3";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <PreviewTrigger>
  {/*- begin highlight -*/}
  <Focusable>
    {focusableProps => <span {...focusableProps} role="link">Custom trigger</span>}
  </Focusable>
  {/*- end highlight -*/}
  <Popover style={{
    "padding": "16px"
  }}>
    This preview was triggered by a custom element.
  </Popover>
</PreviewTrigger>, element); }
