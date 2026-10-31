import {render} from '@solidjs/web';
import {Checkbox} from './Checkbox.solid';

export const title = 'Unsubscribe';
export function mount(element: HTMLElement): () => void {
  return render(() => <Checkbox>Unsubscribe</Checkbox>, element);
}
