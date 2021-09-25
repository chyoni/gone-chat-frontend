import React, { useContext } from 'react';
import { AppCtx } from './contexts/global-context';
import { LoggedInRouter } from './routers/logged-in-router';
import { LoggedOutRouter } from './routers/logged-out-router';

export const App: React.FC<{}> = () => {
  const ctx = useContext(AppCtx);
  return Boolean(ctx?.currentUser) ? <LoggedInRouter /> : <LoggedOutRouter />;
};
