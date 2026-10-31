import {render} from '@solidjs/web';
import {NumberField} from './vanilla/NumberField.solid';
export const title = 'Format options';
export function mount(element: HTMLElement, props: Partial<Parameters<typeof NumberField>[0]> = {}) {
  return render(() => <NumberField label="Value" defaultValue={5} formatOptions={{style: 'decimal'}} {...props} />, element);
}
