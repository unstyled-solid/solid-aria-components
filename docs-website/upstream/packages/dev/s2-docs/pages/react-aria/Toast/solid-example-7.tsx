import {render} from '@solidjs/web';
import {createSignal, Show, omit, flush} from 'solid-js';
import type {JSX} from '@solidjs/web';
"use client";

import { queue } from "./vanilla/solid-Toast";
import { Button } from "../Button/vanilla/Button.solid";
function Example() {
  let [toastKey, setToastKey] = createSignal<string | null>(null);
  return <Button
  ///- begin highlight -///
  onPress={() => {
    if (!toastKey()) {
      setToastKey(queue.add({
        title: 'Processing...'
      }, {
        onClose: () => setToastKey(null)
      }));
    } else {
      queue.close(toastKey());
    }
  }}
  ///- end highlight -///
  >
        {toastKey() ? 'Cancel' : 'Process'}
      </Button>;
}

export const title = "Toast upstream example 7";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props} />, element); }
