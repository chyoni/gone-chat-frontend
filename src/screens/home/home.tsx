import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Helmet } from 'react-helmet-async';

export const Home: React.FC<{}> = () => {
  return (
    <div className="relative w-3/4 h-auto bg-gray-700 flex items-center justify-center">
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center">
        <FontAwesomeIcon icon={faComment} size={'10x'} className="text-white" />
        <div className="text-white text-xl mt-5 font-semibold">
          Welcome GoneChat App
        </div>
        <div className="text-white text-sm mt-5">© Chyonee 2021</div>
      </div>
    </div>
  );
};
