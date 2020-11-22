import React from 'react';
import { Switch } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

import Dashboard from '../pages/Dashboard';
import AllProjects from '../pages/AllProjects';
import ProjectBugs from '../pages/ProjectBugs';
import BugReport from '../pages/BugReport';
import ProjectConfigs from '../pages/ProjectConfigs';
import Profile from '../pages/Profile';

import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/reset-password/:token" component={ResetPassword} />
    <Route path="/register" component={Register} />

    <Route path="/profile" component={Profile} isPrivate />

    <Route path="/" exact component={Dashboard} isPrivate />
    <Route path="/projects" exact component={AllProjects} isPrivate />
    <Route path="/projects/:id" exact component={ProjectBugs} isPrivate />
    <Route
      path="/projects/:id/config"
      exact
      component={ProjectConfigs}
      isPrivate
    />
    <Route
      path="/projects/:projectId/bugs/:bugId"
      component={BugReport}
      isPrivate
    />
  </Switch>
);

export default Routes;
