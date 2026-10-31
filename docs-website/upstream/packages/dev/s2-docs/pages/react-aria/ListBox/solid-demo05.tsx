import {render} from '@solidjs/web';
// Extracted from ListBox.mdx render example 5; source content and algorithms retained.
import {ListBox, ListBoxItem, ListBoxSection, Header} from './native/vanilla/solid-ListBox';

export default function Demo(props: Record<string, unknown> = {}) {
  return (<ListBox aria-label="Sandwich contents" selectionMode="multiple">
  {/*- begin highlight -*/}
  <ListBoxSection>
    <Header>Veggies</Header>
    {/*- end highlight -*/}
    <ListBoxItem id="lettuce">Lettuce</ListBoxItem>
    <ListBoxItem id="tomato">Tomato</ListBoxItem>
    <ListBoxItem id="onion">Onion</ListBoxItem>
  </ListBoxSection>
  <ListBoxSection>
    <Header>Protein</Header>
    <ListBoxItem id="ham">Ham</ListBoxItem>
    <ListBoxItem id="tuna">Tuna</ListBoxItem>
    <ListBoxItem id="tofu">Tofu</ListBoxItem>
  </ListBoxSection>
  <ListBoxSection>
    <Header>Condiments</Header>
    <ListBoxItem id="mayo">Mayonaise</ListBoxItem>
    <ListBoxItem id="mustard">Mustard</ListBoxItem>
    <ListBoxItem id="ranch">Ranch</ListBoxItem>
  </ListBoxSection>
</ListBox>);
}


export const title = "ListBox: upstream example 5";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{}} {...props} />, element);
}
