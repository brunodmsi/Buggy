import React from 'react';
import { Switch } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

import Dashboard from '../pages/Dashboard';
import Bugs from '../pages/Bugs';
import BugReport from '../pages/BugReport';

import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/reset-password/:token" component={ResetPassword} />
    <Route path="/register" component={Register} />

    <Route path="/" exact component={Dashboard} isPrivate />
    <Route path="/bugs" exact component={Bugs} isPrivate />
    <Route path="/bugs/:id" component={BugReport} isPrivate />
  </Switch>
);

export default Routes;
