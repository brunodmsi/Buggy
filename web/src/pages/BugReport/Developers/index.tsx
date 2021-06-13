import React, { useState } from 'react';
import { FiEye, FiX } from 'react-icons/fi';

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
  // bugId,
  // projectId,
  developers: devRelations,
}) => {
  const developers = devRelations.map(dev => dev.user);
  // const [developers, setDevelopers] = useState(() => {
  //   const devs = devRelations.map(dev => dev.user);

  //   return devs;
  // });
  const [listDevelopersModal, setListDevelopersModal] = useState(false);

  return (
    <>
      {developers.length > 0 && (
        <>
          <Container>
            <>
              <p>Desenvolvedores</p>

              <section>
                <div>
                  {developers.map(dev => (
                    <>
                      {dev.avatar_url ? (
                        <img key={dev.id} src={dev.avatar_url} alt={dev.name} />
                      ) : (
                        <img
                          key={dev.id}
                          src={avatarPlaceholder}
                          alt={dev.name}
                        />
                      )}
                    </>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setListDevelopersModal(true)}
                >
                  <FiEye size={20} />
                </button>
              </section>
            </>
          </Container>

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
                  </tr>
                ))}
              </table>
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

export default Developers;
