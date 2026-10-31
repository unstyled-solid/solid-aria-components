import {render} from '@solidjs/web';
import {createSignal, Show, omit, flush} from 'solid-js';
import type {JSX} from '@solidjs/web';
"use client";

import { SheetTrigger } from "solid-aria-components/Sheet";
import { Sheet, Heading } from "./vanilla/solid-Sheet";
import { Button } from "../Button/vanilla/Button.solid";
function Example() {
  return <SheetTrigger>
      <Button>Settings</Button>
      {/* By default, Sheet.tsx applies a fade transition to the backdrop.
          This example adds a custom transform animation to the sheet. */}
      <style>{`
      @keyframes sheet-transform {
        from {
          transform-origin: top right;
          transform: skew(10deg) scale(0.8);
        }

        to {
          transform: skew(0deg) scale(1);
        }
      }`}</style>
      {/*- begin highlight -*/}
      <Sheet swipeAnimation="sheet-transform">
      {/*- end highlight -*/}
        <Heading slot="title">Sheet</Heading>
        <p style={{
        "margin-top": "0px"
      }}>This sheet has a custom swipe animation.</p>
        <div style={{
        "height": "300px",
        "width": '100%',
        "background": 'var(--gray-200)',
        "border-radius": "16px",
        "margin-bottom": "16px"
      }} />
        <Button slot="close">Close</Button>
      </Sheet>
    </SheetTrigger>;
}

export const title = "Sheet upstream example 5";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props} />, element); }
