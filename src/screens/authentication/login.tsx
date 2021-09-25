import React, { useContext } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import bgImg from '../../assets/chat-login.jpg';
import { ErrMessage } from '../../components/error-message';
import { AppCtx } from '../../contexts/global-context';
import { toast } from 'react-toastify';

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
          ctx.modifyCurrentUser(res.data.token.access_token);
          // 200이나 201이 아닌 이상 서버에서는 처리를 해서 돌려줘도
          // http에서 이 자체를 에러로 반환해서 200 이외의 status code를 찍으면 그냥 무조건 콘솔에서 에러를 발생함
          // 이거를 해결하려면 우리가 만든 서버 자체적으로 code, error를 response에 찍어주고 반환은 무조건 200으로 때려야 함 그래야
          // http에서 200, 201아닌 status일 때 에러를 반환안할 수 있기 때문에 그래도 하나 알아가네
        }
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
