import React from 'react';
import { Switch } from 'react-router-dom';

import Bugs from '../pages/Bugs';
import BugReport from '../pages/BugReport';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';

import AppProvider from '../hooks';

import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <AppProvider>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/forgot-password" component={ForgotPassword} />

      <Route path="/" exact component={Bugs} isPrivate />
      <Route path="/bug" component={BugReport} isPrivate />
    </AppProvider>
  </Switch>
);

export default Routes;
