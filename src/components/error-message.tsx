import React from 'react';

type ErrMessageProps = {
  message: string | undefined;
};

export const ErrMessage: React.FC<ErrMessageProps> = ({ message }) => {
  return (
    <div className="text-red-300 font-medium w-full text-left">{message}</div>
  );
};
