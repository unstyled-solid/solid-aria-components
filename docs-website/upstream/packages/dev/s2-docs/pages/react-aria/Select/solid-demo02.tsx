import {render} from '@solidjs/web';
// Extracted from Select.mdx render example 2; source content and algorithms retained.
  import {Select, SelectItem} from '../ListBox/native/tailwind/solid-Select';

  export default function Demo(props: Record<string, unknown> = {}) {
  return (<Select{...props}>
    <SelectItem>Aardvark</SelectItem>
    <SelectItem>Cat</SelectItem>
    <SelectItem>Dog</SelectItem>
    <SelectItem>Kangaroo</SelectItem>
    <SelectItem>Panda</SelectItem>
    <SelectItem>Snake</SelectItem>
  </Select>);
}


export const title = "Select: upstream example 2";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{label: 'Favorite Animal'}} {...props} />, element);
}
