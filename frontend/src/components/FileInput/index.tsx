import React, {
  ChangeEvent,
  useRef,
  useEffect,
  useCallback,
  useState,
} from 'react';
import { useField } from '@unform/core';

import { useToast } from '../../hooks/toast';

interface Props {
  name: string;
  accepted?: 'all' | 'image';
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

const FileInput: React.FC<InputProps> = ({
  name,
  accepted = 'all',
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { addToast } = useToast();
  const { fieldName, registerField, defaultValue } = useField(name);
  const [preview, setPreview] = useState(defaultValue);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      const imagePattern = /image-*/;
      if (accepted === 'image' && !file?.type.match(imagePattern)) {
        e.target.value = '';

        addToast({
          title: 'Apenas imagens',
          description: `O campo arquivo aceita apenas imagens`,
          type: 'error',
        });

        return;
      }

      if (!file) {
        setPreview(null);
      }

      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
    },
    [accepted, addToast],
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'files[0]',
      clearValue(ref: HTMLInputElement) {
        ref.value = '';
        setPreview(null);
      },
      setValue(_: HTMLInputElement, value: string) {
        setPreview(value);
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      {accepted === 'image' && preview && (
        <img src={preview} alt="Preview" width="100" />
      )}
      <input
        type="file"
        ref={inputRef}
        accept={accepted === 'image' ? 'image/png,image/jpeg' : ''}
        onChange={handleChange}
        {...rest}
      />
    </>
  );
};
export default FileInput;
