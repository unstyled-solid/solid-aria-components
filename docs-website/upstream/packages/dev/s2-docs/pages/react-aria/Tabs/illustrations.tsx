// Literal upstream medium-size illustration assets, without a React illustration owner.
import type {JSX} from '@solidjs/web';
import home from 'url:./assets/S2_fill_home_generic2_96.svg';
import folder from 'url:./assets/S2_fill_folderOpen_generic2_96.svg';
import search from 'url:./assets/S2_fill_search_generic2_96.svg';
import settings from 'url:./assets/S2_fill_gearSetting_generic1_96.svg';
type Props = JSX.ImgHTMLAttributes<HTMLImageElement>;
export function Home(props: Props) {return <img width="96" height="96" alt="" {...props} src={home} />;}
export function Folder(props: Props) {return <img width="96" height="96" alt="" {...props} src={folder} />;}
export function Search(props: Props) {return <img width="96" height="96" alt="" {...props} src={search} />;}
export function Settings(props: Props) {return <img width="96" height="96" alt="" {...props} src={settings} />;}
