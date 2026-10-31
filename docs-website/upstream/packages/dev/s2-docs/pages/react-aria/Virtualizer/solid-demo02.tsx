import './demo.css';
import {render} from '@solidjs/web';
// Terminal-copied upstream Virtualizer.mdx, render example 2.
import {Virtualizer, ListLayout} from 'solid-aria-components/Virtualizer';
import {ListBox, ListBoxItem} from '../ListBox/native/vanilla/solid-ListBox';

let lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet tristique risus. In sit amet suscipit lorem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In condimentum imperdiet metus non condimentum. Duis eu velit et quam accumsan tempus at id velit. Duis elementum elementum purus, id tempus mauris posuere a. Nunc vestibulum sapien pellentesque lectus commodo ornare.'.split(' ');
let items: {id: number, name: string}[] = [];
for (let i = 0; i < 5000; i++) {
  let words = Math.max(2, Math.floor(Math.random() * 25));
  let name = lorem.slice(0, words).join(' ');
  items.push({id: i, name});
}

export default function Demo(props: Record<string, unknown> = {}) { return (<Virtualizer
  /*- begin highlight -*/
  layout={ListLayout}
  {...props}
>
  {/*- end highlight -*/}
  <ListBox
    aria-label="Virtualized ListBox"
    selectionMode="multiple"
    items={items}
    style={{display: 'block', padding: 0}}>
    {(item) => <ListBoxItem>{item.name}</ListBoxItem>}
  </ListBox>
</Virtualizer>); }


export const title = 'Virtualizer: upstream example 2';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void { return render(() => <Demo {...{layoutOptions: {estimatedRowSize:75,gap:4,padding:4}}} {...props} />, element); }
