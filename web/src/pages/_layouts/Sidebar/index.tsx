import React from 'react';
import { Link } from 'react-router-dom';
import { FiLayout, FiFolder } from 'react-icons/fi';

import { useAuth } from '../../../hooks/auth';

import { Container } from './styles';

import buggyLogo from '../../../assets/logo_roxa.png';

const Sidebar: React.FC = props => {
  const { signOut } = useAuth();

  return (
    <Container {...props}>
      <div>
        <header>
          <img src={buggyLogo} alt="Buggy" />
          <h1>Buggy</h1>
        </header>

        <section>
          <Link to="/">
            <FiLayout size={20} />
            <p>Dashboard</p>
          </Link>

          <Link to="/projects">
            <FiFolder size={20} />
            <p>Projetos</p>
          </Link>
        </section>
      </div>

      <footer>
        <Link className="profile-config" to="/profile">
          Meu perfil
        </Link>

        <button className="user-logout" type="button" onClick={() => signOut()}>
          Sair
        </button>
      </footer>
    </Container>
  );
};

export default Sidebar;
