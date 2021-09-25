import React from 'react';
import { useHistory } from 'react-router-dom';
import defaultAvatar from '../assets/default-avatar.jpeg';

export const Sidebar = () => {
  const history = useHistory();

  const isValidPath = (): boolean => {
    const currentPath = history.location.pathname;
    if (currentPath !== '/') {
      return false;
    }
    return true;
  };

  return isValidPath() ? (
    <div className="w-1/4 min-h-screen bg-yellow-200 rounded-md">
      <div className="w-full h-32 p-3 flex items-center">
        <img
          src={defaultAvatar}
          alt={'user-avatar'}
          className="bg-center bg-cover w-28 h-28 rounded-full"
        />
        <div className="w-full h-full flex items-center ml-5">
          <span className="w-4/5 text-2xl text-gray-500 font-bold">
            Anonymous
          </span>
          <div className="w-1/5 flex items-center justify-center">
            <button className=" px-3 py-1 rounded-md bg-white text-yellow-600">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
