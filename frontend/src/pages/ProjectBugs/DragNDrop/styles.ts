import styled, { css } from 'styled-components';
import { DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';

interface FooterProps {
  priorityBackColor: string;
}

interface GroupProps {
  isDragging: boolean;
}

interface ItemProps extends GroupProps {
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined;
}

export const Container = styled.div`
  padding: 0.5rem;
  display: grid;
  gap: 2rem;
  min-width: 100%;
  /* height: 100%; */
  grid-template-columns: repeat(auto-fill, 300px);
  align-items: start;
`;

export const GroupWrapper = styled.div`
  > p {
    font-size: 40px;
    font-weight: 900;
    margin-bottom: 10px;
    margin-left: 10px;
  }
`;

export const Group = styled.div<GroupProps>`
  background-color: #f2f4f9;
  border-radius: 12px;
  padding: 0.5rem;

  ${({ isDragging }) =>
    isDragging &&
    css`
      background-color: #c3cfd9;
    `}

  transition: background-color 0.2s;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e5ecf8;
    border: 0;
    margin-top: 10px;
    width: 100%;
    height: 50px;
    color: #2a60e4;
    font-weight: 900;
    font-size: 18px;
    border-radius: 5px;

    svg {
      margin-right: 10px;
      background-color: #2a60e4;
      border-radius: 50%;
      padding: 2px;
      color: #fff;
    }
  }
`;

export const Item = styled.div<ItemProps>`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  justify-content: space-between;
  min-height: 150px;
  border-radius: 5px;
  color: #282c34;
  font-weight: bold;
  padding: 15px;
  text-decoration: none;

  background-color: white;
  ${({ isDragging }) =>
    isDragging &&
    css`
      background-color: #f2f4f9;
    `}

  p {
    font-size: 16px;
    font-weight: 400;
  }

  ${({ draggableStyle }) => css`
    transition: ${draggableStyle?.transition};
    transform: ${draggableStyle?.transform};
  `}

  &:not(:last-of-type) {
    margin-bottom: 0.5rem;
  }
`;

export const Footer = styled.footer<FooterProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    width: 28px;
    height: 28px;
    object-fit: cover;
    border-radius: 50%;

    & + img {
      margin-left: 5px;
    }
  }

  p {
    background-color: ${props => props.priorityBackColor};
    padding: 4px 10px;
    color: #fff;
    border-radius: 4px;
  }
`;
