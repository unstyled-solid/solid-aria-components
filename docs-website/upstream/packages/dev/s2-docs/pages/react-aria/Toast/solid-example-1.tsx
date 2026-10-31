import { render } from '@solidjs/web';
import { createSignal, Show, omit, flush } from 'solid-js';
import type { JSX } from '@solidjs/web';
"use client";
import { MyToastRegion, queue } from "./vanilla/solid-Toast";
import { Button } from "../Button/vanilla/Button.solid";
function Example(props) {
  return <div>
        <MyToastRegion />
        <Button onPress={() => queue.add({
      title: props.title || 'Files uploaded',
      description: props.description || '3 files uploaded successfully.'
    }, props.timeout ? {
      timeout: props.timeout
    } : undefined)}>
          Show Toast
        </Button>
      </div>;
}
export const title = "Toast upstream example 1";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) {
  return render(() => <Example {...props} />, element);
}