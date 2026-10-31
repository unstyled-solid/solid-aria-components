import { render } from '@solidjs/web';
import { Autocomplete } from 'solid-aria-components';
import { useAsyncList } from 'solid-aria-components';
import { SearchField } from './vanilla/SearchField.solid';
import { ListBox, ListBoxItem } from './vanilla/ListBox.solid';
function Example() {
    let list = useAsyncList<{
        name: string;
    }>({
        async load({ signal, filterText }) {
            let res = await fetch(`https://swapi.py4e.com/api/people/?search=${filterText}`, { signal });
            let json = await res.json();
            return {
                items: json.results
            };
        }
    });
    return (<Autocomplete 
    /*- begin highlight -*/
    inputValue={list.filterText} onInputChange={list.setFilterText}>
      {/*- end highlight -*/}
      <SearchField label="Search Star Wars Characters" placeholder="Search" style={{ "width": "250px", "margin": "8px" }}/>
      <ListBox items={list.items} selectionMode="multiple" renderEmptyState={() => 'No results found.'} style={{ "height": "300px" }}>
        {(item) => <ListBoxItem id={item.name} textValue={item.name}>{item.name}</ListBoxItem>}
      </ListBox>
    </Autocomplete>);
}
export const title = 'Autocomplete example 9';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props}/>, element); }
