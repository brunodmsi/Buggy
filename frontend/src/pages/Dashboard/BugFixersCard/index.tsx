import React from 'react';

import { Container } from './styles';
import avatarPlaceholder from '../../../assets/avatar_placeholder.png';

interface UserData {
  id: string;
  name: string;
  avatar_url: string | undefined;
  counter: number;
}

interface BugFixersCardProps {
  title: string;
  description: string;
  bugFixers: Array<UserData>;
}

const BugFixersCard: React.FC<BugFixersCardProps> = ({
  title,
  description,
  bugFixers,
}) => {
  return (
    <Container>
      <h2>{title}</h2>
      <span>{description}</span>

      {bugFixers.map(user => (
        <div key={user.id}>
          {user.avatar_url ? (
            <img src={user.avatar_url} alt={user.name} />
          ) : (
            <img src={avatarPlaceholder} alt={user.name} />
          )}
          <p>{user.name}</p>
        </div>
      ))}
    </Container>
  );
};

export default BugFixersCard;
