import React, { useContext } from 'react';
import { AppCtx } from '../contexts/global-context';
import { IRoomMessages } from '../screens/room/room';

interface IProps {
  message: IRoomMessages;
}

export const Message: React.FC<IProps> = ({ message }) => {
  const ctx = useContext(AppCtx);
  return (
    <div
      className={`w-auto max-w-xs p-2 rounded-xl h-full flex flex-wrap ${
        message.from.id === ctx.me.id ? 'bg-white' : 'bg-blue-400'
      }`}
    >
      <div>{message.message}</div>
    </div>
  );
};
