import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import defaultAvatar from '../assets/default-avatar.jpeg';
import { AppCtx } from '../contexts/global-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

export const Sidebar = () => {
  const ctx = useContext(AppCtx);
  const history = useHistory();

  const isValidPath = (): boolean => {
    const currentPath = history.location.pathname;
    if (currentPath !== '/' && currentPath !== '/edit') {
      return false;
    }
    return true;
  };

  const handleLogout = () => {
    axios
      .get('http://localhost:4000/logout', {
        headers: {
          Authorization: `Bearer ${ctx.currentUser}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          ctx.removeToken();
          return;
        }
        toast.error('something wrong happen. try again later.');
      })
      .catch((err) => {
        if (err.response.data.token_refresh_flag) {
          ctx.removeToken();
        }
      });
  };

  useEffect(() => {
    axios
      .get('http://localhost:4000/user/info/me', {
        headers: {
          Authorization: `Bearer ${ctx.currentUser}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          ctx.modifyMe(res.data);
        }
      })
      .catch((err) => {
        if (err.response.data.token_refresh_flag) {
          ctx.removeToken();
        }
      });
    // eslint-disable-next-line
  }, []);

  return isValidPath() ? (
    <div className="relative w-1/4 min-h-screen bg-yellow-300 rounded-md flex flex-col">
      <div className="w-full h-32 p-3 flex items-center">
        <div className="w-2/4 flex items-center justify-center">
          <img
            src={ctx.me.avatar !== '' ? ctx.me.avatar : defaultAvatar}
            alt={'user-avatar'}
            className="bg-center bg-contain bg-no-repeat w-28 h-28 rounded-full"
          />
        </div>
        <div className="w-full h-full flex items-center">
          <span className="w-4/5 text-2xl text-black font-bold">
            {ctx.me.alias !== '' ? ctx.me.alias : 'Anonymous'}
          </span>
          <div className="w-1/5 flex items-center justify-center">
            <button className="px-3 py-1 rounded-md bg-white text-yellow-600">
              <Link to={'/edit'}>Edit</Link>
            </button>
          </div>
        </div>
      </div>
      <div className="h-full w-full"></div>
      <div className="absolute bottom-0 w-full px-3 py-5 border-t-2 border-white flex justify-between items-center">
        <div>
          <Link to={'/'}>
            <FontAwesomeIcon icon={faHome} size={'lg'} />
          </Link>
        </div>
        <div>
          <FontAwesomeIcon
            icon={faSignOutAlt}
            size={'lg'}
            className="cursor-pointer"
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  ) : null;
};
