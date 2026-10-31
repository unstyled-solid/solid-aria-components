/// <reference path="./textarea-caret.d.ts" />
import { render } from '@solidjs/web';
import { Autocomplete, useFilter } from 'solid-aria-components';
import { TextArea } from './vanilla/TextField.solid';
import { Popover } from './vanilla/Popover.solid';
import { Menu, MenuItem } from './vanilla/Menu.solid';
import { createSignal, createEffect } from 'solid-js';
import getCaretRect from 'textarea-caret';
/*- begin collapse -*/
const usernames = [
    'alexmiller',
    'sarahjones',
    'davidkim',
    'emmawatson',
    'oliverliu',
    'ellagreen',
    'lucasbrown',
    'amandarivera',
    'masonlee',
    'nataliasmith',
    'benjamintaylor',
    'zoewilson',
    'henrywalker',
    'madelineyoung',
    'noahscott',
    'lucygonzalez',
    'jacobmartin',
    'averymoore',
    'loganmurphy',
    'miahernandez',
    'danieladair',
    'sofiacox',
    'jackharris',
    'chloebaker',
    'liamrodriguez'
];
/*- end collapse -*/
function Example() {
    let { startsWith } = useFilter({ sensitivity: 'base' });
    let [inputValue, setInputValue] = createSignal('');
    let [anchorIndex, setAnchorIndex] = createSignal(-1);
    let [filterValue, setFilterValue] = createSignal('');
    let inputRef: {
        current: HTMLTextAreaElement | null;
    } = { current: null };
    let [caretRequest, setCaretRequest] = createSignal<{value: string; position: number} | null>(null);
    createEffect(() => {
        let request = caretRequest();
        return request && request.value === inputValue() ? request : null;
    }, request => {
        if (request) inputRef.current?.setSelectionRange(request.position, request.position);
    });
    let updateFilter = () => {
        let { selectionStart, selectionEnd, value } = inputRef.current!;
        if (selectionStart === selectionEnd && document.activeElement === inputRef.current!) {
            // The current filter value is the substring between
            // the anchor character '@' and the caret position.
            let index = value.lastIndexOf('@', selectionStart);
            if (index >= 0) {
                let slice = value.slice(index + 1, selectionStart);
                // Spaces are not allowed in the filter value.
                if (!slice.includes(' ')) {
                    setAnchorIndex(index);
                    setFilterValue(slice);
                    return;
                }
            }
        }
        // Reset the anchor index, but not the filter value so
        // that the menu does not flicker during the close animation.
        setAnchorIndex(-1);
    };
    return (
    // Pass the filter substring to Autocomplete.
    <Autocomplete inputValue={filterValue()} filter={startsWith}>
    {/*- end highlight -*/}
      <TextArea label="Comment" placeholder="Type @ for autocomplete" style={{ "width": '100%' }} 
    /*- begin highlight -*/
    // Pass the full input value to the TextArea.
    value={inputValue()} 
    /*- end highlight -*/
    onChange={value => {
            setInputValue(value);
            updateFilter();
        }} onSelect={updateFilter} onBlur={updateFilter} inputRef={node => { inputRef.current = node; }}/>
      <Popover triggerRef={inputRef} 
    /*- begin highlight -*/
    // Open the popover when there is an active anchor character.
    isOpen={anchorIndex() >= 0} 
    /*- end highlight -*/
    isNonModal placement="bottom start" trigger="MenuTrigger" 
    /*- begin highlight -*/
    // Calculate the position of the popover relative to the anchor character.
    getTargetRect={target => {
            let { top, left } = getCaretRect(inputRef.current!, anchorIndex()!);
            let { top: targetTop, left: targetLeft } = target.getBoundingClientRect();
            return new DOMRect(targetLeft + left, targetTop + top, 1, 16);
        }}>
        {/*- end highlight -*/}
        <Menu items={usernames} renderEmptyState={() => 'No results found.'} onAction={value => {
            /*- begin highlight -*/
            // Insert the completion at the anchor index and update the caret position.
            let prefix = inputValue().slice(0, anchorIndex()!) + '@' + value + ' ';
            let suffix = inputValue().slice(inputRef.current!.selectionEnd!);
            let nextValue = prefix + suffix;
            setInputValue(nextValue);
            setCaretRequest({value: nextValue, position: prefix.length});
            // Completion includes a trailing space: close the active mention, retaining
            // its filter text for the source popover's closing animation.
            setAnchorIndex(-1);
            /*- end highlight -*/
        }}>
          {(item) => <MenuItem id={item} textValue={item}>{item}</MenuItem>}
        </Menu>
      </Popover>
    </Autocomplete>);
}
export const title = 'Autocomplete example 10';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props}/>, element); }
