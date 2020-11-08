import styled from 'styled-components';
import ModalContainer from '../../../../components/ModalContainer';

export const Modal = styled(ModalContainer)`
  display: flex;
  flex-direction: column;
  max-width: 900px;
  width: 900px;
  position: relative;

  form {
    display: flex;
    flex-direction: column;
  }

  .close-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -10px;
    right: -10px;
    height: 36px;
    width: 36px;
    border-radius: 50%;
    border: 0;
    background-color: #c53030;
  }
`;
