import {render} from '@solidjs/web';
// Extracted from Select.mdx render example 4; source content and algorithms retained.
import {Autocomplete, useFilter} from 'solid-aria-components/Autocomplete';
import {Select, Label, SelectValue} from 'solid-aria-components/Select';
import {Button} from '../ListBox/native/vanilla/solid-Button';
import {SelectListBox, SelectItem} from '../ListBox/native/vanilla/solid-Select';
import {Popover} from '../ListBox/native/vanilla/solid-Popover';
import {SearchField} from '../ListBox/native/vanilla/solid-SearchField';
import {ChevronDown} from './../ListBox/native-icons/solid-icons';

function Example() {
  let {contains} = useFilter({sensitivity: 'base'});

  return (
    <Select>
      <Label>Category</Label>
      <Button>
        <SelectValue />
        <ChevronDown size={18} />
      </Button>
      <Popover hideArrow className="select-popover" style={{display: 'flex', "flex-direction": 'column'}}>
        {/*- begin highlight -*/}
        <Autocomplete filter={contains}>
          <SearchField aria-label="Search tags" placeholder="Search tags" autoFocus style={{margin: "4px"}} />
          <SelectListBox>
            {/*- end highlight -*/}
            <SelectItem>News</SelectItem>
            <SelectItem>Travel</SelectItem>
            <SelectItem>Shopping</SelectItem>
            <SelectItem>Business</SelectItem>
            <SelectItem>Entertainment</SelectItem>
            <SelectItem>Food</SelectItem>
            <SelectItem>Technology</SelectItem>
            <SelectItem>Health</SelectItem>
            <SelectItem>Science</SelectItem>
          </SelectListBox>
        </Autocomplete>
      </Popover>
    </Select>
  );
}

export default Example;

export const title = "Select: upstream example 4";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Example {...{}} {...props} />, element);
}
