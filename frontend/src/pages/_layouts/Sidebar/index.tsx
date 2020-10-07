import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiLayout,
  FiFolder
} from 'react-icons/fi';

import { Container } from './styles';

import buggyLogo from '../../../assets/logo_roxa.png';

const Sidebar: React.FC = ({
  children,
  ...rest
}) => {
  return (
    <Container {...rest}>
      <header>
        <img src={buggyLogo} alt="Buggy"/>
        <h1>Buggy</h1>
      </header>
      
      <section>
        <Link to="/">
          <FiLayout size={20} /> 
          <p>Dashboard</p>
        </Link>

        <Link to="/">
          <FiFolder size={20} /> 
          <p>Projetos</p>
        </Link>
      </section>
    </Container>
  );
};

export default Sidebar;
