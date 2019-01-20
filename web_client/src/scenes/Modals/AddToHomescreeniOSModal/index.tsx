import React from 'react';
import Modal, { ModalProps } from '../../../components/Modal';
import { AddToHomescreenSection } from '../sections';

export default function AddToHomescreeniOSModal(props: ModalProps) {
  return (
    <Modal {...props}>
      <AddToHomescreenSection />
    </Modal>
  )
}
