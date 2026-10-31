import {render} from '@solidjs/web';
import {createSignal, Show, omit, flush} from 'solid-js';
import type {JSX} from '@solidjs/web';
"use client";

import { queue } from "./vanilla/solid-Toast";
import { Button } from "../Button/vanilla/Button.solid";
function Example() {
  return <Button
  ///- begin highlight -///
  onPress={() => queue.add({
    title: 'Update available',
    description: 'A new version is ready to install.'
  })}
  ///- end highlight -///
  >
        Check for updates
      </Button>;
}

export const title = "Toast upstream example 3";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props} />, element); }
