import {render} from '@solidjs/web';
import {createSignal, Show, omit, flush} from 'solid-js';
import type {JSX} from '@solidjs/web';
"use client";

import { queue } from "./tailwind/solid-Toast";
import { Button } from "../Button/tailwind/Button.solid";
function Example() {
  return <Button
  ///- begin highlight -///
  onPress={() => queue.add({
    title: 'File has been saved!'
  }, {
    timeout: 5000
  })}
  ///- end highlight -///
  >
        Save file
      </Button>;
}

export const title = "Toast upstream example 6";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props} />, element); }
