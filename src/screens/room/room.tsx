import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { AppCtx } from '../../contexts/global-context';

interface IParams {
  roomId: string;
}

interface IFormFields {
  message: string;
}

export const Room = () => {
  const { roomId } = useParams<IParams>();
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

  useEffect(() => {
    ws.onerror = (err) => {
      console.log(err);
      ws.close();
    };
    ws.onmessage = (event) => {
      console.log(JSON.parse(event.data));
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
      .then((res) => {
        console.log(res);
      })
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
      onSumbit(getValues());
      setValue('message', '');
    }
  };

  return (
    <div className="w-3/4 h-auto max-h-full px-3 bg-gray-700 flex flex-col items-center justify-center">
      <div className="flex items-center w-full py-3 border-b border-gray-300 text-white font-semibold">
        <span>#{roomId}</span>
      </div>
      <div
        className="w-full h-full border-b-2 border-gray-300"
        style={{ overflowY: 'hidden' }}
      >
        <div className="h-full"></div>
      </div>
      <div className="flex h-auto mt-4 w-full">
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
