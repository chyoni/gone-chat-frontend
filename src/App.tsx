import React, { useEffect, useState } from 'react';
import { LoggedInRouter } from './routers/logged-in-router';
import { LoggedOutRouter } from './routers/logged-out-router';
import { getCurrentUser } from './auth/auth-services';

export const App: React.FC<{}> = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    const token = getCurrentUser();
    setCurrentUser(token);
  }, []);

  return Boolean(currentUser) ? <LoggedInRouter /> : <LoggedOutRouter />;
};
