import {Breadcrumbs, Breadcrumb, Link} from 'solid-aria-components';
import {render} from '@solidjs/web';
export const title = 'Folder breadcrumbs';
export function mount(element: HTMLElement) {return render(() => <NativeDemo />, element);}
import './Breadcrumbs.css';
import './Link.css';

function Chevron() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>;
}

export default function NativeDemo() {
  return <Breadcrumbs>
    <Breadcrumb><Link onPress={() => alert('Pressed Folder 1')}>Folder 1</Link><Chevron /></Breadcrumb>
    <Breadcrumb><Link onPress={() => alert('Pressed Folder 2')}>Folder 2</Link><Chevron /></Breadcrumb>
    <Breadcrumb><Link data-current="true">Folder 3</Link></Breadcrumb>
  </Breadcrumbs>;
}
