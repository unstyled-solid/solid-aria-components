import {render} from '@solidjs/web';
// Extracted from ComboBox.mdx render example 3; source content and algorithms retained.
import {ComboBox, ComboBoxItem} from '../ListBox/native/vanilla/solid-ComboBox';
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
    /*- begin highlight -*/
    <ComboBox
      label="Preferred fruit or vegetable"
      placeholder="Select an option"
      defaultItems={options}>
      {section => (
        <ListBoxSection id={section.name}>
          <Header>{section.name}</Header>
          <Collection items={section.children}>
            {item => <ComboBoxItem id={item.name}>{item.name}</ComboBoxItem>}
          </Collection>
        </ListBoxSection>
      )}
    </ComboBox>
    /*- end highlight -*/
  );
}

export default Example;

export const title = "ComboBox: upstream example 3";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Example {...{}} {...props} />, element);
}
