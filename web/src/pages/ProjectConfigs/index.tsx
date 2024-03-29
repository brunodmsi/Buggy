import React, { useState, useEffect } from 'react';
import { FiArrowLeft, FiEyeOff, FiEye } from 'react-icons/fi';
import { useParams, useHistory } from 'react-router-dom';

import api from '../../services/api';

import AddMember from './AddMember';

import { Container, Description, ListenerKey, Members } from './styles';
import avatarPlaceholder from '../../assets/avatar_placeholder.png';

interface IProjectDataProps {
  id: string;
  name: string;
  description: string;
  owner_id: string;
  listener_key: string;
}

interface IMembersData {
  id: string;
  name: string;
  email: string;
  avatar: string;
  avatar_url: string;
  bugs: [];
}

const ProjectConfigs: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({} as IProjectDataProps);
  const [projectMembers, setProjectMembers] = useState([] as IMembersData[]);
  const [seeListenerKey, setSeeListenerKey] = useState(false);
  const [openAddMemberModal, setOpenAddMemberModal] = useState(false);

  useEffect(() => {
    api.get(`/projects/${id}`).then(response => {
      setProject(response.data);
      setLoading(false);
    });

    api.get(`/projects/${id}/users`).then(response => {
      setProjectMembers(response.data);
    });
  }, [id]);

  return (
    <Container>
      {!loading && (
        <>
          <header>
            <section>
              <button type="button" onClick={() => history.goBack()}>
                <FiArrowLeft size={35} color="#27334D" />
              </button>
              <h1>{project.name}</h1>
            </section>
          </header>

          <Description>
            <h1>Descrição</h1>
            <p>{project.description}</p>
          </Description>

          <ListenerKey>
            <h3>
              Chave para o&nbsp;
              <a href="https://github.com/brunodmsi/buggy-listener-express">
                BuggyListener
              </a>
            </h3>

            <div>
              {seeListenerKey ? (
                <>
                  <span>{project.listener_key}</span>
                  <button
                    type="button"
                    onClick={() => setSeeListenerKey(false)}
                  >
                    <FiEyeOff size={20} color="#5f30e2" />
                  </button>
                </>
              ) : (
                <>
                  <span>
                    {project.listener_key.replaceAll(/[A-Za-z0-9]/g, '*')}
                  </span>
                  <button type="button" onClick={() => setSeeListenerKey(true)}>
                    <FiEye size={20} color="#5f30e2" />
                  </button>
                </>
              )}
            </div>
          </ListenerKey>

          <AddMember
            projectId={id}
            openModal={openAddMemberModal}
            closeModal={async (action?: string) => {
              setOpenAddMemberModal(false);

              if (action === 'reload') {
                document.location.reload();
              }
            }}
          />

          <Members>
            <header>
              <h2>Membros</h2>

              <button type="button" onClick={() => setOpenAddMemberModal(true)}>
                Adicionar membro
              </button>
            </header>

            <table>
              <tr>
                <th>Avatar</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Bug Designados</th>
              </tr>

              {projectMembers.map(member => (
                <tr key={member.id}>
                  <td>
                    {member.avatar ? (
                      <img src={member.avatar_url} alt={member.name} />
                    ) : (
                      <img src={avatarPlaceholder} alt={member.name} />
                    )}
                  </td>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td className="bugs-assigned">{member.bugs.length}</td>
                </tr>
              ))}
            </table>
          </Members>
        </>
      )}
    </Container>
  );
};

export default ProjectConfigs;
