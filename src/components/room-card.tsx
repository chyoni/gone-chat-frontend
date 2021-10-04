import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppCtx } from '../contexts/global-context';

interface IRoomCardProps {
  roomId: number;
}

type basicUserInfo = {
  id: number;
  username: string;
  alias?: string;
  avatar?: string;
};

export const RoomCard: React.FC<IRoomCardProps> = ({ roomId }) => {
  const ctx = useContext(AppCtx);
  const [participants, setParticipants] = useState<[basicUserInfo]>();
  useEffect(() => {
    axios
      .get(`http://localhost:4000/room/${roomId}/users`, {
        headers: {
          Authorization: `Bearer ${ctx.currentUser}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setParticipants((current) => (current = res.data.users));
        }
      })
      .catch((err) => {
        if (err.response.data.token_refresh_flag) {
          ctx.removeToken();
          window.location.replace('/');
        }
      });
    // eslint-disable-next-line
  }, [ctx, roomId]);

  return (
    <div className="max-w-full flex items-center justify-center overflow-y-auto max-h-screen">
      <Link
        to={`/room/${roomId}`}
        className="w-1/2 p-3 rounded-lg bg-white mb-4 border-2 hover:border-green-300 transition-colors cursor-pointer flex flex-col"
      >
        <span className="text-sm">#{roomId}</span>
        <div className="overflow-x-hidden">
          {participants !== undefined &&
            participants.map((p, index) => {
              if (p.id === ctx.me.id) {
                p.username = 'me';
              }
              if (participants.length === index + 1) {
                return (
                  <span key={index} className="text-gray-500 text-sm mr-2">
                    {p.username}
                  </span>
                );
              }
              return (
                <span key={index} className="text-gray-500 text-sm mr-2">
                  {p.username},
                </span>
              );
            })}
        </div>
      </Link>
    </div>
  );
};
