import {render} from '@solidjs/web';
// Extracted from ComboBox.mdx render example 2; source content and algorithms retained.
  import {ComboBox, ComboBoxItem} from '../ListBox/native/tailwind/solid-ComboBox';

  export default function Demo(props: Record<string, unknown> = {}) {
  return (<ComboBox{...props}>
    <ComboBoxItem>Aardvark</ComboBoxItem>
    <ComboBoxItem>Cat</ComboBoxItem>
    <ComboBoxItem>Dog</ComboBoxItem>
    <ComboBoxItem>Kangaroo</ComboBoxItem>
    <ComboBoxItem>Panda</ComboBoxItem>
    <ComboBoxItem>Snake</ComboBoxItem>
  </ComboBox>);
}


export const title = "ComboBox: upstream example 2";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{label: 'Favorite Animal', placeholder: 'Select an animal'}} {...props} />, element);
}
