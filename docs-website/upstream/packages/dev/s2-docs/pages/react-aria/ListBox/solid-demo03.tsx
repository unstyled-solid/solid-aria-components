import {render} from '@solidjs/web';
// Extracted from ListBox.mdx render example 3; source content and algorithms retained.
import {ListBox, ListBoxItem} from './native/vanilla/solid-ListBox';

function Example() {
  let options = [
    { id: 1, name: 'Aardvark' },
    { id: 2, name: 'Cat' },
    { id: 3, name: 'Dog' },
    { id: 4, name: 'Kangaroo' },
    { id: 5, name: 'Koala' },
    { id: 6, name: 'Penguin' },
    { id: 7, name: 'Snake' },
    { id: 8, name: 'Turtle' },
    { id: 9, name: 'Wombat' }
  ];

  return (
    /*- begin highlight -*/
    <ListBox aria-label="Animals" items={options} selectionMode="single">
      {(item) => <ListBoxItem>{item.name}</ListBoxItem>}
    </ListBox>
    /*- end highlight -*/
  );
}

export default Example;

export const title = "ListBox: upstream example 3";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Example {...{}} {...props} />, element);
}
