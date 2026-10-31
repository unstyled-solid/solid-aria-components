import {render} from '@solidjs/web';
// Extracted from ListBox.mdx render example 10; source content and algorithms retained.
import {ListBox, ListBoxItem, Text} from './native/vanilla/solid-ListBox';

///- begin collapse -///
let planets = [
  {
    id: 1,
    title: 'Mercury',
    description: 'A year lasts 88 days'
  },
  {
    id: 2,
    title: 'Venus',
    description: 'Spins backwards!'
  },
  {
    id: 3,
    title: 'Earth',
    description: 'Only planet with life'
  },
  {
    id: 4,
    title: 'Mars',
    description: 'Has the tallest volcano'
  },
  {
    id: 5,
    title: 'Jupiter',
    description: 'Can fit 1,300 Earths'
  },
  {
    id: 6,
    title: 'Saturn',
    description: 'Rings made of ice'
  },
  {
    id: 7,
    title: 'Uranus',
    description: 'Rolls on its side'
  },
  {
    id: 8,
    title: 'Neptune',
    description: 'Fastest winds in space'
  }
];
///- end collapse -///

export default function Demo(props: Record<string, unknown> = {}) {
  return (<ListBox
  aria-label="Planets"
  /*- begin highlight -*/
  {...props}
  /*- end highlight -*/
  items={planets}
  selectionMode="multiple">
  {item => (
    <ListBoxItem textValue={item.title}>
      <Text slot="label">{item.title}</Text>
      <Text slot="description">{item.description}</Text>
    </ListBoxItem>
  )}
</ListBox>);
}


export const title = "ListBox: upstream example 10";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{layout: 'grid'}} {...props} />, element);
}
