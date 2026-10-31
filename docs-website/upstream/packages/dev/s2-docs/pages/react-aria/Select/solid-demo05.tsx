import {render} from '@solidjs/web';
// Extracted from Select.mdx render example 5; source content and algorithms retained.
import {Autocomplete, useFilter} from 'solid-aria-components/Autocomplete';
import {Select, SelectValue} from 'solid-aria-components/Select';
import {Group} from 'solid-aria-components/Group';
import {Button} from '../ListBox/native/vanilla/solid-Button';
import {SelectListBox, SelectItem} from '../ListBox/native/vanilla/solid-Select';
import {Label} from '../ListBox/native/vanilla/solid-Form';
import {Popover} from '../ListBox/native/vanilla/solid-Popover';
import {Plus} from './../ListBox/native-icons/solid-icons';
import {SearchField} from '../ListBox/native/vanilla/solid-SearchField';
import {Tag, TagGroup} from '../ListBox/native/vanilla/solid-TagGroup';
import {createSignal as createRefSignal} from 'solid-js';
import '../MultiSelect.css';

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

function SelectWithTagGroup() {
  let [triggerElement, setTriggerElement] = createRefSignal<HTMLDivElement | null>(null);
  let triggerRef = {get current() { return triggerElement(); }};
  let {contains} = useFilter({sensitivity: 'base'});

  return (
    <Select selectionMode="multiple" className="multi-select">
      <Label>States</Label>
      <Group aria-label="States" ref={setTriggerElement}>
        {/*- begin highlight -*/}
        <SelectValue<typeof states[0]> style={{flex: 1}}>
          {live => (
            <TagGroup
              aria-label="Selected states"
              items={live.selectedItems.filter(item => item != null)}
              renderEmptyState={() => 'No selected items'}
              onRemove={(keys) => {
                // Remove keys from Select state.
                if (Array.isArray(live.state.value)) {
                  live.state.setValue(live.state.value.filter(k => !keys.has(k)));
                }
              }}>
              {item => <Tag>{item.name}</Tag>}
            </TagGroup>
          )}
        </SelectValue>
        {/*- end highlight -*/}
        <Button variant="primary"><Plus /></Button>
      </Group>
      <Popover
        // Position popover relative to the wrapping div instead of the Button
        triggerRef={triggerRef}
        hideArrow
        className="select-popover"
        style={{display: 'flex', "flex-direction": 'column', width: "250px", padding: "4px"}}>
        <Autocomplete filter={contains}>
          <SearchField aria-label="Search states" placeholder="Search states" autoFocus style={{"margin-bottom": "4px"}} />
          <SelectListBox items={states}>
            {state => <SelectItem textValue={state.name}>{state.name}</SelectItem>}
          </SelectListBox>
        </Autocomplete>
      </Popover>
    </Select>
  );
}

export default SelectWithTagGroup;

export const title = "Select: upstream example 5";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <SelectWithTagGroup {...{}} {...props} />, element);
}
