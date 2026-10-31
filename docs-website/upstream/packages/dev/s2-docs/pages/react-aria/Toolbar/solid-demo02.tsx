import {render} from '@solidjs/web';
// Extracted from Toolbar.mdx render example 2; source content and algorithms retained.
  import {Toolbar} from '../ListBox/native/tailwind/solid-Toolbar';
  import {ToggleButtonGroup} from '../ListBox/native/tailwind/solid-ToggleButtonGroup';
  import {ToggleButton} from '../ListBox/native/tailwind/solid-ToggleButton';
  import {Button} from '../ListBox/native/tailwind/solid-Button';
  import {Select, SelectItem} from '../ListBox/native/tailwind/solid-Select';
  import {Group} from 'solid-aria-components/Group';
  import {Bold, Italic, Underline, ClipboardCopy, Scissors, ClipboardPaste} from './../ListBox/native-icons/solid-icons';

  export default function Demo(props: Record<string, unknown> = {}) {
  return (<Toolbar{...props}>
    <ToggleButtonGroup selectionMode="multiple" aria-label="Style">
      <ToggleButton aria-label="Bold">
        <Bold size={16} />
      </ToggleButton>
      <ToggleButton aria-label="Italic">
        <Italic size={16} />
      </ToggleButton>
      <ToggleButton aria-label="Underline">
        <Underline size={16} />
      </ToggleButton>
    </ToggleButtonGroup>
    <Group aria-label="Clipboard" className="flex gap-1" style={{"flex-direction": 'inherit'}}>
      <Button aria-label="Copy" variant="secondary">
        <ClipboardCopy size={16} />
      </Button>
      <Button aria-label="Cut" variant="secondary">
        <Scissors size={16} />
      </Button>
      <Button aria-label="Paste" variant="secondary">
        <ClipboardPaste size={16} />
      </Button>
    </Group>
    <Select aria-label="Font" defaultSelectedKey="helvetica">
      <SelectItem id="helvetica">Helvetica</SelectItem>
      <SelectItem id="times">Times</SelectItem>
      <SelectItem id="comic-sans">Comic Sans</SelectItem>
    </Select>
  </Toolbar>);
}


export const title = "Toolbar: upstream example 2";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{'aria-label': 'Text formatting'}} {...props} />, element);
}
