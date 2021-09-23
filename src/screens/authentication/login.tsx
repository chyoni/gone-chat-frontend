import { url } from 'inspector';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import bgImg from '../../assets/chat-login.jpg';

interface FormData {
  username: string;
  password: string;
}

export const Login: React.FC<{}> = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  return (
    <div className="container min-w-full min-h-screen flex">
      <div
        className="w-3/6 min-h-screen bg-cover bg-center flex flex-col items-center"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className="mt-72 text-white font-bold text-7xl">Welcome</div>
        <div className="mt-5 text-white font-bold text-2xl">
          This is 'Gone-Chat' Application.
        </div>
        <div className="mt-1 text-white font-bold text-2xl">
          Enjoy chatting with your friends.
        </div>
      </div>
      <div className="w-3/5 min-h-screen flex items-center justify-center flex-col">
        <form className="w-4/5 h-72 mt-16 bg-white rounded-md p-10 flex flex-col items-center">
          <input
            {...register('username')}
            placeholder="Username"
            className="focus:outline-none focus:border-gray-500 p-3 w-4/5 mb-3 border border-gray-300 rounded-sm text-sm"
          />
          <input
            {...register('password')}
            placeholder="Password"
            className="focus:outline-none focus:border-gray-500 p-3 w-4/5 mb-3 border border-gray-300 rounded-sm text-sm"
          />
        </form>
      </div>
    </div>
  );
};
