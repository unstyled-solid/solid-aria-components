import { render } from '@solidjs/web';
import { CommandPalette } from './tailwind/CommandPalette.solid';
import { MenuItem } from './tailwind/Menu.solid';
import { Button } from './tailwind/Button.solid';
import { DialogTrigger } from 'solid-aria-components';
import { createSignal } from 'solid-js';
function Example(props: Record<string, unknown>) {
    let [isOpen, setOpen] = createSignal(false);
    return (<DialogTrigger isOpen={isOpen()} onOpenChange={setOpen}>
      <Button>Open Command Palette <kbd class="font-sans text-xs ml-4 px-1 rounded-sm border border-white/20 bg-white/10">⌘ J</kbd></Button>
      {/*- begin focus -*/}
      <CommandPalette {...props} 
    /* PROPS */
    isOpen={isOpen()} onOpenChange={setOpen}>
        <MenuItem textValue="Create new file...">Create new file...</MenuItem>
        <MenuItem textValue="Create new folder...">Create new folder...</MenuItem>
        <MenuItem textValue="Assign to...">Assign to...</MenuItem>
        <MenuItem textValue="Assign to me">Assign to me</MenuItem>
        <MenuItem textValue="Change status...">Change status...</MenuItem>
        <MenuItem textValue="Change priority...">Change priority...</MenuItem>
        <MenuItem textValue="Add label...">Add label...</MenuItem>
        <MenuItem textValue="Remove label...">Remove label...</MenuItem>
      </CommandPalette>
      {/*- end focus -*/}
    </DialogTrigger>);
}
export const title = 'Autocomplete example 2';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props}/>, element); }
