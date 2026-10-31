import {render} from '@solidjs/web';
import {NumberField} from './vanilla/NumberField.solid';
export const title = 'Value scale';
export function mount(element: HTMLElement, props: Partial<Parameters<typeof NumberField>[0]> = {}) {
  return render(() => <NumberField label="Amount" minValue={0} maxValue={150} defaultValue={50} step={5} {...props} />, element);
}
