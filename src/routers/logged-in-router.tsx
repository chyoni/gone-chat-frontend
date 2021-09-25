import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from '../screens/home/home';
import { NotFoundPage } from '../screens/utils/404';
import { Sidebar } from '../components/sidebar';

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
    <>
      <Router>
        <Sidebar />
        <LoggedInRoutes />
      </Router>
    </>
  );
};
