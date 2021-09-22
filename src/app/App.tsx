import React, { useEffect, useState } from 'react';
import { LoggedInRouter } from '../router/LoggedInRouter';
import { LoggedOutRouter } from '../router/LoggedOutRouter';
import { getCurrentUser } from '../auth/authService';

export const App: React.FC<{}> = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    const token = getCurrentUser();
    setCurrentUser(token);
  }, []);

  return Boolean(currentUser) ? <LoggedInRouter /> : <LoggedOutRouter />;
};
