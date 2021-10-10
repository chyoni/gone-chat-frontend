import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router';
import { AppCtx } from '../../contexts/global-context';

export const Home: React.FC<{}> = () => {
  const ctx = useContext(AppCtx);
  const history = useHistory();

  const handleCreateRoom = () => {
    axios
      .post(
        'http://localhost:4000/room',
        {
          participants: [ctx.me.id],
        },
        {
          headers: {
            Authorization: `Bearer ${ctx.currentUser}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          const roomId = res.data.room_id;
          history.push(`/room/${roomId}`);
        }
      })
      .catch((err) => {
        if (err.response.data.token_refresh_flag) {
          ctx.removeToken();
          window.location.replace('/');
        }
      });
  };

  return (
    <div className="relative w-3/4 h-auto bg-gray-700 flex flex-col">
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="w-full px-5 py-2 h-1/3">
        <div
          className="float-right mt-10 p-2 bg-white rounded-md text-sm border hover:border-green-400 cursor-pointer"
          onClick={handleCreateRoom}
        >
          Create Room
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <FontAwesomeIcon icon={faComment} size={'10x'} className="text-white" />
        <div className="text-white text-xl mt-5 font-semibold">
          Welcome GoneChat App
        </div>
        <div className="text-white text-sm mt-5">© Chyonee 2021</div>
      </div>
    </div>
  );
};
