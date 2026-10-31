import {render} from '@solidjs/web';
// Extracted from ComboBox.mdx render example 6; source content and algorithms retained.
import {ComboBox, ComboBoxItem} from '../ListBox/native/vanilla/solid-ComboBox';
import {createSignal} from 'solid-js';

function Example(props: Record<string, unknown>) {
  let [value, setValue] = createSignal('Kangaroo');

  return (
    <div>
      <ComboBox
        {...props}
        label="Favorite Animal"
        placeholder="Select an animal"
        /*- begin highlight -*/
        {...props}
        inputValue={value()}
        onInputChange={setValue}>
        {/*- end highlight -*/}
        <ComboBoxItem id="koala">Koala</ComboBoxItem>
        <ComboBoxItem id="kangaroo">Kangaroo</ComboBoxItem>
        <ComboBoxItem id="platypus">Platypus</ComboBoxItem>
        <ComboBoxItem id="eagle">Bald Eagle</ComboBoxItem>
        <ComboBoxItem id="bison">Bison</ComboBoxItem>
        <ComboBoxItem id="skunk">Skunk</ComboBoxItem>
      </ComboBox>
      <p>Current input value: {value()}</p>
    </div>
  );
}

export default Example;

export const title = "ComboBox: upstream example 6";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Example {...{defaultSelectedKey: 'kangaroo'}} {...props} />, element);
}
