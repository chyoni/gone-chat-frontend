import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login } from '../screens/authentication/login';
import { Signup } from '../screens/authentication/signup';

const LoggedOutRoutes = () => {
  return (
    <Switch>
      <Route path={'/'} exact={true}>
        <Login />
      </Route>
      <Route path={'/signup'} exact={true}>
        <Signup />
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
