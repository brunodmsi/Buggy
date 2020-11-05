import React, { useEffect, useRef, InputHTMLAttributes } from 'react';
import { useField } from '@unform/core';

import { Container, Label } from './styles';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  options: Array<{
    id: string;
    value: string;
    label: string;
  }>;
}

const Checkbox: React.FC<Props> = ({ name, options, ...rest }) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const { fieldName, registerField, defaultValue = [] } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs: HTMLInputElement[]) => {
        return refs.filter(ref => ref.checked).map(ref => ref.value);
      },
      clearValue: (refs: HTMLInputElement[]) => {
        refs.forEach(ref => {
          ref.checked = false;
        });
      },
      setValue: (refs: HTMLInputElement[], values: string[]) => {
        refs.forEach(ref => {
          if (values.includes(ref.id)) {
            ref.checked = true;
          }
        });
      },
    });
  }, [defaultValue, registerField, fieldName]);

  return (
    <Container>
      {options.map((option, index) => (
        <>
          <input
            defaultChecked={defaultValue.find((dv: string) => dv === option.id)}
            ref={ref => {
              inputRefs.current[index] = ref as HTMLInputElement;
            }}
            value={option.value}
            type="checkbox"
            id={option.id}
            key={`${option.id}-input`}
            {...rest}
          />

          <Label id={option.id} key={`${option.id}-label`} htmlFor={option.id}>
            {option.label}
          </Label>
        </>
      ))}
    </Container>
  );
};

export default Checkbox;
