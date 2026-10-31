import {render} from '@solidjs/web';
// Extracted from Popover.mdx render example 4; source content and algorithms retained.
import {createSignal} from 'solid-js';
import {createSignal as createRefSignal} from 'solid-js';
import {Popover} from '../ListBox/native/vanilla/solid-Popover';
import {Button} from '../ListBox/native/vanilla/solid-Button';

function Example() {
  let [isOpen, setOpen] = createSignal(false);
  let [triggerElement, setTriggerElement] = createRefSignal<HTMLSpanElement | null>(null);
  let triggerRef = {get current() { return triggerElement(); }};

  return (
    <div>
      <Button onPress={() => setOpen(true)}>Trigger</Button>
      <span ref={setTriggerElement} style={{"padding-left": "12px"}}>Popover will be positioned relative to me</span>
      <Popover
        style={{padding: "16px"}}
        /*- begin highlight -*/
        triggerRef={triggerRef}
        isOpen={isOpen()}
        onOpenChange={setOpen}>
        {/*- end highlight -*/}
        I'm over here!
      </Popover>
    </div>
  );
}

export default Example;

export const title = "Popover: upstream example 4";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Example {...{}} {...props} />, element);
}
