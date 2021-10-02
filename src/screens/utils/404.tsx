import React from 'react';

export const NotFoundPage = () => {
  return (
    <div className="container w-full min-w-full min-h-screen flex flex-col items-center mt-52">
      <div className="w-full flex flex-col items-center justify-center">
        <span className="text-yellow-400 text-8xl font-semibold">404</span>
        <span className="text-yellow-400 text-6xl font-semibold">
          Not Found 🤥
        </span>
      </div>
    </div>
  );
};
