import {render} from '@solidjs/web';
import {NumberField} from './NumberField.solid';

export const title = 'Price';
export function mount(element: HTMLElement): () => void {
  return render(() => <NumberField label="Price" defaultValue={6} formatOptions={{style: 'currency', currency: 'USD'}} />, element);
}
