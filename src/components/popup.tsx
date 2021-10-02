import React from 'react';

interface IPopupProps {
  description: string;
  handleNoBtn: React.Dispatch<React.SetStateAction<boolean>>;
  handleYesBtn: () => void;
}

export const Popup: React.FC<IPopupProps> = ({
  handleNoBtn,
  handleYesBtn,
  description,
}) => {
  const noBtn: React.MouseEventHandler<HTMLButtonElement> = () => {
    handleNoBtn(false);
  };

  return (
    <div className="flex items-center justify-center absolute z-0 bg-gray-400 bg-opacity-80 min-w-full min-h-screen">
      <div className="w-1/3 p-5 -mt-60 bg-white rounded-md flex flex-col">
        <span className="text-sm font-medium">{description}</span>
        <div className="mt-5 flex items-center justify-between">
          <button
            className="p-2 bg-red-400 hover:bg-red-500 transition-colors rounded-md text-white text-sm"
            onClick={handleYesBtn}
          >
            Yes, I'm sure
          </button>
          <button
            className="ml-5 p-2 bg-gray-400 hover:bg-gray-500 transition-colors rounded-md text-white text-sm"
            onClick={noBtn}
          >
            No, I want go back
          </button>
        </div>
      </div>
    </div>
  );
};
