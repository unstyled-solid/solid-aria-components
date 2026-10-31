import {render} from '@solidjs/web';
// Extracted from ComboBox.mdx render example 8; source content and algorithms retained.
import {ComboBox, ComboBoxItem} from '../ListBox/native/vanilla/solid-ComboBox';
import {createSignal} from 'solid-js';

function Example() {
  let [inputValue, setInputValue] = createSignal('');

  return (
    <ComboBox
      label="Favorite Animal"
      placeholder="Select an animal"
      allowsEmptyCollection
      inputValue={inputValue()}
      onInputChange={setInputValue}>
      {/*- begin highlight -*/}
      {inputValue().length > 0 && (
        <ComboBoxItem onAction={() => alert('Creating ' + inputValue())}>
          {`Create "${inputValue()}"`}
        </ComboBoxItem>
      )}
      {/*- end highlight -*/}
      <ComboBoxItem>Aardvark</ComboBoxItem>
      <ComboBoxItem>Cat</ComboBoxItem>
      <ComboBoxItem>Dog</ComboBoxItem>
      <ComboBoxItem>Kangaroo</ComboBoxItem>
      <ComboBoxItem>Panda</ComboBoxItem>
      <ComboBoxItem>Snake</ComboBoxItem>
    </ComboBox>
  );
}

export default Example;

export const title = "ComboBox: upstream example 8";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Example {...{}} {...props} />, element);
}
