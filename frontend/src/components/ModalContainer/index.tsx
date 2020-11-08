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
  const modalWithTransition = useTransition(isOpen, null, {
    from: { opacity: 0, transform: 'scale(0)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0)' },
  });

  return (
    <Container>
      {modalWithTransition.map(
        ({ item, key, props: style }) =>
          item && (
            <Modal className={className} key={key} style={style}>
              {children}
            </Modal>
          ),
      )}
    </Container>
  );
};

export default ModalContainer;
