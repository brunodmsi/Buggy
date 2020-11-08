import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import api from '../../../services/api';
import { useToast } from '../../../hooks/toast';

import Button from '../../../components/Button';
import getValidationErrors from '../../../utils/getValidationErrors';

import ChecklistItem from './ChecklistItem';
import { Container, ShowChecklist, Input } from './styles';

import { BugChecklistData } from '..';

interface ChecklistProps {
  checklists: BugChecklistData[];
  bugId: string;
}

const Checklists: React.FC<ChecklistProps> = ({
  bugId,
  checklists: propChecklists,
}) => {
  const addNewItemFormRef = useRef<FormHandles>(null);

  const [checklists, setChecklists] = useState(propChecklists);
  const [editLoading, setEditLoading] = useState(false);
  const [isAddingItem, setIsAddingItem] = useState('');

  const { addToast } = useToast();

  const handleAddChecklistItem = useCallback(
    async (data, checklist) => {
      try {
        addNewItemFormRef.current?.setErrors({});
        setEditLoading(true);

        const schema = Yup.object().shape({
          text: Yup.string().required('É obrigatório preencher esse campo'),
        });

        await schema.validate(data, { abortEarly: false });

        const response = await api.post(
          `/bugs/checklists/${checklist.id}/items`,
          data,
        );

        checklist.items.pop();
        checklist.items.push(response.data);

        addToast({
          title: 'Edição feita com sucesso!',
          type: 'success',
        });

        setEditLoading(false);
        setIsAddingItem('');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          addNewItemFormRef.current?.setErrors(errors);
        } else {
          addToast({
            title: 'Erro ao editar',
            description: 'Verifique se está tudo correto e tente novamente',
            type: 'error',
          });
        }

        setEditLoading(false);
      }
    },
    [addToast],
  );

  return (
    <Container show={checklists.length > 0}>
      {checklists &&
        checklists.map(checklist => (
          <ShowChecklist>
            <h2>{checklist.title}</h2>

            {checklist.items.length === 0 && (
              <span>Você ainda não adicionou nenhum item</span>
            )}

            {checklist.items.map(item => {
              if (item.text === '') {
                return (
                  <Form
                    ref={addNewItemFormRef}
                    key={`${item.text}-${item.checklist_id}`}
                    onSubmit={data => handleAddChecklistItem(data, checklist)}
                  >
                    <Input name="text" placeholder="Atividade" />
                  </Form>
                );
              }

              return (
                <div>
                  <ChecklistItem item={item} />
                </div>
              );
            })}

            {isAddingItem === checklist.id ? (
              <div className="newItemOptions">
                <Button
                  className="saveNewItem"
                  loading={editLoading}
                  onClick={() => addNewItemFormRef.current?.submitForm()}
                >
                  Salvar item
                </Button>

                <Button
                  className="cancelNewItem"
                  onClick={() => {
                    checklist.items.pop();

                    setIsAddingItem('');
                  }}
                >
                  Cancelar
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => {
                  checklist.items.push({
                    id: 'Teste',
                    text: '',
                    done: false,
                  });

                  setIsAddingItem(checklist.id);
                }}
              >
                Adicionar item
              </Button>
            )}
          </ShowChecklist>
        ))}
    </Container>
  );
};

export default Checklists;
