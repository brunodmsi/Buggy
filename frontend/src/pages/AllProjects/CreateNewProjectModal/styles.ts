import styled from 'styled-components';
import { Form as WebForm } from '@unform/web';
import ModalContainer from '../../../components/Modal';

export const Container = styled.div``;

export const Modal = styled(ModalContainer)`
  display: flex;
  flex-direction: column;
  max-width: 900px;
  width: 900px;
  position: relative;

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
    background-color: #5f30e2;
  }
`;

export const Form = styled(WebForm)`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  width: 700px;
  margin: 0 auto;
  text-align: left;

  header {
    margin-bottom: 20px;
  }

  label {
    & + label {
      margin-top: 15px;
    }

    p {
      font-weight: 600;
    }
  }

  .required {
    color: #ff3333;
  }

  footer {
    display: flex;
    justify-content: space-between;
  }
`;
