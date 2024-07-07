"use client"

import React from 'react';

const EmailButton = () => {
  return (
    <div className='w-full min-w-[315px] xs:h-[48px] h-[60px] xm:h-[70px] flex justify-between border border-customGray rounded-lg leading-[1.2] text-[16px]'>
      <input type='email' placeholder='Enter your email' className='xs:p-2 p-3 focus:outline-none rounded-l-lg placeholder-placeHolderGray-700' />
      <button className='flex items-center bg-gray-200 xs:px-1 px-4 rounded-r-lg text-placeHolderGray whitespace-nowrap'>
        Get Estimate
      </button>
    </div>
  );
};

export default EmailButton;
