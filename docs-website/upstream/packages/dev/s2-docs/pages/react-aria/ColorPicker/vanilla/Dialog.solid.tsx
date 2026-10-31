import type { JSX } from '@solidjs/web';
import { omit } from 'solid-js';
'use client';
import { Dialog as RACDialog, DialogTrigger as RACDialogTrigger, Heading, type DialogProps, type DialogTriggerProps } from 'solid-aria-components';
import './Dialog.css';
export function Dialog(props: DialogProps) {
    return <RACDialog {...props}/>;
}
export function DialogTrigger(props: DialogTriggerProps) {
    return <RACDialogTrigger {...props}/>;
}
export { Heading };
