import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from '../screens/home/home';
import { NotFoundPage } from '../screens/utils/404';

const LoggedInRoutes = () => {
  return (
    <Switch>
      <Route path={'/'} exact={true}>
        <Home />
      </Route>
      <Route path={'*'}>
        <NotFoundPage />
      </Route>
    </Switch>
  );
};

export const LoggedInRouter = () => {
  return (
    <Router>
      <LoggedInRoutes />
    </Router>
  );
};
