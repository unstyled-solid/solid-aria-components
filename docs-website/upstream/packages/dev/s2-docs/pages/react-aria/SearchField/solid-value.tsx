import {render} from '@solidjs/web';
import {createSignal} from 'solid-js';
import {SearchField} from './vanilla/SearchField.solid';
export const title = 'Value';
export function Example() {
  const [search, setSearch] = createSignal('');
  const [submittedSearch, setSubmittedSearch] = createSignal('');
  return <div><SearchField label="Search" placeholder="Search documents" value={search()} onChange={setSearch} onSubmit={setSubmittedSearch} /><pre style={{'font-size': '12px'}}>Value: {search()}{'\n'}Submitted value: {submittedSearch()}</pre></div>;
}
export function mount(element: HTMLElement) { return render(() => <Example />, element); }
