import React, { useRef, useCallback, useState } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { FiX } from 'react-icons/fi';

import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import FileInput from '../../../components/FileInput';

import getValidationErrors from '../../../utils/getValidationErrors';

import { Container, Modal, Form } from './styles';

interface CreateNewProjectModalProps {
  openModal: boolean;
  closeModal: (action?: string) => void;
}

interface ProjectCreateFormData {
  name: string;
  description: string;
  url: string;
  logo?: File;
}

const CreateNewProjectModal: React.FC<CreateNewProjectModalProps> = ({
  openModal,
  closeModal,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data: ProjectCreateFormData) => {
      setLoading(true);

      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('O nome é um campo obrigatório'),
          description: Yup.string().required(
            'A descrição é um campo obrigatório',
          ),
          url: Yup.string()
            .url('Precisa ser um link válido')
            .required('URL é um campo obrigatório'),
          logo: Yup.string(),
        });

        await schema.validate(data, { abortEarly: false });

        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('url', data.url);

        if (data.logo) formData.append('logo', data.logo);

        await api.post('/projects', formData);

        addToast({
          title: 'Projeto criado!',
          description: 'O projeto foi criado com sucesso',
          type: 'success',
        });

        setLoading(false);

        closeModal('reload');
      } catch (err) {
        setLoading(false);

        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          title: 'Erro na criação',
          description: 'Ocorreu um erro ao criar seu projeto, cheque os campos',
          type: 'error',
        });
      }
    },
    [addToast, closeModal],
  );

  return (
    <Container>
      <Modal isOpen={openModal}>
        <button
          type="button"
          className="close-button"
          onClick={() => closeModal()}
        >
          <FiX size={20} color="#fff" />
        </button>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <header>
            <h1>Crie seu novo projeto :)</h1>
            <span>É apenas inserir os dados abaixos e ter uma boa jornada</span>
          </header>

          <label>
            <p>
              Nome do projeto <span className="required">*</span>
            </p>
            <Input name="name" placeholder="ex: Google" />
          </label>

          <label>
            <p>
              Descrição <span className="required">*</span>
            </p>
            <Input
              name="description"
              placeholder="ex: Google é uma plataforma de busca que..."
            />
          </label>

          <label>
            <p>
              URL do projeto <span className="required">*</span>
            </p>
            <Input name="url" placeholder="ex: google.com" />
          </label>

          <label>
            <p>Logo do projeto</p>
            <FileInput name="logo" accepted="image" />
          </label>

          <footer>
            <Button backgroundColor="#ff3333" onClick={() => closeModal()}>
              Cancelar
            </Button>

            <Button type="submit" loading={loading}>
              Criar projeto
            </Button>
          </footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default CreateNewProjectModal;
