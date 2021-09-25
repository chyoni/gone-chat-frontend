import React, { createContext, useState } from 'react';

export interface AppContextInterface {
  currentUser: string;
  modifyCurrentUser: (token: string) => void;
}

const defaultAppCtxValue = {
  currentUser: localStorage.getItem('token') || '',
  modifyCurrentUser: (token: string) => console.log(token),
};

export const AppCtx = createContext<AppContextInterface>(defaultAppCtxValue);

export const AppCtxProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<string>(
    defaultAppCtxValue.currentUser
  );

  const modifyCurrentUser = (token: string) => {
    setCurrentUser(token);
    localStorage.setItem('token', token);
  };
  return (
    <AppCtx.Provider value={{ currentUser, modifyCurrentUser }}>
      {children}
    </AppCtx.Provider>
  );
};
