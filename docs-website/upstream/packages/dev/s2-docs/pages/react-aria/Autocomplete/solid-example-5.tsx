import { render } from '@solidjs/web';
import { Autocomplete, useFilter } from 'solid-aria-components';
import { ListBox, ListBoxItem } from './vanilla/ListBox.solid';
import { SearchField } from './vanilla/SearchField.solid';
function Example(props: Record<string, unknown>) {
    let { contains } = useFilter({ sensitivity: 'base' });
    return (
    /*- begin highlight -*/
    <Autocomplete {...props} /* PROPS */ filter={contains}>
      {/*- end highlight -*/}
      <SearchField aria-label="Search tags" placeholder="Search tags" style={{ "width": "250px", "margin-bottom": "8px" }}/>
      <ListBox aria-label="Tags" selectionMode="multiple" renderEmptyState={() => 'No results.'} style={{ "height": "200px" }}>
        <ListBoxItem textValue="News">News</ListBoxItem>
        <ListBoxItem textValue="Travel">Travel</ListBoxItem>
        <ListBoxItem textValue="Shopping">Shopping</ListBoxItem>
        <ListBoxItem textValue="Business">Business</ListBoxItem>
        <ListBoxItem textValue="Entertainment">Entertainment</ListBoxItem>
        <ListBoxItem textValue="Food">Food</ListBoxItem>
        <ListBoxItem textValue="Technology">Technology</ListBoxItem>
        <ListBoxItem textValue="Health">Health</ListBoxItem>
        <ListBoxItem textValue="Science">Science</ListBoxItem>
      </ListBox>
    </Autocomplete>);
}
export const title = 'Autocomplete example 5';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props}/>, element); }
