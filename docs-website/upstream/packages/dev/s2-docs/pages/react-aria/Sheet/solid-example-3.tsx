import {render} from '@solidjs/web';
import {createSignal, Show, omit, flush} from 'solid-js';
import type {JSX} from '@solidjs/web';
"use client";

import { SheetTrigger } from "solid-aria-components/Sheet";
import { Sheet, Heading } from "./vanilla/solid-Sheet";
import { Button } from "../Button/vanilla/Button.solid";
import { Home, Compass, Library, Settings, LogOut } from "./solid-icons";
function Example() {
  let items = [{
    label: 'Home',
    icon: <Home size={20} />
  }, {
    label: 'Explore',
    icon: <Compass size={20} />
  }, {
    label: 'Library',
    icon: <Library size={20} />
  }, {
    label: 'Settings',
    icon: <Settings size={20} />
  }];
  return <SheetTrigger>
      <Button variant="secondary">Open menu</Button>
      {/*- begin highlight -*/}
      <Sheet position="start">
      {/*- end highlight -*/}
        <div style={{
        "display": 'flex',
        "flex-direction": 'column',
        "height": '100%',
        "align-items": 'start'
      }}>
          <Heading slot="title" style={{
          "padding": '0 var(--spacing-3)',
          "margin-bottom": "16px"
        }}>Acme Music</Heading>
          <nav style={{
          "display": 'flex',
          "flex-direction": 'column',
          "gap": "4px",
          "flex-grow": 1,
          "width": '100%'
        }}>
            {items.map(item => <Button key={item.label} slot="close" variant="quiet" style={{
            "justify-content": 'start',
            "gap": "12px"
          }}>
                {item.icon}
                <span>{item.label}</span>
              </Button>)}
          </nav>
          <Button slot="close" variant="secondary" style={{
          "gap": "12px",
          "margin-top": 'auto'
        }}>
            <LogOut size={20} />
            <span>Sign out</span>
          </Button>
        </div>
      </Sheet>
    </SheetTrigger>;
}

export const title = "Sheet upstream example 3";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props} />, element); }
