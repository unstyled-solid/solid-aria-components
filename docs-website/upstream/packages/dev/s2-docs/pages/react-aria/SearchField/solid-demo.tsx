import {render} from '@solidjs/web';
import {SearchField} from './SearchField.solid';

export const title = 'Search';
export function mount(element: HTMLElement): () => void {
  return render(() => <SearchField label="Search" onSubmit={text => alert(text)} />, element);
}
