import { render } from '@solidjs/web';
import { Autocomplete, useFilter } from 'solid-aria-components';
import { MenuTrigger, Menu, MenuItem } from './vanilla/Menu.solid';
import { Button } from './vanilla/Button.solid';
import { SearchField } from './vanilla/SearchField.solid';
function Example(props: Record<string, unknown>) {
    let { contains } = useFilter({ sensitivity: 'base' });
    return (<MenuTrigger children={[
      () => <Button>Add tag...</Button>,
      () => <div style={{ "display": 'flex', "flex-direction": 'column', "max-height": 'inherit' }}>
        {/*- begin highlight -*/}
        <Autocomplete {...props} /* PROPS */ filter={contains}>
          <SearchField autoFocus aria-label="Search tags" placeholder="Search tags" style={{ "margin": "4px" }}/>
          <Menu style={{ "flex": "1" }} renderEmptyState={() => 'No results.'}>
            {/*- end highlight -*/}
            <MenuItem textValue="News">News</MenuItem>
            <MenuItem textValue="Travel">Travel</MenuItem>
            <MenuItem textValue="Shopping">Shopping</MenuItem>
            <MenuItem textValue="Business">Business</MenuItem>
            <MenuItem textValue="Entertainment">Entertainment</MenuItem>
            <MenuItem textValue="Food">Food</MenuItem>
            <MenuItem textValue="Technology">Technology</MenuItem>
            <MenuItem textValue="Health">Health</MenuItem>
            <MenuItem textValue="Science">Science</MenuItem>
          </Menu>
        </Autocomplete>
      </div>
    ]}/>);
}
export const title = 'Autocomplete example 3';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props}/>, element); }
