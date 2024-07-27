"use client"
import React, { useState } from 'react';

const EmailButton = ({ email, handleEmailChange, handleSendEmail, setIsLoading }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleClick = async () => {
    setLoading(true);
    setIsLoading(true);
    try {
      await handleSendEmail();
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  return (
    <div className={`w-full min-w-[315px] h-[60px] flex justify-between ${isFocused ? 'outline outline-purple-500 outline-2' : 'border border-customGray'} rounded-lg leading-[1.2] text-[16px]`}>
      <input
        type='email'
        placeholder='Enter your email'
        className='xs:p-2 p-3 focus:outline-none rounded-l-lg placeholder-placeHolderGray-700 w-full '
        value={email}
        onChange={handleEmailChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <button
        className={`flex items-center bg-gray-200 xs:px-3 p-4 rounded-r-lg ${isEmailValid ? 'text-black' : 'text-placeHolderGray'} whitespace-nowrap`}
        disabled={!isEmailValid || isLoading}
        onClick={handleClick}
      >
        {isLoading ? (
          <svg className="animate-spin h-5 w-5 mx-3 border-t-2 border-[#873DE6] border-r-2 border-current rounded-full" viewBox="0 0 24 24">
          </svg>
        ) : (
          "Get Estimate"
        )}
      </button>
    </div>
  );
};

export default EmailButton;
