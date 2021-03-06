import React, { useContext } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import bgImg from '../../assets/chat-login.jpg';
import { ErrMessage } from '../../components/error-message';
import { AppCtx } from '../../contexts/global-context';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

interface ILoginFormData {
  username: string;
  password: string;
}

export const Login: React.FC<{}> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormData>();

  const ctx = useContext(AppCtx);

  const onSubmit: SubmitHandler<ILoginFormData> = (data: ILoginFormData) => {
    axios
      .post('http://localhost:4000/login', {
        username: data.username,
        password: data.password,
      })
      .then((res) => {
        if (res.status === 200) {
          ctx.modifyMe(res.data);
          ctx.modifyCurrentUser(res.data.token.access_token);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.error_message);
      });
  };

  return (
    <div className="container min-w-full min-h-screen flex">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
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
        <div className="w-4/5 text-4xl font-medium max-w-xl">Login</div>
        <div className="flex w-4/5 justify-start max-w-xl">
          <Link to="/signup" className="mt-3 text-blue-400 max-w-xl">
            <span>Don't have an account yet?</span>
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
            type="password"
            placeholder="Password"
            className="focus:outline-none focus:border-gray-500 p-3 w-full mb-3 border border-gray-300 rounded-sm text-sm"
          />
          {errors.password && <ErrMessage message={errors.password?.message} />}
          <button className="bg-yellow-300 p-3 w-full text-white font-medium text-xl rounded-sm">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
