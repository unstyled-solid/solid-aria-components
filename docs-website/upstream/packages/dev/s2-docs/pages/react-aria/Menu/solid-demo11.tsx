import {render} from '@solidjs/web';
// Extracted from Menu.mdx render example 11; source content and algorithms retained.
import {Autocomplete, useFilter} from 'solid-aria-components/Autocomplete';
import {MenuTrigger, Menu, MenuItem} from '../ListBox/native/vanilla/solid-Menu';
import {Button} from '../ListBox/native/vanilla/solid-Button';
import {SearchField} from '../ListBox/native/vanilla/solid-SearchField';

function Example() {
  let {contains} = useFilter({sensitivity: 'base'});

  return (
    <MenuTrigger children={[() => (<Button>Add tag...</Button>), () => (<div style={{display: 'flex', "flex-direction": 'column', "max-height": 'inherit'}}>
        {/*- begin highlight -*/}
        <Autocomplete filter={contains}>
          <SearchField aria-label="Search tags" placeholder="Search tags" autoFocus style={{margin: "4px"}} />
          <Menu style={{flex: 1}}>
            {/*- end highlight -*/}
            <MenuItem>News</MenuItem>
            <MenuItem>Travel</MenuItem>
            <MenuItem>Shopping</MenuItem>
            <MenuItem>Business</MenuItem>
            <MenuItem>Entertainment</MenuItem>
            <MenuItem>Food</MenuItem>
            <MenuItem>Technology</MenuItem>
            <MenuItem>Health</MenuItem>
            <MenuItem>Science</MenuItem>
          </Menu>
        </Autocomplete>
      </div>)]} />
  );
}

export default Example;

export const title = "Menu: upstream example 11";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Example {...{}} {...props} />, element);
}
