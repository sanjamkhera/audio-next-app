"use client"
import React from 'react';
import WaitingPageInput from './waitingPageInput';

const WaitingPageLarge = ({handleResetStates}) => {
  return (
    <div className='w-full flex flex-col items-center justify-start max-w-[1440px]'>
      {/* NavBar */}
      <div className="w-full flex flex-row items-center justify-between mx-4 mt-8">
        {/* LOGO, For Local */}
        <img src="logo.svg" alt="Logo" className="w-[119px] h-[34px] sl:w-[200px] al:w-[200px] mx:w-[200px] sl:h-[48px] al:h-[48px] mx:h-[48px] xs:ml-4 xm:ml-4 ml-2" />
        {/* Track Project Button */}
        <img src="topRightCorner.svg" alt="Logo" className="w-[119px] h-[34px] sl:w-[210px] al:w-[210px] mx:w-[210px] sl:h-[50px] al:h-[50px] mx:h-[50px] mr-4" />
      </div>
      <div className='w-full flex flex-row items-start justify-center mt-[84px] px-4'>
        <div className='flex flex-col w-1/2 pl-6 pr-[72px]'>
          <div className="flex flex-col items-start border-b-2 pb-3 justify-center pt-6">
            <div className='flex whitespace-nowrap font-semibold text-[44px] text-[#873DE6] leading-[1.1] tracking-tight'>Boom.</div>
            <div className='flex whitespace-nowrap font-semibold text-[44px] text-[#1D2F2F] leading-[1.1] tracking-tight'>We're on it.</div>
          </div>
          <div className="flex flex-col items-start pt-[20px]">
            <div className="text-[#0D1126] text-opacity-35 whitespace-nowrap font-medium leading-[1.2] text-[24px]">You’ll receive an email within <span className="text-[#0D1126] text-opacity-35 whitespace-nowrap font-medium leading-[1.2] text-[24px]"> <span className="text-[#0D1126] leading-[1.2] text-[24px]">one hour</span>  </span></div>
            <span className="text-[#0D1126] text-opacity-35 whitespace-nowrap font-medium leading-[1.2] text-[22px] xs:text-[18px]">with an estimate and a contract link.</span>
          </div>
          <WaitingPageInput className="flex-1" onStartNewProject={handleResetStates} />
        </div>
        <img src="reDirect.svg" alt="Re-Direct Image" className="flex w-1/2 px-14 -mt-10" />
      </div>
    </div>
  );
};

export default WaitingPageLarge;
