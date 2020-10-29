import styled from 'styled-components';
import { shade } from 'polished';
import ModalComponent from '../../components/Modal';

export const Container = styled.div`
  width: 100%;

  header {
    display: flex;
    justify-content: space-between;

    section {
      display: flex;
      align-items: center;

      h1 {
        font-size: 40px;
        font-weight: 800;
        margin-left: 5px;
      }
    }
  }
`;

export const Modal = styled(ModalComponent)`
  color: #27334D;
  width: 700px;
  overflow-y: auto;

  label {
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    input {
      padding: 10px;
      border: 1px solid #D5D5D5;
      border-radius: 10px;
      /* width: 100%; */
    }

    textarea {
      resize: vertical;
      padding: 10px;
      border: 1px solid #D5D5D5;
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
    background-color: #5751FF;
    transition: background .2s;

    &:hover {
      background-color: ${shade(0.1, '#5751FF')};
    }
  }

  .cancel {
    background-color: #D25454;
    transition: background .2s;

    &:hover {
      background-color: ${shade(0.1, '#D25454')};
    }
  }
`;
