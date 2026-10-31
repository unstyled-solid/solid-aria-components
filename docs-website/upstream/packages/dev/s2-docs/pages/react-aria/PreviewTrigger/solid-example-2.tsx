import {render} from '@solidjs/web';
import {createSignal, Show, omit, flush} from 'solid-js';
import type {JSX} from '@solidjs/web';
"use client";

import { PreviewTrigger } from "solid-aria-components/PreviewTrigger";
import { Popover } from "../ListBox/native/vanilla/solid-Popover";
import { Link } from "../Link/vanilla/Link.solid";
import { Button } from "../Button/vanilla/Button.solid";
function IssuePreview(props) {
  return /*- begin highlight -*/<PreviewTrigger {...props} /* PROPS */>
      {/*- end highlight -*/}
      <Link href={props.href}>#{props.number}</Link>
      <Popover style={{
      "width": "280px"
    }}>
        <div style={{
        "font-weight": 600,
        "font-size": 'var(--font-size)'
      }}>{props.title}</div>
        <div style={{
        "font-size": 'var(--font-size-sm)',
        "margin-top": "4px"
      }}>#{props.number} · {props.status}</div>
        <div style={{
        "font-size": 'var(--font-size-sm)',
        "margin-top": "4px"
      }}>Opened by {props.author}</div>
        <Button style={{
        "margin-top": "12px"
      }} variant="secondary">View issue</Button>
      </Popover>
    </PreviewTrigger>;
}
function Example(props) {
  return <p style={{
    "max-width": "480px"
  }}>
      {'Merged fixes for '}
      {/*- begin highlight -*/}
      <IssuePreview {...props} /* PROPS */ number={1234} title="Add PreviewTrigger component" status="Open" author="mayachen" href="#" />
      {/*- end highlight -*/}
      {' and '}
      <IssuePreview {...props} /* PROPS */ number={5678} title="Improve Popover safe area behavior" status="Closed" author="cwebb" href="#" />
      .
    </p>;
}

export const title = "PreviewTrigger upstream example 2";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props} />, element); }
