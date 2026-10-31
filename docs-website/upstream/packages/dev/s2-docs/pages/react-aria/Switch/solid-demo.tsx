import {render} from '@solidjs/web';
import {Switch} from './Switch.solid';

export const title = 'Low power mode';
export function mount(element: HTMLElement): () => void {
  return render(() => <Switch>Low power mode</Switch>, element);
}
