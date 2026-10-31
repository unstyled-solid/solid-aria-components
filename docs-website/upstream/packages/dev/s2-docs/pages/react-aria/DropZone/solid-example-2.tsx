import {render} from '@solidjs/web';
import {createSignal, Show} from 'solid-js';
"use client";

import { DropZone, Text } from "./tailwind/solid-DropZone";
function Example() {
  let [content, setContent] = createSignal<string | {url: string, name: string} | null>(null);
  const image = () => {
    const value = content();
    return typeof value === 'object' ? value : null;
  };
  const text = () => {
    const value = content();
    return typeof value === 'string' ? value : null;
  };
  return <DropZone
  // Determine whether dragged content should be accepted.
  getDropOperation={types => ['text/plain', 'image/jpeg', 'image/png', 'image/gif'].some(t => types.has(t)) ? 'copy' : 'cancel'} onDrop={async event => {
    // Find the first accepted item.
    let item = event.items.find(item => item.kind === 'text' && item.types.has('text/plain') || item.kind === 'file' && item.type.startsWith('image/'));
    if (item?.kind === 'text') {
      let text = await item.getText('text/plain');
      setContent(text);
    } else if (item?.kind === 'file') {
      let file = await item.getFile();
      let url = URL.createObjectURL(file);
      setContent({url, name: item.name});
    }
  }}>
        <Text slot="label">
          <Show when={image()} fallback={text() || "Drop or paste text or images here"}>
            {file => <img src={file().url} alt={file().name} style={{
              "max-height": "100px",
              "max-width": '100%'
            }} />}
          </Show>
        </Text>
      </DropZone>;
}

export const title = "DropZone upstream example 2";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props} />, element); }
