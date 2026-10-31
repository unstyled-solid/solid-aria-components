import {render} from '@solidjs/web';
// Extracted from Menu.mdx render example 10; source content and algorithms retained.
import {MenuTrigger, Menu} from '../ListBox/native/vanilla/solid-Menu';
import {Button} from '../ListBox/native/vanilla/solid-Button';

export default function Demo(props: Record<string, unknown> = {}) {
  return (<MenuTrigger children={[() => (<Button>Actions</Button>), () => (<Menu
    aria-label="Actions"
    renderEmptyState={() => 'No actions available.'}>
    {[]}
  </Menu>)]} />);
}


export const title = "Menu: upstream example 10";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{}} {...props} />, element);
}
