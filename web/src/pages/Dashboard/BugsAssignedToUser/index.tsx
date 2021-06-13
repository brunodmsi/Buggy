import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import Tag from '../../../components/Tag';
import { priorityOptions } from '../../../utils/getBugOptions';

import { Container } from './styles';
import avatarPlaceholder from '../../../assets/avatar_placeholder.png';

import { BugData } from '../../BugReport';

interface BugsAssignedToUserProps {
  title: string;
  bugs: Array<BugData>;
}

const BugsAssignedToUser: React.FC<BugsAssignedToUserProps> = ({
  title,
  bugs,
}) => {
  return (
    <Container>
      <h2>{title}</h2>

      {bugs.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Projeto</th>
              <th>Descrição</th>
              <th>Tempo restante</th>
              <th>Prioridade</th>
            </tr>
          </thead>

          <tbody>
            {bugs.map(bug => (
              <tr key={bug.id}>
                <td>
                  {bug.project.logo ? (
                    <img src={bug.project.logo_url} alt={bug.project.name} />
                  ) : (
                    <img src={avatarPlaceholder} alt={bug.project.name} />
                  )}
                </td>

                <td>
                  <p>{bug.title}</p>
                </td>

                <td>
                  <p>
                    {bug.date_limit
                      ? formatDistanceToNow(new Date(bug.date_limit), {
                          locale: ptBR,
                        })
                      : 'ND'}
                  </p>
                </td>

                <td>
                  <p>
                    <Tag
                      name={
                        priorityOptions.find(
                          option => option.value === bug.priority,
                        )?.value
                      }
                      backgroundColor={
                        priorityOptions.find(
                          option => option.value === bug.priority,
                        )?.backColor
                      }
                    />
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Você ainda não foi designado a nenhum bug</p>
      )}
    </Container>
  );
};

export default BugsAssignedToUser;
