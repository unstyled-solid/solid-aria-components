import {render} from '@solidjs/web';
import {createSignal, Show} from 'solid-js';
'use client';

import { FocusScope } from 'react-aria/FocusScope';
function Example() {
  let [isOpen, setOpen] = createSignal(false);
  return <>
      <button onClick={() => setOpen(true)}>Open</button>
      <Show when={isOpen()}> <FocusScope contain restoreFocus autoFocus>
          <label for="first-input">First Input</label>
          <input id="first-input" />
          <label for="second-input">Second Input</label>
          <input id="second-input" />
          <button onClick={() => setOpen(false)}>Close</button>
        </FocusScope></Show></>;
}

export const title = "FocusScope upstream example 1";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props} />, element); }
