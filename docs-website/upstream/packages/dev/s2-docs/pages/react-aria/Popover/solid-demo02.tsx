import {render} from '@solidjs/web';
// Extracted from Popover.mdx render example 2; source content and algorithms retained.
  import {DialogTrigger} from 'solid-aria-components/Popover';
  import {Popover} from '../ListBox/native/tailwind/solid-Popover';
  import {Button} from '../ListBox/native/tailwind/solid-Button';
  import {Switch} from '../ListBox/native/tailwind/solid-Switch';
  import {Settings2} from './../ListBox/native-icons/solid-icons';

  function Example(props: Record<string, unknown>) {
    return (
      <DialogTrigger>
        <Button aria-label="Settings" variant="secondary">
          <Settings2 size={20} />
        </Button>
        {/*- begin focus -*/}
        <Popover
          {...props}
          className="flex flex-col gap-2 p-4"
          showArrow
          {...props}>
          <Switch defaultSelected>Wi-Fi</Switch>
          <Switch defaultSelected>Bluetooth</Switch>
          <Switch>Mute</Switch>
        </Popover>
        {/*- end focus -*/}
      </DialogTrigger>
    );
  }

export default Example;

export const title = "Popover: upstream example 2";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Example {...{}} {...props} />, element);
}
