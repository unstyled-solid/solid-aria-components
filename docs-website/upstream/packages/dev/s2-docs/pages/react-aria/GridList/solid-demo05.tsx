import {render} from '@solidjs/web';
// Extracted from GridList.mdx render example 5; source content and algorithms retained.
import {GridList, GridListItem, Text} from '../ListBox/native/vanilla/solid-GridList';

///- begin collapse -///
let images = [
  {
    id: "dxylfBs2Xzc",
    title: "Tropical island",
    image: "https://images.unsplash.com/photo-1757258632083-e9b8a5345047?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDA4NDh8MHwxfHRvcGljfHw2c01WalRMU2tlUXx8fHx8Mnx8MTc2MDYyMjY4NHw&ixlib=rb-4.1.0&q=80&w=1080",
    width: 5464,
    height: 3640,
    href: "https://unsplash.com/photos/aerial-view-of-a-tropical-island-coastline-with-clear-blue-water-dxylfBs2Xzc"
  },
  {
    id: "xloDEfz0X7g",
    title: "Bryce Canyon",
    image: "https://images.unsplash.com/photo-1759872409669-05565abbb575?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDA4NDh8MHwxfHRvcGljfHw2c01WalRMU2tlUXx8fHx8Mnx8MTc2MDYyMjY4NHw&ixlib=rb-4.1.0&q=80&w=1080",
    width: 4032,
    height: 3024,
    href: "https://unsplash.com/photos/orange-rock-formations-with-green-trees-and-blue-sky-xloDEfz0X7g"
  },
  {
    id: "oTBY78rZcEU",
    title: "Snowy river",
    image: "https://images.unsplash.com/photo-1735577561802-380c3afb0146?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDA4NDh8MHwxfHRvcGljfHw2c01WalRMU2tlUXx8fHx8Mnx8MTc2MDYyMjY4NHw&ixlib=rb-4.1.0&q=80&w=1080",
    width: 3264,
    height: 4896,
    href: "https://unsplash.com/photos/a-river-surrounded-by-snow-covered-trees-and-mountains-oTBY78rZcEU"
  },
  {
    id: "Go811IU9a2g",
    title: "Ocean waves",
    image: "https://images.unsplash.com/photo-1759997604062-c31f20012ac1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDA4NDh8MHwxfHRvcGljfHw2c01WalRMU2tlUXx8fHx8Mnx8MTc2MDYyMjY4NHw&ixlib=rb-4.1.0&q=80&w=1080",
    width: 5250,
    height: 3500,
    href: "https://unsplash.com/photos/a-large-wave-crashes-on-a-sandy-beach-Go811IU9a2g"
  },
  {
    id: "B0mydNIV-sI",
    title: "Mount Kazbek at Dawn",
    image: "https://images.unsplash.com/photo-1760464864365-2188cd2afcde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDA4NDh8MHwxfHRvcGljfHw2c01WalRMU2tlUXx8fHx8Mnx8MTc2MDYyMjY4NHw&ixlib=rb-4.1.0&q=80&w=1080",
    width: 3947,
    height: 5920,
    href: "https://unsplash.com/photos/snow-capped-mountain-peak-illuminated-by-sunrise-B0mydNIV-sI"
  },
  {
    id: "IHfbPJYsnsI",
    title: "Snowy mountain sunrise",
    image: "https://images.unsplash.com/photo-1759675795062-a657fcb278b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDA4NDh8MHwxfHRvcGljfHw2c01WalRMU2tlUXx8fHx8Mnx8MTc2MDYyMjY4NHw&ixlib=rb-4.1.0&q=80&w=1080",
    width: 5794,
    height: 3360,
    href: "https://unsplash.com/photos/snowy-mountains-rise-from-the-ocean-at-sunrise-IHfbPJYsnsI"
  },
  {
    id: "mmcSaJrRuCM",
    title: "Mount Blum",
    image: "https://images.unsplash.com/photo-1760301269447-fbc82b5a8d14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDA4NDh8MHwxfHRvcGljfHw2c01WalRMU2tlUXx8fHx8Mnx8MTc2MDYyMjY4NHw&ixlib=rb-4.1.0&q=80&w=1080",
    width: 5862,
    height: 4000,
    href: "https://unsplash.com/photos/majestic-mountain-peak-illuminated-by-sunrise-light-mmcSaJrRuCM"
  },
  {
    id: "SSpEIUBRG9s",
    title: "Sunset",
    image: "https://images.unsplash.com/photo-1760199025509-2ecc68d39acd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDA4NDh8MHwxfHRvcGljfHw2c01WalRMU2tlUXx8fHx8Mnx8MTc2MDYyMjY4NHw&ixlib=rb-4.1.0&q=80&w=1080",
    width: 6000,
    height: 4000,
    href: "https://unsplash.com/photos/silhouette-of-trees-and-plants-against-a-sunset-sky-SSpEIUBRG9s"
  }
];
///- end collapse -///

export default function Demo(props: Record<string, unknown> = {}) {
  return (<GridList layout="grid" items={images}{...props}>
  {image => (
    <GridListItem
      /*- begin highlight -*/
      href={image.href}
      target="_blank"
      /*- end highlight -*/
      textValue={image.title}>
      <img src={image.image} width={image.width} height={image.height} alt="" />
      <Text>{image.title}</Text>
    </GridListItem>
  )}
</GridList>);
}


export const title = "GridList: upstream example 5";
export function mount(element: HTMLElement, props: Record<string, unknown> = {}): () => void {
  return render(() => <Demo {...{'aria-label': 'Links', selectionMode: 'multiple'}} {...props} />, element);
}
