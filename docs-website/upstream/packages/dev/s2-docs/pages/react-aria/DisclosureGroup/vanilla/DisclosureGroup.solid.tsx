import type { JSX } from '@solidjs/web';
import { omit } from 'solid-js';
'use client';
import { DisclosureGroup as RACDisclosureGroup, type DisclosureGroupProps } from 'solid-aria-components';
import './DisclosureGroup.css';
export function DisclosureGroup(props: DisclosureGroupProps) {
    return <RACDisclosureGroup {...props}/>;
}
