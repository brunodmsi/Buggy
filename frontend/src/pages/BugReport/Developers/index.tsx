import React, { useState, useCallback } from 'react';
import { FiEye, FiX, FiTrash } from 'react-icons/fi';

import api from '../../../services/api';
import { useToast } from '../../../hooks/toast';

import Spinner from '../../../components/Spinner';

import { Container, Modal } from './styles';

import avatarPlaceholder from '../../../assets/avatar_placeholder.png';

import { BugDeveloperData } from '..';

interface IRelation {
  user: BugDeveloperData;
}

interface DeveloperProps {
  bugId: string;
  projectId: string;
  developers: Array<IRelation>;
}

const Developers: React.FC<DeveloperProps> = ({
  bugId,
  projectId,
  developers: devRelations,
}) => {
  const [developers, setDevelopers] = useState(() => {
    const devs = devRelations.map(dev => dev.user);

    return devs;
  });
  const [listDevelopersModal, setListDevelopersModal] = useState(false);
  // const [deleteLoading, setDeleteLoading] = useState('');

  // const { addToast } = useToast();

  // const handleFileDelete = useCallback(
  //   async (id: string) => {
  //     try {
  //       setDeleteLoading(id);

  //       await api.delete(`/bugs/files/${id}`);

  //       const updatedDevelopers = developers.filter(file => file.id !== id);

  //       setDevelopers(updatedDevelopers);

  //       addToast({
  //         title: 'Desenvolvedor deletado!',
  //         type: 'success',
  //       });
  //     } catch (err) {
  //       addToast({
  //         title: 'Erro ao deletar!',
  //         description:
  //           'Ocorreu um erro ao excluir o desenvolvedor, tente novamente mais tarde',
  //         type: 'error',
  //       });
  //     }
  //   },
  //   [addToast, developers],
  // );

  return (
    <Container>
      {developers.length > 0 && (
        <>
          <p>Desenvolvedores</p>

          <section>
            {developers.map(dev => (
              <div key={dev.id}>
                {dev.avatar_url ? (
                  <img key={dev.id} src={dev.avatar_url} alt={dev.name} />
                ) : (
                  <img key={dev.id} src={avatarPlaceholder} alt={dev.name} />
                )}
              </div>
            ))}

            <button type="button" onClick={() => setListDevelopersModal(true)}>
              <FiEye size={20} />
            </button>
          </section>
        </>
      )}

      <Modal isOpen={listDevelopersModal}>
        <button
          type="button"
          className="close-button"
          onClick={() => setListDevelopersModal(false)}
        >
          <FiX size={20} color="#fff" />
        </button>

        <div>
          <h3>Todos os desenvolvedores</h3>

          <table>
            {developers.map(dev => (
              <tr>
                <td className="td-dev-img">
                  {dev.avatar_url ? (
                    <img src={dev.avatar_url} alt={dev.name} />
                  ) : (
                    <img src={avatarPlaceholder} alt={dev.name} />
                  )}
                </td>

                <td className="td-dev-name">
                  <p>{dev.name}</p>
                </td>

                <td className="td-dev-email">
                  <p>{dev.email}</p>
                </td>

                {/* <td className="td-delete">
                  <button
                    type="button"
                    onClick={() => handleFileDelete(dev.id)}
                  >
                    {deleteLoading === dev.id ? (
                      <Spinner size={20} />
                    ) : (
                      <FiTrash size={15} color="#fff" />
                    )}
                  </button>
                </td> */}
              </tr>
            ))}
          </table>
        </div>
      </Modal>
    </Container>
  );
};

export default Developers;
