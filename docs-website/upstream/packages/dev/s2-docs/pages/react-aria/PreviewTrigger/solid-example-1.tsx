import {render} from '@solidjs/web';
import {createSignal, Show, omit, flush} from 'solid-js';
import type {JSX} from '@solidjs/web';
"use client";

import { PreviewTrigger } from "solid-aria-components/PreviewTrigger";
import { Popover } from "../ListBox/native/vanilla/solid-Popover";
import { Link } from "../Link/vanilla/Link.solid";
import { Button } from "../Button/vanilla/Button.solid";
function ProfilePreview(popoverProps) {
  return <PreviewTrigger>
        <Link href={popoverProps.href}>@{popoverProps.handle}</Link>
        <Popover style={{
      "width": "280px"
    }} {...popoverProps}>
          <div style={{
        "display": 'flex',
        "gap": "8px",
        "align-items": 'center'
      }}>
            <img alt="" src={popoverProps.avatar} style={{
          "width": "40px",
          "height": "40px",
          "border-radius": '50%'
        }} />
            <div style={{
          "min-width": "0px"
        }}>
              <div style={{
            "font-weight": 600,
            "font-size": 'var(--font-size)'
          }}>{popoverProps.name}</div>
              <div style={{
            "font-size": 'var(--font-size-sm)'
          }}>@{popoverProps.handle}</div>
            </div>
            <Button style={{
          "margin-left": 'auto'
        }} variant="secondary">Follow</Button>
          </div>
          <div style={{
        "font-size": 'var(--font-size)',
        "margin-top": "12px"
      }}>{popoverProps.bio}</div>
        </Popover>
      </PreviewTrigger>;
}
function Example(props) {
  return <p style={{
    "max-width": "480px"
  }}>
        Just shipped a new release with help from{' '}
        <ProfilePreview handle="mayachen" name="Maya Chen" bio="UI engineer, accessibility advocate, and component library enthusiast." avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" href="#" {...props} />
        {' '}and{' '}
        <ProfilePreview handle="cwebb" name="Charles Webb" bio="Design systems, docs, and developer experience." avatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" href="#" {...props} />
        !
      </p>;
}

export const title = "PreviewTrigger upstream example 1";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props} />, element); }
