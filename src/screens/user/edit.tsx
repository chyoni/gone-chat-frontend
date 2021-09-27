import axios from 'axios';
import React, { useContext } from 'react';
import FormData from 'form-data';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import defaultAvatar from '../../assets/default-avatar.jpeg';
import { ErrMessage } from '../../components/error-message';
import { AppCtx } from '../../contexts/global-context';

interface IUpdateFormData {
  alias: string;
}

export const Edit = () => {
  const ctx = useContext(AppCtx);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdateFormData>();

  const onSubmit: SubmitHandler<IUpdateFormData> = (data: IUpdateFormData) => {
    console.log(data);
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      formData.append('photo', file, file.name);
      axios
        .post('http://localhost:4000/image/upload', formData, {
          headers: {
            Authorization: `Bearer ${ctx.currentUser}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {})
        .catch((err) => {
          if (err.response.data.token_refresh_flag) {
            ctx.removeToken();
          }
        });
    } else {
      toast.error('None of the files were selected');
      return;
    }
  };

  return (
    <div className="w-3/4 min-h-screen flex flex-col items-center justify-center">
      <div className="w-1/3 p-2 flex items-center justify-center border border-gray-200 rounded-md mb-5">
        <label
          className="bg-center bg-contain bg-no-repeat w-28 h-28 rounded-full cursor-pointer bg-red-50"
          htmlFor={'input-file'}
        >
          <img
            src={ctx.me.avatar !== '' ? ctx.me.avatar : defaultAvatar}
            alt={'user-avatar'}
            className="bg-center bg-contain bg-no-repeat w-28 h-28 rounded-full"
          />
        </label>
        <input
          type="file"
          id="input-file"
          style={{ display: 'none' }}
          onChange={handleFileSelected}
        />
      </div>
      <div className="border border-gray-200 rounded-md w-1/3 p-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('alias', {
              required: 'alias must be at least one character',
            })}
            type="text"
            placeholder={ctx.me.alias}
            className="focus:outline-none focus:border-gray-500 p-3 w-full mb-3 border border-gray-300 rounded-sm text-sm"
          />
          {errors.alias && <ErrMessage message={errors.alias?.message} />}
          <button className="bg-yellow-300 p-3 w-full text-white font-medium text-xl rounded-sm">
            Update Alias
          </button>
        </form>
      </div>
    </div>
  );
};