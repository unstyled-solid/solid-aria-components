import {render} from '@solidjs/web';
// Extracted from Modal.mdx render example 3; source content and algorithms retained.
import {createSignal} from 'solid-js';
import {MenuTrigger, Menu, MenuItem} from '../ListBox/native/vanilla/solid-Menu';
import {Modal} from '../ListBox/native/vanilla/solid-Modal';
import {Dialog, Heading} from '../ListBox/native/vanilla/solid-Dialog';
import {Button} from '../ListBox/native/vanilla/solid-Button';

function Example() {
  let [isOpen, setOpen] = createSignal(false);

  return (
    <>
      <MenuTrigger children={[() => (<Button>Menu</Button>), () => (<Menu>
          <MenuItem onAction={() => setOpen(true)}>Open dialog…</MenuItem>
        </Menu>)]} />
      <Modal isDismissable isOpen={isOpen()} onOpenChange={setOpen}>
        <Dialog>
          <Heading slot="title">Notice</Heading>
          <p>Click outside or press Escape to close this dialog.</p>
        </Dialog>
      </Modal>
    </>
  );
}

export default Example;

export const title = "Modal: upstream example 3";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Example {...{}} {...props} />, element);
}
