import React from 'react';
import { ModalBody } from './Modal.styles';
import {
  Button as BootstrapButton,
  Modal as BootstrapModal
} from 'reactstrap';
import useIsDaySundialConsumer from '../../util/useIsDaySundialConsumer';

export interface ModalProps {
  children?: React.ReactNode;
  toggle: () => void;
  isOpen: boolean;
}

export default function Modal({ children, toggle, isOpen }: ModalProps) {
  const isDay = useIsDaySundialConsumer();
  return (
    <BootstrapModal
      isOpen={isOpen}
      toggle={toggle}
    >
      <ModalBody>
        <BootstrapButton
          close
          onClick={toggle}
          style={{
            transform: 'translate(.4em, -.75em)',
            transition: 'color 5s linear',
            color: isDay ? 'black' : 'white'
          }}
        />
        {children}
      </ModalBody>
    </BootstrapModal>
  )
}
