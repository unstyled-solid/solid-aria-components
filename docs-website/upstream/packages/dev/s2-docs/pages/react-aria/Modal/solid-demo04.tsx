import {render} from '@solidjs/web';
import type {JSX} from '@solidjs/web';
// Extracted from Modal.mdx render example 4; source content and algorithms retained.
import {Pressable, DialogTrigger} from 'solid-aria-components/Modal';
import {Modal} from '../ListBox/native/vanilla/solid-Modal';
import {Dialog, Heading} from '../ListBox/native/vanilla/solid-Dialog';
import {Button} from '../ListBox/native/vanilla/solid-Button';

export default function Demo(props: Record<string, unknown> = {}) {
  return (<DialogTrigger>
  {/*- begin highlight -*/}
  <Pressable>
    {forwardedProps => (<span {...forwardedProps} ref={forwardedProps.ref as JSX.Ref<HTMLSpanElement>} tabindex={forwardedProps.tabIndex} role="button">Custom trigger</span>)}
  </Pressable>
  {/*- end highlight -*/}
  <Modal>
    <Dialog>
      <Heading slot="title">Dialog</Heading>
      <p>This dialog was triggered by a custom button.</p>
      <Button slot="close">Close</Button>
    </Dialog>
  </Modal>
</DialogTrigger>);
}


export const title = "Modal: upstream example 4";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{}} {...props} />, element);
}
