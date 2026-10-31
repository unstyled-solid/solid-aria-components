import {render} from '@solidjs/web';
import {SearchField} from './vanilla/SearchField.solid';
export const title = 'SearchField — Vanilla CSS';
export function mount(element: HTMLElement, props: Partial<Parameters<typeof SearchField>[0]> = {}) {
  return render(() => <SearchField label="Search" placeholder="Search documents" {...props} />, element);
}
