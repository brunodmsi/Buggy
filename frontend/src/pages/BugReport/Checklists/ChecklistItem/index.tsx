import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import api from '../../../../services/api';
import { useToast } from '../../../../hooks/toast';

import { Checkbox } from './styles';

import { BugChecklistItemData } from '../..';

interface ChecklistItemProps {
  item: BugChecklistItemData;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({ item: propItem }) => {
  const changeItemStatusRef = useRef<FormHandles>(null);
  const [item, setItem] = useState(propItem as BugChecklistItemData);

  const { addToast } = useToast();

  const handleItemDoneCheckbox = useCallback(
    async (checklistItem: BugChecklistItemData) => {
      try {
        await api.patch(`/bugs/checklists/items/${checklistItem.id}`, {
          status: !checklistItem.done,
        });

        addToast({
          title: 'Edição feita com sucesso!',
          type: 'success',
        });
      } catch (err) {
        addToast({
          title: 'Erro ao editar',
          description: 'Verifique se está tudo correto e tente novamente',
          type: 'error',
        });
      }
    },
    [addToast],
  );

  return (
    <Form
      ref={changeItemStatusRef}
      onSubmit={() => handleItemDoneCheckbox(item)}
    >
      <Checkbox
        name="done"
        defaultChecked={item.done}
        onClick={() => changeItemStatusRef.current?.submitForm()}
        options={[{ id: '1', label: item.text, value: item.done ? 1 : 0 }]}
      />
    </Form>
  );
};

export default ChecklistItem;
