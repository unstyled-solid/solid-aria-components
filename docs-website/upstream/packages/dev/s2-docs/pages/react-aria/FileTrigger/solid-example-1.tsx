import {render} from '@solidjs/web';
import {createSignal, Show, omit, flush} from 'solid-js';
import type {JSX} from '@solidjs/web';
"use client";

import { FileTrigger } from "solid-aria-components/FileTrigger";
import { Button } from "../Button/vanilla/Button.solid";
function Example(props) {
  let [files, setFiles] = createSignal<string[]>([]);
  return <>
      {/*- begin focus -*/}
      <FileTrigger {...props}
    /* PROPS */ onSelect={e => {
      let files = e ? Array.from(e) : [];
      let filenames = files.map(file => file.name);
      setFiles(filenames);
    }}>
        <Button>Select a file</Button>
      </FileTrigger>
      {/*- end focus -*/}
      {files().join(', ')}
    </>;
}

export const title = "FileTrigger upstream example 1";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props} />, element); }
