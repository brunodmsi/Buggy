import React, { useState, useCallback } from 'react';
import { FiTrash, FiX } from 'react-icons/fi';
import Tooltip from 'little-react-tooltip';

import Spinner from '../../../components/Spinner';

import api from '../../../services/api';
import { useToast } from '../../../hooks/toast';

import { Container, Modal } from './styles';

import { BugFileData } from '..';

interface FilesProps {
  files: BugFileData[];
}

const Files: React.FC<FilesProps> = ({ files: bugFiles }) => {
  const [files, setFiles] = useState(bugFiles);
  const [deleteLoading, setDeleteLoading] = useState('');
  const [seeMoreModal, setSeeMoreModal] = useState(false);
  const { addToast } = useToast();

  const handleFileDelete = useCallback(
    async (id: string) => {
      try {
        setDeleteLoading(id);

        await api.delete(`/bugs/files/${id}`);

        const updatedFiles = files.filter(file => file.id !== id);

        setFiles(updatedFiles);

        addToast({
          title: 'Arquivo deletado!',
          type: 'success',
        });
      } catch (err) {
        addToast({
          title: 'Erro ao deletar!',
          description:
            'Ocorreu um erro ao deletar o arquivo, tente novamente mais tarde',
          type: 'error',
        });
      }
    },
    [addToast, files],
  );

  return (
    <Container show={files.length > 0}>
      <h3>Anexos</h3>

      <section>
        {files.slice(0, 5).map(file => (
          <Tooltip
            key={file.id}
            tooltipText={file.filename}
            position="bottom"
            colors={{
              background: '#5F30E2',
              font: '#fff',
            }}
          >
            <a rel="noreferrer" href={file.filename_url} target="_blank">
              {file.filename.match(/.(jpg|jpeg|png|gif)$/i) ? (
                <img src={file.filename_url} alt={file.filename} />
              ) : (
                <div>
                  <p>
                    {file.filename
                      .split('.')
                      [file.filename.split('.').length - 1].toUpperCase()}
                  </p>
                </div>
              )}
            </a>
          </Tooltip>
        ))}

        <button
          type="button"
          className="see-more"
          onClick={() => setSeeMoreModal(true)}
        >
          <p>VER TODOS</p>
        </button>
      </section>

      <Modal isOpen={seeMoreModal}>
        <button
          type="button"
          className="close-button"
          onClick={() => setSeeMoreModal(false)}
        >
          <FiX size={20} color="#fff" />
        </button>

        <div>
          <h3>Todos os arquivos</h3>

          <table>
            {files.map(file => (
              <tr>
                <td className="td-file-link">
                  <a rel="noreferrer" href={file.filename_url} target="_blank">
                    <p className="td-file-type">
                      {file.filename
                        .split('.')
                        [file.filename.split('.').length - 1].toUpperCase()}
                    </p>

                    {file.filename}
                  </a>
                </td>

                <td className="td-delete">
                  <button
                    type="button"
                    onClick={() => handleFileDelete(file.id)}
                  >
                    {deleteLoading === file.id ? (
                      <Spinner size={20} />
                    ) : (
                      <FiTrash size={15} color="#fff" />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </Modal>
    </Container>
  );
};

export default Files;
