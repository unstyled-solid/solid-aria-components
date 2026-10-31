import './demo.css';
import {render} from '@solidjs/web';
// Terminal-copied upstream Virtualizer.mdx, render example 4.
import {Virtualizer, GridLayout} from 'solid-aria-components/Virtualizer';
import {GridList, GridListItem, Text} from '../ListBox/native/vanilla/solid-GridList';

///- begin collapse -///
let albumOptions = [
  {
    image: 'https://images.unsplash.com/photo-1593958812614-2db6a598c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGlzY298ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60',
    title: 'Euphoric Echoes',
    artist: 'Luna Solstice'
  },
  {
    image: 'https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmVvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60',
    title: 'Neon Dreamscape',
    artist: 'Electra Skyline'
  },
  {
    image: 'https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNwYWNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60',
    title: 'Cosmic Serenade',
    artist: 'Orion\'s Symphony'
  },
  {
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bXVzaWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60',
    title: 'Melancholy Melodies',
    artist: 'Violet Mistral'
  },
  {
    image: 'https://images.unsplash.com/photo-1608433319511-dfe8ea4cbd3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJlYXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60',
    title: 'Rhythmic Illusions',
    artist: 'Mirage Beats'
  }
];
///- end collapse -///

type Album = {id: number, image: string, title: string, artist: string};
let albums: Album[] = [];
for (let i = 0; i < 1000; i++) {
  albums.push({
    id: i,
    ...albumOptions[i % albumOptions.length]
  })
}

function Example(props: Record<string, unknown>) {
  return (
    <div class="resizable">
      <Virtualizer
        /*- begin highlight -*/
        layout={GridLayout}
        {...props}
        {...props}>
        {/*- end highlight -*/}
        <GridList
          /*- begin highlight -*/
          layout="grid"
          /*- end highlight -*/
          aria-label="Virtualized grid layout"
          selectionMode="multiple"
          items={albums}
          data-size="small"
          style={{display: 'block', padding: 0, height: "300px", width: '100%'}}>
          {item => (
            <GridListItem textValue={item.title} style={{height: '100%'}}>
              <img src={item.image} alt="" />
              <Text>{item.title}</Text>
              <Text slot="description">{item.artist}</Text>
            </GridListItem>
          )}
        </GridList>
      </Virtualizer>
    </div>
  );
}

const Demo = Example;
export default Demo;

export const title = 'Virtualizer: upstream example 4';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void { return render(() => <Demo {...{layoutOptions: {minItemSize:{width:100,height:140},minSpace:{width:8,height:8}}}} {...props} />, element); }
