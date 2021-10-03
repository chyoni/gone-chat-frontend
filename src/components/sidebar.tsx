import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import defaultAvatar from '../assets/default-avatar.jpeg';
import { AppCtx } from '../contexts/global-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowAltCircleDown,
  faCog,
  faFolderOpen,
  faHome,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { RoomCard } from './room-card';

export const Sidebar = () => {
  const ctx = useContext(AppCtx);
  const history = useHistory();
  const [myRooms, setMyRooms] = useState<Array<number>>([]);

  const isValidPath = (): boolean => {
    const currentPath = history.location.pathname;
    const regex = new RegExp('/room/[0-9]+');
    if (
      currentPath !== '/' &&
      currentPath !== '/edit' &&
      currentPath !== '/change-password' &&
      currentPath !== '/settings' &&
      !currentPath.match(regex)
    ) {
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
          history.push('/');
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
        console.log(err);
        if (err.response.data.token_refresh_flag) {
          ctx.removeToken();
        }
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/user/room/${ctx.me.id}`, {
        headers: {
          Authorization: `Bearer ${ctx.currentUser}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setMyRooms(res.data.room_id);
        }
      })
      .catch((err) => {
        if (err.response.data.token_refresh_flag) {
          ctx.removeToken();
        }
      });
    // eslint-disable-next-line
  }, [ctx.me.id]);

  return isValidPath() ? (
    <div className="w-1/4 h-auto bg-gray-800 flex flex-col overflow-y-auto">
      <div className="w-full h-auto p-3 flex flex-col">
        <div className="w-full flex items-center justify-center mb-3">
          <img
            src={ctx.me.avatar !== '' ? ctx.me.avatar : defaultAvatar}
            alt={'user-avatar'}
            className="bg-center bg-contain bg-no-repeat w-36 h-36 rounded-full mr-5"
          />
          <div className="w-3/4 h-full flex items-center">
            <span className="w-4/5 text-2xl text-white font-bold">
              {ctx.me.alias !== '' ? ctx.me.alias : 'Anonymous'}
            </span>
            <div className="w-1/5 flex items-center justify-center">
              <button className="px-3 py-1 rounded-md bg-white text-gray-700 border hover:border-green-400 transition-colors">
                <Link to={'/edit'}>Edit</Link>
              </button>
            </div>
          </div>
        </div>
        <div className="py-2 border-b border-white text-white font-medium mb-5">
          Active Rooms
        </div>
      </div>
      {myRooms !== null ? (
        <div className="h-full w-full flex flex-col">
          {myRooms.map((room, index) => {
            if (index + 1 > 6) {
              return null;
            }
            return <RoomCard key={index} roomId={room} />;
          })}
          {myRooms.length > 6 && (
            <div className="flex items-center justify-center mt-5">
              <Link to={'/rooms'}>
                <FontAwesomeIcon
                  icon={faArrowAltCircleDown}
                  size={'2x'}
                  className="text-white cursor-pointer hover:text-green-400 transition-colors"
                />
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="h-full w-full flex flex-col items-center justify-center">
          <FontAwesomeIcon
            icon={faFolderOpen}
            size={'4x'}
            className="text-white"
          />
          <span className="text-white mt-3">There's no activated rooms.</span>
        </div>
      )}
      <div className="w-full px-3 py-5 border-t-2 border-white flex justify-between items-center">
        <div>
          <Link to={'/'}>
            <FontAwesomeIcon
              icon={faHome}
              size={'lg'}
              className="text-white cursor-pointer hover:text-green-400 transition-colors"
            />
          </Link>
        </div>
        <div className="flex items-center justify-evenly">
          <div className="mr-4">
            <Link to={'/settings'}>
              <FontAwesomeIcon
                icon={faCog}
                size={'lg'}
                className="cursor-pointer text-white hover:text-green-400 transition-colors"
              />
            </Link>
          </div>
          <div>
            <FontAwesomeIcon
              icon={faSignOutAlt}
              size={'lg'}
              className="cursor-pointer text-white hover:text-green-400 transition-colors"
              onClick={handleLogout}
            />
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
