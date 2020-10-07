import styled from 'styled-components';
import { darken } from 'polished';

interface SelectProps {
  backgroundColor?: string;
  backgroundAffectsColor?: boolean;
}

interface OptionProps {
  backgroundColor?: string;
}

export const Container = styled.div<SelectProps>`
  select {
    display: flex;
    position: relative;
    padding: 10px;
    min-width: 150px;
    background-color: ${({ backgroundColor }) => backgroundColor};
    font-size: 15px;
    font-weight: 900;

    color: #fff;
    color: ${({ backgroundColor, backgroundAffectsColor }) => 
      backgroundAffectsColor && backgroundColor && darken(0.5, backgroundColor)};

    border-radius: 10px;
    border: 0;
    appearance: none;

    background-image:
      linear-gradient(45deg, transparent 50%, white 50%),
      linear-gradient(135deg, white 50%, transparent 50%),
      linear-gradient(to right, #fff, #fff);
    background-position:
      calc(100% - 20px) calc(1em + 2px),
      calc(100% - 15px) calc(1em + 2px),
      calc(100% - 2.5em) 0.5em;
    background-size:
      5px 5px,
      5px 5px,
      1px 1.5em;
    background-repeat: no-repeat;

    &:focus {
      background-image:
        linear-gradient(45deg, white 50%, transparent 50%),
        linear-gradient(135deg, transparent 50%, white 50%),
        linear-gradient(to right, #fff, #fff);
      background-position:
        calc(100% - 15px) 1em,
        calc(100% - 20px) 1em,
        calc(100% - 2.5em) 0.5em;
      background-size:
        5px 5px,
        5px 5px,
        1px 1.5em;
      background-repeat: no-repeat;
      border-color: white;
      outline: 0;
    }
  }
`;

export const Option = styled.option<OptionProps>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 10px;
  border: none;
`;