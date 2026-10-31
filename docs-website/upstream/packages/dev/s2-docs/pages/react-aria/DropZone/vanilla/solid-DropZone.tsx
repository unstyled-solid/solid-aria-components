import {createSignal, Show, omit, flush} from 'solid-js';
import type {JSX} from '@solidjs/web';
'use client';

import { type DropZoneProps, DropZone as RACDropZone, Text } from "solid-aria-components/DropZone";
import './DropZone.css';
export function DropZone(props: DropZoneProps) {
  return <RACDropZone {...props} />;
}
export { Text };
