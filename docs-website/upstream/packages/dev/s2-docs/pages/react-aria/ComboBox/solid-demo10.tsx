import {render} from '@solidjs/web';
// Extracted from ComboBox.mdx render example 10; source content and algorithms retained.
import {ComboBox, ComboBoxItem} from '../ListBox/native/vanilla/solid-ComboBox';

export default function Demo(props: Record<string, unknown> = {}) {
  return (<ComboBox{...props}>
  <ComboBoxItem id="red panda">Red Panda</ComboBoxItem>
  <ComboBoxItem id="cat">Cat</ComboBoxItem>
  <ComboBoxItem id="dog">Dog</ComboBoxItem>
  <ComboBoxItem id="aardvark">Aardvark</ComboBoxItem>
  <ComboBoxItem id="kangaroo">Kangaroo</ComboBoxItem>
  <ComboBoxItem id="snake">Snake</ComboBoxItem>
</ComboBox>);
}


export const title = "ComboBox: upstream example 10";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{label: 'Favorite Animal', placeholder: 'Select an animal'}} {...props} />, element);
}
