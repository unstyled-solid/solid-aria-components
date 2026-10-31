import {render} from '@solidjs/web';
import {TextField} from './TextField.solid';

export const title = 'Email';
export function mount(element: HTMLElement): () => void {
  return render(() => <TextField label="Email" />, element);
}
