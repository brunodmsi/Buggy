import styled from 'styled-components';
import ModalContainer from '../../../components/Modal';

export const Modal = styled(ModalContainer)`
  display: flex;
  max-width: 800px;
  width: 800px;
  max-height: 900px;
  position: relative;
  overflow-y: scroll;
  overflow-x: hidden;
  margin-right: 40px;

  .close-button {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0px;
    left: 0px;
    height: 36px;
    width: 36px;
    border-radius: 50%;
    border: 0;
    background-color: #5f30e2;
  }

  table {
    display: inline-block;
    max-height: 80%;
    width: 100%;
    margin-top: 20px;
    border-spacing: 0;
    border-style: hidden;

    tr {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 20px;

      .td-dev-img {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 14px;
        margin-right: 5px;

        img {
          border-radius: 5px;
          object-fit: cover;
          height: 80px;
          width: 80px;
        }
      }

      .td-dev-email {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
      }

      .td-dev-name {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        margin-left: 10px;
      }

      .td-delete {
        display: flex;
        align-items: center;
        justify-content: center;

        button {
          display: flex;
          justify-content: center;
          align-items: center;
          border: 0;
          background: #c53030;
          width: 40px;
          height: 40px;
        }
      }
    }
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  section {
    display: flex;

    img {
      object-fit: cover;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      margin-right: 4px;
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #e5ecf8;
      border: 0;
      background-color: #5f30e2;
      border-radius: 50%;
      height: 35px;
      width: 35px;

      svg {
        color: #fff;
      }
    }
  }
`;
