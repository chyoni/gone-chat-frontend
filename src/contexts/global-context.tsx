import React, { createContext, useState } from 'react';

interface IGetMeInterface {
  id?: number;
  username?: string;
  alias?: string;
  avatar?: string;
  created_at?: number;
  updated_at?: number;
}

export interface AppContextInterface {
  currentUser: string;
  modifyCurrentUser: (token: string) => void;
  me: IGetMeInterface;
  modifyMe: (setMePayload: IGetMeInterface) => void;
  removeToken: () => void;
}

const defaultAppCtxValue = {
  currentUser: localStorage.getItem('token') || '',
  modifyCurrentUser: (token: string) => console.log(token),
  me: {
    id: 0,
    username: '',
    alias: '',
    avatar: '',
    created_at: 0,
    updated_at: 0,
  },
  modifyMe: (setMePayload: IGetMeInterface) => console.log(setMePayload),
  removeToken: () => null,
};

export const AppCtx = createContext<AppContextInterface>(defaultAppCtxValue);

export const AppCtxProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<string>(
    defaultAppCtxValue.currentUser
  );
  const [me, setMe] = useState<IGetMeInterface>(defaultAppCtxValue.me);

  const modifyCurrentUser = (token: string) => {
    setCurrentUser(token);
    localStorage.setItem('token', token);
  };
  const modifyMe = (setMePayload: IGetMeInterface) => {
    setMe(setMePayload);
  };
  const removeToken = () => {
    setCurrentUser('');
    localStorage.removeItem('token');
  };
  return (
    <AppCtx.Provider
      value={{ currentUser, modifyCurrentUser, me, modifyMe, removeToken }}
    >
      {children}
    </AppCtx.Provider>
  );
};
