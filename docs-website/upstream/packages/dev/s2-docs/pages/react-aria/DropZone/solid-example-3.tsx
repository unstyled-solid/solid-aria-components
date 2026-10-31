import {render} from '@solidjs/web';
import {createSignal, Show} from 'solid-js';
"use client";

import { DropZone, Text } from "./vanilla/solid-DropZone";
import { FileTrigger } from "solid-aria-components";
import { Button } from "../Button/vanilla/Button.solid";
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
  async function handleFiles(files: FileList | null) {
    let file = files && [...files].find(f => f.type.startsWith('image/'));
    if (file) {
      let url = URL.createObjectURL(file);
      setContent({url, name: file.name});
    }
  }
  return <DropZone getDropOperation={types => ['text/plain', 'image/jpeg', 'image/png', 'image/gif'].some(t => types.has(t)) ? 'copy' : 'cancel'} onDrop={async event => {
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
      <div style={{
      "display": 'flex',
      "flex-direction": 'column',
      "align-items": 'center',
      "gap": "8px"
    }}>
        <Text slot="label">
          <Show when={image()} fallback={text() || "Drop files here, or click Browse"}>
            {file => <img src={file().url} alt={file().name} style={{
              "max-height": "100px",
              "max-width": '100%'
            }} />}
          </Show>
        </Text>
        {/*- begin highlight -*/}
        <FileTrigger acceptedFileTypes={['image/*']} onSelect={handleFiles}>
          <Button>Browse</Button>
        </FileTrigger>
        {/*- end highlight -*/}
      </div>
    </DropZone>;
}

export const title = "DropZone upstream example 3";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props} />, element); }
