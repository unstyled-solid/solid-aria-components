import { render } from '@solidjs/web';
import { Autocomplete } from 'solid-aria-components';
import { Collection } from 'solid-aria-components';
import { Token, TokenField } from './vanilla/TokenField.solid';
import { Header, Menu, MenuItem, MenuSection } from './vanilla/Menu.solid';
import { Popover } from './vanilla/Popover.solid';
import { createSignal, createMemo } from 'solid-js';
import { TokenFieldValue } from 'solid-aria-components';
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
function Example() {
    let inputRef: {
        current: HTMLDivElement | null;
    } = { current: null };
    let [value, setValue] = createSignal(new TokenFieldValue([{ type: 'token', text: 'From: Alice Smith' }]));
    let suggestions = createMemo(() => {
        let last = value().segments[value().caretPosition.index];
        let filterText = last?.type === 'text' ? last.text : null;
        let suggestions: {
            name: string;
            items: string[];
        }[] = [];
        if (filterText != null) {
            let users = usernames
                .filter(item => item.username.includes(filterText))
                .map(u => u.username)
                .slice(0, 5);
            if (users.length > 0) {
                if (!value().segments.some(segment => segment.type === 'token' && segment.text.startsWith('From: '))) {
                    suggestions.push({
                        name: 'From',
                        items: users
                    });
                }
                suggestions.push({
                    name: 'To',
                    items: users
                });
            }
            suggestions.push({
                name: 'Subject',
                items: [filterText]
            });
        }
        return suggestions;
    });
    return (<Autocomplete>
      <TokenField role="searchbox" value={value()} onChange={setValue} label="Search" inputRef={node => { inputRef.current = node; }}>
        {segment => <Token>{segment.text}</Token>}
      </TokenField>
      <Popover triggerRef={inputRef} isOpen={suggestions().length > 0} isNonModal hideArrow placement="bottom start" style={{ "width": 'var(--trigger-width)' }} trigger="MenuTrigger">
        <Menu items={suggestions()}>
          {section => (<MenuSection>
              <Header>{section.name}</Header>
              <Collection items={section.items}>
                {item => (<MenuItem id={section.name + '-' + item} onAction={() => {
                    setValue(value => value.replaceRangeWithSegments({ index: value.caretPosition.index, offset: 0 }, value.caretPosition, [{ type: 'token', text: section.name + ': ' + item }], false));
                }}>
                    {item}
                  </MenuItem>)}
              </Collection>
            </MenuSection>)}
        </Menu>
      </Popover>
    </Autocomplete>);
}
export const title = 'TokenField example 7';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props}/>, element); }
