import React from 'react';

import { Container } from './styles';

interface UserData {
  id: string;
  name: string;
  avatar_url: string;
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
          <img src={user.avatar_url} alt={user.name} />
          <p>{user.name}</p>
        </div>
      ))}
    </Container>
  );
};

export default BugFixersCard;
