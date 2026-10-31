import {render} from '@solidjs/web';
import {Link} from './vanilla/Link.solid';
export const title = 'Events';
export function mount(element: HTMLElement) { return render(() => <Link onPress={() => alert('Pressed link')}>Link</Link>, element); }
