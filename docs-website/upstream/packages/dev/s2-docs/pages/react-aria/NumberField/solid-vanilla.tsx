import {render} from '@solidjs/web';
import {NumberField} from './vanilla/NumberField.solid';
export const title = 'NumberField — Vanilla CSS';
export function mount(element: HTMLElement, props: Partial<Parameters<typeof NumberField>[0]> = {}) {
  return render(() => <NumberField label="Width" defaultValue={1024} minValue={0} {...props} />, element);
}
