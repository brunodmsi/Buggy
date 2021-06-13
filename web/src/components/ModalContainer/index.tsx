import React from 'react';
import { useTransition } from 'react-spring';

import Modal from './Modal';
import { Container } from './styles';

interface ModalContainerProps {
  isOpen: boolean;
}

const ModalContainer: React.FC<
  ModalContainerProps & React.HTMLAttributes<HTMLDivElement>
> = ({ isOpen, children, className }) => {
  const modalWithTransition = useTransition(isOpen, {
    from: { opacity: 0, transform: 'scale(0)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0)' },
  });

  return modalWithTransition((styles, item) => (
    <Container>
      {item && (
        <Modal className={className} style={styles}>
          {children}
        </Modal>
      )}
    </Container>
  ));
};

export default ModalContainer;
