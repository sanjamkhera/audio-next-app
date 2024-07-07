"use client"
import React from 'react';

const FeatureButtons = () => {
  return (
    <div className="w-full h-full items-center justify-start bg-cover bg-[url('/background.svg')] bg-black">
      <div className="w-full h-full flex flex-col items-center justify-end gap-4 pb-8">
        <button className="w-[85%] h-[56px] bg-white bg-opacity-15 text-white font-medium text-[18px] py-2 px-6 rounded-lg flex items-center justify-center shadow-lg backdrop-blur-md gap-2 whitespace-nowrap">
          Share on <img src="linkedIn.svg" alt="Button Grid" className="w-auto h-auto" />
        </button>
        <button className="w-[85%] h-[56px] bg-white bg-opacity-15 text-white font-medium text-[18px] py-2 px-6 rounded-lg flex items-center justify-center shadow-lg backdrop-blur-md gap-2 whitespace-nowrap">
          <img src="buttonGrid.svg" alt="Button Grid" className="w-auto h-auto" />Save to home screen
        </button>
      </div>
    </div>
  );
};

export default FeatureButtons;