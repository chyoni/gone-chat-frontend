import React, { useContext } from 'react';
import { AppCtx } from '../contexts/global-context';
import { IRoomMessages } from '../screens/room/room';
import defaultImg from '../assets/default-avatar.jpeg';

interface IProps {
  message: IRoomMessages;
}

export const Message: React.FC<IProps> = ({ message }) => {
  const ctx = useContext(AppCtx);
  return (
    <div className="flex items-center">
      {message.from.id !== ctx.me.id && (
        <img
          src={message.from.avatar ? message.from.avatar : defaultImg}
          alt={'avatar'}
          className="w-12 h-12 rounded-full mr-3"
        />
      )}
      <div
        className={`flex flex-col ${
          message.from.id === ctx.me.id ? 'items-end' : ''
        }`}
      >
        <span className="text-white text-sm">
          {message.from.alias ? message.from.alias : message.from.username}
        </span>
        <div
          className={`w-auto max-w-xs p-2 rounded-xl h-full flex flex-wrap ${
            message.from.id === ctx.me.id ? 'bg-white' : 'bg-blue-400'
          }`}
        >
          <div>{message.message}</div>
        </div>
      </div>
      {message.from.id === ctx.me.id && (
        <img
          src={message.from.avatar ? message.from.avatar : defaultImg}
          alt={'avatar'}
          className="w-12 h-12 rounded-full ml-3"
        />
      )}
    </div>
  );
};
