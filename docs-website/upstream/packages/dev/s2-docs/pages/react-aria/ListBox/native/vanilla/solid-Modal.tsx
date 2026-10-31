import {Modal as RACModal, type ModalOverlayProps} from 'solid-aria-components/Modal';
import './Modal.css';

export function Modal(props: ModalOverlayProps) {
  return <RACModal {...props} />;
}
