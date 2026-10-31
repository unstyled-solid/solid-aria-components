import {render} from '@solidjs/web';
// Extracted from ComboBox.mdx render example 4; source content and algorithms retained.
import {ComboBox, ComboBoxValue, Input} from 'solid-aria-components/ComboBox';
import {ComboBoxListBox, ComboBoxItem} from '../ListBox/native/vanilla/solid-ComboBox';
import {Label, FieldButton} from '../ListBox/native/vanilla/solid-Form';
import {Popover} from '../ListBox/native/vanilla/solid-Popover';
import {Tag, TagGroup} from '../ListBox/native/vanilla/solid-TagGroup';
import {ChevronDown} from './../ListBox/native-icons/solid-icons';

/*- begin collapse -*/
const states = [
  {id: 'AL', name: 'Alabama'},
  {id: 'AK', name: 'Alaska'},
  {id: 'AZ', name: 'Arizona'},
  {id: 'AR', name: 'Arkansas'},
  {id: 'CA', name: 'California'},
  {id: 'CO', name: 'Colorado'},
  {id: 'CT', name: 'Connecticut'},
  {id: 'DE', name: 'Delaware'},
  {id: 'DC', name: 'District of Columbia'},
  {id: 'FL', name: 'Florida'},
  {id: 'GA', name: 'Georgia'},
  {id: 'HI', name: 'Hawaii'},
  {id: 'ID', name: 'Idaho'},
  {id: 'IL', name: 'Illinois'},
  {id: 'IN', name: 'Indiana'},
  {id: 'IA', name: 'Iowa'},
  {id: 'KS', name: 'Kansas'},
  {id: 'KY', name: 'Kentucky'},
  {id: 'LA', name: 'Louisiana'},
  {id: 'ME', name: 'Maine'},
  {id: 'MD', name: 'Maryland'},
  {id: 'MA', name: 'Massachusetts'},
  {id: 'MI', name: 'Michigan'},
  {id: 'MN', name: 'Minnesota'},
  {id: 'MS', name: 'Mississippi'},
  {id: 'MO', name: 'Missouri'},
  {id: 'MT', name: 'Montana'},
  {id: 'NE', name: 'Nebraska'},
  {id: 'NV', name: 'Nevada'},
  {id: 'NH', name: 'New Hampshire'},
  {id: 'NJ', name: 'New Jersey'},
  {id: 'NM', name: 'New Mexico'},
  {id: 'NY', name: 'New York'},
  {id: 'NC', name: 'North Carolina'},
  {id: 'ND', name: 'North Dakota'},
  {id: 'OH', name: 'Ohio'},
  {id: 'OK', name: 'Oklahoma'},
  {id: 'OR', name: 'Oregon'},
  {id: 'PA', name: 'Pennsylvania'},
  {id: 'RI', name: 'Rhode Island'},
  {id: 'SC', name: 'South Carolina'},
  {id: 'SD', name: 'South Dakota'},
  {id: 'TN', name: 'Tennessee'},
  {id: 'TX', name: 'Texas'},
  {id: 'UT', name: 'Utah'},
  {id: 'VT', name: 'Vermont'},
  {id: 'VA', name: 'Virginia'},
  {id: 'WA', name: 'Washington'},
  {id: 'WV', name: 'West Virginia'},
  {id: 'WI', name: 'Wisconsin'},
  {id: 'WY', name: 'Wyoming'}
];
/*- end collapse -*/

export default function Demo(props: Record<string, unknown> = {}) {
  return (<ComboBox selectionMode="multiple">
  <Label>States</Label>
  <div class="combobox-field">
    <Input className="react-aria-Input inset" placeholder="Select a state" />
    <FieldButton><ChevronDown /></FieldButton>
  </div>
  {/*- begin highlight -*/}
  <ComboBoxValue<typeof states[0]>>
    {live => (
      <TagGroup
        aria-label="Selected states"
        style={{"margin-top": "8px"}}
        items={live.selectedItems.filter(item => item != null)}
        renderEmptyState={() => 'No selected items'}
        onRemove={(keys) => {
          // Remove keys from ComboBox state.
          if (Array.isArray(live.state.value)) {
            live.state.setValue(live.state.value.filter(k => !keys.has(k)));
          }
        }}>
        {item => <Tag>{item.name}</Tag>}
      </TagGroup>
    )}
  </ComboBoxValue>
  {/*- end highlight -*/}
  <Popover hideArrow className="combobox-popover">
    <ComboBoxListBox items={states}>
      {state => <ComboBoxItem textValue={state.name}>{state.name}</ComboBoxItem>}
    </ComboBoxListBox>
  </Popover>
</ComboBox>);
}


export const title = "ComboBox: upstream example 4";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{}} {...props} />, element);
}
