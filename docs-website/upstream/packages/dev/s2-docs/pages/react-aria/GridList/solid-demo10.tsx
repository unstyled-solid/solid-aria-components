import {render} from '@solidjs/web';
// Extracted from GridList.mdx render example 10; source content and algorithms retained.
import {GridList, GridListItem, Text} from '../ListBox/native/vanilla/solid-GridList';
import {TextField} from '../ListBox/native/vanilla/solid-TextField';

///- begin collapse -///
let photos = [
  {id: 1, title: 'Desert Sunset', description: 'PNG • 2/3/2024', src: 'https://images.unsplash.com/photo-1705034598432-1694e203cdf3?q=80&w=600&auto=format&fit=crop'},
  {id: 2, title: 'Hiking Trail', description: 'JPEG • 1/10/2022', src: 'https://images.unsplash.com/photo-1722233987129-61dc344db8b6?q=80&w=600&auto=format&fit=crop'},
  {id: 3, title: 'Lion', description: 'JPEG • 8/28/2021', src: 'https://images.unsplash.com/photo-1629812456605-4a044aa38fbc?q=80&w=600&auto=format&fit=crop'},
  {id: 4, title: 'Mountain Sunrise', description: 'PNG • 3/15/2015', src: 'https://images.unsplash.com/photo-1722172118908-1a97c312ce8c?q=80&w=600&auto=format&fit=crop'},
  {id: 5, title: 'Giraffe tongue', description: 'PNG • 11/27/2019', src: 'https://images.unsplash.com/photo-1574870111867-089730e5a72b?q=80&w=600&auto=format&fit=crop'},
  {id: 6, title: 'Golden Hour', description: 'WEBP • 7/24/2024', src: 'https://images.unsplash.com/photo-1718378037953-ab21bf2cf771?q=80&w=600&auto=format&fit=crop'},
];
///- end collapse -///

export default function Demo(props: Record<string, unknown> = {}) {
  return (<GridList
  /*- begin highlight -*/
  keyboardNavigationBehavior="tab"
  /*- end highlight -*/
  items={photos}
  selectionMode="multiple"
  aria-label="Shared files">
  {item => (
    <GridListItem textValue={item.title}>
      <img src={item.src} alt="" />
      <Text>
        <TextField style={{"padding-top": "2px", "padding-bottom": "2px"}} aria-label="title" defaultValue={item.title} placeholder="Enter a title" />
      </Text>
      <Text slot="description">{item.description}</Text>
    </GridListItem>
  )}
</GridList>);
}


export const title = "GridList: upstream example 10";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{}} {...props} />, element);
}
