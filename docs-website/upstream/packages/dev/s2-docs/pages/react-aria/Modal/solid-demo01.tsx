import {render} from '@solidjs/web';
// Extracted from Modal.mdx render example 1; source content and algorithms retained.
  import {DialogTrigger} from 'solid-aria-components/Modal';
  import {Modal} from '../ListBox/native/vanilla/solid-Modal';
  import {Dialog, Heading} from '../ListBox/native/vanilla/solid-Dialog';
  import {Form} from '../ListBox/native/vanilla/solid-Form';
  import {TextField} from '../ListBox/native/vanilla/solid-TextField';
  import {Button} from '../ListBox/native/vanilla/solid-Button';

  function Example(props: Record<string, unknown>) {
    return (
      <DialogTrigger>
        <Button>Sign up…</Button>
        <Modal {...props}{...props}>
          <Dialog>
            <Heading slot="title">Subscribe to our newsletter</Heading>
            <p>Enter your information to subscribe to our newsletter and receive updates about new features and announcements.</p>
            <Form>
              <TextField autoFocus label="Name" placeholder="Enter your full name" />
              <TextField label="Email" placeholder="Enter your email" />
              <div style={{display: 'flex', gap: "8px", "align-self": 'end'}}>
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

export const title = "Modal: upstream example 1";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Example {...{}} {...props} />, element);
}
