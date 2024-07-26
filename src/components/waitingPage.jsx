"use client"
import React from 'react';

const WaitingPage = () => {
  return (
    <div className='w-full flex flex-col items-center'>
      <div className="w-full flex flex-row items-center justify-between mx-4 mt-8">
        {/* LOGO, For Local */}
        <img src="logo.svg" alt="Logo" className="w-[119px] h-[34px] sl:w-[200px] al:w-[200px] mx:w-[200px] sl:h-[48px] al:h-[48px] mx:h-[48px] xs:ml-4 xm:ml-4 ml-2" />
        {/* Track Project Button */}
        <img src="topRightCorner.svg" alt="Logo" className="w-[119px] h-[34px] sl:w-[210px] al:w-[210px] mx:w-[210px] sl:h-[50px] al:h-[50px] mx:h-[50px] mr-4" />
      </div>

      {/* Custom Paragraph */}
      <div className='w-full flex flex-col mt-1 mb-0 px-4 max-w-[390px]'>

        <img src="reDirect.svg" alt="Re-Direct Image" className="flex" />

        <div className="flex flex-col items-center justify-start">
          <div className='flex whitespace-nowrap font-semibold text-[36px] text-[#873DE6] leading-[1.1] tracking-tight'>Boom.</div>
          <div className='flex whitespace-nowrap font-semibold text-[36px] text-[#1D2F2F] leading-[1.1] tracking-tight'>We're on it.</div>
        </div>

        <div className="flex flex-col items-center pt-1 pb-3">
          <span className="text-[#0D1126] text-opacity-35 whitespace-nowrap font-medium leading-[1.2] text-[22px] xs:text-[18px]">You’ll receive an email within</span>
          <div className="text-[#0D1126] text-opacity-35 whitespace-nowrap font-medium leading-[1.2] text-[22px] xs:text-[18px]"> <span className="text-[#0D1126] leading-[1.2] text-[22px] xs:text-[18px]" >one hour</span>  with an estimate and a </div>
          <span className="text-[#0D1126] text-opacity-35 whitespace-nowrap font-medium leading-[1.2] text-[22px] xs:text-[18px]">contract link.</span>
        </div>
      </div>
    </div>
  );
};

export default WaitingPage;
