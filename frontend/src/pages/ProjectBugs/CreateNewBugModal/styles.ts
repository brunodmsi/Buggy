import styled from 'styled-components';
import { shade } from 'polished';
import ModalContainer from '../../../components/Modal';

export const Modal = styled(ModalContainer)`
  color: #27334d;
  width: 700px;
  overflow-y: auto;

  label {
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    input {
      padding: 10px;
      border: 1px solid #d5d5d5;
      border-radius: 10px;
      /* width: 100%; */
    }

    textarea {
      resize: vertical;
      padding: 10px;
      border: 1px solid #d5d5d5;
      border-radius: 10px;
      height: 200px;
    }
  }

  .modal-row {
    display: flex;

    label + label {
      margin-left: 30px;
    }

    button {
      border: 0;
      padding: 5px 30px;
      font-weight: 900;
      font-size: 16px;
      border-radius: 5px;
      height: 50px;
      margin-top: 30px;
      color: #fff;
    }
  }

  .space {
    justify-content: space-between;
  }

  .report {
    background-color: #5751ff;
    transition: background 0.2s;

    &:hover {
      background-color: ${shade(0.1, '#5751FF')};
    }
  }

  .cancel {
    background-color: #d25454;
    transition: background 0.2s;

    &:hover {
      background-color: ${shade(0.1, '#D25454')};
    }
  }
`;
