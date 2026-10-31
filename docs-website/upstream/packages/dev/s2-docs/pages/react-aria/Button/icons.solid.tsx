import type {JSX} from '@solidjs/web';
import {omit} from 'solid-js';

interface IconProps extends Omit<JSX.SVGAttributes<SVGSVGElement>, 'class'> {
  size?: number;
  className?: string;
  class?: string;
}

function Icon(props: IconProps & {name: string}) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={props.size ?? 24} height={props.size ?? 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" {...omit(props, 'size', 'className', 'name')} class={`lucide lucide-${props.name} ${props.className ?? props.class ?? ''}`}>{props.children}</svg>;
}

export function Search(props: IconProps) { return <Icon {...props} name="search"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></Icon>; }
export const SearchIcon = Search;
export function X(props: IconProps) { return <Icon {...props} name="x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></Icon>; }
export const XIcon = X;
export function Minus(props: IconProps) { return <Icon {...props} name="minus"><path d="M5 12h14" /></Icon>; }
export function Plus(props: IconProps) { return <Icon {...props} name="plus"><path d="M12 5v14" /><path d="M5 12h14" /></Icon>; }
export function Check(props: IconProps) { return <Icon {...props} name="check"><path d="m20 6-11 11-5-5" /></Icon>; }
export function ChevronDown(props: IconProps) { return <Icon {...props} name="chevron-down"><path d="m6 9 6 6 6-6" /></Icon>; }
export function ChevronUp(props: IconProps) { return <Icon {...props} name="chevron-up"><path d="m18 15-6-6-6 6" /></Icon>; }
export function Star(props: IconProps) { return <Icon {...props} name="star"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.123 2.123 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.123 2.123 0 0 0 1.597-1.16z" /></Icon>; }
