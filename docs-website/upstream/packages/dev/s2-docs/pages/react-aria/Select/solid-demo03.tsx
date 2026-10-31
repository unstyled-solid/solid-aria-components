import {render} from '@solidjs/web';
// Extracted from Select.mdx render example 3; source content and algorithms retained.
import {Select, SelectItem} from '../ListBox/native/vanilla/solid-Select';
import {ListBoxSection, Header} from '../ListBox/native/vanilla/solid-ListBox';
import {Collection} from 'solid-aria-components/Collection';

function Example() {
  /*- begin collapse -*/
  let options = [
    {name: 'Fruit', children: [
      {name: 'Apple'},
      {name: 'Banana'},
      {name: 'Orange'},
      {name: 'Honeydew'},
      {name: 'Grapes'},
      {name: 'Watermelon'},
      {name: 'Cantaloupe'},
      {name: 'Pear'}
    ]},
    {name: 'Vegetable', children: [
      {name: 'Cabbage'},
      {name: 'Broccoli'},
      {name: 'Carrots'},
      {name: 'Lettuce'},
      {name: 'Spinach'},
      {name: 'Bok Choy'},
      {name: 'Cauliflower'},
      {name: 'Potatoes'}
    ]}
  ];
  /*- end collapse -*/

  return (
    <Select label="Preferred fruit or vegetable" items={options}>
      {section => (
        <ListBoxSection id={section.name}>
          <Header>{section.name}</Header>
          <Collection items={section.children}>
            {item => <SelectItem id={item.name}>{item.name}</SelectItem>}
          </Collection>
        </ListBoxSection>
      )}
    </Select>
  );
}

export default Example;

export const title = "Select: upstream example 3";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Example {...{}} {...props} />, element);
}
