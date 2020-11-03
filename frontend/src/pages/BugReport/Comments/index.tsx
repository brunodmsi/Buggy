import React, { useRef, useCallback, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiX } from 'react-icons/fi';
import Tooltip from 'little-react-tooltip';

import { BugCommentData, BugDeveloperData } from '..';

import api from '../../../services/api';
import { useToast } from '../../../hooks/toast';
import getValidationErrors from '../../../utils/getValidationErrors';
import Button from '../../../components/Button';

import { Container, Input } from './styles';

import avatarPlaceholder from '../../../assets/avatar_placeholder.png';

interface CommentsProps {
  comments: BugCommentData[];
  user: BugDeveloperData;
  bugId: string;
}

const Comments: React.FC<CommentsProps> = ({ bugId, comments, user }) => {
  const commentFormRef = useRef<FormHandles>(null);

  const [commentList, setCommentList] = useState(comments);

  const { addToast } = useToast();

  const handleAddComment = useCallback(
    async (data, { reset }) => {
      try {
        const schema = Yup.object().shape({
          comment: Yup.string().required(
            'É obrigatório escrever algo para comentar',
          ),
        });

        await schema.validate(data);

        await api.post(`/bugs/${bugId}/comments`, {
          message: data.comment,
        });

        const { data: newComments } = await api.get(`/bugs/${bugId}/comments`);

        setCommentList(newComments);

        reset();

        addToast({
          title: 'Comentário feito',
          description: 'Você comentou com sucesso.',
          type: 'success',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          commentFormRef.current?.setErrors(errors);
        }

        addToast({
          title: 'Erro ao comentar',
          description:
            'Ocorreu um erro na hora de você criar o seu comentário, cheque se está tudo certo.',
          type: 'error',
        });
      }
    },
    [bugId, addToast],
  );

  const handleCommentDelete = useCallback(
    async (commentId: string) => {
      try {
        await api.delete(`/bugs/${bugId}/comments/${commentId}`);

        addToast({
          title: 'Comentário deletado com sucesso',
          type: 'success',
        });
      } catch (err) {
        addToast({
          title: 'Erro ao deletar',
          description:
            'Ocorreu um erro na hora de você deletar o seu comentário, tente novamente mais tarde',
          type: 'error',
        });
      }
    },
    [bugId, addToast],
  );

  return (
    <Container>
      <h3>Comentários</h3>

      <label>
        {user.avatar ? (
          <img src={user.avatar_url} alt={user.name} />
        ) : (
          <img src={avatarPlaceholder} alt={user.name} />
        )}

        <Form ref={commentFormRef} onSubmit={handleAddComment}>
          <Input name="comment" placeholder="Escreva um comentário" />

          <Button type="submit">Comentar</Button>
        </Form>
      </label>

      <section>
        {commentList &&
          commentList.map(comment => (
            <div>
              <header>
                <div>
                  {comment.user.avatar_url ? (
                    <img
                      src={comment.user.avatar_url}
                      alt={comment.user.name}
                    />
                  ) : (
                    <img src={avatarPlaceholder} alt={comment.user.name} />
                  )}

                  <p>
                    <strong>{comment.user.name}</strong> -{' '}
                    {formatDistanceToNow(new Date(comment.created_at), {
                      locale: ptBR,
                    })}
                  </p>
                </div>

                {comment.user.id === user.id && (
                  <button
                    type="button"
                    onClick={() => handleCommentDelete(comment.id)}
                  >
                    <Tooltip
                      tooltipText="Deletar"
                      position="right"
                      colors={{ background: '#c53030', font: '#fff' }}
                    >
                      <FiX size={15} color="#fff" />
                    </Tooltip>
                  </button>
                )}
              </header>

              <p>{comment.message}</p>
            </div>
          ))}
      </section>
    </Container>
  );
};

export default Comments;
