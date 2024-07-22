"use client"
import React from 'react';

const EmailButton = ({ email, handleEmailChange, handleSendEmail }) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email); 

  return (
    <div className='w-full min-w-[315px] h-[60px] xm:h-[70px] flex justify-between border border-customGray rounded-lg leading-[1.2] text-[16px]'>
      <input
        type='email'
        placeholder='Enter your email'
        className='xs:p-2 p-3 focus:outline-none rounded-l-lg placeholder-placeHolderGray-700 w-full'
        value={email}
        onChange={handleEmailChange} 
      />
      <button
        className={`flex items-center bg-gray-200 xs:px-3 p-4 rounded-r-lg ${isEmailValid ? 'text-black' : 'text-placeHolderGray'} whitespace-nowrap`}
        disabled={!isEmailValid}
        onClick={handleSendEmail}
      >
        Get Estimate
      </button>
    </div>
  );
};

export default EmailButton;