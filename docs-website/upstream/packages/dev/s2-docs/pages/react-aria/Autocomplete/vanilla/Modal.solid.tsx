import type { JSX } from '@solidjs/web';
import { omit } from 'solid-js';
'use client';
import { Modal as RACModal, type ModalOverlayProps } from 'solid-aria-components';
import './Modal.css';
export function Modal(props: ModalOverlayProps) {
    return <RACModal {...props}/>;
}
