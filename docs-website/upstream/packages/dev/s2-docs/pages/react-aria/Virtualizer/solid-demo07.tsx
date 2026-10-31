import './demo.css';
import {render} from '@solidjs/web';
// Terminal-copied upstream Virtualizer.mdx, render example 7.
import {Virtualizer, ListLayout} from 'solid-aria-components/Virtualizer';
import {GridList, GridListItem, Text} from '../ListBox/native/vanilla/solid-GridList';
import {Button} from '../ListBox/native/vanilla/solid-Button';
import {createSignal} from 'solid-js';
import {ChevronRight, ChevronDown} from '../ListBox/native-icons/solid-icons';

let items: {
  id: string;
  name: string;
}[] = [];
for (let i = 0; i < 10; i++) {
  items.push({id: `item_${i}`, name: `Item ${i}`});
}

function ExpandableItem({item}: {item: {id: string; name: string}}) {
  let [expanded, setExpanded] = createSignal(false);
  return (
    <div class="expandable-item">
      <Text>{item.name}</Text>
      <Button
        variant="quiet"
        onPress={() => setExpanded(!expanded())} 
        aria-label={expanded() ? 'Collapse' : 'Expand'}>
        {expanded() ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </Button>
      <Text slot="description" style={{display: expanded() ? 'block' : 'none'}}>This is an expanded item.</Text>
    </div>
  );
}

export default function Demo(props: Record<string, unknown> = {}) { return (<Virtualizer
  layout={ListLayout}
  layoutOptions={{
    estimatedRowHeight: 25,
    gap: 4,
  }}
  /*- begin highlight -*/
  shouldObserveItemSize>
  {/*- end highlight -*/}
  <GridList
    style={{display: 'block', padding: "4px", height: "400px", width: '100%'}}
    aria-label="virtualized with expandable rows"
    items={items}>
    {item =>
    <GridListItem textValue={item.name} style={{padding: 0}}><ExpandableItem item={item} /></GridListItem>}
  </GridList>
</Virtualizer>); }


export const title = 'Virtualizer: upstream example 7';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void { return render(() => <Demo {...{}} {...props} />, element); }
