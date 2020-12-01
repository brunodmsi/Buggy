import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ReactDatePickerProps, registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-datepicker/dist/react-datepicker.css';

import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { useField } from '@unform/core';

import { Container, ReactDatePicker, Error } from './styles';

registerLocale('ptBR', ptBR);

interface DatePickerProps extends Omit<ReactDatePickerProps, 'onChange'> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  focused?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  name,
  icon: Icon,
  focused = false,
  ...rest
}) => {
  const datepickerRef = useRef(null);

  const [isFocused, setIsFocused] = useState(focused);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, registerField, defaultValue, error } = useField(name);

  const [date, setDate] = useState(defaultValue || null);

  useEffect(() => {
    setIsFocused(false);
    setIsFilled(!!date);
  }, [date]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!date);
  }, [date]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datepickerRef.current,
      path: 'props.selected',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      clearValue: (ref: any) => {
        ref.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container
      isErrored={!!error}
      isFocused={isFocused}
      isFilled={isFilled}
      className="datepicker"
    >
      {Icon && <Icon size={20} />}

      <ReactDatePicker
        ref={datepickerRef}
        selected={date}
        locale="ptBR"
        dateFormat="dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'"
        onChange={setDate}
        onFocus={handleFocus}
        onBlur={handleBlur}
        showTimeSelect
        preventOpenOnFocus
        showYearDropdown
        dateFormatCalendar="MMMM"
        minDate={new Date()}
        value={defaultValue}
        {...rest}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default DatePicker;
