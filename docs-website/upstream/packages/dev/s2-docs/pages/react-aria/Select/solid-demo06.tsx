import {render} from '@solidjs/web';
// Extracted from Select.mdx render example 6; source content and algorithms retained.
import {Select, SelectItem} from '../ListBox/native/vanilla/solid-Select';
import {createSignal} from 'solid-js';

function Example(props: Record<string, unknown>) {
  let [animal, setAnimal] = createSignal("bison");

  return (
    <>
      <Select
        {...props}
        label="Pick an animal"
        ///- begin highlight -///
        {...props}
        value={animal()}
        onChange={setAnimal}
        ///- end highlight -///
      >
        <SelectItem id="koala">Koala</SelectItem>
        <SelectItem id="kangaroo">Kangaroo</SelectItem>
        <SelectItem id="platypus" isDisabled>Platypus</SelectItem>
        <SelectItem id="eagle">Bald Eagle</SelectItem>
        <SelectItem id="bison">Bison</SelectItem>
        <SelectItem id="skunk">Skunk</SelectItem>
      </Select>
      <pre style={{"font-size": "12px"}}>Current selection: {JSON.stringify(animal())}</pre>
    </>
  );
}

export default Example;

export const title = "Select: upstream example 6";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Example {...{}} {...props} />, element);
}
