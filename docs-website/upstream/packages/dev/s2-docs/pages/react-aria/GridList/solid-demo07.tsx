import {render} from '@solidjs/web';
// Extracted from GridList.mdx render example 7; source content and algorithms retained.
import {GridList, GridListItem, GridListHeader, GridListSection, Text} from '../ListBox/native/vanilla/solid-GridList';

export default function Demo(props: Record<string, unknown> = {}) {
  return (<GridList
  layout="grid"
  aria-label="Photos">
    <GridListSection>
      <GridListHeader>Fruit</GridListHeader>
      <GridListItem textValue="Apple">
        <img src="https://images.unsplash.com/photo-1630563451961-ac2ff27616ab?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width={600} height={400} />
        <Text>Apple</Text>
        <Text slot="description">PNG • 9/2/2021</Text>
      </GridListItem>
      <GridListItem textValue="Peach">
        <img src="https://images.unsplash.com/photo-1642372849486-f88b963cb734?q=80&w=2858&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width={600} height={900} />
        <Text>Peach</Text>
        <Text slot="description">JPEG • 1/16/2022</Text>
      </GridListItem>
      <GridListItem textValue="Blueberry">
        <img src="https://images.unsplash.com/photo-1606757389667-45c2024f9fa4?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width={600} height={900} />
        <Text>Blueberry</Text>
        <Text slot="description">JPEG • 11/30/2020</Text>
      </GridListItem>
    </GridListSection>
    <GridListSection>
      <GridListHeader>Vegetables</GridListHeader>
      <GridListItem textValue="Broccoli">
        <img src="https://images.unsplash.com/photo-1685504445355-0e7bdf90d415?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width={600} height={900} />
        <Text>Broccoli</Text>
        <Text slot="description">PNG • 5/30/2023</Text>
      </GridListItem>
      <GridListItem textValue="Brussels Sprouts">
        <img src="https://images.unsplash.com/photo-1685504507286-dc290728c01a?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width={600} height={900} />
        <Text>Brussels Sprouts</Text>
        <Text slot="description">PNG • 7/3/2021</Text>
      </GridListItem>
      <GridListItem textValue="Peas">
        <img src="https://images.unsplash.com/photo-1587411768345-867e228218c8?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width={600} height={900} />
        <Text>Peas</Text>
        <Text slot="description">PNG • 4/20/2020</Text>
      </GridListItem>
    </GridListSection>
</GridList>);
}


export const title = "GridList: upstream example 7";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{}} {...props} />, element);
}
