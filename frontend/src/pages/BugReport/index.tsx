import React from 'react';
import { FiArrowLeft, FiPlus } from 'react-icons/fi';
import { FaUserAlt, FaFile, FaClock, FaCheck, FaRegArrowAltCircleDown } from 'react-icons/fa';

import { Link } from 'react-router-dom';

import {
  Container,
  Information,
  Options,
  Developers,
  LimitDate,
  Description,
  Files,
  Comments
} from './styles';

import Tag from '../../components/Tag';
import Select from '../../components/Select';
import Checkbox from '../../components/Checkbox';

const statusOptions = [
  {
    label: 'Aberto',
    value: 'aberto',
    backColor: '#598EDE',
    selected: true
  }, {
    label: 'Fazendo',
    value: 'fazendo',
    backColor: '#2B2C2E',
  }
]

const BugReport: React.FC = () => (
  <Container>
    <Information>
      <header>
        <Link to="/"><FiArrowLeft size={35} color="#27334D" /></Link>
        <h1>Bug report #1938</h1>
        <Tag name="web" backgroundColor="#B080F8" />
        <Select name="status" options={statusOptions} />
      </header>

      <p>Styled Components quebrando na build de produção</p>

      <section>
        <Developers>
          <p>Desenvolvedores</p>

          <section>
            <img src="https://jooinn.com/images/photo-of-woman-11.jpg" alt="Profile"/>

            <button><FiPlus size={30} /></button>
          </section>
        </Developers>

        <LimitDate>
          <p>Data limite</p>

          <section>
            <Checkbox />
            <p>5 de outubro às 11:59</p>
          </section>
        </LimitDate>
      </section>

      <Description>
        <h2>Descrição</h2>

        <p>
          Quando o projeto em ReactJS é criado, os arquivos de bundle criados
          pelo script de deploy, quebram e todas as estilizações ficam comprometidas.
          Todas as funcionalidades do sistema funcionam normalmente, mas apenas o
          CSS fica isolado na criação do "index.html" e por isso, ele quebra.
        </p>
      </Description>

      <Files>
        <h3>Anexos</h3>

        <section>
          <img src="https://camo.githubusercontent.com/3d158b667fb02c1984b3351797cec153df225944/68747470733a2f2f692e696d6775722e636f6d2f766334437965692e706e67" alt=""/>
          <img src="https://avatars1.githubusercontent.com/u/26263398?s=400&u=fa874fc285753b1ac4c3172db7733e3b8b1513d3&v=4" alt=""/>
          <img src="https://www.syncfusion.com/products/react-js2/control/images/kanban/rtl.png" alt=""/>
        </section>
      </Files>

      <Comments>
        <h3>Comentários</h3>

        <label>
          <img src="https://jooinn.com/images/photo-of-woman-11.jpg" alt=""/>

          <input type="text" placeholder="Escreva um comentário"/>
        </label>

        <section>
          <div>
            <header>
              <img src="https://jooinn.com/images/photo-of-woman-11.jpg" alt=""/>
              <p><strong>Campbell</strong> - 3 minutos atrás</p>
            </header>

            <p>Olá, acho que vou fazer isso e isso no projeto.</p>
          </div>
          <div>
            <header>
              <img src="https://jooinn.com/images/photo-of-woman-11.jpg" alt=""/>
              <p><strong>Campbell</strong> - 3 minutos atrás</p>
            </header>

            <p>Olá, acho que vou fazer isso e isso no projeto.</p>
          </div>
        </section>
      </Comments>
    </Information>

    <Options>
      <p>Adicionar ao card</p>

      <button><FaCheck size={25} />Checklist</button>
      <button><FaUserAlt size={25} />Desenvolvedor</button>
      <button><FaFile size={25} />Arquivo</button>
      <button><FaClock size={25} />Data de entrega</button>

      <button className="bottom">EXCLUIR CARD</button>
    </Options>
  </Container>
)

export default BugReport;
