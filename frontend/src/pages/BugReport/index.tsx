import React, { useCallback, useEffect, useState } from 'react';

import { useHistory, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import { Container, Information } from './styles';

import Tag from '../../components/Tag';

import AddToCardOptions from './AddToCardOptions';
import Developers from './Developers';
import Comments from './Comments';
import Description from './Description';
import Summary from './Summary';
import Checklists from './Checklists';
import ListenerReport from './ListenerReport';
import LimitDate from './LimitDate';
import Files from './Files';

import { typeOptions } from '../../utils/getBugOptions';

interface ProjectData {
  id: string;
  name: string;
  logo: string;
  logo_url: string;
}

export interface BugChecklistItemData {
  id: string;
  text: string;
  done: boolean;
  checklist_id?: string;
}

export interface BugChecklistData {
  id: string;
  title: string;
  items: BugChecklistItemData[];
}

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

export interface BugListenerReport {
  name: string;
  message: string;
  stack_where: string;
  stack_line: string;
  error_query: string | null;
  request_body: string | null;
  request_method: string;
  request_url_protocol: string;
  request_url: string;
  request_url_path: string;
  request_headers: string;
  request_query: string;
  request_params: string;
  created_at: Date;
}

export interface BugData {
  id: string;
  title: string;
  description: string;
  group: number;
  status: number;
  type: string;
  priority: string;
  date_limit: string;
  listener_report_id?: string;
  listener_report: BugListenerReport;
  delivered: boolean;
  project_id: string;
  project: ProjectData;
  checklists: BugChecklistData[];
  developers: Array<{ user: BugDeveloperData }>;
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
      console.log(response.data);
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
          </header>

          <Summary
            bugId={bug.id}
            title={bug.title}
            isFromListenerReport={!!bug.listener_report}
          />

          <section>
            <Developers
              projectId={projectId}
              bugId={bugId}
              developers={bug.developers}
            />

            <LimitDate
              bugId={bug.id}
              date={bug.date_limit}
              delivered={bug.delivered}
            />
          </section>

          <ListenerReport data={bug.listener_report} />

          <Description bugId={bug.id} description={bug.description} />

          <Checklists bugId={bugId} checklists={bug.checklists} />

          <Files files={bug.files} />

          <Comments bugId={bug.id} comments={bug.comments} user={user} />
        </Information>
      )}

      <AddToCardOptions projectId={projectId} bugId={bug.id} />
    </Container>
  );
};

export default BugReport;
