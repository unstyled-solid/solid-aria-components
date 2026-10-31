import {render} from '@solidjs/web';
import type { JSX } from '@solidjs/web';
'use client';
import { FocusScope, useFocusManager } from 'react-aria/FocusScope';
function Toolbar(props: {children?: JSX.Element}) {
  return <div role="toolbar">
      <FocusScope>
        {props.children}
      </FocusScope>
    </div>;
}
function ToolbarButton(props: {children?: JSX.Element}) {
  let focusManager = useFocusManager();
  let onKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowRight':
        focusManager?.focusNext({
          wrap: true
        });
        break;
      case 'ArrowLeft':
        focusManager?.focusPrevious({
          wrap: true
        });
        break;
    }
  };
  return <button onKeyDown={onKeyDown}>
      {props.children}
    </button>;
}
export const title = "FocusScope upstream example 2";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Toolbar>
  <ToolbarButton>Cut</ToolbarButton>
  <ToolbarButton>Copy</ToolbarButton>
  <ToolbarButton>Paste</ToolbarButton>
</Toolbar>, element); }
