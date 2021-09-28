import React from 'react';
import loadImg from '../assets/load.jpeg';

export const Loading = () => {
  return (
    <img src={loadImg} alt={'loading'} className="w-28 h-28 animate-ping" />
  );
};
