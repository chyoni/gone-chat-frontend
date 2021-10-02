import React from 'react';
import loadImg from '../assets/loading.jpeg';

export const Loading = () => {
  return (
    <img src={loadImg} alt={'loading'} className="w-28 h-28 animate-ping" />
  );
};
