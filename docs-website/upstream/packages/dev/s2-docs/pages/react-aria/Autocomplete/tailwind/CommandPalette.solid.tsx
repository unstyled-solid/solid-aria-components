import type { JSX } from '@solidjs/web';
import { omit } from 'solid-js';
'use client';
import { Autocomplete as AriaAutocomplete, type AutocompleteProps as AriaAutocompleteProps, useFilter } from 'solid-aria-components';
import { type MenuProps as AriaMenuProps } from 'solid-aria-components';
import { Dialog } from 'solid-aria-components';
import { Menu } from './Menu.solid';
import { SearchField } from './SearchField.solid';
import { Modal } from './Modal.solid';
import { onSettled } from 'solid-js';
export interface CommandPaletteProps<T> extends Omit<AriaAutocompleteProps, 'children'>, AriaMenuProps<T> {
    isOpen: boolean;
    onOpenChange: (isOpen?: boolean) => void;
}
export function CommandPalette<T>(props: CommandPaletteProps<T>) {
    let { contains } = useFilter({ sensitivity: 'base' });
    onSettled(() => {
        let isMacUA = /mac(os|intosh)/i.test(navigator.userAgent);
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'j' && (isMacUA ? e.metaKey : e.ctrlKey)) {
                e.preventDefault();
                props.onOpenChange(true);
            }
            else if (e.key === 'Escape') {
                e.preventDefault();
                props.onOpenChange(false);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    });
    return (<Modal isDismissable isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
      <Dialog className="flex flex-col max-h-[inherit]">
        <AriaAutocomplete filter={contains} {...props}>
          <SearchField autoFocus aria-label="Search commands" placeholder="Search commands" className="m-2"/>
          <Menu {...props} className="flex-1 min-h-0" renderEmptyState={() => 'No results found.'}/>
        </AriaAutocomplete>
      </Dialog>
    </Modal>);
}
