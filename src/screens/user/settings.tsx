import axios from 'axios';
import React, { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AppCtx } from '../../contexts/global-context';
import { Popup } from '../../components/popup';

interface IDeleteUserFormData {
  confirmMessage: string;
}

export const Settings = () => {
  const [modalToggle, setModalToggle] = useState<boolean>(false);
  const {
    register,
    formState: { isValid },
    handleSubmit,
  } = useForm<IDeleteUserFormData>({ mode: 'onChange' });
  const ctx = useContext(AppCtx);
  const onSubmit: SubmitHandler<IDeleteUserFormData> = (
    data: IDeleteUserFormData
  ) => {
    setModalToggle(true);
  };
  const handleDeleted = () => {
    setModalToggle(false);
    axios
      .delete(`http://localhost:4000/user/${ctx.me.id}`, {
        headers: {
          Authorization: `Bearer ${ctx.currentUser}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success('Deleted your account successfully. See you later.');
          setTimeout(() => {
            ctx.removeToken();
            window.location.replace('/');
          }, 3000);
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
    <div className="relative w-3/4 bg-gray-700 min-h-screen flex flex-col items-center justify-center">
      {modalToggle && (
        <Popup
          description={
            'This operation is not restored. Do you really want to delete your account?'
          }
          handleYesBtn={handleDeleted}
          handleNoBtn={setModalToggle}
        />
      )}
      <div className="mb-2 text-white text-lg font-semibold">
        Delete your account
      </div>
      <div className="mb-8 text-white font-normal">
        Enter{' '}
        <span className="text-red-400 font-semibold">{ctx.me.username}</span> to
        delete your account.
      </div>
      <form
        className="border border-gray-300 p-8 w-1/3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register('confirmMessage', {
            required: 'confirm message should be same your username',
            validate: (value) => value === ctx.me.username,
          })}
          type="text"
          placeholder={ctx.me.username}
          className="focus:outline-none focus:border-gray-500 p-3 w-full mb-3 border border-gray-300 rounded-sm text-sm bg-gray-700"
        />
        <button
          className={`${
            isValid
              ? 'bg-red-400 hover:bg-red-500 cursor-pointer'
              : 'cursor-not-allowed bg-gray-700'
          } transition-colors p-3 w-full text-white font-medium text-xl rounded-sm`}
        >
          Delete
        </button>
      </form>
    </div>
  );
};
