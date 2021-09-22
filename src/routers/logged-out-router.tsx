import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login } from '../screens/authentication/login';

const LoggedOutRoutes = () => {
  return (
    <Switch>
      <Route path={'/'} exact={true}>
        <Login />
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
