import React from 'react';
import { Switch } from 'react-router-dom';

import Bugs from '../pages/Bugs';
import BugReport from '../pages/BugReport';

import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Bugs} isPrivate />
    <Route path="/bug" component={BugReport} isPrivate />
  </Switch>
);

export default Routes;