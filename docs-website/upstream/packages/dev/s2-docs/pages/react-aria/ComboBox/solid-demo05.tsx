import {render} from '@solidjs/web';
// Extracted from ComboBox.mdx render example 5; source content and algorithms retained.
import {ComboBox, ComboBoxItem} from '../ListBox/native/vanilla/solid-ComboBox';
import {createSignal} from 'solid-js';
import type {Key} from 'solid-aria-components/ComboBox';

function Example() {
  let [animal, setAnimal] = createSignal<Key | null>("bison");

  return (
    <div>
      <ComboBox
        label="Favorite Animal"
        placeholder="Select an animal"
        /*- begin highlight -*/
        value={animal()}
        onChange={setAnimal}>
        {/*- end highlight -*/}
        <ComboBoxItem id="koala">Koala</ComboBoxItem>
        <ComboBoxItem id="kangaroo">Kangaroo</ComboBoxItem>
        <ComboBoxItem id="platypus" isDisabled>Platypus</ComboBoxItem>
        <ComboBoxItem id="eagle">Bald Eagle</ComboBoxItem>
        <ComboBoxItem id="bison">Bison</ComboBoxItem>
        <ComboBoxItem id="skunk">Skunk</ComboBoxItem>
      </ComboBox>
      <p>Current selection: {animal()}</p>
    </div>
  );
}

export default Example;

export const title = "ComboBox: upstream example 5";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Example {...{}} {...props} />, element);
}
