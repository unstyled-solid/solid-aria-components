import {render} from '@solidjs/web';
import {Link} from './Link.solid';

export const title = 'Adobe';
export function mount(element: HTMLElement): () => void {
  return render(() => <Link href="https://adobe.com" target="_blank">Adobe</Link>, element);
}
