import type { JSX } from '@solidjs/web';
import { omit } from 'solid-js';
'use client';
import { DisclosureGroup as AriaDisclosureGroup, type DisclosureGroupProps as AriaDisclosureGroupProps } from 'solid-aria-components';
export interface DisclosureGroupProps extends AriaDisclosureGroupProps {
    children: JSX.Element;
}
export function DisclosureGroup(live0: DisclosureGroupProps) {
    return <AriaDisclosureGroup {...omit(live0, "children")}>{live0.children}</AriaDisclosureGroup>;
}
