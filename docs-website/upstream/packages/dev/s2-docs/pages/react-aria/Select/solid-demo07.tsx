import {render} from '@solidjs/web';
// Extracted from Select.mdx render example 7; source content and algorithms retained.
import {Select, SelectItem} from '../ListBox/native/vanilla/solid-Select';
import {Button} from '../ListBox/native/vanilla/solid-Button';
import {Form} from '../ListBox/native/vanilla/solid-Form';

export default function Demo(props: Record<string, unknown> = {}) {
  return (<Form>
  <Select
    label="Animal"
    /*- begin highlight -*/
    name="animal"
    isRequired
    /*- end highlight -*/
    description="Please select an animal.">
    <SelectItem id="aardvark">Aardvark</SelectItem>
    <SelectItem id="cat">Cat</SelectItem>
    <SelectItem id="dog">Dog</SelectItem>
    <SelectItem id="kangaroo">Kangaroo</SelectItem>
    <SelectItem id="panda">Panda</SelectItem>
    <SelectItem id="snake">Snake</SelectItem>
  </Select>
  <Button type="submit">Submit</Button>
</Form>);
}


export const title = "Select: upstream example 7";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{}} {...props} />, element);
}
