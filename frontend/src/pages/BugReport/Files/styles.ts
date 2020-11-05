import styled, { css } from 'styled-components';
import ModalContainer from '../../../components/Modal';

interface ContainerProps {
  show: boolean;
}

export const Modal = styled(ModalContainer)`
  display: flex;
  max-width: 800px;
  width: 800px;
  max-height: 900px;
  position: relative;
  overflow-y: scroll;
  overflow-x: hidden;

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
    margin-top: 20px;
    border-spacing: 0;
    border-style: hidden;

    tr {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 20px;

      .td-file-type {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 80px;
        min-width: 80px;
        background-color: #27334d;
        color: #fff;
        font-size: 14px;
        margin-right: 5px;
      }

      .td-file-link {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;

        a {
          display: flex;
          align-items: center;
          width: 100%;
          height: 100%;
          max-width: 650px;
          text-decoration: none;
          font-size: 14px;
          margin: 0 5px 0 5px;
          cursor: pointer;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
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

export const Container = styled.div<ContainerProps>`
  display: flex;

  ${props =>
    !props.show &&
    css`
      display: none;
    `}

  flex-direction: column;
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 25px;

  > section {
    display: flex;
    flex-direction: row;

    div + div {
      margin-left: 4px;
    }

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100px;
      width: 100px;
      background-color: #27334d;
      color: #fff;
      text-decoration: none;

      div p {
        color: #fff;
      }

      img {
        height: 100px;
      }
    }
  }

  .see-more {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    height: 100px;
    width: 100px;
    background-color: #5f30e2;
    border: 0;
    margin-left: 4px;

    p {
      color: #fff;
      font-size: 14px;
    }
  }
`;
