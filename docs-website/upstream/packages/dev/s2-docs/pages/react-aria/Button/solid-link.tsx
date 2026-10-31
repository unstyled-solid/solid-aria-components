import {render} from '@solidjs/web';
import {Link} from 'solid-aria-components';
import './vanilla/Button.css';
export const title = 'Link buttons';
export function mount(element: HTMLElement) {
  return render(() => <Link className="react-aria-Button button-base" href="https://adobe.com/" target="_blank">Adobe</Link>, element);
}
