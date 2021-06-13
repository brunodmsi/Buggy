import styled from 'styled-components';

interface SelectProps {
  backgroundColor?: string;
  backgroundAffectsColor?: boolean;
}

export const Container = styled.div<SelectProps>`
  .react-select__control {
    display: flex;
    position: relative;
    padding: 10px;
    max-width: 150px;
    width: 150px;
    font-size: 15px;
    font-weight: 900;

    border-radius: 10px;
  }
`;

export const Error = styled.div`
  object-fit: contain;
  font-size: 14px;
  color: #c53030;
`;
