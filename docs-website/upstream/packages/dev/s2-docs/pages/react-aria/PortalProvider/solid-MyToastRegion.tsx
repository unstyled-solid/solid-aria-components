import {createSignal, Show, omit, flush} from 'solid-js';
import type {JSX} from '@solidjs/web';
'use client';

import { UNSTABLE_ToastRegion as ToastRegion, UNSTABLE_Toast as Toast, UNSTABLE_ToastQueue as ToastQueue, UNSTABLE_ToastContent as ToastContent, Button, Text } from "solid-aria-components";

// Define the type for your toast content.
interface MyToastContent {
  title: string;
  description?: string;
}
export function MyToastRegion(props: {
  queue: ToastQueue<MyToastContent>;
}) {
  return <ToastRegion queue={props.queue}>
      {props => <Toast toast={props.toast}>
          <ToastContent>
            <Text slot="title">{props.toast.content.title}</Text>
            <Text slot="description">{props.toast.content.description}</Text>
          </ToastContent>
          <Button slot="close">x</Button>
        </Toast>}
    </ToastRegion>;
}
