import {render} from '@solidjs/web';
// Extracted from ComboBox.mdx render example 9; source content and algorithms retained.
import {ComboBox, ComboBoxItem} from '../ListBox/native/vanilla/solid-ComboBox';
import {Button} from '../ListBox/native/vanilla/solid-Button';
import {Form} from '../ListBox/native/vanilla/solid-Form';;

export default function Demo(props: Record<string, unknown> = {}) {
  return (<Form>
  <ComboBox
    label="Animal"
    placeholder="e.g. Cat"
    /*- begin highlight -*/
    name="animal"
    isRequired
    /*- end highlight -*/
    description="Please select an animal.">
    <ComboBoxItem id="aardvark">Aardvark</ComboBoxItem>
    <ComboBoxItem id="cat">Cat</ComboBoxItem>
    <ComboBoxItem id="dog">Dog</ComboBoxItem>
    <ComboBoxItem id="kangaroo">Kangaroo</ComboBoxItem>
    <ComboBoxItem id="panda">Panda</ComboBoxItem>
    <ComboBoxItem id="snake">Snake</ComboBoxItem>
  </ComboBox>
  <Button type="submit">Submit</Button>
</Form>);
}


export const title = "ComboBox: upstream example 9";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{}} {...props} />, element);
}
