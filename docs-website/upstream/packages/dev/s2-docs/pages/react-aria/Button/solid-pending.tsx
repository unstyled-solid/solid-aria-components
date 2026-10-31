import {render} from '@solidjs/web';
import {createSignal, onCleanup} from 'solid-js';
import {Button} from './vanilla/Button.solid';
export const title = 'Pending';
export function PendingButton() {
  const [isPending, setPending] = createSignal(false);
  let timer: ReturnType<typeof setTimeout> | undefined;
  onCleanup(() => clearTimeout(timer));
  return <Button isPending={isPending()} onPress={() => {
    setPending(true);
    timer = setTimeout(() => setPending(false), 5000);
  }}>Save</Button>;
}
export function mount(element: HTMLElement) { return render(() => <PendingButton />, element); }
