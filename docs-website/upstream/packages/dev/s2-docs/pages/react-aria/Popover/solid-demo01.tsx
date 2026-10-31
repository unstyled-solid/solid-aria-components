import {render} from '@solidjs/web';
// Extracted from Popover.mdx render example 1; source content and algorithms retained.
  import {DialogTrigger} from 'solid-aria-components/Popover';
  import {Popover} from '../ListBox/native/vanilla/solid-Popover';
  import {Button} from '../ListBox/native/vanilla/solid-Button';
  import {Switch} from '../ListBox/native/vanilla/solid-Switch';
  import {Settings2} from './../ListBox/native-icons/solid-icons';

  function Example(props: Record<string, unknown>) {
    return (
      <DialogTrigger>
        <Button aria-label="Settings">
          <Settings2 size={20} />
        </Button>
        {/*- begin focus -*/}
        <Popover {...props}{...props}>
          <div style={{display: 'flex', "flex-direction": 'column', gap: "12px"}}>
            <Switch defaultSelected>Wi-Fi</Switch>
            <Switch defaultSelected>Bluetooth</Switch>
            <Switch>Mute</Switch>
          </div>
        </Popover>
        {/*- end focus -*/}
      </DialogTrigger>
    );
  }

export default Example;

export const title = "Popover: upstream example 1";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Example {...{}} {...props} />, element);
}
