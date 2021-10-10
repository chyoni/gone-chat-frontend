import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { AppCtx } from '../../contexts/global-context';
import { Helmet } from 'react-helmet-async';
import { Message } from '../../components/message';

interface IParams {
  roomId: string;
}

interface IFormFields {
  message: string;
}

type fromUser = {
  id: number;
  username: string;
  alias?: string;
  avatar?: string;
  created_at: number;
  updated_at: number;
};

export interface IRoomMessages {
  roomId: number;
  from: fromUser;
  message: string;
  created: number;
}

export const Room = () => {
  const { roomId } = useParams<IParams>();
  const [roomMessages, setRoomMessages] = useState<IRoomMessages[]>([]);
  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState: { isValid },
  } = useForm<IFormFields>({ mode: 'onChange' });
  const ctx = useContext(AppCtx);

  const ws = new WebSocket(
    `ws://localhost:4040/ws/${roomId}?auth=${ctx.me.id}`
  );

  useLayoutEffect(() => {
    axios
      .get(`http://localhost:4000/room/${roomId}/messages`, {
        headers: {
          Authorization: `Bearer ${ctx.currentUser}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setRoomMessages(res.data);
        }
      })
      .catch((err) => {
        if (err.response !== undefined) {
          if (err.response.data.token_refresh_flag) {
            ctx.removeToken();
            window.location.replace('/');
          }
        }
      });
  }, [roomId, ctx]);

  useEffect(() => {
    ws.onerror = (err) => {
      console.log(err);
      ws.close();
    };
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setRoomMessages([...roomMessages, message]);
    };
  });

  const onSumbit: SubmitHandler<IFormFields> = (data: IFormFields) => {
    axios
      .post(
        'http://localhost:4000/message',
        {
          message: data.message,
          roomId: roomId,
        },
        {
          headers: {
            Authorization: `Bearer ${ctx.currentUser}`,
          },
        }
      )
      .then((res) => {})
      .catch((err) => {
        if (err.response.data.token_refresh_flag) {
          ctx.removeToken();
          window.location.replace('/');
        }
      });
  };

  const handleKeyPress: React.KeyboardEventHandler<HTMLTextAreaElement> = (
    e: React.KeyboardEvent
  ) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (getValues().message !== '') {
        onSumbit(getValues());
      }
      setValue('message', '');
    }
  };

  return (
    <div className="w-3/4 min-h-screen px-3 bg-gray-700 flex flex-col items-center justify-center">
      <Helmet>
        <title>#{roomId} ChatRoom</title>
      </Helmet>
      <div className="flex items-center w-full py-3 border-b border-gray-300 text-white font-semibold">
        <span>#{roomId}</span>
      </div>
      <div className="w-full h-full border-b-2 border-gray-300 box-border">
        <div className="w-full overflow-y-auto flex flex-col">
          {roomMessages &&
            roomMessages.map((message, index) => {
              return (
                <div key={index} className="w-full mb-2">
                  {message.from.id === ctx.me.id ? (
                    <div className="h-full float-right px-3 py-2">
                      <Message message={message} />
                    </div>
                  ) : (
                    <div className="h-full float-left px-3 py-2">
                      <Message message={message} />
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
      <div className="flex mt-4 w-full">
        <form
          className="w-full flex items-center"
          onSubmit={handleSubmit(onSumbit)}
        >
          <textarea
            {...register('message', {
              required: 'confirm message should be same your username',
            })}
            style={{ resize: 'none' }}
            onKeyPress={handleKeyPress}
            className="focus:outline-none focus:border-green-400 h-7
            mb-3 border-2 border-gray-300 text-sm bg-white rounded-lg w-11/12
            "
          />
          <div className="w-1/12 flex items-center justify-center mb-3">
            <button>
              <FontAwesomeIcon
                icon={faPaperPlane}
                size={'2x'}
                className={
                  isValid ? 'text-blue-300' : 'cursor-not-allowed text-gray-400'
                }
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
