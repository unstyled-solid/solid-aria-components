import {render} from '@solidjs/web';
import {Link} from './vanilla/Link.solid';
export const title = 'Link — Vanilla CSS';
export function mount(element: HTMLElement, props: Partial<Parameters<typeof Link>[0]> = {}) {
  return render(() => <Link href="https://www.imdb.com/title/tt6348138/" target="_blank" {...props}>{props.children ?? 'The missing link'}</Link>, element);
}
