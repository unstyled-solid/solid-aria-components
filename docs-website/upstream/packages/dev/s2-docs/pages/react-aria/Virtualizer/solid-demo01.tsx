import './demo.css';
import {render} from '@solidjs/web';
// Terminal-copied upstream Virtualizer.mdx, render example 1.
import {Virtualizer, ListLayout} from 'solid-aria-components/Virtualizer';
import {ListBox, ListBoxItem} from '../ListBox/native/vanilla/solid-ListBox';

let items: {id: number, name: string}[] = [];
for (let i = 0; i < 5000; i++) {
  items.push({id: i, name: `Item ${i}`});
}

export default function Demo(props: Record<string, unknown> = {}) { return (<Virtualizer
  /*- begin focus -*/
  layout={ListLayout}
  {...props}
>
  {/*- end focus -*/}
  <ListBox
    aria-label="Virtualized ListBox"
    selectionMode="multiple"
    items={items}
    style={{display: 'block', padding: 0}}>
    {item => <ListBoxItem style={{height: '100%', "min-height": 0}}>{item.name}</ListBoxItem>}
  </ListBox>
</Virtualizer>); }


export const title = 'Virtualizer: upstream example 1';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void { return render(() => <Demo {...{layoutOptions: {rowSize:32,gap:4,padding:4}}} {...props} />, element); }
