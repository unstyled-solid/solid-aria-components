import { render } from '@solidjs/web';
import { CommandPalette } from './vanilla/CommandPalette.solid';
import { MenuItem, Text } from './vanilla/Menu.solid';
import { Button } from './vanilla/Button.solid';
import { FilePlus2, FolderPlus, User, UserPen, CircleDotDashed, ChartPie, Tag } from './native-icons/solid-icons';
import { DialogTrigger } from 'solid-aria-components';
import { createSignal } from 'solid-js';
function Example(props: Record<string, unknown>) {
    let [isOpen, setOpen] = createSignal(false);
    return (<DialogTrigger isOpen={isOpen()} onOpenChange={setOpen}>
      <Button>Open Command Palette <kbd>⌘ J</kbd></Button>
      {/*- begin focus -*/}
      <CommandPalette {...props} 
    /* PROPS */
    isOpen={isOpen()} onOpenChange={setOpen}>
        <MenuItem textValue="Create new file...">
          <FilePlus2 />
          <Text>Create new file...</Text>
        </MenuItem>
        <MenuItem textValue="Create new folder...">
          <FolderPlus />
          <Text>Create new folder...</Text>
        </MenuItem>
        <MenuItem textValue="Assign to...">
          <UserPen />
          <Text>Assign to...</Text>
        </MenuItem>
        <MenuItem textValue="Assign to me">
          <User />
          <Text>Assign to me</Text>
        </MenuItem>
        <MenuItem textValue="Change status...">
          <CircleDotDashed />
          <Text>Change status...</Text>
        </MenuItem>
        <MenuItem textValue="Change priority...">
          <ChartPie />
          <Text>Change priority...</Text>
        </MenuItem>
        <MenuItem textValue="Add label...">
          <Tag />
          <Text>Add label...</Text>
        </MenuItem>
        <MenuItem textValue="Remove label...">
          <Tag />
          <Text>Remove label...</Text>
        </MenuItem>
      </CommandPalette>
      {/*- end focus -*/}
    </DialogTrigger>);
}
export const title = 'Autocomplete example 1';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props}/>, element); }
