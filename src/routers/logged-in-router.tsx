import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from '../screens/home/home';
import { Edit } from '../screens/user/edit';
import { NotFoundPage } from '../screens/utils/404';
import { Sidebar } from '../components/sidebar';
import { ChangePassword } from '../screens/user/change-password';
import { Settings } from '../screens/user/settings';
import { Room } from '../screens/room/room';
import { Rooms } from '../screens/room/rooms';

const LoggedInRoutes = () => {
  return (
    <Switch>
      <Route path={'/'} exact={true}>
        <Home />
      </Route>
      <Route path={'/edit'} exact={true}>
        <Edit />
      </Route>
      <Route path={'/change-password'} exact={true}>
        <ChangePassword />
      </Route>
      <Route path={'/settings'} exact={true}>
        <Settings />
      </Route>
      <Route path={'/room/:roomId'} exact={true}>
        <Room />
      </Route>
      <Route path={'/rooms'} exact={true}>
        <Rooms />
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
