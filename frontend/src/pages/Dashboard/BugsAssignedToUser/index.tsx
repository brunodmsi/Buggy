import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

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

      <table>
        <tr>
          <th>Projeto</th>
          <th>Descrição</th>
          <th>Tempo restante</th>
          <th>Prioridade</th>
        </tr>

        {bugs.map(bug => (
          <tr>
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
              <p>{bug.priority}</p>
            </td>
          </tr>
        ))}
      </table>
    </Container>
  );
};

export default BugsAssignedToUser;
