import axios from 'axios';
import React, { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ErrMessage } from '../../components/error-message';
import { AppCtx } from '../../contexts/global-context';

interface IChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export const ChangePassword = () => {
  const ctx = useContext(AppCtx);

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm<IChangePasswordFormData>();

  const onSubmit: SubmitHandler<IChangePasswordFormData> = (
    data: IChangePasswordFormData
  ) => {
    const { currentPassword, newPassword, confirmNewPassword } = data;
    if (newPassword !== confirmNewPassword) {
      toast.error('not matched new password and confirm new password');
      return;
    }
    axios
      .post(
        `http://localhost:4000/user/password/${ctx.me.id}`,
        {
          current_password: currentPassword,
          new_password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${ctx.currentUser}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success('change password successfully');
          setValue('currentPassword', '');
          setValue('newPassword', '');
          setValue('confirmNewPassword', '');
        }
      })
      .catch((err) => {
        if (err.response.data.token_refresh_flag) {
          ctx.removeToken();
        }
      });
  };

  return (
    <div className="w-3/4 min-h-screen flex flex-col items-center justify-center bg-gray-700">
      <div className="border border-gray-200 rounded-md w-1/3 p-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('currentPassword', {
              required: 'current password required',
            })}
            type="password"
            placeholder={'Current Password'}
            className="focus:outline-none focus:border-gray-500 p-3 w-full mb-3 border border-gray-300 rounded-sm text-sm bg-gray-700"
          />
          {errors.currentPassword && (
            <ErrMessage message={errors.currentPassword?.message} />
          )}
          <input
            {...register('newPassword', {
              required: 'new password required',
            })}
            type="password"
            placeholder={'New Password'}
            className="focus:outline-none focus:border-gray-500 p-3 w-full mb-3 border border-gray-300 rounded-sm text-sm bg-gray-700"
          />
          {errors.newPassword && (
            <ErrMessage message={errors.newPassword?.message} />
          )}
          <input
            {...register('confirmNewPassword', {
              required: 'confirm new password required',
            })}
            type="password"
            placeholder={'Confirm New Password'}
            className="focus:outline-none focus:border-gray-500 p-3 w-full mb-3 border border-gray-300 rounded-sm text-sm bg-gray-700"
          />
          {errors.confirmNewPassword && (
            <ErrMessage message={errors.confirmNewPassword?.message} />
          )}
          <button className="bg-blue-500 hover:bg-blue-600 transition-colors p-3 w-full text-white font-medium text-xl rounded-sm">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};
