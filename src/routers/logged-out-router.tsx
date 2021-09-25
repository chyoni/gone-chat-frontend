import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login } from '../screens/authentication/login';
import { Signup } from '../screens/authentication/signup';
import { NotFoundPage } from '../screens/utils/404';

const LoggedOutRoutes = () => {
  return (
    <Switch>
      <Route path={'/'} exact={true}>
        <Login />
      </Route>
      <Route path={'/signup'} exact={true}>
        <Signup />
      </Route>
      <Route path={'*'}>
        <NotFoundPage />
      </Route>
    </Switch>
  );
};

export const LoggedOutRouter = () => {
  return (
    <Router>
      <LoggedOutRoutes />
    </Router>
  );
};
