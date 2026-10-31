/** Native SVG transport of lucide-react 0.517.0 icon nodes, ISC license. */
import type {JSX} from '@solidjs/web';
type Props = JSX.SvgSVGAttributes<SVGSVGElement> & {size?: number; className?: string};
function Icon(props: Props) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={props.size ?? 24} height={props.size ?? 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" {...props} class={props.className ?? props.class}>{props.children}</svg>;
}
export function ChevronRight(props: Props) {return <Icon {...props}><path d="m9 18 6-6-6-6" /></Icon>;}
export function AlertTriangle(props: Props) {return <Icon {...props}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><path d="M12 9v4" /><path d="M12 17h.01" /></Icon>;}
export function Check(props: Props) {return <Icon {...props}><path d="M20 6 9 17l-5-5" /></Icon>;}
export function Minus(props: Props) {return <Icon {...props}><path d="M5 12h14" /></Icon>;}
export function Plus(props: Props) {return <Icon {...props}><path d="M5 12h14" /><path d="M12 5v14" /></Icon>;}
export function Settings(props: Props) {return <Icon {...props}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></Icon>;}
