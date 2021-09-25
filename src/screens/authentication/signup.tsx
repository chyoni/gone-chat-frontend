import axios from 'axios';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import bgImg from '../../assets/chat-login.jpg';
import { ErrMessage } from '../../components/error-message';

interface ICreateUserFormData {
  username: string;
  password: string;
  alias: string;
}

export const Signup: React.FC<{}> = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ICreateUserFormData>();

  const history = useHistory();

  const onSubmit: SubmitHandler<ICreateUserFormData> = (
    data: ICreateUserFormData
  ) => {
    axios
      .post('http://localhost:4000/user', {
        username: data.username,
        password: data.password,
        alias: data.alias,
      })
      .then((res) => {
        if (res.status === 201) {
          toast.success('sign up successfully!');
          setTimeout(() => {
            history.push('/');
          }, 2500);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.error_message);
        setValue('username', '');
        setValue('password', '');
        setValue('alias', '');
      });
  };

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
      <div className="w-3/5 min-h-screen flex items-center justify-center flex-col p-10">
        <div className="w-4/5 text-4xl font-medium max-w-xl">Signup</div>
        <div className="flex w-4/5 justify-start max-w-xl">
          <Link to="/" className="mt-3 text-blue-400 max-w-xl">
            <span>have an account already?</span>
          </Link>
        </div>
        <form
          className="w-4/5 h-72 mt-5  max-w-xl bg-white rounded-md flex flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register('username', { required: 'Username is required.' })}
            placeholder="Username"
            className="focus:outline-none focus:border-gray-500 p-3 w-full mb-3 border border-gray-300 rounded-sm text-sm"
          />
          {errors.username && <ErrMessage message={errors.username?.message} />}
          <input
            {...register('password', { required: 'Password is required.' })}
            placeholder="Password"
            className="focus:outline-none focus:border-gray-500 p-3 w-full mb-3 border border-gray-300 rounded-sm text-sm"
          />
          {errors.password && <ErrMessage message={errors.password?.message} />}
          <input
            {...register('alias')}
            placeholder="Alias"
            className="focus:outline-none focus:border-gray-500 p-3 w-full mb-3 border border-gray-300 rounded-sm text-sm"
          />
          {errors.alias && <ErrMessage message={errors.alias?.message} />}
          <button className="bg-yellow-300 p-3 w-full text-white font-medium text-xl rounded-sm">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};
