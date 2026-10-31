import { render } from '@solidjs/web';
import { ComboBox } from 'solid-aria-components';
import { Token, TokenField } from './vanilla/TokenField.solid';
import { ComboBoxItem, ComboBoxListBox } from './vanilla/ComboBox.solid';
import { FieldButton, Label } from './vanilla/Form.solid';
import { Popover } from './vanilla/Popover.solid';
import { ComboBoxTokenFieldValue } from './ComboBoxTokenFieldValue.solid';
import { ChevronDown } from './native-icons/solid-icons';
import { createSignal } from 'solid-js';
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
    let [value, setValue] = createSignal(new ComboBoxTokenFieldValue([]));
    return (<ComboBox selectionMode="multiple" style={{ "width": "500px", "max-width": '100%' }} value={value().getSelectedKeys()} inputValue={value().getInputValue()} onChange={keys => setValue(value().setSelectedKeys(keys))}>
      <Label>Users</Label>
      <div class="combobox-field">
        <TokenField value={value()} onChange={setValue} placeholder="Select users" style={{ "padding-inline-end": "36px" }}>
          {segment => <Token>{segment.text}</Token>}
        </TokenField>
        <FieldButton>
          <ChevronDown />
        </FieldButton>
      </div>
      <Popover hideArrow className="combobox-popover">
        <ComboBoxListBox items={usernames}>
          {state => <ComboBoxItem id={state.username} textValue={state.username}>{state.username}</ComboBoxItem>}
        </ComboBoxListBox>
      </Popover>
    </ComboBox>);
}
export const title = 'TokenField example 8';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props}/>, element); }
