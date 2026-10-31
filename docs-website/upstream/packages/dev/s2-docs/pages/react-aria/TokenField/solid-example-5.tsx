import { render } from '@solidjs/web';
import { Autocomplete } from 'solid-aria-components';
import { Text } from 'solid-aria-components';
import { Token, TokenField } from './vanilla/TokenField.solid';
import { tokenFieldPositionToDOMRange } from '../../../../../../../../packages/react-aria-components/exports/TokenField';
import { TokenFieldValue } from 'solid-aria-components';
import { Menu, MenuItem } from './vanilla/Menu.solid';
import { Popover } from './vanilla/Popover.solid';
import { createMemo, createSignal } from 'solid-js';
type Item = {
    username: string;
} | {
    command: string;
    description: string;
};
/*- begin collapse -*/
const usernames = [
    { username: 'alexmiller' },
    { username: 'sarahjones' },
    { username: 'davidkim' },
    { username: 'emmawatson' },
    { username: 'oliverliu' },
    { username: 'ellagreen' },
    { username: 'lucasbrown' },
    { username: 'amandarivera' },
    { username: 'masonlee' },
    { username: 'nataliasmith' },
    { username: 'benjamintaylor' },
    { username: 'zoewilson' },
    { username: 'henrywalker' },
    { username: 'madelineyoung' },
    { username: 'noahscott' },
    { username: 'lucygonzalez' },
    { username: 'jacobmartin' },
    { username: 'averymoore' },
    { username: 'loganmurphy' },
    { username: 'miahernandez' },
    { username: 'danieladair' },
    { username: 'sofiacox' },
    { username: 'jackharris' },
    { username: 'chloebaker' },
    { username: 'liamrodriguez' }
];
/*- end collapse -*/
/*- begin collapse -*/
const slashCommands = [
    { command: 'gif', description: 'Insert a GIF' },
    { command: 'todo', description: 'Add a todo list item' },
    { command: 'mention', description: 'Mention a user with @username' },
    { command: 'date', description: 'Insert the current date' },
    { command: 'quote', description: 'Insert a quote block' }
];
/*- end collapse -*/
function Example() {
    let inputRef: {
        current: HTMLDivElement | null;
    } = { current: null };
    let [value, setValue] = createSignal(new TokenFieldValue([
        { type: 'text', text: 'This example has autocomplete for ' },
        { type: 'token', text: '@usernames' },
        { type: 'text', text: ' and ' },
        { type: 'token', text: '/commands' }
    ]));
    let filter = createMemo(() => {
        let filterAnchor = value().findText(value().caretPosition, TokenFieldValue.Direction.Backward, /(?<=^|\s)[@/]/);
        if (filterAnchor != null) {
            let filterValue = value().slice(filterAnchor, value().caretPosition).toString();
            return [filterAnchor, filterValue] as const;
        }
        return [null, null] as const;
    });
    let filterAnchor = () => filter()[0];
    let items = createMemo<Item[]>(() => {
        let filterValue = filter()[1];
        if (filterValue?.startsWith('/'))
            return slashCommands.filter(item => item.command.includes(filterValue.slice(1)));
        if (filterValue?.startsWith('@'))
            return usernames.filter(item => item.username.includes(filterValue.slice(1)));
        return [];
    });
    return (
    /*- begin highlight -*/
    <Autocomplete>
      <TokenField value={value()} onChange={setValue} label="Prompt" allowsNewlines inputRef={node => { inputRef.current = node; }}>
        {segment => <Token>{segment.text}</Token>}
      </TokenField>
      <Popover triggerRef={inputRef} isOpen={filterAnchor() != null && items().length > 0} isNonModal hideArrow placement="bottom start" trigger="MenuTrigger" getTargetRect={target => {
            return tokenFieldPositionToDOMRange(target, filterAnchor()!).getBoundingClientRect();
        }}>
        <Menu items={items()} dependencies={[filterAnchor()]}>
          {item => (<MenuItem id={'username' in item ? item.username : item.command} onAction={() => {
                setValue(value => value.replaceRangeWithSegments(filterAnchor()!, value.caretPosition, [
                    {
                        type: 'token',
                        text: 'username' in item ? '@' + item.username : item.command
                    },
                    { type: 'text', text: ' ' }
                ], false));
            }}>
              <Text slot="label">{'username' in item ? item.username : item.command}</Text>
              {'description' in item ? <Text slot="description">{item.description}</Text> : null}
            </MenuItem>)}
        </Menu>
      </Popover>
    </Autocomplete>
    /*- end highlight -*/
    );
}
export const title = 'TokenField example 5';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props}/>, element); }
