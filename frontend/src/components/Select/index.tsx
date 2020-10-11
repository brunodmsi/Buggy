import React, { useState } from 'react';

import { Container, Option } from './styles';

interface SelectProps {
  name: string;
  options: {
    label: string;
    value: string;
    backColor?: string;
    selected?: boolean;
  }[];
  backgroundAffectsColor?: boolean;
}

const Select: React.FC<SelectProps> = ({
  name,
  options,
  backgroundAffectsColor = false
}) => {
  const [selected, setSelected] = useState(() => {
    const defaultSelected = options.find(option => option.selected);

    if (defaultSelected) return defaultSelected.value;
    else return ''
  });

  const selectedColor = options.find(option => option.value === selected)?.backColor;

  return (
    <Container
      backgroundColor={selectedColor}
      backgroundAffectsColor={backgroundAffectsColor}
    >
      <select
        name={name}
        defaultValue={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        {options.map(option => (
          <Option
            value={option.value}
            backgroundColor={option.backColor}
          >
            {option.label}
          </Option>
        ))}
      </select>
    </Container>
  )
}

export default Select;
