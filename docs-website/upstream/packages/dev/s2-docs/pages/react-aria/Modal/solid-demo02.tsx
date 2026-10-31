import {render} from '@solidjs/web';
// Extracted from Modal.mdx render example 2; source content and algorithms retained.
  import {DialogTrigger} from 'solid-aria-components/Modal';
  import {Modal} from '../ListBox/native/tailwind/solid-Modal';
  import {Dialog, Heading} from '../ListBox/native/tailwind/solid-Dialog';
  import {Form} from '../ListBox/native/tailwind/solid-Form';
  import {TextField} from '../ListBox/native/tailwind/solid-TextField';
  import {Button} from '../ListBox/native/tailwind/solid-Button';

  function Example(props: Record<string, unknown>) {
    return (
      <DialogTrigger>
        <Button>Sign up…</Button>
        <Modal {...props}{...props}>
          <Dialog>
            <Heading slot="title" class="text-xl mt-0">Subscribe to our newsletter</Heading>
            <p class="text-sm">Enter your information to subscribe to our newsletter and receive updates about new features and announcements.</p>
            <Form>
              <TextField autoFocus label="Name" placeholder="Enter your full name" />
              <TextField label="Email" placeholder="Enter your email" />
              <div class="flex gap-2 self-end">
                <Button slot="close" variant="secondary">Cancel</Button>
                <Button slot="close">Subscribe</Button>
              </div>
            </Form>
          </Dialog>
        </Modal>
      </DialogTrigger>
    );
  }

export default Example;

export const title = "Modal: upstream example 2";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Example {...{}} {...props} />, element);
}
