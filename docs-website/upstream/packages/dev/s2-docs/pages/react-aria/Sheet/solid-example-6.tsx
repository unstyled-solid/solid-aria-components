import {render} from '@solidjs/web';
import {createSignal, Show, omit, flush} from 'solid-js';
import type {JSX} from '@solidjs/web';
"use client";

import { SheetTrigger } from "solid-aria-components/Sheet";
import { Sheet, Heading } from "./vanilla/solid-Sheet";
import { Button } from "../Button/vanilla/Button.solid";
import { Form } from "../ListBox/native/vanilla/solid-Form";
import { TextField } from "../TextField/vanilla/TextField.solid";
import { RadioGroup, Radio } from "./vanilla/solid-RadioGroup";
import { CheckboxGroup } from "../ListBox/native/vanilla/solid-CheckboxGroup";
import { Checkbox } from "../Checkbox/vanilla/Checkbox.solid";
import { ChevronRight } from "./solid-icons";
function Example() {
  return <SheetTrigger>
      <Button>Settings</Button>
      <Sheet style={{
      "height": "550px"
    }}>
        <Heading slot="title">Settings</Heading>
        <p style={{
        "margin-top": "0px",
        "margin-bottom": "32px"
      }}>Manage your account and preferences.</p>
        <Form>
          <TextField label="Homepage" defaultValue="react-aria.adobe.com" />
          <RadioGroup label="Theme" defaultValue="auto">
            <Radio value="auto">Auto</Radio>
            <Radio value="light">Light</Radio>
            <Radio value="dark">Dark</Radio>
          </RadioGroup>
          {/*- begin highlight -*/}
          <SheetTrigger>
            <Button variant="secondary">
              <span>Account</span>
              <ChevronRight size={18} />
            </Button>
            <Sheet style={{
            "height": "550px"
          }}>
            {/*- end highlight -*/}
              <Heading slot="title">Account</Heading>
              <p style={{
              "margin-top": "0px",
              "margin-bottom": "32px"
            }}>Swipe this sheet away to return to Settings.</p>
              <Form>
                <TextField label="Name" defaultValue="Devon Govett" />
                <TextField label="Username" defaultValue="@devongovett" />
                <TextField label="Email" defaultValue="devon@example.com" />
                <div style={{
                "display": 'flex',
                "justify-content": 'space-between'
              }}>
                  <Button slot="close">Save</Button>
                  <SheetTrigger>
                    <Button variant="secondary">
                      <span>Advanced</span>
                      <ChevronRight size={18} />
                    </Button>
                    <Sheet style={{
                    "height": "550px"
                  }}>
                      <Heading slot="title">Advanced</Heading>
                      <p style={{
                      "margin-top": "0px",
                      "margin-bottom": "32px"
                    }}>Swipe this sheet away to return to Account.</p>
                      <Form>
                        <CheckboxGroup label="Notification settings" defaultValue={['account', 'dms']}>
                          <Checkbox value="account">Account activity</Checkbox>
                          <Checkbox value="mentions">Mentions</Checkbox>
                          <Checkbox value="dms">Direct message</Checkbox>
                          <Checkbox value="marketing">Marketing emails</Checkbox>
                        </CheckboxGroup>
                        <Button slot="close">Save</Button>
                      </Form>
                    </Sheet>
                  </SheetTrigger>
                </div>
              </Form>
            </Sheet>
          </SheetTrigger>
        </Form>
      </Sheet>
    </SheetTrigger>;
}

export const title = "Sheet upstream example 6";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props} />, element); }
