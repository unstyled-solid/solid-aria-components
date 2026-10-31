import { render } from '@solidjs/web';
import { Autocomplete, useFilter } from 'solid-aria-components';
import { TagGroup, Tag } from './vanilla/TagGroup.solid';
import { SearchField } from './vanilla/SearchField.solid';
function Example() {
    let { contains } = useFilter({ sensitivity: 'base' });
    return (
    /*- begin highlight -*/
    <Autocomplete filter={contains}>
      {/*- end highlight -*/}
      <SearchField label="Interests" placeholder="Filter tags" style={{ "width": "250px", "margin-bottom": "16px" }}/>
      <TagGroup aria-label="Interest tags" selectionMode="multiple" renderEmptyState={() => 'No results.'} style={{ "width": "250px" }}>
        <Tag>News</Tag>
        <Tag>Travel</Tag>
        <Tag>Shopping</Tag>
        <Tag>Business</Tag>
        <Tag>Entertainment</Tag>
        <Tag>Food</Tag>
        <Tag>Technology</Tag>
        <Tag>Health</Tag>
        <Tag>Science</Tag>
      </TagGroup>
    </Autocomplete>);
}
export const title = 'Autocomplete example 6';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props}/>, element); }
