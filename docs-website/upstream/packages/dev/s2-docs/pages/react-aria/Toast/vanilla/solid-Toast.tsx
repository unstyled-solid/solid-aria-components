import {createSignal, Show, omit, flush} from 'solid-js';
import type {JSX} from '@solidjs/web';
'use client';

import { UNSTABLE_ToastRegion as ToastRegion, UNSTABLE_Toast as Toast, UNSTABLE_ToastQueue as ToastQueue, UNSTABLE_ToastContent as ToastContent, type ToastProps, Text } from "solid-aria-components/Toast";
import { Button } from "../../Button/vanilla/Button.solid";
import { X } from "../solid-icons";
import './Toast.css';
// Define the type for your toast content. This interface defines the properties of your toast content, affecting what you
// pass to the queue calls as arguments.
interface MyToastContent {
  title: string;
  description?: string;
}

// This is a global toast queue, to be imported and called where ever you want to queue a toast via queue.add().
export const queue = new ToastQueue<MyToastContent>({
  // Wrap state updates in a CSS view transition.
  wrapUpdate(fn) {
    if ('startViewTransition' in document) {
      document.startViewTransition(() => {
        fn(), flush();
      });
    } else {
      fn();
    }
  }
});
export function MyToastRegion() {
  return (
    // The ToastRegion should be rendered at the root of your app.
    <ToastRegion queue={queue}>
      {props => <MyToast toast={props.toast} style={{
        viewTransitionName: props.toast.key
      } as JSX.CSSProperties}>
          <ToastContent>
            <Text slot="title">{props.toast.content.title}</Text>
            {props.toast.content.description && <Text slot="description">{props.toast.content.description}</Text>}
          </ToastContent>
          <Button slot="close" aria-label="Close" variant="quiet">
            <X size={16} />
          </Button>
        </MyToast>}
    </ToastRegion>
  );
}
export function MyToast(props: ToastProps<MyToastContent>) {
  return <Toast {...props} />;
}
