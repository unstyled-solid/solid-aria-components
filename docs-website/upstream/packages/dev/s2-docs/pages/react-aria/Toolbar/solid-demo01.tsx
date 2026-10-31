import {render} from '@solidjs/web';
// Extracted from Toolbar.mdx render example 1; source content and algorithms retained.
  import {Toolbar} from '../ListBox/native/vanilla/solid-Toolbar';
  import {ToggleButtonGroup} from '../ListBox/native/vanilla/solid-ToggleButtonGroup';
  import {ToggleButton} from '../ListBox/native/vanilla/solid-ToggleButton';
  import {Button} from '../ListBox/native/vanilla/solid-Button';
  import {Select, SelectItem} from '../ListBox/native/vanilla/solid-Select';
  import {Separator} from '../ListBox/native/vanilla/solid-Separator';
  import {Group} from 'solid-aria-components/Group';
  import {Bold, Italic, Underline, ClipboardCopy, Scissors, ClipboardPaste} from './../ListBox/native-icons/solid-icons';

  export default function Demo(props: Record<string, unknown> = {}) {
  return (<Toolbar{...props}>
    <ToggleButtonGroup aria-label="Style">
      <ToggleButton id="bold" aria-label="Bold">
        <Bold size={16} />
      </ToggleButton>
      <ToggleButton id="italic" aria-label="Italic">
        <Italic size={16} />
      </ToggleButton>
      <ToggleButton id="underline" aria-label="Underline">
        <Underline size={16} />
      </ToggleButton>
    </ToggleButtonGroup>
    <Separator />
    <Group aria-label="Clipboard">
      <Button aria-label="Copy">
        <ClipboardCopy size={16} />
      </Button>
      <Button aria-label="Cut">
        <Scissors size={16} />
      </Button>
      <Button aria-label="Paste">
        <ClipboardPaste size={16} />
      </Button>
    </Group>
    <Separator />
    <Select aria-label="Font" defaultSelectedKey="helvetica">
      <SelectItem id="helvetica">Helvetica</SelectItem>
      <SelectItem id="times">Times</SelectItem>
      <SelectItem id="comic-sans">Comic Sans</SelectItem>
    </Select>
  </Toolbar>);
}


export const title = "Toolbar: upstream example 1";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{'aria-label': 'Text formatting'}} {...props} />, element);
}
