import React, { useCallback, useEffect, useState } from 'react';

import { Form } from '@unform/web';
import { useHistory, useParams } from 'react-router-dom';
import { FiArrowLeft, FiPlus } from 'react-icons/fi';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Information,
  Developers,
  LimitDate,
  Description,
  Files,
} from './styles';

import Tag from '../../components/Tag';
import Select from '../../components/Select';
import Checkbox from '../../components/Checkbox';
import AddToCardOptions from './AddToCardOptions';
import Comments from './Comments';
import { typeOptions, groupOptions } from '../../utils/getBugOptions';

export interface BugFileData {
  id: string;
  filename: string;
  filename_url: string;
}

export interface BugDeveloperData {
  id: string;
  name: string;
  email: string;
  avatar: string;
  avatar_url: string;
}

export interface BugCommentData {
  id: string;
  message: string;
  user: BugDeveloperData;
  created_at: string;
}

interface BugData {
  id: string;
  title: string;
  description: string;
  group: number;
  status: number;
  type: string;
  date_limit: Date;
  project_id: string;
  developers: BugDeveloperData[];
  comments: BugCommentData[];
  files: BugFileData[];
}

const BugReport: React.FC = () => {
  const { bugId, projectId } = useParams<{
    projectId: string;
    bugId: string;
  }>();
  const history = useHistory();

  const { user } = useAuth();

  const [bug, setBug] = useState({} as BugData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/bugs/${bugId}`).then(response => {
      setBug(response.data);
      setLoading(false);
    });
  }, [bugId]);

  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const handleStatusChange = useCallback(data => console.log(data), []);

  return (
    <Container>
      {!loading && (
        <Information>
          <header>
            <button type="button" onClick={goBack}>
              <FiArrowLeft size={35} color="#27334D" />
            </button>

            <h1>Bug report #{bug.id.split('-')[0]}</h1>

            <Tag
              name={typeOptions.find(option => option.value === 'web')?.value}
              backgroundColor={
                typeOptions.find(option => option.value === 'web')?.backColor
              }
            />

            <Form onSubmit={handleStatusChange}>
              <Select name="status" options={groupOptions} />
            </Form>
          </header>

          <p>{bug.title}</p>

          <section>
            <Developers>
              <p>Desenvolvedores</p>

              <section>
                <img
                  src="https://jooinn.com/images/photo-of-woman-11.jpg"
                  alt="Profile"
                />

                <button type="button">
                  <FiPlus size={30} />
                </button>
              </section>
            </Developers>

            {bug.date_limit && (
              <LimitDate>
                <p>Data limite</p>

                <section>
                  <Checkbox />
                  <p>5 de outubro às 11:59</p>
                </section>
              </LimitDate>
            )}
          </section>

          <Description>
            <h2>Descrição</h2>

            <p>{bug.description}</p>
          </Description>

          {bug.files.length > 0 && (
            <Files>
              <h3>Anexos</h3>

              <section>
                {bug.files.map(file => (
                  <>
                    <img src={file.filename_url} alt={file.filename} />
                  </>
                ))}
              </section>
            </Files>
          )}

          <Comments bugId={bug.id} comments={bug.comments} user={user} />
        </Information>
      )}

      <AddToCardOptions projectId={projectId} bugId={bug.id} />
    </Container>
  );
};

export default BugReport;
