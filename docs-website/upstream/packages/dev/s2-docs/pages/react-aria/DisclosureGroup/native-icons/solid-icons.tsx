/** Native SVG adaptation of lucide-react 0.517.0; exact upstream icon nodes, ISC license. */
import { omit } from 'solid-js';
import type { JSX } from '@solidjs/web';
export type IconProps = Omit<JSX.IntrinsicElements['svg'], 'children' | 'class'> & {
    size?: number | string;
    color?: string;
    strokeWidth?: number | string;
    absoluteStrokeWidth?: boolean;
    className?: string;
    class?: string;
    children?: JSX.Element;
};
const toKebabCase = (string: string) => string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
const toCamelCase = (string: string) => string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase());
const toPascalCase = (string: string) => { const camelCase = toCamelCase(string); return camelCase.charAt(0).toUpperCase() + camelCase.slice(1); };
const mergeClasses = (...classes: (string | undefined)[]) => classes.filter((className, index, array) => Boolean(className) && className!.trim() !== '' && array.indexOf(className) === index).join(' ').trim();
const hasA11yProp = (props: object) => {
    for (const prop in props) {
        if (prop.startsWith('aria-') || prop === 'role' || prop === 'title')
            return true;
    }
};
function NativeIcon(props: IconProps & {
    name: string;
    original: IconProps;
    children: JSX.Element;
}) {
    const rest = omit(props, 'size', 'color', 'strokeWidth', 'absoluteStrokeWidth', 'className', 'class', 'children', 'name', 'original');
    return <svg xmlns="http://www.w3.org/2000/svg" width={props.size ?? 24} height={props.size ?? 24} viewBox="0 0 24 24" fill="none" stroke={props.color ?? 'currentColor'} stroke-width={props.absoluteStrokeWidth ? Number(props.strokeWidth ?? 2) * 24 / Number(props.size ?? 24) : props.strokeWidth ?? 2} stroke-linecap="round" stroke-linejoin="round" class={mergeClasses('lucide', mergeClasses(`lucide-${toKebabCase(toPascalCase(props.name))}`, `lucide-${props.name}`, props.className ?? props.class))} aria-hidden={!props.original.children && !hasA11yProp(rest) ? 'true' : undefined} {...rest}>{props.children}</svg>;
}
export function ArrowUp(props: IconProps) { return <NativeIcon {...props} original={props} name="arrow-up"><><path d={"m5 12 7-7 7 7"}/><path d={"M12 19V5"}/>{props.children}</></NativeIcon>; }
export function Bold(props: IconProps) { return <NativeIcon {...props} original={props} name="bold"><><path d={"M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"}/>{props.children}</></NativeIcon>; }
export function Check(props: IconProps) { return <NativeIcon {...props} original={props} name="check"><><path d={"M20 6 9 17l-5-5"}/>{props.children}</></NativeIcon>; }
export function ChevronDown(props: IconProps) { return <NativeIcon {...props} original={props} name="chevron-down"><><path d={"m6 9 6 6 6-6"}/>{props.children}</></NativeIcon>; }
export function ChevronRight(props: IconProps) { return <NativeIcon {...props} original={props} name="chevron-right"><><path d={"m9 18 6-6-6-6"}/>{props.children}</></NativeIcon>; }
export function ChevronUp(props: IconProps) { return <NativeIcon {...props} original={props} name="chevron-up"><><path d={"m18 15-6-6-6 6"}/>{props.children}</></NativeIcon>; }
export function ClipboardCopy(props: IconProps) { return <NativeIcon {...props} original={props} name="clipboard-copy"><><rect width={"8"} height={"4"} x={"8"} y={"2"} rx={"1"} ry={"1"}/><path d={"M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"}/><path d={"M16 4h2a2 2 0 0 1 2 2v4"}/><path d={"M21 14H11"}/><path d={"m15 10-4 4 4 4"}/>{props.children}</></NativeIcon>; }
export function ClipboardPaste(props: IconProps) { return <NativeIcon {...props} original={props} name="clipboard-paste"><><path d={"M11 14h10"}/><path d={"M16 4h2a2 2 0 0 1 2 2v1.344"}/><path d={"m17 18 4-4-4-4"}/><path d={"M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113"}/><rect x={"8"} y={"2"} width={"8"} height={"4"} rx={"1"}/>{props.children}</></NativeIcon>; }
export function Copy(props: IconProps) { return <NativeIcon {...props} original={props} name="copy"><><rect width={"14"} height={"14"} x={"8"} y={"8"} rx={"2"} ry={"2"}/><path d={"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}/>{props.children}</></NativeIcon>; }
export function Dot(props: IconProps) { return <NativeIcon {...props} original={props} name="dot"><><circle cx={"12.1"} cy={"12.1"} r={"1"}/>{props.children}</></NativeIcon>; }
export function Edit(props: IconProps) { return <NativeIcon {...props} original={props} name="square-pen"><><path d={"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}/><path d={"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"}/>{props.children}</></NativeIcon>; }
export function Ellipsis(props: IconProps) { return <NativeIcon {...props} original={props} name="ellipsis"><><circle cx={"12"} cy={"12"} r={"1"}/><circle cx={"19"} cy={"12"} r={"1"}/><circle cx={"5"} cy={"12"} r={"1"}/>{props.children}</></NativeIcon>; }
export function FolderOpen(props: IconProps) { return <NativeIcon {...props} original={props} name="folder-open"><><path d={"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"}/>{props.children}</></NativeIcon>; }
export function GripVertical(props: IconProps) { return <NativeIcon {...props} original={props} name="grip-vertical"><><circle cx={"9"} cy={"12"} r={"1"}/><circle cx={"9"} cy={"5"} r={"1"}/><circle cx={"9"} cy={"19"} r={"1"}/><circle cx={"15"} cy={"12"} r={"1"}/><circle cx={"15"} cy={"5"} r={"1"}/><circle cx={"15"} cy={"19"} r={"1"}/>{props.children}</></NativeIcon>; }
export function Instagram(props: IconProps) { return <NativeIcon {...props} original={props} name="instagram"><><rect width={"20"} height={"20"} x={"2"} y={"2"} rx={"5"} ry={"5"}/><path d={"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"}/><line x1={"17.5"} x2={"17.51"} y1={"6.5"} y2={"6.5"}/>{props.children}</></NativeIcon>; }
export function Italic(props: IconProps) { return <NativeIcon {...props} original={props} name="italic"><><line x1={"19"} x2={"10"} y1={"4"} y2={"4"}/><line x1={"14"} x2={"5"} y1={"20"} y2={"20"}/><line x1={"15"} x2={"9"} y1={"4"} y2={"20"}/>{props.children}</></NativeIcon>; }
export function Mail(props: IconProps) { return <NativeIcon {...props} original={props} name="mail"><><path d={"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"}/><rect x={"2"} y={"4"} width={"20"} height={"16"} rx={"2"}/>{props.children}</></NativeIcon>; }
export function Minus(props: IconProps) { return <NativeIcon {...props} original={props} name="minus"><><path d={"M5 12h14"}/>{props.children}</></NativeIcon>; }
export function MoreHorizontal(props: IconProps) { return <NativeIcon {...props} original={props} name="ellipsis"><><circle cx={"12"} cy={"12"} r={"1"}/><circle cx={"19"} cy={"12"} r={"1"}/><circle cx={"5"} cy={"12"} r={"1"}/>{props.children}</></NativeIcon>; }
export function Pencil(props: IconProps) { return <NativeIcon {...props} original={props} name="pencil"><><path d={"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}/><path d={"m15 5 4 4"}/>{props.children}</></NativeIcon>; }
export function Plus(props: IconProps) { return <NativeIcon {...props} original={props} name="plus"><><path d={"M5 12h14"}/><path d={"M12 5v14"}/>{props.children}</></NativeIcon>; }
export function Save(props: IconProps) { return <NativeIcon {...props} original={props} name="save"><><path d={"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"}/><path d={"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"}/><path d={"M7 3v4a1 1 0 0 0 1 1h7"}/>{props.children}</></NativeIcon>; }
export function Scissors(props: IconProps) { return <NativeIcon {...props} original={props} name="scissors"><><circle cx={"6"} cy={"6"} r={"3"}/><path d={"M8.12 8.12 12 12"}/><path d={"M20 4 8.12 15.88"}/><circle cx={"6"} cy={"18"} r={"3"}/><path d={"M14.8 14.8 20 20"}/>{props.children}</></NativeIcon>; }
export function Search(props: IconProps) { return <NativeIcon {...props} original={props} name="search"><><path d={"m21 21-4.34-4.34"}/><circle cx={"11"} cy={"11"} r={"8"}/>{props.children}</></NativeIcon>; }
export function Settings2(props: IconProps) { return <NativeIcon {...props} original={props} name="settings-2"><><path d={"M14 17H5"}/><path d={"M19 7h-9"}/><circle cx={"17"} cy={"17"} r={"3"}/><circle cx={"7"} cy={"7"} r={"3"}/>{props.children}</></NativeIcon>; }
export function Share(props: IconProps) { return <NativeIcon {...props} original={props} name="share"><><path d={"M12 2v13"}/><path d={"m16 6-4-4-4 4"}/><path d={"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"}/>{props.children}</></NativeIcon>; }
export function Smartphone(props: IconProps) { return <NativeIcon {...props} original={props} name="smartphone"><><rect width={"14"} height={"20"} x={"5"} y={"2"} rx={"2"} ry={"2"}/><path d={"M12 18h.01"}/>{props.children}</></NativeIcon>; }
export function Strikethrough(props: IconProps) { return <NativeIcon {...props} original={props} name="strikethrough"><><path d={"M16 4H9a3 3 0 0 0-2.83 4"}/><path d={"M14 12a4 4 0 0 1 0 8H6"}/><line x1={"4"} x2={"20"} y1={"12"} y2={"12"}/>{props.children}</></NativeIcon>; }
export function Trash(props: IconProps) { return <NativeIcon {...props} original={props} name="trash"><><path d={"M3 6h18"}/><path d={"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}/><path d={"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"}/>{props.children}</></NativeIcon>; }
export function Underline(props: IconProps) { return <NativeIcon {...props} original={props} name="underline"><><path d={"M6 4v6a6 6 0 0 0 12 0V4"}/><line x1={"4"} x2={"20"} y1={"20"} y2={"20"}/>{props.children}</></NativeIcon>; }
export function X(props: IconProps) { return <NativeIcon {...props} original={props} name="x"><><path d={"M18 6 6 18"}/><path d={"m6 6 12 12"}/>{props.children}</></NativeIcon>; }
export function XIcon(props: IconProps) { return <NativeIcon {...props} original={props} name="x"><><path d={"M18 6 6 18"}/><path d={"m6 6 12 12"}/>{props.children}</></NativeIcon>; }
