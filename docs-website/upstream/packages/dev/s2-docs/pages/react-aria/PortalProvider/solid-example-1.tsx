import {render} from '@solidjs/web';
import type { JSX } from '@solidjs/web';
'use client';
import { Button } from "../Button/vanilla/Button.solid";
import { MyToastRegion } from "./solid-MyToastRegion";
import { UNSAFE_PortalProvider } from 'react-aria/PortalProvider';
import { UNSTABLE_ToastQueue as ToastQueue } from "solid-aria-components/Toast";

// Define the type for your toast content.
interface MyToastContent {
  title: string;
  description?: string;
}

// Create a global ToastQueue.
const queue = new ToastQueue<MyToastContent>();

// See the above Toast docs link for the ToastRegion implementation
function App() {
  let container: HTMLDivElement | undefined;
  return <>
      <UNSAFE_PortalProvider getContainer={() => container}>
        <MyToastRegion queue={queue} />
        <Button onPress={() => queue.add({
        title: 'Toast complete!',
        description: 'Great success.'
      })}>
          Open Toast
        </Button>
      </UNSAFE_PortalProvider>
      <div ref={node => {
      container = node;
    }} style={{
      "height": '110px',
      "width": '200px',
      "overflow": 'auto',
      "display": 'flex',
      "flex-direction": 'column',
      "gap": '20px',
      "padding": '5px'
    }}>
        Toasts are portalled here!
      </div>
    </>;
}
export const title = "PortalProvider upstream example 1";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <App />, element); }
