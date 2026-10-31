import {render} from '@solidjs/web';
import {ToggleButton} from './ToggleButton.solid';

export const title = 'Pin';
export function mount(element: HTMLElement): () => void {
  return render(() => <ToggleButton>Pin</ToggleButton>, element);
}
