import { render } from '@solidjs/web';
import { Autocomplete, useFilter } from 'solid-aria-components';
import { GridList, GridListItem, Text } from './vanilla/GridList.solid';
import { SearchField } from './vanilla/SearchField.solid';
///- begin collapse -///
let images = [
    {
        id: "8SXaMMWCTGc",
        title: "A Ficus Lyrata Leaf",
        user: "Clay Banks",
        image: "https://images.unsplash.com/photo-1580133318324-f2f76d987dd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDA4NDh8MHwxfHRvcGljfHw2c01WalRMU2tlUXx8fHx8Mnx8MTczODM2NzE4M3w&ixlib=rb-4.0.3&q=80&w=400",
        width: 400,
        height: 600
    },
    {
        id: "pYjCqqDEOFo",
        title: "Italian beach",
        user: "Alan Bajura",
        image: "https://images.unsplash.com/photo-1737100522891-e8946ac97fd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDA4NDh8MHwxfHRvcGljfHw2c01WalRMU2tlUXx8fHx8Mnx8MTczODM2NzE4M3w&ixlib=rb-4.0.3&q=80&w=400",
        width: 400,
        height: 600
    },
    {
        id: "CF-2tl6MQj0",
        title: "Forest road",
        user: "Artem Stoliar",
        image: "https://images.unsplash.com/photo-1738249034651-1896f689be58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDA4NDh8MHwxfHRvcGljfHw2c01WalRMU2tlUXx8fHx8Mnx8MTczODM2NzE4M3w&ixlib=rb-4.0.3&q=80&w=400",
        width: 400,
        height: 300
    },
    {
        id: "OW97sLU0cOw",
        title: "Snowy Aurora",
        user: "Janosch Diggelmann",
        image: "https://images.unsplash.com/photo-1738189669835-61808a9d5981?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDA4NDh8MHwxfHRvcGljfHw2c01WalRMU2tlUXx8fHx8Mnx8MTczODM2NzE4M3w&ixlib=rb-4.0.3&q=80&w=400",
        width: 400,
        height: 600
    },
    {
        id: "WfeLZ02IhkM",
        title: "A blue and white firework is seen from above",
        user: "Janosch Diggelmann",
        image: "https://images.unsplash.com/photo-1738168601630-1c1f3ef5a95a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDA4NDh8MHwxfHRvcGljfHw2c01WalRMU2tlUXx8fHx8Mnx8MTczODM2NzE4M3w&ixlib=rb-4.0.3&q=80&w=400",
        width: 400,
        height: 300
    },
    {
        id: "w1GpST72Bg8",
        title: "Snowy Mountain",
        user: "Daniil Silantev",
        image: "https://images.unsplash.com/photo-1738165170747-ecc6e3a4d97c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDA4NDh8MHwxfHRvcGljfHw2c01WalRMU2tlUXx8fHx8Mnx8MTczODM2NzE4M3w&ixlib=rb-4.0.3&q=80&w=400",
        width: 400,
        height: 267
    },
    {
        id: "0iN0KIt6lYI",
        title: "Pastel Sunset",
        user: "Marek Piwnicki",
        image: "https://images.unsplash.com/photo-1737917818689-f3b3708de5d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDA4NDh8MHwxfHRvcGljfHw2c01WalRMU2tlUXx8fHx8Mnx8MTczODM2NzE4M3w&ixlib=rb-4.0.3&q=80&w=400",
        width: 400,
        height: 640
    },
    {
        id: "-mFKPfXXUG0",
        title: "Snowy Birches",
        user: "Simon Berger",
        image: "https://images.unsplash.com/photo-1737972970322-cc2e255021bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDA4NDh8MHwxfHRvcGljfHw2c01WalRMU2tlUXx8fHx8Mnx8MTczODM2NzE4M3w&ixlib=rb-4.0.3&q=80&w=400",
        width: 400,
        height: 400
    },
    {
        id: "y36Nj_edtRE",
        title: "Snowy Lake Reflections",
        user: "Daniel Seßler",
        image: "https://images.unsplash.com/photo-1736018545810-3de4c7ec25fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDA4NDh8MHwxfHRvcGljfHw2c01WalRMU2tlUXx8fHx8Mnx8MTczODM2NzE4M3w&ixlib=rb-4.0.3&q=80&w=400",
        width: 400,
        height: 600
    },
    {
        id: "NvBV-YwlgBw",
        title: "Rocky night sky",
        user: "Dennis Haug",
        image: "https://images.unsplash.com/photo-1735528655501-cf671a3323c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDA4NDh8MHwxfHRvcGljfHw2c01WalRMU2tlUXx8fHx8Mnx8MTczODM2NzE4M3w&ixlib=rb-4.0.3&q=80&w=400",
        width: 400,
        height: 400
    },
    {
        id: "UthQdrPFxt0",
        title: "A pine tree covered in snow in a forest",
        user: "Anita Austvika",
        image: "https://images.unsplash.com/photo-1737312905026-5dfdff1097bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDA4NDh8MHwxfHRvcGljfHw2c01WalRMU2tlUXx8fHx8Mnx8MTczODM2NzE4M3w&ixlib=rb-4.0.3&q=80&w=400",
        width: 400,
        height: 600
    },
    {
        id: "2k74xaf8dfc",
        title: "The sun shines through the trees in the forest",
        user: "Joyce G",
        image: "https://images.unsplash.com/photo-1736185597807-371cae1c7e4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDA4NDh8MHwxfHRvcGljfHw2c01WalRMU2tlUXx8fHx8Mnx8MTczODM2NzE4M3w&ixlib=rb-4.0.3&q=80&w=400",
        width: 400,
        height: 600
    },
    {
        id: "Yje5kgfvCm0",
        title: "A blurry photo of a field of flowers",
        user: "Eugene Golovesov",
        image: "https://images.unsplash.com/photo-1736483065204-e55e62092780?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDA4NDh8MHwxfHRvcGljfHw2c01WalRMU2tlUXx8fHx8Mnx8MTczODM2NzE4M3w&ixlib=rb-4.0.3&q=80&w=400",
        width: 400,
        height: 600
    },
    {
        id: "G2bsj2LVttI",
        title: "A foggy road lined with trees and grass",
        user: "Ingmar H",
        image: "https://images.unsplash.com/photo-1737903071772-4d20348b4d81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDA4NDh8MHwxfHRvcGljfHw2c01WalRMU2tlUXx8fHx8Mnx8MTczODM2NzE4M3w&ixlib=rb-4.0.3&q=80&w=400",
        width: 400,
        height: 533
    },
    {
        id: "ppyNBOkfiuY",
        title: "A close up of a green palm tree",
        user: "Junel Mujar",
        image: "https://images.unsplash.com/photo-1736849544918-6ddb5cfc2c42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDA4NDh8MHwxfHRvcGljfHw2c01WalRMU2tlUXx8fHx8Mnx8MTczODM2NzE4M3w&ixlib=rb-4.0.3&q=80&w=400",
        width: 400,
        height: 533
    },
    {
        id: "UcWUMqIsld8",
        title: "A green leaf floating on top of a body of water",
        user: "Allec Gomes",
        image: "https://images.unsplash.com/photo-1737559217439-a5703e9b65cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDA4NDh8MHwxfHRvcGljfHw2c01WalRMU2tlUXx8fHx8Mnx8MTczODM2NzE4M3w&ixlib=rb-4.0.3&q=80&w=400",
        width: 400,
        height: 600
    },
    {
        id: "xHqOVq9w8OI",
        title: "Leafy plants",
        user: "Joshua Michaels",
        image: "https://images.unsplash.com/photo-1563364664-399838d1394c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDA4NDh8MHwxfHRvcGljfHw2c01WalRMU2tlUXx8fHx8Mnx8MTczODM2NzE4M3w&ixlib=rb-4.0.3&q=80&w=400",
        width: 400,
        height: 266
    },
    {
        id: "uWx3_XEc-Jw",
        title: "A view of a mountain covered in fog",
        user: "iuliu illes",
        image: "https://images.unsplash.com/photo-1737403428945-c584529b7b17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDA4NDh8MHwxfHRvcGljfHw2c01WalRMU2tlUXx8fHx8Mnx8MTczODM2NzE4M3w&ixlib=rb-4.0.3&q=80&w=400",
        width: 400,
        height: 298
    },
    {
        id: "2_3lhGt8i-Y",
        title: "A field with tall grass and fog in the background",
        user: "Ingmar H",
        image: "https://images.unsplash.com/photo-1737439987404-a3ee9fb95351?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDA4NDh8MHwxfHRvcGljfHw2c01WalRMU2tlUXx8fHx8Mnx8MTczODM2NzE4M3w&ixlib=rb-4.0.3&q=80&w=400",
        width: 400,
        height: 600
    },
    {
        id: "FV-__IOxb08",
        title: "A close up of a wave on a sandy beach",
        user: "Jonathan Borba",
        image: "https://images.unsplash.com/photo-1726502102472-2108ef2a5cae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDA4NDh8MHwxfHRvcGljfHw2c01WalRMU2tlUXx8fHx8Mnx8MTczODM2NzE4M3w&ixlib=rb-4.0.3&q=80&w=400",
        width: 400,
        height: 600
    },
    {
        id: "_BS-vK3boOU",
        title: "Desert textures",
        user: "Braden Jarvis",
        image: "https://images.unsplash.com/photo-1722359546494-8e3a00f88e95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDA4NDh8MHwxfHRvcGljfHw2c01WalRMU2tlUXx8fHx8Mnx8MTczODM2NzE4M3w&ixlib=rb-4.0.3&q=80&w=400",
        width: 400,
        height: 561
    },
    {
        id: "LjAcS9lJdBg",
        title: "Tew Falls, waterfall, in Hamilton, Canada.",
        user: "Andre Portolesi",
        image: "https://images.unsplash.com/photo-1705021246536-aecfad654893?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDA4NDh8MHwxfHRvcGljfHw2c01WalRMU2tlUXx8fHx8Mnx8MTczODM2NzE4M3w&ixlib=rb-4.0.3&q=80&w=400",
        width: 400,
        height: 500
    },
    {
        id: "hlj6xJG30FE",
        title: "Cave light rays",
        user: "Intricate Explorer",
        image: "https://images.unsplash.com/photo-1631641551473-fbe46919289d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDA4NDh8MHwxfHRvcGljfHw2c01WalRMU2tlUXx8fHx8Mnx8MTczODM2NzE4M3w&ixlib=rb-4.0.3&q=80&w=400",
        width: 400,
        height: 267
    },
    {
        id: "vMoZvKeZOhw",
        title: "Salt Marshes, Isle of Harris, Scotland",
        user: "Nils Leonhardt",
        image: "https://images.unsplash.com/photo-1585951301678-8fd6f3b32c7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDA4NDh8MHwxfHRvcGljfHw2c01WalRMU2tlUXx8fHx8Mnx8MTczODM2NzE4M3w&ixlib=rb-4.0.3&q=80&w=400",
        width: 400,
        height: 600
    },
    {
        id: "wCLCK9LDDjI",
        title: "An aerial view of a snow covered forest",
        user: "Lukas Hädrich",
        image: "https://images.unsplash.com/photo-1737405555489-78b3755eaa81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDA4NDh8MHwxfHRvcGljfHw2c01WalRMU2tlUXx8fHx8Mnx8MTczODM2NzE4M3w&ixlib=rb-4.0.3&q=80&w=400",
        width: 400,
        height: 267
    },
    {
        id: "OdDx3_NB-Wk",
        title: "Tall grass",
        user: "Ingmar H",
        image: "https://images.unsplash.com/photo-1737301519296-062cd324dbfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDA4NDh8MHwxfHRvcGljfHw2c01WalRMU2tlUXx8fHx8Mnx8MTczODM2NzE4M3w&ixlib=rb-4.0.3&q=80&w=400",
        width: 400,
        height: 600
    },
    {
        id: "Gn-FOw1geFc",
        title: "Larches on Maple Pass, Washington",
        user: "Noelle",
        image: "https://images.unsplash.com/photo-1737496538329-a59d10148a08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDA4NDh8MHwxfHRvcGljfHw2c01WalRMU2tlUXx8fHx8Mnx8MTczODM2NzE4M3w&ixlib=rb-4.0.3&q=80&w=400",
        width: 400,
        height: 600
    },
    {
        id: "VhKJHOz2tJ8",
        title: "Heart Nebula",
        user: "Arnaud Girault",
        image: "https://images.unsplash.com/photo-1737478598284-b9bc11cb1e9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDA4NDh8MHwxfHRvcGljfHw2c01WalRMU2tlUXx8fHx8Mnx8MTczODM2NzE4M3w&ixlib=rb-4.0.3&q=80&w=400",
        width: 400,
        height: 266
    }
];
///- end collapse -///
function Example() {
    let { contains } = useFilter({ sensitivity: 'base' });
    return (
    /*- begin highlight -*/
    <Autocomplete filter={contains}>
      {/*- end highlight -*/}
      <SearchField aria-label="Search photos" placeholder="Search photos" style={{ "margin-bottom": "8px", "margin-inline-start": "12px", "margin-inline-end": 'auto' }}/>
      <GridList aria-label="Nature photos" data-size="small" selectionMode="multiple" renderEmptyState={() => 'No results.'} items={images}>
        {(image) => (<GridListItem textValue={image.title}>
            <img src={image.image} width={image.width} height={image.height}/>
            <Text>{image.title}</Text>
            <Text slot="description">By {image.user}</Text>
          </GridListItem>)}
      </GridList>
    </Autocomplete>);
}
export const title = 'Autocomplete example 7';
export function mount(element: HTMLElement, props: Record<string, unknown> = {}) { return render(() => <Example {...props}/>, element); }
